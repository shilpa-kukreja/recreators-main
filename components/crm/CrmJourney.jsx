"use client";

export default function CrmJourney() {
  const stages = [
    {
      step: "01",
      title: "Attract",
      desc: "Capture leads from every channel — web, social, ads, referrals.",
      icon: (
        <svg className="!h-4 !w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      ),
    },
    {
      step: "02",
      title: "Convert",
      desc: "Score, nurture, and move deals through a visual pipeline.",
      icon: (
        <svg className="!h-4 !w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
    },
    {
      step: "03",
      title: "Retain",
      desc: "Automate follow-ups, tasks, and health scores so no one slips.",
      icon: (
        <svg className="!h-4 !w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      step: "04",
      title: "Expand",
      desc: "Spot upsell signals and turn customers into advocates.",
      icon: (
        <svg className="!h-4 !w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      ),
    },
  ];

  return (
    <section
      id="how-it-works"
      className="!relative !w-full !overflow-hidden !bg-white !py-12 lg:!py-16"
      style={{ "--brand": "#FF6B35" }} // 🎨 same logo color
    >
      {/* Soft brand glow (subtle on white) */}
      <div
        className="!pointer-events-none !absolute !top-1/2 !left-1/2 !h-64 !w-64 !-translate-x-1/2 !-translate-y-1/2 !rounded-full !opacity-[0.08] !blur-[120px]"
        style={{ background: "var(--brand)" }}
      />

      <div className="!relative !z-10 !mx-auto !max-w-6xl !px-6">
        {/* ---- HEADER ---- */}
        {/* <div className="!mb-10 !text-center">
          <div
            className="!mb-3 !inline-flex !items-center !gap-1.5 !rounded-full !border !px-2.5 !py-1 !text-[10px] !font-medium !tracking-widest"
            style={{
              borderColor: "color-mix(in srgb, var(--brand) 30%, transparent)",
              background: "color-mix(in srgb, var(--brand) 8%, transparent)",
              color: "var(--brand)",
            }}
          >
            <span className="!h-1 !w-1 !rounded-full" style={{ background: "var(--brand)" }} />
            ONE PLATFORM
          </div>

          <h2 className="!text-[24px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-3xl lg:!text-[34px]">
            Your Entire Customer Journey.
          </h2>

          <p className="!mx-auto !mt-3 !max-w-md !text-[13px] !leading-relaxed !text-neutral-500 sm:!text-sm">
            From first touch to loyal advocate — every stage lives in one
            connected system.
          </p>
        </div> */}

        {/* ---- JOURNEY CARDS ---- */}
        <div className="!grid !grid-cols-1 !gap-4 sm:!grid-cols-2 lg:!grid-cols-4">
          {stages.map((s, i) => (
            <div
              key={i}
              className="group !relative !rounded-xl !border !border-neutral-200 !bg-white !p-5 !shadow-sm !transition-all !duration-300 hover:!-translate-y-0.5 hover:!border-[var(--brand)] hover:!shadow-lg"
            >
              {/* Step number */}
              <span
                className="!absolute !right-4 !top-4 !text-[10px] !font-bold !tracking-widest !opacity-50"
                style={{ color: "var(--brand)" }}
              >
                {s.step}
              </span>

              {/* Icon */}
              <div
                className="!mb-3 !flex !h-8 !w-8 !items-center !justify-center !rounded-lg !text-white"
                style={{ background: "var(--brand)" }}
              >
                {s.icon}
              </div>

              {/* Title */}
              <h3 className="!text-[14px] !font-bold !text-neutral-900">
                {s.title}
              </h3>

              {/* Desc */}
              <p className="!mt-1.5 !text-[12px] !leading-relaxed !text-neutral-500">
                {s.desc}
              </p>

              {/* Hover underline */}
              <div
                className="!absolute !bottom-0 !left-0 !h-[2px] !w-0 !rounded-full !transition-all !duration-300 group-hover:!w-full"
                style={{ background: "var(--brand)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}