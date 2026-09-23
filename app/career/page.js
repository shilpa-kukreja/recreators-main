
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
  Briefcase, Users, Target, Clock, MapPin, Send, FileText,
  ArrowRight, Heart, Award, Zap, Linkedin, Twitter, Instagram,
  Rocket, Globe, Shield, BookOpen, TrendingUp, MessageCircle,
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
    { title: "Competitive Salary", desc: "Industry-leading pay with bonuses.", icon: TrendingUp },
    { title: "Flexible Hours", desc: "Work when you're most productive.", icon: Clock },
    { title: "Remote First", desc: "Work from anywhere, async culture.", icon: Globe },
    { title: "Health & Wellness", desc: "Medical, dental, vision & mental health.", icon: Shield },
    { title: "Learning Budget", desc: "$3,000/year for courses & conferences.", icon: BookOpen },
    { title: "Team Retreats", desc: "Annual paid retreats, global locations.", icon: Rocket },
  ];

  const culture = [
    { icon: Users, title: "Collaborative Excellence", desc: "Work with seasoned creatives in a culture of mentorship." },
    { icon: Target, title: "Impact-Driven Results", desc: "Lead projects with strategies focused on outcomes." },
    { icon: Award, title: "Uncompromising Quality", desc: "Work that looks exceptional and performs reliably." },
    { icon: Zap, title: "Bold Innovation", desc: "Prototype ideas, test concepts, push conventions." },
    { icon: Heart, title: "People First", desc: "Your well-being and growth are at our heart." },
    { icon: TrendingUp, title: "Continuous Growth", desc: "Personalized paths and mentorship for your career." },
  ];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/careers`
        );
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
      block: "start",
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
      if (formData.resume) formPayload.append("resume", formData.resume);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/carrer/carrer-forms`,
        { method: "POST", body: formPayload }
      );

      if (!response.ok) throw new Error("Failed to submit the application");

      await response.json();
      toast.success("🎉 Application submitted successfully! We'll be in touch soon.");

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

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.97 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <RiddaLayout>
      <PageBanner pageTitle="Career" pageName="Join Our Team" />

      {/* 🎨 CHANGE THIS HEX FOR YOUR BRAND COLOR */}
      <div
        className="!bg-white !text-neutral-900"
        style={{ "--brand": "#FF6B35" }}
      >
        {/* ═══════════════════════════════════════ */}
        {/* HERO — dark bg (matches Final CTA)     */}
        {/* ═══════════════════════════════════════ */}
        <section
          className="!relative !overflow-hidden !px-6 !py-12 lg:!py-16"
          style={{ background: "#0A0A0F" }}
        >
          {/* Same glow as Final CTA */}
          <div
            className="!pointer-events-none !absolute !left-1/2 !top-1/2 !h-72 !w-72 !-translate-x-1/2 !-translate-y-1/2 !rounded-full !opacity-20 !blur-[120px]"
            style={{ background: "var(--brand)" }}
          />

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="!relative !z-10 !mx-auto !max-w-3xl !text-center"
          >
            {/* Eyebrow */}
            {/* <motion.div
              variants={fadeInUp}
              className="!mb-4 !inline-flex !items-center !gap-1.5 !rounded-full !border !px-2.5 !py-1 !text-[10px] !font-bold !uppercase !tracking-widest"
              style={{
                borderColor: "color-mix(in srgb, var(--brand) 40%, transparent)",
                background: "color-mix(in srgb, var(--brand) 12%, transparent)",
                color: "var(--brand)",
              }}
            >
              <span
                className="!h-1 !w-1 !animate-pulse !rounded-full"
                style={{ background: "var(--brand)" }}
              />
              We're Hiring
            </motion.div> */}

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="!text-[26px] !font-bold !leading-[1.1] !tracking-tight !text-white sm:!text-[36px] lg:!text-[44px]"
            >
              Build brands.{" "}
              <span style={{ color: "var(--brand)" }}>
                Not just a resume.
              </span>
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeInUp}
              className="!mx-auto !mt-4 !max-w-md !text-[13px] !leading-relaxed !text-white/55 sm:!text-sm"
            >
              Join our elite team of strategists, designers & technologists
              redefining digital creativity.
            </motion.p>

            {/* CTA */}
            {/* <motion.div variants={fadeInUp} className="!mt-6">
              <a
                href="#openings"
                className="!group !inline-flex !items-center !gap-2 !rounded-full !px-5 !py-2.5 !text-[12.5px] !font-bold !text-black !transition-transform hover:!scale-[1.03]"
                style={{
                  background: "var(--brand)",
                  boxShadow:
                    "0 0 30px color-mix(in srgb, var(--brand) 50%, transparent)",
                }}
              >
                Explore Open Roles
                <ArrowRight className="!h-3.5 !w-3.5 !transition-transform group-hover:!translate-x-0.5" />
              </a>
            </motion.div> */}
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* CULTURE                                 */}
        {/* ═══════════════════════════════════════ */}
        <section id="culture" className="!bg-white !px-6 !py-10 lg:!py-14">
          <div className="!mx-auto !max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="!mb-8 !text-center"
            >
              <div className="!mb-2.5 !flex !items-center !justify-center !gap-2.5">
                <span
                  className="!h-[2px] !w-6 !rounded-full"
                  style={{ background: "var(--brand)" }}
                />
                <span
                  className="!text-[10px] !font-bold !uppercase !tracking-[0.25em]"
                  style={{ color: "var(--brand)" }}
                >
                  Our Culture
                </span>
                <span
                  className="!h-[2px] !w-6 !rounded-full"
                  style={{ background: "var(--brand)" }}
                />
              </div>

              <h2 className="!text-[20px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-[26px]">
                Where excellence meets{" "}
                <span style={{ color: "var(--brand)" }}>innovation.</span>
              </h2>

              <p className="!mx-auto !mt-2 !max-w-md !text-[12px] !leading-relaxed !text-neutral-500">
                Bold ideas, meticulous craft, and measurable results — every day.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="!grid !gap-3 sm:!grid-cols-2 lg:!grid-cols-3"
            >
              {culture.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={scaleIn}
                  className="!group !relative !overflow-hidden !rounded-xl !border !border-neutral-200 !bg-white !p-4 !transition-all !duration-300 hover:!-translate-y-1 hover:!border-[var(--brand)] hover:!shadow-md"
                >
                  <div
                    className="!mb-3 !flex !h-8 !w-8 !items-center !justify-center !rounded-lg !text-white !transition-transform group-hover:!scale-110"
                    style={{ background: "var(--brand)" }}
                  >
                    <item.icon size={15} />
                  </div>
                  <h3 className="!text-[12.5px] !font-bold !text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="!mt-1 !text-[11px] !leading-relaxed !text-neutral-500">
                    {item.desc}
                  </p>
                  <div
                    className="!absolute !bottom-0 !left-0 !h-[2px] !w-0 !transition-all !duration-500 group-hover:!w-full"
                    style={{ background: "var(--brand)" }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* BENEFITS                                */}
        {/* ═══════════════════════════════════════ */}
        <section className="!bg-neutral-50 !px-6 !py-10 lg:!py-14">
          <div className="!mx-auto !max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="!mb-8 !text-center"
            >
              <div className="!mb-2.5 !flex !items-center !justify-center !gap-2.5">
                <span
                  className="!h-[2px] !w-6 !rounded-full"
                  style={{ background: "var(--brand)" }}
                />
                <span
                  className="!text-[10px] !font-bold !uppercase !tracking-[0.25em]"
                  style={{ color: "var(--brand)" }}
                >
                  Why Join Us
                </span>
                <span
                  className="!h-[2px] !w-6 !rounded-full"
                  style={{ background: "var(--brand)" }}
                />
              </div>

              <h2 className="!text-[20px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-[26px]">
                Work with visionaries.{" "}
                <span style={{ color: "var(--brand)" }}>
                  Grow beyond limits.
                </span>
              </h2>

              <p className="!mx-auto !mt-2 !max-w-md !text-[12px] !leading-relaxed !text-neutral-500">
                Creativity, innovation, and impact — where your work inspires change.
              </p>
            </motion.div>

            <div className="!grid !gap-3 sm:!grid-cols-2 lg:!grid-cols-3">
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: idx * 0.06 }}
                  viewport={{ once: true }}
                  className="!group !relative !overflow-hidden !rounded-xl !border !border-neutral-200 !bg-white !p-4 !transition-all !duration-300 hover:!-translate-y-1 hover:!border-[var(--brand)] hover:!shadow-md"
                >
                  <div
                    className="!mb-3 !flex !h-8 !w-8 !items-center !justify-center !rounded-lg !text-white !transition-transform group-hover:!scale-110"
                    style={{ background: "var(--brand)" }}
                  >
                    <benefit.icon size={15} />
                  </div>
                  <h3 className="!text-[12.5px] !font-bold !text-neutral-900">
                    {benefit.title}
                  </h3>
                  <p className="!mt-1 !text-[11px] !leading-relaxed !text-neutral-500">
                    {benefit.desc}
                  </p>
                  <div
                    className="!absolute !bottom-0 !left-0 !h-[2px] !w-0 !transition-all !duration-500 group-hover:!w-full"
                    style={{ background: "var(--brand)" }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* OPEN POSITIONS                          */}
        {/* ═══════════════════════════════════════ */}
        <section id="openings" className="!bg-white !px-6 !py-10 lg:!py-14">
          <div className="!mx-auto !max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="!mb-8 !text-center"
            >
              <div className="!mb-2.5 !flex !items-center !justify-center !gap-2.5">
                <span
                  className="!h-[2px] !w-6 !rounded-full"
                  style={{ background: "var(--brand)" }}
                />
                <span
                  className="!text-[10px] !font-bold !uppercase !tracking-[0.25em]"
                  style={{ color: "var(--brand)" }}
                >
                  Open Positions
                </span>
                <span
                  className="!h-[2px] !w-6 !rounded-full"
                  style={{ background: "var(--brand)" }}
                />
              </div>

              <h2 className="!text-[22px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-[28px]">
                Your next career move{" "}
                <span style={{ color: "var(--brand)" }}>starts here.</span>
              </h2>

              <p className="!mx-auto !mt-2 !max-w-md !text-[12px] !leading-relaxed !text-neutral-500">
                Opportunities that match your skills and ambitions.
              </p>
            </motion.div>

            {loading ? (
              <div className="!flex !justify-center !py-12">
                <div
                  className="!h-10 !w-10 !animate-spin !rounded-full !border-4 !border-t-transparent"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--brand) 20%, transparent)",
                    borderTopColor: "var(--brand)",
                  }}
                />
              </div>
            ) : jobs.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="!rounded-2xl !border !border-dashed !border-neutral-200 !bg-neutral-50 !py-12 !text-center"
              >
                <Briefcase className="!mx-auto !mb-3 !h-10 !w-10 !text-neutral-300" />
                <h3 className="!text-[14px] !font-bold !text-neutral-700">
                  No current openings
                </h3>
                <p className="!mx-auto !mt-1 !max-w-sm !text-[12px] !text-neutral-500">
                  Check back soon for new opportunities.
                </p>
              </motion.div>
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="!grid !gap-4 sm:!grid-cols-2 lg:!grid-cols-3"
              >
                {jobs.map((job) => (
                  <motion.div
                    key={job._id}
                    variants={scaleIn}
                    className="!group !relative !flex !flex-col !overflow-hidden !rounded-2xl !border !border-neutral-200 !bg-white !p-4 !shadow-sm !transition-all !duration-300 hover:!-translate-y-1.5 hover:!border-[var(--brand)] hover:!shadow-lg"
                  >
                    {/* Top accent */}
                    <div
                      className="!absolute !left-0 !top-0 !h-[3px] !w-full !opacity-0 !transition-opacity !duration-300 group-hover:!opacity-100"
                      style={{ background: "var(--brand)" }}
                    />

                    {/* Header: icon + deadline */}
                    <div className="!mb-3 !flex !items-start !justify-between">
                      {/* <div
                        className="!flex !h-9 !w-9 !items-center !justify-center !rounded-lg !text-white"
                        style={{
                          background: "var(--brand)",
                          boxShadow:
                            "0 0 20px color-mix(in srgb, var(--brand) 40%, transparent)",
                        }}
                      >
                        <Briefcase size={15} />
                      </div> */}

                      {job.applicationDeadline && (
                        <span
                          className="!rounded-full !px-2 !py-0.5 !text-[9px] !font-bold !uppercase !tracking-wider"
                          style={{
                            background:
                              "color-mix(in srgb, var(--brand) 12%, transparent)",
                            color: "var(--brand)",
                          }}
                        >
                          By{" "}
                          {new Date(job.applicationDeadline).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric" }
                          )}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="!text-[14px] !font-bold !leading-snug !text-neutral-900 transition-colors group-hover:!text-[var(--brand)]">
                      {job.title}
                    </h3>

                    {/* Meta */}
                    <div className="!mt-2 !flex !flex-wrap !items-center !gap-x-3 !gap-y-1 !text-[10.5px] !text-neutral-500">
                      {job.location && (
                        <span className="!flex !items-center !gap-1">
                          <MapPin size={11} className="!opacity-60" />
                          {job.location}
                        </span>
                      )}
                      {job.type && (
                        <span className="!flex !items-center !gap-1">
                          <Clock size={11} className="!opacity-60" />
                          {job.type}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <div
                      className="!mt-2.5 !line-clamp-2 !text-[11.5px] !leading-relaxed !text-neutral-500"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />

                    {/* Salary/Experience */}
                    {(job.salary || job.experience) && (
                      <div className="!mt-3 !flex !flex-wrap !gap-1.5">
                        {job.salary && (
                          <span className="!rounded-md !bg-neutral-100 !px-2 !py-1 !text-[10px] !font-bold !text-neutral-700">
                            💰 {job.salary}
                          </span>
                        )}
                        {job.experience && (
                          <span className="!rounded-md !bg-neutral-100 !px-2 !py-1 !text-[10px] !font-bold !text-neutral-700">
                            ⚡ {job.experience}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Tags */}
                    {job.tags && job.tags.length > 0 && (
                      <div className="!mt-3 !flex !flex-wrap !gap-1">
                        {job.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="!rounded-full !border !border-neutral-200 !bg-white !px-2 !py-0.5 !text-[9px] !font-semibold !text-neutral-600"
                          >
                            {tag}
                          </span>
                        ))}
                        {/* {job.tags.length > 2 && (
                          <span className="!rounded-full !bg-neutral-100 !px-2 !py-0.5 !text-[9px] !font-semibold !text-neutral-500">
                            +{job.tags.length - 2}
                          </span>
                        )} */}
                      </div>
                    )}

                    {/* Button */}
                    <div className="!mt-auto !pt-4">
                      <button
                        onClick={() => handleApplyClick(job.title)}
                        className="!group/btn !flex !w-full !items-center !justify-center !gap-1.5 !rounded-lg !border !border-neutral-200 !bg-neutral-50 !py-2 !text-[11.5px] !font-bold !text-neutral-900 !transition-all hover:!border-[var(--brand)] hover:!bg-[var(--brand)] hover:!text-black"
                      >
                        Apply now
                        <ArrowRight
                          size={13}
                          className="!transition-transform group-hover/btn:!translate-x-1"
                        />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* APPLICATION FORM                        */}
        {/* ═══════════════════════════════════════ */}
        <section
          id="application-form"
          className="!bg-neutral-50 !px-6 !py-10 lg:!py-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="!mx-auto !max-w-3xl !overflow-hidden !rounded-2xl !border !border-neutral-200 !bg-white !p-5 !shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)] sm:!p-7"
          >
            {/* Header */}
            <div className="!mb-6 !text-center">
              <div className="!mb-2.5 !flex !items-center !justify-center !gap-2.5">
                <span
                  className="!h-[2px] !w-5 !rounded-full"
                  style={{ background: "var(--brand)" }}
                />
                <span
                  className="!text-[10px] !font-bold !uppercase !tracking-[0.25em]"
                  style={{ color: "var(--brand)" }}
                >
                  Apply Now
                </span>
                <span
                  className="!h-[2px] !w-5 !rounded-full"
                  style={{ background: "var(--brand)" }}
                />
              </div>

              <h2 className="!text-[18px] !font-bold !leading-tight !tracking-tight !text-neutral-900 sm:!text-[22px]">
                Apply for{" "}
                <span style={{ color: "var(--brand)" }}>
                  {selectedJob || "your dream role"}
                </span>
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="!space-y-4">
              {/* Row 1 */}
              <div className="!grid !gap-3 sm:!grid-cols-2">
                <div>
                  <label className="!mb-1.5 !block !text-[10px] !font-bold !uppercase !tracking-wider !text-neutral-500">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    className="!w-full !rounded-lg !border !border-neutral-200 !bg-neutral-50 !px-3 !py-2.5 !text-[12.5px] !text-neutral-900 !outline-none !transition-all placeholder:!text-neutral-400 focus:!border-[var(--brand)] focus:!bg-white"
                  />
                </div>
                <div>
                  <label className="!mb-1.5 !block !text-[10px] !font-bold !uppercase !tracking-wider !text-neutral-500">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="!w-full !rounded-lg !border !border-neutral-200 !bg-neutral-50 !px-3 !py-2.5 !text-[12.5px] !text-neutral-900 !outline-none !transition-all placeholder:!text-neutral-400 focus:!border-[var(--brand)] focus:!bg-white"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="!grid !gap-3 sm:!grid-cols-2">
                <div>
                  <label className="!mb-1.5 !block !text-[10px] !font-bold !uppercase !tracking-wider !text-neutral-500">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (234) 567-8900"
                    className="!w-full !rounded-lg !border !border-neutral-200 !bg-neutral-50 !px-3 !py-2.5 !text-[12.5px] !text-neutral-900 !outline-none !transition-all placeholder:!text-neutral-400 focus:!border-[var(--brand)] focus:!bg-white"
                  />
                </div>
                <div>
                  <label className="!mb-1.5 !block !text-[10px] !font-bold !uppercase !tracking-wider !text-neutral-500">
                    Position *
                  </label>
                  <input
                    type="text"
                    name="position"
                    readOnly
                    value={formData.position}
                    placeholder="Select above"
                    className="!w-full !cursor-not-allowed !rounded-lg !border !border-neutral-200 !bg-neutral-100 !px-3 !py-2.5 !text-[12.5px] !text-neutral-600 !outline-none"
                  />
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <label className="!mb-1.5 !block !text-[10px] !font-bold !uppercase !tracking-wider !text-neutral-500">
                  Cover Letter
                </label>
                <textarea
                  name="coverLetter"
                  rows="3"
                  value={formData.coverLetter}
                  onChange={handleChange}
                  placeholder="Tell us about your experience & why you're a great fit..."
                  className="!w-full !resize-none !rounded-lg !border !border-neutral-200 !bg-neutral-50 !px-3 !py-2.5 !text-[12.5px] !text-neutral-900 !outline-none !transition-all placeholder:!text-neutral-400 focus:!border-[var(--brand)] focus:!bg-white"
                />
              </div>

              {/* Resume */}
              <div>
                <label className="!mb-1.5 !block !text-[10px] !font-bold !uppercase !tracking-wider !text-neutral-500">
                  Resume (PDF / DOC) *
                </label>
                <label className="!group/upload !flex !cursor-pointer !flex-col !items-center !justify-center !rounded-lg !border-2 !border-dashed !border-neutral-200 !bg-neutral-50 !py-6 !transition-all hover:!border-[var(--brand)] hover:!bg-white">
                  <FileText
                    size={24}
                    className="!mb-2 !text-neutral-400 transition-colors group-hover/upload:!text-[var(--brand)]"
                  />
                  <p className="!text-[11.5px] !font-medium !text-neutral-600">
                    {formData.resume
                      ? formData.resume.name
                      : "Click to upload or drag & drop"}
                  </p>
                  <p className="!mt-0.5 !text-[9.5px] !text-neutral-400">
                    PDF, DOC, DOCX · Max 10MB
                  </p>
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

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="!group !flex !w-full !items-center !justify-center !gap-2 !rounded-lg !py-3 !text-[12.5px] !font-bold !text-black !transition-transform hover:!scale-[1.01] disabled:!cursor-not-allowed disabled:!opacity-60"
                style={{
                  background: "var(--brand)",
                  boxShadow:
                    "0 0 30px color-mix(in srgb, var(--brand) 40%, transparent)",
                }}
              >
                {isSubmitting ? (
                  <>
                    <span className="!h-3.5 !w-3.5 !animate-spin !rounded-full !border-2 !border-black/30 !border-t-black" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application
                    <Send
                      size={13}
                      className="!transition-transform group-hover:!translate-x-0.5"
                    />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </section>

        {/* ═══════════════════════════════════════ */}
        {/* FINAL CTA — same bg as Hero             */}
        {/* ═══════════════════════════════════════ */}
        <section
          className="!relative !overflow-hidden !px-6 !py-12 lg:!py-16"
          style={{ background: "#0A0A0F" }}
        >
          {/* Same glow as Hero */}
          <div
            className="!pointer-events-none !absolute !left-1/2 !top-1/2 !h-72 !w-72 !-translate-x-1/2 !-translate-y-1/2 !rounded-full !opacity-20 !blur-[120px]"
            style={{ background: "var(--brand)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            viewport={{ once: true }}
            className="!relative !z-10 !mx-auto !max-w-2xl !text-center"
          >
            {/* Eyebrow */}
            {/* <div
              className="!mb-3 !inline-flex !items-center !gap-1.5 !rounded-full !border !px-2.5 !py-1 !text-[10px] !font-bold !uppercase !tracking-widest"
              style={{
                borderColor: "color-mix(in srgb, var(--brand) 40%, transparent)",
                background: "color-mix(in srgb, var(--brand) 12%, transparent)",
                color: "var(--brand)",
              }}
            >
              <span
                className="!h-1 !w-1 !animate-pulse !rounded-full"
                style={{ background: "var(--brand)" }}
              />
              Let's Talk
            </div> */}

            {/* Headline */}
            <h2 className="!text-[22px] !font-bold !leading-tight !tracking-tight !text-white sm:!text-[28px] lg:!text-[32px]">
              Ready to make an{" "}
              <span style={{ color: "var(--brand)" }}>impact?</span>
            </h2>

            <p className="!mx-auto !mt-3 !max-w-md !text-[12.5px] !leading-relaxed !text-white/55 sm:!text-[13px]">
              Join us in shaping the future of digital innovation. Let's build
              something extraordinary.
            </p>

            {/* CTAs */}
            <div className="!mt-6 !flex !flex-wrap !justify-center !gap-2.5">
              <a
                href="mailto:careers@yourcompany.com"
                className="!group !inline-flex !items-center !gap-1.5 !rounded-full !px-5 !py-2.5 !text-[12px] !font-bold !text-black !transition-transform hover:!scale-[1.03]"
                style={{
                  background: "var(--brand)",
                  
                }}
              >
                <MessageCircle size={14} />
                Contact Our Team
              </a>

              <a
                href="#openings"
                className="!group !inline-flex !items-center !gap-1.5 !rounded-full !border !border-white/15 !bg-white/[0.04] !px-5 !py-2.5 !text-[12px] !font-semibold !text-white !backdrop-blur !transition-all hover:!border-white/30 hover:!bg-white/[0.08]"
              >
                View Open Roles
                <ArrowRight
                  size={14}
                  className="!transition-transform group-hover:!translate-x-0.5"
                />
              </a>
            </div>

            {/* Social */}
            {/* <div className="!mt-7 !border-t !border-white/10 !pt-5">
              <p className="!mb-3 !text-[9.5px] !font-bold !uppercase !tracking-widest !text-white/40">
                Follow our journey
              </p>
              <div className="!flex !justify-center !gap-2.5">
                {[
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="!flex !h-8 !w-8 !items-center !justify-center !rounded-full !border !border-white/10 !bg-white/[0.04] !text-white/70 !transition-all hover:!border-[var(--brand)] hover:!bg-[var(--brand)] hover:!text-black"
                  >
                    <social.icon size={13} />
                  </a>
                ))}
              </div>
            </div> */}
          </motion.div>
        </section>
      </div>
    </RiddaLayout>
  );
}