"use client";

export default function CrmIntegrationsSecurity() {
  const highlights = [
    { n: "01", t: "100+", l: "Integrations" },
    { n: "02", t: "ISO 27001", l: "Certified" },
    { n: "03", t: "99.9%", l: "Uptime SLA" },
    { n: "04", t: "1M+", l: "Records" },
  ];

  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-white !py-8 lg:!py-12"
      style={{ "--brand": "#FF6B35" }}
    >
      {/* Soft brand glows */}
      <div
        className="!pointer-events-none !absolute !-top-32 !left-1/4 !h-96 !w-96 !rounded-full !opacity-[0.09] !blur-[140px]"
        style={{ background: "var(--brand)" }}
      />
      <div className="!pointer-events-none !absolute !-bottom-20 !right-0 !h-72 !w-72 !rounded-full !bg-purple-500/[0.06] !blur-[130px]" />

      {/* Faint grid pattern */}
      <div
        className="!pointer-events-none !absolute !inset-0 !opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(to right,#000 1px,transparent 1px),linear-gradient(to bottom,#000 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <div className="!relative !z-10 !mx-auto !max-w-6xl !px-6">
        {/* ═══ EYEBROW ═══ */}
      

        {/* ═══ SPLIT: BIG TITLE LEFT · DESCRIPTION RIGHT ═══ */}
        <div className="!grid !grid-cols-1 !gap-10 lg:!grid-cols-[1.3fr_1fr] lg:!items-end lg:!gap-20">
          {/* ── LEFT: BIG TITLE ── */}
          <h2 className="!text-[32px] !font-bold !leading-[1.03] !tracking-[-0.03em] !text-neutral-900 sm:!text-[52px] lg:!text-[64px]">
            Connect{" "}
            <span className="!relative !inline-block">
              <span className="!relative !z-10">anything.</span>
              {/* brand underline */}
              <span
                className="!absolute !bottom-1 !left-0 !h-[6px] !w-full !rounded-full !opacity-30"
                style={{ background: "var(--brand)" }}
              />
            </span>
            <br />
            <span style={{ color: "var(--brand)" }}>Secure</span>{" "}
            everything.
            <br />
            Scale forever.
          </h2>

          {/* ── RIGHT: DESCRIPTION ── */}
          <div className="lg:!pb-2">
            <p className="!text-[15px] !leading-[1.7] !text-neutral-500 sm:!text-[16px]">
              100+ integrations. Bank-grade security. Infinite scale. All built
              into your CRM from day one — so you never hit a wall, no matter
              how big you grow.
            </p>

            {/* CTA */}
            <a
              href="/contact"
              className="!group !mt-8 !inline-flex !items-center !gap-2.5 !rounded-full !border !border-neutral-200 !bg-white !px-5 !py-2.5 !text-[13px] !font-bold !text-neutral-900 !shadow-sm !transition-all hover:!-translate-y-0.5 hover:!border-[var(--brand)] hover:!shadow-md"
            >
              Explore capabilities
              <span
                className="!flex !h-5 !w-5 !items-center !justify-center !rounded-full !text-white !transition-transform group-hover:!translate-x-0.5"
                style={{ background: "var(--brand)" }}
              >
                <svg
                  className="!h-3 !w-3"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </a>
          </div>
        </div>

      
        
      </div>
    </section>
  );
}