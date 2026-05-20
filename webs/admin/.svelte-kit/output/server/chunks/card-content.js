import { l as attributes, q as clsx } from "./renderer.js";
import { c as cn } from "./index2.js";
function Card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...props } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("rounded-xl border bg-card text-card-foreground shadow-sm", className)),
      ...props
    })}>`);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
function Card_content($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...props } = $$props;
    $$renderer2.push(`<div${attributes({ class: clsx(cn("p-6 pt-0", className)), ...props })}>`);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div>`);
  });
}
export {
  Card as C,
  Card_content as a
};
