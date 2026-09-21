"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  FiArrowRight,
} from "react-icons/fi";

// ✅ import optimized images



const services = [
  {
    title: "Digital Marketing",
    description:
      "SEO, paid ads, and social strategy that puts you in front of the right people- not just more people.",
    icon: <img src="/assets/images/products/Branding&Identity.png" alt="Branding & Identity" />
,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Packaging Design",
    description: "Five seconds. That's all you get on a shelf or a scroll. We make sure you win them, every time.",
    icon:  <img src="/assets/images/products/PackagingDesign.png" alt="Packaging Design" />,
    color: "from-purple-500 to-indigo-500",
  },
  {
    title: "Branding & Identity",
    description: "Logos, colour, voice, energy- a brand system people recognise before they even read the name.",
    icon:  <img src="/assets/images/products/Website&E-CommerceDevelopment.png" alt="Website & E-Commerce Development" />,
    color: "from-rose-500 to-pink-500",
  },
  {
    title: "Website & E-Commerce Development ",
    description: "Websites and stores built fast, built responsive, built to actually convert.",
    icon: <img src="/assets/images/products/Print&CommunicationDesign.png" alt="Print & Communication Design" />,
    color: "from-amber-500 to-orange-500",
  },
  {
    title: "Social Media Marketing",
    description:
      "Strategic campaigns and engaging content that amplify your reach and spark real conversations with your audience.",
    icon: <img src="/assets/images/products/SocialMediaMarketing.png" alt="Social Media Marketing" />,
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Ad & Campaign Management",
    description:
      "Smart, ROI-focused ad strategies across platforms to maximize visibility, engagement, and lead generation.",
    icon: <img src="/assets/images/products/Ad&CampaignManagement.png" alt="Ad & Campaign Management" />,
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "Content Creation & Storytelling",
    description: "From visuals to campaigns, we craft meaningful content that captures attention and strengthens brand loyalty.",
    icon: <img src="/assets/images/products/ContentCreation&Storytelling.png" alt="Content Creation & Storytelling" />,
    color: "from-sky-500 to-blue-500",
  },
  {
    title: "Influencer & Community Marketing",
    description:
      "Connecting your brand with authentic voices and communities that inspire trust and drive growth.",
    icon: <img src="/assets/images/products/Influencer&CommunityMarketing.png" alt="Influencer&CommunityMarketing" />,
    color: "from-fuchsia-500 to-purple-500",
  },
];

export default function ServicesSection() {
  return (
    <section className="!py-10 !bg-gradient-to-b from-gray-50 to-white">
      <div className="!max-w-7xl !mx-auto !px-6 lg:!px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="!text-center !mb-16"
        >
          <span className="!text-sm !font-semibold !tracking-wider !text-yellow-500 !uppercase">
            What We Offer
          </span>
          <h2 className="!mt-2 !text-4xl !font-bold !text-gray-900 sm:!text-5xl">
            Built to Be Remembered
          </h2>
          <p className="!mt-4 !text-xl !text-gray-600 !max-w-3xl !mx-auto">
             Real digital marketing services, real design, real results- for brands building locally and going global.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="!grid !gap-8 sm:!grid-cols-2 lg:!grid-cols-4">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -8 }}
              className="!group !relative !bg-white !rounded-xl !shadow-lg !p-6 !text-center !overflow-hidden !transition-all !duration-300 hover:!shadow-xl"
            >
              {/* Gradient accent */}
              <div className={`!absolute !top-0 !left-0 !w-full !h-1 !bg-gradient-to-r ${service.color}`}></div>
              
              {/* Icon container with gradient background */}
              <div className={`!relative !flex !justify-center !items-center !w-16 !h-16 !mx-auto !mb-6 !rounded-xl !bg-gradient-to-br ${service.color} !text-white group-hover:!scale-110 !transition-transform !duration-300`}>
                {service.icon}
              </div>
              
              <h3 className="!text-xl !font-semibold !text-gray-900 !mb-3">
                {service.title}
              </h3>
              <p className="!text-gray-600  !leading-relaxed">
                {service.description}
              </p>
              
              {/* <a
                href="#"
                className="!inline-flex !items-center !text-sm !font-medium !text-yellow-500 hover:!text-yellow-600 !transition-colors !duration-300 group-hover:!translate-x-1"
              >
                Learn more
                <FiArrowRight className="!ml-1 group-hover:!translate-x-1 !transition-transform !duration-300" />
              </a> */}
              
              {/* Subtle background pattern on hover */}
              <div className="!absolute !inset-0 -!z-10 !opacity-0 group-hover:!opacity-5 !transition-opacity !duration-300 !bg-gradient-to-br from-indigo-500 to-purple-500"></div>
            </motion.div>
          ))}
        </div>
        
        {/* CTA Section */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="!mt-16 !text-center"
        >
          <a
            href="#"
            className="!inline-flex !items-center !px-6 !py-3 !text-base !font-medium !text-white !bg-yellow-500 !rounded-lg !shadow-md hover:!bg-yellow-600 !transition-colors !duration-300 hover:!shadow-lg"
          >
            Explore all services
            <FiArrowRight className="!ml-2" />
          </a>
        </motion.div> */}
      </div>
    </section>
  );
}