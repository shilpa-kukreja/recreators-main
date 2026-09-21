"use client";
import { useState, useRef, useEffect } from 'react';
import { FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize, FiArrowRight, FiArrowLeft } from 'react-icons/fi';

const AgencyVideoSection = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [activeTestimonial, setActiveTestimonial] = useState(0);

    const videoRef = useRef(null);
    const containerRef = useRef(null);
    const controlsTimeoutRef = useRef(null);

    const testimonials = [
        {
            name: "Sarah Johnson",
            position: "CEO, TechInnovate",
            content: "This agency transformed our brand identity completely. Their attention to detail and creative approach exceeded our expectations.",
            avatar: "/assets/video/ff.png"
        },
        {
            name: "Michael Chen",
            position: "Marketing Director, Nexus Inc.",
            content: "The video production quality is outstanding. They captured our vision perfectly and delivered beyond what we imagined.",
            avatar: "/assets/video/ff.png"
        },
        {
            name: "Elena Rodriguez",
            position: "Product Manager, Spark Solutions",
            content: "Working with this team was a game-changer for our product launch. Their strategic approach to visual storytelling made all the difference.",
            avatar: "/assets/video/ff.png"
        }
    ];

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const updateTime = () => setCurrentTime(video.currentTime);
        const updateDuration = () => setDuration(video.duration);

        video.addEventListener('timeupdate', updateTime);
        video.addEventListener('loadedmetadata', updateDuration);

        return () => {
            video.removeEventListener('timeupdate', updateTime);
            video.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);

    useEffect(() => {
        if (isPlaying) {
            hideControlsAfterDelay();
        }
    }, [isPlaying]);

    const togglePlay = () => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video) return;

        video.muted = !video.muted;
        setIsMuted(video.muted);
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current.requestFullscreen().catch(err => {
                console.log(`Error attempting to enable full-screen mode: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    const handleTimeChange = (e) => {
        const video = videoRef.current;
        if (!video) return;

        const newTime = parseFloat(e.target.value);
        video.currentTime = newTime;
        setCurrentTime(newTime);
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const hideControlsAfterDelay = () => {
        if (controlsTimeoutRef.current) {
            clearTimeout(controlsTimeoutRef.current);
        }

        controlsTimeoutRef.current = setTimeout(() => {
            setShowControls(false);
        }, 3000);
    };

    const showControlss = () => {
        setShowControls(true);
        if (isPlaying) {
            hideControlsAfterDelay();
        }
    };

    const nextTestimonial = () => {
        setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    return (
        <section className="!relative !py-20 !bg-gradient-to-br from-gray-900 to-black !overflow-hidden">
            <div className="!container !!mx-auto !px-4 !relative !z-10">
                <div className="!text-center !mb-16">
                    <h2 className="!text-4xl md:!text-5xl !font-bold !text-white !mb-6">
                        Our <span className="!text-blue-500">Creative</span> Journey
                    </h2>
                    <p className="!text-xl !text-gray-300 !max-w-3xl !mx-auto">
                        Discover how we transform ideas into captivating visual experiences that drive results and tell compelling stories.
                    </p>
                </div>

                <div className="!flex !flex-col lg:!flex-row !gap-12 !items-center">
                    {/* Video Player */}
                    <div className="!w-full lg:!w-2/3">
                        <div
                            ref={containerRef}
                            className="!relative !rounded-2xl !overflow-hidden !shadow-2xl !bg-gray-800 !aspect-video !group"
                            onMouseMove={showControlss}
                            onMouseLeave={() => {
                                if (isPlaying) {
                                    hideControlsAfterDelay();
                                }
                            }}
                        >
                            {/* Video element */}
                            <video
                                ref={videoRef}
                                className="!w-full !h-full !object-cover"
                                poster="/assets/video/view-allbanner.webp"
                                onClick={togglePlay}
                                muted={isMuted}
                                playsInline
                            >
                                <source src="/assets/video/about-us-video1.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>


                            {/* Overlay gradient */}
                            <div className="!absolute !inset-0 !bg-gradient-to-t from-black/70 to-transparent !opacity-80 group-hover:!opacity-100 !transition-opacity !duration-300"></div>

                            {/* Play button overlay */}
                            {!isPlaying && (
                                <div className="!absolute !inset-0 !flex !items-center !justify-center">
                                    <button
                                        onClick={togglePlay}
                                        className="!bg-blue-600 hover:!bg-blue-700 !text-white !p-6 !rounded-full !transition-all !duration-300 !transform hover:!scale-110"
                                    >
                                        <FiPlay size={40} />
                                    </button>
                                </div>
                            )}

                            {/* Video controls */}
                            <div
                                className={`!absolute !bottom-0 !left-0 !right-0 !p-6 !transition-opacity !duration-300 ${showControls ? '!opacity-100' : '!opacity-0'}`}
                            >
                                {/* Progress bar */}
                                <div className="!mb-4">
                                    <input
                                        type="range"
                                        min="0"
                                        max={duration}
                                        value={currentTime}
                                        onChange={handleTimeChange}
                                        className="!w-full !h-1.5 !bg-gray-600 !rounded-lg !appearance-none !cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500"
                                    />
                                </div>

                                <div className="!flex !items-center !justify-between">
                                    <div className="!flex !items-center !space-x-4">
                                        <button
                                            onClick={togglePlay}
                                            className="!text-white hover:!text-blue-400 !transition-colors"
                                        >
                                            {isPlaying ? <FiPause size={24} /> : <FiPlay size={24} />}
                                        </button>

                                        <button
                                            onClick={toggleMute}
                                            className="!text-white hover:!text-blue-400 !transition-colors"
                                        >
                                            {isMuted ? <FiVolumeX size={24} /> : <FiVolume2 size={24} />}
                                        </button>

                                        <div className="!text-white !text-sm">
                                            {formatTime(currentTime)} / {formatTime(duration)}
                                        </div>
                                    </div>

                                    <div className="!flex !items-center !space-x-4">
                                        <button
                                            onClick={toggleFullscreen}
                                            className="!text-white hover:!text-blue-400 !transition-colors"
                                        >
                                            <FiMaximize size={24} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Testimonials */}
                    <div className="!w-full lg:!w-1/3">
                        <div className="!bg-gray-800/50 !backdrop-blur-md !rounded-2xl !p-8 !border !border-gray-700/30">
                            <h3 className="text-2xl font-bold text-white mb-6">What Our Clients Say</h3>

                            <div className="!relative !h-64">
                                {testimonials.map((testimonial, index) => (
                                    <div
                                        key={index}
                                        className={`!absolute !inset-0 !transition-all !duration-500 !ease-in-out ${index === activeTestimonial
                                                ? '!opacity-100 !translate-y-0'
                                                : '!opacity-0 !translate-y-4 !pointer-events-none'
                                            }`}
                                    >
                                        <div className="!flex !flex-col !h-full">
                                            <div className="!flex !items-center !mb-6">
                                                <div className="!w-14 !h-14 !rounded-full !bg-gray-700 !overflow-hidden !mr-4">
                                                    <img
                                                        src={testimonial.avatar}
                                                        alt={testimonial.name}
                                                        className="!w-full !h-full !object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="!text-white !font-semibold">{testimonial.name}</h4>
                                                    <p className="!text-blue-400 !text-sm">{testimonial.position}</p>
                                                </div>
                                            </div>

                                            <div className="!flex-grow">
                                                <p className="!text-gray-300 !italic">"{testimonial.content}"</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="!flex !justify-between !items-center !!mt-6">
                                <button
                                    onClick={prevTestimonial}
                                    className="!p-3 !rounded-full !bg-gray-700/50 hover:!bg-blue-600 !transition-colors !text-white"
                                >
                                    <FiArrowLeft size={20} />
                                </button>

                                <div className="!flex !space-x-2">
                                    {testimonials.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setActiveTestimonial(index)}
                                            className={`!w-3 !h-3 !rounded-full !transition-all ${index === activeTestimonial ? '!bg-blue-500 !scale-125' : '!bg-gray-600'
                                                }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={nextTestimonial}
                                    className="!p-3 !rounded-full !bg-gray-700/50 hover:!bg-blue-600 !transition-colors !text-white"
                                >
                                    <FiArrowRight size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats section */}
                {/* <div className="!grid !grid-cols-1 md:!grid-cols-3 !gap-8 !mt-20">
          <div className="!text-center !p-6 !bg-gray-800/30 !backdrop-blur-md !rounded-xl !border !border-gray-700/30">
            <div className="!text-5xl !font-bold !text-blue-500 !mb-3">250+</div>
            <h3 className="!text-xl !font-semibold !text-white !mb-2">Projects Completed</h3>
            <p className="!text-gray-400">Successful campaigns delivered worldwide</p>
          </div>
          
          <div className="!text-center !p-6 !bg-gray-800/30 !backdrop-blur-md !rounded-xl !border !border-gray-700/30">
            <div className="!text-5xl !font-bold !text-blue-500 !mb-3">98%</div>
            <h3 className="!text-xl !font-semibold !text-white !mb-2">Client Satisfaction</h3>
            <p className="!text-gray-400">Clients who return for additional services</p>
          </div>
          
          <div className="!text-center !p-6 !bg-gray-800/30 !backdrop-blur-md !rounded-xl !border !border-gray-700/30">
            <div className="!text-5xl !font-bold !text-blue-500 !mb-3">15+</div>
            <h3 className="!text-xl !font-semibold !text-white !mb-2">Years Experience</h3>
            <p className="!text-gray-400">Delivering exceptional creative solutions</p>
          </div>
        </div> */}
            </div>

            {/* Background elements */}
            <div className="!absolute !top-0 !left-0 !w-full !h-full !z-0 !overflow-hidden">
                <div className="!absolute -top-24 -left-24 !w-96 !h-96 !bg-blue-500/10 !rounded-full !blur-3xl"></div>
                <div className="!absolute -bottom-24 -right-24 !w-96 !h-96 !bg-purple-500/10 !rounded-full !blur-3xl"></div>
            </div>
        </section>
    );
};

export default AgencyVideoSection;