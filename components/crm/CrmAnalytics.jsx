"use client";

export default function CrmAnalytics() {
  // KPI ticker items
  const ticker = [
    { l: "Revenue", v: "$482K", d: "+24%" },
    { l: "Win Rate", v: "68%", d: "+12%" },
    { l: "Avg Deal", v: "$18.4K", d: "+9%" },
    { l: "Cycle Time", v: "12 days", d: "-31%" },
    { l: "Retention", v: "98%", d: "+3%" },
    { l: "Response", v: "< 5 min", d: "-42%" },
  ];

  // SVG line chart points
  const linePoints = "0,90 40,72 80,78 120,55 160,60 200,40 240,48 280,28 320,35 360,18 400,24 440,10";

  const funnel = [
    { stage: "Leads", v: 1240, w: "100%", color: "#3B82F6" },
    { stage: "Qualified", v: 820, w: "66%", color: "#8B5CF6" },
    { stage: "Proposal", v: 410, w: "33%", color: "#F59E0B" },
    { stage: "Won", v: 327, w: "26%", color: "#10B981" },
  ];

  const sources = [
    { name: "Organic Search", v: 42, color: "#3B82F6" },
    { name: "Paid Ads", v: 28, color: "#8B5CF6" },
    { name: "Referrals", v: 18, color: "#10B981" },
    { name: "Social", v: 12, color: "#F59E0B" },
  ];

  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-white !py-12 lg:!py-16"
      style={{ "--brand": "#FF6B35" }}
    >
      {/* Very subtle brand glow */}
      <div
        className="!pointer-events-none !absolute !right-1/4 !top-0 !h-80 !w-80 !rounded-full !opacity-[0.06] !blur-[140px]"
        style={{ background: "var(--brand)" }}
      />

      <div className="!relative !z-10 !mx-auto !max-w-6xl !px-6">
        {/* ═══ HEADER ═══ */}
        <div className="!mb-8 !text-center">
          {/* <div
            className="!mb-3 !inline-flex !items-center !gap-1.5 !rounded-full !border !px-2.5 !py-1 !text-[10px] !font-medium !tracking-widest"
            style={{
              borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
              background: "color-mix(in srgb, var(--brand) 8%, transparent)",
              color: "var(--brand)",
            }}
          >
            <span className="!h-1 !w-1 !rounded-full" style={{ background: "var(--brand)" }} />
            ANALYTICS · BUSINESS INTELLIGENCE
          </div> */}

          <h2 className="!text-[24px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-3xl lg:!text-[34px]">
            Numbers that tell the truth.{" "}
            <span style={{ color: "var(--brand)" }}>Instantly.</span>
          </h2>

          <p className="!mx-auto !mt-3 !max-w-md !text-[13px] !leading-relaxed !text-neutral-500 sm:!text-sm">
            Real-time dashboards, custom reports & AI-powered insights — so you
            decide with data, not guesses.
          </p>
        </div>

        {/* ═══ LIVE KPI TICKER ═══ */}
        <div className="!relative !mb-6 !overflow-hidden !rounded-xl !border !border-neutral-200 !bg-white">
          <div className="!flex !items-stretch !divide-x !divide-neutral-100">
            {ticker.map((t, i) => (
              <div
                key={i}
                className="!flex !min-w-[130px] !flex-1 !items-center !justify-between !gap-2 !px-3 !py-2.5"
              >
                <div>
                  <p className="!text-[9px] !uppercase !tracking-wider !text-neutral-400">
                    {t.l}
                  </p>
                  <p className="!text-[12px] !font-bold !text-neutral-900">
                    {t.v}
                  </p>
                </div>
                <span
                  className="!rounded-full !px-1.5 !py-0.5 !text-[9px] !font-bold"
                  style={{
                    background: "color-mix(in srgb, var(--brand) 10%, transparent)",
                    color: "var(--brand)",
                  }}
                >
                  {t.d}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ DASHBOARD PANEL (no chrome, just floating) ═══ */}
        <div className="!relative">
          <div
            className="!absolute !inset-8 !-z-10 !rounded-[40px] !opacity-15 !blur-3xl"
            style={{ background: "var(--brand)" }}
          />

          <div className="!rounded-2xl !border !border-neutral-200 !bg-white !p-4 !shadow-[0_30px_80px_-25px_rgba(0,0,0,0.18)] sm:!p-5">
            {/* ── Panel head ── */}
            <div className="!mb-4 !flex !flex-wrap !items-center !justify-between !gap-3">
              <div className="!flex !items-center !gap-2">
                <span className="!flex !h-2 !w-2 !rounded-full !bg-emerald-500" />
                <p className="!text-[11px] !font-semibold !uppercase !tracking-wider !text-neutral-500">
                  Revenue Analytics
                </p>
              </div>

              {/* Range tabs */}
              <div className="!flex !gap-1 !rounded-full !border !border-neutral-200 !bg-neutral-50 !p-0.5">
                {["7d", "30d", "90d", "1y"].map((t, i) => (
                  <button
                    key={i}
                    className={`!rounded-full !px-2.5 !py-1 !text-[10px] !font-semibold ${
                      i === 1
                        ? "!bg-white !text-neutral-900 !shadow-sm"
                        : "!text-neutral-500"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* ── TOP: Big chart + donut ── */}
            <div className="!grid !grid-cols-1 !gap-3 lg:!grid-cols-3">
              {/* Line chart (spans 2) */}
              <div className="!rounded-xl !border !border-neutral-100 !bg-gradient-to-b !from-neutral-50/50 !to-white !p-4 lg:!col-span-2">
                <div className="!mb-3 !flex !items-baseline !justify-between">
                  <div>
                    <p className="!text-[10px] !uppercase !tracking-wider !text-neutral-400">
                      Total Revenue
                    </p>
                    <p className="!mt-0.5 !text-[22px] !font-bold !leading-none !text-neutral-900">
                      $482,940
                    </p>
                  </div>
                  <span
                    className="!rounded-full !px-2 !py-0.5 !text-[10px] !font-bold"
                    style={{
                      background: "color-mix(in srgb, var(--brand) 10%, transparent)",
                      color: "var(--brand)",
                    }}
                  >
                    ↑ 24%
                  </span>
                </div>

                {/* SVG area + line */}
                <div className="!relative !h-32 sm:!h-36">
                  <svg
                    viewBox="0 0 440 100"
                    preserveAspectRatio="none"
                    className="!h-full !w-full"
                  >
                    <defs>
                      <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="var(--brand)" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area */}
                    <polygon
                      points={`${linePoints} 440,100 0,100`}
                      fill="url(#areaFill)"
                    />
                    {/* Line */}
                    <polyline
                      points={linePoints}
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {/* End dot */}
                    <circle cx="440" cy="10" r="3" fill="var(--brand)" />
                    <circle cx="440" cy="10" r="7" fill="var(--brand)" opacity="0.2" />
                  </svg>

                  {/* Y-axis grid hint */}
                  <div className="!pointer-events-none !absolute !inset-0 !flex !flex-col !justify-between">
                    {[0, 1, 2, 3].map((i) => (
                      <div key={i} className="!h-px !w-full !bg-neutral-100" />
                    ))}
                  </div>
                </div>

                {/* X axis */}
                <div className="!mt-2 !flex !justify-between !text-[9px] !text-neutral-400">
                  {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((m, i) => (
                    <span key={i}>{m}</span>
                  ))}
                </div>
              </div>

              {/* Donut chart */}
              <div className="!flex !flex-col !rounded-xl !border !border-neutral-100 !bg-gradient-to-b !from-neutral-50/50 !to-white !p-4">
                <p className="!text-[10px] !uppercase !tracking-wider !text-neutral-400">
                  Deal Mix
                </p>

                <div className="!relative !mt-2 !flex !flex-1 !items-center !justify-center">
                  <svg viewBox="0 0 100 100" className="!h-28 !w-28 -!rotate-90">
                    {/* track */}
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F5F5F5" strokeWidth="12" />
                    {/* segment 1 */}
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#10B981" strokeWidth="12"
                      strokeDasharray="126 251.2" strokeDashoffset="0"
                      strokeLinecap="round"
                    />
                    {/* segment 2 */}
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#8B5CF6" strokeWidth="12"
                      strokeDasharray="75 251.2" strokeDashoffset="-130"
                      strokeLinecap="round"
                    />
                    {/* segment 3 */}
                    <circle
                      cx="50" cy="50" r="40" fill="none"
                      stroke="#3B82F6" strokeWidth="12"
                      strokeDasharray="50 251.2" strokeDashoffset="-210"
                      strokeLinecap="round"
                    />
                  </svg>

                  <div className="!absolute !text-center">
                    <p className="!text-[16px] !font-bold !leading-none !text-neutral-900">
                      327
                    </p>
                    <p className="!mt-0.5 !text-[8px] !uppercase !tracking-wider !text-neutral-400">
                      Deals Won
                    </p>
                  </div>
                </div>

                <div className="!mt-2 !space-y-1">
                  {[
                    { l: "New Business", c: "#10B981", v: "50%" },
                    { l: "Expansion", c: "#8B5CF6", v: "30%" },
                    { l: "Renewal", c: "#3B82F6", v: "20%" },
                  ].map((d, i) => (
                    <div key={i} className="!flex !items-center !gap-1.5">
                      <span className="!h-1.5 !w-1.5 !rounded-full" style={{ background: d.c }} />
                      <span className="!flex-1 !text-[9px] !text-neutral-500">{d.l}</span>
                      <span className="!text-[9px] !font-bold !text-neutral-700">{d.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── BOTTOM: Funnel + Sources ── */}
            <div className="!mt-3 !grid !grid-cols-1 !gap-3 md:!grid-cols-2">
              {/* Funnel */}
              <div className="!rounded-xl !border !border-neutral-100 !bg-gradient-to-b !from-neutral-50/50 !to-white !p-4">
                <p className="!mb-3 !text-[10px] !uppercase !tracking-wider !text-neutral-400">
                  Conversion Funnel
                </p>
                <div className="!space-y-2">
                  {funnel.map((f, i) => (
                    <div key={i} className="!flex !items-center !gap-2">
                      <span className="!w-14 !flex-shrink-0 !text-[10px] !font-medium !text-neutral-600">
                        {f.stage}
                      </span>
                      <div className="!relative !h-5 !flex-1 !overflow-hidden !rounded-md !bg-neutral-100">
                        <div
                          className="!h-full !rounded-md !transition-all"
                          style={{
                            width: f.w,
                            background: `linear-gradient(90deg, ${f.color}, ${f.color}CC)`,
                          }}
                        />
                      </div>
                      <span className="!w-10 !text-right !text-[10px] !font-bold !text-neutral-800">
                        {f.v}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sources */}
              <div className="!rounded-xl !border !border-neutral-100 !bg-gradient-to-b !from-neutral-50/50 !to-white !p-4">
                <p className="!mb-3 !text-[10px] !uppercase !tracking-wider !text-neutral-400">
                  Top Sources
                </p>
                <div className="!space-y-2">
                  {sources.map((s, i) => (
                    <div key={i} className="!flex !items-center !gap-2">
                      <span className="!flex-1 !text-[10px] !font-medium !text-neutral-600">
                        {s.name}
                      </span>
                      <div className="!h-1 !w-16 !overflow-hidden !rounded-full !bg-neutral-100">
                        <div
                          className="!h-full !rounded-full"
                          style={{ width: `${s.v * 2}%`, background: s.color }}
                        />
                      </div>
                      <span className="!w-6 !text-right !text-[10px] !font-bold !text-neutral-800">
                        {s.v}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Floating AI Insight card ── */}
          {/* <div className="!absolute !-bottom-4 !right-4 !hidden !max-w-[220px] !items-start !gap-2.5 !rounded-xl !border !border-neutral-200 !bg-white !p-3 !shadow-xl md:!flex">
            <span
              className="!flex !h-6 !w-6 !flex-shrink-0 !items-center !justify-center !rounded-full !text-white"
              style={{ background: "var(--brand)" }}
            >
              <svg className="!h-3.5 !w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </span>
            <div>
              <p className="!text-[9px] !font-bold !uppercase !tracking-wider" style={{ color: "var(--brand)" }}>
                AI Insight
              </p>
              <p className="!mt-0.5 !text-[11px] !leading-snug !text-neutral-700">
                Enterprise deals close <span className="!font-bold">2.4× faster</span> in Q3.
              </p>
            </div>
          </div> */}
        </div>

        {/* ═══ FEATURE STRIP ═══ */}
        {/* <div className="!mt-10 !grid !grid-cols-1 !gap-3 sm:!grid-cols-2 lg:!grid-cols-4">
          {[
            { n: "01", t: "Real-time dashboards", d: "Live metrics, zero refresh." },
            { n: "02", t: "Custom reports", d: "Slice by rep, region, or team." },
            { n: "03", t: "AI forecasting", d: "Predict next month's pipeline." },
            { n: "04", t: "Export anywhere", d: "PDF, Excel, or live API." },
          ].map((f, i) => (
            <div
              key={i}
              className="!group !rounded-xl !border !border-neutral-200 !bg-white !p-4 !transition-all !duration-300 hover:!-translate-y-1 hover:!border-[var(--brand)] hover:!shadow-lg"
            >
              <div className="!mb-2 !flex !items-center !justify-between">
                <span
                  className="!flex !h-7 !w-7 !items-center !justify-center !rounded-lg !text-[10px] !font-bold !text-white"
                  style={{ background: "var(--brand)" }}
                >
                  {f.n}
                </span>
                <svg
                  className="!h-3.5 !w-3.5 !text-neutral-300 !transition-all group-hover:!translate-x-1"
                  style={{ color: undefined }}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </div>
              <h3 className="!text-[12px] !font-bold !text-neutral-900">
                {f.t}
              </h3>
              <p className="!mt-0.5 !text-[11px] !leading-relaxed !text-neutral-500">
                {f.d}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}