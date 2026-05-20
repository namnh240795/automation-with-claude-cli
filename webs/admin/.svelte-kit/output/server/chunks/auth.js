function createApiClient(config) {
  const { baseUrl, getAccessToken, onUnauthorized } = config;
  async function request(endpoint, options = {}) {
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
    const requestHeaders = {
      "Content-Type": "application/json",
      ...headers
    };
    if (accessToken) {
      requestHeaders["Authorization"] = `Bearer ${accessToken}`;
    }
    const response = await fetch(url, {
      ...rest,
      headers: requestHeaders
    });
    if (response.status === 401) {
      onUnauthorized();
      throw new Error("Unauthorized");
    }
    if (!response.ok) {
      const errorBody = await response.text();
      throw new Error(`API Error ${response.status}: ${errorBody}`);
    }
    return response.json();
  }
  return {
    get(endpoint, options) {
      return request(endpoint, { ...options, method: "GET" });
    },
    post(endpoint, data, options) {
      return request(endpoint, {
        ...options,
        method: "POST",
        body: JSON.stringify(data)
      });
    },
    put(endpoint, data, options) {
      return request(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(data)
      });
    },
    patch(endpoint, data, options) {
      return request(endpoint, {
        ...options,
        method: "PATCH",
        body: JSON.stringify(data)
      });
    },
    delete(endpoint, options) {
      return request(endpoint, { ...options, method: "DELETE" });
    }
  };
}
const AUTH_SERVICE_URL = "http://localhost:3001/auth";
function createAuthApiClient(getAccessToken, onUnauthorized) {
  return createApiClient({
    baseUrl: AUTH_SERVICE_URL,
    getAccessToken,
    onUnauthorized
  });
}
const authEndpoints = {
  signIn: (data) => `/v1/auth/signin`,
  signUp: (data) => `/v1/auth/signup`,
  refreshToken: (data) => `/v1/auth/refresh`,
  getProfile: () => `/v1/auth/me`,
  signOut: () => `/v1/auth/logout`
};
const STORAGE_KEYS = {
  ACCESS_TOKEN: "admin_access_token",
  REFRESH_TOKEN: "admin_refresh_token",
  USER: "admin_user"
};
function getStoredUser() {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEYS.USER);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}
function createAuthStore() {
  let state = {
    accessToken: typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) : null,
    refreshToken: typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN) : null,
    user: getStoredUser(),
    isAuthenticated: typeof window !== "undefined" ? !!localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN) : false
  };
  const listeners = /* @__PURE__ */ new Set();
  function notify() {
    listeners.forEach((listener) => listener());
  }
  function setState(newState) {
    state = { ...state, ...newState };
    notify();
  }
  const api = createAuthApiClient(
    () => state.accessToken,
    () => {
      signOut();
    }
  );
  async function signIn(email, password) {
    const response = await api.post(authEndpoints.signIn({ email, password }));
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
    setState({
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      user: response.user,
      isAuthenticated: true
    });
    return response;
  }
  async function signUp(data) {
    const response = await api.post(authEndpoints.signUp(data));
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, response.access_token);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, response.refresh_token);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(response.user));
    setState({
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      user: response.user,
      isAuthenticated: true
    });
    return response;
  }
  function signOut() {
    localStorage.removeItem(STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER);
    setState({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false
    });
  }
  function getAccessToken() {
    return state.accessToken;
  }
  function getUser() {
    return state.user;
  }
  function isAuthenticated() {
    return state.isAuthenticated;
  }
  return {
    get state() {
      return state;
    },
    signIn,
    signUp,
    signOut,
    getAccessToken,
    getUser,
    isAuthenticated,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    }
  };
}
const authStore = createAuthStore();
export {
  authStore as a
};
