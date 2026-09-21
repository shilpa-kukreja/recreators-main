
// // "use client";

// // import { motion } from "framer-motion";
// // import { useState } from "react";
// // import { Briefcase, Users, Target, Clock, MapPin, Calendar, Send, FileText, ArrowRight } from "lucide-react";
// // import RiddaLayout from "@/layout/RiddaLayout";
// // import PageBanner from "@/components/PageBanner";

// // export default function CareerPage() {
// //   const jobs = [
// //     {
// //       title: "Digital Marketing Executive",
// //       location: "Remote",
// //       type: "Full-time",
// //       description:
// //         "Drive campaigns, manage SEO/SEM, and optimize ROI for global clients.",
// //     },
// //     {
// //       title: "Creative Content Writer",
// //       location: "Mumbai, India",
// //       type: "Part-time",
// //       description:
// //         "Craft engaging, SEO-friendly content for blogs, campaigns, and social media.",
// //     },
// //     {
// //       title: "Graphic Designer",
// //       location: "Remote",
// //       type: "Contract",
// //       description:
// //         "Design stunning visuals and brand assets for high-impact campaigns.",
// //     },
// //   ];

// //   const [selectedJob, setSelectedJob] = useState("");
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     position: "",
// //     coverLetter: "",
// //     resume: null,
// //   });

// //   const handleChange = (e) => {
// //     const { name, value, files } = e.target;
// //     setFormData({ ...formData, [name]: files ? files[0] : value });
// //   };

// //   const handleApplyClick = (jobTitle) => {
// //     setSelectedJob(jobTitle);
// //     setFormData({ ...formData, position: jobTitle });
// //     document
// //       .getElementById("application-form")
// //       .scrollIntoView({ behavior: "smooth" });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     alert("✅ Application submitted successfully!");
// //     setFormData({ name: "", email: "", phone: "", coverLetter: "", resume: null });
// //     console.log("Form Data:", formData);
// //   };

// //   return (
// //     <RiddaLayout>
// //       <PageBanner pageTitle="Career" pageName="Join Our Team" />
// //       <div className="!bg-gradient-to-b from-gray-50 to-white !text-gray-900">
// //         {/* Hero Section */}
// //         <section className="!relative !bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 !text-white !py-28 !px-6 !text-center !overflow-hidden">
// //           <div className="!absolute !top-0 !left-0 !w-full !h-full !opacity-10">
// //             <div className="!absolute !top-10 !left-20 !w-72 !h-72 !bg-white !rounded-full"></div>
// //             <div className="!absolute !bottom-10 !right-20 !w-96 !h-96 !bg-purple-300 !rounded-full"></div>
// //           </div>

// //           <motion.div
// //             initial={{ opacity: 0, y: 40 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.7 }}
// //             className="!relative !z-10 !max-w-4xl !mx-auto"
// //           >
// //             <h1 className="!text-5xl md:!text-6xl !font-bold !mb-6">
// //               Grow Your Career <span className="!text-transparent !bg-clip-text !bg-gradient-to-r from-amber-300 to-rose-300">With Us</span> 
// //             </h1>
// //             <motion.p
// //               initial={{ opacity: 0, y: 30 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.3, duration: 0.7 }}
// //               className="!mt-6 !text-lg md:!text-xl !max-w-2xl !mx-auto !text-indigo-100"
// //             >
// //               Join a team of innovators, strategists, and creators driving the
// //               future of digital marketing.
// //             </motion.p>

// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               animate={{ opacity: 1, y: 0 }}
// //               transition={{ delay: 0.6, duration: 0.7 }}
// //               className="mt-10"
// //             >
// //               <a 
// //                 href="#openings" 
// //                 className="!inline-flex !items-center !gap-2 !bg-white !text-indigo-700 !font-medium !px-6 !py-3 !rounded-xl hover:!shadow-lg !transition-shadow"
// //               >
// //                 View Open Positions
// //                 <ArrowRight size={18} />
// //               </a>
// //             </motion.div>
// //           </motion.div>
// //         </section>

// //         {/* Culture Section */}
// //         <section className="!py-20 !px-6 !max-w-7xl !mx-auto">
// //           <motion.div
// //             initial={{ opacity: 0, y: 20 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="!text-center !mb-16"
// //           >
// //             <h2 className="!text-4xl md:!text-5xl !font-bold !mb-4">
// //               Life At Our <span className="!text-indigo-600">Agency</span>
// //             </h2>
// //             <p className="!text-gray-600 !max-w-2xl !mx-auto">
// //               We foster a culture of innovation, collaboration, and continuous growth where every team member can thrive.
// //             </p>
// //           </motion.div>

// //           <div className="!grid !gap-8 md:!grid-cols-2 lg:!grid-cols-4">
// //             {[
// //               { icon: Users, title: "Collaborative Team", desc: "Work with the best minds in digital marketing." },
// //               { icon: Target, title: "Impactful Work", desc: "Create campaigns that drive real results." },
// //               { icon: Briefcase, title: "Career Growth", desc: "Opportunities to learn, lead, and excel." },
// //               { icon: Clock, title: "Work Flexibility", desc: "Hybrid culture & flexible work hours." },
// //             ].map((item, idx) => (
// //               <motion.div
// //                 key={idx}
// //                 initial={{ opacity: 0, y: 40 }}
// //                 whileInView={{ opacity: 1, y: 0 }}
// //                 transition={{ duration: 0.5, delay: idx * 0.2 }}
// //                 className="!bg-white !p-8 !rounded-2xl !shadow-lg hover:!shadow-xl !transition-shadow group !border !border-gray-100"
// //               >
// //                 <div className="!flex !items-center !justify-center !h-16 !w-16 !rounded-2xl !bg-indigo-100 !text-indigo-600 !mb-6 group-hover:!bg-indigo-600 group-hover:!text-white !transition-colors">
// //                   <item.icon className="w-8 h-8" />
// //                 </div>
// //                 <h3 className="!text-xl !font-semibold !mb-3 group-hover:!text-indigo-600 !transition-colors">{item.title}</h3>
// //                 <p className="!text-gray-600">{item.desc}</p>
// //               </motion.div>
// //             ))}
// //           </div>
// //         </section>

// //         {/* Job Openings */}
// //         <section id="openings" className="!py-20 !px-6 !bg-gray-50">
// //           <div className="!max-w-7xl !mx-auto">
// //             <motion.div
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               transition={{ duration: 0.6 }}
// //               className="!text-center !mb-16"
// //             >
// //               <h2 className="!text-4xl md:!text-5xl !font-bold !mb-4">
// //                 We're <span className="text-indigo-600">Hiring</span> 
// //               </h2>
// //               <p className="!text-gray-600 !max-w-2xl !mx-auto">
// //                 Explore our current openings and find where you can make an impact.
// //               </p>
// //             </motion.div>

