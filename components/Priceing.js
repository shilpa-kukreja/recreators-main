// "use client";
// import Link from "next/link";
// import { Nav, Tab } from "react-bootstrap";





// export const Priceing2 = () => {

//    const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("https://recreators.onrender.com/api/price/getprice");
//       setPricing(res.data.data || []);
//     } catch (err) {
//       toast.error("❌ Failed to fetch pricing data");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const pricingData = [
//     {
//       title: "Regular",
//       price: "$15",
//       afterText: "/per month user",
//       text: "Great for individuals and small projects.",
//       list: [
//         "Up to 5-7 pages design",
//         "1 GB storage per site",
//         "Standard theme customization",
//         "Social media integration",
//         "Basic SEO setup",
//         "1 round of revisions",
//       ],
//     },
//     {
//       title: "Standard",
//       price: "$45",
//       afterText: "/per month user",
//       text: "Great for individuals and small projects.",
//       list: [
//         "Up to 5-7 pages design",
//         "1 GB storage per site",
//         "Standard theme customization",
//         "Social media integration",
//         "Basic SEO setup",
//         "1 round of revisions",
//       ],
//     },
//     {
//       title: "Premium",
//       price: "$105",
//       afterText: "/per month user",
//       text: "Great for individuals and small projects.",
//       list: [
//         "Up to 5-7 pages design",
//         "1 GB storage per site",
//         "Standard theme customization",
//         "Social media integration",
//         "Basic SEO setup",
//         "1 round of revisions",
//       ],
//     },
//   ];
//   return (
//     <section className="pricing-area rel z-2">
//       <div className="container px-sm-0   pt-130 rpt-100 pb-100 rpb-70">
//         <Tab.Container defaultActiveKey="monthly">
//           <div className="row justify-content-center">
//             <div
//               className="col-xl-7 co-lg-9 col-md-11 text-center"
//               data-aos="zoom-in"
//               data-aos-duration={1500}
//               data-aos-offset={50}
//             >
//               <div className="section-title mb-50">
//                 <span className="subtitle mt-10 mb-15">Pricing Package</span>
//                 <h2>Premium Web Design Services Without the Premium Price</h2>
//               </div>
//             </div>
//             <div
//               className="col-lg-7 text-center"
//               data-aos="fade-up"
//               data-aos-delay={50}
//               data-aos-duration={1500}
//               data-aos-offset={50}
//             >
//               <Nav as="ul" className="nav pricing-tab mb-55" role="tablist">
//                 <Nav.Item as={"li"}>
//                   <Nav.Link
//                     as={"button"}
//                     className="nav-link"
//                     eventKey="monthly"
//                   >
//                     Monthly
//                   </Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item as={"li"}>
//                   <Nav.Link
//                     as={"button"}
//                     className="nav-link"
//                     eventKey="yearly"
//                   >
//                     Yearly
//                   </Nav.Link>
//                 </Nav.Item>
//               </Nav>
//               <span className="save-percent">Save 25%</span>
//             </div>
//           </div>
//           <Tab.Content className="tab-content">
//             <Tab.Pane className="tab-pane fade" eventKey="monthly">
//               <div className="row justify-content-center">
//                 {pricingData.map((item, index) => (
//                   <div
//                     className="col-xl-4 col-md-6"
//                     key={index}
//                     data-aos="fade-up"
//                     data-aos-duration={1500}
//                     data-aos-offset={50}
//                   >
//                     <div className="pricing-item style-two">
//                       <h6 className="title">{item.title}</h6>
//                       <span className="price">
//                         {item.price}
//                         <span className="after-text">{item.afterText}</span>
//                       </span>
//                       <div className="text">{item.text}</div>
//                       <ul className="list-style-two">
//                         {item.list.map((listItem, index) => (
//                           <li key={index}>{listItem}</li>
//                         ))}
//                       </ul>
//                       <Link
//                         href="contact"
//                         className="theme-btn style-three"
//                         data-hover="Choose Package"
//                       >
//                         <span>Choose Package</span>
//                       </Link>
//                       <div className="note-text">No credit card required</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Tab.Pane>
//             <Tab.Pane className="tab-pane fade" eventKey="yearly">
//               <div className="row justify-content-center">
//                 {pricingData.map((item, index) => (
//                   <div
//                     className="col-xl-4 col-md-6"
//                     key={index}
//                     data-aos="fade-up"
//                     data-aos-duration={1500}
//                     data-aos-offset={50}
//                   >
//                     <div className="pricing-item style-two">
//                       <h6 className="title">{item.title}</h6>
//                       <span className="price">
//                         {item.price}
//                         <span className="after-text">{item.afterText}</span>
//                       </span>
//                       <div className="text">{item.text}</div>
//                       <ul className="list-style-two">
//                         {item.list.map((listItem, index) => (
//                           <li key={index}>{listItem}</li>
//                         ))}
//                       </ul>
//                       <Link
//                         href="contact"
//                         className="theme-btn style-three"
//                         data-hover="Choose Package"
//                       >
//                         <span>Choose Package</span>
//                       </Link>
//                       <div className="note-text">No credit card required</div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </Tab.Pane>
//           </Tab.Content>
//         </Tab.Container>
//       </div>
//     </section>
//   );
// };


