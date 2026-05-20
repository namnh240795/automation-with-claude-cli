import * as server from '../entries/pages/_layout.server.ts.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { server };
export const server_id = "src/routes/+layout.server.ts";
export const imports = ["_app/immutable/nodes/0.BKd9kCap.js","_app/immutable/chunks/2E1VnGgK.js","_app/immutable/chunks/B20aycuJ.js","_app/immutable/chunks/Dz8aM1WD.js","_app/immutable/chunks/BX6Mh0E6.js","_app/immutable/chunks/DWBlAuKK.js","_app/immutable/chunks/C0aqBohz.js","_app/immutable/chunks/E5E5NYad.js"];
export const stylesheets = ["_app/immutable/assets/0.CEsgJCzB.css"];
export const fonts = [];