// //             <div className="!grid !gap-8 md:!grid-cols-2 lg:!grid-cols-3">
// //               {jobs.map((job, idx) => (
// //                 <motion.div
// //                   key={idx}
// //                   initial={{ opacity: 0, y: 40 }}
// //                   whileInView={{ opacity: 1, y: 0 }}
// //                   transition={{ duration: 0.6, delay: idx * 0.2 }}
// //                   className="!bg-white !p-8 !rounded-2xl !shadow-lg hover:!shadow-xl !transition-shadow !flex !flex-col !justify-between !border !border-gray-100"
// //                 >
// //                   <div>
// //                     <h3 className="!text-xl !font-bold !mb-4 !text-gray-900">{job.title}</h3>
// //                     <p className="!text-gray-600 !mb-6">{job.description}</p>
// //                     <div className="!flex !flex-col !gap-3 !text-sm !text-gray-500">
// //                       <div className="!flex !items-center !gap-2">
// //                         <MapPin size={16} />
// //                         <span>{job.location}</span>
// //                       </div>
// //                       <div className="!flex !items-center !gap-2">
// //                         <Calendar size={16} />
// //                         <span>{job.type}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                   <button
// //                     onClick={() => handleApplyClick(job.title)}
// //                     className="!mt-8 !w-full !bg-indigo-600 !text-white !py-3 !px-4 !rounded-xl hover:!bg-indigo-700 !transition-colors !flex !items-center !justify-center !gap-2"
// //                   >
// //                     Apply Now
// //                     <ArrowRight size={16} />
// //                   </button>
// //                 </motion.div>
// //               ))}
// //             </div>
// //           </div>
// //         </section>

// //         {/* Application Form */}
// //         <section id="application-form" className="!py-20 !px-6">
// //           <motion.div
// //             initial={{ opacity: 0, y: 40 }}
// //             whileInView={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 0.6 }}
// //             className="!max-w-4xl !mx-auto !bg-white !shadow-2xl !rounded-3xl !p-10 !border !border-gray-100"
// //           >
// //             <div className="!text-center !mb-10">
// //               <h2 className="!text-3xl !font-bold !mb-2">
// //                 Apply For {selectedJob || "Your Dream Role"}
// //               </h2>
// //               <p className="!text-gray-600">
// //                 Fill out the form below and we'll get back to you shortly.
// //               </p>
// //             </div>

// //             <form onSubmit={handleSubmit} className="!space-y-6">
// //               <div className="!grid !gap-6 md:!grid-cols-2">
// //                 <div>
// //                   <label className="!block !text-gray-700 !mb-2 !font-medium">Full Name *</label>
// //                   <input
// //                     type="text"
// //                     name="name"
// //                     required
// //                     value={formData.name}
// //                     onChange={handleChange}
// //                     className="!w-full !border !border-gray-300 !rounded-xl !px-5 !py-3 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition"
// //                     placeholder="Your full name"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="!block !text-gray-700 !mb-2 !font-medium">Email *</label>
// //                   <input
// //                     type="email"
// //                     name="email"
// //                     required
// //                     value={formData.email}
// //                     onChange={handleChange}
// //                     className="!w-full !border !border-gray-300 !rounded-xl !px-5 !py-3 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition"
// //                     placeholder="your.email@example.com"
// //                   />
// //                 </div>
// //               </div>

// //               <div className="!grid !gap-6 md:!grid-cols-2">
// //                 <div>
// //                   <label className="!block !text-gray-700 !mb-2 !font-medium">Phone *</label>
// //                   <input
// //                     type="tel"
// //                     name="phone"
// //                     required
// //                     value={formData.phone}
// //                     onChange={handleChange}
// //                     className="!w-full !border !border-gray-300 !rounded-xl !px-5 !py-3 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition"
// //                     placeholder="+1 (234) 567-8900"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="!block !text-gray-700 !mb-2 !font-medium">Position *</label>
// //                   <input
// //                     type="text"
// //                     name="position"
// //                     readOnly
// //                     value={formData.position}
// //                     placeholder="Select a job above"
// //                     className="!w-full !border !border-gray-300 !bg-gray-100 !rounded-xl !px-5 !py-3"
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <label className="!block !text-gray-700 !mb-2 !font-medium">Cover Letter</label>
// //                 <textarea
// //                   name="coverLetter"
// //                   rows="5"
// //                   value={formData.coverLetter}
// //                   onChange={handleChange}
// //                   className="!w-full !border !border-gray-300 !rounded-xl !px-5 !py-3 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition"
// //                   placeholder="Tell us why you're interested in this position..."
// //                 ></textarea>
// //               </div>

// //               <div>
// //                 <label className="!block !text-gray-700 !mb-2 !font-medium">Resume (PDF/DOC) *</label>
// //                 <div className="!flex !items-center !justify-center !w-full">
// //                   <label className="!flex !flex-col !items-center !justify-center !w-full !h-32 !border-2 !border-dashed !border-gray-300 !rounded-xl !cursor-pointer !bg-gray-50 hover:!bg-gray-100 !transition">
// //                     <div className="!flex !flex-col !items-center !justify-center !pt-5 !pb-6">
// //                       <FileText className="!w-8 !h-8 !mb-3 !text-gray-500" />
// //                       <p className="!mb-2 !text-sm !text-gray-500">Click to upload your resume</p>
// //                       <p className="!text-xs !text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
// //                     </div>
// //                     <input 
// //                       type="file" 
// //                       name="resume" 
// //                       accept=".pdf,.doc,.docx" 
// //                       required 
// //                       onChange={handleChange} 
// //                       className="hidden" 
// //                     />
// //                   </label>
// //                 </div>
// //               </div>

// //               <motion.button
// //                 whileHover={{ scale: 1.02 }}
// //                 whileTap={{ scale: 0.98 }}
// //                 type="submit"
// //                 className="!w-full !bg-indigo-600 !text-white !py-4 !rounded-xl !shadow hover:!bg-indigo-700 !transition !flex !items-center !justify-center !gap-2 !font-medium"
// //               >
// //                 Submit Application
// //                 <Send size={18} />
// //               </motion.button>
// //             </form>
// //           </motion.div>
// //         </section>
// //       </div>
// //     </RiddaLayout>
// //   );
// // }



// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";
// import { 
//   Briefcase, Users, Target, Clock, MapPin, Calendar, 
//   Send, FileText, ArrowRight, Heart, Award, Star, 
//   Zap, ChevronRight, CheckCircle, Linkedin, Twitter, Instagram 
// } from "lucide-react";
// import RiddaLayout from "@/layout/RiddaLayout";
// import PageBanner from "@/components/PageBanner";

// export default function CareerPage() {

//    const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);


//   const benefits = [
//     { title: "Competitive Salary", desc: "Industry-standard compensation with regular reviews" },
//     { title: "Flexible Hours", desc: "Work when you're most productive with our flex-time policy" },
//     { title: "Remote Work", desc: "Work from anywhere with our remote-first culture" },
//     { title: "Health Insurance", desc: "Comprehensive medical, dental, and vision coverage" },
//     { title: "Learning Budget", desc: "Annual stipend for courses, books, and conferences" },
//     { title: "Team Retreats", desc: "Annual company retreats in exciting locations" },
//   ];

