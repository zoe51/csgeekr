import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Eye, EyeOff, Send } from "lucide-react";
import { Nav, NAV_LOGO_URL } from "@/components/Nav";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "提一个好问题 · 创客厅" },
      {
        name: "description",
        content: "把你的好问题提交给创客厅——我们用问题驱动社区，把每个值得被看见的问题收集起来。",
      },
      { property: "og:title", content: "提一个好问题 · 创客厅" },
      { property: "og:description", content: "在杭州，由问题驱动的创业者会客厅。把你最近心里放不下的那个问题，提交给我们。" },
      { property: "og:image", content: NAV_LOGO_URL },
    ],
    links: [
      { rel: "icon", href: NAV_LOGO_URL, type: "image/png" },
      { rel: "apple-touch-icon", href: NAV_LOGO_URL },
    ],
  }),
  component: SubmitPage,
});

type FormState = "idle" | "submitting" | "success";

function SubmitPage() {
  const [question, setQuestion] = useState("");
  const [contact, setContact] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [state, setState] = useState<FormState>("idle");
  const [error, setError] = useState<string | null>(null);

  // 数据提交接口
  // 开发期走 Vite 代理（/coze → http://14.103.87.224:7781），生产环境由反向代理（nginx）转发
  const SUBMIT_ENDPOINT = "/coze/workflow/run";
  const WORKFLOW_ID = "7649245333243723817";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (state === "submitting") return;
    if (!question.trim()) {
      setError("问题不能为空，先写下你心里那个最想问的事。");
      return;
    }
    if (!isPublic && !contact.trim()) {
      setError("不公开的问题请留下联系邮箱，我们将私密回复你。");
      return;
    }
    setError(null);
    setState("submitting");
    try {
      const response = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workflow_id: WORKFLOW_ID,
          parameters: {
            contact: contact.trim(),
            question: question.trim(),
            type: isPublic ? "公开" : "不公开",
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`服务返回 ${response.status}`);
      }
      // 尝试解析 JSON 响应（即使解析失败也视为成功，因为接口已 2xx）
      try {
        await response.json();
      } catch {
        /* 忽略非 JSON 响应 */
      }
      setState("success");
    } catch (err) {
      let message = "提交失败，请稍后再试。";
      if (err instanceof TypeError) {
        // 浏览器抛 TypeError 多为 CORS / 网络层失败
        message =
          "提交失败：无法连接到创客厅服务（可能是网络问题或服务暂时不可用）。请稍后再试，或直接联系创客厅。";
      } else if (err instanceof Error) {
        message = `提交失败：${err.message}。请稍后再试。`;
      }
      setError(message);
      setState("idle");
    }
  };

  const handleReset = () => {
    setQuestion("");
    setContact("");
    setIsPublic(true);
    setState("idle");
    setError(null);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <ScrollProgress />

      {/* Hero / 页头 */}
      <section className="relative px-6 pt-32 pb-12 md:px-10 md:pt-40 md:pb-16">
        <div className="mx-auto max-w-[1200px]">
          <Reveal>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-[var(--ink)]/60">
              <span className="font-display font-bold" style={{ color: "var(--brand)" }}>
                01
              </span>
              <span className="h-px flex-1 max-w-12 bg-[var(--ink)]/30" />
              提问 / SUBMIT A QUESTION
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="mt-10 font-display leading-[0.95] text-5xl md:text-[7rem]">
              <span className="font-light">让问题</span>
              <span
                className="inline-block px-2 md:px-3 font-bold"
                style={{ background: "var(--brand)", color: "var(--paper)" }}
              >
                被看见
              </span>
              
              <span className="font-serif-italic italic font-normal text-[var(--brand)]">.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-lg leading-relaxed text-[var(--ink)]/75 md:text-xl">
              这个时代真正稀缺的不是答案，是好问题。把你最近反复在想、却一直没找到合适出口的疑问写下来——我们会认真对待每一个被提交的问题。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 表单 + 说明 */}
      <section className="relative px-6 pb-32 md:px-10 md:pb-44">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-12 md:gap-16">
          {/* 左侧:表单 */}
          <Reveal className="md:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden border border-[var(--ink)]/10 bg-[var(--paper)]"
            >
              {/* 装饰边角 */}
              <span aria-hidden className="absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2" style={{ borderColor: "var(--brand)" }} />
              <span aria-hidden className="absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2" style={{ borderColor: "var(--brand)" }} />
              <span aria-hidden className="absolute left-3 bottom-3 h-3 w-3 border-l-2 border-b-2" style={{ borderColor: "var(--brand)" }} />
              <span aria-hidden className="absolute right-3 bottom-3 h-3 w-3 border-r-2 border-b-2" style={{ borderColor: "var(--brand)" }} />

              <div className="p-6 md:p-10">
                {state === "success" ? (
                  <SuccessState onReset={handleReset} />
                ) : (
                  <div className="space-y-8">
                    <Field
                      label="问题"
                      
                      required
                    >
                      <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        required
                        rows={6}
                        maxLength={500}
                        placeholder="描述尽量具体，尤其是你反复在思考的问题。"
                        className="w-full resize-none border-0 border-b-2 border-[var(--ink)]/15 bg-transparent px-1 py-3 font-display text-xl leading-relaxed text-[var(--ink)] placeholder:text-[var(--ink)]/30 focus:border-[var(--brand)] focus:outline-none md:text-2xl"
                      />
                      <div className="mt-2 flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-[var(--ink)]/40">
                        <span>字数</span>
                        <span>{question.length} / 500</span>
                      </div>
                    </Field>

                    <div
                      role="radiogroup"
                      aria-label="是否公开"
                      className="relative inline-flex w-full overflow-hidden rounded-full border border-[var(--ink)]/15 bg-[var(--paper)] p-1 md:w-auto"
                    >
                      <motion.div
                        aria-hidden
                        layout
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute top-1 bottom-1 rounded-full"
                        style={{
                          background: "var(--brand)",
                          left: isPublic ? 4 : "calc(50% + 0px)",
                          width: "calc(50% - 4px)",
                        }}
                      />
                      <PublicToggle
                        selected={isPublic}
                        onClick={() => setIsPublic(true)}
                        icon={<Eye className="h-3.5 w-3.5" />}
                        label="公开"
                        sub="进入公共问题池"
                      />
                      <PublicToggle
                        selected={!isPublic}
                        onClick={() => setIsPublic(false)}
                        icon={<EyeOff className="h-3.5 w-3.5" />}
                        label="不公开"
                        sub="仅本人收到回复"
                      />
                    </div>

                    <Field
                      label="请选择回复方式"
                      hint="可选填。留 e-mail 可获得私密回复；留微信号欢迎社群线上或者线下互动交流。"
                    >
                      <input
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        type="text"
                        placeholder="邮箱 / 微信 / 任意可触达的方式"
                        className="w-full border-0 border-b-2 border-[var(--ink)]/15 bg-transparent px-1 py-3 font-display text-xl text-[var(--ink)] placeholder:text-[var(--ink)]/30 focus:border-[var(--brand)] focus:outline-none md:text-2xl"
                      />
                    </Field>

                    {error && (
                      <p className="text-sm font-medium text-red-600">{error}</p>
                    )}

                    <div className="flex flex-col items-stretch gap-3 pt-2 md:flex-row md:items-center md:justify-between">
                      <p className="text-xs text-[var(--ink)]/50">
                        提交即表示你愿意让问题进入创客厅的问题池。
                      </p>
                      <button
                        type="submit"
                        disabled={state === "submitting"}
                        className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 font-display text-base font-medium text-[var(--paper)] transition-all duration-300 disabled:opacity-60 md:text-lg"
                        style={{ background: "var(--brand)" }}
                      >
                        <span aria-hidden className="absolute inset-0 -z-0 translate-y-full bg-[var(--ink)] transition-transform duration-500 group-hover:translate-y-0" />
                        <span className="relative z-10 flex items-center gap-3">
                          {state === "submitting" ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="h-4 w-4 rounded-full border-2 border-[var(--paper)]/30 border-t-[var(--paper)]"
                              />
                              正在提交…
                            </>
                          ) : (
                            <>
                              提交问题
                              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--paper)]/20 transition-all duration-500 group-hover:rotate-45 group-hover:bg-[var(--paper)]/30">
                                <Send className="h-3.5 w-3.5" />
                              </span>
                            </>
                          )}
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </form>

            <Reveal delay={0.2}>
              <Link
                to="/"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--ink)]/60 transition-colors hover:text-[var(--brand)]"
              >
                ← 回到首页
              </Link>
            </Reveal>
          </Reveal>

          {/* 右侧:说明 */}
          <Reveal delay={0.15} className="md:col-span-5">
            <div className="sticky top-32 space-y-8 md:top-40">
              <div>
                <div className="mb-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-[var(--ink)]/55">
                  <span className="font-display font-bold" style={{ color: "var(--brand)" }}>
                    ★
                  </span>
                  <span>说明 / NOTES</span>
                </div>
                <div className="space-y-5 text-[15px] leading-loose text-[var(--ink)]/80">
                  <p>社区收集的问题欢迎线下扫码查询，亦欢迎加入讨论。</p>
                  <p>社区接受匿名提问。若所提问题不希望进入公共问题池，仅本人获得回复，请填写 e-mail 地址，所有资料会获得保密。</p>
                  <p>与创新社区无关的问题将被忽略。</p>
                  <p className="font-medium text-[var(--ink)]">
                    社区对本项目所涉一切事务拥有最终解释权，以及不解释权。
                  </p>
                </div>
              </div>

              <div className="border-t border-[var(--ink)]/10 pt-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--ink)]/45">
                  EST. 2026 · 创客厅
                </p>
                <p className="mt-3 font-display text-2xl leading-snug text-[var(--ink)]">
                  Driven by questions,
                  <br />
                  <span className="font-serif-italic italic font-normal" style={{ color: "var(--brand)" }}>
                    not tasks
                  </span>
                  <span className="font-serif-italic italic font-normal text-[var(--brand)]">.</span>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline gap-2">
        <label className="font-display text-sm font-bold uppercase tracking-[0.18em] text-[var(--ink)]">
          {label}
        </label>
        {required && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--brand)]">
            必填
          </span>
        )}
      </div>
      {children}
      {hint && <p className="mt-2 text-sm text-[var(--ink)]/55">{hint}</p>}
    </div>
  );
}

