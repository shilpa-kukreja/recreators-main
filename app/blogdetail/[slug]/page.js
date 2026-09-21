"use client";

import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
import BlogSidebar from "@/components/BlogSidebar";
import RiddaLayout from "@/layout/RiddaLayout";

const BlogDetailsPage = ({ params }) => {
  const { slug } = params;
  const { blogs } = useContext(AppContext);

  const blog = blogs?.find((b) => b.blogSlug === slug); 
  console.log("blogs", blogs);

  if (!blog) {
    return (
      <RiddaLayout>
        <div className="container py-100 text-center">Loading blog...</div>
      </RiddaLayout>
    );
  }

  return (
    <RiddaLayout>
     <section className="page-banner-area bgc-black text-white rel z-1 overflow-hidden">
        <div className="container   pt-200 rpy-100 pb-140">
          <div className="banner-inner px-xl-5 pt-90">
            <div
              className="text-center section-title mb-35"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <h2>
                {blog.blogName}
              </h2>
            </div>
            <ul
              className="blog-meta"
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
              data-aos-delay={50}
            >
              <li>
                Post by <a href="#">Richard V</a>.
              </li>
              <li>{blog.blogDate}</li>
              <li>
                Comments <span>(5)</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="page-banner-shapes">
          <div className="shape position-three">
            <img src="../assets/images/shapes/hero-shape.png" alt="Shape" />
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
      </section>
      


      <section className="blog-details-page rel z-1">
        <div className="container   px-sm-0 py-130 rpy-100">
          <div className="row">
            <div className="col-lg-8">
              <div className="blog-details-content">
                <div className="image mb-35">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.blogImg}`}
                    alt={blog.blogName}
                  />
                </div>

                <div
                  dangerouslySetInnerHTML={{ __html: blog.blogDetail }}
                ></div>

                <div className="tag-share pt-40 mb-50">
                  <h6>Tags</h6>
                  <div className="tag-clouds pb-15">
                    {blog.blogTags.split(",").map((tag, i) => (
                      <a href="#" key={i}>
                        {tag.trim()}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <BlogSidebar />
          </div>
        </div>
      </section>
    </RiddaLayout>
  );
};

export default BlogDetailsPage;
