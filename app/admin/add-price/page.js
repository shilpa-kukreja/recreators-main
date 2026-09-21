// "use client";
// import React, { useState } from "react";
// import axios from "axios";
// import dynamic from "next/dynamic";
// import { toast } from "react-toastify";
// import {
//   DollarSign,
//   Tag,
//   FileText,
//   CheckSquare,
//   ArrowRight,
//   Sparkles,
//   Zap,
//   Eye,
//   Layout,
//   Palette,
//   TrendingUp,
//   Shield,
//   Rocket,
//   Star,
// } from "lucide-react";
// import AdminLayout from "../components/AdminLayout";
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";

// // Dynamically import CKEditor with custom loading component
// const CKEditor = dynamic(
//   () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="!h-64 !bg-gradient-to-br from-gray-50 to-blue-50 !rounded-2xl !flex !items-center !justify-center !border-2 !border-dashed !border-blue-200">
//         <div className="text-center">
//           <div className="!animate-spin !rounded-full !h-8 !w-8 !border-b-2 !border-blue-600 !mx-auto !mb-3"></div>
//           <p className="!text-gray-700 !font-medium">Loading Rich Text Editor...</p>
//           <p className="!text-gray-500 !text-sm !mt-1">
//             Preparing advanced editing capabilities
//           </p>
//         </div>
//       </div>
//     ),
//   }
// );

// let ClassicEditor;
// if (typeof window !== "undefined") {
//   ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
// }

// const AddPrice = () => {
//   const [form, setForm] = useState({
//     title: "",
//     price: "",
//     afterText: "/monthly",
//     text: "", // CKEditor data here
//     list: "",
//   });
//   const searchParams = useSearchParams();

//   const [loading, setLoading] = useState(false);
//   const editId = searchParams.get("id");
//   const [preview, setPreview] = useState(true);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [editorLoaded, setEditorLoaded] = useState(false);
 

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };


//     useEffect(() => {
//     if (editId) {
//       setLoading(true);
//       axios
//         .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/getpriceid/${editId}`)
//         .then(({ data }) => {
//           setForm({
//             title: data.title,
//             price: data.price,
//             afterText: data.afterText,
//             text: data.text,
//             list: data.list.join("\n"),
//           });
//         })
//         .catch(() => toast.error("Failed to load pricing data"))
//         .finally(() => setLoading(false));
//     }
//   }, [editId]);
  
//     useEffect(() => {
//       setEditorLoaded(true);
//     }, []);

//   const handleEditorChange = (event, editor) => {
//     const data = editor.getData();
//     setForm((prev) => ({
//       ...prev,
//       text: data,
//     }));
//   };

 
//  const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = {
//         ...form,
//         list: form.list
//           .split("\n")
//           .map((item) => item.trim())
//           .filter(Boolean),
//       };

//       if (editId) {
//         await axios.put(
//           `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/updateprice/${editId}`,
//           payload
//         );
//         toast.success("✅ Pricing plan updated successfully!");
//       } else {
//         await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/addprice`, payload);
//         toast.success("🎉 Pricing plan added successfully!");
//       }

//       setForm({
//         title: "",
//         price: "",
//         afterText: "/monthly",
//         text: "",
//         list: "",
//       });
//       setActiveTab("basic");
//     } catch (err) {
//       toast.error("❌ Failed to save pricing plan");
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const featuresList = form.list
//     .split("\n")
//     .map((item) => item.trim())
//     .filter(Boolean);