// "use client";
// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import { Nav, Tab } from "react-bootstrap";
// import axios from "axios";
// import { toast } from "react-toastify";
// import AOS from "aos";
// import "aos/dist/aos.css";

// export const Priceing2 = () => {
//   const [pricing, setPricing] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch pricing data from backend
//   const fetchData = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.get("https://recreators.onrender.com/api/price/getprice");
//       setPricing(res.data.data || []);
//     } catch (err) {
//       toast.error("❌ Failed to fetch pricing data");
//       console.error("Fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     AOS.init({ duration: 1500 });
//   }, []);

//   if (loading) {
//     return (
//       <div className="text-center py-20">
//         <h3>Loading Pricing Packages...</h3>
//       </div>
//     );
//   }

//   return (
//     <section className="pricing-area rel z-2">
//       <div className="container px-sm-0   pt-130 rpt-100 pb-100 rpb-70">
//         <Tab.Container defaultActiveKey="monthly">
//           <div className="row justify-content-center">
//             <div
//               className="col-xl-7 co-lg-9 col-md-11 text-center"
//               data-aos="zoom-in"
//             >
//               <div className="section-title mb-50">
//                 <span className="subtitle mt-10 mb-15">Pricing Package</span>
//                 <h2>Premium Web Design Services Without the Premium Price</h2>
//               </div>
//             </div>
//             <div
//               className="col-lg-7 text-center"
//               data-aos="fade-up"
//             >
//               <Nav as="ul" className="nav pricing-tab mb-55" role="tablist">
//                 <Nav.Item as={"li"}>
//                   <Nav.Link as={"button"} eventKey="monthly">
//                     Monthly
//                   </Nav.Link>
//                 </Nav.Item>
//                 <Nav.Item as={"li"}>
//                   <Nav.Link as={"button"} eventKey="yearly">
//                     Yearly
//                   </Nav.Link>
//                 </Nav.Item>
//               </Nav>
//               <span className="save-percent">Save 25%</span>
//             </div>
//           </div>

//           <Tab.Content>
//             {["monthly", "yearly"].map((tabKey) => (
//               <Tab.Pane key={tabKey} eventKey={tabKey}>
//                 <div className="row justify-content-center">
//                   {pricing.map((item, index) => (
//                     <div
//                       className="col-xl-4 col-md-6"
//                       key={index}
//                       data-aos="fade-up"
//                     >
//                       <div className="pricing-item style-two">
//                         <h6 className="title">{item.title}</h6>
//                         <span className="price">
//                           {item.price}
//                           <span className="after-text">{item.afterText}</span>
//                         </span>
//                         <div
//                           className="text"
//                           dangerouslySetInnerHTML={{ __html: item.text }}
//                         ></div>

