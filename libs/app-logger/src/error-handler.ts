import { BadRequestException } from '@nestjs/common';
import { AxiosError } from 'axios';

export const errorHandler = (error: unknown): unknown => {
  if (error instanceof AxiosError) {
    let config, headers;
    if (error.config) {
      headers = {
        ...(error.config.headers ?? {}),
        Authorization: '***********',
        'Ocp-Apim-Subscription-Key': '***********',
      };
      config = { ...error.config, headers };
    }
    return {
      message: error.message,
      name: error.name,
      code: error.code,
      config,
      response: error.response
        ? {
            status: error.response.status,
            statusText: error.response.statusText,
            data: error.response.data,
          }
        : undefined,
      status: error.response?.status,
    };
  } else if (error instanceof BadRequestException) {
    return {
      message: error.message,
      name: error.name,
      response: error.getResponse(),
    };
  } else if (error instanceof Error) {
    return {
      message: error.message,
      name: error.name,
      stack: error.stack,
    };
  }
  return {
    message: 'Unknown Exception',
  };
};
