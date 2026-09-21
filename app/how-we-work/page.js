// "use client";

// import React from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { ArrowRight, CheckCircle, Clock, Search, BarChart2, Settings2 } from "lucide-react";
// import RiddaLayout from "@/layout/RiddaLayout";
// import PageBanner from "@/components/PageBanner";

// export default function HowWeWork() {
//   const steps = [
//     {
//       id: 1,
//       title: "Discover",
//       desc: "We analyze your brand, audience, competitors, and current performance to identify untapped opportunities.",
//       icon: <Search size={24} />,
//       color: "bg-gradient-to-r from-indigo-100 to-indigo-50 text-indigo-700",
//     },
//     {
//       id: 2,
//       title: "Strategy",
//       desc: "We craft a data-driven strategy aligned with your goals, focusing on the most impactful channels.",
//       icon: <Settings2 size={24} />,
//       color: "bg-gradient-to-r from-rose-100 to-rose-50 text-rose-700",
//     },
//     {
//       id: 3,
//       title: "Execute",
//       desc: "From paid campaigns to content creation, our specialists execute with precision.",
//       icon: <ArrowRight size={24} />,
//       color: "bg-gradient-to-r from-emerald-100 to-emerald-50 text-emerald-700",
//     },
//     {
//       id: 4,
//       title: "Optimize",
//       desc: "We continuously A/B test, refine budgets, and refresh creatives to maximize ROI.",
//       icon: <Clock size={24} />,
//       color: "bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-700",
//     },
//     {
//       id: 5,
//       title: "Report",
//       desc: "Transparent reporting with insights and dashboards so you always see real progress.",
//       icon: <BarChart2 size={24} />,
//       color: "bg-gradient-to-r from-sky-100 to-sky-50 text-sky-700",
//     },
//   ];

//   return (
//     <RiddaLayout>
//     <PageBanner pageTitle="How We Work" pageName="How We Work" />
//     <main className="!min-h-screen !bg-gray-50 !py-16 !px-6 lg:!px-20">
//       <section className="!max-w-7xl !mx-auto">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-12 !items-center !mb-20"
//         >
//           <div>
//             <h1 className="!text-5xl !font-extrabold !leading-tight !text-gray-900">
//               How We Work
//             </h1>
//             <p className="!mt-6 !text-lg !text-gray-600 !max-w-xl">
//               Our proven framework transforms discovery into measurable growth. We combine creativity with analytics to deliver outstanding digital marketing outcomes.
//             </p>

//             <div className="!mt-10 !flex !gap-4">
//               <motion.a
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 href="#contact"
//                 className="!inline-flex !items-center !gap-3 !bg-gradient-to-r from-indigo-600 to-rose-500 !text-white !px-6 !py-3 !rounded-full !shadow-lg"
//               >
//                 <span>Start Your Project</span>
//                 <ArrowRight size={16} />
//               </motion.a>

//               <motion.a
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 href="#process"
//                 className="!inline-flex !items-center !gap-3 !border !border-gray-300 !px-6 !py-3 !rounded-full !text-gray-700 hover:!bg-gray-100"
//               >
//                 View Process
//               </motion.a>
//             </div>

//             <div className="!mt-10 !grid !grid-cols-3 !gap-4">
//               <Stat label="Avg. ROI" value="4.2x" />
//               <Stat label="Avg. CTR" value="2.8%" />
//               <Stat label="Growth" value="+38% MoM" />
//             </div>
//           </div>

//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             whileInView={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="!relative !w-full !h-80 sm:!h-[28rem] !rounded-3xl !overflow-hidden !shadow-2xl"
//           >
//             <Image
//               src="https://recreatorsdesign.com/assets/image/digital-web.jpg"
//               alt="Digital marketing strategy illustration"
//               fill
//               className="object-cover"
//               sizes="(max-width: 1024px) 100vw, 50vw"
//             />
//           </motion.div>
//         </motion.div>

//         {/* Process Steps */}
//         <section id="process" className="!mb-20">
//           <motion.h2
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="!text-3xl !font-bold !text-gray-900 !mb-10 !text-center"
//           >
//             Our 5-Step Process
//           </motion.h2>

//           <div className="!grid !gap-10 lg:!gap-14">
//             {steps.map((s, idx) => (
//               <StepCard key={s.id} step={s} index={idx + 1} />
//             ))}
//           </div>
//         </section>

//         {/* Deliverables */}
//         <section className="!mb-20">
//           <motion.h3
//             initial={{ opacity: 0, y: 30 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="!text-2xl !font-bold !text-gray-900 !mb-8 !text-center"
//           >
//             What We Deliver
//           </motion.h3>

