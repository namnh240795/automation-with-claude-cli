import { a5 as sanitize_props, ad as spread_props, ab as slot, F as escape_html, k as attr_class, q as clsx, D as ensure_array_like } from "../../chunks/renderer.js";
import { c as cn } from "../../chunks/index2.js";
import { C as Card, a as Card_content } from "../../chunks/card-content.js";
import { I as Icon, A as Avatar, U as Users, B as Building_2 } from "../../chunks/avatar.js";
function Activity($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    [
      "path",
      {
        "d": "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
      }
    ]
  ];
  Icon($$renderer, spread_props([
    { name: "activity" },
    $$sanitized_props,
    {
      /**
       * @component @name Activity
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMjIgMTJoLTIuNDhhMiAyIDAgMCAwLTEuOTMgMS40NmwtMi4zNSA4LjM2YS4yNS4yNSAwIDAgMS0uNDggMEw5LjI0IDIuMThhLjI1LjI1IDAgMCAwLS40OCAwbC0yLjM1IDguMzZBMiAyIDAgMCAxIDQuNDkgMTJIMiIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/activity
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Chart_column($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["path", { "d": "M3 3v16a2 2 0 0 0 2 2h16" }],
    ["path", { "d": "M18 17V9" }],
    ["path", { "d": "M13 17V5" }],
    ["path", { "d": "M8 17v-3" }]
  ];
  Icon($$renderer, spread_props([
    { name: "chart-column" },
    $$sanitized_props,
    {
      /**
       * @component @name ChartColumn
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cGF0aCBkPSJNMyAzdjE2YTIgMiAwIDAgMCAyIDJoMTYiIC8+CiAgPHBhdGggZD0iTTE4IDE3VjkiIC8+CiAgPHBhdGggZD0iTTEzIDE3VjUiIC8+CiAgPHBhdGggZD0iTTggMTd2LTMiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/chart-column
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Trending_down($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["polyline", { "points": "22 17 13.5 8.5 8.5 13.5 2 7" }],
    ["polyline", { "points": "16 17 22 17 22 11" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trending-down" },
    $$sanitized_props,
    {
      /**
       * @component @name TrendingDown
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWxpbmUgcG9pbnRzPSIyMiAxNyAxMy41IDguNSA4LjUgMTMuNSAyIDciIC8+CiAgPHBvbHlsaW5lIHBvaW50cz0iMTYgMTcgMjIgMTcgMjIgMTEiIC8+Cjwvc3ZnPgo=) - https://lucide.dev/icons/trending-down
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Trending_up($$renderer, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  /**
   * @license lucide-svelte v0.468.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   */
  const iconNode = [
    ["polyline", { "points": "22 7 13.5 15.5 8.5 10.5 2 17" }],
    ["polyline", { "points": "16 7 22 7 22 13" }]
  ];
  Icon($$renderer, spread_props([
    { name: "trending-up" },
    $$sanitized_props,
    {
      /**
       * @component @name TrendingUp
       * @description Lucide SVG icon component, renders SVG Element with children.
       *
       * @preview ![img](data:image/svg+xml;base64,PHN2ZyAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogIHdpZHRoPSIyNCIKICBoZWlnaHQ9IjI0IgogIHZpZXdCb3g9IjAgMCAyNCAyNCIKICBmaWxsPSJub25lIgogIHN0cm9rZT0iIzAwMCIgc3R5bGU9ImJhY2tncm91bmQtY29sb3I6ICNmZmY7IGJvcmRlci1yYWRpdXM6IDJweCIKICBzdHJva2Utd2lkdGg9IjIiCiAgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIgogIHN0cm9rZS1saW5lam9pbj0icm91bmQiCj4KICA8cG9seWxpbmUgcG9pbnRzPSIyMiA3IDEzLjUgMTUuNSA4LjUgMTAuNSAyIDE3IiAvPgogIDxwb2x5bGluZSBwb2ludHM9IjE2IDcgMjIgNyAyMiAxMyIgLz4KPC9zdmc+Cg==) - https://lucide.dev/icons/trending-up
       * @see https://lucide.dev/guide/packages/lucide-svelte - Documentation
       *
       * @param {Object} props - Lucide icons props and any valid SVG attribute
       * @returns {FunctionalComponent} Svelte component
       *
       */
      iconNode,
      children: ($$renderer2) => {
        $$renderer2.push(`<!--[-->`);
        slot($$renderer2, $$props, "default", {});
        $$renderer2.push(`<!--]-->`);
      },
      $$slots: { default: true }
    }
  ]));
}
function Stat_card($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let {
      title,
      value,
      description,
      trend,
      icon: Icon2,
      class: className
    } = $$props;
    Card($$renderer2, {
      class: cn("relative overflow-hidden", className),
      children: ($$renderer3) => {
        Card_content($$renderer3, {
          class: "p-6",
          children: ($$renderer4) => {
            $$renderer4.push(`<div class="flex items-start justify-between"><div class="space-y-2"><p class="text-sm font-medium text-slate-600">${escape_html(title)}</p> <p class="text-3xl font-bold text-slate-900">${escape_html(value)}</p> `);
            if (description) {
              $$renderer4.push("<!--[0-->");
              $$renderer4.push(`<p class="text-xs text-slate-500">${escape_html(description)}</p>`);
            } else {
              $$renderer4.push("<!--[-1-->");
            }
            $$renderer4.push(`<!--]--> `);
            if (trend) {
              $$renderer4.push("<!--[0-->");
              $$renderer4.push(`<div${attr_class(clsx(cn("flex items-center gap-1 text-xs font-medium", trend.positive ? "text-green-600" : "text-red-600")))}>`);
              if (trend.positive) {
                $$renderer4.push("<!--[0-->");
                Trending_up($$renderer4, { class: "h-3 w-3" });
              } else {
                $$renderer4.push("<!--[-1-->");
                Trending_down($$renderer4, { class: "h-3 w-3" });
              }
              $$renderer4.push(`<!--]--> <span>${escape_html(trend.value)}%</span> <span class="text-slate-500 font-normal">vs last month</span></div>`);
            } else {
              $$renderer4.push("<!--[-1-->");
            }
            $$renderer4.push(`<!--]--></div> `);
            if (Icon2) {
              $$renderer4.push("<!--[0-->");
              $$renderer4.push(`<div class="rounded-lg bg-blue-50 p-3">`);
              if (Icon2) {
                $$renderer4.push("<!--[-->");
                Icon2($$renderer4, { class: "h-6 w-6 text-blue-600" });
                $$renderer4.push("<!--]-->");
              } else {
                $$renderer4.push("<!--[!-->");
                $$renderer4.push("<!--]-->");
              }
              $$renderer4.push(`</div>`);
            } else {
              $$renderer4.push("<!--[-1-->");
            }
            $$renderer4.push(`<!--]--></div>`);
          },
          $$slots: { default: true }
        });
      },
      $$slots: { default: true }
    });
  });
}
function Activity_feed($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    let { title = "Recent Activity", activities, class: className } = $$props;
    function formatTime(date) {
      const now = /* @__PURE__ */ new Date();
      const diff = now.getTime() - date.getTime();
      const minutes = Math.floor(diff / 6e4);
      const hours = Math.floor(diff / 36e5);
      const days = Math.floor(diff / 864e5);
      if (minutes < 1) return "Just now";
      if (minutes < 60) return `${minutes}m ago`;
      if (hours < 24) return `${hours}h ago`;
      if (days < 7) return `${days}d ago`;
      return date.toLocaleDateString();
    }
    function getInitials(email) {
      return email.slice(0, 2).toUpperCase();
    }
    $$renderer2.push(`<div${attr_class(clsx(cn("bg-white rounded-lg border shadow-sm", className)))}><div class="px-6 py-4 border-b"><h3 class="font-semibold text-slate-900">${escape_html(title)}</h3></div> <div class="divide-y"><!--[-->`);
    const each_array = ensure_array_like(activities);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let activity = each_array[$$index];
      $$renderer2.push(`<div class="flex items-start gap-4 px-6 py-4">`);
      Avatar($$renderer2, {
        class: "h-8 w-8 shrink-0",
        children: ($$renderer3) => {
          $$renderer3.push(`<span class="text-xs font-medium text-slate-600">${escape_html(getInitials(activity.email))}</span>`);
        },
        $$slots: { default: true }
      });
      $$renderer2.push(`<!----> <div class="flex-1 min-w-0"><p class="text-sm text-slate-900"><span class="font-medium">${escape_html(activity.user)}</span> <span class="text-slate-600">${escape_html(activity.action)}</span> `);
      if (activity.target) {
        $$renderer2.push("<!--[0-->");
        $$renderer2.push(`<span class="font-medium text-blue-600">${escape_html(activity.target)}</span>`);
      } else {
        $$renderer2.push("<!--[-1-->");
      }
      $$renderer2.push(`<!--]--></p> <p class="text-xs text-slate-500">${escape_html(formatTime(activity.timestamp))}</p></div></div>`);
    }
    $$renderer2.push(`<!--]--> `);
    if (activities.length === 0) {
      $$renderer2.push("<!--[0-->");
      $$renderer2.push(`<div class="px-6 py-8 text-center text-sm text-slate-500">No recent activity</div>`);
    } else {
      $$renderer2.push("<!--[-1-->");
    }
    $$renderer2.push(`<!--]--></div></div>`);
  });
}
function _page($$renderer, $$props) {
  $$renderer.component(($$renderer2) => {
    const stats = [
      {
        title: "Total Users",
        value: "127",
        description: "Active users",
        trend: { value: 12, positive: true },
        icon: Users
      },
      {
        title: "Organizations",
        value: "24",
        description: "Active organizations",
        trend: { value: 8, positive: true },
        icon: Building_2
      },
      {
        title: "API Calls",
        value: "12.4K",
        description: "This month",
        trend: { value: 23, positive: true },
        icon: Chart_column
      },
      {
        title: "System Health",
        value: "Healthy",
        description: "All systems operational",
        trend: void 0,
        icon: Activity
      }
    ];
    const activities = [
      {
        id: "1",
        user: "Sarah Chen",
        email: "sarah@company.com",
        action: "created new organization",
        target: "Acme Corp",
        timestamp: new Date(Date.now() - 1e3 * 60 * 15)
      },
      {
        id: "2",
        user: "Mike Johnson",
        email: "mike@company.com",
        action: "invited user",
        target: "john@newco.com",
        timestamp: new Date(Date.now() - 1e3 * 60 * 45)
      },
      {
        id: "3",
        user: "Lisa Park",
        email: "lisa@company.com",
        action: "updated role for",
        target: "admin@org.com",
        timestamp: new Date(Date.now() - 1e3 * 60 * 120)
      },
      {
        id: "4",
        user: "Tom Wilson",
        email: "tom@company.com",
        action: "signed in from",
        target: "Chrome / macOS",
        timestamp: new Date(Date.now() - 1e3 * 60 * 180)
      }
    ];
    $$renderer2.push(`<div class="space-y-6"><div class="flex items-center justify-between"><div><h1 class="text-2xl font-bold text-slate-900">Welcome back</h1> <p class="text-slate-600">Here's what's happening with your dashboard.</p></div> <div class="text-sm text-slate-500">${escape_html((/* @__PURE__ */ new Date()).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    }))}</div></div> <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4"><!--[-->`);
    const each_array = ensure_array_like(stats);
    for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
      let stat = each_array[$$index];
      Stat_card($$renderer2, spread_props([stat]));
    }
    $$renderer2.push(`<!--]--></div> <div class="grid gap-6 lg:grid-cols-2">`);
    Activity_feed($$renderer2, { title: "Recent Activity", activities });
    $$renderer2.push(`<!----> <div class="bg-white rounded-lg border shadow-sm p-6"><h3 class="font-semibold text-slate-900 mb-4">Quick Actions</h3> <div class="grid gap-3"><a href="/users/new" class="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">+ Add New User</a> <a href="/organizations/new" class="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-slate-300 px-4 py-3 text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-colors">+ Create Organization</a></div></div></div></div>`);
  });
}
export {
  _page as default
};
