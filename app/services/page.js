
import { Faq2 } from "@/components/Faq";
import PageBanner from "@/components/PageBanner";
import { WhyChooseUs3 } from "@/components/WhyChooseUs";
import WorkingProcess from "@/components/WorkingProcess";
import RiddaLayout from "@/layout/RiddaLayout";
import Link from "next/link";

const page = () => {
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
      <PageBanner pageTitle="Service" pageName="Services" />

      {/* What We Provide Section */}
      <section className="what-we-provide-area rel z-1">
        <div className="container px-sm-0 sm:py-130 !py-10 rpy-100">
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
                Understanding your marketing videos’ performance can be like
                looking for a needle in a haystack. Vidyard’s online video
                marketing platform is a magnet. We'll discuss your project
                needs, goals, and budget, and provide the right strategy to
                help your business grow.
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

      {/* Services Section */}
      <section className="blog-grid-page !w-full rel z-1">
        <div className="container px-sm-0 sm:py-130 !py-10 rpy-100">
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
              <ul
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
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <WhyChooseUs3 />

      {/* FAQ */}
      <Faq2 />
    </RiddaLayout>
  );
};

export default page;