//     useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const res = await fetch("https://recreators.onrender.com/api/carrer/careers");
//         const data = await res.json();
//         setJobs(data);
//         console.log(data);
//       } catch (err) {
//         console.error("Error fetching jobs:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchJobs();
//   }, []);



//   const [selectedJob, setSelectedJob] = useState("");
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     position: "",
//     coverLetter: "",
//     resume: null,
//   });

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({ ...formData, [name]: files ? files[0] : value });
//   };

//   const handleApplyClick = (jobTitle) => {
//     setSelectedJob(jobTitle);
//     setFormData({ ...formData, position: jobTitle });
//     document.getElementById("application-form").scrollIntoView({ behavior: "smooth" });
//   };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   try {
//     const formPayload = new FormData();
//     formPayload.append("fullname", formData.name);
//     formPayload.append("email", formData.email);
//     formPayload.append("phone", formData.phone);
//     formPayload.append("position", formData.position);
//     formPayload.append("coverLetter", formData.coverLetter);
//     if (formData.resume) {
//       formPayload.append("resume", formData.resume);
//     }

//     const response = await fetch("https://recreators.onrender.com/api/carrer/carrer-forms", {
//       method: "POST",
//       body: formPayload,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to submit the application");
//     }

//     const result = await response.json();
//     alert("✅ Application submitted successfully!");
//     console.log("Saved Data:", result);

//     // Reset form
//     setFormData({
//       name: "",
//       email: "",
//       phone: "",
//       position: selectedJob,
//       coverLetter: "",
//       resume: null,
//     });
//   } catch (error) {
//     console.error(error);
//     alert("❌ Something went wrong while submitting the form.");
//   }
// };


//   // Animation variants
//   const fadeIn = {
//     hidden: { opacity: 0, y: 50 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
//   };

//   const staggerChildren = {
//     visible: { transition: { staggerChildren: 0.1 } }
//   };

//   return (
//     <RiddaLayout>
//       <PageBanner pageTitle="Career" pageName="Join Our Team" />
//       <div className="!bg-gradient-to-b from-gray-50 to-white !text-gray-900">
//         {/* Hero Section */}
//         <section className="!relative !bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 !text-white !py-32 !px-6 !text-center !overflow-hidden">
//           <div className="absolute inset-0 overflow-hidden">
//             <div className="!absolute -!top-24 -!left-24 !w-96 !h-96 !bg-white/5 !rounded-full"></div>
//             <div className="!absolute !top-1/2 !right-0 !w-80 !h-80 !bg-purple-600/20 !rounded-full !blur-3xl"></div>
//             <div className="!absolute !bottom-0 !left-1/4 !w-64 !h-64 !bg-indigo-600/20 !rounded-full !blur-3xl"></div>
//           </div>

//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={fadeIn}
//             className="!relative !z-10 !max-w-5xl !mx-auto"
//           >
//             <motion.div 
//               variants={fadeIn}
//               className="!inline-flex !items-center !gap-2 !bg-white/10 !backdrop-blur-sm !px-4 !py-2 !rounded-full !text-sm !mb-6"
//             >
//               <Zap size={16} className="!text-amber-300" />
//               <span>We're hiring across multiple roles</span>
//             </motion.div>

//             <h1 className="!text-5xl md:!text-6xl lg:!text-7xl !font-bold !mb-6 !leading-tight">
//               Launch Your <span className="!text-transparent !bg-clip-text !bg-gradient-to-r from-amber-300 to-rose-300">Career</span> With Us
//             </h1>

//             <motion.p
//               variants={fadeIn}
//               className="!mt-6 !text-lg md:!text-xl !max-w-2xl !mx-auto !text-indigo-100 !leading-relaxed"
//             >
//               Join our team of innovators, strategists, and creators who are shaping the future of digital marketing and technology.
//             </motion.p>

//             <motion.div
//               variants={fadeIn}
//               className="!mt-12 !flex !flex-col sm:!flex-row !gap-4 !justify-center"
//             >
//               <a 
//                 href="#openings" 
//                 className="!inline-flex !items-center !gap-3 !bg-white !text-indigo-700 !font-medium !px-8 !py-4 !rounded-xl hover:!shadow-2xl !transition-all !duration-300 hover:-!translate-y-1"
//               >
//                 Explore Open Positions
//                 <ArrowRight size={18} />
//               </a>

//               <a 
//                 href="#culture" 
//                 className="!inline-flex !items-center !gap-3 !bg-transparent !border !border-white/30 !text-white !font-medium !px-8 !py-4 !rounded-xl hover:!bg-white/10 !transition-all !duration-300"
//               >
//                 Our Culture
//                 <Heart size={18} />
//               </a>
//             </motion.div>
//           </motion.div>
//         </section>

//         {/* Stats Section */}
//         <section className="!py-16 !bg-white">
//           <div className="!max-w-7xl !mx-auto !px-6">
//             <div className="!grid !grid-cols-2 md:!grid-cols-4 !gap-8">
//               {[
//                 { value: "50+", label: "Team Members" },
//                 { value: "15", label: "Countries" },
//                 { value: "200+", label: "Clients" },
//                 { value: "98%", label: "Client Satisfaction" },
//               ].map((stat, index) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="!text-center"
//                 >
//                   <div className="!text-3xl md:!text-4xl !font-bold !text-indigo-600 !mb-2">{stat.value}</div>
//                   <div className="!text-gray-600">{stat.label}</div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Culture Section */}
//         <section id="culture" className="!py-20 !px-6 !max-w-7xl !mx-auto">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="!text-center !mb-16"
//           >
//             <h2 className="!text-4xl md:!text-5xl !font-bold !mb-4">
//               Our <span className="!text-indigo-600">Culture</span> & Values
//             </h2>
//             <p className="!text-gray-600 !max-w-2xl !mx-auto !text-lg">
//               We believe in creating an environment where talented people can do their best work and grow both personally and professionally.
//             </p>
//           </motion.div>

