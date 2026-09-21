import AgencyVideoSection from "@/components/AgencyVideoSection";
import Blog from "@/components/Blog";
import CounterItems from "@/components/CounterItems";
import CTA from "@/components/CTA";
import ServicesSection from "@/components/service";
import Services from "@/components/Services";
import ClientSlider from "@/components/sliders/ClientSlider";
import { TestimonialSlider1 } from "@/components/sliders/TestimonialSlider";
import RiddaLayout from "@/layout/RiddaLayout";
import Link from "next/link";

const page = () => {
  return (
    <RiddaLayout>
      {/* Hero Area Start */}
      <section className="hero-area-four bgc-black text-white rel z-2">
        <div className="container px-xxl-0  pt-180 rpt-90">
          <div className="row pt-50">
            <div className="col-xl-10">
              <div
                className="hero-content-four"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <h1 className="sm:!text-8xl !text-5xl line-clamp-6">
                  Ideas
                  <br />
                  Identity
                  <br />
                  Impact
                </h1>
                <p className="!text-xl !text-justify">
                  ReCreators is the digital marketing agency for brands who
                  refuse to be forgettable. Packaging that stops the scroll.
                  Branding people actually remember. Websites and campaigns
                  engineered to convert not just exist. We don't build noise. We
                  build main characters, wherever in the world you're trying to
                  be seen.{" "}
                </p>
                <Link
                  href="/project-grid"
                  className="theme-btn mt-30 rmt-15 mb-65 rmb-30"
                >
                  <span>Explore Our Projects</span>
                </Link>
                <h5>300+ Trusted Clients</h5>
                <div className="trusted-clients mt-25">
                  <img
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-delay={50}
                    src="assets/images/hero/author1.jpg"
                    alt="Author"
                  />
                  <img
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-delay={100}
                    src="assets/images/hero/author2.jpg"
                    alt="Author"
                  />
                  <img
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-delay={150}
                    src="assets/images/hero/author3.jpg"
                    alt="Author"
                  />
                  <img
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-delay={200}
                    src="assets/images/hero/author4.jpg"
                    alt="Author"
                  />
                  <img
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-delay={250}
                    src="assets/images/hero/author5.jpg"
                    alt="Author"
                  />
                  <img
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-delay={300}
                    src="assets/images/hero/author6.jpg"
                    alt="Author"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-area-shapes">
          <div className="shape">
            <img src="assets/images/shapes/Logo1.png" alt="Shape" />
          </div>
          {/* <div className="shape">
            <video
              src="assets/videos/LogoAnimation.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-auto object-cover"
            />
          </div> */}

          <div className="hero-image">
            <img src="assets/images/hero/hero-four.jpg" alt />
          </div>
        </div>
      </section>
      {/* Hero Area End */}
      {/* Counter Area start */}
      <div className="counter-area bgc-black pt-120 rpt-100 rel z-1">
        <div className="row  align-items-center">
          <div
            className="col-xxl-5"
            data-aos="fade-right"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            <div className="counter-left-image">
              <img src="assets/images/counter/Counterimage.jpg" alt="Counter" />
            </div>
          </div>
          <div className="col-xxl-7">
            <CounterItems />
          </div>
        </div>
        <div className="container text-white blank-container " />
        <div className="counter-shapes">
          <div className="shape">
            <img src="assets/images/shapes/counter.png" alt="Shape" />
          </div>
          <span className="marquee-wrap">
            <span className="marquee-inner left">
              <span className="marquee-item">Web Design Agency</span>
            </span>
            <span className="marquee-inner left">
              <span className="marquee-item">Web Design Agency</span>
            </span>
            <span className="marquee-inner left">
              <span className="marquee-item">Web Design Agency</span>
            </span>
          </span>
        </div>
      </div>
      {/* Counter Area end */}
      {/* About Area start */}
      <section className="about-area rel z-1">
        <div className="container  sm:pt-130 !pt-12 rpt-100 pb-100">
          <div className="row px-xl-5 justify-content-between align-items-center">
            <div className="col-xl-4 col-lg-5">
              <div className="about-circles rmb-55">
                <div
                  className="circle"
                  data-aos="fade-left"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  Recreate
                </div>
                <div
                  className="circle mx-auto bgc-black text-white"
                  data-aos="zoom-in"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  Your
                </div>
                <div
                  className="circle ms-auto bgc-primary"
                  data-aos="fade-right"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  Story
                </div>
              </div>
            </div>
            <div
              className="col-lg-7"
              data-aos="fade-left"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="about-content-four">
                <div className="section-title mb-40">
                  <span className="subtitle mt-10 mb-15">About Agency</span>
                  <h2>
                    We Don’t Just Design Packs, We <span> Build </span> Brands
                    Around Them
                  </h2>
                </div>
                <p>
                  Most agencies give you one piece and call it a day. ReCreators
                  isn't that. We're a digital marketing agency in India with a
                  global mindset, built for brands who don't want to babysit
                  five different vendors just to launch one product.
                </p>
                <p>
                  Packaging that earns a double-take. An identity people
                  screenshot and send to their friends. A website that actually
                  converts instead of just sitting there looking pretty.
                  Marketing that reaches real humans, not just impressions. One
                  team, one story, told consistently from the shelf to the feed,
                  wherever your audience is scrolling.
                </p>
                <ul className="list-style-one my-30">
                  <li>Packaging & Product Design</li>
                  <li>Branding & Visual Identity</li>
                  <li>Website & E-Commerce Development</li>
                  <li>SEO, Social & Performance Marketing</li>
                  <li>Photography, Print & Content</li>

                </ul>
                <Link
                  href="/project-list"
                  className="theme-btn style-two"
                  // data-hover="Explore Our Projects"
                >
                  <span>Explore Our Projects</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container px-0">
          <img src="assets/images/about/Bannerhome.png" alt="About" />
        </div>
      </section>
      {/* About Area end */}
      {/* <ServicesSection /> */}
      {/* Services Area Start */}
      <Services />
      {/* Services Area End */}
      {/* Working Process Area Start */}
      <section className="working-process-area bgc-black text-white rel z-1">
        <div className="container sm:pt-130 !pt-10 rpt-100 sm:!pb-10 !pb-10 rpb-50">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9 col-md-11">
              <div
                className="section-title sm:mb-50 !mb-5 text-center"
                data-aos="fade-up"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <span className="subtitle mt-10 sm:!mb-20 !mb-5">
Our Process                </span>
                <h2>From Curious to Convinced.</h2>
              </div>
            </div>
          </div>
          <div className="row sm:!gap-50 !gap-5 justify-content-center rel">
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div
                className="work-process-item"
                data-aos="flip-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="image">
                  <img
                    src="assets/images/work-process/DesignandDevelop.png"
                    alt="Work Process"
                  />
                </div>
                <div className="circle" />
                <div className="content">
                  <h5>
                    Discover
                  </h5>
                  <p>
                    We learn your business, your market, and your competition- wherever in the world you're selling.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div
                className="work-process-item"
                data-aos="flip-right"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <h5>
Design & Strategise    
                  </h5>
                  <p>
                    Creative strategy meets design to craft tailored solutions
                    for your brand.
                  </p>
                </div>
                <div className="circle" />
                <div className="image">
                  <img
                    src="assets/images/work-process/DiscoverandDefine.png"
                    alt="Work Process"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div
                className="work-process-item"
                data-aos="flip-left"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="image">
                  <img
                    src="assets/images/work-process/LaunchandGrow.png"
                    alt="Work Process"
                  />
                </div>
                <div className="circle" />
                <div className="content">
                  <h5>
Build & Refine            
                  </h5>
                  <p>
                    We design, develop, and test- with your feedback shaping every single round.

                  </p>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-lg-4 col-sm-6">
              <div
                className="work-process-item"
                data-aos="flip-right"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="content">
                  <h5>
                  Launch & Grow
                  </h5>
                  <p>
                    We launch, we learn, we level up- growth doesn't stop when the site goes live.
                  </p>
                </div>
                <div className="circle" />
                <div className="image">
                  <img
                    src="assets/images/work-process/RefineandCollaborate.png"
                    alt="Work Process"
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="work-process-line">
                <img
                  src="assets/images/work-process/work-step-line.png"
                  alt="Line"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="work-process-shapes" />
      </section>
      {/* Working Process Area End */}
      {/* Projects Area start */}
      <section className="project-area rel z-1">
        <div className="container px-sm-0 sm:py-130 !py-10 rpy-100">
          <div className="row justify-content-center">
            <div className="col-xl-7 col-lg-9">
              <div
                className="section-title text-center mb-50"
                data-aos="zoom-in"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <span className="subtitle mb-15">Popular Works</span>
                <h2>Explore Our Latest Projects</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div
                className="project-item"
                data-aos="zoom-in"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <a
                  href="assets/images/projects/project-image1.jpg"
                  className="image"
                >
                  <img src="assets/images/projects/Group1.png" alt="Project" />
                </a>
                <div className="content">
                  <span className="category">Marketing</span>
                  <h4>
                    <Link href="project-details">Website Development</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                className="project-item"
                data-aos="zoom-in"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <a
                  href="assets/images/projects/project-image2.jpg"
                  className="image"
                >
                  <img src="assets/images/projects/Group2.png" alt="Project" />
                </a>
                <div className="content">
                  <span className="category">Marketing</span>
                  <h6>
                    <Link href="project-details">Website Development</Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                className="project-item"
                data-aos="zoom-in"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <a
                  href="assets/images/projects/project-image2.jpg"
                  className="image"
                >
                  <img src="assets/images/projects/Group3.png" alt="Project" />
                </a>
                <div className="content">
                  <span className="category">Marketing</span>
                  <h6>
                    <Link href="project-details">Website Development</Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div
                className="project-item"
                data-aos="zoom-in"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <a
                  href="assets/images/projects/project-image4.jpg"
                  className="image"
                >
                  <img src="assets/images/projects/Group4.png" alt="Project" />
                </a>
                <div className="content">
                  <span className="category">Marketing</span>
                  <h4>
                    <Link href="project-details">Website Development</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div
                className="project-item"
                data-aos="zoom-in"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <a
                  href="assets/images/projects/project-image5.jpg"
                  className="image"
                >
                  <img src="assets/images/projects/Group5.png" alt="Project" />
                </a>
                <div className="content">
                  <span className="category">Marketing</span>
                  <h4>
                    <Link href="project-details">Website Development</Link>
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-md-6">
              <div
                className="project-item"
                data-aos="zoom-in"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <a
                  href="assets/images/projects/project-image6.jpg"
                  className="image"
                >
                  <img src="assets/images/projects/Group1.png" alt="Project" />
                </a>
                <div className="content">
                  <span className="category">Marketing</span>
                  <h6>
                    <Link href="project-details">Website Development</Link>
                  </h6>
                </div>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <Link
                href="project-grid"
                className="theme-btn style-two mt-20"
                // data-hover="Explore Projects"
              >
                <span>Explore Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Projects Area end */}
      {/* Testimonials Area Start */}
      <section className="testimonials-two-area bgc-lighter rel z-1">
        <div className="container px-0 sm:pt-130 !pt-10 rpt-100 pb-170 rpb-140">
          <div className="testimonials-and-clients bg-white br-10 bordered">
            <div className="row">
              <div className="col-lg-5">
                <div
                  className="testimonials-content rmb-55"
                  data-aos="fade-left"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                >
                  <div className="section-title sm:mb-30 !mb-5">
                    <span className="subtitle mt-10 mb-15">
                      Client Voices
                    </span>
                    <h2>1580+ Customer Say About Our Services</h2>
                  </div>
                  <p>
                    A web design agency is dedicated to creating visually
                    stunning and highly functional websites.
                  </p>
                  <div className="testimonial-dots mt-45" />
                </div>
              </div>
              <div className="col-lg-7">
                <TestimonialSlider1 />
              </div>
            </div>
            <div
              className="text-center sm:mt-45 !mt-5 sm:mb-40 !mb-5"
              data-aos="zoom-in"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <h6>Trusted by industry leaders</h6>
            </div>
            <ClientSlider />
          </div>
        </div>
      </section>
      {/* <AgencyVideoSection /> */}
      {/* Testimonials Area End */}
      {/* Blog Area start */}
      <Blog />
      {/* Blog Area end */}
      {/* CTA Area start */}
      <CTA />
      {/* CTA Area end */}
    </RiddaLayout>
  );
};
export default page;
