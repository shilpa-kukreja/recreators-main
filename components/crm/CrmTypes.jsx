"use client";

import Image from "next/image";

export default function CrmTypes() {
  const crms = [
    {
      title: "Real Estate CRM",
      desc: "Manage listings, site visits, buyer-seller matching & faster deal closures.",
      tag: "Real Estate",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
      icon: (
        <svg className="!h-5 !w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3v-6h6v6h3a1 1 0 001-1V10" />
        </svg>
      ),
    },
    {
      title: "Healthcare CRM",
      desc: "Patient records, appointments, reminders & complete treatment history in one place.",
      tag: "Healthcare",
      image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?q=80&w=1200&auto=format&fit=crop",
      icon: (
        <svg className="!h-5 !w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21s-7-4.5-9-9a5 5 0 019-3 5 5 0 019 3c-2 4.5-9 9-9 9z" />
        </svg>
      ),
    },
    {
      title: "Education CRM",
      desc: "Streamline admissions, student tracking, fees & parent communication.",
      tag: "Education",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1200&auto=format&fit=crop",
      icon: (
        <svg className="!h-5 !w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zM12 14l6.16-3.42A12 12 0 0112 21a12 12 0 01-6.16-10.42L12 14z" />
        </svg>
      ),
    },
    {
      title: "E-commerce CRM",
      desc: "Track orders, recover carts, segment customers & run loyalty programs.",
      tag: "E-commerce",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1200&auto=format&fit=crop",
      icon: (
        <svg className="!h-5 !w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
    },
    {
      title: "Travel CRM",
      desc: "Manage bookings, itineraries, vendor coordination & instant follow-ups.",
      tag: "Travel",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1200&auto=format&fit=crop",
      icon: (
        <svg className="!h-5 !w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
    },
    {
      title: "Enterprise CRM",
      desc: "Custom workflows built for manufacturing, logistics, B2B & large teams.",
      tag: "Enterprise",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
      icon: (
        <svg className="!h-5 !w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-white !py-8 lg:!py-12"
      style={{ "--brand": "#FF6B35" }}
    >
      {/* Soft glow */}
      <div
        className="!pointer-events-none !absolute !left-1/2 !top-0 !h-72 !w-72 !-translate-x-1/2 !rounded-full !opacity-[0.06] !blur-[120px]"
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
            BUILT FOR EVERY INDUSTRY
          </div> */}

          <h2 className="!text-[24px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-3xl lg:!text-[34px]">
            Not Just Sales CRMs.{" "}
            <span style={{ color: "var(--brand)" }}>Every CRM.</span>
          </h2>

          <p className="!mx-auto !mt-3 !max-w-lg !text-[13px] !leading-relaxed !text-neutral-500 sm:!text-sm">
            Whether you run a clinic, a college, a store, or a global enterprise
            — we build a CRM shaped around your exact business.
          </p>
        </div>

        {/* ---- GRID ---- */}
        <div className="!grid !grid-cols-1 !gap-5 sm:!grid-cols-2 lg:!grid-cols-3">
          {crms.map((c, i) => (
            <div
              key={i}
              className="group !relative !overflow-hidden !rounded-2xl !border !border-neutral-200 !bg-white !shadow-sm !transition-all !duration-500 hover:!-translate-y-1.5 hover:!shadow-2xl"
            >
              {/* ═══ IMAGE ═══ */}
              <div className="!relative !h-48 !overflow-hidden">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="!object-cover !transition-transform !duration-700 group-hover:!scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Dark gradient overlay */}
                <div className="!absolute !inset-0 !bg-gradient-to-t !from-black/85 !via-black/30 !to-black/10" />

                {/* Brand tint on hover */}
                <div
                  className="!absolute !inset-0 !opacity-0 !transition-opacity !duration-500 group-hover:!opacity-30"
                  style={{
                    background:
                      "linear-gradient(to top, var(--brand), transparent 60%)",
                  }}
                />

                {/* Tag pill (top-right) */}
                {/* <span className="!absolute !right-3 !top-3 !z-10 !rounded-full !bg-white/15 !px-2.5 !py-1 !text-[9px] !font-semibold !uppercase !tracking-wider !text-white !backdrop-blur-md !border !border-white/20">
                  {c.tag}
                </span> */}

                {/* Icon circle (top-left) */}
                <div
                  className="!absolute !left-3 !top-3 !z-10 !flex !h-9 !w-9 !items-center !justify-center !rounded-full !text-white !shadow-lg !transition-transform !duration-500 group-hover:!scale-110 group-hover:!rotate-6"
                  style={{ background: "var(--brand)" }}
                >
                  {c.icon}
                </div>

                {/* Title on image */}
                <div className="!absolute !bottom-0 !left-0 !right-0 !z-10 !p-4">
                  <h3 className="!text-[15px] !font-bold !text-white sm:!text-base">
                    {c.title}
                  </h3>
                </div>
              </div>

              {/* ═══ CONTENT ═══ */}
              <div className="!p-4">
                <p className="!text-[12px] !leading-relaxed !text-neutral-500">
                  {c.desc}
                </p>

                {/* Learn more link */}
                <div className="!mt-3 !flex !items-center !gap-1.5 !text-[11px] !font-semibold !transition-all">
                  <span style={{ color: "var(--brand)" }}>Explore</span>
                  <svg
                    className="!h-3 !w-3 !transition-transform group-hover:!translate-x-1.5"
                    style={{ color: "var(--brand)" }}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </div>
              </div>

              {/* Bottom brand underline on hover */}
              <div
                className="!absolute !bottom-0 !left-0 !h-[3px] !w-0 !transition-all !duration-500 group-hover:!w-full"
                style={{ background: "var(--brand)" }}
              />
            </div>
          ))}
        </div>

        {/* ---- FOOTER ---- */}
        <p className="!mt-8 !text-center !text-[12px] !text-neutral-500 sm:!text-[13px]">
          Don't see your industry?{" "}
          <a
            href="/contact"
            className="!font-semibold !underline-offset-4 hover:!underline"
            style={{ color: "var(--brand)" }}
          >
            We'll build one for you →
          </a>
        </p>
      </div>
    </section>
  );
}