//   const editorConfig = {
//     toolbar: {
//       items: [
//         "heading",
//         "|",
//         "bold",
//         "italic",
//         "underline",
//         "strikethrough",
//         "|",
//         "fontColor",
//         "fontBackgroundColor",
//         "fontSize",
//         "fontFamily",
//         "|",
//         "alignment",
//         "bulletedList",
//         "numberedList",
//         "|",
//         "link",
//         "blockQuote",
//         "insertTable",
//         "mediaEmbed",
//         "|",
//         "undo",
//         "redo",
//         "removeFormat",
//       ],
//       shouldNotGroupWhenFull: true,
//     },
//     placeholder: "Describe the benefits and features of this pricing plan...",
//     heading: {
//       options: [
//         { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
//         { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
//         { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
//         { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
//       ],
//     },
//     fontFamily: {
//       options: [
//         "default",
//         "Arial, Helvetica, sans-serif",
//         "Courier New, Courier, monospace",
//         "Georgia, serif",
//         "Lucida Sans Unicode, Lucida Grande, sans-serif",
//         "Tahoma, Geneva, sans-serif",
//         "Times New Roman, Times, serif",
//         "Trebuchet MS, Helvetica, sans-serif",
//         "Verdana, Geneva, sans-serif",
//       ],
//     },
//   };

//   const getPlainText = (html) => {
//     return html.replace(/<[^>]*>/g, "").trim();
//   };

//   return (
//     <AdminLayout>
//       <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-blue-50/20 !py-8 !px-4 sm:!px-6 lg:!px-8">
//         <div className="!max-w-7xl !mx-auto">
//           {/* Header */}
//           <div className="!text-center !mb-8">
//             <div className="!inline-flex !items-center !justify-center !w-20 !h-20 !bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 !rounded-3xl !mb-4 !shadow-lg">
//               <DollarSign className="!h-10 !w-10 !text-white" />
//             </div>
//             <h1 className="!text-4xl !font-bold !mb-3 !bg-gradient-to-r from-blue-600 to-purple-600 !bg-clip-text !text-transparent">
//               Create Pricing Plan
//             </h1>
//             <p className="!text-gray-600 !text-lg !max-w-2xl !mx-auto">
//               Design compelling pricing strategies that convert visitors into
//               customers
//             </p>
//           </div>

//           <div className="!grid !grid-cols-1 xl:!grid-cols-4 !gap-8">
//             {/* Preview */}
//             <div className="xl:!col-span-1">
//               <div className="!sticky !top-8 !space-y-6">
//                 <div className="!bg-white !rounded-3xl !shadow-2xl !border !border-gray-100 !overflow-hidden">
//                   <div className="!bg-gradient-to-r from-blue-600 to-purple-600 !px-6 !py-4 !flex !justify-between !items-center">
//                     <h3 className="!text-lg !font-semibold !text-white">
//                       Live Preview
//                     </h3>
//                     <button
//                       type="button"
//                       onClick={() => setPreview(!preview)}
//                       className="!text-white/90 hover:!text-white !text-sm !font-medium !flex !items-center !gap-2"
//                     >
//                       <Eye size={16} />
//                       {preview ? "Hide" : "Show"}
//                     </button>
//                   </div>

//                   {preview && (
//                     <div className="!p-6">
//                       <div className="!bg-gradient-to-br from-gray-50 to-blue-50 !rounded-2xl !p-6 !border-2 !border-blue-100 !shadow-inner">
//                         <div className="!flex !justify-between !items-start !mb-4">
//                           <h4 className="!text-xl !font-bold !text-gray-900">
//                             {form.title || "Professional Plan"}
//                           </h4>
//                           <span className="!bg-gradient-to-r from-green-500 to-emerald-600 !text-white !text-xs !font-bold !px-3 !py-1 !rounded-full !shadow-sm">
//                             POPULAR
//                           </span>
//                         </div>

//                         <div className="!mb-4">
//                           <span className="!text-4xl !font-bold !text-gray-900">
//                             {form.price || "$29"}
//                           </span>
//                           <span className="!text-gray-600 !text-lg !ml-2">
//                             {form.afterText}
//                           </span>
//                         </div>

//                         <div
//                           className="!text-gray-600 !text-sm !mb-6 !leading-relaxed"
//                           dangerouslySetInnerHTML={{
//                             __html:
//                               form.text || "Perfect for growing businesses",
//                           }}
//                         />

