"use client";

export default function CrmPowerFeatures() {
  const timeline = [
    { label: "Discovery call", time: "2h", color: "#3B82F6" },
    { label: "Proposal sent", time: "1d", color: "#8B5CF6" },
    { label: "Budget confirmed", time: "3d", color: "#10B981" },
  ];

  const actions = [
    { label: "Assign to listing agent", color: "#3B82F6" },
    { label: "Send brochure + directions", color: "#8B5CF6" },
    { label: "Follow up in 2 days", color: "#10B981" },
  ];

  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-white !py-10 lg:!py-12"
      style={{ "--brand": "#FF6B35" }}
    >
      <div
        className="!pointer-events-none !absolute !left-1/2 !top-0 !h-72 !w-72 !-translate-x-1/2 !rounded-full !opacity-[0.06] !blur-[130px]"
        style={{ background: "var(--brand)" }}
      />

      <div className="!relative !z-10 !mx-auto !max-w-6xl !px-6">
        {/* ═══ HEADER ═══ */}
        <div className="!mb-7 !text-center">
          {/* <div
            className="!mb-3 !inline-flex !items-center !gap-1.5 !rounded-full !border !px-2.5 !py-1 !text-[10px] !font-medium !tracking-widest"
            style={{
              borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
              background: "color-mix(in srgb, var(--brand) 8%, transparent)",
              color: "var(--brand)",
            }}
          >
            <span className="!h-1 !w-1 !rounded-full" style={{ background: "var(--brand)" }} />
            POWER FEATURES
          </div> */}

          <h2 className="!text-[22px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-[28px] lg:!text-[32px]">
            See every customer. Automate every step.
          </h2>

          <p className="!mx-auto !mt-2 !max-w-md !text-[12.5px] !leading-relaxed !text-neutral-500 sm:!text-sm">
            Two engines in one platform — full customer intelligence and
            hands-free workflows for any industry.
          </p>
        </div>

        {/* ═══ TWO PANELS SIDE-BY-SIDE ═══ */}
        <div className="!grid !grid-cols-1 !gap-4 lg:!grid-cols-2">

          {/* ─── PANEL 1: CUSTOMER 360 ─── */}
          <div className="!group !relative !overflow-hidden !rounded-2xl !border !border-neutral-200 !bg-white !p-5 !shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] !transition-all !duration-300 hover:!-translate-y-1 hover:!shadow-[0_20px_50px_-15px_rgba(0,0,0,0.18)]">
            {/* Top tag */}
            <div className="!mb-4 !flex !items-center !justify-between">
              <div className="!flex !items-center !gap-2">
                <span
                  className="!flex !h-7 !w-7 !items-center !justify-center !rounded-lg !text-white"
                  style={{ background: "var(--brand)" }}
                >
                  <svg className="!h-3.5 !w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <div>
                  <p className="!text-[10px] !font-bold !uppercase !tracking-wider" style={{ color: "var(--brand)" }}>
                    Customer 360°
                  </p>
                  <p className="!text-[13px] !font-bold !text-neutral-900">
                    Full profile, one view
                  </p>
                </div>
              </div>
              <span className="!rounded-full !border !border-emerald-100 !bg-emerald-50 !px-2 !py-0.5 !text-[9px] !font-bold !text-emerald-600">
                ● Active
              </span>
            </div>

            {/* Profile strip */}
            <div className="!flex !items-center !gap-3 !rounded-xl !border !border-neutral-100 !bg-neutral-50 !p-3">
              <div
                className="!flex !h-10 !w-10 !flex-shrink-0 !items-center !justify-center !rounded-full !text-[12px] !font-bold !text-white"
                style={{ background: "var(--brand)" }}
              >
                AK
              </div>
              <div className="!min-w-0 !flex-1">
                <p className="!truncate !text-[12px] !font-bold !text-neutral-900">
                  Aarav Kapoor
                </p>
                <p className="!truncate !text-[10px] !text-neutral-500">
                  CEO · Lumen Labs
                </p>
              </div>
              <div className="!flex !gap-1.5 !text-right">
                <div className="!rounded-lg !bg-white !px-2 !py-1 !shadow-sm">
                  <p className="!text-[8px] !uppercase !tracking-wider !text-neutral-400">
                    Health
                  </p>
                  <p className="!text-[11px] !font-bold" style={{ color: "var(--brand)" }}>
                    92
                  </p>
                </div>
                <div className="!rounded-lg !bg-white !px-2 !py-1 !shadow-sm">
                  <p className="!text-[8px] !uppercase !tracking-wider !text-neutral-400">
                    Value
                  </p>
                  <p className="!text-[11px] !font-bold !text-neutral-900">
                    $128K
                  </p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="!mt-3 !space-y-1.5">
              {timeline.map((t, i) => (
                <div
                  key={i}
                  className="!flex !items-center !gap-2.5 !rounded-lg !border !border-neutral-100 !bg-white !px-3 !py-2 !transition-all hover:!border-neutral-200 hover:!shadow-sm"
                >
                  <span
                    className="!h-2 !w-2 !flex-shrink-0 !rounded-full"
                    style={{
                      background: t.color,
                      boxShadow: `0 0 8px ${t.color}80`,
                    }}
                  />
                  <span className="!flex-1 !text-[11px] !font-medium !text-neutral-700">
                    {t.label}
                  </span>
                  <span className="!text-[9px] !font-semibold !text-neutral-400">
                    {t.time} ago
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ─── PANEL 2: AUTOMATION ─── */}
          <div className="!group !relative !overflow-hidden !rounded-2xl !border !border-neutral-200 !bg-white !p-5 !shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] !transition-all !duration-300 hover:!-translate-y-1 hover:!shadow-[0_20px_50px_-15px_rgba(0,0,0,0.18)]">
            {/* Top tag */}
            <div className="!mb-4 !flex !items-center !justify-between">
              <div className="!flex !items-center !gap-2">
                <span
                  className="!flex !h-7 !w-7 !items-center !justify-center !rounded-lg !text-white"
                  style={{ background: "var(--brand)" }}
                >
                  <svg className="!h-3.5 !w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <div>
                  <p className="!text-[10px] !font-bold !uppercase !tracking-wider" style={{ color: "var(--brand)" }}>
                    Automation
                  </p>
                  <p className="!text-[13px] !font-bold !text-neutral-900">
                    Workflows that run themselves
                  </p>
                </div>
              </div>
              <span className="!flex !items-center !gap-1 !rounded-full !border !border-emerald-100 !bg-emerald-50 !px-2 !py-0.5 !text-[9px] !font-bold !text-emerald-600">
                <span className="!h-1 !w-1 !animate-pulse !rounded-full !bg-emerald-500" />
                Live
              </span>
            </div>

            {/* Workflow visualization */}
            <div
              className="!rounded-xl !border !border-neutral-100 !p-3"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #e5e7eb 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            >
              {/* WHEN */}
              <div
                className="!rounded-lg !border-2 !border-dashed !bg-white !px-3 !py-2 !shadow-sm"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--brand) 45%, transparent)",
                }}
              >
                <p
                  className="!text-[8px] !font-bold !uppercase !tracking-wider"
                  style={{ color: "var(--brand)" }}
                >
                  When
                </p>
                <p className="!mt-0.5 !text-[11px] !font-bold !text-neutral-900">
                  Site visit scheduled
                </p>
              </div>

              {/* Connector */}
              <div className="!my-1.5 !flex !justify-center">
                <span
                  className="!rounded-full !px-2 !py-0.5 !text-[8px] !font-bold !text-white"
                  style={{ background: "var(--brand)" }}
                >
                  THEN
                </span>
              </div>

              {/* Actions */}
              <div className="!space-y-1.5">
                {actions.map((a, i) => (
                  <div
                    key={i}
                    className="!flex !items-center !gap-2 !rounded-lg !border !border-neutral-100 !bg-white !px-2.5 !py-1.5 !shadow-sm"
                  >
                    <span
                      className="!flex !h-4 !w-4 !flex-shrink-0 !items-center !justify-center !rounded-md !text-[8px] !font-bold !text-white"
                      style={{ background: a.color }}
                    >
                      {i + 1}
                    </span>
                    <span className="!truncate !text-[10px] !font-medium !text-neutral-700">
                      {a.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══ COMPACT FEATURE STRIP ═══ */}
        <div className="!mt-7 !grid !grid-cols-2 !gap-2.5 lg:!grid-cols-4">
          {[
            { t: "Unified profiles", d: "Calls, emails, deals — one place." },
            { t: "Smart notes", d: "Team context on the right person." },
            { t: "Auto triggers", d: "Forms, status, timing, payments." },
            { t: "Any channel", d: "Email, SMS & WhatsApp flows." },
          ].map((f, i) => (
            <div
              key={i}
              className="!flex !items-start !gap-2 !rounded-lg !border !border-neutral-200 !bg-white !p-3"
            >
              <span
                className="!mt-0.5 !flex !h-4 !w-4 !flex-shrink-0 !items-center !justify-center !rounded-full !text-white"
                style={{ background: "var(--brand)" }}
              >
                <svg className="!h-2.5 !w-2.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              <div className="!min-w-0">
                <p className="!text-[11px] !font-bold !text-neutral-900">
                  {f.t}
                </p>
                <p className="!mt-0.5 !text-[10px] !leading-snug !text-neutral-500">
                  {f.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}