import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { ArrowUpRight, MapPin, RotateCw } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { motion } from "framer-motion";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { NAV_LOGO_URL, NAV_LOCATION, openAmapUniversal } from "../components/Nav";

function ErrorShell({
  badge,
  title,
  description,
  actions,
}: {
  badge: string;
  title: ReactNode;
  description: ReactNode;
  actions: ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-6 py-20">
      {/* 背景装饰 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 0.08, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full blur-3xl"
        style={{ background: "var(--brand)" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1.2 }}
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-0"
        style={{
          backgroundImage: "radial-gradient(var(--ink) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          opacity: 0.05,
        }}
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--ink)]/15 bg-[var(--paper)] px-4 py-1.5 font-display text-[11px] uppercase tracking-[0.3em] text-[var(--ink)]/65"
        >
          <span className="font-display font-bold" style={{ color: "var(--brand)" }}>
            ★
          </span>
          {badge}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-5xl leading-[0.95] md:text-8xl"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mx-auto mt-8 max-w-md text-base leading-relaxed text-[var(--ink)]/70 md:text-lg"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          {actions}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 flex items-center justify-center gap-2 text-xs text-[var(--ink)]/50"
        >
          <img
            src={NAV_LOGO_URL}
            alt="创客厅 logo"
            className="h-5 w-5 rounded-full object-cover"
          />
          DN杭州 · 杭创营 · 创客厅
        </motion.div>
      </div>
    </div>
  );
}

function CtaButton({
  to,
  href,
  onClick,
  children,
  variant = "primary",
  external = false,
  ariaLabel,
}: {
  to?: string;
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
  ariaLabel?: string;
}) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3 font-display text-sm font-medium transition-shadow duration-500 hover:shadow-[0_0_28px_4px_rgba(1,0,251,0.25)] md:text-base";
  const primary = "text-[var(--paper)]";
  const secondary =
    "border border-[var(--ink)]/15 text-[var(--ink)] hover:border-[var(--brand)] hover:text-[var(--brand)]";
  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 -z-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 ${
          variant === "primary" ? "bg-[var(--ink)]" : "bg-[var(--brand)]"
        }`}
      />
      <span className="relative z-10">{children}</span>
    </>
  );
  const className = `${base} ${variant === "primary" ? primary : secondary}`;

  if (to) {
    return (
      <Link to={to} className={className} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  return (
    <a
      href={href}
      onClick={onClick}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={className}
      aria-label={ariaLabel}
    >
      {inner}
    </a>
  );
}

function NotFoundComponent() {
  return (
    <ErrorShell
      badge="404 · 页面走丢了"
      title={
        <>
          <span className="font-light">这里没有</span>
          <span
            className="inline-block px-2 md:px-3 font-bold"
            style={{ background: "var(--brand)", color: "var(--paper)" }}
          >
            你找的页面
          </span>
          <span className="font-serif-italic italic font-normal text-[var(--brand)]">.</span>
        </>
      }
      description="可能链接已失效，或者地址输入有误。不如换个方向——回到创客厅看看，或者直接给我们留一个好问题。"
      actions={
        <>
          <CtaButton to="/" variant="primary" ariaLabel="回到创客厅首页">
            回到首页
            <span
              aria-hidden
              className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--paper)]/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-[var(--paper)]/30 md:h-8 md:w-8"
            >
              <ArrowUpRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </span>
          </CtaButton>
          <CtaButton to="/submit" variant="secondary" ariaLabel="提交你的问题">
            提交问题
          </CtaButton>
          <a
            href={`https://uri.amap.com/navigation?to=${NAV_LOCATION.lng},${NAV_LOCATION.lat},${encodeURIComponent(NAV_LOCATION.name)}&mode=car&policy=1&src=csgeekr&coordinate=gaode&callnative=1`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              openAmapUniversal(NAV_LOCATION);
            }}
            className="inline-flex items-center gap-2 text-sm text-[var(--ink)]/60 transition-colors hover:text-[var(--brand)]"
            aria-label="使用高德地图导航至创客厅"
          >
            <MapPin className="h-3.5 w-3.5" />
            导航到线下
          </a>
        </>
      }
    />
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <ErrorShell
      badge="出了点小状况"
      title={
        <>
          <span className="font-light">页面</span>
          <span
            className="inline-block px-2 md:px-3 font-bold"
            style={{ background: "var(--brand)", color: "var(--paper)" }}
          >
            没加载出来
          </span>
          <span className="font-serif-italic italic font-normal text-[var(--brand)]">.</span>
        </>
      }
      description="可能是网络波动，也可能是我们的服务打了个盹。你可以刷新再试，或者直接回到首页继续探索。"
      actions={
        <>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-6 py-3 font-display text-sm font-medium text-[var(--paper)] transition-shadow duration-500 hover:shadow-[0_0_28px_4px_rgba(1,0,251,0.25)] md:text-base"
            style={{ background: "var(--brand)" }}
            aria-label="重试加载"
          >
            <span
              aria-hidden
              className="absolute inset-0 -z-0 translate-y-full bg-[var(--ink)] transition-transform duration-500 group-hover:translate-y-0"
            />
            <RotateCw className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:rotate-180" />
            <span className="relative z-10">再试一次</span>
          </button>
          <CtaButton to="/" variant="secondary" ariaLabel="回到创客厅首页">
            回到首页
          </CtaButton>
        </>
      }
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "csgeeker" },
      { name: "description", content: "Curiosity Hub Hangzhou is a community website for curious and creative individuals in Hangzhou." },
      { name: "author", content: "Lovable" },
      { property: "og:title", content: "csgeeker" },
      { property: "og:description", content: "Curiosity Hub Hangzhou is a community website for curious and creative individuals in Hangzhou." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "csgeeker" },
      { name: "twitter:description", content: "Curiosity Hub Hangzhou is a community website for curious and creative individuals in Hangzhou." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/19be9eef-500c-46cd-a31e-9c8fd2acaa8f/id-preview-d2f18746--e4ab6ce1-f338-46f6-a43b-a5dfb1c3c9b7.lovable.app-1780680966404.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/19be9eef-500c-46cd-a31e-9c8fd2acaa8f/id-preview-d2f18746--e4ab6ce1-f338-46f6-a43b-a5dfb1c3c9b7.lovable.app-1780680966404.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Instrument+Serif:ital@0;1&family=Noto+Sans+SC:wght@300;400;500;700;900&family=Noto+Serif+SC:wght@400;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
