// "use client";

// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FiCheck, FiCreditCard, FiChevronDown, FiLock, FiPercent,FiRupeeSign, FiDollarSign, FiUser, FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
// import RiddaLayout from "@/layout/RiddaLayout";
// import PageBanner from "@/components/PageBanner";
// import axios from "axios";

// export default function PayNowPage() {
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     service: "branding",
//     amount: "",
//     coupon: "",
//     paymentMethod: "card",
//   });
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [error, setError] = useState("");
//   const [couponApplied, setCouponApplied] = useState(false);

//   const services = [
//     { id: "branding", label: "Branding Package", price: 1200 },
//     { id: "website", label: "Website Design", price: 2400 },
//     { id: "seo", label: "SEO & Growth", price: 900 },
//     { id: "ads", label: "Ads Management", price: 700 },
//   ];

//   function updateField(k, v) {
//     setForm((prev) => ({ ...prev, [k]: v }));
//   }

//   function prefillAmount(serviceId) {
//     const s = services.find((x) => x.id === serviceId);
//     if (s) updateField("amount", s.price);
//   }

//   React.useEffect(() => {
//   const script = document.createElement("script");
//   script.src = "https://checkout.razorpay.com/v1/checkout.js";
//   script.async = true;
//   document.body.appendChild(script);
// }, []);


//   function validate() {
//     if (!form.name.trim()) return "Please enter your full name.";
//     if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return "Please enter a valid email.";
//     if (!form.phone.match(/^[0-9+\-\s]{7,20}$/)) return "Please enter a valid phone number.";
//     if (!form.amount || Number(form.amount) <= 0) return "Please set a valid amount.";
//     return "";
//   }

//   function applyCoupon() {
//     if (!form.coupon) return setError("Enter a coupon to apply.");
//     if (form.coupon.toUpperCase() === "NEWCLIENT10") {
//       const newAmount = (Number(form.amount) * 0.9).toFixed(2);
//       updateField("amount", newAmount);
//       setError("");
//       setCouponApplied(true);
//     } else {
//       setError("Invalid coupon code.");
//     }
//   }

//   function removeCoupon() {
//     const originalAmount = services.find(s => s.id === form.service)?.price || "";
//     updateField("amount", originalAmount);
//     updateField("coupon", "");
//     setCouponApplied(false);
//   }

//  const handleSubmit = async (e) => {
//   e.preventDefault();
//   setError("");
//   const v = validate();
//   if (v) return setError(v);

//   try {
//     // 1. Create order
//     const { data: order } = await axios.post("https://recreators.onrender.com/api/payment/order", {
//       amount: form.amount,
//       currency: "INR",
//     });

//     // 2. Open Razorpay Checkout
//     const options = {
//       key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Ridda Agency",
//       description: form.service,
//       order_id: order.id,
//       handler: async function (response) {
//         // 3. Verify & store payment
//         const verifyRes = await axios.post("https://recreators.onrender.com/api/payment/verify", {
//           ...response,
//           form,
//         });
//         if (verifyRes.data.success) {
//           setSuccess(true);
//           setForm({});
//         } else {
//           setError("Payment verification failed.");
//         }
//       },
//       prefill: {
//         name: form.name,
//         email: form.email,
//         contact: form.phone,
//       },
//       theme: { color: "#3399cc" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err) {
//     setError("Payment initiation failed");
//   }
// }


//   return (
//     <RiddaLayout>
//       <PageBanner pageTitle="Pay Now" pageName="Pay Now" />
//     <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-slate-100 !flex !items-center !justify-center !p-4 md:!p-6">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         className="!max-w-6xl !w-full !bg-white !rounded-2xl !shadow-xl !overflow-hidden !grid !grid-cols-1 md:!grid-cols-2 !border !border-gray-100"
//       >
//         {/* LEFT - Image & Benefits */}
//         <div className="!relative !hidden md:!flex !flex-col !justify-between !p-10 !bg-gradient-to-br from-slate-900 to-slate-800 !text-white">
//           <div className="!absolute !inset-0 !bg-[url('/assets/images/banner/pay-now.jpg')]  bg-cover bg-center mix-blend-overlay opacity-20" />
          
//           <div className="!relative !z-10">
//             <div className="!flex !items-center  !gap-2 !mb-4">
//               <div className="!w-8 !h-8 !rounded-lg !bg-yellow-500 !flex !items-center !justify-center">
//                 <FiCreditCard className="!text-white" size={20} />
//               </div>
//               <h1 className="!text-3xl !text-white !font-bold">Secure Payment</h1>
//             </div>
//             <p className="!text-slate-200 !text-lg !mt-2">
//               Complete your purchase with confidence through our encrypted payment gateway
//             </p>
//           </div>
          