//                         <ul className="!space-y-3 !mb-6">
//                           {featuresList.length > 0 ? (
//                             featuresList
//                               .slice(0, 5)
//                               .map((feature, index) => (
//                                 <li
//                                   key={index}
//                                   className="flex items-center text-sm text-gray-700"
//                                 >
//                                   <div className="!w-5 !h-5 !bg-green-100 !rounded-full !flex !items-center !justify-center !mr-3">
//                                     <CheckSquare className="!h-3 !w-3 !text-green-600" />
//                                   </div>
//                                   {feature}
//                                 </li>
//                               ))
//                           ) : (
//                             <>
//                               <li className="!flex !items-center !text-sm !text-gray-400">
//                                 <div className="!w-5 !h-5 !bg-gray-100 !rounded-full !flex !items-center !justify-center !mr-3">
//                                   <CheckSquare className="!h-3 !w-3 !text-gray-400" />
//                                 </div>
//                                 Feature 1
//                               </li>
//                               <li className="!flex !items-center !text-sm !text-gray-400">
//                                 <div className="!w-5 !h-5 !bg-gray-100 !rounded-full !flex !items-center !justify-center !mr-3">
//                                   <CheckSquare className="!h-3 !w-3 !text-gray-400" />
//                                 </div>
//                                 Feature 2
//                               </li>
//                               <li className="!flex !items-center !text-sm !text-gray-400">
//                                 <div className="!w-5 !h-5 !bg-gray-100 !rounded-full !flex !items-center !justify-center !mr-3">
//                                   <CheckSquare className="!h-3 !w-3 !text-gray-400" />
//                                 </div>
//                                 Feature 3
//                               </li>
//                             </>
//                           )}
//                         </ul>

//                         <button className="!w-full !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !font-semibold !py-3 !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !duration-200 !shadow-lg hover:!shadow-xl !transform hover:-translate-y-0.5">
//                           Get Started Today
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Stats */}
//                 <div className="!bg-white !rounded-3xl !shadow-lg !border !border-gray-100 !p-6">
//                   <h4 className="!font-semibold !text-gray-900 !mb-4 !flex !items-center !gap-2">
//                     <TrendingUp size={18} />
//                     Plan Stats
//                   </h4>
//                   <div className="!space-y-3">
//                     <div className="!flex !justify-between !items-center">
//                       <span className="!text-sm !text-gray-600">Features</span>
//                       <span className="!font-semibold !text-blue-600">
//                         {featuresList.length}
//                       </span>
//                     </div>
//                     <div className="!flex !justify-between !items-center">
//                       <span className="!text-sm !text-gray-600">Description</span>
//                       <span className="!font-semibold !text-purple-600">
//                         {getPlainText(form.text).length > 0 ? "✓" : "✗"}
//                       </span>
//                     </div>
//                     <div className="!flex !justify-between !items-center">
//                       <span className="!text-sm !text-gray-600">Status</span>
//                       <span
//                         className={`!font-semibold ${
//                           form.title ? "!text-green-600" : "!text-gray-400"
//                         }`}
//                       >
//                         {form.title ? "Draft" : "Empty"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Form */}
//             <div className="xl:!col-span-3">
//               <div className="!bg-white !rounded-3xl !shadow-2xl !border !border-gray-100 !overflow-hidden">
//                 {/* Tabs */}
//                 <div className="!border-b !border-gray-200">
//                   <div className="!flex !space-x-1 !px-8 !pt-6">
//                     {[
//                       { id: "basic", label: "Basic Info", icon: Tag },
//                       { id: "features", label: "Features", icon: CheckSquare },
//                       { id: "description", label: "Description", icon: FileText },
//                     ].map((tab) => (
//                       <button
//                         key={tab.id}
//                         onClick={() => setActiveTab(tab.id)}
//                         className={`!flex !items-center !gap-2 !px-4 !py-3 !rounded-t-lg !font-medium !transition-all ${
//                           activeTab === tab.id
//                             ? "!text-blue-600 !bg-blue-50 !border-b-2 !border-blue-600"
//                             : "!text-gray-500 hover:!text-gray-700 hover:!bg-gray-50"
//                         }`}
//                       >
//                         <tab.icon size={18} />
//                         {tab.label}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="!p-8 !space-y-8">
//                   {/* Basic Info */}
//                   {activeTab === "basic" && (
//                     <div className="!space-y-6">
//                       <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-6">
//                         <div className="!space-y-3">
//                           <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
//                             <Tag className="!h-4 !w-4 !mr-2 !text-blue-600" />
//                             Plan Title *
//                           </label>
//                           <input
//                             type="text"
//                             name="title"
//                             value={form.title}
//                             onChange={handleChange}
//                             placeholder="e.g., Professional Plan"
//                             className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3.5 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-all"
//                             required
//                           />
//                         </div>

