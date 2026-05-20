

export const index = 3;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/auth/callback/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/3.D8fYuVWo.js","_app/immutable/chunks/2E1VnGgK.js","_app/immutable/chunks/DWBlAuKK.js","_app/immutable/chunks/BX6Mh0E6.js","_app/immutable/chunks/E5E5NYad.js"];
export const stylesheets = [];
export const fonts = [];
