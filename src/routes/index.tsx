import { createFileRoute } from "@tanstack/react-router";
import heroImg from "@/assets/hero.jpg";
import questionsImg from "@/assets/questions.jpg";
import spaceImg from "@/assets/space.jpg";
import catalogImg from "@/assets/catalog.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "创客厅 · 全世界的提问者联合起来" },
      { name: "description", content: "我们在杭州，为充满好奇和创造力的人打造了一个创业者会客厅。一个好问题，比一百个答案更有力量。" },
      { property: "og:title", content: "创客厅 · 全世界的提问者联合起来" },
      { property: "og:description", content: "在杭州，由问题驱动的创业者会客厅。" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <SectionWhat />
      <SectionDetails />
      <SectionWho />
      <SectionAmenities />
      <SectionCatalog />
      <FooterCTA />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10">
        <a href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <span className="inline-block h-3 w-3 rounded-full" style={{ background: "var(--brand)" }} />
          创客厅 / MAKERS HALL
        </a>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#what" className="hover:text-[var(--brand)] transition">关于</a>
          <a href="#space" className="hover:text-[var(--brand)] transition">空间</a>
          <a href="#catalog" className="hover:text-[var(--brand)] transition">新全球概览</a>
          <a href="#visit" className="hover:text-[var(--brand)] transition">到访</a>
        </nav>
        <a
          href="#visit"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-[var(--paper)] transition hover:opacity-90"
          style={{ background: "var(--brand)" }}
        >
          导航至创客厅 <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-24">
      <div className="relative mx-auto h-[88vh] w-[calc(100%-2rem)] max-w-[1600px] overflow-hidden md:w-[calc(100%-5rem)]">
        <img
          src={heroImg}
          alt="创客厅里的提问者们"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
          <div className="flex items-center justify-between text-[var(--paper)]/80 text-xs uppercase tracking-[0.2em]">
            <span>EST. 2025 · Hangzhou</span>
            <span>No. 001 — Questioners, Unite</span>
          </div>
          <div>
            <h1 className="font-display text-[var(--paper)] font-bold leading-[0.88] text-[clamp(2.75rem,9vw,11rem)]">
              全世界的<br />
              <span className="font-serif-italic font-normal" style={{ color: "var(--brand)" }}>
                提问者
              </span>
              联合起来
            </h1>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-base text-[var(--paper)]/90 md:text-lg">
                我们在杭州，为那些充满好奇和创造力的人，打造了一个创业者会客厅。
              </p>
              <a
                href="#visit"
                className="group inline-flex items-center gap-3 self-start rounded-full bg-[var(--paper)] px-7 py-4 font-display text-sm font-medium text-[var(--ink)] transition hover:bg-white"
              >
                导航至创客厅
                <span className="transition group-hover:translate-x-1" aria-hidden>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

function Marquee() {
  const items = [
    "Driven by questions",
    "not by tasks",
    "好的提问 · 比答案更重要",
    "Greatness lives in the details",
    "杭州 · 拱墅 · 科祥街",
    "New Whole Earth Catalog",
  ];
  return (
    <div
      className="overflow-hidden border-y py-5 font-display text-xl"
      style={{ background: "var(--brand)", color: "var(--paper)" }}
    >
      <div className="flex animate-[scroll_40s_linear_infinite] gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12">
            {t}
            <span aria-hidden>✱</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes scroll {from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
    </div>
  );
}

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--ink)]/60">
      <span className="font-display font-bold" style={{ color: "var(--brand)" }}>
        {n}
      </span>
      <span className="h-px flex-1 max-w-12 bg-[var(--ink)]/30" />
      {children}
    </div>
  );
}