//                         <div className="!space-y-3">
//                           <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
//                             <DollarSign className="!h-4 !w-4 !mr-2 !text-green-600" />
//                             Price *
//                           </label>
//                           <div className="!relative">
//                             <span className="!absolute !left-4 !top-1/2 !transform -translate-y-1/2 !text-gray-500 !font-medium">
//                               $
//                             </span>
//                             <input
//                               type="text"
//                               name="price"
//                               value={form.price}
//                               onChange={handleChange}
//                               placeholder="29"
//                               className="!w-full !border-2 !border-gray-200 !rounded-xl !pl-10 !pr-4 !py-3.5 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
//                               required
//                             />
//                           </div>
//                         </div>
//                       </div>

//                       <div className="!space-y-3">
//                         <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
//                           <FileText className="!h-4 !w-4 !mr-2 !text-blue-600" />
//                           Short Description *
//                         </label>
//                         {typeof window !== "undefined" && ClassicEditor && (
//                           <div className="!border-2 !border-gray-200 !rounded-2xl !overflow-hidden !shadow-sm">
//                             <CKEditor
//                               editor={ClassicEditor}
//                               data={form.text}
//                               onChange={handleEditorChange}
//                               config={editorConfig}
//                             />
//                           </div>
//                         )}
//                         <div className="!flex !justify-between !items-center !text-xs !text-gray-500">
//                           <span>Detailed description with rich formatting</span>
//                           <span>{getPlainText(form.text).length} characters</span>
//                         </div>
//                       </div>

//                       <div className="!space-y-3">
//                         <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
//                           <Layout className="!h-4 !w-4 !mr-2 !text-indigo-600" />
//                           Price Suffix
//                         </label>
//                         <input
//                           type="text"
//                           name="afterText"
//                           value={form.afterText}
//                           onChange={handleChange}
//                           placeholder="/monthly"
//                           className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3.5 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
//                         />
//                       </div>
//                     </div>
//                   )}

//                   {/* Features */}
//                   {activeTab === "features" && (
//                     <div className="!space-y-6">
//                       <div className="!space-y-3">
//                         <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
//                           <CheckSquare className="!h-4 !w-4 !mr-2 !text-green-600" />
//                           Features List *
//                         </label>
//                         <textarea
//                           name="list"
//                           value={form.list}
//                           onChange={handleChange}
//                           rows="8"
//                           placeholder={`Up to 5-7 pages design\n1 GB storage\nStandard theme customization\n24/7 customer support\nFree domain for 1 year\nSEO optimization\nMobile responsive design`}
//                           className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-4 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !resize-vertical !font-mono !text-sm !leading-relaxed"
//                           required
//                         />
//                         <div className="!flex !justify-between !items-center !text-xs !text-gray-500">
//                           <span>Enter one feature per line</span>
//                           <span>{featuresList.length} features added</span>
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   {/* Description Submit Tab */}
//                   {activeTab === "description" && (
//                     <div className="!space-y-6">
//                       <h3 className="!text-lg !font-semibold !text-gray-700 !flex !items-center !gap-2">
//                         <FileText className="!h-5 !w-5 !text-blue-600" />
//                         Review & Submit
//                       </h3>
//                       <p className="!text-gray-600 !text-sm">
//                         Check your details and launch your pricing plan.
//                       </p>
//                     </div>
//                   )}

