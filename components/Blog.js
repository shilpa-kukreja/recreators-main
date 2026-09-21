"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblog`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ Show only the first 3 blogs
        setBlogs(data.slice(0, 4));
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);

  return (
    <section className="blog-two-area rel z-1" id="blog">
      <div className="container px-sm-0   sm:pt-130 !pt-10 rpt-100">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div
              className="section-title text-center sm:mb-50 !mb-5"
              data-aos="zoom-in"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <span className="subtitle mb-15">Blog &amp; News</span>
              <h2>Explore Latest Insights</h2>
            </div>
          </div>
        </div>
        {blogs.map((blog) => (
          <div className="blog-timeline-item hover-item" key={blog._id}>
            <span className="date">
              <a href="#">
                <i className="far fa-calendar-alt" /> {blog.blogDate}
              </a>
            </span>
            <div className="content">
              <h4>
                <Link href={`/blogdetail/${blog.blogSlug}`}>{blog.blogName}</Link>
              </h4>
              <div className="hover-content">
                <div className="text">
                  {/* Trim content preview */}
                  <p dangerouslySetInnerHTML={{ __html: blog.blogDetail.substring(0, 150) + "..." }} />
                </div>
                <div className="image">
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.blogImg}`} alt={blog.blogName} />
                </div>
              </div>
            </div>
            <Link href={`blogs/${blog.blogSlug}`} className="detail-btn">
              <i className="fal fa-arrow-right" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;


export const Blog2 = ({ subtitleColor = "color-primary" }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blog/getblog`)
      .then((res) => res.json())
      .then((data) => {
        // ✅ Show only the first 3 blogs
        setBlogs(data.slice(0, 3));
      })
      .catch((err) => console.error("Error fetching blogs:", err));
  }, []);



  return (
    <section id="blog" className="blog-area sm:pt-100 !pt-8 pb-70 rel z-1">
      <div className="container container-1290">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div
              className="section-title text-center sm:mb-50 !mb-5"
              data-aos="zoom-in"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <span className={`subtitle ${subtitleColor} mt-10 sm:mb-15 !mb-5`}>
                Blog &amp; News
              </span>
              <h2>Explore Latest Insights</h2>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {blogs.map((blog, index) => (
            <div
              className="col-xl-4 col-md-6"
              key={index}
              data-aos="fade-up"
              data-aos-duration={1500}
              data-aos-offset={50}
              data-aos-delay={index * 50}
            >
              <div className="blog-item style-three">
                <div className="image">
                  <img src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.blogImg}`} alt={blog.blogName} className="!w-100 !h-[300px]" />
                </div>
                <div className="content">
                  <ul className="blog-meta">
                    <li>
                      {blog.blogCategory}
                    </li>
                  </ul>
                  
                          
                  <h5>
                    <Link href={`/blogdetail/${blog.blogSlug}`}>
                    <p dangerouslySetInnerHTML={{ __html: blog.blogName.substring(0, 100) + "..." }} />
                    </Link>
                  </h5>
                  <Link
                    href={`/blogdetail/${blog.blogSlug}`}
                    className="theme-btn style-two"
                  // data-hover="Read More"
                  >
                    <span>Read More</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
