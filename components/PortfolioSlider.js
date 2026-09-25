"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function PortfolioSlider({
  images = [],
  alt = "portfolio image",
  autoPlay = true,
  interval = 4500,
  width = "100%",
  aspect = "4/3",
  roundedClass = "!rounded-3xl",
  showThumbs = false,
  showCounter = true,
  className = "",
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);
  const count = images.length;

  const go = useCallback(
    (i) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (!autoPlay || count <= 1 || paused) return;
    const id = setInterval(() => setIndex((p) => (p + 1) % count), interval);
    return () => clearInterval(id);
  }, [autoPlay, count, interval, paused]);

  useEffect(() => {
    setIndex(0);
  }, [count]);

  if (!count) {
    return (
      <div
        className={`!bg-[#F1EEE8] !flex !items-center !justify-center !text-gray-400 ${roundedClass} ${className}`}
        style={{ width, aspectRatio: aspect }}
      >
        No image
      </div>
    );
  }

  const onTouchStart = (e) => (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <div
      className={`!group/slider !relative ${className}`}
      style={{ width, maxWidth: "100%" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={`!relative !overflow-hidden ${roundedClass} !bg-[#F1EEE8] !shadow-[0_20px_60px_-20px_rgba(0,0,0,0.3)]`}
        style={{ width: "100%", aspectRatio: aspect }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="!flex !h-full !w-full !transition-transform !duration-700 !ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((src, i) => (
            <div key={i} className="!relative !h-full !w-full !flex-shrink-0">
              <img
                src={src}
                alt={`${alt} ${i + 1}`}
                draggable={false}
                className="!block !h-full !w-full !object-cover !select-none !transition-transform !duration-700 group-hover/slider:!scale-[1.04]"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  maxWidth: "100%",
                }}
              />
            </div>
          ))}
        </div>

        {count > 1 && (
          <div className="!pointer-events-none !absolute !inset-x-0 !bottom-0 !h-32 !bg-gradient-to-t !from-black/45 !to-transparent" />
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous"
              className="!absolute !left-4 !top-1/2 !-translate-y-1/2 !rounded-full !bg-white/95 !p-3 !text-[#0B0B0B] !shadow-xl !backdrop-blur-sm !transition-all hover:!bg-[#FF5F1F] hover:!text-white hover:!scale-110 !opacity-0 group-hover/slider:!opacity-100"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                next();
              }}
              aria-label="Next"
              className="!absolute !right-4 !top-1/2 !-translate-y-1/2 !rounded-full !bg-white/95 !p-3 !text-[#0B0B0B] !shadow-xl !backdrop-blur-sm !transition-all hover:!bg-[#FF5F1F] hover:!text-white hover:!scale-110 !opacity-0 group-hover/slider:!opacity-100"
            >
              <FiChevronRight size={20} />
            </button>
          </>
        )}

        {count > 1 && showCounter && (
          <div className="!absolute !right-4 !top-4 !rounded-full !bg-white/95 !backdrop-blur-md !px-4 !py-1.5 !text-xs !font-bold !tracking-wider !text-[#0B0B0B]">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(count).padStart(2, "0")}
          </div>
        )}

        {count > 1 && (
          <div className="!absolute !inset-x-0 !bottom-4 !flex !items-center !justify-center !gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  go(i);
                }}
                aria-label={`Go to ${i + 1}`}
                className={`!h-1.5 !rounded-full !transition-all !duration-300 ${
                  i === index
                    ? "!w-8 !bg-[#FF5F1F]"
                    : "!w-1.5 !bg-white/70 hover:!bg-white"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {count > 1 && showThumbs && (
        <div className="!mt-4 !flex !gap-3 !overflow-x-auto !pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                go(i);
              }}
              className={`!relative !h-20 !w-24 !flex-shrink-0 !overflow-hidden !rounded-xl !border-2 !transition-all ${
                i === index
                  ? "!border-[#FF5F1F] !scale-105"
                  : "!border-transparent !opacity-60 hover:!opacity-100"
              }`}
            >
              <img
                src={src}
                alt={`thumb ${i + 1}`}
                className="!h-full !w-full !object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}