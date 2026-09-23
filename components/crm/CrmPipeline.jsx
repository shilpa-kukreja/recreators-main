"use client";

export default function CrmPipeline() {
  const columns = [
    {
      name: "New",
      color: "#3B82F6",
      deals: [
        { name: "Acme Corp", amt: "$12K", score: 68 },
        { name: "Northwind", amt: "$8K", score: 54 },
      ],
    },
    {
      name: "Qualified",
      color: "#8B5CF6",
      deals: [
        { name: "Nova Inc", amt: "$28K", score: 82 },
        { name: "Lumen Labs", amt: "$15K", score: 76 },
      ],
    },
    {
      name: "Proposal",
      color: "#F59E0B",
      deals: [{ name: "Pulse Ltd", amt: "$42K", score: 91 }],
    },
    {
      name: "Won",
      color: "#10B981",
      deals: [{ name: "Orbit Co", amt: "$65K", score: 98 }],
    },
  ];

  const features = [
    "Auto-capture leads from web, ads & social",
    "AI lead scoring so you focus on hot deals",
    "Drag-and-drop pipeline with zero setup",
    "Instant alerts when a deal needs attention",
  ];

  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-white !py-12 lg:!py-16"
      style={{ "--brand": "#FF6B35" }} // 🎨 same logo color
    >
      {/* Soft glow */}
      <div
        className="!pointer-events-none !absolute !right-0 !top-1/4 !h-64 !w-64 !rounded-full !opacity-[0.07] !blur-[120px]"
        style={{ background: "var(--brand)" }}
      />

      <div className="!relative !z-10 !mx-auto !max-w-6xl !px-6">
        {/* ---- HEADER ---- */}
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
            LEAD MANAGEMENT · SALES PIPELINE
          </div> */}

          <h2 className="!text-[24px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-3xl lg:!text-[34px]">
            Every lead. Every deal. One pipeline.
          </h2>

          <p className="!mx-auto !mt-3 !max-w-md !text-[13px] !leading-relaxed !text-neutral-500 sm:!text-sm">
            Watch deals move from first touch to closed-won — without spreadsheets, guesswork, or missed follow-ups.
          </p>
        </div>

        {/* ---- SPLIT ---- */}
        <div className="!grid !grid-cols-1 !gap-8 lg:!grid-cols-2 lg:!items-center lg:!gap-10">
          {/* LEFT: Features */}
          <div>
            <h3 className="!text-[16px] !font-bold !text-neutral-900 sm:!text-lg">
              Built to close deals faster.
            </h3>

            <ul className="!mt-5 !space-y-3">
              {features.map((f, i) => (
                <li key={i} className="!flex !items-start !gap-3">
                  <span
                    className="!mt-0.5 !flex !h-5 !w-5 !flex-shrink-0 !items-center !justify-center !rounded-full !text-white"
                    style={{ background: "var(--brand)" }}
                  >
                    <svg className="!h-3 !w-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="!text-[13px] !leading-relaxed !text-neutral-700 sm:!text-sm">
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            {/* Stats row */}
            <div className="!mt-7 !grid !grid-cols-3 !gap-3">
              {[
                { v: "3.2×", l: "Faster close rate" },
                { v: "42%", l: "Fewer missed leads" },
                { v: "18hrs", l: "Saved per week" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="!rounded-lg !border !border-neutral-200 !bg-neutral-50 !p-3"
                >
                  <p
                    className="!text-[16px] !font-bold sm:!text-lg"
                    style={{ color: "var(--brand)" }}
                  >
                    {s.v}
                  </p>
                  <p className="!mt-0.5 !text-[10px] !leading-tight !text-neutral-500">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Kanban board mockup */}
          <div className="!relative">
            <div
              className="!absolute !inset-4 !-z-10 !rounded-3xl !opacity-20 !blur-3xl"
              style={{ background: "var(--brand)" }}
            />

            <div className="!rounded-xl !border !border-neutral-200 !bg-neutral-50 !p-3 !shadow-xl">
              {/* Board header */}
              <div className="!mb-3 !flex !items-center !justify-between">
                <span className="!text-[10px] !font-semibold !uppercase !tracking-wider !text-neutral-500">
                  Sales Pipeline
                </span>
                <span className="!rounded-full !bg-emerald-100 !px-2 !py-0.5 !text-[9px] !font-semibold !text-emerald-700">
                  +$120K this month
                </span>
              </div>

              {/* Columns */}
              <div className="!grid !grid-cols-4 !gap-1.5">
                {columns.map((col, i) => (
                  <div key={i} className="!rounded-lg !bg-white !p-1.5 !shadow-sm">
                    <div className="!mb-1.5 !flex !items-center !gap-1">
                      <span
                        className="!h-1.5 !w-1.5 !rounded-full"
                        style={{ background: col.color }}
                      />
                      <span className="!text-[8px] !font-semibold !uppercase !tracking-wider !text-neutral-600">
                        {col.name}
                      </span>
                    </div>

                    <div className="!space-y-1">
                      {col.deals.map((d, j) => (
                        <div
                          key={j}
                          className="!rounded-md !border !border-neutral-100 !bg-neutral-50 !p-1.5"
                        >
                          <p className="!text-[9px] !font-semibold !text-neutral-800">
                            {d.name}
                          </p>
                          <div className="!mt-1 !flex !items-center !justify-between">
                            <span className="!text-[8px] !text-neutral-500">
                              {d.amt}
                            </span>
                            <span
                              className="!rounded-full !px-1 !py-[1px] !text-[7px] !font-bold !text-white"
                              style={{ background: col.color }}
                            >
                              {d.score}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom hint */}
              <div className="!mt-3 !flex !items-center !justify-center !gap-1.5 !rounded-lg !border !border-dashed !border-neutral-300 !py-2">
                <svg className="!h-3 !w-3 !text-neutral-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                <span className="!text-[9px] !text-neutral-500">
                  Drag deal to move stage
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}