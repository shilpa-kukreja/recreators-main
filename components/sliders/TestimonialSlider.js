"use client";
import { sliderProps } from "@/utility/sliderProps";
import Slider from "react-slick";

export const TestimonialSlider1 = () => {
  return (
    <Slider
      {...sliderProps.testimonials2}
      className="testimonials-two-active"
      data-aos="fade-right"
      data-aos-duration={1500}
      data-aos-offset={50}
    >
      {[
        // {
        //   logo: "assets/images/testimonials/logo3.png",
        //   author: "assets/images/testimonials/author3.jpg",
        //   text: "Recreators completely transformed our brand identity. The logo, colors, and messaging now truly reflect who we are. Clients immediately notice the difference!",
        //   name: "Radhika Sharma",
        //   designation: "Founder, Pure Essence Skincare",
        // },
        {
          logo: "assets/images/testimonials/logo1.png",
          author: "assets/images/testimonials/author3.png",
          text: "We came to Recreators with just an idea and a need for complete branding — and left with packaging so premium, it didn't just represent our brand, it elevated it. Every detail felt intentional, and it shows on the shelf.",
          name: "Pankaj Verma",
          designation: "Founder, Nutvique",
        },
        // {
        //   logo: "assets/images/testimonials/logo3.png",
        //   author: "assets/images/testimonials/author5.jpg",
        //   text:  "They built our custom e-commerce site exactly the way we imagined—fast, mobile-friendly, and optimized for conversions. The results speak for themselves.",
        //   name: "Priya Nair",
        //   designation: "Co-Founder, Trendy Threads",
        // },
        {
          logo: "assets/images/testimonials/logo1.png",
          author: "assets/images/testimonials/author4.png",
          text:  "Within three months of working with Recreators, our social engagement doubled. Their content strategy is smart, creative, and consistently on point.",
          name: "Rohit Malhotra",
          designation: "Marketing Head, FitVibe Gym",
        },
         {
          logo: "assets/images/testimonials/logo1.png",
          author: "assets/images/testimonials/author5.png",
          text:   "From brochures to catalogs, their print design always gets us compliments. Professional, polished, and aligned perfectly with our brand voice.",
          name: "Sandeep Bansal",
          designation: "CEO, Bansal Automotives",
        },
        //  {
        //   logo: "assets/images/testimonials/logo1.png",
        //   author: "assets/images/testimonials/author2.jpg",
        //   text: "Recreators isn’t just a design agency—they’re a true growth partner. Their blend of creativity and strategy has helped us scale faster than we imagined.",
        //   name: "Neha Arora",
        //   designation: "Managing Director, Arora Lifestyle Pvt. Ltd.",
        // },
      ].map((testimonial, index) => (
        <div key={index} className="testimonial-item style-two">
          <div className="author-logo">
            <div className="quote">
              <i className="flaticon-quotation-mark" />
            </div>
            <div className="logo">
              <img src={testimonial.logo} alt="Logo" />
            </div>
          </div>
          <div className="text">{testimonial.text}</div>
          <div className="quote-title">
            <div className="author">
              <img src={testimonial.author} alt="Author" />
            </div>
            <h6>{testimonial.name}</h6>
            <span className="designation">/{testimonial.designation}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export const TestimonialsSlider2 = () => {
  return (
    <Slider className="testimonials-active" {...sliderProps.testimonials}>
      {[
        {
          author: "assets/images/testimonials/author1.jpg",
          logo: "assets/images/testimonials/logo1.png",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have helped us reach new heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author2.jpg",
          logo: "assets/images/testimonials/logo2.png",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have helped us reach new heights",
          name: "Thomas L. Brinker",
          designation: "SR Manager",
        },
        {
          author: "assets/images/testimonials/author1.jpg",
          logo: "assets/images/testimonials/logo1.png",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have helped us reach new heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author2.jpg",
          logo: "assets/images/testimonials/logo2.png",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have helped us reach new heights",
          name: "Thomas L. Brinker",
          designation: "SR Manager",
        },
      ].map((testimonial, index) => (
        <div
          key={index}
          className="testimonial-item"
          data-aos="fade-up"
          data-aos-duration={1500}
          data-aos-offset={50}
          data-aos-delay={index * 50}
        >
          <div className="author-logo">
            <div className="author">
              <img src={testimonial.author} alt="Author" />
            </div>
            <div className="logo">
              <img src={testimonial.logo} alt="Logo" />
            </div>
          </div>
          <div className="text">{testimonial.text}</div>
          <div className="quote-title">
            <div className="quote">
              <i className="flaticon-quotation-mark" />
            </div>
            <h6>{testimonial.name}</h6>
            <span className="designation">/{testimonial.designation}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export const TestimonialsSlider3 = () => {
  return (
    <Slider className="testimonials-two-active" {...sliderProps.testimonials2}>
      {[
        {
          author: "assets/images/testimonials/author1.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have helped us reach new heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author2.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have helped us reach new heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author1.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have helped us reach new heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author2.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have helped us reach new heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
      ].map((testimonial, index) => (
        <div key={index} className="testimonial-item style-three">
          <div className="author-logo">
            <div className="quote">
              <i className="flaticon-quotation-mark" />
            </div>
          </div>
          <div className="text">{testimonial.text}</div>
          <div className="quote-title">
            <div className="author">
              <img src={testimonial.author} alt="Author" />
            </div>
            <h6>{testimonial.name}</h6>
            <span className="designation">/{testimonial.designation}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export const TestimonialsSlider4 = () => {
  return (
    <Slider
      {...sliderProps.testimonials3}
      className="testimonials-three-active"
    >
      {[
        {
          author: "assets/images/testimonials/author1.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have help reach heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author2.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have help reach heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author1.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have help reach heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author2.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have help reach heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
      ].map((testimonial, index) => (
        <div key={index} className="testimonial-item style-four">
          <div className="author-logo">
            <div className="quote">
              <i className="flaticon-quotation-mark" />
            </div>
          </div>
          <div className="text">{testimonial.text}</div>
          <div className="quote-title">
            <div className="author">
              <img src={testimonial.author} alt="Author" />
            </div>
            <h6>{testimonial.name}</h6>
            <span className="designation">/{testimonial.designation}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export const TestimonialsSlider5 = () => {
  return (
    <Slider {...sliderProps.testimonials2} className="testimonials-two-active">
      {[
        {
          author: "assets/images/testimonials/author1.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have help reach heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author2.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have help reach heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author1.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have help reach heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
        {
          author: "assets/images/testimonials/author2.jpg",
          text: "Working with Ridda has been game-changer for our social media presence. Their strategic to approach and attention too detail have help reach heights",
          name: "Randall J. Ferguson",
          designation: "CEO & Founder",
        },
      ].map((testimonial, index) => (
        <div key={index} className="testimonial-item style-four">
          <div className="author-logo">
            <div className="quote">
              <i className="flaticon-quotation-mark" />
            </div>
          </div>
          <div className="text">{testimonial.text}</div>
          <div className="quote-title">
            <div className="author">
              <img src={testimonial.author} alt="Author" />
            </div>
            <h6>{testimonial.name}</h6>
            <span className="designation">/{testimonial.designation}</span>
          </div>
        </div>
      ))}
    </Slider>
  );
};
