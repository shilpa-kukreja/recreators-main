"use client";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

/* ============================================================
   FloatingContact — premium edition
   Usage: <FloatingContact /> in app/layout.jsx
   ============================================================ */

const WHATSAPP_NUMBER = "919999999999"; // country code + number, no + / spaces
const PHONE_NUMBER = "+919999999999";

const WA_HREF = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi! I'd like to know more about your services."
)}`;
const CALL_HREF = `tel:${PHONE_NUMBER}`;

const FloatingContact = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ============ Floating Stack ============ */}
      <div
        className={`!fixed !bottom-5 sm:!bottom-8 !right-4 sm:!right-7 !z-[70] !flex !flex-col !items-end !gap-4 !transition-all !duration-[900ms] ${
          visible
            ? "!opacity-100 !translate-y-0 !pointer-events-auto"
            : "!opacity-0 !translate-y-10 !pointer-events-none"
        }`}
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* ---------- WhatsApp ---------- */}
        <ContactButton
          href={WA_HREF}
          external
          label="WhatsApp"
          subtitle="Typically replies within minutes"
          icon={<FaWhatsapp size={24} />}
          accent="whatsapp"
          delay="0ms"
          showStatus
        />

        {/* ---------- Call ---------- */}
        <ContactButton
          href={CALL_HREF}
          label="Call Now"
          subtitle="Mon–Sat · 10 AM – 7 PM"
          icon={<FiPhone size={20} />}
          accent="call"
          delay="120ms"
        />
      </div>

      {/* ============ Footer Inline Pills ============ */}
      <div className="!flex !flex-wrap !items-center !gap-3">
        <FooterPill
          href={WA_HREF}
          external
          icon={<FaWhatsapp size={17} />}
          label="Chat on WhatsApp"
          accent="whatsapp"
        />
        <FooterPill
          href={CALL_HREF}
          icon={<FiPhone size={15} />}
          label="Call Now"
          accent="call"
        />
      </div>

      {/* ============ Global keyframes ============ */}
      <style jsx global>{`
        @keyframes fcRipple {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          80% {
            transform: scale(2.2);
            opacity: 0;
          }
          100% {
            transform: scale(2.2);
            opacity: 0;
          }
        }
        @keyframes fcStatusPulse {
          0%,
          100% {
            box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.8);
          }
          60% {
            box-shadow: 0 0 0 6px rgba(37, 211, 102, 0);
          }
        }
        @keyframes fcFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-3px);
          }
        }
        @keyframes fcShimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .fc-ripple {
          animation: fcRipple 2.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .fc-status {
          animation: fcStatusPulse 2s ease-in-out infinite;
        }
        .fc-float {
          animation: fcFloat 3.6s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default FloatingContact;

/* ============================================================
   ContactButton — the floating action button
   ============================================================ */
const ContactButton = ({
  href,
  external,
  label,
  subtitle,
  icon,
  accent,
  delay = "0ms",
  showStatus = false,
}) => {
  const isWA = accent === "whatsapp";

  /* -------- Design tokens per accent -------- */
  const tokens = isWA
    ? {
        ripple: "bg-[#25D366]",
        btn: "bg-[linear-gradient(145deg,#2be574_0%,#25D366_45%,#128C7E_100%)]",
        ring: "ring-[#25D366]/40",
        hoverRing: "group-hover:ring-[#25D366]/70",
        label: "text-[#25D366]",
        glow: "shadow-[0_14px_40px_-12px_rgba(37,211,102,0.9),0_6px_18px_-6px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.35)]",
        glowHover:
          "group-hover:shadow-[0_24px_60px_-14px_rgba(37,211,102,1),0_10px_26px_-8px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.45)]",
      }
    : {
        ripple: "bg-orange-500",
        btn: "bg-[#FF5F1F]",
        ring: "ring-orange-400/40",
        hoverRing: "group-hover:ring-orange-400/70",
        label: "text-orange-300",
        glow: "shadow-[0_14px_40px_-12px_rgba(249,115,22,0.75),0_6px_18px_-6px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.12)]",
        glowHover:
          "group-hover:shadow-[0_24px_60px_-14px_rgba(249,115,22,1),0_10px_26px_-8px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.2)]",
      };

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      className="!group !relative !flex !items-center !justify-end"
    >
      {/* ===================== Tooltip Card (desktop) ===================== */}
      <span
        className="!pointer-events-none !absolute !right-[calc(100%+16px)] !top-1/2 !-translate-y-1/2 !hidden sm:!block !opacity-0 !translate-x-4 !transition-all !duration-500 group-hover:!opacity-100 group-hover:!translate-x-0"
        style={{
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <span className="!relative !flex !flex-col !gap-0.5 !whitespace-nowrap !rounded-2xl !border !border-white/[0.08] !bg-[linear-gradient(180deg,rgba(20,20,24,0.92)_0%,rgba(8,8,10,0.96)_100%)] !px-4 !py-3 !backdrop-blur-2xl !shadow-[0_20px_60px_-15px_rgba(0,0,0,0.95),inset_0_1px_0_rgba(255,255,255,0.08)]">
          {/* top sheen */}
          <span className="!pointer-events-none !absolute !inset-x-3 !top-0 !h-px !bg-gradient-to-r !from-transparent !via-white/25 !to-transparent" />

          {/* arrow */}
          <span
            className={`!absolute !-right-[5px] !top-1/2 !h-2.5 !w-2.5 !-translate-y-1/2 !rotate-45 !border-r !border-t !border-white/[0.08] !bg-[#08080a]`}
          />

          <span
            className={`!flex !items-center !gap-2 !text-[13px] !font-semibold !tracking-wide ${tokens.label}`}
          >
            <span className="!text-[8px] !leading-none">●</span>
            {label}
          </span>
          {subtitle && (
            <span className="!text-[11px] !font-medium !text-white/45 !tracking-wide">
              {subtitle}
            </span>
          )}
        </span>
      </span>

      {/* ===================== Ripple ring ===================== */}
      <span
        className={`!pointer-events-none !absolute !inset-0 !rounded-full ${tokens.ripple} fc-ripple`}
        style={{ animationDelay: delay }}
      />

      {/* ===================== The Button ===================== */}
      <span
        className={`fc-float !relative !flex !h-13 w-13 sm:!h-14 sm:!w-14 !items-center !justify-center !rounded-full !ring-1 ${tokens.ring} ${tokens.hoverRing} ${tokens.btn} !text-white ${tokens.glow} ${tokens.glowHover} !transition-all !duration-500 !ease-out group-hover:!-translate-y-2 group-hover:!scale-[1.07] group-active:!scale-[0.96] group-active:!-translate-y-0.5`}
        style={{
          animationDelay: `calc(${delay} + 0.6s)`,
          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        {/* inner top-light */}
        <span className="!pointer-events-none !absolute !inset-0 !rounded-full !bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.28),transparent_55%)]" />

        {/* inner rim */}
        <span className="!pointer-events-none !absolute !inset-[1px] !rounded-full !ring-1 !ring-inset !ring-white/10" />

        {/* shine sweep on hover */}
        <span className="!pointer-events-none !absolute !inset-0 !overflow-hidden !rounded-full">
          <span className="!absolute !inset-0 !-translate-x-full !bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.55)_50%,transparent_70%)] !transition-transform !duration-[900ms] !ease-out group-hover:!translate-x-full" />
        </span>

        {/* icon */}
        <span className="!relative !text-[22px] sm:!text-[23px] !drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)] !transition-transform !duration-500 group-hover:!scale-110">
          {icon}
        </span>

        {/* online status */}
        {/* {showStatus && (
          <span className="!absolute !-top-0.5 !-right-0.5 !flex !h-3.5 !w-3.5 !items-center !justify-center">
            <span className="!absolute !h-full !w-full !rounded-full !bg-[#25D366] !opacity-60 fc-ripple" />
            <span className="!relative !h-2.5 !w-2.5 !rounded-full !bg-[#25D366] !ring-2 !ring-black/70 fc-status" />
          </span>
        )} */}
      </span>
    </a>
  );
};

/* ============================================================
   FooterPill — inline footer version
   ============================================================ */
const FooterPill = ({ href, external, icon, label, accent }) => {
  const isWA = accent === "whatsapp";

  const classes = isWA
    ? "border-[#25D366]/25 bg-[#25D366]/[0.06] text-[#25D366] hover:bg-[#25D366] hover:border-[#25D366] hover:text-white hover:shadow-[0_14px_36px_-12px_rgba(37,211,102,0.95)]"
    : "border-orange-400/25 bg-orange-500/[0.06] text-orange-300 hover:bg-orange-500 hover:border-orange-400 hover:text-white hover:shadow-[0_14px_36px_-12px_rgba(249,115,22,0.95)]";

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={label}
      className={`!group !relative !inline-flex !items-center !gap-2.5 !overflow-hidden !rounded-full !border !px-4 !py-2.5 !text-[12.5px] !font-semibold !tracking-wide !backdrop-blur-md !transition-all !duration-500 !ease-out hover:!-translate-y-0.5 ${classes}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
    >
      {/* shine sweep */}
      <span className="!pointer-events-none !absolute !inset-0 !-translate-x-full !bg-[linear-gradient(115deg,transparent_35%,rgba(255,255,255,0.35)_50%,transparent_65%)] !transition-transform !duration-[900ms] !ease-out group-hover:!translate-x-full" />

      <span className="!relative !transition-transform !duration-500 group-hover:!scale-110 group-hover:!rotate-[-6deg]">
        {icon}
      </span>
      <span className="!relative">{label}</span>
    </a>
  );
};