//           <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-6">
//             <Deliverable title="Channel Audit" desc="Comprehensive review of your digital presence." />
//             <Deliverable title="Creative Plan" desc="Engaging concepts and campaign ideas." />
//             <Deliverable title="Growth Experiments" desc="Tested strategies with measurable results." />
//             <Deliverable title="Dashboard" desc="Custom analytics and actionable insights." />
//           </div>
//         </section>

//         {/* CTA Section */}
//         <motion.section
//           id="contact"
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//           viewport={{ once: true }}
//           className="!bg-gradient-to-r from-indigo-50 to-gray-50 !rounded-3xl !p-10 !shadow-xl"
//         >
//           <div className="!flex !flex-col md:!flex-row !items-center !justify-between !gap-6">
//             <div>
//               <h4 className="!text-3xl !font-bold !text-gray-900">Ready to Accelerate Growth?</h4>
//               <p className="!text-gray-600 !mt-3 !max-w-md">
//                 Book a free 30-minute strategy call with our experts and discover your next 90-day growth roadmap.
//               </p>
//             </div>

//             <form className="!flex !gap-3 !w-full md:!w-auto">
//               <input
//                 aria-label="email"
//                 type="email"
//                 required
//                 placeholder="Enter your email"
//                 className="!flex-1 md:!w-72 !px-5 !py-3 !rounded-full !border !border-gray-300 focus:!ring-2 focus:!ring-indigo-200 !outline-none"
//               />

//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 className="!inline-flex !items-center !gap-2 !bg-indigo-600 !text-white !px-6 !py-3 !rounded-full hover:!shadow-lg"
//               >
//                 Schedule Call
//               </motion.button>
//             </form>
//           </div>
//         </motion.section>
//       </section>
//     </main>
//     </RiddaLayout>
//   );
// }

// function Stat({ label, value }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.4 }}
//       viewport={{ once: true }}
//       className="!bg-white !border !border-gray-200 !rounded-2xl !p-5 !shadow-sm !text-center"
//     >
//       <div className="!text-sm !text-gray-500">{label}</div>
//       <div className="!mt-1 !font-bold !text-xl !text-gray-900">{value}</div>
//     </motion.div>
//   );
// }

// function StepCard({ step, index }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 40 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       viewport={{ once: true }}
//       className="!bg-white !rounded-3xl !p-8 !shadow-md hover:!shadow-lg !transition !flex !flex-col md:!flex-row !items-start !gap-6"
//     >
//       <div className={`!flex !h-14 !w-14 !items-center !justify-center !rounded-2xl ${step.color} !shadow-md`}>{step.icon}</div>
//       <div className="!flex-1">
//         <h4 className="!text-xl !font-semibold !text-gray-900">{index}. {step.title}</h4>
//         <p className="!mt-3 !text-gray-600 !leading-relaxed">{step.desc}</p>
//       </div>
//     </motion.div>
//   );
// }

// function Deliverable({ title, desc }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       viewport={{ once: true }}
//       className="!bg-white !border !border-gray-200 !rounded-2xl !p-6 !shadow-md hover:!shadow-lg !transition"
//     >
//       <div className="!text-base !font-semibold !text-gray-900">{title}</div>
//       <div className="!mt-2 !text-sm !text-gray-600">{desc}</div>
//     </motion.div>
//   );
// }

"use client";

import {React, useState} from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Search,
  BarChart2,
  Settings2,
  TrendingUp,
  Target,
  Zap,
  Users,
  BarChart3,
} from "lucide-react";
import RiddaLayout from "@/layout/RiddaLayout";
import PageBanner from "@/components/PageBanner";