//           <div className="!relative !z-10 !mt-8">
//             <h3 className="!text-xl !font-semibold !text-white !mb-6 !border-b !border-slate-700 !pb-2">Why choose us?</h3>
            
//             <ul className="!space-y-5">
//               <motion.li 
//                 className="!flex !items-start !gap-4"
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.2 }}
//               >
//                 <span className="!bg-white/10 !p-2 !rounded-lg !mt-0.5 !flex-shrink-0">
//                   <FiCheck className="!text-white" size={18} />
//                 </span>
//                 <div>
//                   <span className="!font-medium !text-lg">Bank-level security</span>
//                   <p className="!text-sm !text-slate-300 !mt-1">All transactions are encrypted with 256-bit SSL security</p>
//                 </div>
//               </motion.li>
              
//               <motion.li 
//                 className="!flex !items-start !gap-4"
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.3 }}
//               >
//                 <span className="!bg-white/10 !p-2 !rounded-lg !mt-0.5 !flex-shrink-0">
//                   <FiCheck className="!text-white" size={18} />
//                 </span>
//                 <div>
//                   <span className="!font-medium !text-lg">Instant confirmation</span>
//                   <p className="!text-sm !text-slate-300 !mt-1">Receive immediate payment confirmation with detailed receipt</p>
//                 </div>
//               </motion.li>
              
//               <motion.li 
//                 className="!flex !items-start !gap-4"
//                 initial={{ opacity: 0, x: -10 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 transition={{ delay: 0.4 }}
//               >
//                 <span className="!bg-white/10 !p-2 !rounded-lg !mt-0.5 !flex-shrink-0">
//                   <FiCheck className="!text-white" size={18} />
//                 </span>
//                 <div>
//                   <span className="!font-medium !text-lg">Dedicated support</span>
//                   <p className="!text-sm !text-slate-300 !mt-1">Our team is here to help you 24/7 with any inquiries</p>
//                 </div>
//               </motion.li>
//             </ul>
//           </div>
          
//           <div className="!relative !z-10 !flex !items-center !gap-3 !text-sm !text-slate-300 !mt-8 !pt-6 !border-t !border-slate-700">
//             <div className="!flex !items-center !gap-2">
//               <FiLock size={16} />
//               <span>PCI DSS Compliant</span>
//             </div>
//             <div className="!w-1 !h-1 !rounded-full !bg-slate-600"></div>
//             <span>256-bit SSL Encryption</span>
//           </div>
//         </div>

//         {/* RIGHT - Form */}
//         <div className="!p-6 md:!p-8 lg:!p-10">
//           <div className="!max-w-md !mx-auto">
//             <div className="!flex !items-center !justify-between !mb-8">
//               <div>
//                 <h2 className="!text-2xl !font-bold !text-slate-800">Complete Payment</h2>
//                 <p className="!text-sm !text-slate-500 !mt-1">
//                   Enter your details to process payment securely
//                 </p>
//               </div>
//               <div className="!flex !items-center !gap-2 !text-xs !text-slate-600 !bg-slate-100 !px-3 !py-1.5 !rounded-full">
//                 <FiLock size={12} /> <span>Secure</span>
//               </div>
//             </div>

//             <form className="!space-y-6" onSubmit={handleSubmit}>
//               {/* Name */}
//               <div>
//                 <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Full name</label>
//                 <div className="!relative">
//                   <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
//                     <FiUser className="!h-5 !w-5 !text-slate-400" />
//                   </div>
//                   <input
//                     value={form.name}
//                     onChange={(e) => updateField("name", e.target.value)}
//                     className="!block !w-full !pl-10 !pr-4 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-100 !transition-colors !duration-200"
//                     placeholder="Alex Johnson"
//                   />
//                 </div>
//               </div>

