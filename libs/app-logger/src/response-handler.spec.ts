import { AxiosResponse } from 'axios';
import { responseHandler } from './response-handler';

describe('responseHandler', () => {
  it('should return response data', () => {
    // Arrange
    const data = { message: 'Success', id: 123 };
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toEqual(data);
  });

  it('should return string data', () => {
    // Arrange
    const data = 'Plain text response';
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toBe(data);
  });

  it('should return array data', () => {
    // Arrange
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toEqual(data);
  });

  it('should return null data', () => {
    // Arrange
    const data = null;
    const response: AxiosResponse = {
      data,
      status: 204,
      statusText: 'No Content',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toBeNull();
  });

  it('should return number data', () => {
    // Arrange
    const data = 42;
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toBe(42);
  });

  it('should return boolean data', () => {
    // Arrange
    const data = true;
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toBe(true);
  });

  it('should return complex nested object data', () => {
    // Arrange
    const data = {
      user: {
        id: 1,
        profile: {
          name: 'John Doe',
          email: 'john@example.com',
          preferences: {
            theme: 'dark',
            notifications: true,
          },
        },
      },
      metadata: {
        timestamp: '2024-01-01T00:00:00Z',
        version: '1.0.0',
      },
    };
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toEqual(data);
  });

  it('should return empty object data', () => {
    // Arrange
    const data = {};
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toEqual({});
  });

  it('should return undefined data', () => {
    // Arrange
    const data = undefined;
    const response: AxiosResponse = {
      data,
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {} as any,
    };

    // Act
    const result = responseHandler(response);

    // Assert
    expect(result).toBeUndefined();
  });
});