function SectionWhat() {
  return (
    <section id="what" className="relative px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="01">我们在做什么</SectionLabel>
        <div className="mt-10 grid gap-16 md:grid-cols-12">
          <h2 className="font-display text-5xl font-bold leading-[0.95] md:col-span-7 md:text-[7rem]">
            好的提问，<br />
            比答案<br />
            <span className="font-serif-italic font-normal" style={{ color: "var(--brand)" }}>更重要</span>
          </h2>
          <div className="space-y-6 self-end text-lg leading-relaxed md:col-span-5 md:text-xl">
            <p>这个时代，信息从不稀缺。稀缺的，是好问题。</p>
            <p>我们相信：一个好问题，比一百个答案更有力量。所以我们想邀请你，一起来探讨这个时代真正值得被看见、被思考、被解决的问题。</p>
            <p className="font-serif-italic text-2xl" style={{ color: "var(--brand)" }}>
              Driven by questions, not tasks.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionDetails() {
  const questions = [
    "为什么我们有这么多AI提效工具，反而更焦虑了？",
    "为什么越来越多人想逃离大城市，却不确定离开后应该如何生活？",
    "为什么有越来越多的孩子患上了抑郁症？",
  ];
  return (
    <section className="relative overflow-hidden text-[var(--paper)]" style={{ background: "var(--ink)" }}>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative min-h-[60vh]">
          <img
            src={questionsImg}
            alt="贴满问题的玻璃墙"
            width={1280}
            height={1280}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
        </div>
        <div className="px-6 py-20 md:px-14 md:py-28">
          <SectionLabel n="02">什么样的问题值得被找</SectionLabel>
          <h2 className="mt-8 font-display text-5xl font-bold leading-[0.95] md:text-7xl">
            伟大<br />
            <span className="font-serif-italic font-normal" style={{ color: "#7B7AFF" }}>
              往往藏于
            </span><br />
            细节
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--paper)]/80 md:text-lg">
            不必从一个宏大的问题开始，伟大的事情往往诞生于细节之中。
            <span className="font-serif-italic"> Greatness lives in the details. </span>
            很多真正重要的问题，一开始都不是以"大问题"的形式出现的，而是以一种微妙的不舒服、好奇、疑惑、荒诞、困惑出现的。
          </p>
          <ul className="mt-12 space-y-6">
            {questions.map((q, i) => (
              <li key={i} className="group flex gap-5 border-t border-[var(--paper)]/15 pt-6">
                <span className="font-display text-sm text-[var(--paper)]/40">0{i + 1}</span>
                <p className="font-display text-xl leading-snug transition group-hover:text-[#7B7AFF] md:text-2xl">
                  {q}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SectionWho() {
  return (
    <section className="px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="03">我们是谁</SectionLabel>
        <div className="mt-10 grid gap-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6 md:col-start-7 order-2 md:order-1">
            <p className="text-lg leading-relaxed md:text-xl">
              不知道你最近，有没有被什么问题抓住？
            </p>
            <p className="mt-6 text-base leading-relaxed text-[var(--ink)]/75">
              提出问题只是开始，远不止终点。我们想要邀请对相似问题感兴趣的伙伴来到创客厅彼此认识、相互了解。也许你们可以因为共同关心某个问题而彼此看见，甚至因为一起整理线索而开始协作。
            </p>
            <p className="mt-6 text-base leading-relaxed text-[var(--ink)]/75">
              我们期待，一个好问题，可以成为一段好关系的媒介。
            </p>
          </div>
          <h2 className="font-display text-5xl font-bold leading-[0.95] md:col-span-12 md:row-start-1 md:text-[10rem] order-1">
            来线下，<br />
            遇见
            <span className="font-serif-italic font-normal" style={{ color: "var(--brand)" }}>
              同类
            </span>
            。
          </h2>
        </div>
      </div>
    </section>
  );
}

function SectionAmenities() {
  const current = [
    "40个公园临窗工位",
    "半户外开放式咖啡讨论区",
    "专业技术与创业书籍借阅",
    "拓竹3D打印设备",
    "2个小会议室 + 1个大会议室",
    "免费注册公司 + 创业政策对接 + 算力补贴支持",
  ];
  const future = [
    "项目路演舞台",
    "Maker Lab元宇宙设备（VR / 触感手套 / 全向跑步机等）",
    "长期住宿区",
    "餐饮健身区",
    "多媒体娱乐室",
  ];
  return (
    <section id="space" className="px-6 py-32 md:px-10 md:py-44" style={{ background: "var(--brand)", color: "var(--paper)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--paper)]/70">
          <span className="font-display font-bold text-[var(--paper)]">04</span>
          <span className="h-px flex-1 max-w-12 bg-[var(--paper)]/40" />
          会客厅现在能给你什么
        </div>
        <h2 className="mt-10 font-display text-5xl font-bold leading-[0.95] md:text-[8rem]">
          创客厅<br />
          <span className="font-serif-italic font-normal">有什么</span>
        </h2>

        <div className="mt-20 overflow-hidden">
          <img src={spaceImg} alt="创客厅空间" width={1600} height={1100} loading="lazy" className="h-[50vh] w-full object-cover" />
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--paper)]/70">
              NOW · 作为DN杭州的先行空间
            </p>
            <ul className="mt-6 divide-y divide-[var(--paper)]/20 border-y border-[var(--paper)]/20">
              {current.map((item, i) => (
                <li key={i} className="flex items-center gap-4 py-5 font-display text-xl md:text-2xl">
                  <span className="text-sm text-[var(--paper)]/50">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--paper)]/70">
              SOON · 未来社区主空间完善后
            </p>
            <ul className="mt-6 space-y-4">
              {future.map((item, i) => (
                <li key={i} className="rounded-2xl border border-dashed border-[var(--paper)]/40 px-5 py-4 font-display text-lg">
                  + {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionCatalog() {
  return (
    <section id="catalog" className="px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel n="05">这里的社区在做什么</SectionLabel>
        <h2 className="mt-10 font-display text-5xl font-bold leading-[0.95] md:text-[7rem]">
          一起筹备<br />
          新时代的<br />
          <span className="inline-block px-3" style={{ background: "var(--brand)", color: "var(--paper)" }}>
            「新全球概览」
          </span>
        </h2>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <img src={catalogImg} alt="Whole Earth Catalog 致敬" width={1600} height={1100} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--ink)]/55">
              REF. Whole Earth Catalog, 1968 — Stewart Brand
            </p>
          </div>
          <div className="space-y-6 text-base leading-relaxed md:col-span-7 md:text-lg">
            <p>
              我们钦赞"<span className="font-serif-italic">全球概览</span>"的精神，它是由布兰德于 1968 年创办的杂志，是最早将科技视为改变人类生活方式、提升人类创造能力的革命性工具的媒体。
            </p>
            <p>
              它不止是百科全书，更是展示了一种面向世界的好奇心，一种"人可以借助工具、知识、网络和彼此，把生活重新组织起来"的开放感。这与我们想要打造的、问题驱动的社区精神一脉相承。
            </p>
            <p>
              因此，我们也想要借助这次机会，将大家的提问和洞见，打造成独属于这个时代的"全球概览"。把好问题、好思路、好方案都收录起来，成为贡献给这个时代的开源资产。
            </p>
            <blockquote className="border-l-2 pl-6 font-display text-2xl leading-snug" style={{ borderColor: "var(--brand)" }}>
              它将成为一张活的问题地图：记录此地此刻的人们，正在如何重新理解工具、地方、生活、知识、协作与未来。
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterCTA() {
  return (
    <footer id="visit" className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto max-w-[1600px]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--paper)]/60">直达创客厅 · DROP BY</p>
        <h2 className="mt-8 font-display font-bold leading-[0.85] text-[clamp(3rem,12vw,15rem)]">
          全世界的<br />
          <span className="font-serif-italic font-normal" style={{ color: "#7B7AFF" }}>提问者</span><br />
          联合起来。
        </h2>

        <div className="mt-16 grid gap-10 border-t border-[var(--paper)]/20 pt-10 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--paper)]/50">ADDRESS</p>
            <p className="mt-3 font-display text-lg">
              杭州市拱墅区科祥街139号<br />
              汇金云创南门 6B-5楼
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--paper)]/50">HOURS</p>
            <p className="mt-3 font-display text-lg">
              周一至周日<br />
              09:00 — 22:00
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href="#"
              className="group inline-flex items-center gap-3 self-start rounded-full px-7 py-4 font-display text-sm font-medium text-[var(--ink)] transition hover:opacity-90"
              style={{ background: "var(--paper)" }}
            >
              导航至创客厅
              <span className="transition group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-[var(--paper)]/15 pt-6 text-xs text-[var(--paper)]/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} 创客厅 / Makers Hall — Hangzhou</span>
          <span className="font-serif-italic">Questioners of the world, unite.</span>
        </div>
      </div>
    </footer>
  );
}
