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
  // 👇 Add this state for the FAQ accordion
  const [activeIndex, setActiveIndex] = useState(0);
  const services = [
    {
      title: "Flexible Packaging",
      description:
        "Lightweight, cost-efficient, and built for shelf standout- flexible packaging is where most fast-moving products live, and where design has to work hardest in the smallest space. We build layouts that stay sharp at production scale and stand out with competitors.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Rigid & Folding Packaging",
      description:
        "Structure that feels as premium as what's inside- rigid and folding formats are where packaging becomes an experience, not just a container. From the weight of the box to the way it opens, every detail is designed to signal quality before the product is even touched.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Jars, Bottles & Containers",
      description:
        "From a skincare jar to a spice bottle, this is packaging that has to perform on the shelf and in daily use- designed for grip, clarity, and repeat purchase recognition. We design which is recognizable enough that a repeat customer spots it instantly.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Labels & Stickers",
      description:
        "Sometimes packaging isn't the box- it's the label that does all the talking. Precise, compliant, and consistent with your broader packaging system, a label carries the weight of branding, We design labels that stay legible at small sizes, hold up across die-cuts and materials.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "E-Commerce & Shipping Packaging",
      description:
        "The unboxing moment is now part of the product experience. We design shipping packaging that protects, brands, and photographs well for the social share. Every layer, from the outer box to the inner filler, is designed to feel deliberate, not just functional.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Specialty & Gifting Packaging",
      description:
        "For the moment packaging needs to feel like a gift in itself- festive, luxury, and bundled formats built for a stronger unboxing impression. We build formats that layer texture, finish, and structure to create that extra pause before it's even opened.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Industry & Specific Packaging",
      description:
        "Every industry has its own shelf rules, compliance needs, and buyer psychology. We design packaging built around the category it actually competes in- what works for a B2B industrial pack won't work for a D2C beauty box.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "FMCG Packaging",
      description:
        "FMCG isn't one category, it's dozens. We've designed nearly all of them. Cosmetics & Beauty, Skincare, health & Wellness, Pharmaceutical, Ayurveda, Spices & Seasoning, Dry Fruits, Dairy, Organic, Pet Care, Home Care & Cleaning, Electronics & Appliances, Fashion & Apparel, Jewellery, Industrial, Automotive, Agriculture & Agro, E-commerce & Retail, Luxury & Lifestyle, Baby & Kids, Gifts & Specialty Products.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
  ];

  return (
    <RiddaLayout>
      <PageBanner pageTitle="Packaging" pageName="Packaging" />
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
                <span className="subtitle mt-10 mb-15">Our Core Craft</span>
                <h2>
                  Packaging That Sells Before Anyone Reads a Word
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
                Five seconds. That's how long you get on a shelf, and even less on a scroll. We design packaging engineered to win that moment- structurally sound, visually unmistakable, and built around how your product actually gets used, shipped, and remembered. This isn't a side service for us. It's where Recreators started, and it's still what we do best.
              </p>
              <Link href="about" className="theme-btn hover-primary mt-25">
                <span>Start Your Packaging Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <WorkingProcess titleColor="" {...workingProcessData.packaging} />
      <section className="blog-grid-page !w-full rel z-1">
        <div className="container   px-sm-0 py-60 rpy-100">
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
                        <h5>{blog.title}</h5>
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
                <h2>FAQ Section — Packaging</h2>
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
                      "1. Do you design the packaging structure, or just the graphics on top of it?",
                    answer:
                      "Both. We start with structural and format recommendations- the right box, pouch, or container type for your product  before moving into visual design.",
                  },
                  {
                    question: "2. Can you handle FSSAI and other regulatory compliance requirements?",
                    answer:
                      "Yes- nutritional panels, ingredient lists, batch/MRP/date formatting, and other compliance requirements are built into every packaging project from the start, not added as an afterthought.",
                  },
                  {
                    question:
                      "3. What types of packaging do you design?",
                    answer:
                      "Everything from flexible pouches and rigid boxes to jars, bottles, labels, e-commerce shipping packaging, and specialty gifting formats.",
                  },
                  {
                    question:
                      "4. How long does a packaging design project typically take?",
                    answer:
                      "It depends on scope- a single SKU redesign usually takes a week  from concept to print-ready files, while multi-SKU ranges take longer depending on how many variants need to be systemized.",
                  },
                  {
                    question: "5. Do you provide print-ready files, or also support production and printing?",
                    answer:
                      "We deliver print-ready files with die-lines, bleed, and color specs handled, and we also offer production support, liaising with your printer or manufacturer.",
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
