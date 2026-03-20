import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignInDto, TokenResponseDto } from '../dto';
import { SignupResponseDto } from '../dto/signup-response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<SignupResponseDto> {
    const { email, password, first_name, last_name } = signUpDto;

    // Get master realm (or create if needed)
    const realm = await this.prisma.realm.findFirst({
      where: { realm: 'master' },
    });

    if (!realm) {
      throw new NotFoundException('Master realm not found');
    }

    // Check if user already exists
    const existingUser = await this.prisma.user_entity.findFirst({
      where: {
        email,
        realm_id: realm.id,
      },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Create user with Keycloak's user_entity structure
    const userId = crypto.randomUUID();
    const now = Date.now();

    const user = await this.prisma.user_entity.create({
      data: {
        id: userId,
        email,
        email_verified: false,
        enabled: true,
        first_name,
        last_name,
        realm_id: realm.id,
        created_timestamp: now,
        not_before: 0,
      },
    });

    // Create credential (password hash stored separately in Keycloak)
    const passwordHash = await Bun.password.hash(password);
    const credentialId = crypto.randomUUID();

    await this.prisma.credential.create({
      data: {
        id: credentialId,
        type: 'password',
        user_id: userId,
        salt: '',
        credential_data: JSON.stringify({
          value: passwordHash,
          algorithm: 'bcrypt',
        }),
        counter: 0,
        period: 0,
        created_date: now,
        priority: 0,
        user_label: 'Password',
      },
    });

    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name || undefined,
      last_name: user.last_name || undefined,
      is_active: user.enabled,
      email_verified: user.email_verified,
      created_at: new Date(user.created_timestamp || 0),
      updated_at: new Date(user.created_timestamp || 0),
    };
  }

  async signIn(signInDto: SignInDto): Promise<TokenResponseDto> {
    const { email, password } = signInDto;

    // Get master realm
    const realm = await this.prisma.realm.findFirst({
      where: { realm: 'master' },
    });

    if (!realm) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Find user
    const user = await this.prisma.user_entity.findFirst({
      where: {
        email,
        realm_id: realm.id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get user's credential
    const credential = await this.prisma.credential.findFirst({
      where: { user_id: user.id },
    });

    if (!credential) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const credentialData = JSON.parse(credential.credential_data || '{}');
    const passwordHash = credentialData.value;

    const isPasswordValid = await Bun.password.verify(password, passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is enabled
    if (!user.enabled) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Generate tokens
    const tokens = await this.generateTokens(
      user.id,
      user.email,
      user.first_name,
      user.last_name,
    );

    return tokens;
  }

  private async generateTokens(
    userId: string,
    email: string,
    first_name: string | null,
    last_name: string | null,
  ): Promise<TokenResponseDto> {
    const payload = {
      sub: userId,
      email,
      first_name,
      last_name,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_SECRET,
      expiresIn: (process.env.JWT_EXPIRES_IN || '1h') as any,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: (process.env.JWT_REFRESH_EXPIRES_IN || '7d') as any,
    });

    return {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: 'Bearer',
      expires_in: 3600, // 1 hour in seconds
    };
  }

  async refreshAccessToken(refreshToken: string): Promise<TokenResponseDto> {
    // Verify refresh token
    let payload;
    try {
      payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Find user
    const user = await this.prisma.user_entity.findUnique({
      where: { id: payload.sub },
    });

    if (!user || !user.enabled) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    // Generate new tokens
    return this.generateTokens(
      user.id,
      user.email || '',
      user.first_name,
      user.last_name,
    );
  }

  async logout(_refreshToken: string): Promise<void> {
    // In a real implementation, you might want to add token blacklisting
    // For now, this is a no-op since we're not storing refresh tokens
  }
}
