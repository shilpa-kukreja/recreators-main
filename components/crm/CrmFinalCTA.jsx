"use client";

import Link from "next/link";

export default function CrmFinalCTA() {
  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-[#0A0A0F] !py-8 lg:!py-12"
      style={{ "--brand": "#FF6B35" }}
    >
      {/* Hero-matching glow */}
      <div
        className="!pointer-events-none !absolute !-top-32 !left-1/3 !h-72 !w-72 !rounded-full !opacity-25 !blur-[120px]"
        style={{ background: "var(--brand)" }}
      />

      <div className="!relative !z-10 !mx-auto !max-w-2xl !px-6 !text-center">
       

        {/* Headline */}
        <h2 className="!text-[22px] !font-bold !leading-[1.15] !tracking-tight !text-white sm:!text-[28px] lg:!text-[34px]">
          Your CRM should fit your business.{" "}
          <span style={{ color: "var(--brand)" }}>
            Not the other way around.
          </span>
        </h2>

        {/* Sub */}
        <p className="!mx-auto !mt-3 !max-w-md !text-[12.5px] !leading-relaxed !text-white/55 sm:!text-[13px]">
          Free 30-min strategy call. We'll audit your workflow and show you
          what a custom CRM can do.
        </p>

        {/* CTAs */}
        <div className="!mt-6 !flex !flex-col !items-center !justify-center !gap-2.5 sm:!flex-row">
          <Link
            href="/contact"
            className="!group !inline-flex !w-full !items-center !justify-center !gap-1.5 !rounded-full !px-5 !py-2.5 !text-[12.5px] !font-semibold !text-black !transition-transform hover:!scale-[1.03] sm:!w-auto"
            style={{
              background: "var(--brand)",
              boxShadow:
                "0 0 30px color-mix(in srgb, var(--brand) 45%, transparent)",
            }}
          >
            Book a Free Call
            <svg
              className="!h-3.5 !w-3.5 !transition-transform group-hover:!translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </Link>

          <a
            href="#how-it-works"
            className="!inline-flex !w-full !items-center !justify-center !gap-1.5 !rounded-full !border !border-white/15 !bg-white/[0.04] !px-5 !py-2.5 !text-[12.5px] !font-medium !text-white/85 !backdrop-blur !transition-all hover:!border-white/30 hover:!bg-white/[0.08] sm:!w-auto"
          >
            See How It Works
          </a>
        </div>

       
      </div>
    </section>
  );
}