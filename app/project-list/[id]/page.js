"use client";
import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import PageBanner from "@/components/PageBanner";
import RiddaLayout from "@/layout/RiddaLayout";
import PortfolioSlider from "@/components/PortfolioSlider";
import Link from "next/link";
import {
  FiArrowUpRight,
  FiArrowLeft,
  FiCalendar,
  FiExternalLink,
  FiShare2,
  FiCheck,
  FiChevronDown,
  FiStar,
  FiCheckCircle,
  FiAward,
} from "react-icons/fi";

const BACKEND = process.env.NEXT_PUBLIC_BACKEND_URL;

/* ============================================================
   SINGLE REVIEW — Hero testimonial (used when only 1 review)
============================================================ */
const SingleReview = ({ review, getClientImg }) => {
  return (
    <div className="!relative !bg-gradient-to-br !from-[#FAF8F3] !via-white !to-[#FAF8F3] !rounded-[2.5rem] !border !border-[#0B0B0B]/5 !shadow-[0_35px_90px_-45px_rgba(0,0,0,0.25)] !overflow-hidden">
      {/* top accent bar */}
      <div className="!absolute !top-0 !left-0 !right-0 !h-1 !bg-gradient-to-r !from-[#FF5F1F] !via-[#FF5F1F]/60 !to-transparent" />

      {/* giant background quote */}
      {/* <div className="!absolute !top-2 !right-6 lg:!right-12 !text-[#FF5F1F]/[0.07] !text-[220px] lg:!text-[320px] !font-black !leading-none !pointer-events-none !select-none">
        "
      </div> */}

      {/* glow */}
      <div className="!absolute -bottom-32 -left-32 !w-[350px] !h-[350px] !rounded-full !bg-[#FF5F1F]/10 !blur-[100px] !pointer-events-none" />

      <div className="!relative !p-8 sm:!p-12 lg:!p-16">
        <div className="!grid lg:!grid-cols-12 !gap-10 lg:!gap-14 !items-center">
          {/* LEFT — avatar + client info */}
          <div className="lg:!col-span-4 !flex flex-col !items-center lg:!items-start !text-center lg:!text-left">
            {/* avatar wrapper with ring */}
            <div className="!relative">
              <div className="!absolute -inset-2 !rounded-full !bg-gradient-to-br !from-[#FF5F1F] !to-[#FF5F1F]/30 !opacity-30 " />
              <div className="!relative !p-1 !rounded-full !bg-gradient-to-br !from-[#FF5F1F] !to-[#FF5F1F]/60">
                {review.clientImg ? (
                  <img
                    src={getClientImg(review.clientImg)}
                    alt={review.clientName}
                    className="!w-24 !h-24 lg:!w-28 lg:!h-28 !rounded-full !object-cover !border-4 !border-white !shadow-xl"
                  />
                ) : (
                  <div className="!w-24 !h-24 lg:!w-28 lg:!h-28 !rounded-full !bg-white !flex !items-center !justify-center !text-[#FF5F1F] !font-black !text-4xl !border-4 !border-white !shadow-xl">
                    {review.clientName?.charAt(0)?.toUpperCase() || "?"}
                  </div>
                )}
              </div>
              {/* verified tick */}
              <div className="!absolute !bottom-1 !right-1 !w-9 !h-9 !rounded-full !bg-[#0B0B0B] !border-4 !border-white !flex !items-center !justify-center !shadow-lg">
                <FiCheckCircle size={14} className="!text-[#FF5F1F]" />
              </div>
            </div>

            <div className="!mt-6">
              <div className="!font-black !text-[#0B0B0B] !text-xl lg:!text-2xl !tracking-tight">
                {review.clientName}
              </div>
              {review.clientRole && (
                <div className="!text-sm !text-[#737373] !font-semibold !mt-1">
                  {review.clientRole}
                </div>
              )}
              <div className="!inline-flex !items-center !gap-1.5 !mt-4 !px-3 !py-1.5 !rounded-full !bg-[#0B0B0B]/5 !text-[10px] !font-black !tracking-[0.15em] !uppercase !text-[#0B0B0B]/70">
                <FiAward size={12} className="!text-[#FF5F1F]" />
                Verified Client
              </div>
            </div>
          </div>

          {/* RIGHT — quote + stars */}
          <div className="lg:!col-span-8 lg:!pl-10 lg:!border-l lg:!border-[#0B0B0B]/8">
            {/* stars */}
            <div className="!flex !gap-1 !mb-6 !justify-center lg:!justify-start">
              {[1, 2, 3, 4, 5].map((n) => (
                <FiStar
                  key={n}
                  size={22}
                  className={
                    n <= (review.rating || 5)
                      ? "!text-[#FF5F1F] !fill-[#FF5F1F]"
                      : "!text-gray-200 !fill-gray-200"
                  }
                />
              ))}
              <span className="!ml-3 !text-sm !font-black !text-[#0B0B0B] !self-center">
                {(review.rating || 5).toFixed(1)}
                <span className="!text-[#737373] !font-bold"> / 5.0</span>
              </span>
            </div>

            <p className="!text-[#0B0B0B] !text-lg sm:!text-xl lg:!text-2xl !leading-[1.6] !font-medium !tracking-tight !italic">
              "{review.reviewText}"
            </p>

            {/* signature line */}
            <div className="!mt-8 !flex !items-center !gap-4 !justify-center lg:!justify-start">
              <div className="!h-px !w-12 !bg-[#FF5F1F]" />
              <span className="!text-[11px] !font-black !tracking-[0.25em] !uppercase !text-[#737373]">
                Client Feedback
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   REVIEW CARD — used for 2+ reviews
============================================================ */
const ReviewCard = ({ review, index, getClientImg }) => {
  return (
    <div className="!group !relative !bg-[#FAF8F3] !rounded-[2rem] !p-8 !border !border-[#0B0B0B]/5 !flex !flex-col !transition-all !duration-500 hover:!bg-white hover:!shadow-[0_30px_80px_-35px_rgba(0,0,0,0.3)] hover:!-translate-y-1.5">
      {/* top corner glow */}
      <div className="!absolute -top-10 -right-10 !w-32 !h-32 !rounded-full !bg-[#FF5F1F]/10 !blur-2xl !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-500 !pointer-events-none" />

      {/* index badge */}
      <div className="!absolute !top-5 !left-5 !w-8 !h-8 !rounded-full !bg-white !border !border-[#0B0B0B]/5 !flex !items-center !justify-center !text-[10px] !font-black !text-[#0B0B0B]/40">
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* quote mark */}
      <div className="!absolute !top-3 !right-6 !text-[#FF5F1F]/15 !text-[90px] !font-black !leading-none !pointer-events-none !select-none">
        "
      </div>

      {/* stars */}
      <div className="!flex !gap-0.5 !mb-5 !mt-6 !relative">
        {[1, 2, 3, 4, 5].map((n) => (
          <FiStar
            key={n}
            size={16}
            className={
              n <= (review.rating || 5)
                ? "!text-[#FF5F1F] !fill-[#FF5F1F]"
                : "!text-gray-200 !fill-gray-200"
            }
          />
        ))}
      </div>

      {/* review text */}
      <p className="!text-[#404040] !text-[15px] !leading-[1.8] !mb-8 !flex-1 !relative">
        "{review.reviewText}"
      </p>

      {/* client */}
      <div className="!flex !items-center !gap-4 !pt-6 !border-t !border-[#0B0B0B]/8">
        {review.clientImg ? (
          <img
            src={getClientImg(review.clientImg)}
            alt={review.clientName}
            className="!w-12 !h-12 !rounded-full !object-cover !border-2 !border-[#FF5F1F]/25 !flex-shrink-0"
          />
        ) : (
          <div className="!w-12 !h-12 !rounded-full !bg-gradient-to-br !from-[#FF5F1F] !to-[#FF5F1F]/70 !flex !items-center !justify-center !text-white !font-black !text-lg !flex-shrink-0">
            {review.clientName?.charAt(0)?.toUpperCase() || "?"}
          </div>
        )}
        <div className="!min-w-0 !flex-1">
          <div className="!flex !items-center !gap-1.5">
            <div className="!font-black !text-[#0B0B0B] !tracking-tight !truncate">
              {review.clientName}
            </div>
            <FiCheckCircle
              size={13}
              className="!text-[#FF5F1F] !flex-shrink-0"
            />
          </div>
          {review.clientRole && (
            <div className="!text-xs !text-[#737373] !font-medium !truncate !mt-0.5">
              {review.clientRole}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============================================================
   MAIN PAGE
============================================================ */
const ProjectDetailPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const contentRef = useRef(null);

  /* ---------------- data fetch ---------------- */
  useEffect(() => {
    if (!id) return;

    const fetchOne = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/portfolio/getportfolio/${id}`);
        const data = await res.json();
        setProject(data?.data || null);
      } catch (e) {
        console.error(e);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/portfolio/getportfolio`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.data;
        setRelated((list || []).filter((p) => p._id !== id).slice(0, 3));
      } catch (e) {
        console.error(e);
      }
    };

    fetchOne();
    fetchRelated();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  /* ---------------- scroll progress ---------------- */
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [project]);

  /* ---------------- helpers ---------------- */
  const getImages = (p) => {
    if (!p) return [];
    let imgs = [];
    if (Array.isArray(p.portfolioImgs) && p.portfolioImgs.length)
      imgs = p.portfolioImgs;
    else if (p.portfolioImg) imgs = [p.portfolioImg];
    return imgs.map((s) => (s.startsWith("http") ? s : `${BACKEND}${s}`));
  };

  const getClientImg = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${BACKEND}${path}`;
  };

  const formatDate = (d) => {
    if (!d) return "";
    try {
      return new Date(d).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return d;
    }
  };

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    try {
      if (navigator.share) {
        await navigator.share({
          title: project.portfolioName,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (e) {
      console.log(e);
    }
  };

  /* ---------------- loading ---------------- */
  if (loading) {
    return (
      <RiddaLayout>
        <PageBanner pageTitle="Project Details" pageName="Project Details" />
        <div className="!min-h-[60vh] !bg-[#FAF8F3] !flex !items-center !justify-center">
          <div className="!text-center">
            <div className="!relative !w-16 !h-16 !mx-auto !mb-6">
              <div className="!absolute !inset-0 !rounded-full !border-4 !border-[#FF5F1F]/20" />
              <div className="!absolute !inset-0 !rounded-full !border-4 !border-transparent !border-t-[#FF5F1F] !animate-spin" />
            </div>
            <p className="!text-[#0B0B0B]/60 !font-bold !tracking-[0.2em] !uppercase !text-xs">
              Loading Project
            </p>
          </div>
        </div>
      </RiddaLayout>
    );
  }

  /* ---------------- not found ---------------- */
  if (!project) {
    return (
      <RiddaLayout>
        <PageBanner pageTitle="Not Found" pageName="Not Found" />
        <div
          className="!absolute inset-0 !pointer-events-none !opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="!min-h-[60vh] !bg-[#FAF8F3] !flex !items-center !justify-center !px-6">
          <div className="!text-center !max-w-md">
            <div className="!text-[120px] !font-black !text-[#0B0B0B]/5 !leading-none !mb-2">
              404
            </div>
            <h1 className="!text-4xl !font-black !text-[#0B0B0B] !mb-4">
              Project not found
            </h1>
            <p className="!text-[#737373] !mb-8">
              The project you're looking for doesn't exist or was removed.
            </p>
            <Link
              href="/project-list"
              className="!inline-flex !items-center !gap-2 !px-6 !py-3 !rounded-full !bg-[#0B0B0B] !text-white !font-bold hover:!bg-[#FF5F1F] !transition-all"
            >
              <FiArrowLeft size={16} /> Back to Projects
            </Link>
          </div>
        </div>
      </RiddaLayout>
    );
  }

  const images = getImages(project);
  const tags =
    project.portfolioTags
      ?.split(",")
      .map((t) => t.trim())
      .filter(Boolean) || [];
  const reviews = Array.isArray(project.reviews) ? project.reviews : [];
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((s, r) => s + (r.rating || 5), 0) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <RiddaLayout>
      {/* ============ SCROLL PROGRESS BAR ============ */}
      <div
        className="!fixed !top-0 !left-0 !h-1 !bg-[#FF5F1F] !z-[999] !transition-[width] !duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* ============ HERO — PageBanner ============ */}
      <PageBanner
        pageTitle={project.portfolioName}
        pageName="Project Details"
      />

     
      {/* ============ FLOATING BACK + SHARE ============ */}
      <section className=" !pt-10 lg:!pt-14">
        <div className="container container-1290">
          <div className="!flex !items-center !justify-between !mb-10 lg:!mb-14">
            <Link
              href="/project-list"
              className="!inline-flex !items-center !gap-3 !text-[#0B0B0B] hover:!text-[#FF5F1F] !text-xs !font-black !tracking-[0.2em] !uppercase !transition-colors group/back"
            >
              <span className="!w-9 !h-9 !rounded-full !bg-white !flex !items-center !justify-center !shadow-md group-hover/back:!bg-[#FF5F1F] group-hover/back:!text-white !transition-all">
                <FiArrowLeft size={14} />
              </span>
              All Projects
            </Link>

            <button
              onClick={handleShare}
              className="!inline-flex !items-center !gap-3 !text-[#0B0B0B] hover:!text-[#FF5F1F] !text-xs !font-black !tracking-[0.2em] !uppercase !transition-colors group/share"
            >
              <span className="!w-9 !h-9 !rounded-full !bg-white !flex !items-center !justify-center !shadow-md group-hover/share:!bg-[#FF5F1F] group-hover/share:!text-white !transition-all">
                {copied ? <FiCheck size={14} /> : <FiShare2 size={14} />}
              </span>
              {copied ? "Copied!" : "Share"}
            </button>
          </div>
        </div>
      </section>

      {/* ============ HERO IMAGE + INFO GRID ============ */}
      <section className="!pb-20 lg:!pb-28">
        <div className="container container-1290">
          <div className="!grid !grid-cols-1 lg:!grid-cols-12 !gap-10 lg:!gap-14 !items-start">
            {/* ---- MAIN SLIDER (large) ---- */}
            <div className="lg:!col-span-8">
              <div className="!relative">
                {/* {tags.length > 0 && (
                  <div className="!absolute !top-5 !left-5 !z-20 !flex !flex-wrap !gap-2">
                    {tags.slice(0, 2).map((t, i) => (
                      <span
                        key={i}
                        className="!px-3 !py-1.5 !rounded-full !bg-white/95 !backdrop-blur-md !text-[#0B0B0B] !text-[10px] !font-black !tracking-[0.2em] !uppercase !shadow-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )} */}

                <PortfolioSlider
                  images={images}
                  alt={project.portfolioName}
                  width="100%"
                  aspect="16/10"
                  roundedClass="!rounded-[2rem]"
                  showThumbs={images.length > 1}
                  showCounter
                  autoPlay
                  interval={5500}
                />
              </div>
            </div>

            {/* ---- INFO CARD (sidebar) ---- */}
            <aside className="lg:!col-span-4">
              <div className="lg:!sticky lg:!top-28 !space-y-5">
                <div className="!bg-white !rounded-[2rem] !p-8 !shadow-[0_25px_70px_-30px_rgba(0,0,0,0.25)] !border !border-[#0B0B0B]/5 !relative !overflow-hidden">
                  {/* <div className="!absolute -top-8 -right-8 !w-32 !h-32 !rounded-full !bg-[#FF5F1F]/8 !pointer-events-none" /> */}

                  <div className="!relative">
                    <span className="!text-[#FF5F1F] !text-[10px] !font-black !tracking-[0.3em] !uppercase">
                      Project Info
                    </span>
                    <h2 className="!text-[#0B0B0B] !text-2xl lg:!text-3xl !font-black !tracking-tight !leading-tight !mt-3 !mb-6">
                      {project.portfolioName}
                    </h2>

                    <div className="!space-y-5">
                      <div className="!flex !items-start !gap-4 !pb-5 !border-b !border-[#0B0B0B]/5">
                        <div className="!w-10 !h-10 !rounded-xl !bg-[#FAF8F3] !flex !items-center !justify-center !flex-shrink-0">
                          <FiCalendar size={16} className="!text-[#FF5F1F]" />
                        </div>
                        <div>
                          <div className="!text-[#737373] !text-[10px] !font-black !tracking-[0.2em] !uppercase">
                            Delivered
                          </div>
                          <div className="!text-[#0B0B0B] !font-bold !mt-1">
                            {formatDate(project.portfolioDate)}
                          </div>
                        </div>
                      </div>

                      {tags.length > 0 && (
                        <div className="!flex !items-start !gap-4 !pb-5 !border-b !border-[#0B0B0B]/5">
                          <div className="!w-10 !h-10 !rounded-xl !bg-[#FAF8F3] !flex !items-center !justify-center !flex-shrink-0">
                            <span className="!text-[#FF5F1F] !font-black !text-xs">
                              #
                            </span>
                          </div>
                          <div className="!flex-1">
                            <div className="!text-[#737373] !text-[10px] !font-black !tracking-[0.2em] !uppercase !mb-2">
                              Services
                            </div>
                            <div className="!flex !flex-wrap !gap-1.5">
                              {tags.map((t, i) => (
                                <span
                                  key={i}
                                  className="!px-2.5 !py-1 !rounded-full !bg-[#FAF8F3] !text-[#0B0B0B] !text-[11px] !font-bold !border !border-[#0B0B0B]/5"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {reviews.length > 0 && (
                        <div className="!flex !items-start !gap-4 !pb-5 !border-b !border-[#0B0B0B]/5">
                          <div className="!w-10 !h-10 !rounded-xl !bg-[#FAF8F3] !flex !items-center !justify-center !flex-shrink-0">
                            <FiStar size={16} className="!text-[#FF5F1F]" />
                          </div>
                          <div>
                            <div className="!text-[#737373] !text-[10px] !font-black !tracking-[0.2em] !uppercase">
                              Client Rating
                            </div>
                            <div className="!flex !items-center !gap-2 !mt-1">
                              <span className="!text-[#0B0B0B] !font-bold">
                                {avgRating} / 5
                              </span>
                              <span className="!text-[#737373] !text-xs">
                                ({reviews.length} review
                                {reviews.length > 1 ? "s" : ""})
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* {images.length > 1 && (
                        <div className="!flex !items-start !gap-4">
                          <div className="!w-10 !h-10 !rounded-xl !bg-[#FAF8F3] !flex !items-center !justify-center !flex-shrink-0">
                            <span className="!text-[#FF5F1F] !font-black !text-xs">
                              ★
                            </span>
                          </div>
                          <div>
                            <div className="!text-[#737373] !text-[10px] !font-black !tracking-[0.2em] !uppercase">
                              Gallery
                            </div>
                            <div className="!text-[#0B0B0B] !font-bold !mt-1">
                              {images.length} Images
                            </div>
                          </div>
                        </div>
                      )} */}
                    </div>
                  </div>
                </div>

                {/* {project.portfolioLink && (
                  <a
                    href={project.portfolioLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="!group/live !block !relative !overflow-hidden !rounded-[2rem] !bg-[#0B0B0B] !p-6 !shadow-[0_25px_70px_-30px_rgba(11,11,11,0.5)] hover:!shadow-[0_30px_80px_-25px_rgba(255,95,31,0.6)] !transition-all !duration-500"
                  >
                    <div className="!absolute -top-10 -right-10 !w-40 !h-40 !rounded-full !bg-[#FF5F1F]/30 !blur-3xl !transition-all !duration-700 group-hover/live:!bg-[#FF5F1F]/50" />

                    <div className="!relative !flex !items-center !justify-between">
                      <div>
                        <div className="!text-[#FF5F1F] !text-[10px] !font-black !tracking-[0.25em] !uppercase !mb-2">
                          Live Project
                        </div>
                        <div className="!text-white !font-black !text-xl !tracking-tight">
                          Visit Website
                        </div>
                      </div>
                      <div className="!w-12 !h-12 !rounded-full !bg-[#FF5F1F] !flex !items-center !justify-center !text-white group-hover/live:!scale-110 group-hover/live:!rotate-12 !transition-all !duration-500">
                        <FiArrowUpRight size={20} />
                      </div>
                    </div>
                  </a>
                )} */}

                {/* {images.length > 1 && (
                  <div className="!bg-white !rounded-[2rem] !p-5 !shadow-[0_25px_70px_-30px_rgba(0,0,0,0.25)] !border !border-[#0B0B0B]/5">
                    <div className="!text-[#737373] !text-[10px] !font-black !tracking-[0.2em] !uppercase !mb-4 !px-1">
                      Gallery
                    </div>
                    <div className="!grid !grid-cols-3 !gap-2">
                      {images.slice(0, 6).map((src, i) => (
                        <div
                          key={i}
                          className="!relative !aspect-square !rounded-xl !overflow-hidden !bg-[#EFEBE3] !group !cursor-pointer"
                        >
                          <img
                            src={src}
                            alt={`gallery ${i + 1}`}
                            className="!w-full !h-full !object-cover !transition-transform !duration-500 group-hover:!scale-110"
                          />
                          {i === 5 && images.length > 6 && (
                            <div className="!absolute !inset-0 !bg-[#0B0B0B]/70 !flex !items-center !justify-center !text-white !font-black !text-sm">
                              +{images.length - 6}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )} */}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ============ STORY CONTENT ============ */}
      <section
        ref={contentRef}
        className="!bg-[#FAF8F3] !pb-14 !py-3 lg:!pb-16 !relative"
      >
        <div className="container container-1290">
          <div className="!max-w-4xl !mx-auto">
            <div className="!mb-14 !text-center">
              {/* <span className="!text-[#FF5F1F] !text-xs !font-black !tracking-[0.3em] !uppercase">
                The Story
              </span> */}
              <h2 className="!text-[#0B0B0B] !text-3xl lg:!text-5xl !font-black !tracking-tight !leading-[1.05] !mt-5">
                Project
                <span className="!text-[#FF5F1F]"> Overview</span>
              </h2>
              <div className="!w-16 !h-1 !bg-[#FF5F1F] !mx-auto !mt-8" />
            </div>

            <div
              className="!prose !prose-lg !max-w-none !text-[#404040] !leading-[1.85]
                [&_h1]:!text-[#0B0B0B] [&_h1]:!font-black [&_h1]:!tracking-tight [&_h1]:!text-4xl [&_h1]:!mt-14 [&_h1]:!mb-6
                [&_h2]:!text-[#0B0B0B] [&_h2]:!font-black [&_h2]:!tracking-tight [&_h2]:!text-3xl [&_h2]:!mt-12 [&_h2]:!mb-5
                [&_h3]:!text-[#0B0B0B] [&_h3]:!font-bold [&_h3]:!text-2xl [&_h3]:!mt-10 [&_h3]:!mb-4
                [&_h4]:!text-[#0B0B0B] [&_h4]:!font-bold [&_h4]:!text-xl [&_h4]:!mt-8
                [&_p]:!text-[#404040] [&_p]:!leading-[1.85] [&_p]:!mb-6 [&_p]:!text-[1.0625rem]
                [&_a]:!text-[#FF5F1F] [&_a]:!font-bold [&_a]:!no-underline [&_a]:!border-b-2 [&_a]:!border-[#FF5F1F]/30 hover:[&_a]:!border-[#FF5F1F] [&_a]:!transition-colors
                [&_ul]:!list-none [&_ul]:!pl-0 [&_ul]:!space-y-3 [&_ul]:!my-6
                [&_ul>li]:!relative [&_ul>li]:!pl-8 [&_ul>li]:!text-[#404040]
                [&_ul>li]:before:!content-[''] [&_ul>li]:before:!absolute [&_ul>li]:before:!left-0 [&_ul>li]:before:!top-[0.6em] [&_ul>li]:before:!w-3 [&_ul>li]:before:!h-3 [&_ul>li]:before:!rounded-full [&_ul>li]:before:!bg-[#FF5F1F]
                [&_ol]:!list-decimal [&_ol]:!pl-6 [&_ol]:!space-y-2 [&_ol>li]:!text-[#404040] [&_ol>li]:!pl-2 [&_ol>li]:marker:!text-[#FF5F1F] [&_ol>li]:marker:!font-black
                [&_blockquote]:!border-l-4 [&_blockquote]:!border-[#FF5F1F] [&_blockquote]:!bg-gradient-to-r [&_blockquote]:!from-[#FF5F1F]/8 [&_blockquote]:!to-transparent [&_blockquote]:!px-8 [&_blockquote]:!py-6 [&_blockquote]:!rounded-r-2xl [&_blockquote]:!my-8 [&_blockquote]:!text-[#0B0B0B] [&_blockquote]:!text-lg [&_blockquote]:!font-medium [&_blockquote]:!not-italic
                [&_img]:!rounded-3xl [&_img]:!my-10 [&_img]:!shadow-2xl
                [&_strong]:!text-[#0B0B0B] [&_strong]:!font-black
                [&_hr]:!border-[#0B0B0B]/10 [&_hr]:!my-12"
              dangerouslySetInnerHTML={{ __html: project.portfolioDetail || "" }}
            />

            <div className="!mt-20 !flex !items-center !justify-center !gap-4">
              <div className="!h-px !w-16 !bg-[#0B0B0B]/10" />
              <div className="!w-2 !h-2 !rounded-full !bg-[#FF5F1F]" />
              <div className="!h-px !w-16 !bg-[#0B0B0B]/10" />
            </div>

            <div className="!mt-14 !flex !flex-col sm:!flex-row !items-center !justify-center !gap-4">
              <span className="!text-[#737373] !text-xs !font-black !tracking-[0.2em] !uppercase">
                Share this project
              </span>
              <button
                onClick={handleShare}
                className="!inline-flex !items-center !gap-2 !px-6 !py-3 !rounded-full !bg-white !text-[#0B0B0B] !font-bold !text-sm !shadow-md hover:!bg-[#FF5F1F] hover:!text-white !transition-all !border !border-[#0B0B0B]/5 group/share2"
              >
                {copied ? (
                  <>
                    <FiCheck size={16} /> Link Copied
                  </>
                ) : (
                  <>
                    <FiShare2 size={16} /> Copy Link
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CLIENT REVIEWS (ADAPTIVE) ============ */}
      {reviews.length > 0 && (
        <section className="!bg-white !py-10 lg:!py-14 !relative !overflow-hidden">
          {/* soft glows */}
          {/* <div className="!absolute -top-32 right-0 !w-[400px] !h-[400px] !rounded-full !bg-[#FF5F1F]/8 !blur-[120px] !pointer-events-none" />
          <div className="!absolute bottom-0 left-0 !w-[350px] !h-[350px] !rounded-full !bg-[#FF5F1F]/6 !blur-[110px] !pointer-events-none" /> */}

          {/* giant background text */}
          {/* <div className="!absolute top-8 left-1/2 -translate-x-1/2 !text-[14vw] !font-black !text-[#0B0B0B]/[0.02] !leading-none !tracking-tighter !pointer-events-none !select-none !whitespace-nowrap">
            TESTIMONIALS
          </div> */}

          <div className="container container-1290 !relative">
            {/* header row — centered */}
            <div className="!text-center !mb-16">
              <span className="!text-[#FF5F1F] !text-xs !font-black !tracking-[0.3em] !uppercase">
                Client Reviews
              </span>
              <h2 className="!text-[#0B0B0B] !text-3xl lg:!text-5xl !font-black !tracking-tight !leading-[1.05] !mt-4">
                What our clients
                <br />
                <span className="!text-[#FF5F1F]">say about us</span>
              </h2>
              {/* <div className="!w-16 !h-1 !bg-[#FF5F1F] !mx-auto !mt-8" /> */}
            </div>

            {/* ADAPTIVE LAYOUT */}
            {reviews.length === 1 ? (
              <SingleReview
                review={reviews[0]}
                getClientImg={getClientImg}
              />
            ) : (
              <>
                {/* aggregate rating strip (only when 2+) */}
                <div className="!flex !justify-center !mb-12">
                  <div className="!inline-flex !items-center !gap-5 !bg-[#FAF8F3] !rounded-3xl !px-7 !py-5 !border !border-[#0B0B0B]/5">
                    <div className="!text-4xl lg:!text-5xl !font-black !text-[#0B0B0B] !tracking-tighter !leading-none">
                      {avgRating}
                    </div>
                    {/* <div className="!h-10 !w-px !bg-[#0B0B0B]/10" /> */}
                    <div>
                      <div className="!flex !gap-0.5 !mb-1.5">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <FiStar
                            key={n}
                            size={16}
                            className={
                              n <= Math.round(Number(avgRating))
                                ? "!text-[#FF5F1F] !fill-[#FF5F1F]"
                                : "!text-gray-300 !fill-gray-300"
                            }
                          />
                        ))}
                      </div>
                      <div className="!text-[#737373] !text-[11px] !font-black !tracking-[0.2em] !uppercase">
                        {reviews.length} Review{reviews.length > 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>
                </div>

                {/* cards grid */}
                <div
                  className={`!grid !gap-6 ${
                    reviews.length === 2
                      ? "!grid-cols-1 md:!grid-cols-2"
                      : "!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3"
                  }`}
                >
                  {reviews.map((r, i) => (
                    <ReviewCard
                      key={r._id || i}
                      review={r}
                      index={i}
                      getClientImg={getClientImg}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ============ RELATED PROJECTS ============ */}
      {related.length > 0 && (
        <section className="!bg-[#FAF8F3] !pb-12 lg:!pb-16 !relative !overflow-hidden">
          {/* <div className="!absolute top-10 left-1/2 -translate-x-1/2 !text-[15vw] !font-black !text-[#0B0B0B]/[0.02] !leading-none !tracking-tighter !pointer-events-none !select-none !whitespace-nowrap">
            MORE WORK
          </div> */}

          <div className="container container-1290 !relative">
            <div className="!flex !items-end !justify-between !mb-16 !flex-wrap !gap-6 !border-t !border-[#0B0B0B]/10 !pt-16">
              <div>
                <span className="!text-[#FF5F1F] !text-xs !font-black !tracking-[0.3em] !uppercase">
                  Keep Exploring
                </span>
                <h2 className="!text-[#0B0B0B] !text-3xl lg:!text-4xl !font-black !tracking-tight !mt-3">
                  More Projects
                </h2>
              </div>
              <Link
                href="/project-list"
                className="!inline-flex !items-center !gap-3 !text-[#0B0B0B] hover:!text-[#FF5F1F] !font-black !tracking-[0.15em] !uppercase !text-xs !transition-colors group/viewall"
              >
                View All
                <span className="!w-9 !h-9 !rounded-full !bg-white !flex !items-center !justify-center !shadow-md group-hover/viewall:!bg-[#FF5F1F] group-hover/viewall:!text-white !transition-all">
                  <FiArrowUpRight size={14} />
                </span>
              </Link>
            </div>

            <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8">
              {related.map((r, i) => {
                const imgs = getImages(r);
                const rTags =
                  r.portfolioTags
                    ?.split(",")
                    .map((t) => t.trim())
                    .filter(Boolean)
                    .slice(0, 2) || [];

                return (
                  <Link
                    key={r._id}
                    href={`/project-details/${r._id}`}
                    className="!group !block"
                  >
                    <div className="!relative !aspect-[4/3] !rounded-3xl !overflow-hidden !bg-[#EFEBE3] !shadow-lg !group-hover:!shadow-2xl !transition-all !duration-500">
                      {imgs[0] && (
                        <img
                          src={imgs[0]}
                          alt={r.portfolioName}
                          className="!w-full !h-full !object-cover !transition-transform !duration-700 group-hover:!scale-110"
                        />
                      )}

                      <div className="!absolute !inset-0 !bg-gradient-to-t !from-[#0B0B0B]/90 !via-[#0B0B0B]/30 !to-transparent !opacity-0 group-hover:!opacity-100 !transition-all !duration-500" />

                      {/* <div className="!absolute !top-4 !left-4 !w-10 !h-10 !rounded-full !bg-white/95 !backdrop-blur-md !flex !items-center !justify-center !font-black !text-[#0B0B0B] !text-sm !shadow-md">
                        {String(i + 1).padStart(2, "0")}
                      </div> */}

                      {rTags.length > 0 && (
                        <div className="!absolute !top-4 !right-4 !flex !gap-1.5 !translate-y-2 group-hover:!translate-y-0 !opacity-0 group-hover:!opacity-100 !transition-all !duration-500">
                          {rTags.map((t, idx) => (
                            <span
                              key={idx}
                              className="!px-2.5 !py-1 !rounded-full !bg-white/20 !backdrop-blur-md !border !border-white/20 !text-white !text-[9px] !font-black !tracking-wider !uppercase"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="!absolute !bottom-6 !right-6 !w-14 !h-14 !rounded-full !bg-[#FF5F1F] !text-white !flex !items-center !justify-center !opacity-0 group-hover:!opacity-100 !scale-75 group-hover:!scale-100 !transition-all !duration-500 !rotate-0 group-hover:!-rotate-12">
                        <FiArrowUpRight size={22} />
                      </div>

                      <div className="!absolute !bottom-6 !left-6 !right-24 !translate-y-4 group-hover:!translate-y-0 !opacity-0 group-hover:!opacity-100 !transition-all !duration-500">
                        <h3 className="!text-white !text-xl !font-black !tracking-tight !leading-tight !line-clamp-2">
                          {r.portfolioName}
                        </h3>
                        <div className="!text-white/70 !text-xs !font-bold !mt-1">
                          {formatDate(r.portfolioDate)}
                        </div>
                      </div>
                    </div>

                    <div className="!mt-5 group-hover:!opacity-0 !transition-opacity !duration-300">
                      <h3 className="!text-2xl !font-black !text-[#0B0B0B] !tracking-tight !leading-tight">
                        {r.portfolioName}
                      </h3>
                      <div className="!mt-1 !text-sm !text-[#737373] !font-medium">
                        {formatDate(r.portfolioDate)}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============ CTA ============ */}
      <section className="!bg-[#0B0B0B] !py-10 lg:!py-10 !relative !overflow-hidden">
        <div
          className="!absolute inset-0 !opacity-[0.06] !pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* <div className="!absolute -top-40 -left-40 !w-[500px] !h-[500px] !rounded-full !bg-[#FF5F1F]/20 !blur-[120px] !pointer-events-none" />
        <div className="!absolute -bottom-40 -right-40 !w-[400px] !h-[400px] !rounded-full !bg-[#FF5F1F]/15 !blur-[120px] !pointer-events-none" /> */}

        <div className="container container-1290 !relative !text-center">
          <span className="!text-[#FF5F1F] !text-xs !font-black !tracking-[0.35em] !uppercase !mb-4 !inline-block">
            Let's Work Together
          </span>
          <h2 className="!text-white !text-4xl lg:!text-5xl !font-black !tracking-tight !leading-[1.02] !mb-8 !max-w-4xl !mx-auto">
            Got a project
            <span className="!text-[#FF5F1F]"> in mind?</span>
          </h2>
          <p className="!text-white/60 !text-lg lg:!text-xl !max-w-xl !mx-auto !mb-6 !leading-relaxed">
            Let's build something unforgettable together. No plot holes, no
            loose ends — just work that gets remembered.
          </p>

          <div className="!flex !flex-col sm:!flex-row !items-center !justify-center !gap-4">
            <Link
              href="/contact"
              className="!inline-flex !items-center !gap-3 !px-9 !py-4 !rounded-full !bg-[#FF5F1F] !text-white !font-black !tracking-wide hover:!bg-white hover:!text-[#0B0B0B] !transition-all !duration-300  hover:!-translate-y-1 group/cta"
            >
              Start Your Project
              <FiArrowUpRight
                size={20}
                className="group-hover/cta:!translate-x-0.5 group-hover/cta:!-translate-y-0.5 !transition-transform"
              />
            </Link>
            <Link
              href="/project-list"
              className="!inline-flex !items-center !gap-3 !px-9 !py-4 !rounded-full !bg-white/5 !backdrop-blur-md !border !border-white/15 !text-white !font-bold !tracking-wide hover:!bg-white/10 hover:!border-[#FF5F1F] !transition-all !duration-300"
            >
              View All Projects
            </Link>
          </div>
        </div>
      </section>
    </RiddaLayout>
  );
};

export default ProjectDetailPage;