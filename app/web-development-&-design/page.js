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
      title: "UI/UX Design",
      description:
        "Before a single line of code is written, we map out how people will actually navigate your site- intuitive layouts, clear user journeys, and interfaces designed to reduce friction. Every screen is planned around real user behavior, not assumptions.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Web Design & Development",
      description:
        "End-to-end website creation from visual design to full development built to reflect your brand identity. We handle everything from the first wireframe to the final line of code, so nothing gets lost in translation between design and build.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Static Website Designing",
      description:
        "Simple, fast-loading websites for businesses that need a strong digital presence without the complexity of dynamic content- ideal for portfolios and informational sites. Perfect for businesses that need to look credible online without managing a complex backend.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Dynamic Website Designing",
      description:
        "Websites with content that updates, personalizes, and scales- built with databases and backend logic for businesses that need more than a static page. As your content grows or your offerings change, the site adapts without needing a rebuild. ",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Ecommerce Website Designing",
      description:
        "Online stores designed to sell- clean product pages, smooth checkout flows, and mobile-first design. Every step from browsing to checkout is built to reduce friction and keep customers moving toward purchase.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Corporate Website Designing",
      description:
        "Professional, credibility-building websites for established businesses built to reflect scale and trust. These sites are designed to reassure- clients, partners, and investors should feel your business's legitimacy the moment the page loads.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Multi-Vendor Ecommerce",
      description:
        "Marketplace-style platforms supporting multiple sellers, vendor dashboards and scalable catalog management- built for businesses growing beyond a single-brand store. Designed for platforms that need to grow sellers, not just products.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Website Re-Designing",
      description:
        "If your current website is holding your brand back- we rebuild outdated, slow, or poorly converting sites into something that actually matches where your business is today. Whether it's a full rebuild or targeted fixes to underperforming pages.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
     {
      title: "React.js / Next.js Development",
      description:
        "Modern, high-performance web applications built on React.js and Next.js for businesses that need speed and scalability. These frameworks let us build fast, responsive experiences that hold up as your traffic and features grow.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Custom Web Development",
      description:
        "When off-the-shelf platforms can't do what your business needs, we build fully custom web solutions. No forcing your business into a template that wasn't built for it- we build around your actual workflow and requirements. If it doesn't exist yet, we build it from scratch.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
     {
      title: "Web Portal Development",
      description:
        "Secure, functional portals for internal teams, clients, or partners- dashboards, login-gated content, and data management systems. Built to organize information and restrict access exactly the way your business needs it to.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "CRM Development",
      description:
        "Custom CRM systems designed around how your team actually sells and manages relationships- built to organize leads, track pipelines, and keep every interaction in one place. We build the system around your actual workflow.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
  ];

  return (
    <RiddaLayout>
      <PageBanner pageTitle="Web Development & Design" pageName="Web Development & Design" />

      {/* What We Provide Section */}
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
                  Build & Design
                </span>

                <h2>
                  Websites Built to Convert, Not Just Exist
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
                 A website is often the first real interaction someone has with your brand and the last thing standing between "interested" and "bought." We build websites that load fast, look sharp, and are engineered around one goal: turning visitors into customers.
              </p>

              <Link
                href="/about"
                className="theme-btn hover-primary mt-25"
                data-hover="Learn More"
              >
                <span>Start Your Web Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
      <WorkingProcess titleColor="" {...workingProcessData.webdevelopment} />

      {/* Services Grid */}
      <section className="blog-grid-page !w-full rel z-1">
        <div className="container px-sm-0 py-130 rpy-100">
          <div className="row">
            <div className="col-12">
                            <h2 className="text-center mb-50">What We Cover</h2>

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

                        {/* Read More Button */}
                        {/*
                        <Link
                          href={`/service/${index + 1}`}
                          className="theme-btn style-two"
                        >
                          <span>Read More</span>
                        </Link>
                        */}
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
                    1
                    <span className="sr-only">(current)</span>
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
                <h2></h2>
              </div>
              <p>
               
              </p>
              <Link href="contact" className="theme-btn style-two mt-15">
                <span>Get A Quote</span>
              </Link>
            </div>

            <div className="col-lg-8">
              <div className="accordion-one">
                {[
                  {
                    question:
                      "1. Do you only design websites, or also handle development?",
                    answer:
                      "Both- we handle everything from UI/UX design through full front-end and back-end development, so your site isn't just good-looking, it actually functions the way it's supposed to.",
                  },
                  {
                    question: "2. Can you redesign our existing website instead of building from scratch?",
                    answer:
                      "Yes, website re-designing is one of our core services, whether that means a full rebuild or improving specific pages and flows that aren't converting.",
                  },
                  {
                    question:
                      "3. What platform do you build websites on?",
                    answer:
                      "It depends on what your business actually needs from custom development (including React.js/Next.js) for performance and to simpler builds for straightforward content-driven sites.",
                  },
                  {
                    question:
                      "4. Can you build a multi-vendor marketplace, not just a single-brand store?",
                    answer:
                      "Yes- multi-vendor ecommerce is a dedicated service, including vendor dashboards, commission handling, and scalable catalog management.",
                  },
                  {
                    question: "5. Do you offer ongoing support after the website is launched?",
                    answer:
                      "Yes- we don't disappear after launch. Ongoing maintenance, updates, and optimization are available to keep your site performing as your business grows.",
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