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
      title: "Photo Editing & Retouching",
      description:
        "Clean, professional edits that make your photos look their best. Color correction, background work, and retouching done with precision. Every image polished without looking overworked or unnatural. Built to make your visuals shelf-ready, whether it's for print, web, or social.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
    {
      title: "Video Editing",
      description:
        "Full video editing services- cutting, pacing, sound, and polish. Raw footage turned into content that's genuinely ready to publish. Built for flow, not just stitched-together clips. Every edit is shaped around keeping the viewer watching till the end.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Reels & Short-Form Video Editing",
      description:
        "Fast-paced, platform-native editing built specifically for Reels and Shorts. Formats that live or die in the first three seconds. Every cut, transition, and caption timed to hold attention till the end. Built for how people actually consume short-form content.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Graphic Designing",
      description:
        "Static posts, carousels, and Amazon A+ content designed to stop the scroll. Built specifically for the platform they're going on. Every design communicates clearly before it even needs a caption. From single posts to multi-slide carousels, consistency is built in from the first frame.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "Presentation & PPT Design",
      description:
        "Professional, on-brand presentation design for pitches, reports, and decks. Built to make your slides look as strong as the content inside them. Designed to hold attention in the room, not just on screen.",
      image: "/assets/images/blog/blog-standard2.jpg",
    },
    {
      title: "Infographic Design",
      description:
        "Complex information turned into clear, visual formats. Built to explain quickly and get shared further. Data and ideas simplified without losing their substance or accuracy. Designed to make dense information feel approachable at a glance.",
      image: "/assets/images/blog/blog-standard4.jpg",
    },
    {
      title: "GIF & Animation Design",
      description:
        "Short animated content that adds motion and personality to your brand. Built to bring static visuals to life across platforms. Small details that make your content feel more alive and engaging. Designed to add movement without overwhelming the message.",
      image: "/assets/images/blog/blog-standard3.jpg",
    },
    {
      title: "Thumbnail Design",
      description:
        "High-click thumbnails built around what actually gets people to press play. Tested visual formulas, not guesswork. Designed to earn the click before the content even starts. Every element- text, color, and expression- chosen to perform, not just look nice.",
      image: "/assets/images/blog/blog-standard1.jpg",
    },
  ];

  return (
    <RiddaLayout>
      <PageBanner pageTitle="Designing & Editing" pageName="Designing & Editing" />

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
                  Creative Design 
                </span>

                <h2>
                  Visuals That Get Noticed and Get Used
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
                A great design that never gets opened is useless. We create graphics, edits, and visual content built to actually get seen- polished, on-brand, and ready for wherever it needs to go.
              </p>

              <Link
                href="/about"
                className="theme-btn hover-primary mt-25"
                
              >
                <span> Start Your Design Project</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Working Process */}
      <WorkingProcess titleColor="" {...workingProcessData.designanediting} />

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
                      "1. Do you edit our existing footage, or only footage you've shot?",
                    answer:
                      "Both– we edit footage from your own shoots or ours, so you're not limited to using only content our team has captured.",
                  },
                  {
                    question: "2. Can you design Amazon A+ content, or just social media graphics?",
                    answer:
                      "Yes– Amazon A+ Images design is part of our graphic design service, alongside social media static posts and carousels.",
                  },
                  {
                    question:
                      "3. Do you handle both long-form video editing and short-form Reels?",
                    answer:
                      "Yes- full video editing and Reels/short-form editing are both covered, edited specifically for how each format is meant to be watched.",
                  },
                  {
                    question:
                      "4. Can you design a full presentation deck, not just individual slides?",
                    answer:
                      "Yes- Presentation & PPT Design covers full decks, built to be consistent and on-brand from the first slide to the last.",
                  },
                  {
                    question: "5. Do you offer ongoing design support, or only one-off projects?",
                    answer:
                      "Both- one-off projects and ongoing design packages are available, depending on how much content your brand needs on a regular basis.",
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