export default function HowWeWork() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("Please enter your email");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/subscriber/addsubscriber`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        setMessage("✅ Subscribed successfully!");
        setEmail("");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("⚠️ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      id: 1,
      title: "Dig Deep",
      desc: "Before we design a single thing, we get into the weeds- your market, your competitors, your customers, and the gap between where you are and where you want to be.",
      icon: <Search size={24} />,
      color: "!bg-indigo-500",
      gradient: "from-indigo-500 to-violet-600",
    },
    {
      id: 2,
      title: "Build the Blueprint",
      desc: "Strategy comes before pixels. We map out the direction- tone, positioning, and the plan every design decision will be measured against.",
      icon: <Settings2 size={24} />,
      color: "!bg-rose-500",
      gradient: "from-rose-500 to-pink-600",
    },
    {
      id: 3,
      title: "Bring It to Life",
      desc: "This is where the work actually takes shape- design, development, content built to match the blueprint, not improvised on the fly.",
      icon: <Zap size={24} />,
      color: "!bg-emerald-500",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      id: 4,
      title: "Ship & Sharpen",
      desc: "We launch, then we watch. Real performance data shapes what we refine next, because a good launch is a starting point, not a finish line.",
      icon: <TrendingUp size={24} />,
      color: "!bg-amber-500",
      gradient: "from-amber-500 to-orange-600",
    },
   
  ];

  return (
    <RiddaLayout>
      <PageBanner pageTitle="How We Work" pageName="How We Work" />
      <main className="!min-h-screen !bg-gradient-to-b from-gray-50 to-white !py-16 !px-6 lg:!px-20">
        <section className="!max-w-7xl !mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-12 !items-center !mb-24"
          >
            <div>
              <div className="!inline-flex !items-center !gap-2 !bg-indigo-100 !text-yellow-600 !px-4 !py-2 !rounded-full !text-sm !font-medium !mb-6">
                <Target size={16} />
                <span>No Guesswork, Just Process</span>
              </div>

              <h1 className="!text-4xl md:!text-5xl !font-bold !leading-tight !text-gray-900">
                 Great Work Isn't Luck. {" "}
                <span className="!text-transparent !bg-clip-text !bg-gradient-to-r from-yellow-500 to-orange-500">
                  It's a System.
                </span>
              </h1>

              <p className="!mt-6 !text-lg !text-gray-600 !max-w-xl !leading-relaxed">
                Anyone can promise a great outcome. We're the ones who show you exactly how we get there — a process built on real strategy, honest checkpoints, and zero mystery about where your project stands at any given moment.
              </p>

              <div className="!mt-10 !flex !flex-wrap !gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href="#contact"
                  className="!inline-flex !items-center !gap-3 !bg-gradient-to-r from-yellow-600 to-amber-600 !text-white !px-8 !py-4 !rounded-xl !shadow-lg hover:!shadow-xl !transition-shadow"
                >
                  <span>Start Your Project</span>
                  <ArrowRight size={18} />
                </motion.a>

                {/* <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  href="#process"
                  className="!inline-flex !items-center !gap-3 border !border-gray-300 !px-8 !py-4 !rounded-xl !text-gray-700 hover:!bg-gray-50 !transition-colors"
                >
                  View Our Process
                </motion.a> */}
              </div>

              <div className="!mt-12 !grid !grid-cols-3 !gap-6">
                <Stat
                  label="Avg. ROI"
                  value="4.2x"
                  icon={<BarChart3 className="!text-indigo-600" />}
                />
                <Stat
                  label="Avg. CTR"
                  value="2.8%"
                  icon={<TrendingUp className="!text-rose-600" />}
                />
                <Stat
                  label="Growth"
                  value="+38% MoM"
                  icon={<Zap className="!text-amber-600" />}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="!relative !w-full !h-80 sm:!h-[28rem] !rounded-3xl !overflow-hidden !shadow-2xl !group"
            >
              <Image
                src="https://recreatorsdesign.com/assets/image/digital-web.jpg"
                alt="Digital marketing strategy illustration"
                fill
                className="!object-cover group-hover:!scale-105 !transition-transform !duration-700"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="!absolute !inset-0 !bg-gradient-to-t from-black/30 to-transparent !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-500"></div>
            </motion.div>
          </motion.div>

          {/* Process Steps */}
          <section id="process" className="!mb-28">
            <div className="!text-center !max-w-2xl !mx-auto !mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="!text-4xl !font-bold !text-gray-900 !mb-4"
              >
                From   <span className="!text-yellow-600">First Conversation</span> to First Result
              </motion.h2>
              <p className="!text-gray-600 !text-lg">
                A structured approach that ensures clarity, efficiency, and
                measurable results for every project.
              </p>
            </div>

            <div className="!relative">
              {/* Connecting line */}
              <div className="!absolute !left-4 !top-0 !bottom-0 !w-1 !bg-gradient-to-b from-yellow-500 via-orange-500 to-red-500 !hidden lg:!block !ml-4"></div>

              <div className="!grid !gap-16  lg:!gap-8">
                {steps.map((s, idx) => (
                  <StepCard key={s.id} step={s} index={idx + 1} />
                ))}
              </div>
            </div>
          </section>

          {/* Deliverables */}
          <section className="!mb-24">
            <div className="!text-center !max-w-2xl !mx-auto !mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="!text-3xl !font-bold !text-gray-900 !mb-4"
              >
                Not Just Deliverables.  <span className="!text-yellow-600">Real Outcomes.</span>
              </motion.h3>
              <p className="!text-gray-600">
Every project ends with more than a file handoff               </p>
            </div>

            <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-6">
              <Deliverable
                title="A Brand People Actually Remember"
                desc="Not just a logo - an identity with a clear point of view, one that makes people feel something and instantly recognise you again next time."
                icon={<Search className="!text-indigo-600" />}
              />
              <Deliverable
                title="Attention That Turns Into Customers"
                desc="Design and campaigns built to do more than get noticed engineered to move people from interesting to I'm buying this."
                icon={<Users className="!text-rose-600" />}
              />
              <Deliverable
                title="Data You Can Actually Act On"
                desc="No vanity metrics or confusing dashboards- clear insights that tell you exactly what's working, what isn't, and what to do next."
                icon={<Zap className="!text-amber-600" />}
              />
              <Deliverable
                title="Growth That Doesn't Plateau"
                desc="We don't disappear after launch. Ongoing optimization means your results keep compounding, not stalling out after month one."
                icon={<BarChart2 className="!text-sky-600" />}
              />
            </div>
          </section>

          {/* CTA Section */}
          <motion.section
            id="contact"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="!bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 !rounded-3xl !p-10 md:!p-12 !shadow-xl !overflow-hidden !relative"
          >
            <div className="!absolute -!right-10 -!top-10 !w-40 !h-40 !bg-white/10 !rounded-full"></div>
            <div className="!absolute -!left-10 -!bottom-10 !w-40 !h-40 !bg-white/10 !rounded-full"></div>

            <div className="!flex !flex-col md:!flex-row !items-center !justify-between !gap-8 !relative !z-10">
              <div className="!text-white !max-w-md">
                <h4 className="!text-3xl !font-bold !mb-4">
                  Curious What This Looks Like for Your Brand?
                </h4>
                <p className="!text-indigo-100">
                  Tell us where you're stuck, and we'll show you exactly how we'd approach it- no obligation, no fluff.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="!flex !flex-col sm:!flex-row !gap-4 !w-full md:!w-auto"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="!flex-1 !px-5 !py-3 !rounded-xl !border !border-white/20 !bg-white/10 !text-white placeholder:!text-indigo-200 focus:!ring-2 focus:!ring-white/30 !outline-none"
                />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="!inline-flex !items-center !justify-center !gap-2 !bg-white !text-indigo-600 !font-medium !px-6 !py-3 !rounded-xl hover:!shadow-lg !transition-shadow disabled:!opacity-50"
                >
                  {loading ? "Subscribing..." : "Schedule your Call"}
                </motion.button>
              </form>

              {message && (
                <p className="!text-white !mt-4 !text-sm !font-medium">
                  {message}
                </p>
              )}
            </div>
          </motion.section>
        </section>
      </main>
    </RiddaLayout>
  );
}

function Stat({ label, value, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="!bg-white border !border-gray-200 !rounded-2xl !p-5 !shadow-sm hover:!shadow-md !transition-shadow"
    >
      <div className="!flex !items-center !justify-center !h-12 !w-12 !rounded-xl !bg-gray-100 !mb-3">
        {icon}
      </div>
      <div className="!text-sm !text-gray-500 !font-medium">{label}</div>
      <div className="!mt-1 !font-bold !text-2xl !text-gray-900">{value}</div>
    </motion.div>
  );
}

function StepCard({ step, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="!flex !flex-col md:!flex-row !items-start !gap-8 !relative !group"
    >
      <div className="!flex !items-center !justify-center !flex-shrink-0 !relative">
        <div
          className={`!flex !h-16 !w-16 !items-center !justify-center !rounded-2xl !text-white ${step.color} !shadow-lg !relative !z-10`}
        >
          {step.icon}
        </div>
        <div
          className={`!absolute !inset-0 !rounded-2xl !bg-gradient-to-r ${step.gradient} !opacity-0 group-hover:!opacity-100 !blur-lg !transition-opacity !duration-300`}
        ></div>
        <div className="!absolute -!left-4 !top-0 !bottom-0 !flex !items-center md:!hidden">
          <div className="!h-8 !w-1 !bg-gray-200"></div>
        </div>
      </div>

      <div className="!flex-1 step-card !bg-white hover:!bg-gradient-to-r hover:!from-gray-800 hover:!to-black !rounded-2xl hover:!text-white !p-8 !shadow-md hover:!shadow-lg !transition-shadow">
        <div className="!inline-flex !items-center !gap-2 !bg-gray-100 !text-gray-700 !px-3 !py-1 !rounded-full !text-xs !font-medium !mb-4">
          <div className="!h-2 !w-2 !rounded-full !bg-indigo-500"></div>
          <span>Step {index}</span>
        </div>

        <h4 className="!text-xl !font-semibold text-gray-900  !mb-3">
          {step.title}
        </h4>
        <p className="text-gray-600  !leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

function Deliverable({ title, desc, icon }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="!bg-white !border !border-gray-200 !rounded-2xl !p-6 !shadow-md hover:!shadow-lg !transition-shadow !group"
    >
      <div className="!flex !items-center !justify-center !h-12 !w-12 !rounded-xl !bg-gray-100 !mb-4 group-hover:!scale-110 !transition-transform">
        {icon}
      </div>
      <div className="!text-lg !font-semibold !text-gray-900 !mb-2">
        {title}
      </div>
      <div className="!text-sm !text-gray-600">{desc}</div>
    </motion.div>
  );
}
