import Link from "next/link";
import CounterItems from "./CounterItems";

const About = ({ counter }) => {
  return (
    <section className="about-area rel z-1">
      <div className="container   sm:pt-130 !pt-10 rpt-100 sm:pb-100 !pb-5">
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
                  We Don’t Just Design Brands, We <span> Build </span> Legacies
                </h2>
              </div>
              <p>
               At Recreators Design & Media, we believe every brand has a story worth telling. Since 2020, our team has blended creativity with strategy to craft designs that inspire and marketing that delivers. With every project, we help businesses stand out, connect deeply, and grow fearlessly.

              </p>
              <ul className="list-style-one my-30">
                <li>Branding & Packaging</li>
                <li>Web & E-Commerce Development</li>
                <li>Print & Communication Design</li>
                <li>Social Media Marketing</li>
              </ul>
              <Link
                href="project-list"
                className="theme-btn style-two"
                // data-hover="Explore Our Projects"
              >
                <span>Explore Our Projects</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`container   px-0 ${
          counter && "about-counter rel "
        }`}
      >
        <img src="assets/images/about/about.png" alt="About" />
        {counter && <CounterItems />}
      </div>
    </section>
  );
};
export default About;
