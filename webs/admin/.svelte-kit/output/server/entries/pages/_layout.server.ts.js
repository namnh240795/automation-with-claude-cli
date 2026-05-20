const load = async ({ url, locals }) => {
  const isAuthPage = url.pathname.startsWith("/login") || url.pathname.startsWith("/auth/callback");
  if (isAuthPage) {
    return {};
  }
  return {};
};
export {
  load
};
