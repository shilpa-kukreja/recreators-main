"use client";

export default function CrmAutomation() {
  const industries = [
    { name: "Real Estate", color: "#3B82F6", active: true },
    { name: "Healthcare", color: "#10B981" },
    { name: "Education", color: "#8B5CF6" },
    { name: "E-commerce", color: "#F59E0B" },
    { name: "Travel", color: "#06B6D4" },
  ];

  const actions = [
    { label: "Assign to listing agent", color: "#3B82F6" },
    { label: "Send brochure + directions", color: "#8B5CF6" },
    { label: "Schedule follow-up in 2 days", color: "#10B981" },
  ];

  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-white !py-8 lg:!py-12"
      style={{ "--brand": "#FF6B35" }}
    >
      {/* Soft brand glow */}
      <div
        className="!pointer-events-none !absolute !left-1/2 !top-1/3 !h-80 !w-80 !-translate-x-1/2 !rounded-full !opacity-[0.07] !blur-[130px]"
        style={{ background: "var(--brand)" }}
      />

      <div className="!relative !z-10 !mx-auto !max-w-5xl !px-6">
        {/* ═══ HEADER ═══ */}
        <div className="!mb-10 !text-center">
          {/* <div
            className="!mb-3 !inline-flex !items-center !gap-1.5 !rounded-full !border !px-2.5 !py-1 !text-[10px] !font-medium !tracking-widest"
            style={{
              borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
              background: "color-mix(in srgb, var(--brand) 8%, transparent)",
              color: "var(--brand)",
            }}
          >
            <span className="!h-1 !w-1 !rounded-full" style={{ background: "var(--brand)" }} />
            SMART AUTOMATION · WORKFLOWS
          </div> */}

          <h2 className="!text-[24px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-3xl lg:!text-[34px]">
            Let your CRM do the busywork —{" "}
            <span style={{ color: "var(--brand)" }}>automatically.</span>
          </h2>

          <p className="!mx-auto !mt-3 !max-w-md !text-[13px] !leading-relaxed !text-neutral-500 sm:!text-sm">
            Build workflows that trigger on any event, then act. No code. No
            limits. For any industry.
          </p>
        </div>

        {/* ═══ WORKFLOW CANVAS ═══ */}
        <div className="!relative">
          {/* Glow behind */}
          <div
            className="!absolute !inset-8 !-z-10 !rounded-[40px] !opacity-15 !blur-3xl"
            style={{ background: "var(--brand)" }}
          />

          <div className="!overflow-hidden !rounded-2xl !border !border-neutral-200 !bg-white !shadow-[0_30px_80px_-20px_rgba(0,0,0,0.18)]">
            {/* ── Chrome bar ── */}
            <div className="!flex !items-center !gap-2 !border-b !border-neutral-100 !bg-neutral-50/70 !px-4 !py-2.5">
              <div className="!flex !gap-1.5">
                <span className="!h-2.5 !w-2.5 !rounded-full !bg-red-400/80" />
                <span className="!h-2.5 !w-2.5 !rounded-full !bg-yellow-400/80" />
                <span className="!h-2.5 !w-2.5 !rounded-full !bg-green-400/80" />
              </div>
              <span className="!mx-auto !hidden !rounded-md !border !border-neutral-200 !bg-white !px-3 !py-0.5 !text-[10px] !text-neutral-400 sm:!block">
                app.recreators-crm.com/workflows
              </span>
              <span className="!ml-auto !flex !items-center !gap-1.5 !rounded-full !border !border-emerald-100 !bg-emerald-50 !px-2 !py-0.5 !text-[9px] !font-bold !text-emerald-600 sm:!ml-0">
                <span className="!h-1.5 !w-1.5 !animate-pulse !rounded-full !bg-emerald-500" />
                Live
              </span>
            </div>

            {/* ── Canvas ── */}
            <div
              className="!relative !px-5 !py-10 sm:!px-12 sm:!py-14"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            >
              {/* Active industry chip */}
              <div className="!absolute !left-4 !top-4 !flex !items-center !gap-1.5 !rounded-full !border !border-neutral-200 !bg-white !px-2.5 !py-1 !shadow-sm">
                <span className="!h-1.5 !w-1.5 !rounded-full !bg-blue-500" />
                <span className="!text-[9px] !font-bold !uppercase !tracking-wider !text-neutral-600">
                  Real Estate
                </span>
              </div>

              {/* ── Flow: WHEN → THEN ── */}
              <div className="!mt-6 !flex !flex-col !items-stretch !gap-4 md:!mt-0 md:!flex-row md:!items-center md:!gap-4">
                {/* WHEN card */}
                <div
                  className="!relative !w-full !rounded-2xl !border-2 !border-dashed !bg-white !p-4 !shadow-md md:!w-56 md:!flex-shrink-0"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--brand) 45%, transparent)",
                  }}
                >
                  <span
                    className="!mb-2 !inline-block !rounded-full !px-2 !py-0.5 !text-[8px] !font-bold !uppercase !tracking-wider !text-white"
                    style={{ background: "var(--brand)" }}
                  >
                    When
                  </span>
                  <p className="!text-[12px] !font-bold !text-neutral-900">
                    Site visit scheduled
                  </p>
                  <p className="!mt-0.5 !text-[10px] !text-neutral-500">
                    From property portal
                  </p>

                  {/* Pulse node on right edge */}
                  <span
                    className="!absolute !-right-1.5 !top-1/2 !hidden !h-3 !w-3 !-translate-y-1/2 !rounded-full !border-2 !border-white !md:!block"
                    style={{ background: "var(--brand)" }}
                  />
                </div>

                {/* Connector */}
                <div className="!flex !flex-shrink-0 !items-center !justify-center">
                  {/* Mobile: down arrow */}
                  <svg
                    className="!h-6 !w-6 !text-neutral-300 md:!hidden"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                  {/* Desktop: dashed line + arrow */}
                  <div className="!hidden !items-center !gap-1 !md:!flex">
                    <span className="!h-px !w-8 !border-t-2 !border-dashed !border-neutral-300" />
                    <svg
                      className="!h-3.5 !w-3.5 !text-neutral-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                    </svg>
                    <span className="!h-px !w-8 !border-t-2 !border-dashed !border-neutral-300" />
                  </div>
                </div>

                {/* THEN stack */}
                <div className="!w-full md:!flex-1">
                  <div className="!mb-2 !flex !items-center !gap-2">
                    <span
                      className="!rounded-full !px-2 !py-0.5 !text-[8px] !font-bold !uppercase !tracking-wider !text-white"
                      style={{ background: "var(--brand)" }}
                    >
                      Then
                    </span>
                    <span className="!text-[9px] !text-neutral-400">
                      3 actions run automatically
                    </span>
                  </div>

                  <div className="!space-y-2">
                    {actions.map((a, i) => (
                      <div
                        key={i}
                        className="!group !flex !items-center !gap-3 !rounded-xl !border !border-neutral-200 !bg-white !px-3 !py-2.5 !shadow-sm !transition-all hover:!-translate-y-0.5 hover:!shadow-md"
                      >
                        <span
                          className="!flex !h-6 !w-6 !flex-shrink-0 !items-center !justify-center !rounded-lg !text-[10px] !font-bold !text-white"
                          style={{ background: a.color }}
                        >
                          {i + 1}
                        </span>
                        <span className="!flex-1 !text-[11.5px] !font-medium !text-neutral-800">
                          {a.label}
                        </span>
                        <svg
                          className="!h-3.5 !w-3.5 !text-neutral-300 !transition-transform group-hover:!translate-x-0.5"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Footer bar ── */}
            <div className="!flex !flex-wrap !items-center !justify-between !gap-2 !border-t !border-neutral-100 !bg-neutral-50/70 !px-4 !py-2.5">
              <span className="!text-[10px] !font-medium !text-neutral-500">
                Active workflow · Real Estate
              </span>
              <span
                className="!rounded-full !px-2 !py-0.5 !text-[9px] !font-bold"
                style={{
                  background: "color-mix(in srgb, var(--brand) 12%, transparent)",
                  color: "var(--brand)",
                }}
              >
                1 trigger → 3 actions
              </span>
            </div>
          </div>

          {/* ── Floating badges (desktop only) ── */}
          {/* <div className="!absolute !-left-4 !top-1/3 !hidden !items-center !gap-2 !rounded-xl !border !border-neutral-200 !bg-white !px-3 !py-2 !shadow-lg lg:!flex">
            <div
              className="!flex !h-7 !w-7 !items-center !justify-center !rounded-full !text-white"
              style={{ background: "var(--brand)" }}
            >
              <svg className="!h-3.5 !w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="!text-[9px] !uppercase !tracking-wider !text-neutral-400">
                Runs today
              </p>
              <p className="!text-[11px] !font-bold !text-neutral-900">
                1,240 automations
              </p>
            </div>
          </div> */}

          {/* <div className="!absolute !-right-4 !bottom-1/3 !hidden !items-center !gap-2 !rounded-xl !border !border-neutral-200 !bg-white !px-3 !py-2 !shadow-lg lg:!flex">
            <div className="!flex !h-7 !w-7 !items-center !justify-center !rounded-full !bg-emerald-500 !text-white">
              <svg className="!h-3.5 !w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="!text-[9px] !uppercase !tracking-wider !text-neutral-400">
                Time saved
              </p>
              <p className="!text-[11px] !font-bold !text-neutral-900">
                18 hrs / week
              </p>
            </div>
          </div> */}
        </div>

        {/* ═══ INDUSTRY CHIPS ═══ */}
        <div className="!mt-6 !flex !flex-wrap !items-center !justify-center !gap-2">
          <span className="!text-[11px] !font-medium !text-neutral-400">
            Works for:
          </span>
          {industries.map((ind, i) => (
            <button
              key={i}
              className={`!flex !items-center !gap-1.5 !rounded-full !border !px-3 !py-1 !text-[11px] !font-semibold !transition-all ${
                ind.active
                  ? "!border-transparent !text-white"
                  : "!border-neutral-200 !bg-white !text-neutral-600 hover:!border-neutral-300"
              }`}
              style={ind.active ? { background: ind.color } : {}}
            >
              <span
                className="!h-1.5 !w-1.5 !rounded-full"
                style={{
                  background: ind.active ? "#fff" : ind.color,
                }}
              />
              {ind.name}
            </button>
          ))}
        </div>

        {/* ═══ FEATURES + STATS ═══ */}
        {/* <div className="!mt-10 !grid !grid-cols-1 !gap-6 lg:!grid-cols-3 lg:!items-center lg:!gap-8">
          <div className="lg:!col-span-2">
            <ul className="!grid !grid-cols-1 !gap-2.5 sm:!grid-cols-2">
              {[
                "Drag-and-drop builder — no code needed",
                "Cross-industry triggers: forms, status, timing",
                "Email, SMS & WhatsApp sequences on autopilot",
                "Works for sales, ops, support & every team",
              ].map((f, i) => (
                <li key={i} className="!flex !items-start !gap-2.5">
                  <span
                    className="!mt-0.5 !flex !h-4 !w-4 !flex-shrink-0 !items-center !justify-center !rounded-full !text-white"
                    style={{ background: "var(--brand)" }}
                  >
                    <svg className="!h-2.5 !w-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="!text-[12px] !leading-relaxed !text-neutral-700">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="!grid !grid-cols-3 !gap-3 lg:!grid-cols-1">
            {[
              { v: "80%", l: "Less manual work" },
              { v: "5×", l: "Faster responses" },
              { v: "24/7", l: "Always running" },
            ].map((s, i) => (
              <div
                key={i}
                className="!rounded-lg !border !border-neutral-200 !bg-neutral-50 !p-3 lg:!flex lg:!items-center lg:!justify-between"
              >
                <p
                  className="!text-[16px] !font-bold sm:!text-lg"
                  style={{ color: "var(--brand)" }}
                >
                  {s.v}
                </p>
                <p className="!mt-0.5 !text-[10px] !leading-tight !text-neutral-500 lg:!mt-0">
                  {s.l}
                </p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
}