//                   {/* Navigation */}
//                   <div className="!flex !justify-between !items-center !pt-6 !border-t !border-gray-200">
//                     <div className="!flex !gap-3">
//                       {activeTab !== "basic" && (
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setActiveTab(
//                               activeTab === "features"
//                                 ? "basic"
//                                 : "features"
//                             )
//                           }
//                           className="!px-6 !py-3 !border-2 !border-gray-300 !text-gray-700 !rounded-xl !font-medium hover:!border-gray-400 !transition-all"
//                         >
//                           Previous
//                         </button>
//                       )}
//                     </div>

//                     <div className="!flex !gap-3">
//                       {activeTab !== "description" && (
//                         <button
//                           type="button"
//                           onClick={() =>
//                             setActiveTab(
//                               activeTab === "basic" ? "features" : "description"
//                             )
//                           }
//                           className="!px-6 !py-3 !bg-blue-600 !text-white !rounded-xl !font-medium hover:!bg-blue-700 !transition-all !flex !items-center !gap-2"
//                         >
//                           Next
//                           <ArrowRight size={16} />
//                         </button>
//                       )}

//                       {activeTab === "description" && (
//                         <button
//                           type="submit"
//                           disabled={loading}
//                           className="!px-8 !py-3 !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !font-semibold !rounded-xl !shadow-lg hover:!from-blue-700 hover:!to-purple-700 !transition-all !duration-200 disabled:!opacity-50 !flex !items-center !gap-2"
//                         >
//                           {loading ? (
//                             <>
//                               <div className="!w-5 !h-5 !border-2 !border-white !border-t-transparent !rounded-full !animate-spin" />
//                               Creating Plan...
//                             </>
//                           ) : (
//                             <>
//                               <Rocket size={18} />
//                               Launch Pricing Plan
//                               <Star size={16} />
//                             </>
//                           )}
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayout>
//   );
// };

// export default AddPrice;




"use client";
import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
import {
  DollarSign,
  Tag,
  FileText,
  CheckSquare,
  ArrowRight,
  Eye,
  Layout,
  TrendingUp,
  Rocket,
  Star,
} from "lucide-react";
import AdminLayout from "../components/AdminLayout";
import { useSearchParams } from "next/navigation";

// Dynamically import CKEditor
const CKEditor = dynamic(
  () => import("@ckeditor/ckeditor5-react").then((mod) => mod.CKEditor),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl flex items-center justify-center border-2 border-dashed border-blue-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-3"></div>
          <p className="text-gray-700 font-medium">Loading Rich Text Editor...</p>
          <p className="text-gray-500 text-sm mt-1">
            Preparing advanced editing capabilities
          </p>
        </div>
      </div>
    ),
  }
);

let ClassicEditor;
if (typeof window !== "undefined") {
  ClassicEditor = require("@ckeditor/ckeditor5-build-classic");
}