//           <motion.div
//             variants={staggerChildren}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true }}
//             className="!grid !gap-8 md:!grid-cols-2 lg:!grid-cols-3"
//           >
//             {[
//               { 
//                 icon: Users, 
//                 title: "Collaborative Team", 
//                 desc: "Work with the best minds in digital marketing and technology in a supportive environment.",
//                 color: "!text-blue-500"
//               },
//               { 
//                 icon: Target, 
//                 title: "Impactful Work", 
//                 desc: "Create campaigns and products that drive real results and make a difference for our clients.",
//                 color: "!text-rose-500"
//               },
//               { 
//                 icon: Award, 
//                 title: "Excellence", 
//                 desc: "We strive for excellence in everything we do, from strategy to execution and beyond.",
//                 color: "!text-amber-500"
//               },
//               { 
//                 icon: Zap, 
//                 title: "Innovation", 
//                 desc: "We encourage experimentation and embrace new ideas that push boundaries.",
//                 color: "!text-purple-500"
//               },
//               { 
//                 icon: Heart, 
//                 title: "Work-Life Balance", 
//                 desc: "We value your well-being and encourage a healthy balance between work and personal life.",
//                 color: "!text-pink-500"
//               },
//               { 
//                 icon: Star, 
//                 title: "Growth Mindset", 
//                 desc: "We invest in our team's development with learning opportunities and career advancement paths.",
//                 color: "!text-green-500"
//               },
//             ].map((item, idx) => (
//               <motion.div
//                 key={idx}
//                 variants={fadeIn}
//                 className="!bg-white !p-8 !rounded-2xl !shadow-lg hover:!shadow-xl !transition-all !duration-300 !border !border-gray-100 !group hover:-!translate-y-2"
//               >
//                 <div className={`!flex !items-center !justify-center !h-16 !w-16 !rounded-2xl !bg-gradient-to-br from-gray-50 to-white !shadow-sm !mb-6 group-hover:!shadow-md !transition-shadow ${item.color}`}>
//                   <item.icon className="!w-8 !h-8" />
//                 </div>
//                 <h3 className="!text-xl !font-semibold !mb-3 !text-gray-900">{item.title}</h3>
//                 <p className="!text-gray-600 !leading-relaxed">{item.desc}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         </section>

//         {/* Benefits Section */}
//         <section className="!py-20 !bg-gray-50">
//           <div className="!max-w-7xl !mx-auto !px-6">
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="!text-center !mb-16"
//             >
//               <h2 className="!text-4xl md:!text-5xl !font-bold !mb-4">
//                 Perks & <span className="!text-indigo-600">Benefits</span>
//               </h2>
//               <p className="!text-gray-600 !max-w-2xl !mx-auto !text-lg">
//                 We take care of our team with comprehensive benefits and perks that support your well-being and growth.
//               </p>
//             </motion.div>

//             <div className="!grid !gap-6 md:!grid-cols-2 lg:!grid-cols-3">
//               {benefits.map((benefit, idx) => (
//                 <motion.div
//                   key={idx}
//                   initial={{ opacity: 0, y: 30 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: idx * 0.1 }}
//                   viewport={{ once: true }}
//                   className="!flex !items-start !gap-4 !bg-white !p-6 !rounded-xl !shadow-sm !border !border-gray-100"
//                 >
//                   <CheckCircle className="!w-6 !h-6 !text-indigo-500 !mt-1 !flex-shrink-0" />
//                   <div>
//                     <h3 className="!font-semibold !text-gray-900 !mb-1">{benefit.title}</h3>
//                     <p className="!text-gray-600 !text-sm">{benefit.desc}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Job Openings */}
//         {/* ✅ Job Openings Section */}
//         <section id="openings" className="!py-20 !px-6 !bg-white">
//           <div className="!max-w-7xl !mx-auto">
//             <motion.div
//               initial={{ opacity: 0, y: 40 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               viewport={{ once: true }}
//               className="!text-center !mb-16"
//             >
//               <h2 className="!text-4xl md:!text-5xl !font-bold !mb-4">
//                 Open <span className="!text-indigo-600">Positions</span>
//               </h2>
//               <p className="!text-gray-600 !max-w-2xl !mx-auto !text-lg">
//                 Explore our current openings and find where you can make an impact with your skills and passion.
//               </p>
//             </motion.div>

//             {loading ? (
//               <p className="text-center text-gray-500">Loading jobs...</p>
//             ) : jobs.length === 0 ? (
//               <p className="text-center text-gray-500">No positions available right now.</p>
//             ) : (
//               <div className="!grid !gap-6 md:!grid-cols-2 lg:!grid-cols-3">
//                 {jobs.map((job, idx) => (
//                   <motion.div
//                     key={job._id}
//                     initial={{ opacity: 0, y: 40 }}
//                     whileInView={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.5, delay: idx * 0.1 }}
//                     viewport={{ once: true }}
//                     className="!bg-gradient-to-b from-white to-gray-50 !p-8 !rounded-2xl !shadow-lg hover:!shadow-xl !transition-all !duration-300 !border !border-gray-100 group hover:-!translate-y-1"
//                   >
//                     <div className="!mb-6">
//                       <h3 className="!text-xl !font-bold !text-gray-900 !mb-4">{job.title}</h3>

//                       {/* description comes from backend (strip HTML tags if needed) */}
//                       <p
//                         className="!text-gray-600 !mb-6"
//                         dangerouslySetInnerHTML={{ __html: job.description }}
//                       />

//                       <div className="!flex !items-center !gap-4 !text-sm !text-gray-500 !mb-4">
//                         <div className="!flex !items-center !gap-1">
//                           <MapPin size={16} />
//                           <span>{job.location}</span>
//                         </div>
//                         <div className="!flex !items-center !gap-1">
//                           <Calendar size={16} />
//                           <span>{job.type}</span>
//                         </div>
//                       </div>

//                       <div className="!flex !flex-wrap !gap-2 !mb-3">
//                         {job.tags?.map((tag, i) => (
//                           <span key={i} className="!px-3 !py-1 !bg-indigo-100 text-indigo-700 !text-xs !rounded-full">
//                             {tag}
//                           </span>
//                         ))}
//                       </div>

//                       {/* extra fields from DB */}
//                       <p className="text-sm text-gray-600 mb-2">
//                         💰 Salary: <span className="font-medium">{job.salary}</span>
//                       </p>
//                       <p className="text-sm text-gray-600 mb-2">
//                         🎯 Experience: <span className="font-medium">{job.experience}</span>
//                       </p>
//                       <p className="text-sm text-gray-600">
//                         ⏳ Apply before:{" "}
//                         <span className="font-medium">
//                           {new Date(job.applicationDeadline).toLocaleDateString()}
//                         </span>
//                       </p>
//                     </div>

//                     <button
//                       onClick={() => handleApplyClick(job.title)}
//                       className="!w-full !bg-indigo-600 !text-white !py-3 !px-4 !rounded-xl hover:!bg-indigo-700 !transition-all !duration-300 !flex !items-center !justify-center !gap-2 group-hover:!shadow-md"
//                     >
//                       Apply Now
//                       <ArrowRight size={16} />
//                     </button>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </section>

//         {/* Application Form */}
//         <section id="application-form" className="!py-20 !bg-gradient-to-br from-gray-50 to-indigo-50">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="!max-w-4xl !mx-auto !bg-white !shadow-2xl !rounded-3xl !p-8 md:!p-12 !border !border-gray-100"
//           >
//             <div className="!text-center !mb-10">
//               <h2 className="!text-3xl !font-bold !mb-2 !text-gray-900">
//                 Apply For {selectedJob || "Your Dream Role"}
//               </h2>
//               <p className="!text-gray-600 !max-w-lg !mx-auto">
//                 Fill out the form below and we'll get back to you shortly. We're excited to learn more about you!
//               </p>
//             </div>

