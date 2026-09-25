"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CTA = ({ extraClass }) => {
  const [isOpen, setIsOpen] = useState(false);
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
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );

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
    <section className="cta-area-two !relative !z-10  ">
      <div
        className={` !px-sm-0 !py-24 md:!py-32 !rounded-2xl !shadow-lg !text-center ${extraClass}`}
        style={{
          backgroundImage: "url(/assets/images/background/cta-bg-dots.png)",
          backgroundSize: "cover",
        }}
      >
        <h2 className="!text-3xl md:!text-4xl !font-bold !text-gray-900 !mb-4">
          Ready to Stop Blending In?{" "}
        </h2>
        <p className="!text-gray-600 mb-6  ">
          Whether you're starting from zero or scaling into new markets,
          ReCreators is the digital marketing agency that builds the whole
          story- under one roof, no plot holes.{" "}
        </p>
        <button onClick={() => setIsOpen(true)} className="theme-btn style-two">
Let's Talk        </button>
      </div>

      {/* Popup Modal */}
      {isOpen && (
        <div className="!fixed !inset-0 !mt-[40px] !z-50 !flex !items-center !justify-center !bg-black/50 !backdrop-blur-sm">
          <div className="!bg-white/95 !w-full! max-w-lg !rounded-2xl !shadow-2xl !p-8 !relative !animate-fadeIn !border !border-gray-100">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="!absolute !top-3 !border !border-yellow-400 !px-2 hover:!bg-yellow-400 !py-0 !rounded-full !bg-yellow-400 text-white !right-3   !transition"
            >
              ✕
            </button>

            {/* Modal Content */}
            <h3 className="!text-3xl !font-extrabold !text-gray-900 !mb-2 !text-center">
              Contact Us
            </h3>
            <p className="!text-gray-600 !mb-6 !text-center">
              Fill in the form below and we’ll get back to you shortly.
            </p>

            {/* Contact Form */}
            <form className="!space-y-5" onSubmit={handleSubmit}>
              <div className="!grid !grid-cols-2 !gap-4">
                <div>
                  <label className="!block !text-left !text-sm !font-medium !text-gray-700 !mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="!w-full !px-4 !py-3 !border !border-gray-200 !rounded-xl !shadow-sm focus:!ring-2 focus:!ring-gray-500 focus:!border-gray-900 !outline-none !transition"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div>
                  <label className="!block !text-left !text-sm !font-medium !text-gray-700 !mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    name="number"
                    className="!w-full !px-4 !py-3 !border !border-gray-200 !rounded-xl !shadow-sm focus:!ring-2 focus:!ring-gray-500 focus:!border-gray-900 !outline-none !transition"
                    placeholder="Your Phone"
                    required
                  />
                </div>
              </div>

              <div className="!grid !grid-cols-2 !gap-4">
                <div>
                  <label className="!block !text-left !text-sm !font-medium !text-gray-700 !mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="!w-full !px-4 !py-3 !border !border-gray-200 !rounded-xl !shadow-sm focus:!ring-2  focus:!ring-gray-500 focus:!border-gray-900 !outline-none !transition"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="!block !text-left !text-sm !font-medium !text-gray-700 !mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    className="!w-full !px-4 !py-3 !border !border-gray-200 !rounded-xl !shadow-sm focus:!ring-2  focus:!ring-gray-500 focus:!border-gray-900 !outline-none !transition"
                    placeholder="Subject"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="!block !text-left !text-sm !font-medium !text-gray-700 !mb-1">
                  Message
                </label>
                <textarea
                  rows="4"
                  name="message"
                  className="!w-full !px-4 !py-3 !border !border-gray-200 !rounded-xl !shadow-sm focus:!ring-2  focus:!ring-gray-500 focus:!border-gray-900 !outline-none !transition !resize-none"
                  placeholder="Write your message..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="theme-btn !w-full disabled:!opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* Small animation */}
      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default CTA;