//               {/* Email + Phone */}
//               <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-4">
//                 <div>
//                   <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Email</label>
//                   <div className="!relative">
//                     <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
//                       <FiMail className="!h-5 !w-5 !text-slate-400" />
//                     </div>
//                     <input
//                       value={form.email}
//                       onChange={(e) => updateField("email", e.target.value)}
//                       className="!block !w-full !pl-10 !pr-4 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-100 !transition-colors !duration-200"
//                       placeholder="you@company.com"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Phone</label>
//                   <div className="!relative">
//                     <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
//                       <FiPhone className="!h-5 !w-5 !text-slate-400" />
//                     </div>
//                     <input
//                       value={form.phone}
//                       onChange={(e) => updateField("phone", e.target.value)}
//                       className="!block !w-full !pl-10 !pr-4 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-100 !transition-colors !duration-200"
//                       placeholder="+91 98765 43210"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Service */}
//               <div>
//                 <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Select service</label>
//                 <div className="!relative">
//                   <select
//                     value={form.service}
//                     onChange={(e) => {
//                       updateField("service", e.target.value);
//                       prefillAmount(e.target.value);
//                       if (couponApplied) removeCoupon();
//                     }}
//                     className="!appearance-none !w-full !rounded-lg !border !border-slate-200 !px-4 !py-3 !pr-10 focus:!outline-none focus:!ring-2 focus:!ring-blue-100 focus:!border-blue-500 !transition-colors !duration-200 !bg-white"
//                   >
//                     {services.map((s) => (
//                       <option key={s.id} value={s.id}>
//                         {s.label} — ₹{s.price}
//                       </option>
//                     ))}
//                   </select>
//                   <FiChevronDown className="!pointer-events-none !absolute !right-3 !top-3.5 !text-slate-400" />
//                 </div>
//               </div>

//               {/* Amount + Coupon */}
//               <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-4">
//                 <div>
//                   <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Amount (USD)</label>
//                   <div className="!relative">
//                     <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
//                      <span className="text-slate-400">₹</span>

//                     </div>
//                     <input
//                       type="number"
//                       value={form.amount}
//                       onChange={(e) => updateField("amount", e.target.value)}
//                       className="!block !w-full !pl-10 !pr-4 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-100 !transition-colors !duration-200"
//                       placeholder="0"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">
//                     {couponApplied ? "Coupon applied" : "Coupon code"}
//                     {couponApplied && (
//                       <span className="!text-xs !text-green-600 !ml-2 !font-normal">10% discount</span>
//                     )}
//                   </label>
//                   <div className="!flex !gap-2">
//                     <div className="!relative !flex-1">
//                       <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
//                         <FiPercent className="!h-5 !w-5 !text-slate-400" />
//                       </div>
//                       <input
//                         value={form.coupon}
//                         onChange={(e) => updateField("coupon", e.target.value)}
//                         className="!block !w-full !pl-10 !pr-20 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:ring-blue-100 !transition-colors !duration-200"
//                         placeholder="NEWCLIENT10"
//                         disabled={couponApplied}
//                       />
//                       {couponApplied && (
//                         <button
//                           type="button"
//                           onClick={removeCoupon}
//                           className="!absolute !inset-y-0 !right-0 !pr-3 !flex !items-center !text-sm !text-red-500 hover:!text-red-700 !font-medium"
//                         >
//                           Remove
//                         </button>
//                       )}
//                     </div>
//                     {!couponApplied && (
//                       <button
//                         type="button"
//                         onClick={applyCoupon}
//                         className="!px-4 !py-3 rounded-lg !bg-slate-100 !text-slate-700 hover:!bg-slate-200 !transition-colors !duration-200 !font-medium"
//                       >
//                         Apply
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>

//               {/* Payment Method */}
//               <div>
//                 <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Payment method</label>
//                 <div className="!grid !grid-cols-2 !gap-3">
//                   <label
//                     className={`!relative !flex !flex-col !p-4 !border !rounded-xl !cursor-pointer !transition-all !duration-200 ${
//                       form.paymentMethod === "card"
//                         ? "!border-blue-500 !bg-blue-50 !shadow-sm"
//                         : "!border-slate-200 hover:!border-slate-300"
//                     }`}
//                   >
//                     <input
//                       className="sr-only"
//                       type="radio"
//                       name="pm"
//                       checked={form.paymentMethod === "card"}
//                       onChange={() => updateField("paymentMethod", "card")}
//                     />
//                     <div className="!flex !items-center !gap-2">
//                       <div className={`!w-5 !h-5 !rounded-full !border !flex !items-center !justify-center !transition-all !duration-200 ${
//                         form.paymentMethod === "card" 
//                           ? "!border-blue-500 !bg-blue-500" 
//                           : "!border-slate-300"
//                       }`}>
//                         {form.paymentMethod === "card" && (
//                           <div className="!w-2 !h-2 !rounded-full !bg-white"></div>
//                         )}
//                       </div>
//                       <span className="!font-medium">Card</span>
//                     </div>
//                     <span className="!text-xs !text-slate-500 !mt-2">Credit/Debit card</span>
//                   </label>