//                         <ul className="list-style-two">
//                           {item.list.map((listItem, i) => (
//                             <li key={i}>{listItem}</li>
//                           ))}
//                         </ul>
//                         <Link
//                           href="/contact"
//                           className="theme-btn style-three"

//                         >
//                           <span>Choose Package</span>
//                         </Link>
//                         <div className="note-text">No credit card required</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </Tab.Pane>
//             ))}
//           </Tab.Content>
//         </Tab.Container>
//       </div>
//     </section>
//   );
// };



"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Nav, Tab } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import AOS from "aos";
import "aos/dist/aos.css";
import { useRouter } from "next/navigation";

const Priceing = () => {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch pricing data from backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/price/getprice`);
      setPricing(res.data.data || []);
    } catch (err) {
      toast.error("❌ Failed to fetch pricing data");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    AOS.init({ duration: 1500 });
  }, []);

  // Function to handle package selection and redirect to pay-now page
 const handlePackageSelect = (packageData) => {
  try {
    const selectedPackage = {
      service:  packageData.title?.toLowerCase(),
      serviceLabel: packageData.title,
      amount: String(packageData.price).replace('$', ''), // ensure string
      description: packageData.text,
    };

    // Debugging
    console.log("Saving to localStorage:", selectedPackage);

    localStorage.setItem("selectedPackage", JSON.stringify(selectedPackage));

    // Check immediately after saving
    console.log("From localStorage:", localStorage.getItem("selectedPackage"));

    // Navigate
    setTimeout(() => {
      router.push("/pay-now");
    }, 200);
  } catch (err) {
    console.error("Failed to save package:", err);
    toast.error("❌ Could not save package selection");
  }
};



  if (loading) {
    return (
      <div className="text-center py-20">
        <h3>Loading Pricing Packages...</h3>
      </div>
    );
  }

  return (
    <section className="pricing-area rel z-2">
      <div className="container px-sm-0   sm:pt-130 !pt-10 rpt-100 pb-100 rpb-70">
        <Tab.Container defaultActiveKey="monthly">
          <div className="row justify-content-center">
            <div
              className="col-xl-7 co-lg-9 col-md-11 text-center"
              data-aos="zoom-in"
            >
              <div className="section-title mb-50">
                <span className="subtitle mt-10 mb-15">Pricing Package</span>
                <h2>Premium Web Design Services Without the Premium Price</h2>
              </div>
            </div>
            <div
              className="col-lg-7 text-center"
              data-aos="fade-up"
            >
              <Nav as="ul" className="nav pricing-tab mb-55" role="tablist">
                <Nav.Item as={"li"}>
                  <Nav.Link as={"button"} eventKey="monthly">
                    Monthly
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as={"li"}>
                  <Nav.Link as={"button"} eventKey="yearly">
                    Yearly
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <span className="save-percent">Save 25%</span>
            </div>
          </div>

          <Tab.Content>
            {["monthly", "yearly"].map((tabKey) => (
              <Tab.Pane key={tabKey} eventKey={tabKey}>
                <div className="row justify-content-center">
                  {pricing.map((item, index) => (
                    <div
                      className="col-xl-4 col-md-6"
                      key={index}
                      data-aos="fade-up"
                    >
                      <div className="pricing-item style-two">
                        <h6 className="title">{item.title}</h6>
                        <span className="price">
                          {item.price}
                          <span className="after-text">{item.afterText}</span>
                        </span>
                        <div
                          className="text"
                          dangerouslySetInnerHTML={{ __html: item.text }}
                        ></div>

                        <ul className="list-style-two">
                          {item.list.map((listItem, i) => (
                            <li key={i}>{listItem}</li>
                          ))}
                        </ul>

                        {/* Updated button to handle package selection */}
                        <button
                          onClick={() => handlePackageSelect(item)}
                          className="theme-btn style-three w-100"
                        // style={{border: 'none', background: 'none', cursor: 'pointer'}}
                        >
                          <span>Choose Package</span>
                        </button>

                        <div className="note-text">No credit card required</div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Tab.Container>
      </div>
    </section>
  );
};

export default Priceing;
