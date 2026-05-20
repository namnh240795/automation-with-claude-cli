// @ts-nocheck
import type { LayoutServerLoad } from './$types';

export const load = async ({ url, locals }: Parameters<LayoutServerLoad>[0]) => {
  const isAuthPage = url.pathname.startsWith('/login') || url.pathname.startsWith('/auth/callback');

  if (isAuthPage) {
    return {};
  }

  // For protected pages, you could check auth here
  // This will be implemented with proper auth guards
  return {};
};