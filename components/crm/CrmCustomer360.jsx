"use client";

export default function CrmCustomer360() {
  const contacts = [
    { i: "AK", n: "Aarav Kapoor", active: true },
    { i: "SR", n: "Sara R." },
    { i: "MJ", n: "Mike J." },
    { i: "PN", n: "Priya N." },
    { i: "DL", n: "Dan L." },
  ];

  const timeline = [
    { type: "call", label: "Discovery call", detail: "Discussed pricing & scope", time: "2h ago", color: "#3B82F6" },
    { type: "mail", label: "Proposal sent", detail: "Emailed PDF · $42K", time: "1d ago", color: "#8B5CF6" },
    { type: "note", label: "Budget confirmed", detail: "Approved by CFO", time: "3d ago", color: "#F59E0B" },
    { type: "task", label: "Follow-up scheduled", detail: "Set for Tuesday 10 am", time: "5d ago", color: "#10B981" },
  ];

  const icons = {
    call: <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />,
    mail: <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    note: <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />,
    task: <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
  };

  const features = [
    { title: "Unified Profile", desc: "Every contact, deal & email in one record." },
    { title: "Full Timeline", desc: "Every interaction, in order, forever." },
    { title: "Smart Notes", desc: "Team notes attached to the right person." },
    { title: "Health Score", desc: "Churn risk & upsell signal at a glance." },
  ];

  return (
    <section
      className="!relative !w-full !overflow-hidden !bg-white !py-8 lg:!py-12"
      style={{ "--brand": "#FF6B35" }}
    >
      {/* Soft brand glow */}
      <div
        className="!pointer-events-none !absolute !left-1/2 !top-1/3 !h-96 !w-96 !-translate-x-1/2 !rounded-full !opacity-[0.08] !blur-[140px]"
        style={{ background: "var(--brand)" }}
      />

      <div className="!relative !z-10 !mx-auto !max-w-5xl !px-6">
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
            CUSTOMER 360°
          </div> */}

          <h2 className="!text-[24px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-3xl lg:!text-[34px]">
            Know your customer.{" "}
            <span style={{ color: "var(--brand)" }}>Completely.</span>
          </h2>

          <p className="!mx-auto !mt-3 !max-w-md !text-[13px] !leading-relaxed !text-neutral-500 sm:!text-sm">
            Every call, email, note & deal — brought together into one living
            profile your whole team can trust.
          </p>
        </div>

        {/* ═══════ SHOWCASE MOCKUP ═══════ */}
        <div className="!relative">
          {/* Glow behind */}
          <div
            className="!absolute !inset-6 !-z-10 !rounded-[32px] !opacity-20 !blur-3xl"
            style={{ background: "var(--brand)" }}
          />

          {/* Browser frame */}
          <div className="!overflow-hidden !rounded-2xl !border !border-neutral-200 !bg-white !shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]">
            {/* Browser top bar */}
            <div className="!flex !items-center !gap-2 !border-b !border-neutral-100 !bg-neutral-50 !px-4 !py-2.5">
              <div className="!flex !gap-1.5">
                <span className="!h-2.5 !w-2.5 !rounded-full !bg-red-400/80" />
                <span className="!h-2.5 !w-2.5 !rounded-full !bg-yellow-400/80" />
                <span className="!h-2.5 !w-2.5 !rounded-full !bg-green-400/80" />
              </div>
              <div className="!mx-auto !hidden !rounded-md !border !border-neutral-200 !bg-white !px-3 !py-0.5 !text-[10px] !text-neutral-400 sm:!block">
                app.recreators-crm.com/customers/aarav-kapoor
              </div>
            </div>

            {/* CRM app body */}
            <div className="!flex !min-h-[380px]">
              {/* ── LEFT: Contacts list ── */}
              <div className="!hidden !w-44 !flex-shrink-0 !border-r !border-neutral-100 !bg-neutral-50/70 !p-3 sm:!block">
                <p className="!mb-2 !px-1 !text-[9px] !font-bold !uppercase !tracking-wider !text-neutral-400">
                  Contacts
                </p>
                <div className="!space-y-0.5">
                  {contacts.map((c, i) => (
                    <div
                      key={i}
                      className={`!flex !items-center !gap-2 !rounded-lg !px-2 !py-1.5 ${
                        c.active
                          ? "!border !border-neutral-100 !bg-white !shadow-sm"
                          : ""
                      }`}
                    >
                      <div
                        className="!flex !h-6 !w-6 !items-center !justify-center !rounded-full !text-[9px] !font-bold !text-white"
                        style={{
                          background: c.active ? "var(--brand)" : "#D4D4D8",
                        }}
                      >
                        {c.i}
                      </div>
                      <span
                        className={`!text-[10px] !font-medium ${
                          c.active ? "!text-neutral-800" : "!text-neutral-500"
                        }`}
                      >
                        {c.n}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Add contact */}
                <div className="!mt-3 !flex !items-center !justify-center !gap-1 !rounded-lg !border !border-dashed !border-neutral-300 !py-1.5 !text-[9px] !text-neutral-400">
                  + New contact
                </div>
              </div>

              {/* ── CENTER: Profile ── */}
              <div className="!flex-1 !p-4 sm:!p-5">
                {/* Profile header */}
                <div className="!flex !items-center !gap-3 !border-b !border-neutral-100 !pb-4">
                  <div
                    className="!flex !h-11 !w-11 !items-center !justify-center !rounded-full !text-[13px] !font-bold !text-white !shadow-md"
                    style={{ background: "var(--brand)" }}
                  >
                    AK
                  </div>
                  <div className="!min-w-0 !flex-1">
                    <p className="!truncate !text-[14px] !font-bold !text-neutral-900">
                      Aarav Kapoor
                    </p>
                    <p className="!truncate !text-[10px] !text-neutral-500">
                      CEO · Lumen Labs · Mumbai
                    </p>
                  </div>
                  <span className="!hidden !rounded-full !bg-emerald-50 !px-2 !py-0.5 !text-[9px] !font-bold !text-emerald-600 sm:!inline-block">
                    ● Active
                  </span>
                </div>

                {/* Tabs */}
                <div className="!mt-3 !flex !gap-4 !border-b !border-neutral-100">
                  {["Timeline", "Deals", "Notes", "Files"].map((t, i) => (
                    <button
                      key={i}
                      className={`!relative !pb-2 !text-[11px] !font-semibold ${
                        i === 0 ? "!text-neutral-900" : "!text-neutral-400"
                      }`}
                    >
                      {t}
                      {i === 0 && (
                        <span
                          className="!absolute !bottom-0 !left-0 !h-[2px] !w-full !rounded-full"
                          style={{ background: "var(--brand)" }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Timeline */}
                <div className="!mt-3 !space-y-1">
                  {timeline.map((t, i) => (
                    <div
                      key={i}
                      className="!flex !items-start !gap-3 !rounded-lg !p-2 !transition-colors hover:!bg-neutral-50"
                    >
                      <div
                        className="!flex !h-6 !w-6 !flex-shrink-0 !items-center !justify-center !rounded-full"
                        style={{
                          background: `${t.color}18`,
                          color: t.color,
                        }}
                      >
                        <svg
                          className="!h-3 !w-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          {icons[t.type]}
                        </svg>
                      </div>
                      <div className="!min-w-0 !flex-1">
                        <p className="!truncate !text-[11px] !font-semibold !text-neutral-800">
                          {t.label}
                        </p>
                        <p className="!truncate !text-[10px] !text-neutral-500">
                          {t.detail}
                        </p>
                      </div>
                      <span className="!hidden !text-[9px] !text-neutral-400 sm:!inline">
                        {t.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Overview panel ── */}
              <div className="!hidden !w-40 !flex-shrink-0 !border-l !border-neutral-100 !bg-neutral-50/70 !p-3 md:!block">
                <p className="!mb-2 !px-1 !text-[9px] !font-bold !uppercase !tracking-wider !text-neutral-400">
                  Overview
                </p>

                {/* Health score card */}
                <div className="!mb-2 !rounded-lg !border !border-neutral-100 !bg-white !p-3">
                  <p className="!text-[9px] !uppercase !tracking-wider !text-neutral-400">
                    Health
                  </p>
                  <div className="!mt-1 !flex !items-baseline !gap-1.5">
                    <span
                      className="!text-[22px] !font-bold !leading-none"
                      style={{ color: "var(--brand)" }}
                    >
                      92
                    </span>
                    <span className="!text-[9px] !font-semibold !text-emerald-500">
                      +8%
                    </span>
                  </div>
                  <div className="!mt-2 !h-1 !w-full !overflow-hidden !rounded-full !bg-neutral-100">
                    <div
                      className="!h-full !rounded-full"
                      style={{ width: "92%", background: "var(--brand)" }}
                    />
                  </div>
                </div>

                {/* Mini stats */}
                {[
                  { l: "Lifetime", v: "$128K" },
                  { l: "Deals", v: "24" },
                  { l: "Open", v: "3" },
                ].map((s, i) => (
                  <div
                    key={i}
                    className="!flex !justify-between !border-b !border-neutral-100 !py-1.5 last:!border-0"
                  >
                    <span className="!text-[10px] !text-neutral-500">
                      {s.l}
                    </span>
                    <span className="!text-[10px] !font-bold !text-neutral-900">
                      {s.v}
                    </span>
                  </div>
                ))}

                {/* Tags */}
                <div className="!mt-3 !flex !flex-wrap !gap-1">
                  {["VIP", "Enterprise", "Upsell"].map((tag, i) => (
                    <span
                      key={i}
                      className="!rounded-full !px-2 !py-0.5 !text-[8px] !font-bold"
                      style={{
                        background: "color-mix(in srgb, var(--brand) 12%, transparent)",
                        color: "var(--brand)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          {/* <div className="!absolute !-left-4 !top-1/3 !hidden !items-center !gap-2 !rounded-xl !border !border-neutral-200 !bg-white !px-3 !py-2 !shadow-lg lg:!flex">
            <div
              className="!flex !h-7 !w-7 !items-center !justify-center !rounded-full !text-white"
              style={{ background: "var(--brand)" }}
            >
              <svg className="!h-3.5 !w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="!text-[9px] !uppercase !tracking-wider !text-neutral-400">
                Avg. Reply
              </p>
              <p className="!text-[11px] !font-bold !text-neutral-900">
                Under 5 min
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
                Retention
              </p>
              <p className="!text-[11px] !font-bold !text-neutral-900">
                98% year-1
              </p>
            </div>
          </div> */}
        </div>

        {/* ═══════ FEATURES BELOW ═══════ */}
        {/* <div className="!mt-12 !grid !grid-cols-2 !gap-3 lg:!grid-cols-4">
          {features.map((f, i) => (
            <div
              key={i}
              className="!group !rounded-xl !border !border-neutral-200 !bg-white !p-4 !transition-all !duration-300 hover:!-translate-y-1 hover:!border-[var(--brand)] hover:!shadow-lg"
            >
              <div
                className="!mb-2.5 !flex !h-8 !w-8 !items-center !justify-center !rounded-lg !text-[11px] !font-bold !text-white"
                style={{ background: "var(--brand)" }}
              >
                0{i + 1}
              </div>
              <h3 className="!text-[12px] !font-bold !text-neutral-900">
                {f.title}
              </h3>
              <p className="!mt-0.5 !text-[11px] !leading-relaxed !text-neutral-500">
                {f.desc}
              </p>
            </div>
          ))}
        </div> */}
      </div>
    </section>
  );
}