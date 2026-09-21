"use client";

import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";

const WhyChooseUs = () => {
  return (
    <section className="tab-area bgc-lighter-gradient" id="why-choose">
      <div
        className="container   py-130 rpy-100 bgp-bottom"
        style={{
          backgroundImage: "url(assets/images/background/tab-bg-dots.png)",
        }}
      >
        <div
          className="section-title mb-50 text-center"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
        >
          <span className="subtitle mt-10 mb-15">Why Choose Us</span>
          <h2>Why Choose Ridda Agency</h2>
        </div>
        <Tab.Container defaultActiveKey={"tabOne1"}>
          <div
            className="text-center"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-offset={50}
            data-aos-delay={50}
          >
            <Nav as={"ul"} className="nav tab-style-one mb-70" role="tablist">
              {[
                {
                  eventKey: "tabOne1",
                  icon: "fas fa-user-friends",
                  text: "Experience Team",
                },
                {
                  eventKey: "tabOne2",
                  icon: "fas fa-chart-bar",
                  text: "Proven Results",
                },
                {
                  eventKey: "tabOne3",
                  icon: "fas fa-rocket-launch",
                  text: "Personalized Approach",
                },
              ].map((item, index) => (
                <Nav.Item key={index} as={"li"}>
                  <Nav.Link
                    as={"button"}
                    className="nav-link"
                    eventKey={item.eventKey}
                  >
                    <i className={item.icon} /> {item.text}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>
          </div>
          <Tab.Content className="tab-content">
            <Tab.Pane className="tab-pane fade" eventKey="tabOne1">
              <div className="row align-items-center justify-content-center">
                <div className="col-xl-5 col-lg-6">
                  <div
                    className="content rmb-55"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <h4 className="mb-25">
                      Lead Social Media Marketing Specialist Director of Social
                      Media Strategy
                    </h4>
                    <p>
                      As a valued member of our team Teams Member' consistently
                      demonstrates a high level of expertise and dedication to
                      their role their ability to collaborate effectively with
                      colleagues
                    </p>
                    <ul className="list-style-two mt-35 mb-40">
                      <li>Senior Social Media Strategist</li>
                      <li>Chief Social Media Marketing Officer</li>
                      <li>Director of Social Media Strategy</li>
                    </ul>
                    <Link
                      href="about"
                      className="theme-btn btn-small bgc-secondary hover-secondary"
                      data-hover="Learn More"
                    >
                      <span>Learn More</span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-6">
                  <div
                    className="image"
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <img src="assets/images/tabs/tab-one.png" alt="Tab" />
                  </div>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane className="tab-pane fade" eventKey="tabOne2">
              <div className="row gap-60 align-items-center justify-content-center">
                <div className="col-xl-5 col-lg-6">
                  <div
                    className="image rmb-55"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <img src="assets/images/tabs/tab-one.png" alt="Tab" />
                  </div>
                </div>
                <div className="col-xl-5 col-lg-6">
                  <div
                    className="content"
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <h4 className="mb-25">
                      Lead Social Media Marketing Specialist Director of Social
                      Media Strategy
                    </h4>
                    <p>
                      As a valued member of our team Teams Member' consistently
                      demonstrates a high level of expertise and dedication to
                      their role their ability to collaborate effectively with
                      colleagues
                    </p>
                    <ul className="list-style-two mt-35 mb-40">
                      <li>Senior Social Media Strategist</li>
                      <li>Chief Social Media Marketing Officer</li>
                      <li>Director of Social Media Strategy</li>
                    </ul>
                    <Link
                      href="about"
                      className="theme-btn btn-small bgc-secondary hover-secondary"
                      data-hover="Learn More"
                    >
                      <span>Learn More</span>
                    </Link>
                  </div>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane className="tab-pane fade" eventKey="tabOne3">
              <div className="row align-items-center justify-content-center">
                <div className="col-xl-5 col-lg-6">
                  <div
                    className="content rmb-55"
                    data-aos="fade-left"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <h4 className="mb-25">
                      Lead Social Media Marketing Specialist Director of Social
                      Media Strategy
                    </h4>
                    <p>
                      As a valued member of our team Teams Member' consistently
                      demonstrates a high level of expertise and dedication to
                      their role their ability to collaborate effectively with
                      colleagues
                    </p>
                    <ul className="list-style-two mt-35 mb-40">
                      <li>Senior Social Media Strategist</li>
                      <li>Chief Social Media Marketing Officer</li>
                      <li>Director of Social Media Strategy</li>
                    </ul>
                    <Link
                      href="about"
                      className="theme-btn btn-small bgc-secondary hover-secondary"
                      data-hover="Learn More"
                    >
                      <span>Learn More</span>
                    </Link>
                  </div>
                </div>
                <div className="col-xl-5 col-lg-6">
                  <div
                    className="image"
                    data-aos="fade-right"
                    data-aos-duration={1500}
                    data-aos-offset={50}
                  >
                    <img src="assets/images/tabs/tab-one.png" alt="Tab" />
                  </div>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </section>
  );
};
export default WhyChooseUs;

export const WhyChooseUs2 = ({ bg = "bgc-lighter" }) => {
  const services = [
    {
      icon: "fas fa-tools",
      title: "Design That Sells",
      text: "Beautiful design that doesn't convert is just decoration. We build for both- bold visuals backed by strategy that actually drives results.",
    },
    {
      icon: "fas fa-anchor",
      title: "One Team, Everything Handled",
      text: "Branding, packaging, web, print, social- handled by one team who actually talks to each other, so your brand never feels disjointed.",
    },
    {
      icon: "fas fa-comments",
      title: "No Surprises, Just Results",
      text: "No mystery timelines, no surprise invoices. You see the process, shape the process, and know exactly where your project stands- always.",
    },
    
  ];

  return (
    <section className={`why-choose-us ral z-1 ${bg}`}>
      <div className="container   sm:py-100 !py-10">
        <div className="row mx-xl-1 justify-content-between">
          <div
            className="col-lg-6 rmb-55"
            data-aos="fade-left"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            <div className="section-title mb-45">
              <span className="subtitle mt-10 mb-15">Why Choose Us?</span>
              <h2> Because Pretty Isn't the Point. Performance Is.</h2>
              <p>
               We're not here to just make things look nice- we're here to make them work.
              </p>
            </div>
            
            <img
              className="br-5"
              src="assets/images/services/why-choose-us.jpg"
              alt="Why Choose Us"
            />
          </div>
          <div
            className="col-lg-6"
            data-aos="fade-right"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            {services.map((service) => (
              <div className="service-item style-two" key={service.title}>
                <div className="icon">
                  <i className={service.icon} />
                </div>
                <div className="content">
                  <h6>
                    <Link href="service-details">{service.title}</Link>
                  </h6>
                  <p>{service.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const WhyChooseUs3 = ({ className = "why-choose-two-area" }) => {
  const steps = [
    { number: "01", title: "Modern & Purposeful Design", description: "We create designs that are visually stunning, mobile-friendly, and built to perform across every touchpoint — from web to packaging to print.", icon: "flaticon-curve" },
    {
      number: "02",
      title: "Your Dedicated Studio Partner",
      description: "Think of us as an extension of your team. With one dedicated point of contact, we handle everything from strategy to execution seamlessly.",
      icon: "flaticon-leadership",
    },
    {
      number: "03",
      title: "Transparent, Results-Driven Work",
      description: " Our process is open, collaborative, and data-backed — ensuring clear timelines, fair pricing, and measurable growth for your brand.",
      icon: "flaticon-satisfaction",
    },
  ];

  return (
    <section className={`rel z-1 ${className}`}>
      <div className="container   sm:pt-130 !pt-10 rpt-100 pb-100 rpb-70 px-sm-0">
        <div className="row justify-content-center pb-35">
          <div
            className="col-xl-5 col-lg-7 col-md-10 text-center"
            data-aos="zoom-in"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            <div className="section-title mt-10 mb-30">
              <span className="subtitle mb-15">Why Choose Us</span>
              <h2>Discover What Sets Us Apart</h2>
              <p>
                 Creative design, strategy and delivery that turns attention into growth.
              </p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {steps.map(({ number, title, icon }) => (
            <div
              key={number}
              className="col-xl-4 col-md-6"
              data-aos="flip-right"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="service-two-item style-two">
                <div className="icon">
                  <i className={icon} />
                </div>
                <h5>
                  <Link href="service-details">{title}</Link>
                </h5>
                <p>
                  We design are mobile-friendly and fully responsive. This means
                  they will look and function perfectly on all devices.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
