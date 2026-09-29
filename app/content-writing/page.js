"use client";

import { useState } from "react";
import { Faq2 } from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import { WhyChooseUs3 } from "@/components/WhyChooseUs";
import WorkingProcess from "@/components/WorkingProcess";
import RiddaLayout from "@/layout/RiddaLayout";
import { workingProcessData } from "@/components/data/workingProcess";
import Link from "next/link";

const page = () => {
  
  const [activeIndex, setActiveIndex] = useState(0);
  const services = [
    {
      title: "Competitor Research",
      description:
        "In-depth analysis of what your competitors are saying and ranking for. So your content fills the gaps instead of repeating what's already out there. Built to give you an edge, not just a benchmark.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "SEO Content Writing",
      description:
        "Keyword-informed content built to rank. Without sacrificing readability or sounding like it was written for a search engine. Content that satisfies algorithms and actual readers at the same time.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Website Copywriting",
      description:
        "Clear, persuasive copy for every page of your website. Built to guide visitors toward the action you actually want them to take. Every line written with a purpose, not just to fill space.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Blog & Article Writing",
      description:
        "Long-form content that builds authority and drives organic traffic. Written to give your audience a reason to keep coming back. Content built for the long game, not a one-time read.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Product Descriptions",
      description:
        "Descriptions that sell the benefit, not just list the features. Built to convert browsers into buyers on your website or marketplace listings. Written to answer the question a buyer is actually asking.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Social Media Content Writing",
      description:
        "Captions and copy built for how people actually scroll. Short, sharp, and written to stop the thumb. Every word earns its place in three seconds or less.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Ad Copywriting",
      description:
        "Copy built specifically for paid campaigns. Headlines and body text designed to grab attention and drive clicks. Written to perform, not just to sound clever.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Brand Messaging & Taglines",
      description:
        "Connecting your brand with authentic voices and communities that inspire trust and drive growth.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
     {
      title: "Email & Newsletter Content",
      description:
        "Email copy built to be opened, read, and acted on. Not deleted before the second line. Written to earn the next open, not just fill an inbox.",
      image: "/assets/images/blog/blog-standard4.jpg",
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
                  Copywriting Services 
                </span>

                <h2>
                  Words That Get Read and Get You Ranked
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
                Good content does two jobs at once- it convinces search engines you're relevant, and it convinces real people you're worth listening to. We write content built to do both, across every touchpoint your brand has.
              </p>

              <Link
                href="/about"
                className="theme-btn hover-primary mt-25"
                data-hover="Learn More"
              >
                <span>Start Your Content Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
       <WorkingProcess titleColor="" {...workingProcessData.contentwriting} />

      {/* Services Grid */}
      <section className="blog-grid-page !w-full rel z-1">
        <div className="container px-sm-0 py-130 rpy-100">
                        <h2 className="text-center mb-50">What We Cover</h2>

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
                      "1. Do you research competitors before writing, or just start writing?",
                    answer:
                      "We research first- competitor content, keyword gaps, and audience intent all inform the writing before a single word is drafted.",
                  },
                  {
                    question: "2. Can you write in our brand's existing tone of voice?",
                    answer:
                      "Yes- we study your existing content and messaging to match your tone, or help define a brand voice if you don't have one yet.",
                  },
                  {
                    question:
                      "3. Do you write product descriptions for marketplaces like Amazon and Flipkart too?",
                    answer:
                      "Yes- product descriptions are written to work across your website and marketplace listings, optimized for each platform's requirements.",
                  },
                  {
                    question:
                      "4. Can you handle both blog content and ad copy, or do you specialize in one?",
                    answer:
                      "Both- long-form content, ad copy, and everything in between are handled by the same team, so messaging stays consistent across formats.",
                  },
                  {
                    question: "5. Do you offer ongoing content writing, or one-off projects?",
                    answer:
                      "Both- one-off projects and ongoing content calendars are available, depending on how much content your brand needs on a regular basis.",
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