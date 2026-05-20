import "clsx";
import "@sveltejs/kit/internal";
import "../../../../chunks/exports.js";
import "../../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../../chunks/root.js";
import "../../../../chunks/state.svelte.js";
import "../../../../chunks/auth.js";
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    $$renderer2.push(`<div class="flex min-h-screen items-center justify-center bg-gray-50"><div class="text-center">`);
    {
      $$renderer2.push("<!--[-1-->");
      $$renderer2.push(`<p>Processing authentication...</p>`);
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
export {
  _page as default
};
