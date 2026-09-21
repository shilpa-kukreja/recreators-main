"use client";

import { useState } from "react";
import { Faq2 } from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import { WhyChooseUs3 } from "@/components/WhyChooseUs";
import WorkingProcess from "@/components/WorkingProcess";
import RiddaLayout from "@/layout/RiddaLayout";
import Link from "next/link";

const page = () => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const services = [
    {
      title: "Branding & Identity",
      description:
        "Crafting memorable logos, visuals, and brand stories that give your business a unique voice and lasting recognition.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Packaging Design",
      description:
        "Innovative, custom packaging that not only protects but also persuades, turning every product into a brand experience.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Website & E-Commerce Development",
      description:
        "From sleek websites to high-performance online stores, we build digital platforms that are fast, responsive, and conversion-driven.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Print & Communication Design",
      description:
        "Brochures, catalogs, and print campaigns that leave a tangible, lasting impression on your audience.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Social Media Marketing",
      description:
        "Strategic campaigns and engaging content that amplify your reach and spark real conversations with your audience.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Ad & Campaign Management",
      description:
        "Smart, ROI-focused ad strategies across platforms to maximize visibility, engagement, and lead generation.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Content Creation & Storytelling",
      description:
        "From visuals to campaigns, we craft meaningful content that captures attention and strengthens brand loyalty.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Influencer & Community Marketing",
      description:
        "Connecting your brand with authentic voices and communities that inspire trust and drive growth.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
  ];

  return (
    <RiddaLayout>
      <PageBanner pageTitle="Content Writing" pageName="Content Writing" />

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
                  What We Provide
                </span>

                <h2>
                  The Complete Suite of Services We Provide for Your Online
                  Success
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
                Understanding your marketing performance can be like looking
                for a needle in a haystack. We combine strategy, creativity,
                technology, and data-driven insights to build powerful digital
                experiences that support your business goals.
              </p>

              <Link
                href="/about"
                className="theme-btn hover-primary mt-25"
                data-hover="Learn More"
              >
                <span>Learn More</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
      <WorkingProcess titleColor="" />

      {/* Services Grid */}
      <section className="blog-grid-page !w-full rel z-1">
        <div className="container px-sm-0 py-130 rpy-100">
                        <h2 className="text-center mb-50">Our Services</h2>

          <div className="row">
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
                <h2>Frequently Asked Questions</h2>
              </div>
              <p>
                We incorporate SEO best practices into website build this
                includes optimizing site structure page load speed, mobile
                responsiveness.
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
                      "1. What makes Recreators different from other design and marketing agencies?",
                    answer:
                      "We do not just create, we collaborate. Our process blends design thinking, storytelling, and marketing strategy to craft visuals and campaigns that truly connect and convert.",
                  },
                  {
                    question: "2. How long does it take to complete a project?",
                    answer:
                      "Timelines depend on the project scope, but we are known for efficiency without compromising creativity. Whether it is a logo, website, or campaign, we ensure every detail is pixel-perfect before delivery.",
                  },
                  {
                    question:
                      "3. Do you work with startups or only established brands?",
                    answer:
                      "Both. From budding entrepreneurs to global enterprises, we partner with every kind of brand ready to grow, glow, and go digital the right way.",
                  },
                  {
                    question:
                      "4. Can you handle everything from branding to digital marketing?",
                    answer:
                      "Yes. From creating your brand identity to launching and managing your online presence, our full-service approach covers design, development, and digital strategy, all under one roof.",
                  },
                  {
                    question: "5. Do you provide customized design solutions?",
                    answer:
                      "Always. Every design, campaign, or website we create is tailored to reflect your unique story, voice, and goals. Never template-based, always original.",
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