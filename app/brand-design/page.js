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
      title: "Brand Naming",
      description:
        "Strategic naming that's memorable, available, and aligned with what your business actually stands for. Not just a word that sounds good, but one that holds up in trademark checks and everyday use. A name your business can grow into, not grow out of.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Brand Logo",
      description:
        "Distinctive, versatile logo design built to work across every size and surface. From a favicon to a storefront sign, without losing clarity or impact. Designed to be recognizable at a glance, not just admired up close.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Brand Identity",
      description:
        "The full visual system- color palette, typography, imagery style, and design language. Built to make your brand instantly recognizable across every touchpoint. Consistent enough to feel like one brand, wherever it shows up.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Brand Storytelling",
      description:
        "The narrative behind your brand- who you are, why you exist, and why customers should care. Shaped into a story that sticks, not just a mission statement nobody reads. Built to give your brand a voice people actually remember.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Brand Personality",
      description:
        "Defining how your brand talks, feels, and behaves. So every piece of communication sounds like it's coming from the same place. Consistency that makes your brand feel familiar, not fragmented.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Brand Guidelines",
      description:
        "A clear, practical rulebook covering logo usage, colors, typography, and tone. Built so your brand stays consistent no matter who's applying it. Guidelines your team will actually follow, not just file away.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Catalogue",
      description:
        "Product and service catalogues designed to inform and sell. Clean layouts that make browsing and decision-making easy. Built to guide a customer from curiosity to conversion.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Company Profile Design",
      description:
        "Professional company profiles built to build trust and credibility. Designed for pitches, partnerships, and client-facing conversations. A document that makes the right first impression before you even speak.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
  ];

  
  return (
    <RiddaLayout>
      <PageBanner pageTitle="Brand Design" pageName="Brand Design" />
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
                <span className="subtitle mt-10 mb-15">Memorable Branding</span>
                <h2>
                  A Brand People Remember, Not Just Recognize
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
                Your brand is more than a logo- it's the name people say, the story they remember, and the reason they choose you over someone cheaper. We build brand identities that hold up across every touchpoint, from a business card to a billboard.
              </p>
              <Link
                href="about"
                className="theme-btn hover-primary mt-25"
              
              >
                <span>Start Your Brand Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <WorkingProcess titleColor="" {...workingProcessData.branddesign}  />
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
                      "1. Do you only design logos, or the full brand identity?",
                    answer:
                      "Full identity- logo design is one part of a larger system that includes color, typography, tone, and guidelines, so your brand is consistent everywhere, not just on your logo.",
                  },
                  {
                    question: "2. Can you help name our brand, not just design around an existing name?",
                    answer:
                      "Yes- brand naming is a dedicated service, including strategy, availability checks, and testing against what your business actually stands for.",
                  },
                  {
                    question:
                      "3. We already have a logo- can you just build guidelines and other assets around it?",
                    answer:
                      "Yes- we can work with an existing logo and build out the full identity system, guidelines, catalogues, and profile design around it.",
                  },
                  {
                    question:
                      "4. How long does a full brand identity project take?",
                    answer:
                      "It depends on scope- naming and full identity systems take longer than a logo refresh. We set clear timelines upfront based on what's included.",
                  },
                  {
                    question: "5. Do you provide ongoing brand support after the initial identity is delivered?",
                    answer:
                      "Yes- ongoing support is available for new collateral, guideline updates, and applying the brand system to new materials as your business grows.",
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
