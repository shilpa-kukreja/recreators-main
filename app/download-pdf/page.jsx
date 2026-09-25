// app/download-pdf/page.jsx
'use client';

import PageBanner from '@/components/PageBanner';
import RiddaLayout from '@/layout/RiddaLayout';
import dynamic from 'next/dynamic';
import { services } from './serviceData';

const ServicePDFButton = dynamic(
  () => import('./PDFDownloadButton').then((mod) => mod.ServicePDFButton),
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="!w-full !px-4 !py-2.5 !rounded-lg !text-sm !font-semibold !bg-neutral-200 !text-neutral-400 !cursor-wait"
      >
        Loading…
      </button>
    ),
  }
);

const FullDeckPDFButton = dynamic(
  () => import('./PDFDownloadButton').then((mod) => mod.FullDeckPDFButton),
  {
    ssr: false,
    loading: () => (
      <button
        disabled
        className="!inline-flex !items-center !justify-center !gap-3 !px-8 !py-4 !rounded-xl !bg-neutral-200 !text-neutral-400 !font-bold !text-base !cursor-wait"
      >
        Loading…
      </button>
    ),
  }
);

// ---------- INLINE ICONS ----------
const ServiceIcon = ({ name, color }) => {
  const paths = {
    box: (
      <>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
        <path d="m3.3 7 8.7 5 8.7-5" />
        <path d="M12 22V12" />
      </>
    ),
    code: (
      <>
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </>
    ),
    search: (
      <>
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
    megaphone: (
      <>
        <path d="m3 11 18-5v12L3 14v-3z" />
        <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
      </>
    ),
    palette: (
      <>
        <circle cx="13.5" cy="6.5" r=".5" />
        <circle cx="17.5" cy="10.5" r=".5" />
        <circle cx="8.5" cy="7.5" r=".5" />
        <circle cx="6.5" cy="12.5" r=".5" />
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
      </>
    ),
    camera: (
      <>
        <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
        <circle cx="12" cy="13" r="3" />
      </>
    ),
    pen: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </>
    ),
    layers: (
      <>
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </>
    ),
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
};

export default function DownloadPdfPage() {
  return (
    <RiddaLayout>
      <PageBanner pageTitle="Download PDF" pageName="Download PDF" />

      <div className="!relative !min-h-screen !bg-white !text-neutral-900 !overflow-hidden !py-10">
        {/* Ambient background glows (very subtle on white) */}
        <div className="!absolute !inset-0 !pointer-events-none !overflow-hidden">
          <div className="!absolute !-top-40 !-left-40 !w-[500px] !h-[500px] !rounded-full !bg-blue-200/40 !blur-[140px]" />
          <div className="!absolute !top-1/3 !-right-40 !w-[500px] !h-[500px] !rounded-full !bg-purple-200/40 !blur-[140px]" />
          <div className="!absolute !-bottom-40 !left-1/3 !w-[500px] !h-[500px] !rounded-full !bg-pink-200/30 !blur-[140px]" />
        </div>

        <div className="!relative !z-10 !max-w-6xl !mx-auto !px-6">
          {/* Hero */}
          <div className="!text-center !mb-14">
            {/* <span className="!inline-flex !items-center !gap-2 !px-4 !py-1.5 !rounded-full !bg-blue-50 !border !border-blue-200 !text-blue-600 !text-xs !font-semibold !uppercase !tracking-[0.2em]">
              <span className="!w-1.5 !h-1.5 !rounded-full !bg-blue-500 !animate-pulse" />
              Capability Decks
            </span> */}

            <h1 className="!mt-6 !text-4xl md:!text-5xl !font-black !tracking-tight !leading-[1.05] !text-neutral-900">
              Download Our
              <br />
              <span className="!bg-[#FF5F1F] !bg-clip-text !text-transparent">
                Service Decks
              </span>
            </h1>

            <p className="!mt-6 !text-base md:!text-lg !text-neutral-500 !max-w-2xl !mx-auto !leading-relaxed">
              Pick a service, download the deck, and share it with your team.
              Each PDF is a focused deep-dive into how{' '}
              <span className="!text-neutral-900 !font-semibold">
                ReCreators
              </span>{' '}
              delivers.
            </p>
          </div>

          {/* Full deck CTA */}
          <div className="!flex !justify-center !mb-16">
            <FullDeckPDFButton />
          </div>

          {/* Divider */}
          <div className="!flex !items-center !gap-4 !mb-10">
            <div className="!h-px !flex-1 !bg-gradient-to-r !from-transparent !via-neutral-200 !to-neutral-300" />
            <span className="!text-xs !font-semibold !uppercase !tracking-[0.2em] !text-neutral-400">
              Or pick a service
            </span>
            <div className="!h-px !flex-1 !bg-gradient-to-l !from-transparent !via-neutral-200 !to-neutral-300" />
          </div>

          {/* Service grid */}
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-3 !gap-5">
            {services.map((service) => (
              <div
                key={service.id}
                className="!group !relative !rounded-2xl !border !border-neutral-200 !bg-white !p-6 !transition-all !duration-300 hover:!border-neutral-300 hover:!-translate-y-1 hover:!shadow-xl hover:!shadow-neutral-200/60 !flex !flex-col"
              >
                {/* Hover glow */}
                <div
                  className="!absolute !inset-0 !rounded-2xl !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-500 !pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${service.color}10, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="!relative !w-12 !h-12 !rounded-xl !flex !items-center !justify-center !mb-5"
                  style={{
                    backgroundColor: `${service.color}12`,
                    border: `1px solid ${service.color}30`,
                  }}
                >
                  <ServiceIcon name={service.icon} color={service.color} />
                </div>

                {/* Title */}
                <h3 className="!relative !text-lg !font-bold !text-neutral-900 !mb-2 !leading-tight">
                  {service.title}
                </h3>

                {/* Short description */}
                <p className="!relative !text-sm !text-neutral-500 !leading-relaxed !mb-5">
                  {service.shortDesc}
                </p>

                {/* Deliverables preview */}
                <ul className="!relative !mb-6 !flex-1">
                  {service.deliverables.slice(0, 3).map((item, i) => (
                    <li
                      key={i}
                      className="!flex !items-start !gap-2 !text-xs !text-neutral-500 !mb-1.5"
                    >
                      <span
                        className="!w-1 !h-1 !rounded-full !mt-1.5 !flex-shrink-0"
                        style={{ backgroundColor: service.color }}
                      />
                      <span className="!leading-relaxed">{item}</span>
                    </li>
                  ))}
                  {service.deliverables.length > 3 && (
                    <li className="!text-xs !text-neutral-400 !italic !pl-3 !mt-1">
                      + {service.deliverables.length - 3} more inside
                    </li>
                  )}
                </ul>

                {/* Download button */}
                <div className="!relative !mt-auto">
                  <ServicePDFButton service={service} />
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <p className="!text-center !text-xs !text-neutral-400 !mt-14">
            No email required. Every deck downloads instantly.
          </p>
        </div>
      </div>
    </RiddaLayout>
  );
}