function PublicToggle({
  selected,
  onClick,
  icon,
  label,
  sub,
}: {
  selected: boolean;
  onClick: () => void;
  icon: ReactNode;
  label: string;
  sub: string;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onClick}
      className={`relative z-10 inline-flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 font-display text-sm transition-colors duration-300 md:flex-none md:px-5 md:text-base ${
        selected
          ? "text-[var(--paper)]"
          : "text-[var(--ink)]/70 hover:text-[var(--ink)]"
      }`}
    >
      <span
        aria-hidden
        className={`transition-transform duration-300 ${selected ? "scale-100" : "scale-90"}`}
      >
        {icon}
      </span>
      <span className="flex flex-col items-start leading-tight">
        <span className="font-bold tracking-tight">{label}</span>
        <span
          className={`text-[10px] uppercase tracking-[0.15em] transition-colors duration-300 md:text-[11px] ${
            selected ? "text-[var(--paper)]/80" : "text-[var(--ink)]/45"
          }`}
        >
          {sub}
        </span>
      </span>
    </button>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-start gap-6 py-6"
    >
      <span
        className="inline-flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: "var(--brand)", color: "var(--paper)" }}
      >
        <Check className="h-6 w-6" />
      </span>
      <div>
        <h3 className="font-display text-3xl font-bold leading-tight md:text-4xl">
          问题已收到
          <span className="font-serif-italic italic font-normal text-[var(--brand)]">.</span>
        </h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--ink)]/70">
          谢谢你愿意分享这个问题。创客厅会认真阅读和回复每一个问题，期待未来在线下有更深入的接触和讨论。
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full border border-[var(--ink)]/15 px-5 py-2.5 font-display text-sm transition hover:border-[var(--brand)] hover:text-[var(--brand)]"
        >
          再提一个问题
        </button>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm text-[var(--paper)] transition hover:opacity-90"
          style={{ background: "var(--brand)" }}
        >
          回到首页
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}

function ScrollProgress() {
  // 与首页相同的滚动进度条
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%", background: "var(--brand)" }}
      className="fixed left-0 right-0 top-0 z-[60] h-[3px]"
    />
  );
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