const AddPriceContent = () => {
  const [form, setForm] = useState({
    title: "",
    price: "",
    afterText: "/monthly",
    text: "",
    list: "",
  });

  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(true);
  const [activeTab, setActiveTab] = useState("basic");

  // Fetch data if edit
useEffect(() => {
  if (editId) {
    setLoading(true);
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/getpriceid/${editId}`)
      .then(({ data }) => {
        if (data.success) {
          setForm({
            title: data.data.title,
            price: data.data.price,
            afterText: data.data.afterText,
            text: data.data.text,
            list: data.data.list.join("\n"),
          });
        } else {
          toast.error("Failed to load pricing data");
        }
      })
      .catch(() => toast.error("Failed to load pricing data"))
      .finally(() => setLoading(false));
  }
}, [editId]);


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setForm((prev) => ({
      ...prev,
      text: data,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...form,
        list: form.list
          .split("\n")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      if (editId) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/updateprice/${editId}`,
          payload
        );
        toast.success("✅ Pricing plan updated successfully!");
      } else {
        await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/addprice`, payload);
        toast.success("🎉 Pricing plan added successfully!");
      }

      setForm({
        title: "",
        price: "",
        afterText: "/monthly",
        text: "",
        list: "",
      });
      setActiveTab("basic");
    } catch (err) {
      toast.error("❌ Failed to save pricing plan");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const featuresList = form.list
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  const editorConfig = {
    toolbar: {
      items: [
        "heading",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "fontColor",
        "fontBackgroundColor",
        "fontSize",
        "fontFamily",
        "|",
        "alignment",
        "bulletedList",
        "numberedList",
        "|",
        "link",
        "blockQuote",
        "insertTable",
        "mediaEmbed",
        "|",
        "undo",
        "redo",
        "removeFormat",
      ],
      shouldNotGroupWhenFull: true,
    },
    placeholder: "Describe the benefits and features of this pricing plan...",
  };

  const getPlainText = (html) => {
    return html.replace(/<[^>]*>/g, "").trim();
  };

  return (
    <AdminLayout>
      <div className="!min-h-screen !bg-gradient-to-br from-slate-50 to-blue-50/20 !py-8 !px-4 sm:!px-6 lg:!px-8">
        <div className="!max-w-7xl !mx-auto">
          {/* Header */}
          <div className="!text-center !mb-8">
            <div className="!inline-flex !items-center !justify-center !w-20 !h-20 !bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 !rounded-3xl !mb-4 !shadow-lg">
              <DollarSign className="!h-10 !w-10 !text-white" />
            </div>
            <h1 className="!text-4xl !font-bold !mb-3 !bg-gradient-to-r from-blue-600 to-purple-600 !bg-clip-text !text-transparent">
              Create Pricing Plan
            </h1>
            <p className="!text-gray-600 !text-lg !max-w-2xl !mx-auto">
              Design compelling pricing strategies that convert visitors into
              customers
            </p>
          </div>

          <div className="!grid !grid-cols-1 xl:!grid-cols-4 !gap-8">
            {/* Preview */}
            <div className="xl:!col-span-1">
              <div className="!sticky !top-8 !space-y-6">
                <div className="!bg-white !rounded-3xl !shadow-2xl !border !border-gray-100 !overflow-hidden">
                  <div className="!bg-gradient-to-r from-blue-600 to-purple-600 !px-6 !py-4 !flex !justify-between !items-center">
                    <h3 className="!text-lg !font-semibold !text-white">
                      Live Preview
                    </h3>
                    <button
                      type="button"
                      onClick={() => setPreview(!preview)}
                      className="!text-white/90 hover:!text-white !text-sm !font-medium !flex !items-center !gap-2"
                    >
                      <Eye size={16} />
                      {preview ? "Hide" : "Show"}
                    </button>
                  </div>

                  {preview && (
                    <div className="!p-6">
                      <div className="!bg-gradient-to-br from-gray-50 to-blue-50 !rounded-2xl !p-6 !border-2 !border-blue-100 !shadow-inner">
                        <div className="!flex !justify-between !items-start !mb-4">
                          <h4 className="!text-xl !font-bold !text-gray-900">
                            {form.title || "Professional Plan"}
                          </h4>
                          <span className="!bg-gradient-to-r from-green-500 to-emerald-600 !text-white !text-xs !font-bold !px-3 !py-1 !rounded-full !shadow-sm">
                            POPULAR
                          </span>
                        </div>

                        <div className="!mb-4">
                          <span className="!text-4xl !font-bold !text-gray-900">
                            {form.price || "$29"}
                          </span>
                          <span className="!text-gray-600 !text-lg !ml-2">
                            {form.afterText}
                          </span>
                        </div>

                        <div
                          className="!text-gray-600 !text-sm !mb-6 !leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html:
                              form.text || "Perfect for growing businesses",
                          }}
                        />

                        <ul className="!space-y-3 !mb-6">
                          {featuresList.length > 0 ? (
                            featuresList.slice(0, 5).map((feature, index) => (
                              <li
                                key={index}
                                className="flex items-center text-sm text-gray-700"
                              >
                                <div className="!w-5 !h-5 !bg-green-100 !rounded-full !flex !items-center !justify-center !mr-3">
                                  <CheckSquare className="!h-3 !w-3 !text-green-600" />
                                </div>
                                {feature}
                              </li>
                            ))
                          ) : (
                            <>
                              <li className="flex items-center text-sm text-gray-400">
                                <div className="!w-5 !h-5 !bg-gray-100 !rounded-full !flex !items-center !justify-center !mr-3">
                                  <CheckSquare className="!h-3 !w-3 !text-gray-400" />
                                </div>
                                Feature 1
                              </li>
                              <li className="!flex !items-center !text-sm !text-gray-400">
                                <div className="!w-5 !h-5 !bg-gray-100 !rounded-full !flex !items-center !justify-center !mr-3">
                                  <CheckSquare className="!h-3 !w-3 !text-gray-400" />
                                </div>
                                Feature 2
                              </li>
                            </>
                          )}
                        </ul>

                        <button className="!w-full !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !font-semibold !py-3 !rounded-xl hover:!from-blue-700 hover:!to-purple-700 !transition-all !duration-200 !shadow-lg hover:!shadow-xl !transform hover:-translate-y-0.5">
                          Get Started Today
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="!bg-white !rounded-3xl !shadow-lg !border !border-gray-100 !p-6">
                  <h4 className="!font-semibold !text-gray-900 !mb-4 !flex !items-center !gap-2">
                    <TrendingUp size={18} />
                    Plan Stats
                  </h4>
                  <div className="!space-y-3">
                    <div className="!flex !justify-between !items-center">
                      <span className="!text-sm !text-gray-600">Features</span>
                      <span className="!font-semibold !text-blue-600">
                        {featuresList.length}
                      </span>
                    </div>
                    <div className="!flex !justify-between !items-center">
                      <span className="!text-sm !text-gray-600">Description</span>
                      <span className="!font-semibold !text-purple-600">
                        {getPlainText(form.text).length > 0 ? "✓" : "✗"}
                      </span>
                    </div>
                    <div className="!flex !justify-between !items-center">
                      <span className="!text-sm !text-gray-600">Status</span>
                      <span
                        className={`font-semibold ${
                          form.title ? "!text-green-600" : "!text-gray-400"
                        }`}
                      >
                        {form.title ? "Draft" : "Empty"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="xl:!col-span-3">
              <div className="!bg-white !rounded-3xl !shadow-2xl !border !border-gray-100 !overflow-hidden">
                {/* Tabs */}
                <div className="!border-b !border-gray-200">
                  <div className="!flex !space-x-1 !px-8 !pt-6">
                    {[
                      { id: "basic", label: "Basic Info", icon: Tag },
                      { id: "features", label: "Features", icon: CheckSquare },
                      { id: "description", label: "Description", icon: FileText },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`!flex !items-center !gap-2 !px-4 !py-3 !rounded-t-lg !font-medium !transition-all ${
                          activeTab === tab.id
                            ? "!text-blue-600 !bg-blue-50 border-b-2 !border-blue-600"
                            : "!text-gray-500 hover:!text-gray-700 hover:!bg-gray-50"
                        }`}
                      >
                        <tab.icon size={18} />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="!p-8 !space-y-8">
                  {/* Basic Info */}
                  {activeTab === "basic" && (
                    <div className="!space-y-6">
                      <div className="!grid !grid-cols-1 lg:!grid-cols-2 !gap-6">
                        <div className="!space-y-3">
                          <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
                            <Tag className="!h-4 !w-4 !mr-2 !text-blue-600" />
                            Plan Title *
                          </label>
                          <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g., Professional Plan"
                            className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3.5 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !transition-all"
                            required
                          />
                        </div>

                        <div className="!space-y-3">
                          <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
                            <DollarSign className="!h-4 !w-4 !mr-2 !text-green-600" />
                            Price *
                          </label>
                          <div className="!relative">
                            <span className="!absolute !left-4 !top-1/2 !transform -translate-y-1/2 !text-gray-500 !font-medium">
                              $
                            </span>
                            <input
                              type="text"
                              name="price"
                              value={form.price}
                              onChange={handleChange}
                              placeholder="29"
                              className="!w-full !border-2 !border-gray-200 !rounded-xl !pl-10 !pr-4 !py-3.5 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="!space-y-3">
                        <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
                          <FileText className="!h-4 !w-4 !mr-2 !text-blue-600" />
                          Short Description *
                        </label>
                        {typeof window !== "undefined" && ClassicEditor && (
                          <div className="!border-2 !border-gray-200 !rounded-2xl !overflow-hidden !shadow-sm">
                            <CKEditor
                              editor={ClassicEditor}
                              data={form.text}
                              onChange={handleEditorChange}
                              config={editorConfig}
                            />
                          </div>
                        )}
                        <div className="!flex !justify-between !items-center !text-xs !text-gray-500">
                          <span>Detailed description with rich formatting</span>
                          <span>{getPlainText(form.text).length} characters</span>
                        </div>
                      </div>

                      <div className="!space-y-3">
                        <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
                          <Layout className="!h-4 !w-4 !mr-2 !text-indigo-600" />
                          Price Suffix
                        </label>
                        <input
                          type="text"
                          name="afterText"
                          value={form.afterText}
                          onChange={handleChange}
                          placeholder="/monthly"
                          className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-3.5 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {activeTab === "features" && (
                    <div className="!space-y-6">
                      <div className="!space-y-3">
                        <label className="!flex !items-center !text-sm !font-semibold !text-gray-700">
                          <CheckSquare className="!h-4 !w-4 !mr-2 !text-green-600" />
                          Features List *
                        </label>
                        <textarea
                          name="list"
                          value={form.list}
                          onChange={handleChange}
                          rows="8"
                          placeholder={`Up to 5-7 pages design\n1 GB storage\nStandard theme customization\n24/7 customer support\nFree domain for 1 year\nSEO optimization\nMobile responsive design`}
                          className="!w-full !border-2 !border-gray-200 !rounded-xl !px-4 !py-4 focus:!ring-2 focus:!ring-blue-500 focus:!border-blue-500 !resize-vertical !font-mono !text-sm !leading-relaxed"
                          required
                        />
                        <div className="!flex !justify-between !items-center !text-xs !text-gray-500">
                          <span>Enter one feature per line</span>
                          <span>{featuresList.length} features added</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Review & Submit */}
                  {activeTab === "description" && (
                    <div className="!space-y-6">
                      <h3 className="!text-lg !font-semibold !text-gray-700 !flex !items-center !gap-2">
                        <FileText className="!h-5 !w-5 !text-blue-600" />
                        Review & Submit
                      </h3>
                      <p className="!text-gray-600 !text-sm">
                        Check your details and launch your pricing plan.
                      </p>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="!flex !justify-between !items-center !pt-6 !border-t !border-gray-200">
                    <div className="!flex !gap-3">
                      {activeTab !== "basic" && (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveTab(
                              activeTab === "features" ? "basic" : "features"
                            )
                          }
                          className="!px-6 !py-3 !border-2 !border-gray-300 !text-gray-700 !rounded-xl !font-medium hover:!border-gray-400 !transition-all"
                        >
                          Previous
                        </button>
                      )}
                    </div>

                    <div className="!flex !gap-3">
                      {activeTab !== "description" && (
                        <button
                          type="button"
                          onClick={() =>
                            setActiveTab(
                              activeTab === "basic" ? "features" : "description"
                            )
                          }
                          className="!px-6 !py-3 !bg-blue-600 !text-white !rounded-xl !font-medium hover:!bg-blue-700 !transition-all !flex !items-center !gap-2"
                        >
                          Next
                          <ArrowRight size={16} />
                        </button>
                      )}

                      {activeTab === "description" && (
                        <button
                          type="submit"
                          disabled={loading}
                          className="!px-8 !py-3 !bg-gradient-to-r from-blue-600 to-purple-600 !text-white !font-semibold !rounded-xl !shadow-lg hover:!from-blue-700 hover:!to-purple-700 !transition-all !duration-200 disabled:!opacity-50 !flex !items-center !gap-2"
                        >
                          {loading ? (
                            <>
                              <div className="!w-5 !h-5 !border-2 !border-white !border-t-transparent !rounded-full !animate-spin" />
                              Creating Plan...
                            </>
                          ) : (
                            <>
                              <Rocket size={18} />
                              Launch Pricing Plan
                              <Star size={16} />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default function AddPrice() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddPriceContent/>
    </Suspense>
  );
}