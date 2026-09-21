"use client";
import PageBanner from "@/components/PageBanner";
import { WhyChooseUs3 } from "@/components/WhyChooseUs";
import RiddaLayout from "@/layout/RiddaLayout";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const page = () => {
  const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
  
      const data = {
        name: e.target.name.value,
        email: e.target.email.value,
        number: e.target.number.value,
        subject: e.target.subject.value,
        message: e.target.message.value,
      };
  
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/contact`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
  
        const result = await res.json();
        if (res.ok) {
          toast.success("Message sent successfully");
          e.target.reset();
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to send message");
      } finally {
        setIsSubmitting(false);
      }
    };
  
  return (
    <RiddaLayout>
      <PageBanner pageTitle="Contact" pageName="Contact" />
      <WhyChooseUs3 className="why-choose-contact-page" />
      <section className="contact-form-area">
        <div className="container px-sm-0 pb-120 rpb-90">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div
                className="contact-info-part style-two rmb-55"
                data-aos="fade-right"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <div className="section-title mb-50">
                  <h2>
                    Ready to get started ? Tell us about your project and we’ll match it with a plan that fits your goals.
                  </h2>
                </div>
                <div className="contact-info-wrap bordered br-10 overflow-hidden">
                  <div className="row no-gap">
                    <div className="col-sm-6">
                      <div
                        className="contact-info-item"
                        data-aos="zoom-in"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                        data-aos-delay={50}
                      >
                        <div className="icon">
                          <i className="far fa-map-marker-alt" />
                        </div>
                        <div className="text-sm">
                          metro station, Tower-A, Office no- 910, Spectrum mall, 75, behind Sector 50, above haldirams, Noida, Uttar Pradesh 201301
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div
                        className="contact-info-item"
                        data-aos="zoom-in"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                        data-aos-delay={50}
                      >
                        <div className="icon">
                          <i className="far fa-envelope" />
                        </div>
                        <div className="text">
                          <a href="mailto:hello@recreators.design">
                             hello@recreators.design
                          </a>
                          <br />
                          <a href="www.sayan.net" target="_blank">
                            hello@recreators.design
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div
                        className="contact-info-item"
                        data-aos="zoom-in"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                        data-aos-delay={50}
                      >
                        <div className="icon">
                          <i className="far fa-phone-volume" />
                        </div>
                        <div className="text">
                          <a href="callto:+880(123)45688">Ph: +91-98112-47795.</a>
                          <br />
                          <a href="callto:+001(234)56897">Ph: +91-98112-47795.</a>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div
                        className="contact-info-item"
                        data-aos="zoom-in"
                        data-aos-duration={1500}
                        data-aos-offset={50}
                        data-aos-delay={50}
                      >
                        <div className="icon">
                          <i className="far fa-clock" />
                        </div>
                        <div className="text">
                          Monday - Saturday <br />
                          10:00am - 06:00pm
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="contact-form style-three bgc-lighter z-1 rel">
                <form
                  id="contactForm"
                  className="contactForm"
                  name="contactForm"
                  action="assets/php/form-process.php"
                  method="post"
                  data-aos="fade-left"
                  data-aos-duration={1500}
                  data-aos-offset={50}
                  onSubmit={handleSubmit}
                >
                  <h3>Get In Touch</h3>
                  <p>
                     Tell us about your idea — we’ll get back to you to plan the next steps.
                  </p>
                  <div className="row gap-0 mt-20">
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-control"
                          placeholder="Fernando H. Cruz"
                          required
                          data-error="Please enter your Name"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="phone_number">Phone</label>
                        <input
                          type="text"
                          id="phone_number"
                          name="number"
                          className="form-control"
                          placeholder="Phone Number"
                          required
                          data-error="Please enter your Number"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control"
                          placeholder="Enter email"
                          required
                          data-error="Please enter your Email"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-sm-6 mb-25">
                      <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          className="form-control"
                          placeholder="Subject"
                          required
                          data-error="Please enter your Subject"
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group">
                        <label htmlFor="message">Message Us</label>
                        <textarea
                          name="message"
                          id="message"
                          className="form-control"
                          rows={4}
                          placeholder="write here"
                          required
                          data-error="Please enter your Message"
                          defaultValue={""}
                        />
                        <div className="help-block with-errors" />
                      </div>
                    </div>
                    <div className="col-sm-12">
                      <div className="form-group mb-0">
                        <button
                          type="submit"
                          className="theme-btn"
                          // data-hover="Send Message"
                        >
                          <span>Send Message</span>
                        </button>
                        <div id="msgSubmit" className="hidden" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div
            className="our-location mt-100"
            data-aos="fade-up"
            data-aos-duration={1500}
            data-aos-offset={50}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.8561578028557!2d77.37698677613571!3d28.57408178673138!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce527c8c099bb%3A0xbf9711b8bc3f91f8!2sRecreators%20Design%20%26%20Media%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1788412336043!5m2!1sen!2sin"
              style={{ border: 0, width: "100%" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </RiddaLayout>
  );
};
export default page;