//                   <label
//                     className={`!relative !flex !flex-col !p-4 !border !rounded-xl !cursor-pointer !transition-all !duration-200 ${
//                       form.paymentMethod === "upi"
//                         ? "!border-blue-500 !bg-blue-50 !shadow-sm"
//                         : "!border-slate-200 hover:!border-slate-300"
//                     }`}
//                   >
//                     <input
//                       className="sr-only"
//                       type="radio"
//                       name="pm"
//                       checked={form.paymentMethod === "upi"}
//                       onChange={() => updateField("paymentMethod", "upi")}
//                     />
//                     <div className="!flex !items-center !gap-2">
//                       <div className={`!w-5 !h-5 !rounded-full !border !flex !items-center !justify-center !transition-all !duration-200 ${
//                         form.paymentMethod === "upi" 
//                           ? "!border-blue-500 !bg-blue-500" 
//                           : "!border-slate-300"
//                       }`}>
//                         {form.paymentMethod === "upi" && (
//                           <div className="!w-2 !h-2 !rounded-full !bg-white"></div>
//                         )}
//                       </div>
//                       <span className="font-medium">UPI</span>
//                     </div>
//                     <span className="!text-xs !text-slate-500 !mt-2">Pay via UPI</span>
//                   </label>
//                 </div>
//               </div>

//               {error && (
//                 <motion.div 
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className="!p-3 !bg-red-50 !border !border-red-200 !rounded-lg"
//                 >
//                   <p className="!text-sm !text-red-600">{error}</p>
//                 </motion.div>
//               )}

//               <div className="!pt-2">
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="!w-full !flex !items-center !justify-center !gap-2 !rounded-xl theme-btn !text-bray-800 !px-6 !py-4 !font-medium  disabled:!opacity-70 !transition-colors !duration-200 !shadow-sm hover:!shadow-md"
//                 >
//                   {loading ? (
//                     <>
//                       <svg className="!animate-spin !h-5 !w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                         <circle className="!opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="!opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       Pay ₹{form.amount ? Number(form.amount).toFixed(2) : "0.00"}
//                       <FiArrowRight size={18} />
//                     </>
//                   )}
//                 </button>
//               </div>

//               <p className="!text-xs !text-slate-500 !text-center">
//                 By completing this payment, you agree to our{" "}
//                 <a href="#" className="!text-blue-600 hover:!underline">Terms of Service</a> and{" "}
//                 <a href="#" className="!text-blue-600 hover:!underline">Privacy Policy</a>.
//               </p>
//             </form>

//             {/* Success Modal */}
//             <AnimatePresence>
//               {success && (
//                 <motion.div
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   exit={{ opacity: 0 }}
//                   className="!fixed !inset-0 !z-50 !flex !items-center !justify-center !p-4"
//                 >
//                   <motion.div 
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     className="!absolute !inset-0 !bg-black/40"
//                     onClick={() => setSuccess(false)}
//                   />
//                   <motion.div
//                     initial={{ scale: 0.9, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     exit={{ scale: 0.9, opacity: 0 }}
//                     transition={{ type: "spring", damping: 25, stiffness: 300 }}
//                     className="!relative !bg-white !rounded-2xl !p-6 !z-10 !max-w-md !w-full !shadow-2xl"
//                   >
//                     <div className="!flex !flex-col !items-center !text-center">
//                       <div className="!w-20 !h-20 !bg-green-100 !rounded-full !flex !items-center !justify-center !mb-4">
//                         <svg className="!w-10 !h-10 !text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//                         </svg>
//                       </div>
//                       <h3 className="!text-2xl !font-bold !text-slate-800 !mb-2">Payment Successful!</h3>
//                       <p className="!text-slate-600 !mb-6">
//                         Thank you for your payment of <span className="!font-semibold">${form.amount}</span>. 
//                         We've received your order and will begin processing it immediately.
//                       </p>
//                       <div className="!bg-slate-50 !p-4 !rounded-lg !w-full !mb-6">
//                         <div className="!flex !justify-between !mb-2">
//                           <span className="!text-slate-600">Order ID:</span>
//                           <span className="!font-medium">#ORD-{Math.floor(1000 + Math.random() * 9000)}</span>
//                         </div>
//                         <div className="!flex !justify-between">
//                           <span className="text-slate-600">Date:</span>
//                           <span className="!font-medium">{new Date().toLocaleDateString()}</span>
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => setSuccess(false)}
//                         className="!w-full !py-3 !px-4 theme-btn !text-black !rounded-lg !font-medium  !transition-colors !duration-200 !flex !items-center !justify-center !gap-2"
//                       >
//                         Continue to Dashboard
//                         <FiArrowRight size={16} />
//                       </button>
//                       <p className="!text-xs !text-slate-500 !mt-4">
//                         A receipt has been sent to your email address
//                       </p>
//                     </div>
//                   </motion.div>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//     </RiddaLayout>
//   );
// }




