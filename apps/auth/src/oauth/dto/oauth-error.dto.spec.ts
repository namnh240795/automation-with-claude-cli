import { OAuthErrorDto, TokenErrorDto, DeviceFlowErrorDto, DEVICE_FLOW_ERRORS } from './oauth-error.dto';
import { OAUTH_ERRORS } from '../oauth.constants';

describe('OAuth Error DTOs', () => {
  describe('OAuthErrorDto', () => {
    it('should create valid OAuth error', () => {
      const dto = new OAuthErrorDto();
      dto.error = OAUTH_ERRORS.INVALID_REQUEST;
      dto.error_description = 'Invalid request';
      dto.state = 'state123';

      expect(dto.error).toBe(OAUTH_ERRORS.INVALID_REQUEST);
      expect(dto.error_description).toBe('Invalid request');
      expect(dto.state).toBe('state123');
      expect(dto.error_uri).toBeUndefined();
    });

    it('should create OAuth error with all fields', () => {
      const dto = new OAuthErrorDto();
      dto.error = OAUTH_ERRORS.ACCESS_DENIED;
      dto.error_description = 'Access denied';
      dto.error_uri = 'https://example.com/error';
      dto.state = 'xyz789';

      expect(dto.error).toBe(OAUTH_ERRORS.ACCESS_DENIED);
      expect(dto.error_description).toBe('Access denied');
      expect(dto.error_uri).toBe('https://example.com/error');
      expect(dto.state).toBe('xyz789');
    });
  });

  describe('TokenErrorDto', () => {
    it('should create valid token error', () => {
      const dto = new TokenErrorDto();
      dto.error = OAUTH_ERRORS.INVALID_GRANT;
      dto.error_description = 'Invalid authorization code';

      expect(dto.error).toBe(OAUTH_ERRORS.INVALID_GRANT);
      expect(dto.error_description).toBe('Invalid authorization code');
    });

    it('should create token error with all fields', () => {
      const dto = new TokenErrorDto();
      dto.error = OAUTH_ERRORS.INVALID_CLIENT;
      dto.error_description = 'Invalid client credentials';
      dto.error_uri = 'https://example.com/oauth/errors';

      expect(dto.error).toBe(OAUTH_ERRORS.INVALID_CLIENT);
      expect(dto.error_description).toBe('Invalid client credentials');
      expect(dto.error_uri).toBe('https://example.com/oauth/errors');
    });
  });

  describe('DeviceFlowErrorDto', () => {
    it('should create valid device flow error', () => {
      const dto = new DeviceFlowErrorDto();
      dto.error = DEVICE_FLOW_ERRORS.AUTHORIZATION_PENDING;
      dto.error_description = 'Authorization pending';

      expect(dto.error).toBe(DEVICE_FLOW_ERRORS.AUTHORIZATION_PENDING);
      expect(dto.error_description).toBe('Authorization pending');
    });

    it('should create device flow error with all fields', () => {
      const dto = new DeviceFlowErrorDto();
      dto.error = DEVICE_FLOW_ERRORS.EXPIRED_TOKEN;
      dto.error_description = 'Device code expired';
      dto.error_uri = 'https://example.com/error';

      expect(dto.error).toBe(DEVICE_FLOW_ERRORS.EXPIRED_TOKEN);
      expect(dto.error_description).toBe('Device code expired');
      expect(dto.error_uri).toBe('https://example.com/error');
    });

    it('should support slow_down error', () => {
      const dto = new DeviceFlowErrorDto();
      dto.error = DEVICE_FLOW_ERRORS.SLOW_DOWN;
      dto.error_description = 'Poll interval too fast';

      expect(dto.error).toBe(DEVICE_FLOW_ERRORS.SLOW_DOWN);
      expect(dto.error_description).toBe('Poll interval too fast');
    });
  });

  describe('DEVICE_FLOW_ERRORS', () => {
    it('should have correct error codes', () => {
      expect(DEVICE_FLOW_ERRORS.AUTHORIZATION_PENDING).toBe('authorization_pending');
      expect(DEVICE_FLOW_ERRORS.SLOW_DOWN).toBe('slow_down');
      expect(DEVICE_FLOW_ERRORS.ACCESS_DENIED).toBe('access_denied');
      expect(DEVICE_FLOW_ERRORS.EXPIRED_TOKEN).toBe('expired_token');
    });
  });
});
