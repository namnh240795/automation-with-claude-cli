export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken: () => string | null;
  onUnauthorized: () => void;
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

export function createApiClient(config: ApiClientConfig) {
  const { baseUrl, getAccessToken, onUnauthorized } = config;

  async function request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const { params, headers, ...rest } = options;

    let url = `${baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(params)) {
        searchParams.append(key, String(value));
      }
      const queryString = searchParams.toString();
      if (queryString) {
        url += `?${queryString}`;
      }
    }

    const accessToken = getAccessToken();
    const requestHeaders: HeadersInit = {
      'Content-Type': 'application/json',
      ...(headers as Record<string, string>),
    };

    if (accessToken) {
      requestHeaders['Authorization'] = `Bearer ${accessToken}`;
    }

    const response = await fetch(url, {
      ...rest,
      headers: requestHeaders,
    });

    if (response.status === 401) {
      onUnauthorized();
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API Error ${response.status}: ${errorBody}`);
    }

    return response.json();
  }

  return {
    get<T>(endpoint: string, options?: RequestOptions): Promise<T> {
      return request<T>(endpoint, { ...options, method: 'GET' });
    },

    post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>(endpoint, {
        ...options,
        method: 'POST',
        body: JSON.stringify(data),
      });
    },

    put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>(endpoint, {
        ...options,
        method: 'PUT',
        body: JSON.stringify(data),
      });
    },

    patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<T> {
      return request<T>(endpoint, {
        ...options,
        method: 'PATCH',
        body: JSON.stringify(data),
      });
    },

    delete<T>(endpoint: string, options?: RequestOptions): Promise<T> {
      return request<T>(endpoint, { ...options, method: 'DELETE' });
    },
  };
}

export type ApiClient = ReturnType<typeof createApiClient>;