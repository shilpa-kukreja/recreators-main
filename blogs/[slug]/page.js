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
          <div className="banner-inner px-xl-5 pt-90 text-center">
            <h2>{blog.blogName}</h2>
            <ul className="blog-meta">
              <li>Post by Admin</li>
              <li>{blog.blogDate}</li>
            </ul>
          </div>
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
