"use client";
import { useEffect, useState } from "react";
import PageBanner from "@/components/PageBanner";
import RiddaLayout from "@/layout/RiddaLayout";
import PortfolioSlider from "@/components/PortfolioSlider";
import Link from "next/link";
import { FiArrowUpRight, FiArrowRight, FiCalendar } from "react-icons/fi";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/portfolio/getportfolio`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data;
        setProjects(Array.isArray(list) ? list : []);
      } catch (e) {
        console.error(e);
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const getImages = (p) => {
    let imgs = [];
    if (Array.isArray(p.portfolioImgs) && p.portfolioImgs.length)
      imgs = p.portfolioImgs;
    else if (p.portfolioImg) imgs = [p.portfolioImg];
    return imgs.map((s) => (s.startsWith("http") ? s : `${BACKEND}${s}`));
  };

  const formatDate = (d) => {
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    } catch {
      return d;
    }
  };

  // strip html from description for preview
  const stripHtml = (html) => {
    if (!html) return "";
    return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  };

  return (
    <RiddaLayout>
      {/* ✅ HERO UNCHANGED — original PageBanner */}
      <PageBanner pageTitle="Project List" pageName="Project List" />

      {/* ============ PROJECTS SECTION ============ */}
      <section className="project-list !bg-[#FAF8F3] !py-12 lg:!py-16 !relative !overflow-hidden">
        {/* subtle grid pattern */}
        <div
          className="!absolute inset-0 !pointer-events-none !opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="container container-1290 !relative">
          {/* ---- section title ---- */}
          <div className="!text-center !max-w-4xl !mx-auto !mb-20 lg:!mb-28">
            {/* <span className="!inline-flex !items-center !gap-2 !px-4 !py-2 !rounded-full !bg-[#FF5F1F]/10 !border !border-[#FF5F1F]/20 !text-[#FF5F1F] !text-[11px] !font-bold !tracking-[0.2em] !uppercase !mb-6">
              <span className="!w-1.5 !h-1.5 !rounded-full !bg-[#FF5F1F] !animate-pulse" />
              Popular Works
            </span> */}
            <h2 className="!text-[#0B0B0B] !text-4xl lg:!text-4xl !font-black !tracking-tight !leading-[1.05] !mb-6">
              Brands We've Helped
              <span className="!block !text-[#FF5F1F]">Get Loud</span>
            </h2>
            <p className="!text-[#737373] !text-lg !leading-relaxed">
              Every project here started the same way every client does — an
              idea, a gap in the market, and a brand that hadn't found its
              voice yet. Here's what happened next.
            </p>
          </div>

          {/* ---- loading skeleton ---- */}
          {loading ? (
            <div className="!space-y-32">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-12 lg:!gap-20 !items-center !animate-pulse"
                >
                  <div className="!aspect-[4/3] !bg-[#EFEBE3] !rounded-3xl" />
                  <div className="!space-y-4">
                    <div className="!h-4 !bg-[#EFEBE3] !rounded !w-1/3" />
                    <div className="!h-10 !bg-[#EFEBE3] !rounded !w-3/4" />
                    <div className="!h-4 !bg-[#EFEBE3] !rounded !w-full" />
                    <div className="!h-4 !bg-[#EFEBE3] !rounded !w-5/6" />
                    <div className="!h-12 !bg-[#EFEBE3] !rounded-full !w-40" />
                  </div>
                </div>
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="!text-center !py-20">
              <p className="!text-[#737373] !text-lg">No projects found.</p>
            </div>
          ) : (
            <div className="!space-y-32 lg:!space-y-44">
              {projects.map((p, i) => {
                const isEven = i % 2 === 0;
                const images = getImages(p);
                const tags =
                  p.portfolioTags
                    ?.split(",")
                    .map((t) => t.trim())
                    .filter(Boolean) || [];
                const description = stripHtml(p.portfolioDetail);

                return (
                  <div
                    key={p._id}
                    className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-12 lg:!gap-20 !items-center"
                    data-aos={isEven ? "fade-right" : "fade-left"}
                    data-aos-duration={1000}
                    data-aos-offset={80}
                  >
                    {/* ---------- IMAGE SLIDER ---------- */}
                    <div className={isEven ? "lg:!order-1" : "lg:!order-2"}>
                      <div className="!relative">
                        {/* huge number behind */}
                        {/* <div className="!absolute -top-12 -left-6 lg:-top-16 lg:-left-12 !text-[100px] lg:!text-[160px] !font-black !text-[#0B0B0B]/5 !leading-none !pointer-events-none !select-none !tracking-tighter">
                          {String(i + 1).padStart(2, "0")}
                        </div> */}

                        {/* floating accent badge */}
                        {p.featured && (
                          <div className="!absolute -top-4 !right-6 !z-20 !px-4 !py-2 !rounded-full !bg-[#FF5F1F] !text-white !text-[10px] !font-black !tracking-[0.2em] !uppercase !shadow-[0_10px_30px_-10px_rgba(255,95,31,0.7)] !rotate-3">
                            ★ Featured
                          </div>
                        )}

                        <div className="!relative !z-10">
                          <PortfolioSlider
                            images={images}
                            alt={p.portfolioName}
                            width="100%"
                            aspect="4/3"
                            roundedClass="!rounded-3xl"
                            autoPlay
                            interval={5000}
                          />
                        </div>

                        {/* decorative corner dot */}
                        {/* <div className="!absolute -bottom-4 -right-4 !w-24 !h-24 !rounded-full !bg-[#FF5F1F]/10 !-z-10" /> */}
                      </div>
                    </div>

                    {/* ---------- TEXT CONTENT ---------- */}
                    <div className={isEven ? "lg:!order-2" : "lg:!order-1"}>
                      {/* tags */}
                      {tags.length > 0 && (
                        <div className="!flex !flex-wrap !gap-2 !mb-6">
                          {tags.slice(0, 3).map((tag, idx) => (
                            <span
                              key={idx}
                              className="!inline-flex !items-center !px-3 !py-1.5 !rounded-full !text-[10px] !font-bold !tracking-[0.15em] !uppercase !bg-[#0B0B0B] !text-white"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* title */}
                      <h3 className="!text-[#0B0B0B] !text-3xl lg:!text-4xl !font-black !tracking-tight !leading-[1.1] !mb-4">
                        <Link
                          href={`/project-list/${p._id}`}
                          className="hover:!text-[#FF5F1F] !transition-colors !duration-300"
                        >
                          {p.portfolioName}
                        </Link>
                      </h3>

                      {/* date */}
                      {p.portfolioDate && (
                        <div className="!flex !items-center !gap-2 !text-[#737373] !text-sm !font-medium !mb-6">
                          <FiCalendar size={14} className="!text-[#FF5F1F]" />
                          {formatDate(p.portfolioDate)}
                        </div>
                      )}

                      {/* orange divider */}
                      <div className="!w-16 !h-1 !bg-[#FF5F1F] !mb-6" />

                      {/* description */}
                      <p className="!text-[#404040] !text-base lg:!text-lg !leading-[1.75] !mb-8 !line-clamp-4">
                        {description}
                      </p>

                      {/* buttons */}
                      <div className="!flex !flex-wrap !items-center !gap-4">
                        <Link
                          href={`/project-list/${p._id}`}
                          className="!inline-flex !items-center !gap-3 !px-7 !py-4 !rounded-full !bg-[#0B0B0B] !text-white !font-bold !text-sm !tracking-wide hover:!bg-[#FF5F1F] !transition-all !duration-300 !shadow-[0_15px_40px_-15px_rgba(11,11,11,0.5)] hover:!shadow-[0_20px_50px_-15px_rgba(255,95,31,0.6)] hover:!-translate-y-0.5 group/btn"
                        >
                          View Project
                          <FiArrowUpRight
                            size={18}
                            className="group-hover/btn:!translate-x-0.5 group-hover/btn:!-translate-y-0.5 !transition-transform"
                          />
                        </Link>

                        {p.portfolioLink && (
                          <a
                            href={p.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="!inline-flex !items-center !gap-2 !px-6 !py-4 !rounded-full !text-[#0B0B0B] !font-bold !text-sm !tracking-wide !border-2 !border-[#0B0B0B]/10 hover:!border-[#FF5F1F] hover:!text-[#FF5F1F] !transition-all !duration-300"
                          >
                            Live Demo
                            <FiArrowRight size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* ---------- BOTTOM CTA ---------- */}
          {!loading && projects.length > 0 && (
            <div className="!mt-32 !text-center">
              <Link
                href="/project-grid"
                className="!inline-flex !items-center !gap-3 !px-8 !py-4 !rounded-full !bg-[#FF5F1F] !text-white !font-bold !tracking-wide hover:!bg-[#0B0B0B] !transition-all !duration-300 !shadow-[0_20px_60px_-15px_rgba(255,95,31,0.6)] hover:!-translate-y-1 group/cta"
              >
                View More Projects
                <FiArrowUpRight
                  size={20}
                  className="group-hover/cta:!translate-x-0.5 group-hover/cta:!-translate-y-0.5 !transition-transform"
                />
              </Link>
            </div>
          )}
        </div>
      </section>
    </RiddaLayout>
  );
};

export default ProjectListPage;