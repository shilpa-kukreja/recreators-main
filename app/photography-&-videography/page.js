"use client";

import { useState } from "react";
import { Faq2 } from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import { WhyChooseUs3 } from "@/components/WhyChooseUs";
import WorkingProcess from "@/components/WorkingProcess";
import { workingProcessData } from "@/components/data/workingProcess";
import RiddaLayout from "@/layout/RiddaLayout";
import Link from "next/link";

const page = () => {
    const [activeIndex, setActiveIndex] = useState(0);

  const services = [
    {
      title: "Product Photography",
      description:
        "Clean, high-detail shots that make your product look as good in a photo as it does in person. Built for websites, catalogues, and ads. Every angle and detail shot to earn the click, not just fill a page.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Corporate Shoot",
      description:
        "Professional photography for your team, office, and events. Built to build trust and put a real face to your brand. Images that make your business feel credible, not stock-photo generic.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Corporate Video Graphics",
      description:
        "Branded video content for internal communication, presentations, and corporate storytelling. Polished and on-brand, built to represent your business properly. Content that looks as professional as the message it's carrying.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Motion Graphics",
      description:
        "Animated visuals and graphics that bring static ideas to life. Built for ads, explainers, and social content that needs to move. Complex ideas simplified through motion, not just decoration.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Model Video Shoots",
      description:
        "Professional model-led video content for ads and campaigns. From casting to on-set direction, every detail is handled. Built to convert, not just look good on a reel.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Ads Design",
      description:
        "Visual ad creative designed specifically for performance. Built to stop the scroll and drive the click, not just look good. Every design tested against what actually gets results.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    
  ];

  return (
    <RiddaLayout>
      {/* Page Banner Start */}
      <PageBanner pageTitle="Photography & Videography" pageName="Photography & Videography" />
      {/* Page Banner End */}

      {/* What We Provide Area Start */}
      <section className="what-we-provide-area rel z-1">
        <div className="container px-sm-0 py-130 rpy-100">
          <div className="row justify-content-between">
            <div
              className="col-lg-6 rmb-55"
              data-aos="fade-left"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="section-title mb-50">
                <span className="subtitle mt-10 mb-15">
                  Brand Photography 
                </span>

                <h2>
                  Visuals That Stop the Scroll and Sell the Story
                </h2>
              </div>

              <img
                src="/assets/images/about/what-we-provide.jpg"
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
                  src="/assets/images/about/what-we-provide2.jpg"
                  alt="What We Provide"
                />
              </div>

              <p>
                People don't read everything- but they see everything. Every photo and video we shoot is built to grab attention fast and hold it long enough to sell your product, your brand, or your business.
              </p>

              <Link
                href="/about"
                className="theme-btn hover-primary mt-25"
                data-hover="Learn More"
              >
                <span>Start Your Shoot</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* What We Provide Area End */}

      {/* Working Process Area Start */}
      <WorkingProcess titleColor="" {...workingProcessData.photography} />
      {/* Working Process Area End */}

      {/* Services Area Start */}
      <section className="blog-grid-page !w-full rel z-1">
        <div className="container px-sm-0 py-130 rpy-100">
                                      <h2 className="text-center mb-50">What We Cover</h2>

          <div className="row">
            {/* Services Grid */}
            <div className="col-12">
              <div className="row">
                {services.map((service, index) => (
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
                        <img
                          src={service.image}
                          alt={service.title}
                        />
                      </div>

                      <div className="content">
                        <ul className="blog-meta">
                          <li>
                            <Link href={`/service/${index + 1}`}>
                              {service.title}
                            </Link>
                          </li>
                        </ul>

                        <h5>
                          <Link href={`/service/${index + 1}`}>
                            {service.title}
                          </Link>
                        </h5>

                        <p>{service.description}</p>

                        <Link
                          href={`/service/${index + 1}`}
                          className="theme-btn style-two"
                        >
                          <span>Read More</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
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
      {/* Services Area End */}

      {/* Why Choose Us Area Start */}
      {/* <WhyChooseUs3 /> */}
      {/* Why Choose Us Area End */}

      {/* FAQ Area Start */}
      {/* <Faq2 /> */}
      {/* FAQ Area End */}

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
                      "1. Do you only shoot photos, or handle video too?",
                    answer:
                      "Both- we handle photography and videography end-to-end, from product shoots to motion graphics, so all your visual content comes from one team.",
                  },
                  {
                    question: "2. Can you provide models for our shoots?",
                    answer:
                      "Yes- model video shoots are a dedicated service, including casting and on-set direction, so you get campaign-ready content without sourcing talent separately.",
                  },
                  {
                    question:
                      "3. Do you shoot on location or only in-studio?",
                    answer:
                      "Both- depending on what the shoot needs, we handle in-studio product shoots as well as on-location corporate and campaign shoots.",
                  },
                  {
                    question:
                      "4. Can you design ads using footage or photos you didn't shoot?",
                    answer:
                      "Yes- we can work with existing footage and images, though shoots planned and executed by our team typically give the best results for ad performance.",
                  },
                  {
                    question: "5. Do you offer ongoing content shoots, or is this a one-time service?",
                    answer:
                      "Both- we handle one-off shoots as well as ongoing content packages for brands that need a steady stream of photo and video content.",
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