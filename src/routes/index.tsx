import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, MapPin } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import questionsImg from "@/assets/questions.jpg";
import spaceImg from "@/assets/space.jpg";
import catalogImg from "@/assets/catalog.jpg";

// 高德地图坐标 (GCJ-02) — 创客厅 · 汇金云创·人才科创综合体
// 来源:https://surl.amap.com/1CfCqvUr15I
const CREATIVE_LOUNGE_LOCATION = {
  lat: 30.335792,
  lng: 120.158111,
  name: "创客厅 · 汇金云创",
};

// 站点头像 / favicon
const LOGO_URL = "https://51-1327029614.cos.ap-shanghai.myqcloud.com/pitch/cslogo.png";

// 唤起高德地图导航:PC 跳转网页端、移动端唤起 App
function openAmapUniversal({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const destName = encodeURIComponent(name);
  // uri.amap.com 会自动判断设备,唤起 App 或跳转网页
  const url = `https://uri.amap.com/navigation?to=${lng},${lat},${destName}&mode=car&policy=1&src=csgeekr&coordinate=gaode&callnative=1`;
  window.open(url, "_blank");
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "创客厅 · 全世界的创造者联合起来" },
      { name: "description", content: "我们在杭州，为充满好奇和创造力的人打造了一个创业者会客厅。一个好问题，比一百个答案更有力量。" },
      { property: "og:title", content: "创客厅 · 全世界的提问者联合起来" },
      { property: "og:description", content: "在杭州，由问题驱动的创业者会客厅。" },
      { property: "og:image", content: LOGO_URL },
    ],
    links: [
      { rel: "icon", href: LOGO_URL, type: "image/png" },
      { rel: "apple-touch-icon", href: LOGO_URL },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
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

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%", background: "var(--brand)" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px]"
    />
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
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
        <a href="/" className="flex items-center gap-2 font-display text-lg font-bold tracking-tight">
          <img
            src={LOGO_URL}
            alt="创客厅 logo"
            className="h-7 w-7 rounded-full object-cover"
          />
          DN杭州 · 杭创营
        </a>
        <nav className="hidden gap-8 text-sm md:flex">
          <a href="#what" className="hover:text-[var(--brand)] transition">关于</a>
          <a href="#space" className="hover:text-[var(--brand)] transition">空间</a>
          <a href="#catalog" className="hover:text-[var(--brand)] transition">新全球概览</a>
          <a href="#visit" className="hover:text-[var(--brand)] transition">到访</a>
        </nav>
        <a
          href={`https://uri.amap.com/navigation?to=${CREATIVE_LOUNGE_LOCATION.lng},${CREATIVE_LOUNGE_LOCATION.lat},${encodeURIComponent(CREATIVE_LOUNGE_LOCATION.name)}&mode=car&policy=1&src=csgeekr&coordinate=gaode&callnative=1`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            openAmapUniversal(CREATIVE_LOUNGE_LOCATION);
          }}
          aria-label="使用高德地图导航至创客厅"
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
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.4]);
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-0 md:pt-24">
      <div className="relative mx-auto h-[88vh] w-[calc(100%-2rem)] max-w-[1600px] overflow-hidden md:w-[calc(100%-5rem)]">
        <motion.img
          style={{ y: heroY, opacity: heroOpacity }}
          src={heroImg}
          alt="创客厅里的提问者们"
          width={1920}
          height={1280}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-12">
          <div className="flex items-center justify-between text-[var(--paper)]/80 text-xs uppercase tracking-[0.2em]">
            <span>EST. 2026 · Hangzhou</span>
            <span>No. 001 — Innovators, United</span>
          </div>
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[var(--paper)] leading-[0.92] text-[clamp(3.5rem,9vw,11rem)]"
            >
              <span className="font-light">全世界的</span>
              <br />
              <span
                className="inline-block px-3 md:px-5 font-bold align-baseline text-[var(--paper)]"
                style={{ background: "var(--brand)" }}
              >
                创造者
              </span>
              <br className="md:hidden" />
              <span className="font-light">联合</span><span className="font-bold">起来</span>
            </motion.h1>
            <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-xl text-base text-[var(--paper)]/90 md:text-lg"
              >
                我们在杭州，为那些充满好奇和创造力的人，打造了一个创造者会客厅。
              </motion.p>
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
    "杭州 · 拱墅 · 创客厅",
    "New Whole Earth Catalog",
  ];
  return (
    <div
      className="overflow-hidden border-y py-5 font-display text-xl"
      style={{ background: "var(--brand)", color: "var(--paper)" }}
    >
      <div className="flex animate-[scroll_20s_linear_infinite] gap-12 whitespace-nowrap md:animate-[scroll_40s_linear_infinite]">
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

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionWhat() {
  return (
    <section id="what" className="relative px-6 py-32 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><SectionLabel n="01">我们看重什么</SectionLabel></Reveal>
        <div className="mt-10 grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-7">
            <h2 className="font-display text-5xl leading-[1.02] md:text-[6.5rem]">
              <span className="font-light">好的</span><span className="font-bold">提问</span>
              <span className="font-serif-italic italic font-normal text-[var(--brand)]">，</span>
              <br />
              <span className="font-light">比答案</span>
              <span className="inline-block px-2 md:px-3 ml-2 font-bold" style={{ background: "var(--brand)", color: "var(--paper)" }}>更重要</span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="space-y-6 self-end text-lg leading-relaxed md:col-span-5 md:text-xl">
            <p>这个时代，信息从不稀缺。稀缺的，是好问题。</p>
            <p>我们相信：一个好问题，比一百个答案更有力量。我们想要邀请习惯性深度思考和提问的创造者们，一起来创客厅探讨，这个时代真正值得被看见、被思考、被解决的问题。</p>
            <p className="font-display font-medium text-2xl" style={{ color: "var(--brand)" }}>
              Driven by questions, not tasks.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionDetails() {
  const questions = [
    "有这么多AI提效工具，为什么人反而更焦虑？",
    "逃离大城市内卷后应该如何生活？",
    "为什么100w的充电头可以做的如此之小？",
  ];
  return (
    <section className="relative overflow-hidden text-[var(--paper)]" style={{ background: "var(--ink)" }}>
      <div className="grid gap-0 md:grid-cols-2">
        <div className="relative min-h-[60vh]">
          <motion.img
            initial={{ scale: 1.15 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            src={questionsImg}
            alt="贴满问题的玻璃墙"
            width={1280}
            height={1280}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
        </div>
        <div className="px-6 py-20 md:px-14 md:py-28">
          <Reveal><SectionLabel n="02"><span className="text-white">从哪个问题开始？</span></SectionLabel></Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 font-display text-5xl leading-[1.02] md:text-7xl">
              <span className="font-bold">卓越的创造力</span>
           
              <br />
              <span className="inline-block px-2 md:px-3 my-1 font-bold" style={{ background: "var(--brand)", color: "var(--paper)" }}>
                往往藏于细节
              </span><br />
              
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-[var(--paper)]/80 md:text-lg">
              不必从一个宏大的问题开始，很多真正重要的问题，一开始都不是以"大问题"的形式出现的，而是以一种微妙的不舒服、好奇、疑惑、荒诞、困惑出现的。
            </p>
          </Reveal>
          <ul className="mt-12 space-y-6">
            {questions.map((q, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.12 }}
                className="group flex gap-5 border-t border-[var(--paper)]/15 pt-6"
              >
                <span className="font-display text-sm text-[var(--paper)]/40">0{i + 1}</span>
                <p className="font-display text-xl leading-snug transition group-hover:text-[#7B7AFF] md:text-2xl">
                  {q}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function SectionWho() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const titleX = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  return (
    <section ref={ref} className="px-6 py-32 md:px-10 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><SectionLabel n="03">我们想邀请你一起</SectionLabel></Reveal>
        <div className="mt-10 grid gap-16 md:grid-cols-12 md:items-end">
          <Reveal delay={0.15} className="md:col-span-6 md:col-start-7 order-2 md:order-1">
            <p className="text-lg leading-relaxed md:text-xl">
              不知道你最近，有没有被什么问题抓住？
            </p>
            <p className="mt-6 text-base leading-relaxed text-[var(--ink)]/75">
              提出问题只是开始。我们想邀请对相似问题感兴趣的伙伴来到创客厅，彼此认识，相互看见——也许你们会因共同关心某个问题而彼此看见，甚至展开协作。也许甚至，我们可以因此构建一个以真实表达和共同信念为根基的信任网络。
            </p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-10 relative inline-block font-display text-2xl md:text-3xl leading-snug"
            >
              <span className="relative z-10 px-3 py-1" style={{ background: "var(--brand)", color: "var(--paper)" }}>
              也许一段好关系，
                <br />
                就从一个好问题开始。
              </span>
            </motion.p>
          </Reveal>
          <Reveal className="md:col-span-12 md:row-start-1 order-1">
            <motion.h2 style={{ x: titleX }} className="font-display text-5xl leading-[0.98] md:text-[10rem]">
              <span className="font-light">来</span><span className="font-bold">线下创客厅</span>
              <span className="font-serif-italic italic font-normal text-[var(--brand)]">，</span>
              <br />
              <span className="font-light">遇见</span>
              <span className="inline-block px-3 md:px-5 ml-2 font-bold" style={{ background: "var(--brand)", color: "var(--paper)" }}>
                同类
              </span>
              <span className="font-serif-italic italic font-normal">.</span>
            </motion.h2>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function SectionAmenities() {
  const current = [
    "40个免费公园临窗工位",
    "半户外开放式咖啡讨论区",
    "专业技术与创业书籍借阅",
    "拓竹3D打印设备",
    "2个小会议室 + 1个大会议室",
    "免费注册公司 + 创业政策对接 + 算力补贴支持",
  ];
  const future = [
    "4000平超大创意办公空间",
    "Maker Lab元宇宙设备（VR / 触感手套 / 空间音频  / 全向跑步机等）",
    "可容纳200+伙伴的住宿区",
    "项目路演舞台",
    "多媒体娱乐室和餐饮区",
    "初创项目1v1免费咨询和投融资对接支持",
  ];
  return (
    <section id="space" className="px-6 py-32 md:px-10 md:py-44" style={{ background: "var(--brand)", color: "var(--paper)" }}>
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--paper)]/70">
          <span className="font-display font-bold text-[var(--paper)]">04</span>
          <span className="h-px flex-1 max-w-12 bg-[var(--paper)]/40" />
          一个真实存在的根据地
        </div>
        <AnimatedAmenitiesTitle />

        <Reveal className="mt-20 overflow-hidden">
          <motion.img
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            src={spaceImg}
            alt="创客厅空间"
            width={1600}
            height={1100}
            loading="lazy"
            className="h-[50vh] w-full object-cover"
          />
        </Reveal>

        <div className="mt-20 grid gap-16 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--paper)]/70">
              NOW · 作为DN杭州的先行空间
            </p>
            <ul className="mt-6 divide-y divide-[var(--paper)]/20 border-y border-[var(--paper)]/20">
              {current.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.07 }}
                  className="flex items-center gap-4 py-5 font-display text-xl md:text-2xl"
                >
                  <span className="text-sm text-[var(--paper)]/50">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[var(--paper)]/70">
              SOON · 未来社区主空间完善后
            </p>
            <ul className="mt-6 space-y-4">
              {future.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  whileHover={{ x: 6 }}
                  className="rounded-2xl border border-dashed border-[var(--paper)]/40 px-5 py-4 font-display text-lg"
                >
                  + {item}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionCatalog() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgRotate = useTransform(scrollYProgress, [0, 1], [-4, 4]);
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  return (
    <section ref={ref} id="catalog" className="px-6 py-32 md:px-10 md:py-44 overflow-hidden">
      <div className="mx-auto max-w-[1400px]">
        <Reveal><SectionLabel n="05">我们一起可以做些什么</SectionLabel></Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-10 font-display text-4xl leading-[1.02] md:text-[7rem]">
            <span className="font-light">一起</span><span className="font-bold">筹备</span><br />
            <span className="font-light">新时代的</span><br />
            <span className="inline-block whitespace-nowrap px-3 font-bold" style={{ background: "var(--brand)", color: "var(--paper)" }}>
              「新全球概览」
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <motion.img
              style={{ rotate: imgRotate, y: imgY }}
              src={catalogImg}
              alt="Whole Earth Catalog 致敬"
              width={1600}
              height={1100}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <p className="mt-3 text-xs uppercase tracking-[0.2em] text-[var(--ink)]/55">
              REF. Whole Earth Catalog, 1968 — Stewart Brand
            </p>
          </Reveal>
          <Reveal delay={0.15} className="space-y-6 text-base leading-relaxed md:col-span-7 md:text-lg">
            <p>
              1968 年，Stewart Brand 创办《全球概览》——那是最早将科技视为改变人类生活方式、提升人类创造力的革命性工具的媒体。它不止是百科全书，更是一种面向世界的好奇心，一种"人可以借助工具、知识、网络和彼此，把生活重新组织起来"的开放感。
            </p>
            
            <p>
              我们想传承这种精神。将大家提出的好问题、好思路、好方案汇聚起来，打造成贡献给这个时代的开源资产——一张活的问题地图：记录此地此刻的人们，正在如何重新理解工具、地方、生活、知识、协作和未来。
            </p>
            <blockquote className="border-l-2 pl-6 font-display text-2xl leading-snug" style={{ borderColor: "var(--brand)" }}>
            如果你的心里也一直有放不下的议题，欢迎来创客厅和我们一起探讨。
            <br />
            也许在这里，你会遇见和你志趣相投的创业同行者。
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function AnimatedAmenitiesTitle() {
  const parts = [
    { c: "创", w: "font-light" },
    { c: "客", w: "font-bold" },
    { c: "厅", w: "font-light" },
    { c: "有", w: "font-serif-italic italic font-normal" },
    { c: "什", w: "font-bold" },
    { c: "么", w: "font-light" },
  ];
  return (
    <h2 className="mt-10 font-display text-3xl leading-[1.02] md:text-[8rem] flex flex-nowrap items-baseline md:flex-wrap">
      {parts.map((p, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 80, rotate: -8 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -12 }}
          className={`inline-block cursor-default ${p.w}`}
        >
          {p.c}
        </motion.span>
      ))}
    </h2>
  );
}

function FooterCTA() {
  const fullAddress = "杭州市拱墅区妙家浜巷59号 汇金云创·人才科创综合体";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = fullAddress;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="visit" className="relative px-6 py-24 md:px-10 md:py-32" style={{ background: "var(--ink)", color: "var(--paper)" }}>
      <div className="mx-auto max-w-[1600px]">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--paper)]/60">直达创客厅 · DROP BY</p>
        <h2 className="mt-8 font-display leading-[0.92] text-[clamp(3rem,12vw,15rem)]">
          <span className="font-light">全世界的</span>
          <span className="inline-block px-3 md:px-5 font-bold" style={{ background: "var(--brand)", color: "var(--paper)" }}>创造者</span><br />
          <span className="font-light">联合</span><span className="font-bold">起来</span>
          <span className="font-serif-italic italic font-normal text-[var(--brand)]">.</span>
        </h2>

        <div className="mt-16 grid gap-10 border-t border-[var(--paper)]/20 pt-10 md:grid-cols-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--paper)]/50">ADDRESS</p>
            <div className="mt-3 flex flex-wrap items-start gap-4">
              <p className="font-display text-lg leading-snug">
                杭州市拱墅区妙家浜巷59号<br />
                汇金云创·人才科创综合体
              </p>
              <button
                type="button"
                onClick={handleCopy}
                aria-label="复制地址全称"
                className="group/copy inline-flex shrink-0 items-center gap-2 self-start rounded-full border border-[var(--paper)]/25 px-3.5 py-1.5 text-[11px] uppercase tracking-[0.22em] text-[var(--paper)]/75 transition-all duration-300 hover:border-[var(--brand)] hover:text-[var(--brand)]"
              >
                <span
                  className="flex h-4 w-4 items-center justify-center transition-transform duration-300 group-hover/copy:rotate-[-8deg]"
                  style={{ color: copied ? "var(--brand)" : "currentColor" }}
                >
                  {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                </span>
                {copied ? "已复制" : "复制地址"}
              </button>
            </div>
            <p
              className="mt-3 font-mono text-[11px] tracking-wider text-[var(--paper)]/40 transition-opacity duration-300"
              style={{ opacity: copied ? 1 : 0.6 }}
            >
              {fullAddress}
            </p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--paper)]/50">HOURS</p>
            <p className="mt-3 font-display text-lg">
              周一至周五<br />
              08:00 — 22:00
            </p>
          </div>
          <div className="flex md:justify-end">
            <a
              href={`https://uri.amap.com/navigation?to=${CREATIVE_LOUNGE_LOCATION.lng},${CREATIVE_LOUNGE_LOCATION.lat},${encodeURIComponent(CREATIVE_LOUNGE_LOCATION.name)}&mode=car&policy=1&src=csgeekr&coordinate=gaode&callnative=1`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.preventDefault();
                openAmapUniversal(CREATIVE_LOUNGE_LOCATION);
              }}
              aria-label="使用高德地图导航至创客厅"
              className="group relative inline-flex flex-col items-start gap-3 self-start"
            >
              <span
                aria-hidden
                className="absolute -left-3 -top-3 h-5 w-5 border-l-2 border-t-2 transition-all duration-500 group-hover:-left-4 group-hover:-top-4"
                style={{ borderColor: "var(--brand)" }}
              />
              <span
                aria-hidden
                className="absolute -right-3 -bottom-3 h-5 w-5 border-r-2 border-b-2 transition-all duration-500 group-hover:-right-4 group-hover:-bottom-4"
                style={{ borderColor: "var(--brand)" }}
              />
              <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[var(--paper)]/65">
                <span className="h-px w-7 bg-[var(--brand)]" />
                <MapPin className="h-3 w-3" style={{ color: "var(--brand)" }} />
                在高德地图打开
              </span>
              <span
                className="relative inline-flex items-center gap-4 overflow-hidden rounded-full px-7 py-4 font-display text-base font-medium tracking-wide transition-all duration-500 group-hover:shadow-[0_0_36px_rgba(123,122,255,0.35)] md:px-8 md:text-lg"
                style={{ background: "var(--brand)", color: "var(--paper)" }}
              >
                <span className="relative z-10">导航至创客厅</span>
                <span
                  className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--paper)]/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-[var(--paper)]/30"
                >
                  <ArrowUpRight className="h-4 w-4" />
                </span>
                <span
                  aria-hidden
                  className="absolute inset-0 -z-0 translate-y-full bg-[var(--ink)] transition-transform duration-500 group-hover:translate-y-0"
                />
                
              </span>
            </a>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-[var(--paper)]/15 pt-6 text-xs text-[var(--paper)]/50 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} 创客厅 / DN杭州 · 杭创营</span>
          <span >浙ICP备2026032840号-1</span>
        </div>
      </div>
    </footer>
  );
}
