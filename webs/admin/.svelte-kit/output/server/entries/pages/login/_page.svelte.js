import { l as attributes, q as clsx, j as attr, F as escape_html } from "../../../chunks/renderer.js";
import "@sveltejs/kit/internal";
import "../../../chunks/exports.js";
import "../../../chunks/utils.js";
import "@sveltejs/kit/internal/server";
import "../../../chunks/root.js";
import "../../../chunks/state.svelte.js";
import "../../../chunks/auth.js";
import { c as cn } from "../../../chunks/index2.js";
import { C as Card, a as Card_content } from "../../../chunks/card-content.js";
import "clsx";
function Button($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      variant = "default",
      size = "default",
      class: className,
      children,
      $$slots,
      $$events,
      ...restProps
    } = $$props;
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline"
    };
    const sizeClasses = {
      default: "h-10 px-4 py-2",
      sm: "h-9 rounded-md px-3",
      lg: "h-11 rounded-md px-8",
      icon: "h-10 w-10"
    };
    $$renderer2.push(`<button${attributes({
      class: clsx(cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50", variantClasses[variant], sizeClasses[size], className)),
      ...restProps
    })}>`);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></button>`);
  });
}
function Card_header($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...props } = $$props;
    $$renderer2.push(`<div${attributes({
      class: clsx(cn("flex flex-col space-y-1.5 p-6", className)),
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
function Card_title($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...props } = $$props;
    $$renderer2.push(`<h3${attributes({
      class: clsx(cn("text-2xl font-semibold leading-none tracking-tight", className)),
      ...props
    })}>`);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></h3>`);
  });
}
function Card_description($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { class: className, children, $$slots, $$events, ...props } = $$props;
    $$renderer2.push(`<p${attributes({
      class: clsx(cn("text-sm text-muted-foreground", className)),
      ...props
    })}>`);
    if (children) {
      $$renderer2.push("<!--[0-->");
      children($$renderer2);
      $$renderer2.push(`<!---->`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></p>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let email = "";
    let password = "";
    let loading = false;
    $$renderer2.push(`<div class="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">`);
    Card($$renderer2, {
      class: "w-full max-w-sm shadow-lg",
      children: ($$renderer3) => {
        Card_header($$renderer3, {
          class: "space-y-1",
          children: ($$renderer4) => {
            Card_title($$renderer4, {
              class: "text-xl font-bold",
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Welcome back`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----> `);
            Card_description($$renderer4, {
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->Sign in to access the admin dashboard`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!---->`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!----> `);
        Card_content($$renderer3, {
          children: ($$renderer4) => {
            $$renderer4.push(`<form class="space-y-4">`);
            {
              $$renderer4.push("<!--[-1-->");
            }
            $$renderer4.push(`<!--]--> <div class="space-y-2"><label for="email" class="text-sm font-medium text-slate-700">Email</label> <input id="email" type="email"${attr("value", email)} required="" class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent" placeholder="admin@example.com"${attr("disabled", loading, true)}/></div> <div class="space-y-2"><label for="password" class="text-sm font-medium text-slate-700">Password</label> <input id="password" type="password"${attr("value", password)} required="" class="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent" placeholder="Enter your password"${attr("disabled", loading, true)}/></div> `);
            Button($$renderer4, {
              type: "submit",
              class: "w-full bg-blue-600 hover:bg-blue-700",
              disabled: loading,
              children: ($$renderer5) => {
                $$renderer5.push(`<!---->${escape_html("Sign In")}`);
              },
              $$slots: { default: true }
            });
            $$renderer4.push(`<!----></form>`);
          },
          $$slots: { default: true }
        });
        $$renderer3.push(`<!---->`);
      },
      $$slots: { default: true }
    });
    $$renderer2.push(`<!----></div>`);
  });
}
export {
  _page as default
};
