"use client";

import { useState } from "react";
import { Faq2 } from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import Services, { Services2 } from "@/components/Services";
import { WhyChooseUs3 } from "@/components/WhyChooseUs";
import { workingProcessData } from "@/components/data/workingProcess";
import WorkingProcess from "@/components/WorkingProcess";
import RiddaLayout from "@/layout/RiddaLayout";
import Link from "next/link";
const page = () => {
    const [activeIndex, setActiveIndex] = useState(0);
  
const services = [
    {
      title: "On-Page SEO",
      description:
        "We optimize what's directly on your website- titles, meta descriptions, headings, image alt text, internal linking, and content structure so every page is built to rank and convert.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Off-Page SEO",
      description:
        "Authority is earned outside your website too. We build high-quality backlinks, manage brand mentions, and run outreach campaigns that strengthen your domain's credibility in the eyes of search engines.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Technical SEO",
      description:
        "We fix site speed, mobile responsiveness, indexing issues, broken links, and structured data- so your site's technical foundation supports everything else you do.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Local SEO",
      description:
        "For businesses that serve a city, region, or neighborhood, we optimize your Google Business Profile, local citations, and location-based keywords to help you show up when nearby customers search.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Keyword Research",
      description:
        "We identify high-intent, high-opportunity keywords across your industry- balancing search volume, competition, and relevance to your actual business goals.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Content SEO",
      description:
        "We plan, structure, and optimize blog posts, landing pages, and product content that ranks well and reads naturally- no keyword stuffing, no fluff.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "E-commerce SEO",
      description:
        "Online stores have unique SEO challenges- product pages, category structures, duplicate content, and site search. We optimize your store from the product level up.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "SEO Analytics & Reporting",
      description:
        "We track rankings, organic traffic, conversions, and key metrics, and translate the data into clear, actionable reports- so you always know what's working and what's next.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
  ];

  
  return (
    <RiddaLayout>
      <PageBanner pageTitle="SEO" pageName="SEO" />
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
                <span className="subtitle mt-10 mb-15">Rank Smarter</span>
                <h2>
                 Rankings That Bring In Customers, Not Just Traffic
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
                Ranking on Google isn't luck- it's structure, strategy, and consistency. We build SEO programs that cover every layer of your online presence, from the code behind your site to the content your customers actually read, so the people searching for what you offer actually find you.
              </p>
              <Link
                href="about"
                className="theme-btn hover-primary mt-25"
                
              >
                <span>Start Your SEO Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <WorkingProcess titleColor="" {...workingProcessData.seo}  />
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
                      "1. Do you only do keyword research and content, or also fix technical issues?",
                    answer:
                      "Both- we handle everything from technical SEO and site structure through content and off-page strategy, so your site isn't just optimized on paper, it actually performs.",
                  },
                  {
                    question: "2. Can you improve our existing SEO instead of starting from scratch?",
                    answer:
                      "Yes- we regularly audit and rebuild underperforming SEO strategies, whether that means fixing technical issues, restructuring content, or rebuilding your backlink profile.",
                  },
                  {
                    question:
                      "3. How long does it take to see results from SEO?",
                    answer:
                      "It depends on your industry, competition, and current site health- but we set realistic timelines upfront and report on progress consistently, not just at the end.",
                  },
                  {
                    question:
                      "4. Do you handle local SEO for businesses with physical locations?",
                    answer:
                      "Yes- local SEO is a dedicated service, including Google Business Profile optimization, local citations, and location-based keyword targeting.",
                  },
                  {
                    question: "5. Do you offer ongoing SEO support, or is this a one-time project?",
                    answer:
                      "SEO isn't a one-time fix- algorithms and competitors change. Ongoing optimization, reporting, and strategy updates are available to keep your rankings growing.",
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
