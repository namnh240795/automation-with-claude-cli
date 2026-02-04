import { AxiosResponse } from 'axios';

export const responseHandler = (response: AxiosResponse): string => {
  return response.data;
};