//             <form onSubmit={handleSubmit} className="!space-y-6">
//               <div className="!grid !gap-6 md:!grid-cols-2">
//                 <div>
//                   <label className="!block !text-gray-700 !mb-2 !font-medium">Full Name *</label>
//                   <input
//                     type="text"
//                     name="name"
//                     required
//                     value={formData.name}
//                     onChange={handleChange}
//                     className="!w-full !border !border-gray-300 !rounded-xl !px-5 !py-3 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition"
//                     placeholder="Your full name"
//                   />
//                 </div>

//                 <div>
//                   <label className="!block !text-gray-700 !mb-2 !font-medium">Email *</label>
//                   <input
//                     type="email"
//                     name="email"
//                     required
//                     value={formData.email}
//                     onChange={handleChange}
//                     className="!w-full !border !border-gray-300 !rounded-xl !px-5 !py-3 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition"
//                     placeholder="your.email@example.com"
//                   />
//                 </div>
//               </div>

//               <div className="!grid !gap-6 md:!grid-cols-2">
//                 <div>
//                   <label className="!block !text-gray-700 !mb-2 !font-medium">Phone *</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     required
//                     value={formData.phone}
//                     onChange={handleChange}
//                     className="!w-full !border !border-gray-300 !rounded-xl !px-5 !py-3 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition"
//                     placeholder="+1 (234) 567-8900"
//                   />
//                 </div>

//                 <div>
//                   <label className="!block !text-gray-700 !mb-2 !font-medium">Position *</label>
//                   <input
//                     type="text"
//                     name="position"
//                     readOnly
//                     value={formData.position}
//                     placeholder="Select a job above"
//                     className="!w-full !border !border-gray-300 !bg-gray-100 !rounded-xl !px-5 !py-3"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="!block !text-gray-700 !mb-2 !font-medium">Cover Letter</label>
//                 <textarea
//                   name="coverLetter"
//                   rows="5"
//                   value={formData.coverLetter}
//                   onChange={handleChange}
//                   className="!w-full !border !border-gray-300 !rounded-xl !px-5 !py-3 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition"
//                   placeholder="Tell us why you're interested in this position and what makes you a great fit..."
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="!block !text-gray-700 !mb-2 !font-medium">Resume (PDF/DOC) *</label>
//                 <div className="!flex !items-center !justify-center !w-full">
//                   <label className="!flex !flex-col !items-center !justify-center !w-full !h-40 !border-2 !border-dashed !border-gray-300 !rounded-xl !cursor-pointer !bg-gray-50 hover:!bg-gray-100 !transition">
//                     <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                       <FileText className="w-10 h-10 mb-3 text-gray-400" />
//                       <p className="mb-2 text-sm text-gray-500">Click to upload or drag and drop</p>
//                       <p className="!text-xs !text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
//                     </div>
//                     <input 
//                       type="file" 
//                       name="resume" 
//                       accept=".pdf,.doc,.docx" 
//                       required 
//                       onChange={handleChange} 
//                       className="!hidden" 
//                     />
//                   </label>
//                 </div>
//               </div>

//               <motion.button
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 type="submit"
//                 className="!w-full !bg-gradient-to-r from-indigo-600 to-purple-600 !text-white !py-4 !rounded-xl !shadow hover:!shadow-lg !transition-all !flex !items-center !justify-center !gap-2 !font-medium"
//               >
//                 Submit Application
//                 <Send size={18} />
//               </motion.button>
//             </form>
//           </motion.div>
//         </section>

//         {/* Footer CTA */}
//         <section className="!py-16 !bg-indigo-900 !text-white">
//           <div className="!max-w-5xl !mx-auto !px-6 !text-center">
//             <h2 className="!text-3xl md:!text-4xl !font-bold !mb-6">Still Have Questions?</h2>
//             <p className="!text-indigo-200 !max-w-2xl !mx-auto !mb-8">
//               Reach out to our hiring team directly for any questions about our openings or application process.
//             </p>
//             <a 
//               href="mailto:careers@yourcompany.com" 
//               className="!inline-flex !items-center !gap-2 !bg-white !text-indigo-700 !font-medium !px-8 !py-3 !rounded-xl hover:!shadow-lg !transition-all"
//             >
//               Contact Us
//             </a>

//             <div className="!mt-12 !flex !justify-center !gap-6">
//               <a href="#" className="!text-indigo-300 hover:!text-white !transition-colors">
//                 <Linkedin size={20} />
//               </a>
//               <a href="#" className="!text-indigo-300 hover:!text-white !transition-colors">
//                 <Twitter size={20} />
//               </a>
//               <a href="#" className="!text-indigo-300 hover:!text-white !transition-colors">
//                 <Instagram size={20} />
//               </a>
//             </div>
//           </div>
//         </section>
//       </div>
//     </RiddaLayout>
//   );
// }





"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Briefcase, Users, Target, Clock, MapPin, Calendar,
  Send, FileText, ArrowRight, Heart, Award, Star,
  Zap, ChevronRight, CheckCircle, Linkedin, Twitter, Instagram,
  Building2, Rocket, Globe, Shield, Coffee, Palette,
  TrendingUp, BookOpen, Video, MessageCircle
} from "lucide-react";
import { toast } from "react-toastify";

import RiddaLayout from "@/layout/RiddaLayout";
import PageBanner from "@/components/PageBanner";

