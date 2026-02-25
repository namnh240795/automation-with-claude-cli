import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LogActivity } from '@app/app-logger';
import { PrismaService } from '../prisma/prisma.service';
import { SignUpDto, SignInDto } from '../dto';
import { UserResponseDto, TokenResponseDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  @LogActivity()
  async signUp(signUpDto: SignUpDto): Promise<UserResponseDto> {
    const { email, password, first_name, last_name } = signUpDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email,
        password_hash: passwordHash,
        first_name,
        last_name,
        is_active: true,
        email_verified: false,
      },
      select: {
        id: true,
        email: true,
        first_name: true,
        last_name: true,
        is_active: true,
        email_verified: true,
        created_at: true,
        updated_at: true,
      },
    });

    // Return DTO with snake_case properties
    return user;
  }

  @LogActivity()
  async signIn(signInDto: SignInDto): Promise<TokenResponseDto> {
    const { email, password } = signInDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Check if user is active
    if (!user.is_active) {
      throw new UnauthorizedException('User account is inactive');
    }

    // Generate tokens
    const tokens = await this.generateTokens(user.id, user.email, user.first_name, user.last_name);

    return tokens;
  }

  private async generateTokens(
    userId: string,
    email: string,
    first_name?: string,
    last_name?: string,
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

    // Store refresh token in database
    const refreshTokenExpiry = new Date();
    refreshTokenExpiry.setDate(
      refreshTokenExpiry.getDate() + 7, // 7 days from now
    );

    await this.prisma.refresh_token.create({
      data: {
        token: refreshToken,
        user_id: userId,
        expires_at: refreshTokenExpiry,
      },
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
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Check if refresh token exists in database
      const storedToken = await this.prisma.refresh_token.findUnique({
        where: { token: refreshToken },
        include: { user: true },
      });

      if (!storedToken || storedToken.revoked_at) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Check if token is expired
      if (storedToken.expires_at < new Date()) {
        throw new UnauthorizedException('Refresh token expired');
      }

      // Check if user is active
      if (!storedToken.user.is_active) {
        throw new UnauthorizedException('User account is inactive');
      }

      // Revoke old refresh token
      await this.prisma.refresh_token.update({
        where: { id: storedToken.id },
        data: { revoked_at: new Date() },
      });

      // Generate new tokens with user info from database
      return this.generateTokens(
        payload.sub,
        storedToken.user.email,
        storedToken.user.first_name,
        storedToken.user.last_name,
      );
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(refreshToken: string): Promise<void> {
    await this.prisma.refresh_token.updateMany({
      where: { token: refreshToken },
      data: { revoked_at: new Date() },
    });
  }
}
