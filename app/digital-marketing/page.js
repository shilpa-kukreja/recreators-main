"use client";

import { useState } from "react";
import { Faq2 } from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import Services, { Services2 } from "@/components/Services";
import { WhyChooseUs3 } from "@/components/WhyChooseUs";
import WorkingProcess from "@/components/WorkingProcess";
import { workingProcessData } from "@/components/data/workingProcess";
import RiddaLayout from "@/layout/RiddaLayout";
import Link from "next/link";
const page = () => {

    const [activeIndex, setActiveIndex] = useState(0);

const services = [
    {
      title: "Performance Marketing",
      description:
        "Data-driven campaigns focused on measurable outcomes. Leads, sales, and ROI, not just reach and impressions. Every rupee spent is tracked back to a result.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Influencer Marketing",
      description:
        "Partnerships with creators who actually move your audience. From micro-influencers to established names, matched to your brand and budget. Built for authentic reach, not just follower counts.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Pay-Per-Click (PPC)",
      description:
        "Paid search and display campaigns built to capture high-intent traffic. Designed to turn clicks into customers, not just visitors. Every campaign optimized to lower cost per acquisition over time.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Social Media Marketing (SMM)",
      description:
        "Organic and paid social strategy across platforms. Content, community management, and campaigns that build an audience that sticks around. Built for engagement that actually translates to brand recall.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Content Marketing",
      description:
        "Blogs, videos, and campaigns built to educate and engage. Designed to move your audience closer to a purchase decision. Content that earns attention, not just fills a calendar.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Meta Ads",
      description:
        "Facebook and Instagram ad campaigns built around your funnel. From awareness to retargeting to conversion, every stage is covered. Creative and targeting built to perform, not just look good.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Google Ads",
      description:
        "Search, display, and YouTube campaigns built for intent. Designed to put your business in front of people actively looking for what you offer. Every campaign is structured around conversion, not just clicks.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Ads Shoot",
      description:
        "Product and brand shoots created specifically for ad performance. Built to stop the scroll, not just look nice in isolation. Every frame is designed with the platform and funnel in mind.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
     {
      title: "Google Ads",
      description:
        "Search, display, and YouTube campaigns built for intent. Designed to put your business in front of people actively looking for what you offer. Every campaign is structured around conversion, not just clicks.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "eCommerce Ads",
      description:
        "Ad strategies built specifically for online stores. Product-focused campaigns designed to drive purchases, not just clicks. Built around your catalog, not a generic ad template.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Amazon Ads",
      description:
        "Sponsored product and brand campaigns for the Amazon marketplace. Built to improve visibility and sales within the platform's own ecosystem. Optimized around Amazon's ranking and conversion signals.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Flipkart Ads",
      description:
        "Marketplace advertising tailored to Flipkart's platform. Built to boost product ranking and conversions where your buyers already are. Strategy shaped around how Flipkart shoppers actually search and buy.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
     {
      title: "Email Marketing",
      description:
        "Campaigns and automations that nurture leads and bring customers back. Built around segmentation, not mass blasts. Every email designed to earn the next open, not just get sent.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Multi Level Marketing",
      description:
        "Marketing strategy and campaign support tailored to MLM structures. Built around network growth and downline engagement. Designed to support distributors, not just the brand at the top.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
  ];

  
  return (
    <RiddaLayout>
      <PageBanner pageTitle="Digital Marketing" pageName="Digital Marketing" />
      <section className="what-we-provide-area rel z-1">
        <div className="container px-sm-0   py-130 rpy-100">
          <div className="row justify-content-between">
            <div
              className="col-lg-6 rmb-55"
              data-aos="fade-left"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="section-title mb-50">
                <span className="subtitle mt-10 mb-15">Sales, Not Views</span>
                <h2>
                  Marketing That's Built to Sell, Not Just Show Up
                </h2>
              </div>
              <img
                src="assets/images/about/what-we-provide.jpg"
                alt="What We Provide"
              />
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="image mb-40">
                <img
                  src="assets/images/about/what-we-provide2.jpg"
                  alt="What We Provide"
                />
              </div>
              <p>
                Getting seen is easy. Getting seen by the right people, at the right moment, in a way that actually drives sales- that's the hard part. We run digital marketing campaigns built around performance, not vanity metrics, so every rupee spent has a job to do.
              </p>
              <Link
                href="about"
                className="theme-btn hover-primary mt-25"
                
              >
                <span>Start Your Marketing Campaign</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
       <WorkingProcess titleColor="" {...workingProcessData.digitalmarketing} />
       <section className="blog-grid-page !w-full rel z-1">
      <div className="container   px-sm-0 py-130 rpy-100">
                                    <h2 className="text-center mb-50">What We Cover</h2>

        <div className="row">
          {/* ===== Left Section (Blogs) ===== */}
          <div className="">
            <div className="row">
              {services.map((blog, index) => (
                <div
                  className="col-md-6"
                  key={index}
                  data-aos="fade-up"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                  data-aos-delay={index * 50}
                >
                  <div className="blog-item style-three">
                    <div className="image">
                      <img src={blog.image} alt={blog.title} />
                    </div>
                    <div className="content">
                      <ul className="blog-meta">
                       
                      </ul>
                      <h5>
                        
                          {blog.title}
                        
                      </h5>
                      <p>{blog.description}</p>
                      {/* <Link
                        href={`/service/${index + 1}`}
                        className="theme-btn style-two"
                      >
                        <span>Read More</span>
                      </Link> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ===== Pagination (Static) ===== */}
            {/* <ul
              className="pagination pt-5 flex-wrap"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <li className="page-item active">
                <span className="page-link">
                  1<span className="sr-only">(current)</span>
                </span>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next <i className="far fa-chevron-right" />
                </a>
              </li>
            </ul> */}
          </div>

         
        </div>
      </div>
    </section>
      {/* <Services2 extraClass="bgc-black text-white" /> */}
      {/* <WhyChooseUs3 /> */}
      {/* <Faq2 /> */}


      {/* ===== Inline FAQ Section with working accordion ===== */}
      <section className="faqs-area rel z-1">
        <div className="container px-sm-0 pb-120 rpb-90">
          <div className="row justify-content-between">
            <div
              className="col-lg-4 rmb-55"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="section-title mb-35">
                <span className="subtitle mt-10 mb-15">FAQs</span>
                
              </div>
             
              <Link href="contact" className="theme-btn style-two mt-15">
                <span>Get A Quote</span>
              </Link>
            </div>

            <div className="col-lg-8">
              <div className="accordion-one">
                {[
                  {
                    question:
                      "1. Do you only run ads, or also handle content and strategy?",
                    answer:
                      "Both- we handle strategy, creative, ad shoots, and campaign management end-to-end, so your marketing isn't just running ads with no direction behind them.",
                  },
                  {
                    question: "2. Which platforms do you recommend for our business?",
                    answer:
                      "It depends on where your actual customers spend time and how they buy- we recommend platforms based on your audience and goals, not a one-size-fits-all package.",
                  },
                  {
                    question:
                      "3. Do you provide models for our video and ad shoots, or do we need to arrange that ourselves?",
                    answer:
                      "We can arrange models as part of the shoot- from casting to on-set direction- so you get content ready for ads without having to source talent separately. ",
                  },
                  {
                    question:
                      "4. How do you measure whether a campaign is working?",
                    answer:
                      "Every campaign is tracked against clear KPIs- leads, sales, ROAS, or whatever metric actually matters to your business, with regular reporting to show what's working.",
                  },
                  {
                    question: "5. Do you offer ongoing campaign management, or is this a one-time project?",
                    answer:
                      "Digital marketing isn't a one-time push- platforms and audiences shift. Ongoing management, testing, and optimization are available to keep performance improving.",
                  },
                ].map((faq, index) => (
                  <div
                    key={index}
                    className="accordion-item"
                    data-aos="fade-up"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <h6 className="accordion-header">
                      <button
                        type="button"
                        className={`accordion-button ${
                          activeIndex === index ? "" : "collapsed"
                        }`}
                        onClick={() =>
                          setActiveIndex(activeIndex === index ? -1 : index)
                        }
                        aria-expanded={activeIndex === index}
                      >
                        {faq.question}
                      </button>
                    </h6>
                    <div
                      className={`accordion-collapse collapse ${
                        activeIndex === index ? "show" : ""
                      }`}
                    >
                      <div className="accordion-body visible">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </RiddaLayout>
  );
};
export default page;