export default function CareerPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
    resume: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const benefits = [
    {
      title: "Competitive Salary",
      desc: "Industry-leading compensation with performance bonuses and regular reviews",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-600"
    },
    {
      title: "Flexible Hours",
      desc: "Work when you're most productive with our results-oriented flex-time policy",
      icon: Clock,
      color: "from-blue-500 to-cyan-600"
    },
    {
      title: "Remote First",
      desc: "Work from anywhere with our remote-first culture and co-working allowances",
      icon: Globe,
      color: "from-purple-500 to-indigo-600"
    },
    {
      title: "Health & Wellness",
      desc: "Comprehensive medical, dental, vision, and mental health coverage",
      icon: Shield,
      color: "from-red-500 to-pink-600"
    },
    {
      title: "Learning Budget",
      desc: "$3,000 annual stipend for courses, conferences, and professional development",
      icon: BookOpen,
      color: "from-orange-500 to-amber-600"
    },
    {
      title: "Team Retreats",
      desc: "All-expenses-paid annual company retreats in inspiring global locations",
      icon: Rocket,
      color: "from-violet-500 to-purple-600"
    },
  ];

  const stats = [
    { value: "50+", label: "Team Members", icon: Users, color: "text-blue-500" },
    { value: "15", label: "Countries", icon: Globe, color: "text-green-500" },
    { value: "200+", label: "Clients", icon: Building2, color: "text-purple-500" },
    { value: "98%", label: "Client Satisfaction", icon: Star, color: "text-amber-500" },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/careers`);
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleApplyClick = (jobTitle) => {
    setSelectedJob(jobTitle);
    setFormData({ ...formData, position: jobTitle });
    document.getElementById("application-form").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("fullname", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("position", formData.position);
      formPayload.append("coverLetter", formData.coverLetter);
      if (formData.resume) {
        formPayload.append("resume", formData.resume);
      }

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/carrer-forms`, {
        method: "POST",
        body: formPayload,
      });

      if (!response.ok) {
        throw new Error("Failed to submit the application");
      }

      const result = await response.json();

      // Success notification
      toast.success("🎉 Application submitted successfully! We'll be in touch soon.");

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        position: selectedJob,
        coverLetter: "",
        resume: null,
      });

    } catch (error) {
      console.error(error);
      toast.error("❌ Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <RiddaLayout>
      <PageBanner pageTitle="Career" pageName="Join Our Team" />

      <div className="!bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
        {/* Enhanced Hero Section */}
        <section className="!relative !bg-white !text-white !py-16 !px-6 !text-center !overflow-hidden">
          {/* Animated Background Elements */}
          <div className="!absolute !inset-0 !overflow-hidden">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1.5 }}
              className="!absolute -top-48 -left-48 !w-96 !h-96 !bg-white !rounded-full !blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="!absolute !top-1/3 -right-24 !w-72 !h-72 !bg-purple-500 !rounded-full !blur-3xl"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.1 }}
              transition={{ duration: 1.5, delay: 0.6 }}
              className="!absolute -bottom-32 !left-1/4 !w-64 !h-64 !bg-blue-500 !rounded-full !blur-3xl"
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="!relative !z-10 !max-w-6xl !mx-auto"
          >
            <motion.div
              variants={fadeInUp}
              className="!inline-flex !items-center !gap-3 !bg-gray-900/50 !backdrop-blur-md !px-6 !py-3 !rounded-2xl !text-sm !mb-4 !border !border-white/20"
            >
              <Zap className="!w-5 !h-5 !text-amber-300 !animate-pulse" />
              <span className="!font-medium !text-black">We're Hiring</span>
              <div className="!w-2 !h-2 !bg-amber-300 !rounded-full !animate-ping" />
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="!text-3xl md:!text-4xl lg:!text-7xl !font-black !mb-4 !leading-tight !tracking-tight"
            >
              Build Brands.  
              <span className="!text-transparent !bg-clip-text !bg-black !animate-gradient">
               {" "}  Not Just a Resume.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="!text-lg md:!text-xl !max-w-3xl !mx-auto !text-gray-400 !leading-relaxed !font-light !mb-6"
            >
              Join our elite team of strategists, designers, and technologists who are redefining digital creativity and business growth.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="!flex !flex-col sm:!flex-row !gap-4 !justify-center !items-center"
            >
              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#openings"
                className="!group !inline-flex !items-center !gap-4 !bg-gradient-to-r from-gray-800 to-black !text-white  !font-semibold !px-10 !py-5 !rounded-md !shadow-xl hover:!shadow-amber-500/25 !transition-all !duration-300"
              >
                <span> Explore Open Roles</span>
                <ArrowRight className="!w-5 !h-5 group-hover:!translate-x-1 !transition-transform" />
              </motion.a>

              {/* <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#culture"
                className="!group !inline-flex !items-center !gap-3 !bg-transparent !border-2 !border-gray-900 !text-gray-900 !font-semibold !px-10 !py-5 !rounded-2xl !backdrop-blur-sm hover:!bg-white/10 hover:!border-white/50 !transition-all !duration-300"
              >
                <Video className="!w-5 !h-5" />
                <span>Meet Our Team</span>
              </motion.a> */}
            </motion.div>
          </motion.div>
        </section>

        {/* Enhanced Stats Section */}
        {/* <section className="!py-20 !bg-white/80 !backdrop-blur-sm">
          <div className="!max-w-7xl !mx-auto !px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              variants={staggerContainer}
              viewport={{ once: true }}
              className="!grid !grid-cols-2 lg:grid-cols-4 !gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="!group !text-center !p-8 !rounded-3xl !bg-gradient-to-br from-white to-gray-50/50 !shadow-lg hover:!shadow-2xl !transition-all !duration-500 !border !border-gray-100 hover:!border-gray-200"
                >
                  <div className={`!inline-flex !items-center !justify-center !w-16 !h-16 !rounded-2xl !bg-gradient-to-br from-gray-50 to-white !shadow-sm !mb-6 group-hover:!shadow-md !transition-shadow ${stat.color}`}>
                    <stat.icon className="w-8 h-8" />
                  </div>
                  <div className="!text-4xl lg:!text-5xl !font-bold !mb-3 !bg-gradient-to-r from-gray-900 to-gray-700 !bg-clip-text !text-transparent">
                    {stat.value}
                  </div>
                  <div className="!text-gray-600 !font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section> */}

        {/* Enhanced Culture Section */}
        <section id="culture" className="!py-12 !px-6 !max-w-7xl !mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="!text-center !mb-20"
          >
            <div className="!inline-flex !items-center !gap-2 !text-sm !font-medium !text-gray-500 !uppercase !tracking-wider !mb-4">
              <div className="w-12 h-px bg-gray-300" />
              Our Culture
              <div className="w-12 h-px bg-gray-300" />
            </div>
            <h2 className="!text-4xl md:!text-5xl !font-bold !mb-6 !bg-gradient-to-r from-gray-900 to-indigo-900 !bg-clip-text !text-transparent">
              Where Excellence Meets Innovation
            </h2>
            <p className="!text-xl !text-gray-600 !max-w-3xl !mx-auto !leading-relaxed">
              A studio where bold ideas, meticulous craft, and measurable results come together every day.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="!grid !gap-8 md:!grid-cols-2 lg:!grid-cols-3"
          >
            {[
              {
                icon: Users,
                title: "Collaborative Excellence",
                desc: "Work alongside seasoned creatives in a culture of mentorship, shared ownership, and real teamwork.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Target,
                title: "Impact-Driven Results",
                desc: " Lead projects that move the needle with strategies and designs focused on measurable business outcomes.",
                color: "from-rose-500 to-pink-500"
              },
              {
                icon: Award,
                title: "Uncompromising Quality",
                desc: "We set the bar for craft and execution, delivering work that looks exceptional and performs reliably.",
                color: "from-amber-500 to-orange-500"
              },
              {
                icon: Zap,
                title: "Bold Innovation",
                desc: "Prototype new ideas, test brave concepts, and push conventions to create standout brand moments.",
                color: "from-purple-500 to-indigo-500"
              },
              {
                icon: Heart,
                title: "People First",
                desc: "Your well-being and growth are at the heart of everything we do.",
                color: "from-pink-500 to-rose-500"
              },
              {
                icon: TrendingUp,
                title: "Continuous Growth",
                desc: "Accelerate your career with personalized development paths and mentorship.",
                color: "from-green-500 to-emerald-500"
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={scaleIn}
                className="!group !relative !bg-white !p-4 !rounded-xl !shadow-md hover:!shadow-xl !transition-all !duration-500 !border !border-gray-100 hover:!border-transparent !overflow-hidden"
              >
                <div className="!absolute !inset-0 !bg-gradient-to-br from-white to-gray-50 !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-500" />
                <div className="!relative !z-10">
                  <div className={`!inline-flex !items-center !justify-center !w-16 !h-16 !rounded-2xl !bg-gradient-to-br ${item.color} !text-white !shadow-lg !mb-6 group-hover:!scale-110 !transition-transform !duration-300`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="!text-2xl !font-bold !text-gray-900 !mb-2 group-hover:!text-gray-800 !transition-colors">
                    {item.title}
                  </h3>
                  <p className="!text-gray-600 !leading-relaxed !text-lg">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Enhanced Benefits Section */}
        <section className="!py-12 !bg-gradient-to-br from-gray-50 via-blue-50/50 to-indigo-50/30">
          <div className="!max-w-7xl !mx-auto !px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="!text-center !mb-20"
            >
              <div className="!inline-flex !items-center !gap-2 !text-sm !font-medium !text-gray-500 !uppercase !tracking-wider !mb-4">
                <div className="!w-12 !h-px !bg-gray-300" />
                Why Join Us
                <div className="!w-12 !h-px !bg-gray-300" />
              </div>
              <h2 className="!text-4xl md:!text-5xl !font-bold !mb-6 !bg-gradient-to-r from-gray-900 to-indigo-900 !bg-clip-text !text-transparent">
                Work With Visionaries, Grow Beyond Limits
              </h2>
              <p className="!text-xl !text-gray-600 !max-w-3xl !mx-auto !leading-relaxed">
                Join a team that values creativity, innovation, and impact — where your ideas shape brands and your work inspires change.
              </p>
            </motion.div>

            <div className="!grid !gap-8 md:!grid-cols-2 lg:!grid-cols-3">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="!group !relative !bg-white !p-4 !rounded-xl !shadow-lg hover:!shadow-xl !transition-all !duration-500 !border !border-gray-100 hover:!border-transparent !overflow-hidden"
                >
                  <div className={`!absolute !inset-0 !bg-gradient-to-br ${benefit.color} !opacity-0 group-hover:!opacity-5 !transition-opacity !duration-500`} />
                  <div className="!relative !z-10">
                    <div className={`!inline-flex !items-center !justify-center !w-14 !h-14 !rounded-2xl !bg-gradient-to-br ${benefit.color} !text-white !shadow-lg !mb-6 group-hover:!scale-110 !transition-transform !duration-300`}>
                      <benefit.icon className="w-7 h-7" />
                    </div>
                    <h3 className="!text-xl !font-bold !text-gray-900 !mb-3 group-hover:!text-gray-800 !transition-colors">
                      {benefit.title}
                    </h3>
                    <p className="!text-gray-600 !leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Job Openings Section */}
        <section id="openings" className="!py-12 !px-6 !bg-white">
          <div className="!max-w-7xl !mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="!text-center !mb-20"
            >
              <div className="!inline-flex !items-center !gap-2 !text-sm !font-medium !text-gray-500 !uppercase !tracking-wider !mb-4">
                <div className="!w-12 !h-px !bg-gray-300" />
                Open Positions
                <div className="!w-12 !h-px !bg-gray-300" />
              </div>
              <h2 className="!text-5xl md:!text-6xl !font-bold !mb-4 !bg-gradient-to-r from-gray-900 to-indigo-900 !bg-clip-text !text-transparent">
                Your Next Career Move
              </h2>
              <p className="!text-xl !text-gray-600 !max-w-3xl !mx-auto !leading-relaxed">
                Discover opportunities that match your skills and ambitions.
                Help us build the future of digital innovation.
              </p>
            </motion.div>

            {loading ? (
              <div className="!flex !justify-center !items-center !py-10">
                <div className="!animate-spin !rounded-full !h-16 !w-16 !border-4 !border-indigo-600 !border-t-transparent"></div>
              </div>
            ) : jobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="!text-center !py-20"
              >
                <Briefcase className="!w-24 !h-24 !text-gray-300 !mx-auto !mb-6" />
                <h3 className="!text-2xl !font-bold !text-gray-600 !mb-4">No Current Openings</h3>
                <p className="!text-gray-500 !max-w-md !mx-auto">
                  We're not hiring at the moment, but check back soon for new opportunities!
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="!grid !gap-8 md:!grid-cols-2 lg:!grid-cols-3"
              >
                {jobs.map((job, idx) => (
                  <motion.div
                    key={job._id}
                    variants={scaleIn}
                    className="!group !relative !bg-gradient-to-br from-white to-gray-50/50 !p-8 !rounded-3xl !shadow-xl hover:!shadow-2xl !transition-all !duration-500 !border !border-gray-100 hover:!border-transparent !overflow-hidden"
                  >
                    <div className="!absolute !border !border-gray-400  !inset-0 !bg-gradient-to-br from-indigo-500/5 to-purple-500/5 !opacity-0 group-hover:!opacity-100 !transition-opacity !duration-500" />
                    <div className="!relative !z-10 ">
                      <div className="!flex !items-start !justify-between !mb-6">
                        <h3 className="!text-2xl !font-bold !text-gray-900 group-hover:!text-gray-800 !transition-colors !flex-1">
                          {job.title}
                        </h3>
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          className="!w-12 !h-12 !bg-gradient-to-br from-yellow-400 to-yellow-600 !rounded-2xl !flex !items-center !justify-center !shadow-lg"
                        >
                          <Briefcase className="!w-6 !h-6 !text-white" />
                        </motion.div>
                      </div>

                      <div
                        className="!text-gray-600 !mb-6 !leading-relaxed !prose !prose-lg !max-w-none"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />

                      <div className="!space-y-4 !mb-6">
                        <div className="!flex !items-center !gap-4 !text-sm !text-gray-500">
                          <div className="!flex !items-center !gap-2">
                            <MapPin className="!w-4 !h-4" />
                            <span className="!font-medium">{job.location}</span>
                          </div>
                          <div className="!flex !items-center !gap-2">
                            <Calendar className="!w-4 !h-4" />
                            <span className="!font-medium">{job.type}</span>
                          </div>
                        </div>

                        {job.salary && (
                          <div className="!flex !items-center !gap-2 !text-sm">
                            <div className="!w-2 !h-2 !bg-green-500 !rounded-full" />
                            <span className="!text-gray-600">
                              <span className="!font-semibold !text-gray-900">Salary:</span> {job.salary}
                            </span>
                          </div>
                        )}

                        {job.experience && (
                          <div className="!flex !items-center !gap-2 !text-sm">
                            <div className="!w-2 !h-2 !bg-blue-500 !rounded-full" />
                            <span className="!text-gray-600">
                              <span className="!font-semibold !text-gray-900">Experience:</span> {job.experience}
                            </span>
                          </div>
                        )}

                        {job.applicationDeadline && (
                          <div className="!flex !items-center !gap-2 !text-sm">
                            <div className="!w-2 !h-2 !bg-amber-500 !rounded-full" />
                            <span className="!text-gray-600">
                              <span className="!font-semibold !text-gray-900">Apply by:</span>{" "}
                              {new Date(job.applicationDeadline).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>

                      {job.tags && job.tags.length > 0 && (
                        <div className="!flex !flex-wrap !gap-2 !mb-6">
                          {job.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="!px-3 !py-1 !bg-indigo-100 !text-indigo-700 !text-xs !font-medium !rounded-full !border !border-indigo-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleApplyClick(job.title)}
                        className="!w-full !bg-black !border !border-gray-500 !text-white !py-4 !px-6 !rounded-2xl !shadow-lg hover:!shadow-xl !transition-all !duration-300 !flex !items-center !justify-center !gap-3 !font-semibold group/btn"
                      >
                        <span>Apply Now</span>
                        <ArrowRight className="!w-5 !h-5 group-hover/btn:!translate-x-1 !transition-transform" />
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Enhanced Application Form */}
        <section id="application-form" className="!py-24 !bg-gradient-to-br from-gray-50 via-indigo-50/30 to-purple-50/30">
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="!max-w-4xl !mx-auto !bg-white !shadow-2xl !rounded-3xl !p-8 md:!p-12 !border !border-gray-100"
          >
            <div className="!text-center !mb-12">
              <div className="!inline-flex !items-center !gap-2 !text-sm !font-medium !text-gray-500 !uppercase !tracking-wider !mb-4">
                <div className="w-8 h-px bg-gray-300" />
                Apply Now
                <div className="!w-8 !h-px !bg-gray-300" />
              </div>
              <h2 className="!text-4xl !font-bold !mb-4 !text-gray-900">
                Apply for{" "}
                <span className="!bg-gradient-to-r from-yellow-400 to-yellow-600 !bg-clip-text !text-transparent">
                  {selectedJob || "Your Dream Role"}
                </span>
              </h2>
              <p className="!text-gray-600 !text-lg !max-w-lg !mx-auto">
                Ready to take the next step in your career? We're excited to learn about you!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="!space-y-4">
              <div className="!grid !gap-8 md:!grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <label className="!block !text-gray-700 !mb-3 !font-semibold">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="!w-full !border-2 !border-gray-200 !rounded-2xl !px-5 !py-4 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white"
                    placeholder="Your full name"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <label className="!block !text-gray-700 !mb-3 !font-semibold">Email *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="!w-full !border-2 !border-gray-200 !rounded-2xl !px-5 !py-4 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white"
                    placeholder="your.email@example.com"
                  />
                </motion.div>
              </div>

              <div className="!grid !gap-8 md:!grid-cols-2">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <label className="!block !text-gray-700 !mb-3 !font-semibold">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="!w-full !border-2 !border-gray-200 !rounded-2xl !px-5 !py-4 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white"
                    placeholder="+1 (234) 567-8900"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <label className="!block !text-gray-700 !mb-3 !font-semibold">Position *</label>
                  <input
                    type="text"
                    name="position"
                    readOnly
                    value={formData.position}
                    placeholder="Select a position above"
                    className="!w-full !border-2 !border-gray-200 !bg-gray-100 !rounded-2xl !px-5 !py-4 !text-gray-600"
                  />
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                viewport={{ once: true }}
              >
                <label className="!block !text-gray-700 !mb-3 !font-semibold">Cover Letter</label>
                <textarea
                  name="coverLetter"
                  rows="6"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  className="!w-full !border-2 !border-gray-200 !rounded-2xl !px-5 !py-4 focus:!ring-2 focus:!ring-indigo-500 focus:!border-transparent !outline-none !transition-all !duration-300 !bg-gray-50/50 focus:!bg-white !resize-none"
                  placeholder="Tell us about your experience, why you're interested in this role, and what makes you the perfect candidate..."
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                <label className="!block !text-gray-700 !mb-3 !font-semibold">Resume (PDF/DOC) *</label>
                <div className="!flex !items-center !justify-center !w-full">
                  <label className="!flex !flex-col !items-center !justify-center !w-full !h-40 !border-2 !border-dashed !border-gray-300 !rounded-2xl !cursor-pointer !bg-gray-50/50 hover:!bg-gray-100 !transition-all !duration-300 group/upload">
                    <div className="!flex !flex-col !items-center !justify-center !pt-5 !pb-6">
                      <FileText className="!w-12 !h-12 !mb-4 !text-gray-400 group-hover/upload:!text-indigo-500 !transition-colors" />
                      <p className="!mb-2 !text-lg !text-gray-500 group-hover/upload:!text-gray-600">
                        {formData.resume ? formData.resume.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="!text-sm !text-gray-400 group-hover/upload:!text-gray-500">
                        PDF, DOC, DOCX (MAX. 10MB)
                      </p>
                    </div>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </motion.div>

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="!w-full !bg-gradient-to-r from-gray-700  to-gray-900 !text-white !py-5 !rounded-2xl !shadow-xl hover:!shadow-2xl !transition-all !duration-300 !flex !items-center !justify-center !gap-3 !font-semibold disabled:!opacity-50 disabled:!cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="!animate-spin !rounded-full !h-6 !w-6 !border-2 !border-white !border-t-transparent" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <Send className="!w-5 !h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </section>

        {/* Enhanced Footer CTA */}
        <section className="!py-20  !bg-gray-600 !text-gray-900">
          <div className="!max-w-5xl !mx-auto !px-6 !text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="!text-4xl md:!text-5xl !font-bold !mb-3 ">
                Ready to Make an Impact?
              </h2>
              <p className="!text-xl !text-white !max-w-2xl !mx-auto !mb-10 !leading-relaxed">
                Join us in shaping the future of digital innovation.
                Let's build something extraordinary together.
              </p>

              <div className="!flex !flex-col sm:!flex-row !gap-4 !justify-center !items-center !mb-10">
                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="mailto:careers@yourcompany.com"
                  className="!inline-flex !items-center !gap-3 !bg-white !text-yellow-500 !font-semibold !px-8 !py-2 !rounded-2xl !shadow-2xl hover:!shadow-white/25 !transition-all !duration-300"
                >
                  <MessageCircle className="!w-5 !h-5" />
                  Contact Our Team
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  href="#openings"
                  className="!inline-flex !items-center !gap-3 !bg-transparent !border-2 !border-white/30 !text-white !font-semibold !px-8 !py-2 !rounded-2xl !backdrop-blur-sm hover:!bg-white/10 hover:!border-white/50 !transition-all !duration-300"
                >
                  <ArrowRight className="!w-5 !h-5" />
                  View Open Roles
                </motion.a>
              </div>

              <div className="!border-t !border-white/20 !pt-6">
                <p className="!text-white !mb-8">Follow our journey</p>
                <div className="!flex !justify-center !gap-8">
                  {[
                    { icon: Linkedin, href: "#", color: "hover:!text-white" },
                    { icon: Twitter, href: "#", color: "hover:!text-white" },
                    { icon: Instagram, href: "#", color: "hover:!text-white" },
                  ].map((social, idx) => (
                    <motion.a
                      key={idx}
                      whileHover={{ scale: 1.2, y: -2 }}
                      href={social.href}
                      className={`!text-white ${social.color} !transition-all !duration-300`}
                    >
                      <social.icon className="!w-6 !h-6" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </RiddaLayout>
  );
}