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
      title: "Ecommerce Website Designing",
      description:
        "Online stores designed to sell. Clean product pages, smooth checkout flows, and mobile-first design at every step. Built to guide browsers toward checkout, not just showcase products.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Multi-Vendor Ecommerce",
      description:
        "Marketplace-style platforms supporting multiple sellers. Vendor dashboards and scalable catalog management for businesses growing beyond a single-brand store. Built to handle complexity without becoming unmanageable.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "eCommerce SEO",
      description:
        "Product page and category optimization built to get your store found before your competitors. From product titles to structured data, every detail accounted for. Built to bring in traffic that's actually ready to buy.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "eCommerce Ads",
      description:
        "Ad strategies built specifically for online stores. Product-focused campaigns designed to drive purchases, not just clicks. Every campaign tied back to actual store revenue.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Quick Commerce (Amazon, Blinkit, Meesho & Flipkart Listing)",
      description:
        "Listing setup and optimization across quick commerce and marketplace platforms. Built to get your products discovered and bought fast. Every listing structured for how these platforms actually rank and convert.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Amazon Ads",
      description:
        "Sponsored product and brand campaigns for the Amazon marketplace. Built to improve visibility and sales within the platform's own ecosystem. Optimized around what actually drives Amazon's ranking algorithm.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Flipkart Ads",
      description:
        "Marketplace advertising tailored to Flipkart's platform. Built to boost product ranking and conversions where your buyers already are. Strategy shaped around Flipkart's specific shopper behavior.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Email Marketing",
      description:
        "Campaigns and automations that nurture leads and bring customers back. Built around segmentation, not mass blasts. Every email designed to earn the next open, not just get sent.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
  ];

  return (
    <RiddaLayout>
      <PageBanner pageTitle="E-Commerce" pageName="E-Commerce" />

      {/* What We Provide Section */}
      <section className="what-we-provide-area rel z-1">
        <div className="container px-sm-0 py-130 rpy-100">
          <div className="row justify-content-between">
            {/* Left Section */}
            <div
              className="col-lg-6 rmb-55"
              data-aos="fade-left"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="section-title mb-50">
                <span className="subtitle mt-10 mb-15">
                 Ecommerce Development 
                </span>

                <h2>
                  Online Stores Built to Sell, Not Just Exist on a Marketplace
                </h2>
              </div>

              <img
                src="/assets/images/about/what-we-provide.jpg"
                alt="What We Provide"
              />
            </div>

            {/* Right Section */}
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
                Listing a product online isn't the same as selling it. We build and manage ecommerce presences- from the website itself to every marketplace it lives on- designed around one goal: turning browsers into buyers.
              </p>

              <Link
                href="/about"
                className="theme-btn hover-primary mt-25"
                data-hover="Learn More"
              >
                <span>Start Your Ecommerce Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
       <WorkingProcess titleColor="" {...workingProcessData.ecommerce} />

      {/* Services Section */}
      <section className="blog-grid-page w-full rel z-1">
        <div className="container px-sm-0 py-130 rpy-100">
                                      <h2 className="text-center mb-50">What We Cover</h2>

          <div className="row">
            {/* Services */}
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
                            <a href="#">{service.title}</a>
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

      {/* Why Choose Us */}
      {/* <WhyChooseUs3 /> */}

      {/* FAQ */}
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
                      "1. Do you build the website and manage marketplace listings, or just one?",
                    answer:
                      "Both- we handle your own ecommerce website alongside marketplace listings on Amazon, Flipkart, Meesho, and Blinkit, so everything stays coordinated.",
                  },
                  {
                    question: "2. How long does it take to complete a project?",
                    answer:
                      "Timelines depend on the project scope, but we are known for efficiency without compromising creativity. Whether it is a logo, website, or campaign, we ensure every detail is pixel-perfect before delivery.",
                  },
                  {
                    question:
                      "3. Do you run ads for marketplaces as well as our own website?",
                    answer:
                      "Yes- Amazon Ads and Flipkart Ads are dedicated services alongside eCommerce Ads for your own store, so paid visibility is covered across channels.",
                  },
                  {
                    question:
                      "4. Can you help with a multi-vendor marketplace, not just a single-brand store?",
                    answer:
                      "Yes- multi-vendor ecommerce is a dedicated service, including vendor dashboards, commission handling, and scalable catalog management.",
                  },
                  {
                    question: "5. Do you offer ongoing management, or is this a one-time setup?",
                    answer:
                      "Ongoing management is available- pricing, listings, and ad performance need continuous attention, not a one-time setup and walk away.",
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

