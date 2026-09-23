"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function CrmHero() {
  const dashboardRef = useRef(null);

  useEffect(() => {
    const el = dashboardRef.current;
    if (!el) return;
    const handleMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      el.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg)`;
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-[#0A0A0F] !text-white !mt-10"
      style={{ "--brand": "#FF6B35" }} // 🎨 change to your logo color
    >
      {/* Glow */}
      <div
        className="!pointer-events-none !absolute !-top-24 !left-1/3 !h-56 !w-56 !rounded-full !opacity-25 !blur-[100px]"
        style={{ background: "var(--brand)" }}
      />

      <div className="!relative !z-10 !mx-auto !flex !max-w-6xl !flex-col !items-center !gap-8 !px-6 !py-10 lg:!flex-row lg:!gap-10 lg:!py-14">
        {/* ---- LEFT ---- */}
        <div className="!w-full lg:!w-1/2">
          {/* Eyebrow */}
          {/* <div
            className="!mb-3 !inline-flex !items-center !gap-1.5 !rounded-full !border !px-2.5 !py-1 !text-[10px] !font-medium !tracking-widest"
            style={{
              borderColor: "color-mix(in srgb, var(--brand) 40%, transparent)",
              background: "color-mix(in srgb, var(--brand) 10%, transparent)",
              color: "var(--brand)",
            }}
          >
            <span
              className="!h-1 !w-1 !rounded-full"
              style={{ background: "var(--brand)" }}
            />
            CUSTOM CRM DEVELOPMENT
          </div> */}

          {/* Headline */}
          <h1 className="!text-[26px] !font-bold !text-white !leading-[1.15] !tracking-tight sm:!text-3xl lg:!text-[38px]">
            Your business runs on relationships.
            <br />
            <span style={{ color: "var(--brand)" }}>
              Your CRM should be built for them.
            </span>
          </h1>

          {/* Sub */}
          <p className="!mt-3 !max-w-md !text-[13px] !leading-relaxed !text-white/60 sm:!text-sm">
            We build custom CRMs that fit your exact workflow — so your team
            closes more deals, faster.
          </p>

          {/* CTAs */}
          <div className="!mt-5 !flex !flex-wrap !items-center !gap-3">
            <Link
              href="/contact"
              className="group !inline-flex !items-center !gap-1.5 !rounded-full !px-5 !py-2.5 !text-[13px] !font-semibold !text-black !transition-transform hover:!scale-[1.03]"
              style={{
                background: "var(--brand)",
                boxShadow:
                  "0 0 24px color-mix(in srgb, var(--brand) 45%, transparent)",
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
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 5l7 7-7 7"
                />
              </svg>
            </Link>
            <a
              href="#how"
              className="!text-[13px] !font-medium !text-white/55 hover:!text-white"
            >
              See how it works →
            </a>
          </div>

          {/* <p className="!mt-5 !text-[10px] !uppercase !tracking-[0.2em] !text-white/30">
            Trusted by 300+ growing teams
          </p> */}
        </div>

        {/* ---- RIGHT: Dashboard ---- */}
        <div className="!relative !w-full lg:!w-1/2">
          <div
            className="!absolute !inset-4 !-z-10 !rounded-3xl !opacity-30 !blur-3xl"
            style={{ background: "var(--brand)" }}
          />
          <div
            ref={dashboardRef}
            className="!rounded-xl !border !border-white/10 !bg-[#101018] !p-2 !shadow-xl !transition-transform !duration-300"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Bar */}
            <div className="!mb-1.5 !flex !items-center !gap-1 !px-1">
              <span className="!h-1.5 !w-1.5 !rounded-full !bg-red-400/70" />
              <span className="!h-1.5 !w-1.5 !rounded-full !bg-yellow-400/70" />
              <span className="!h-1.5 !w-1.5 !rounded-full !bg-green-400/70" />
              <span className="!ml-2 !text-[8px] !text-white/30">
                recreators-crm.app
              </span>
            </div>

            <div className="!rounded-lg !bg-[#0A0A0F] !p-2">
              {/* Stats */}
              <div className="!grid !grid-cols-3 !gap-1.5">
                {[
                  { l: "Pipeline", v: "$482K" },
                  { l: "Leads", v: "1,204" },
                  { l: "Closed", v: "327" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="!rounded-md !border !border-white/5 !bg-white/[0.03] !px-2 !py-1.5"
                  >
                    <p className="!text-[7px] !uppercase !tracking-wider !text-white/40">
                      {s.l}
                    </p>
                    <p
                      className="!mt-0.5 !text-[11px] !font-bold"
                      style={{ color: "var(--brand)" }}
                    >
                      {s.v}
                    </p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="!mt-1.5 !rounded-md !border !border-white/5 !bg-white/[0.03] !p-2">
                <div className="!mb-1 !flex !justify-between">
                  <span className="!text-[8px] !uppercase !tracking-wider !text-white/40">
                    Revenue
                  </span>
                  <span className="!text-[8px] !font-semibold !text-emerald-400">
                    +24%
                  </span>
                </div>
                <div className="!flex !h-9 !items-end !gap-0.5">
                  {[40, 65, 45, 80, 55, 95, 70, 88, 60, 100, 75, 92].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="!flex-1 !rounded-t-sm"
                        style={{
                          height: `${h}%`,
                          background: "var(--brand)",
                          opacity: 0.35 + (h / 100) * 0.65,
                        }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Deals */}
              <div className="!mt-1.5 !space-y-1">
                {[
                  { n: "Acme Corp", a: "$42K" },
                  { n: "Nova Inc", a: "$28K" },
                ].map((d, i) => (
                  <div
                    key={i}
                    className="!flex !items-center !justify-between !rounded !bg-white/[0.02] !px-2 !py-1"
                  >
                    <div className="!flex !items-center !gap-1.5">
                      <div
                        className="!h-3.5 !w-3.5 !rounded-full"
                        style={{ background: "var(--brand)" }}
                      />
                      <span className="!text-[9px] !text-white/70">{d.n}</span>
                    </div>
                    <span className="!text-[9px] !font-semibold !text-emerald-400">
                      {d.a}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}