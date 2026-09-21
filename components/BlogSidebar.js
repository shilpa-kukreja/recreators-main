"use client";

import Link from "next/link";
import { useContext } from "react";
import { AppContext } from "@/app/context/AppContext";
import { ChevronRight } from "lucide-react";

const BlogSidebar = () => {
  const { blogs } = useContext(AppContext);

  // ✅ Extract & split categories correctly
  const categories = [
    ...new Set(
      blogs.flatMap((b) =>
        b.blogCategory
          ? b.blogCategory.split(",").map((c) => c.trim())
          : []
      )
    ),
  ];

  // ✅ Get latest 3 blogs
  const recentBlogs = blogs.slice(0, 3);

  // ✅ Extract & split tags
  const tags = [
    ...new Set(
      blogs.flatMap((b) =>
        b.blogTags ? b.blogTags.split(",").map((t) => t.trim()) : []
      )
    ),
  ];

  return (
    <div className="col-lg-4 col-md-8 col-sm-10 ps-xl-5 rmt-65">
      <div className="blog-sidebar">
        {/* 🔍 Search */}
        <div className="widget widget-search">
          <h4 className="widget-title">Search</h4>
          <form action="#" className="default-search-form">
            <input type="text" placeholder="Search....." required />
            <button type="submit" className="searchbutton far fa-search" />
          </form>
        </div>

        {/* 📂 Categories */}
        {/* <div className="widget widget-category !bg-white !shadow-md !rounded-2xl !p-6 !border !border-gray-100">
          <h4 className="widget-title !text-xl !font-semibold !mb-4 !text-gray-800 !border-b !pb-2">
            Categories
          </h4>
          <ul className="!space-y-3">
            {categories.map((cat, i) => (
              <li key={i}>
                <Link
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className="!flex !items-center !justify-between !group !text-gray-600 hover:!text-indigo-600 !font-medium !transition-colors"
                >
                  <span className="group-hover:!translate-x-1 !transition-transform">
                    {cat}
                  </span>
                  <ChevronRight className="!h-4 !w-4 opacity-70 group-hover:!opacity-100 group-hover:!text-indigo-600 !transition-all" />
                </Link>
              </li>
            ))}
          </ul>
        </div> */}

        {/* 📰 Recent News */}
        <div className="widget widget-news">
          <h4 className="widget-title">Recent News</h4>
          <ul>
            {recentBlogs.map((blog) => (
              <li key={blog._id}>
                <div className="image">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.blogImg}`}
                    alt={blog.blogName}
                  />
                </div>
                <div className="content">
                  <span className="date">
                    <i className="far fa-calendar-alt" /> {blog.blogDate}
                  </span>
                  <h6>
                    <Link href={`/blogdetail/${blog.blogSlug}`}>
                      {blog.blogName}
                    </Link>
                  </h6>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 🏷 Tags */}
        <div className="widget widget-tags">
          <h4 className="widget-title">Tags</h4>
          <div className="tag-clouds">
            {tags.map((tag, i) => (
              <Link href={`/blog?tag=${tag}`} key={i}>
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
