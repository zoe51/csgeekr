import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";

// 站点头像 / favicon
export const NAV_LOGO_URL =
  "https://51-1327029614.cos.ap-shanghai.myqcloud.com/pitch/cslogo.png";

// 高德地图坐标 (GCJ-02) — 创客厅 · 汇金云创·人才科创综合体
export const NAV_LOCATION = {
  lat: 30.335792,
  lng: 120.158111,
  name: "创客厅 · 汇金云创",
};

function openAmapUniversal({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const destName = encodeURIComponent(name);
  const url = `https://uri.amap.com/navigation?to=${lng},${lat},${destName}&mode=car&policy=1&src=csgeekr&coordinate=gaode&callnative=1`;
  window.open(url, "_blank");
}

export { openAmapUniversal };

const NAV_ITEMS = [
  { label: "关于", to: "/" as const },
  { label: "提问", to: "/submit" as const },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { location } = useRouterState();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "translate-y-0 opacity-100 bg-[var(--paper)]/85 backdrop-blur-md border-b border-[var(--ink)]/10 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent -translate-y-full opacity-0 md:translate-y-0 md:opacity-100"
      }`}
    >
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <Link
          to="/"
          className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
        >
          <img
            src={NAV_LOGO_URL}
            alt="创客厅 logo"
            className="h-7 w-7 rounded-full object-cover"
          />
          DN杭州 · 杭创营
        </Link>
        <nav className="hidden gap-8 text-sm md:flex">
          {NAV_ITEMS.map((item) => {
            const active =
              item.to === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative transition ${
                  active
                    ? "text-[var(--brand)]"
                    : "hover:text-[var(--brand)]"
                }`}
              >
                {item.label}
                <span
                  aria-hidden
                  className={`absolute -bottom-1.5 left-0 h-px bg-[var(--brand)] transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <a
          href={`https://uri.amap.com/navigation?to=${NAV_LOCATION.lng},${NAV_LOCATION.lat},${encodeURIComponent(NAV_LOCATION.name)}&mode=car&policy=1&src=csgeekr&coordinate=gaode&callnative=1`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            openAmapUniversal(NAV_LOCATION);
          }}
          aria-label="使用高德地图导航至创客厅"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--paper)] transition hover:opacity-90"
          style={{ background: "var(--brand)" }}
        >
          <MapPin className="h-3.5 w-3.5" />
          导航至创客厅 <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