"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiCreditCard, FiChevronDown, FiLock, FiPercent, FiRupeeSign, FiDollarSign, FiUser, FiMail, FiPhone, FiArrowRight } from "react-icons/fi";
import RiddaLayout from "@/layout/RiddaLayout";
import PageBanner from "@/components/PageBanner";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PayNowPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    amount: "",
    coupon: "",
    paymentMethod: "card",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const router = useRouter();

  const services = [
    { id: "branding", label: "Branding Package", price: 1200 },
    { id: "website", label: "Website Design", price: 2400 },
    { id: "seo", label: "SEO & Growth", price: 900 },
    { id: "ads", label: "Ads Management", price: 700 },
  ];

  // Load selected package from localStorage on component mount
  useEffect(() => {
    const savedPackage = localStorage.getItem('selectedPackage');
    if (savedPackage) {
      const packageData = JSON.parse(savedPackage);
      setSelectedPackage(packageData);
      
      // Pre-fill the form with package data
      setForm(prev => ({
        ...prev,
        service: packageData.service,
        amount: packageData.amount
      }));
      
      // // Remove from localStorage after using
      // localStorage.removeItem('selectedPackage');
    }

    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  function updateField(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  function prefillAmount(serviceId) {
    const s = services.find((x) => x.id === serviceId);
    if (s) updateField("amount", s.price);
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your full name.";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) return "Please enter a valid email.";
    if (!form.phone.match(/^[0-9+\-\s]{7,20}$/)) return "Please enter a valid phone number.";
    if (!form.amount || Number(form.amount) <= 0) return "Please set a valid amount.";
    return "";
  }

  function applyCoupon() {
    if (!form.coupon) return setError("Enter a coupon to apply.");
    if (form.coupon.toUpperCase() === "NEWCLIENT10") {
      const newAmount = (Number(form.amount) * 0.9).toFixed(2);
      updateField("amount", newAmount);
      setError("");
      setCouponApplied(true);
    } else {
      setError("Invalid coupon code.");
    }
  }

  function removeCoupon() {
    // If we have a selected package, revert to package amount
    if (selectedPackage) {
      updateField("amount", selectedPackage.amount);
    } else {
      // Otherwise revert to the service price
      const originalAmount = services.find(s => s.id === form.service)?.price || "";
      updateField("amount", originalAmount);
    }
    updateField("coupon", "");
    setCouponApplied(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const v = validate();
    if (v) return setError(v);

    try {
      setLoading(true);
      
      // 1. Create order
      const { data: order } = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/order`, {
        amount: form.amount * 100, // Convert to paise
        currency: "INR",
      });

      // 2. Open Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Ridda Agency",
        description: selectedPackage ? selectedPackage.serviceLabel : form.service,
        order_id: order.id,
        handler: async function (response) {
          // 3. Verify & store payment
          try {
            const verifyRes = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payment/verify`, {
              ...response,
              form: {
                ...form,
                package: selectedPackage
              },
            });
            if (verifyRes.data.success) {
              setSuccess(true);
              setForm({});
              localStorage.removeItem('selectedPackage');
            } else {
              setError("Payment verification failed.");
            }
          } catch (err) {
            setError("Payment verification failed.");
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      setError("Payment initiation failed");
      console.error("Payment error:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <RiddaLayout>
      <PageBanner pageTitle="Pay Now" pageName="Pay Now" />
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-slate-100 !flex !items-center !justify-center !p-4 md:!p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="!max-w-6xl !w-full !bg-white !rounded-2xl !shadow-xl !overflow-hidden !grid !grid-cols-1 md:!grid-cols-2 !border !border-gray-100"
        >
          {/* LEFT - Image & Benefits */}
          <div className="!relative !hidden md:!flex !flex-col !justify-between !p-10 !bg-gradient-to-br from-slate-900 to-slate-800 !text-white">
            <div className="!absolute !inset-0 !bg-[url('/assets/images/banner/pay-now.jpg')] bg-cover bg-center mix-blend-overlay opacity-20" />
            
            <div className="!relative !z-10">
              <div className="!flex !items-center !gap-2 !mb-4">
                <div className="!w-8 !h-8 !rounded-lg !bg-yellow-500 !flex !items-center !justify-center">
                  <FiCreditCard className="!text-white" size={20} />
                </div>
                <h1 className="!text-3xl !text-white !font-bold"> Safe and Secure Checkout</h1>
              </div>
              <p className="!text-slate-200 !text-lg !mt-2">
                 Complete your purchase with confidence through our encrypted payment gateway.
              </p>
            </div>
            
            {/* Show selected package info if available */}
            {selectedPackage && (
              <div className="!relative !z-10 !mt-6 !p-4 !bg-white/10 !rounded-lg !border !border-white/20">
                <h3 className="!text-lg !font-semibold !text-white !mb-2">Selected Package</h3>
                <div className="!flex !justify-between !items-center">
                  <div>
                    <p className="!text-white !font-medium">{selectedPackage.serviceLabel}</p>
                     <div
                          className="text"
                          dangerouslySetInnerHTML={{ __html: selectedPackage.description }}
                        ></div>
                  </div>
                  <div className="!text-right">
                    <p className="!text-white !font-bold !text-xl">₹{selectedPackage.amount}</p>
                  </div>
                  
                </div>
              </div>
            )}
            
            <div className="!relative !z-10 !mt-8">
              <h3 className="!text-xl !font-semibold !text-white !mb-6 !border-b !border-slate-700 !pb-2">Why choose us?</h3>
              
              <ul className="!space-y-5">
                <motion.li 
                  className="!flex !items-start !gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="!bg-white/10 !p-2 !rounded-lg !mt-0.5 !flex-shrink-0">
                    <FiCheck className="!text-white" size={18} />
                  </span>
                  <div>
                    <span className="!font-medium !text-lg">Bank-level security</span>
                    <p className="!text-sm !text-slate-300 !mt-1">All transactions are encrypted with industry-standard SSL protection.</p>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="!flex !items-start !gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="!bg-white/10 !p-2 !rounded-lg !mt-0.5 !flex-shrink-0">
                    <FiCheck className="!text-white" size={18} />
                  </span>
                  <div>
                    <span className="!font-medium !text-lg">Instant payment confirmation</span>
                    <p className="!text-sm !text-slate-300 !mt-1"> Receive a detailed receipt the moment your payment clears.</p>
                  </div>
                </motion.li>
                
                <motion.li 
                  className="!flex !items-start !gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <span className="!bg-white/10 !p-2 !rounded-lg !mt-0.5 !flex-shrink-0">
                    <FiCheck className="!text-white" size={18} />
                  </span>
                  <div>
                    <span className="!font-medium !text-lg">Dedicated client support</span>
                    <p className="!text-sm !text-slate-300 !mt-1">Our team is available to help you with any payment or project questions.</p>
                  </div>
                </motion.li>
              </ul>
            </div>
            
            <div className="!relative !z-10 !flex !items-center !gap-3 !text-sm !text-slate-300 !mt-8 !pt-6 !border-t !border-slate-700">
              <div className="!flex !items-center !gap-2">
                <FiLock size={16} />
                <span>PCI DSS Compliant</span>
              </div>
              <div className="!w-1 !h-1 !rounded-full !bg-slate-600"></div>
              <span>256-bit SSL Encryption</span>
            </div>
          </div>

          {/* RIGHT - Form */}
          <div className="!p-6 md:!p-8 lg:!p-10">
            <div className="!max-w-md !mx-auto">
              <div className="!flex !items-center !justify-between !mb-8">
                <div>
                  <h2 className="!text-2xl !font-bold !text-slate-800">Complete Payment</h2>
                  <p className="!text-sm !text-slate-500 !mt-1">
                    Enter your details to process payment securely
                  </p>
                </div>
                <div className="!flex !items-center !gap-2 !text-xs !text-slate-600 !bg-slate-100 !px-3 !py-1.5 !rounded-full">
                  <FiLock size={12} /> <span>Secure</span>
                </div>
              </div>

              <form className="!space-y-6" onSubmit={handleSubmit}>
                {/* Name */}
                <div>
                  <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Full name</label>
                  <div className="!relative">
                    <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                      <FiUser className="!h-5 !w-5 !text-slate-400" />
                    </div>
                    <input
                      value={form.name}
                      onChange={(e) => updateField("name", e.target.value)}
                      className="!block !w-full !pl-10 !pr-4 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-100 !transition-colors !duration-200"
                      placeholder="Alex Johnson"
                      required
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-4">
                  <div>
                    <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Email</label>
                    <div className="!relative">
                      <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                        <FiMail className="!h-5 !w-5 !text-slate-400" />
                      </div>
                      <input
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        className="!block !w-full !pl-10 !pr-4 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-100 !transition-colors !duration-200"
                        placeholder="you@company.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Phone</label>
                    <div className="!relative">
                      <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                        <FiPhone className="!h-5 !w-5 !text-slate-400" />
                      </div>
                      <input
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        className="!block !w-full !pl-10 !pr-4 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-100 !transition-colors !duration-200"
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Service - Disabled if package is selected */}
                <div>
                  <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Selected Service</label>
                  <div className="!relative">
                    <select
                      value={form.service}
                      onChange={(e) => {
                        updateField("service", e.target.value);
                        prefillAmount(e.target.value);
                        if (couponApplied) removeCoupon();
                      }}
                      className="!appearance-none !w-full !rounded-lg !border !border-slate-200 !px-4 !py-3 !pr-10 focus:!outline-none focus:!ring-2 focus:!ring-blue-100 focus:!border-blue-500 !transition-colors !duration-200 !bg-white"
                      disabled={!!selectedPackage}
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.label} — ₹{s.price}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="!pointer-events-none !absolute !right-3 !top-3.5 !text-slate-400" />
                  </div>
                  {selectedPackage && (
                    <p className="!text-sm !text-green-600 !mt-1">
                      Pre-selected: {selectedPackage.serviceLabel}
                    </p>
                  )}
                </div>

                {/* Amount + Coupon */}
                <div className="!grid !grid-cols-1 sm:!grid-cols-2 !gap-4">
                  <div>
                    <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Amount (INR)</label>
                    <div className="!relative">
                      <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                        <span className="text-slate-400">₹</span>
                      </div>
                      <input
                        type="number"
                        value={form.amount}
                        onChange={(e) => updateField("amount", e.target.value)}
                        className="!block !w-full !pl-10 !pr-4 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-100 !transition-colors !duration-200"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">
                      {couponApplied ? "Coupon applied" : "Coupon code"}
                      {couponApplied && (
                        <span className="!text-xs !text-green-600 !ml-2 !font-normal">10% discount</span>
                      )}
                    </label>
                    <div className="!flex !gap-2">
                      <div className="!relative !flex-1">
                        <div className="!absolute !inset-y-0 !left-0 !pl-3 !flex !items-center !pointer-events-none">
                          <FiPercent className="!h-5 !w-5 !text-slate-400" />
                        </div>
                        <input
                          value={form.coupon}
                          onChange={(e) => updateField("coupon", e.target.value)}
                          className="!block !w-full !pl-10 !pr-20 !py-3 !rounded-lg !border !border-slate-200 focus:!border-blue-500 focus:!ring-2 focus:ring-blue-100 !transition-colors !duration-200"
                          placeholder="NEWCLIENT10"
                          disabled={couponApplied}
                        />
                        {couponApplied && (
                          <button
                            type="button"
                            onClick={removeCoupon}
                            className="!absolute !inset-y-0 !right-0 !pr-3 !flex !items-center !text-sm !text-red-500 hover:!text-red-700 !font-medium"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      {!couponApplied && (
                        <button
                          type="button"
                          onClick={applyCoupon}
                          className="!px-4 !py-3 rounded-lg !bg-slate-100 !text-slate-700 hover:!bg-slate-200 !transition-colors !duration-200 !font-medium"
                        >
                          Apply
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="!block !text-sm !font-medium !text-slate-700 !mb-2">Payment method</label>
                  <div className="!grid !grid-cols-2 !gap-3">
                    <label
                      className={`!relative !flex !flex-col !p-4 !border !rounded-xl !cursor-pointer !transition-all !duration-200 ${
                        form.paymentMethod === "card"
                          ? "!border-blue-500 !bg-blue-50 !shadow-sm"
                          : "!border-slate-200 hover:!border-slate-300"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name="pm"
                        checked={form.paymentMethod === "card"}
                        onChange={() => updateField("paymentMethod", "card")}
                      />
                      <div className="!flex !items-center !gap-2">
                        <div className={`!w-5 !h-5 !rounded-full !border !flex !items-center !justify-center !transition-all !duration-200 ${
                          form.paymentMethod === "card" 
                            ? "!border-blue-500 !bg-blue-500" 
                            : "!border-slate-300"
                        }`}>
                          {form.paymentMethod === "card" && (
                            <div className="!w-2 !h-2 !rounded-full !bg-white"></div>
                          )}
                        </div>
                        <span className="!font-medium">Card</span>
                      </div>
                      <span className="!text-xs !text-slate-500 !mt-2">Credit/Debit card</span>
                    </label>

                    <label
                      className={`!relative !flex !flex-col !p-4 !border !rounded-xl !cursor-pointer !transition-all !duration-200 ${
                        form.paymentMethod === "upi"
                          ? "!border-blue-500 !bg-blue-50 !shadow-sm"
                          : "!border-slate-200 hover:!border-slate-300"
                      }`}
                    >
                      <input
                        className="sr-only"
                        type="radio"
                        name="pm"
                        checked={form.paymentMethod === "upi"}
                        onChange={() => updateField("paymentMethod", "upi")}
                      />
                      <div className="!flex !items-center !gap-2">
                        <div className={`!w-5 !h-5 !rounded-full !border !flex !items-center !justify-center !transition-all !duration-200 ${
                          form.paymentMethod === "upi" 
                            ? "!border-blue-500 !bg-blue-500" 
                            : "!border-slate-300"
                        }`}>
                          {form.paymentMethod === "upi" && (
                            <div className="!w-2 !h-2 !rounded-full !bg-white"></div>
                          )}
                        </div>
                        <span className="font-medium">UPI</span>
                      </div>
                      <span className="!text-xs !text-slate-500 !mt-2">Pay via UPI</span>
                    </label>
                  </div>
                </div>

                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="!p-3 !bg-red-50 !border !border-red-200 !rounded-lg"
                  >
                    <p className="!text-sm !text-red-600">{error}</p>
                  </motion.div>
                )}

                <div className="!pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="!w-full !flex !items-center !justify-center !gap-2 !rounded-xl theme-btn !text-bray-800 !px-6 !py-4 !font-medium disabled:!opacity-70 !transition-colors !duration-200 !shadow-sm hover:!shadow-md"
                  >
                    {loading ? (
                      <>
                        <svg className="!animate-spin !h-5 !w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="!opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="!opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Pay ₹{form.amount ? Number(form.amount).toFixed(2) : "0.00"}
                        <FiArrowRight size={18} />
                      </>
                    )}
                  </button>
                </div>

                <p className="!text-xs !text-slate-500 !text-center">
                  By completing this payment, you agree to our{" "}
                  <a href="#" className="!text-blue-600 hover:!underline">Terms of Service</a> and{" "}
                  <a href="#" className="!text-blue-600 hover:!underline">Privacy Policy</a>.
                </p>
              </form>

              {/* Success Modal */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="!fixed !inset-0 !z-50 !flex !items-center !justify-center !p-4"
                  >
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="!absolute !inset-0 !bg-black/40"
                      onClick={() => setSuccess(false)}
                    />
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      className="!relative !bg-white !rounded-2xl !p-6 !z-10 !max-w-md !w-full !shadow-2xl"
                    >
                      <div className="!flex !flex-col !items-center !text-center">
                        <div className="!w-20 !h-20 !bg-green-100 !rounded-full !flex !items-center !justify-center !mb-4">
                          <svg className="!w-10 !h-10 !text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                        </div>
                        <h3 className="!text-2xl !font-bold !text-slate-800 !mb-2">Payment Successful!</h3>
                        <p className="!text-slate-600 !mb-6">
                          Thank you for your payment of <span className="!font-semibold">₹{form.amount}</span>. 
                          We've received your order and will begin processing it immediately.
                        </p>
                        <div className="!bg-slate-50 !p-4 !rounded-lg !w-full !mb-6">
                          <div className="!flex !justify-between !mb-2">
                            <span className="!text-slate-600">Order ID:</span>
                            <span className="!font-medium">#ORD-{Math.floor(1000 + Math.random() * 9000)}</span>
                          </div>
                          <div className="!flex !justify-between">
                            <span className="text-slate-600">Date:</span>
                            <span className="!font-medium">{new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSuccess(false)}
                          className="!w-full !py-3 !px-4 theme-btn !text-black !rounded-lg !font-medium !transition-colors !duration-200 !flex !items-center !justify-center !gap-2"
                        >
                          Continue to Dashboard
                          <FiArrowRight size={16} />
                        </button>
                        <p className="!text-xs !text-slate-500 !mt-4">
                          A receipt has been sent to your email address
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </RiddaLayout>
  );
}