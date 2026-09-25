// import Link from "next/link";
// import { Accordion } from "react-bootstrap";

// const Header = ({ header, menus }) => {
//   switch (header) {
//     case 1:
//       return <Header1 menus={menus} />;
//     case 2:
//       return <Header2 menus={menus} />;
//     case 3:
//       return <Header3 menus={menus} />;
//     case 4:
//       return <Header4 menus={menus} />;
//     case 5:
//       return <Header5 menus={menus} />;

//     default:
//       return <Header1 menus={menus} />;
//   }
// };
// export default Header;

// const Menu = ({ logo = "assets/images/logos/logo.png", menus }) => {
//   return (
//     <nav className="main-menu navbar-expand-lg">
//       <Accordion>
//         <div className="navbar-header rpy-10">
//           <div className="mobile-logo">
//             <Link href="/">
//               <img src={logo} alt="Logo" title="Logo" />
//             </Link>
//           </div>
//           {/* Toggle Button */}
//           <Accordion.Toggle
//             as={"button"}
//             className="navbar-toggle"
//             eventKey="navbar-collapse"
//           >
//             <span className="icon-bar" />
//             <span className="icon-bar" />
//             <span className="icon-bar" />
//           </Accordion.Toggle>
//         </div>
//         <Accordion.Collapse
//           eventKey="navbar-collapse"
//           className="navbar-collapse clearfix"
//         >
//           {menus ? (
//             <ul className="navigation clearfix">
//               {menus.map((menu, i) => (
//                 <li key={i}>
//                   <a href={menu.href}>{menu.text}</a>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <ul className="navigation clearfix">
//               <li className="dropdown current">
//                 <Link href="/">Home</Link>
//                 <ul>
//                   <li className="dropdown">
//                     <Link href="/">MultiPage</Link>
//                     <ul>
//                       <li>
//                         <Link href="/">Web Design Agency</Link>
//                       </li>
//                       <li>
//                         <Link href="/index2">Social Media Marketing</Link>
//                       </li>
//                       <li>
//                         <Link href="/index3">SEO Agency</Link>
//                       </li>
//                       <li>
//                         <Link href="/index4">Video Marketing</Link>
//                       </li>
//                       <li>
//                         <Link href="/index5">Web Development</Link>
//                       </li>
//                     </ul>
//                     <div className="dropdown-btn">
//                       <span className="far fa-angle-down" />
//                     </div>
//                   </li>
//                   <li className="dropdown">
//                     <Link href="/one-page">OnePage</Link>
//                     <ul>
//                       <li>
//                         <Link href="/index1-onepage">Web Design Agency</Link>
//                       </li>
//                       <li>
//                         <Link href="/index2-onepage">
//                           Social Media Marketing
//                         </Link>
//                       </li>
//                       <li>
//                         <Link href="/index3-onepage">SEO Agency</Link>
//                       </li>
//                       <li>
//                         <Link href="/index4-onepage">Video Marketing</Link>
//                       </li>
//                       <li>
//                         <Link href="/index5-onepage">Web Development</Link>
//                       </li>
//                     </ul>
//                     <div className="dropdown-btn">
//                       <span className="far fa-angle-down" />
//                     </div>
//                   </li>
//                 </ul>
//                 <div className="dropdown-btn">
//                   <span className="far fa-angle-down" />
//                 </div>
//               </li>
//               <li>
//                 <Link href="/about">About</Link>
//               </li>
//               <li className="dropdown">
//                 <Link href="/services">Services</Link>
//                 <ul>
//                   <li>
//                     <Link href="/services">Services 01</Link>
//                   </li>
//                   <li>
//                     <Link href="/services-two">Services 02</Link>
//                   </li>
//                   <li>
//                     <Link href="/service-details">Service Details</Link>
//                   </li>
//                 </ul>
//                 <div className="dropdown-btn">
//                   <span className="far fa-angle-down" />
//                 </div>
//               </li>
//               <li className="dropdown">
//                 <Link href="/shop">Shop</Link>
//                 <ul>
//                   <li>
//                     <Link href="/shop">All Products</Link>
//                   </li>
//                   <li>
//                     <Link href="/product-details">Product Details</Link>
//                   </li>
//                   <li>
//                     <Link href="/cart">Shopping Cart</Link>
//                   </li>
//                   <li>
//                     <Link href="/checkout">Checkout</Link>
//                   </li>
//                 </ul>
//                 <div className="dropdown-btn">
//                   <span className="far fa-angle-down" />
//                 </div>
//               </li>
//               <li className="dropdown">
//                 <Link href="#">Pages</Link>
//                 <ul>
//                   <li>
//                     <Link href="/pricing">Pricing</Link>
//                   </li>
//                   <li>
//                     <Link href="/faqs">faqs</Link>
//                   </li>
//                   <li className="dropdown">
//                     <Link href="/projects">Projects</Link>
//                     <ul>
//                       <li>
//                         <Link href="/project-grid">Project Grid</Link>
//                       </li>
//                       <li>
//                         <Link href="/project-list">Project List</Link>
//                       </li>
//                       <li>
//                         <Link href="/project-details">Project Details</Link>
//                       </li>
//                     </ul>
//                     <div className="dropdown-btn">
//                       <span className="far fa-angle-down" />
//                     </div>
//                   </li>
//                   <li className="dropdown">
//                     <Link href="/team">Team</Link>
//                     <ul>
//                       <li>
//                         <Link href="/team">Team</Link>
//                       </li>
//                       <li>
//                         <Link href="/team-details">Team Details</Link>
//                       </li>
//                     </ul>
//                     <div className="dropdown-btn">
//                       <span className="far fa-angle-down" />
//                     </div>
//                   </li>
//                   <li>
//                     <Link href="/contact">Contact Us</Link>
//                   </li>
//                   <li>
//                     <Link href="/404">404 Error</Link>
//                   </li>
//                 </ul>
//                 <div className="dropdown-btn">
//                   <span className="far fa-angle-down" />
//                 </div>
//               </li>
//               <li className="dropdown">
//                 <Link href="/blog">blog</Link>
//                 <ul>
//                   <li>
//                     <Link href="/blog">blog Grid</Link>
//                   </li>
//                   <li>
//                     <Link href="/blog-standard">blog Standard</Link>
//                   </li>
//                   <li>
//                     <Link href="/blog-details">blog details</Link>
//                   </li>
//                 </ul>
//                 <div className="dropdown-btn">
//                   <span className="far fa-angle-down" />
//                 </div>
//               </li>
//             </ul>
//           )}
//         </Accordion.Collapse>
//       </Accordion>
//     </nav>
//   );
// };

// const Header1 = ({ menus }) => {
//   return (
//     <header className="main-header header-one white-menu menu-absolute">
//       {/*Header-Upper*/}
//       <div className="header-upper">
//         <div className="container px-xxl-0   clearfix">
//           <div className="header-inner rel d-flex align-items-center">
//             <div className="logo-outer">
//               <div className="logo">
//                 <Link href="/">
//                   <img
//                     src="assets/images/logos/logo.png"
//                     alt="Logo"
//                     title="Logo"
//                   />
//                 </Link>
//               </div>
//             </div>
//             <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
//               {/* Main Menu */}
//               <Menu menus={menus} />
//               {/* Main Menu End*/}
//             </div>
//             {/* Menu Button */}
//             <div className="menu-btns">
//               <Link
//                 href="project-grid"
//                 className="theme-btn btn-small"
//                 data-hover="Start Projects"
//               >
//                 <span>Start Projects</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*End Header Upper*/}
//     </header>
//   );
// };

// const Header2 = ({ menus }) => {
//   return (
//     <header className="main-header white-menu menu-absolute">
//       {/*Header-Upper*/}
//       <div className="header-upper">
//         <div className="container bordered-bottom clearfix">
//           <div className="header-inner rel d-flex align-items-center">
//             <div className="logo-outer">
//               <div className="logo">
//                 <Link href="/">
//                   <img
//                     src="assets/images/logos/logo.png"
//                     alt="Logo"
//                     title="Logo"
//                   />
//                 </Link>
//               </div>
//             </div>
//             <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
//               {/* Main Menu */}
//               <Menu menus={menus} />
//               {/* Main Menu End*/}
//             </div>
//             {/* Menu Button */}
//             <div className="menu-btns">
//               <Link
//                 href="project-grid"
//                 className="theme-btn btn-small bgc-secondary"
//                 data-hover="Get Started"
//               >
//                 <span>Get Started</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*End Header Upper*/}
//     </header>
//   );
// };

// const Header3 = ({ menus }) => {
//   return (
//     <header className="main-header white-menu menu-absolute">
//       {/*Header-Upper*/}
//       <div className="header-upper">
//         <div className="container bordered-bottom clearfix">
//           <div className="header-inner rel d-flex align-items-center">
//             <div className="logo-outer">
//               <div className="logo">
//                 <Link href="/">
//                   <img
//                     src="assets/images/logos/logo.png"
//                     alt="Logo"
//                     title="Logo"
//                   />
//                 </Link>
//               </div>
//             </div>
//             <div className="nav-outer mx-lg-auto ps-xxl-5 clearfix">
//               {/* Main Menu */}
//               <Menu menus={menus} />
//               {/* Main Menu End*/}
//             </div>
//             {/* Menu Button */}
//             <div className="menu-btns">
//               <Link
//                 href="project-grid"
//                 className="theme-btn btn-small bgc-primary color-white"
//                 data-hover="Get Started"
//               >
//                 <span>Get Started</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*End Header Upper*/}
//     </header>
//   );
// };

// const Header4 = ({ menus }) => {
//   return (
//     <header className="main-header">
//       {/*Header-Upper*/}
//       <div className="header-upper bgc-lighter-green">
//         <div className="container container-1290 clearfix">
//           <div className="header-inner rel d-flex align-items-center">
//             <div className="logo-outer">
//               <div className="logo">
//                 <Link href="/">
//                   <img
//                     src="assets/images/logos/logo-black.png"
//                     alt="Logo"
//                     title="Logo"
//                   />
//                 </Link>
//               </div>
//             </div>
//             <div className="nav-outer me-lg-auto ps-xxl-5 clearfix">
//               {/* Main Menu */}
//               <Menu logo="assets/images/logos/logo-black.png" menus={menus} />
//               {/* Main Menu End*/}
//             </div>
//             {/* Menu Button */}
//             <div className="menu-btns">
//               <Link
//                 href="contact"
//                 className="theme-btn btn-small style-two me-2 bgc-transparent"
//                 data-hover="Get A Demo"
//               >
//                 <span>Get A Demo</span>
//               </Link>
//               <Link
//                 href="contact"
//                 className="theme-btn btn-small hover-secondary color-white"
//                 data-hover="Sign Up Free"
//               >
//                 <span>Sign Up Free</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*End Header Upper*/}
//     </header>
//   );
// };

// const Header5 = ({ menus }) => {
//   return (
//     <header className="main-header header-one white-menu menu-absolute">
//       {/*Header-Upper*/}
//       <div className="header-upper bordered-bottom bgc-black">
//         <div className="container-fluid clearfix">
//           <div className="header-inner rel d-flex align-items-center">
//             <div className="logo-outer">
//               <div className="logo">
//                 <Link href="/">
//                   <img
//                     src="assets/images/logos/logo.png"
//                     alt="Logo"
//                     title="Logo"
//                   />
//                 </Link>
//               </div>
//             </div>
//             <div className="nav-outer me-lg-auto ps-lg-5 ms-xxl-4 clearfix">
//               {/* Main Menu */}
//               <Menu menus={menus} />
//               {/* Main Menu End*/}
//             </div>
//             {/* Menu Button */}
//             <div className="menu-btns d-lg-flex align-items-center">
//               <div className="header-number me-5 d-none d-xl-block">
//                 <i className="fas fa-phone me-1" />
//                 <a href="callto:+000(123)889933">+000 (123) 88 99 33</a>
//               </div>
//               <Link
//                 href="contact"
//                 className="theme-btn btn-small color-white"
//                 data-hover="Let’s Talk"
//               >
//                 <span>Let’s Talk</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/*End Header Upper*/}
//     </header>
//   );
// };

// "use client";
// import Link from "next/link";
// import { useState } from "react";
// import { FiX, FiMenu } from "react-icons/fi";

// const Header = () => {
//   return <Header1 />;
// };
// export default Header;

// const Header1 = () => {
//   const [open, setOpen] = useState(false);

//   const menuData = [
//     {
//       title: "About",
//       links: [
//         { text: "Who we are", href: "/about/who-we-are" },
//         { text: "How we work", href: "/about/how-we-work" },
//         { text: "Careers", href: "/about/careers" },
//       ],
//     },
//     {
//       title: "Packaging",
//       links: [
//         { text: "Packaging Design", href: "/packaging/design" },
//         { text: "Product Shape Design", href: "/packaging/shape" },
//         { text: "White-label Product Packaging", href: "/packaging/white-label" },
//         { text: "Point-of-Sale (POS) Displays", href: "/packaging/pos" },
//       ],
//     },
//     {
//       title: "Brand Design",
//       links: [
//         { text: "Brand Naming", href: "/brand/naming" },
//         { text: "Brand Logo", href: "/brand/logo" },
//         { text: "Brand Identity", href: "/brand/identity" },
//         { text: "Brand Guidelines", href: "/brand/guidelines" },
//         { text: "Catalogue", href: "/brand/catalogue" },
//         { text: "Company Profile Design", href: "/brand/profile" },
//       ],
//     },
//     {
//       title: "Advertising",
//       links: [
//         { text: "Photography", href: "/advertising/photography" },
//         { text: "Wayfinding Signage", href: "/advertising/signage" },
//         { text: "3D Modeling & Animation", href: "/advertising/3d" },
//         { text: "Billboards & Airport Branding", href: "/advertising/billboards" },
//         { text: "Ads Design", href: "/advertising/design" },
//       ],
//     },
//     {
//       title: "Digital Marketing",
//       links: [
//         { text: "Search Engine Optimization (SEO)", href: "/marketing/seo" },
//         { text: "Pay-Per-Click (PPC)", href: "/marketing/ppc" },
//         { text: "Local SEO (GMB)", href: "/marketing/local-seo" },
//         { text: "eCommerce SEO", href: "/marketing/ecommerce-seo" },
//         { text: "eCommerce Ads", href: "/marketing/ecommerce-ads" },
//         { text: "Social Media Marketing (SMM)", href: "/marketing/smm" },
//         { text: "Content Marketing", href: "/marketing/content" },
//         { text: "Search Engine Marketing (SEM)", href: "/marketing/sem" },
//         { text: "Amazon & Flipkart Listing", href: "/marketing/listing" },
//         { text: "Online Reputation Management (ORM)", href: "/marketing/orm" },
//         { text: "Email Marketing", href: "/marketing/email" },
//         { text: "Facebook Ads", href: "/marketing/facebook" },
//         { text: "Google Ads", href: "/marketing/google" },
//         { text: "Amazon Ads", href: "/marketing/amazon" },
//         { text: "Flipkart Ads", href: "/marketing/flipkart" },
//         { text: "GBP Listing", href: "/marketing/gbp" },
//         { text: "Ads Shoot", href: "/marketing/shoot" },
//       ],
//     },
//     {
//       title: "Web",
//       links: [
//         { text: "UI/UX Design", href: "/web/uiux" },
//         { text: "Web Design & Development", href: "/web/design-development" },
//         { text: "Static Website Designing", href: "/web/static" },
//         { text: "Dynamic Website Designing", href: "/web/dynamic" },
//         { text: "Ecommerce Website Designing", href: "/web/ecommerce" },
//         { text: "Corporate Website Designing", href: "/web/corporate" },
//         { text: "Multi-Vendor Ecommerce", href: "/web/multi-vendor" },
//         { text: "Website Re-Designing", href: "/web/redo" },
//         { text: "WordPress Development", href: "/web/wordpress" },
//         { text: "PHP Development", href: "/web/php" },
//         { text: "CodeIgniter / Laravel", href: "/web/ci-laravel" },
//         { text: "Custom Web Development", href: "/web/custom" },
//         { text: "Web Portal Development", href: "/web/portal" },
//         { text: "Education Portal", href: "/web/education" },
//         { text: "Job Portal", href: "/web/job" },
//         { text: "Hotel Management Portal", href: "/web/hotel" },
//         { text: "Real Estate Portal", href: "/web/real-estate" },
//         { text: "B2B / B2C Portal", href: "/web/b2b-b2c" },
//         { text: "3rd Party API Integration", href: "/web/api" },
//         { text: "Payment Gateway Integration", href: "/web/payment" },
//       ],
//     },
//     {
//       title: "Others",
//       links: [
//         { text: "Portfolio", href: "/portfolio" },
//         { text: "Blog", href: "/blog" },
//         { text: "Our Plan", href: "/plan" },
//         { text: "Contact", href: "/contact" },
//         { text: "Pay Now", href: "/pay" },
//         { text: "Privacy Policy", href: "/privacy" },
//         { text: "Terms & Conditions", href: "/terms" },
//       ],
//     },
//   ];

//   return (
//     <header className="main-header header-one white-menu menu-absolute">
//       <div className="header-upper">
//         <div className="container px-xxl-0   clearfix">
//           <div className="header-inner rel d-flex align-items-center justify-content-between">
//             {/* Logo */}
//             <div className="logo-outer">
//               <Link href="/">
//                 <img
//                   src="/assets/images/logos/logo.png"
//                   alt="Logo"
//                   title="Logo"
//                   style={{ maxHeight: "50px" }}
//                 />
//               </Link>
//             </div>

//             {/* Menu Button */}
//             <div className="menu-btns">
//               <button
//                 className="btn btn-link text-dark fw-bold d-flex align-items-center gap-1"
//                 onClick={() => setOpen(true)}
//               >
//                 MENU <FiMenu size={22} />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Overlay Menu */}
//       {open && (
//         <div
//           className="overlay-menu position-fixed top-0 start-0 w-100 h-100 bg-dark text-white"
//           style={{ zIndex: 2000 }}
//         >
//           {/* Close Button */}
//           <div className="d-flex justify-content-end p-4">
//             <button
//               className="btn btn-link text-white"
//               onClick={() => setOpen(false)}
//             >
//               <FiX size={32} />
//             </button>
//           </div>

//           {/* Menu Grid */}
//           <div className="container h-100 d-flex flex-column justify-content-center">
//             <div className="row g-5">
//               {menuData.map((section, i) => (
//                 <div key={i} className="col-12 col-md-4 col-lg-3">
//                   <h4 className="fw-bold mb-3 text-uppercase">{section.title}</h4>
//                   <ul className="list-unstyled">
//                     {section.links.map((link, j) => (
//                       <li key={j} className="mb-2">
//                         <Link
//                           href={link.href}
//                           className="text-white-50 text-decoration-none hover-text-light"
//                         >
//                           {link.text}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// https://recreatorsdesign.com/assets/image/logo.png

// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { FiX, FiMenu, FiChevronRight, FiPhone, FiMail, FiInstagram, FiTwitter, FiLinkedin, FiYoutube } from "react-icons/fi";

// const Header = () => {
//   return <Header1 />;
// };
// export default Header;

// const Header1 = () => {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [activeCategory, setActiveCategory] = useState(null);

//   // Handle scroll effect for header
//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 10;
//       setScrolled(isScrolled);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Prevent body scroll when menu is open
//   useEffect(() => {
//     if (open) {
//       document.body.style.overflow = "hidden";
//       document.documentElement.style.overflow = "hidden";
//     } else {
//       document.body.style.overflow = "unset";
//       document.documentElement.style.overflow = "unset";
//     }

//     return () => {
//       document.body.style.overflow = "unset";
//       document.documentElement.style.overflow = "unset";
//     };
//   }, [open]);

//   const menuData = [
//     {
//       title: "About",
//       icon: "🏢",
//       links: [
//         { text: "About Us", href: "/about" },
//         { text: "How we work", href: "how-we-work" },
//         { text: "Careers", href: "career" },
//       ],
//     },
//     {
//       title: "Packaging",
//       icon: "📦",
//       links: [
//         { text: "Packaging Design", href: "/packaging-design" },
//         { text: "Product Shape Design", href: "/product-shape-design" },
//         { text: "White-label Product Packaging", href: "/white-label-product-packaging" },
//         { text: "Point-of-Sale (POS) Displays", href: "/point-of-sale-displays" },
//       ],
//     },
//     {
//       title: "Brand Design",
//       icon: "🎨",
//       links: [
//         { text: "Brand Naming", href: "/brand-naming" },
//         { text: "Brand Logo", href: "/brand-logo" },
//         { text: "Brand Identity", href: "/brand-identity" },
//         { text: "Brand Guidelines", href: "/brand-guidelines" },
//         { text: "Catalogue", href: "/brand-catalogue" },
//         { text: "Company Profile Design", href: "/company-profile-design" },
//       ],
//     },
//     {
//       title: "Advertising",
//       icon: "📢",
//       links: [
//         { text: "Photography", href: "/photography" },
//         { text: "Wayfinding Signage", href: "/wayfinding-signage" },
//         { text: "3D Modeling & Animation", href: "/3d-modeling-animation" },
//         { text: "Billboards & Airport Branding", href: "/billboards-airportbranding" },
//         { text: "Ads Design", href: "/advertising/design" },
//       ],
//     },
//     {
//       title: "Digital Marketing",
//       icon: "📱",
//       links: [
//         { text: "Search Engine Optimization (SEO)", href: "/search-engine-optimization" },
//         { text: "Pay-Per-Click (PPC)", href: "/pay-per-click" },
//         { text: "Local SEO (GMB)", href: "/local-seo" },
//         { text: "eCommerce SEO", href: "/e-commerce-seo" },
//         { text: "eCommerce Ads", href: "/e-commerce-ads" },
//         { text: "Social Media Marketing (SMM)", href: "/social-media-marketing" },
//         { text: "Content Marketing", href: "/content-marketing" },
//         { text: "Search Engine Marketing (SEM)", href: "/search-engine-marketing" },
//         { text: "Amazon & Flipkart Listing", href: "/amazon-flipkart-listing" },
//         { text: "Online Reputation Management (ORM)", href: "/online-reputation-management" },
//         { text: "Email Marketing", href: "/email-marketing" },
//         { text: "Facebook Ads", href: "/facebook-ads" },
//         { text: "Google Ads", href: "/google-ads" },
//         { text: "Amazon Ads", href: "/amazon-ads" },
//         { text: "Flipkart Ads", href: "/flipkart-ads" },
//         { text: "GBP Listing", href: "/gbp-listing" },
//         { text: "Ads Shoot", href: "/ads-shoot" },
//       ],
//     },
//     {
//       title: "Web Development",
//       icon: "🌐",
//       links: [

//         { text: "WordPress Development", href: "/word-press-development" },
//         { text: "PHP Development", href: "/php-development" },
//         { text: "React.js / Next.js Development", href: "/react-js-next-js-development" },
//         { text: "Custom Web Development", href: "/custom-web-development" },
//         { text: "Web Portal Development", href: "/web-portal-development" },
//         { text: "Education Portal", href: "/education-portal" },
//         { text: "Job Portal", href: "/job-portal" },
//         { text: "Hotel Management Portal", href: "/hotel-management-portal" },
//         { text: "Real Estate Portal", href: "/real-estate-portal" },
//         { text: "B2B / B2C Portal", href: "/b2b-b2c-portal" },
//         { text: "3rd Party API Integration", href: "/3rd-party-api-integration" },
//         { text: "Payment Gateway Integration", href: "/payment-gateway-integration" },
//       ],
//     },
//      {
//       title: "Web Designing",
//       icon: "🌐",
//       links: [
//         { text: "UI/UX Design", href: "/ui-ux-design" },
//         { text: "Web Design & Development", href: "/web-design-development" },
//         { text: "Static Website Designing", href: "/static-website-designing" },
//         { text: "Dynamic Website Designing", href: "/dynamic-website-designing" },
//         { text: "Ecommerce Website Designing", href: "/ecommerce-website-designing" },
//         { text: "Corporate Website Designing", href: "/corporate-website-designing" },
//         { text: "Multi-Vendor Ecommerce", href: "/multi-vendor-ecommerce" },
//         { text: "Website Re-Designing", href: "/website-redesigning" },

//       ],
//     },
//     {
//       title: "Others",
//       icon: "📂",
//       links: [
//         { text: "Portfolio", href: "/project-list" },
//         { text: "Blog", href: "/blog" },
//         { text: "Our Plan", href: "/pricing" },
//         { text: "Contact", href: "/contact" },
//         { text: "Pay Now", href: "/shop" },
//         { text: "FAQ", href: "/faqs" },
//         { text: "Privacy Policy", href: "/privacy-policy" },
//         { text: "Terms & Conditions", href: "/terms-conditions" },
//       ],
//     },
//   ];

//   return (
//     <>
//       {/* Top Bar */}
//       <div className="w-full  bg-gradient-to-r from-gray-900 to-black text-gray-300 text-sm py-2 hidden md:block">
//         <div className="container mx-auto px-4 xl:px-0 flex justify-between items-center">
//           {/* <div className="flex items-center space-x-4">
//             <div className="flex items-center">
//               <FiPhone className="mr-2 text-blue-400" size={14} />
//               <span>+1 (234) 567-8900</span>
//             </div>
//             <div className="flex items-center">
//               <FiMail className="mr-2 text-blue-400" size={14} />
//               <span>info@company.com</span>
//             </div>
//           </div> */}
//           {/* <div className="flex items-center space-x-4">
//             <span>Follow Us:</span>
//             <div className="flex space-x-3">
//               <a href="#" className="hover:text-blue-400 transition-colors duration-300">
//                 <FiInstagram size={16} />
//               </a>
//               <a href="#" className="hover:text-blue-400 transition-colors duration-300">
//                 <FiTwitter size={16} />
//               </a>
//               <a href="#" className="hover:text-blue-400 transition-colors duration-300">
//                 <FiLinkedin size={16} />
//               </a>
//               <a href="#" className="hover:text-blue-400 transition-colors duration-300">
//                 <FiYoutube size={16} />
//               </a>
//             </div>
//           </div> */}
//         </div>
//       </div>

//       {/* Main Header */}
//       <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? "bg-black py-5 shadow-xl" : "bg-black py-5"}`}>
//         <div className="container mx-auto px-4 xl:px-0">
//           <div className="flex items-center justify-between">
//             {/* Logo */}
//             <div className="logo-outer">
//               <Link href="/" className="inline-block">
//                 <img
//                   src="https://recreatorsdesign.com/assets/image/logo.png"
//                   alt="Logo"
//                   title="Logo"
//                   className="h-10 md:h-12 transition-all duration-300"
//                 />
//               </Link>
//             </div>

//             {/* Desktop Menu Items (Optional) */}
//             {/* <nav className="hidden lg:flex items-center space-x-8">
//               <Link href="/portfolio" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wider">Portfolio</Link>
//               <Link href="/blog" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wider">Blog</Link>
//               <Link href="/contact" className="text-white hover:text-blue-400 transition-colors duration-300 font-medium text-sm uppercase tracking-wider">Contact</Link>
//             </nav> */}

//             {/* Menu Button */}
//             <div className="menu-btns">
//               <button
//                 className="btn-menu flex items-center gap-2 font-medium text-white hover:text-blue-400 transition-all duration-300 group relative"
//                 onClick={() => setOpen(true)}
//                 aria-label="Open menu"
//               >
//                 {/* <span className="hidden md:inline-block tracking-wider text-sm uppercase">Menu</span> */}
//                 <div className="relative w-8 h-8 flex items-center justify-center rounded-full bg-blue-500/10 group-hover:bg-blue-500/20 transition-all duration-300">
//                   <FiMenu size={20} className="group-hover:scale-110 transition-transform duration-300" />
//                 </div>
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Overlay Menu */}
//         <div
//           className={`overlay-menu fixed inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white z-[60] transition-all duration-700 ease-in-out ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
//         >
//           {/* Header with Close Button */}
//           <div className="border-b border-gray-800 bg-black/30 backdrop-blur-md">
//             <div className="container mx-auto px-4 xl:px-0">
//               <div className="flex items-center justify-between py-5">
//                 <Link href="/" className="inline-block" onClick={() => setOpen(false)}>
//                   <img
//                     src="https://recreatorsdesign.com/assets/image/logo.png"
//                     alt="Logo"
//                     title="Logo"
//                     className="h-10 md:h-12 transition-all duration-300"
//                   />
//                 </Link>
//                 <button
//                   className="close-btn p-3 text-white hover:text-blue-400 transition-all duration-300 rounded-full hover:bg-white/10 backdrop-blur-sm"
//                   onClick={() => setOpen(false)}
//                   aria-label="Close menu"
//                 >
//                   <FiX size={28} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Menu Grid */}
//           <div className="container mx-auto px-4 xl:px-0 h-[calc(100%-80px)] scrollbar-hide overflow-y-auto py-5">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
//               {menuData.map((section, i) => (
//                 <div key={i} className="menu-section group">
//                   <div className="flex items-center mb-6 pb-1 border-b border-gray-800">
//                     {/* <span className="text-2xl mr-3 opacity-80">{section.icon}</span> */}
//                     <h4 className="text-xl font-bold uppercase tracking-wider text-blue-400">
//                       {section.title}
//                     </h4>
//                   </div>
//                   <ul className="space-y-4">
//                     {section.links.map((link, j) => (
//                       <li key={j}>
//                         <Link
//                           href={link.href}
//                           className="text-gray-300 hover:text-white transition-all duration-300 py-2 flex items-center group/link relative overflow-hidden"
//                           onClick={() => setOpen(false)}
//                         >
//                           <div className="absolute left-0 w-2 h-2 bg-blue-500 rounded-full opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform -translate-x-3 group-hover/link:translate-x-0"></div>
//                           <FiChevronRight className="mr-3 text-blue-500 opacity-0 group-hover/link:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover/link:translate-x-0" />
//                           <span className="relative after:content-[''] after:absolute after:w-0 after:h-px after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 after:left-0 after:-bottom-1 after:transition-all after:duration-500 group-hover/link:after:w-full">
//                             {link.text}
//                           </span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Footer */}
//           {/* <div className="border-t border-gray-800 bg-black/30 backdrop-blur-md mt-auto">
//             <div className="container mx-auto px-4 xl:px-0 py-6">
//               <div className="flex flex-col md:flex-row justify-between items-center">
//                 <p className="text-gray-500 text-sm mb-3 md:mb-0">
//                   © {new Date().getFullYear()} Creative Agency. All rights reserved.
//                 </p>
//                 <div className="flex space-x-6">
//                   <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors duration-300 text-sm">Privacy</a>
//                   <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors duration-300 text-sm">Terms</a>
//                   <a href="#" className="text-gray-500 hover:text-blue-400 transition-colors duration-300 text-sm">Contact</a>
//                 </div>
//               </div>
//             </div>
//           </div> */}
//         </div>
//       </header>

//       {/* Custom styles */}
//       <style jsx>{`
//         .overlay-menu {
//           display: flex;
//           flex-direction: column;
//           background: linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%);
//         }

//         .menu-section {
//           opacity: 0;
//           transform: translateY(20px);
//           animation: fadeInUp 0.6s ease forwards;
//         }

//         @keyframes fadeInUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .menu-section:nth-child(1) { animation-delay: 0.1s; }
//         .menu-section:nth-child(2) { animation-delay: 0.15s; }
//         .menu-section:nth-child(3) { animation-delay: 0.2s; }
//         .menu-section:nth-child(4) { animation-delay: 0.25s; }
//         .menu-section:nth-child(5) { animation-delay: 0.3s; }
//         .menu-section:nth-child(6) { animation-delay: 0.35s; }
//         .menu-section:nth-child(7) { animation-delay: 0.4s; }

//         /* Custom scrollbar */
//         .overlay-menu::-webkit-scrollbar {
//           width: 8px;
//         }

//         .overlay-menu::-webkit-scrollbar-track {
//           background: rgba(255, 255, 255, 0.05);
//           border-radius: 4px;
//         }

//         .overlay-menu::-webkit-scrollbar-thumb {
//           background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
//           border-radius: 4px;
//         }

//         .overlay-menu::-webkit-scrollbar-thumb:hover {
//           background: linear-gradient(to bottom, #2563eb, #7c3aed);
//         }
//       `}</style>
//     </>
//   );
// };

// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { FiX, FiMenu, FiChevronRight } from "react-icons/fi";

// const Header = () => {
//   return <Header1 />;
// };
// export default Header;

// const Header1 = () => {
//   const [open, setOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 10);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     document.body.style.overflow = open ? "hidden" : "unset";
//     document.documentElement.style.overflow = open ? "hidden" : "unset";
//     return () => {
//       document.body.style.overflow = "unset";
//       document.documentElement.style.overflow = "unset";
//     };
//   }, [open]);

//  const menuData = [
//     {
//       title: "About",
//       icon: "🏢",
//       links: [
//         { text: "About Us", href: "/about" },
//         { text: "How we work", href: "how-we-work" },
//         { text: "Careers", href: "career" },
//       ],
//     },
//     {
//       title: "Packaging",
//       icon: "📦",
//       links: [
//         { text: "Packaging Design", href: "/packaging-design" },
//         { text: "Product Shape Design", href: "/product-shape-design" },

//       ],
//     },
//     {
//       title: "Brand Design",
//       icon: "🎨",
//       links: [
//         { text: "Brand Naming", href: "/brand-naming" },
//         { text: "Brand Logo", href: "/brand-logo" },
//         { text: "Brand Identity", href: "/brand-identity" },
//         { text: "Brand Guidelines", href: "/brand-guidelines" },
//         { text: "Catalogue", href: "/brand-catalogue" },
//         { text: "Company Profile Design", href: "/company-profile-design" },
//       ],
//     },
//     {
//       title: "Advertising",
//       icon: "📢",
//       links: [
//         { text: "Photography", href: "/photography" },
//         { text: "Wayfinding Signage", href: "/wayfinding-signage" },
//         { text: "3D Modeling & Animation", href: "/3d-modeling-animation" },
//         { text: "Billboards & Airport Branding", href: "/billboards-airportbranding" },
//         { text: "Ads Design", href: "/advertising/design" },
//       ],
//     },
//    {
//     title: "Video",
//     icon: "🎨",
//     links: [
//       { text: "Corporate Video Graphics", href: "/corporate-video-graphics" },
//       { text: "Corporate Shoot", href: "/corporate-shoot" },
//       { text: "Motion Graphics", href: "/motion-graphics" },
//     ],

//    },
//     {
//       title: "Digital Marketing",
//       icon: "📱",
//       links: [
//         { text: "Search Engine Optimization (SEO)", href: "/search-engine-optimization" },
//         { text: "Pay-Per-Click (PPC)", href: "/pay-per-click" },
//         { text: "Local SEO (GMB)", href: "/local-seo" },
//         { text: "Social Media Marketing (SMM)", href: "/social-media-marketing" },
//         { text: "Content Marketing", href: "/content-marketing" },
//         { text: "Search Engine Marketing (SEM)", href: "/search-engine-marketing" },
//         { text: "Online Reputation Management (ORM)", href: "/online-reputation-management" },

//         { text: "Facebook Ads", href: "/facebook-ads" },
//         { text: "Google Ads", href: "/google-ads" },
//         { text: "GBP Listing", href: "/gbp-listing" },
//         { text: "Ads Shoot", href: "/ads-shoot" },
//       ],
//     },
//     {
//       title: "Web Development",
//       icon: "🌐",
//       links: [

//         { text: "WordPress Development", href: "/word-press-development" },
//         { text: "PHP Development", href: "/php-development" },
//         { text: "React.js / Next.js Development", href: "/react-js-next-js-development" },
//         { text: "Custom Web Development", href: "/custom-web-development" },
//         { text: "Web Portal Development", href: "/web-portal-development" },
//         { text: "CRM Development", href: "/crm-development" },
//       ],
//     },
//      {
//       title: "Web Designing",
//       icon: "🌐",
//       links: [
//         { text: "UI/UX Design", href: "/ui-ux-design" },
//         { text: "Web Design & Development", href: "/web-design-development" },
//         { text: "Static Website Designing", href: "/static-website-designing" },
//         { text: "Dynamic Website Designing", href: "/dynamic-website-designing" },
//         { text: "Ecommerce Website Designing", href: "/ecommerce-website-designing" },
//         { text: "Corporate Website Designing", href: "/corporate-website-designing" },
//         { text: "Multi-Vendor Ecommerce", href: "/multi-vendor-ecommerce" },
//         { text: "Website Re-Designing", href: "/website-redesigning" },

//       ],
//     },
//    {
//      title: "E-Commerce",
//      icon: "🛒",
//      links: [
//        { text: "eCommerce SEO", href: "/e-commerce-seo" },
//        { text: "eCommerce Ads", href: "/e-commerce-ads" },
//        { text: "Amazon & Flipkart Listing", href: "/amazon-flipkart-listing" },
//         { text: "Amazon Ads", href: "/amazon-ads" },
//         { text: "Flipkart Ads", href: "/flipkart-ads" },
//         { text: "Email Marketing", href: "/email-marketing" },
//      ]
//    },

//     {
//       title: "Others",
//       icon: "📂",
//       links: [
//         { text: "Portfolio", href: "/project-list" },
//         { text: "Blog", href: "/blog" },
//         { text: "Our Plan", href: "/pricing" },
//         { text: "Contact", href: "/contact" },
//         { text: "Pay Now", href: "/pay-now" },
//         { text: "FAQ", href: "/faqs" },
//         { text: "Privacy Policy", href: "/privacy-policy" },
//         { text: "Terms & Conditions", href: "/terms-conditions" },
//       ],
//     },
//   ];

//   return (
//     <>
//       {/* Main Header */}
//       <header
//         className={`!fixed !top-0 !left-0 !w-full !z-50 !transition-all !duration-500 ${
//           scrolled ? "!bg-black !py-3 !shadow-xl" : "!bg-black !py-4"
//         }`}
//       >
//         <div className="container !mx-auto !px-4">
//           <div className="!flex !items-center !justify-between">
//             {/* Logo */}
//             <Link href="/" className="!inline-block">
//               <img
//                 src="https://recreatorsdesign.com/assets/image/logo.png"
//                 alt="Logo"
//                 className="!h-8 sm:!h-10 md:!h-12"
//               />
//             </Link>

//             {/* Menu Button */}
//             <button
//               className="!flex !items-center !text-white hover:!text-blue-400 !transition-all !duration-300"
//               onClick={() => setOpen(true)}
//               aria-label="Open menu"
//             >
//               <FiMenu size={28} />
//             </button>
//           </div>
//         </div>

//         {/* Overlay Menu */}
//         <div
//           className={`!overlay-menu !fixed !inset-0 !bg-gradient-to-br from-gray-900 via-black to-gray-900 !text-white !z-[60] !transition-all !duration-700 !ease-in-out ${
//             open ? "!opacity-100 !visible" : "!opacity-0 !invisible"
//           }`}
//         >
//           {/* Header with Close Button */}
//           <div className="!border-b !border-gray-800 !bg-black/40 !backdrop-blur-md">
//             <div className="!container !mx-auto ">
//               <div className="!flex !items-center !justify-between !py-4">
//                 <Link href="/" className="!inline-block" onClick={() => setOpen(false)}>
//                   <img
//                     src="https://recreatorsdesign.com/assets/image/logo.png"
//                     alt="Logo"
//                     className="!h-8 sm:!h-10 md:!h-12"
//                   />
//                 </Link>
//                 <button
//                   className="!p-2 !text-white hover:!text-blue-400 !transition-all !duration-300 !rounded-full hover:!bg-white/10"
//                   onClick={() => setOpen(false)}
//                   aria-label="Close menu"
//                 >
//                   <FiX size={26} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Menu Grid */}
//           <div className="container !mx-auto !px-4 !py-6 scrollbar-hide  overflow-y-auto !h-[calc(100%-64px)]">
//             <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-5 !gap-4">
//               {menuData.map((section, i) => (
//                 <div key={i} className="!menu-section !group">
//                   <h4 className="  !font-bold !text-[27px] !tracking-wider !text-blue-400 !mb-2">
//                     {section.title}
//                   </h4>
//                   <ul className="">
//                     {section.links.map((link, j) => (
//                       <li key={j}>
//                         <Link
//                           href={link.href}
//                           onClick={() => setOpen(false)}
//                           className="!text-gray-300 hover:!text-white  !transition-all !duration-300   !flex !items-center group/link !relative overflow-hidden"
//                         >
//                           {/* Blue dot */}
//                           {/* <div className="!absolute !left-0 !w-2 !h-2 bg-blue-500 !rounded-full !hidden group-hover/link:!block !transition-all !duration-300 !transform -translate-x-3 group-hover/link:translate-x-0"></div> */}
//                           {/* Chevron */}
//                           {/* <FiChevronRight className="!mr-2 !text-blue-500 opacity-0 hidden group-hover/link:opacity-100 group-hover/link:block !transition-all !duration-300 !transform -!translate-x-1 group-hover/link:!translate-x-0" /> */}
//                           {/* Text with underline animation */}
//                           <span className="relative hover:bg-pink-600  !pl-2 !pr-14 after:content-[''] after:absolute after:w-0 after:h-px  after:left-0 hover:!py-1 after:!transition-all after:!duration-500 group-hover/link:after:w-full  after:!bottom-0  !text-[15px]">
//                             {link.text}
//                           </span>
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Custom styles */}
//       <style jsx>{`
//         .menu-section {
//           opacity: 0;
//           transform: translateY(20px);
//           animation: fadeInUp 0.6s ease forwards;
//         }
//         @keyframes fadeInUp {
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .menu-section:nth-child(1) {
//           animation-delay: 0.1s;
//         }
//         .menu-section:nth-child(2) {
//           animation-delay: 0.15s;
//         }
//         .menu-section:nth-child(3) {
//           animation-delay: 0.2s;
//         }
//         .menu-section:nth-child(4) {
//           animation-delay: 0.25s;
//         }
//       `}</style>
//     </>
//   );
// };

"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiX, FiMenu } from "react-icons/fi";
import { CircleArrowRight } from "lucide-react";

const Header = () => {
  return <Header1 />;
};
export default Header;

const navLinks = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
  { text: "Portfolio", href: "/project-list" },
  { text: "Our Plan", href: "/pricing" },
];

const Header1 = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "unset";
    document.documentElement.style.overflow = open ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
      document.documentElement.style.overflow = "unset";
    };
  }, [open]);

   const menuData = [
    {
      title: "About",
      icon: "🏢",
      links: [
        { text: "About Us", href: "/about" },
        { text: "How we work", href: "how-we-work" },
        { text: "Careers", href: "career" },
      ],
    },
    {
      title: "Packaging",
      href: "/packaging",
      icon: "📦",
      links: [
        { text: "Flexible Packaging", href: "/packaging" },
        { text: "Rigid & Folding Packaging", href: "/packaging" },
        { text: "Jars, Bottles & Containers", href: "/packaging" },
        { text: "Labels & Stickers", href: "/packaging" },
        {text: "E-Commerce & Shipping Packaging",href: "/packaging"},
        {text: "Specialty & Gifting Packaging",href: "/packaging"},
        { text: "Industry-Specific Packaging", href: "/packaging" },
        { text: "FMCG", href: "/packaging" },
      ],
    },
      {
      title: "WEB DEVELOPMENT & DESIGN",
      href: "/web-development-&-design",
      icon: "🌐",
      links: [
        { text: "UI/UX Design", href: "/web-development-&-design" },
        { text: "Web Design & Development", href: "/web-development-&-design" },
        { text: "Static Website Designing",href: "/web-development-&-design",},
        { text: "Dynamic Website Designing", href: "/web-development-&-design" },
        { text: "Ecommerce Website Designing",href: "/web-development-&-design",},
        { text: "Corporate Website Designing", href: "/web-development-&-design" },
        { text: "Multi-Vendor Ecommerce", href: "/web-development-&-design" },
        { text: "Website Re-Designing", href: "/web-development-&-design" },
        { text: "React.js / Next.js Development", href: "/web-development-&-design" },
        { text: "Custom Web Development", href: "/web-development-&-design" },
        { text: "Web Portal Development", href: "/web-development-&-design" },
        { text: "CRM Development", href: "/crm-development" },
      ],
    },
    {
      title: "SEO",
      href: "/seo",
      icon: "🎨",
      links: [
        { text: "On-Page SEO", href: "/seo" },
        { text: "Off-Page SEO", href: "/seo" },
        { text: "Technical SEO", href: "/seo" },
        { text: "Local SEO", href: "/seo" },
        { text: "Keyword Research", href: "/seo" },
        { text: "Content SEO", href: "/seo" },
        { text: "E-commerce SEO", href: "/seo" },
        { text: "SEO Analytics & Reporting", href: "/seo" },
      ],
    },
     {
      title: "Digital Marketing",
      href: "/digital-marketing",
      icon: "📱",
      links: [
        {text: "Performance Marketing",href: "/digital-marketing",},
        { text: "Influencer Marketing", href: "/digital-marketing" },
        { text: "Pay-Per-Click (PPC)", href: "/digital-marketing" },
        {text: "Social Media Marketing (SMM)",href: "/digital-marketing",},
        { text: "Content Marketing", href: "/digital-marketing" },
        {text: "Meta Ads",href: "/digital-marketing",},
        {text: "Google Ads",href: "/digital-marketing",},
        { text: "Ads Shoot", href: "/digital-marketing" },
        { text: "eCommerce Ads", href: "/digital-marketing" },
        { text: "Amazon Ads", href: "/digital-marketing" },
        { text: "Flipkart Ads", href: "/digital-marketing" },
        { text: "Email Marketing", href: "/digital-marketing" },
        { text: "Multi Level Marketing", href: "/digital-marketing" },

      ],
    }, 
    {
      title: "BRAND DESIGN",
      href: "/brand-design",
      icon: "📢",
      links: [
        { text: "Brand Naming", href: "/brand-design" },
        { text: "Brand Logo", href: "/brand-design" },
        { text: "Brand Identity", href: "/brand-design" },
        { text: "Brand Storytelling",href: "/brand-design",},
        { text: "Brand Personality", href: "/brand-design" },
        { text: "Brand Guidelines", href: "/brand-design" },
        { text: "Catalogue", href: "/brand-design" },
        { text: "Company Profile Design", href: "/brand-design" },

      ],
    },
    {
      title: "PHOTOGRAPHY & VIDEOGRAPHY",
      href: "/photography-&-videography",
      icon: "🎨",
      links: [
        { text: "Product Photography", href: "/photography-&-videography" },
        { text: "Corporate Shoot", href: "/photography-&-videography" },
        { text: "Corporate Video Graphics", href: "/photography-&-videography" },
        { text: "Motion Graphics", href: "/photography-&-videography" },
        { text: "Model Video Shoots", href: "/photography-&-videography" },
        { text: "Ads Design", href: "/photography-&-videography" },

      ],
    },
   
  
    {
      title: " E-COMMERCE",
      // href: "/web-designing",
      href: "/e-commerce",

      icon: "🌐",
      links: [
        { text: "Ecommerce Website Designing", href: "/e-commerce" },
        { text: "Multi-Vendor Ecommerce", href: "/e-commerce" },
        { text: "eCommerce SEO", href: "/e-commerce" },
        { text: "eCommerce Ads ",href: "/e-commerce"},
        { text: "Quick Commerce",href: "/e-commerce"},
        { text: "Amazon Ads",href: "/e-commerce"},
        { text: "Flipkart Ads", href: "/e-commerce" },
        { text: "Email Marketing", href: "/e-commerce" },
      ],
    },
    {
      title: "CONTENT WRITING",
       href: "/content-writing",
      icon: "🛒",
      links: [
        { text: "Competitor Research", href: "/content-writing" },
        { text: "SEO Content Writing", href: "/content-writing" },
        { text: "Website Copywriting", href: "/content-writing" },
        { text: "Blog & Article Writing", href: "/content-writing" },
        { text: "Product Descriptions", href: "/content-writing" },
        { text: "Social Media Content Writing", href: "/content-writing" },
        { text: "Ad Copywriting", href: "/content-writing" },
        { text: "Brand Messaging & Taglines", href: "/content-writing" },
        { text: "Email & Newsletter Content", href: "/content-writing" },

      ],
    },
     {
      title: "DESIGNING & EDITING",
      href: "/designing-&-editing",
      icon: "🛒",
      links: [
        { text: "Photo Editing & Retouching", href: "/designing-&-editing" },
        { text: "Video Editing", href: "/designing-&-editing" },
        { text: "Reels & Short-Form Video Editing", href: "/designing-&-editing" },
        { text: "Graphic Designing", href: "/designing-&-editing" },
        { text: "Presentation & PPT Design", href: "/designing-&-editing" },
        { text: "Infographic Design", href: "/designing-&-editing" },
        { text: "GIF & Animation Design", href: "/designing-&-editing" },
        { text: "Thumbnail Design", href: "/designing-&-editing" },

      ],
    },

    {
      title: "Others",
      icon: "📂",
      links: [
        { text: "Portfolio", href: "/project-list" },
        { text: "Blog", href: "/blog" },
        { text: "Our Plan", href: "/pricing" },
        { text: "Contact", href: "/contact" },
        { text: "Pay Now", href: "/pay-now" },
        { text: "FAQ", href: "/faqs" },
        // { text: "Privacy                   Policy", href: "/privacy-policy" },
        // { text: "Terms & Conditions", href: "/terms-conditions" },
      ],
    },
  ];
  return (
    <>
      {/* ================= Main Header ================= */}
      <header
        className={`!fixed !top-0 !left-0 !w-full !z-50 !transition-all !duration-500 ${
          scrolled
            ? "!bg-black/80 !backdrop-blur-xl !py-3 !shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)]"
            : "!bg-black !py-5"
        }`}
      >
        {/* Glowing bottom divider */}
        <div className="!pointer-events-none !absolute !bottom-0 !left-0 !h-px !w-full !bg-gradient-to-r !from-transparent !via-orange-500/50 !to-transparent" />

        {/* Soft ambient glow */}
        <div className="!pointer-events-none !absolute !-top-24 !left-1/2 !h-40 !w-[600px] !-translate-x-1/2 !rounded-full !bg-orange-500/10 !blur-[100px]" />

        <div className="!container !mx-auto !px-4 sm:!px-6 !flex !items-center !justify-between !relative">
          {/* ---------- LEFT: Desktop Nav ---------- */}
          <nav className="!hidden lg:!flex !items-center !gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                className="!group !relative !px-4 !py-2 !text-[15px] !font-medium !tracking-wide !text-gray-300 hover:!text-white !transition-colors !duration-300"
              >
                {item.text}
                <span className="!absolute !left-1/2 !bottom-0 !h-[2px] !w-0 !-translate-x-1/2 !rounded-full !bg-gradient-to-r !from-orange-400 !to-amber-500 !transition-all !duration-300 group-hover:!w-6" />
              </Link>
            ))}
          </nav>

          {/* ---------- CENTER: Logo ---------- */}
          <Link
            href="/"
            className="!absolute !left-1/2 !-translate-x-1/2 !inline-flex !items-center !transition-transform !duration-300 hover:!scale-105"
          >
            <img
              src="/assets/images/logos/RCLogo.png"
              alt="Logo"
              className={`!w-auto !transition-all !duration-500 ${
                scrolled ? "!h-7 md:!h-8" : "!h-9 md:!h-10"
              } !drop-shadow-[0_0_18px_rgba(249,115,22,0.35)]`}
            />
          </Link>

          {/* ---------- RIGHT: Menu Button ---------- */}
          <div className="!ml-auto">
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="!group !flex !items-center !gap-2 !rounded-full !border !border-white/15 !bg-white/5 !px-3.5 !py-2.5 sm:!px-5 sm:!py-3 !text-white !backdrop-blur-md !transition-all !duration-300 hover:!border-orange-400/60 hover:!bg-orange-500/10 hover:!text-orange-300 hover:!shadow-[0_0_25px_-5px_rgba(249,115,22,0.6)]"
            >
              <span className="!hidden sm:!block !text-[12px] !font-semibold !uppercase !tracking-[0.2em]">
                Menu
              </span>
              <FiMenu
                size={22}
                className="!transition-transform !duration-300 group-hover:!rotate-90"
              />
            </button>
          </div>
        </div>
      </header>

      {/* ================= Overlay Menu (unchanged) ================= */}
      <div
        className={`!fixed !inset-0 !bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white !z-[60] !transform transition-all !duration-500 !ease-in-out ${
          open
            ? "!opacity-100 !visible !translate-x-0"
            : "!opacity-0 !invisible !translate-x-full"
        }`}
      >
        <div className=" !bg-black/40 !backdrop-blur-md">
          <div className="!container !mx-auto !px-4 !flex !items-center !justify-between !py-4">
            <Link href="/" className="inline-block" onClick={() => setOpen(false)}>
              <img
                src="/assets/images/logos/RCLogo.png"
                alt="Logo"
                className="h-8 sm:h-8 md:h-8"
              />
            </Link>
            <button
              className="!p-2 !text-white hover:!text-blue-400 !transition-all !rounded-full"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={26} />
            </button>
          </div>
        </div>

        <div className="container !mx-auto !px-6 !py-8 !overflow-y-auto h-[calc(100%-64px)] scrollbar-hide">
          <div className="!grid !grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4 !gap-6">
            {menuData.map((section, i) => (
              <div
                key={i}
                className="menu-section animate-fadeInUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div>
                  <h3 className="!flex !items-center !gap-2 !font-bold !text-[18px] !text-white !mb-3">
                    <CircleArrowRight className="!w-6 !h-6 !text-white" />
                    {section.href ? (
                      <Link href={section.href} onClick={() => setOpen(false)}>
                        {section.title}
                      </Link>
                    ) : (
                      <span>{section.title}</span>
                    )}
                  </h3>

                  <ul className="space-y-2">
                    {section.links.map((link, j) => (
                      <li key={j}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="relative pl-2 text-gray-300 hover:text-white transition-all duration-300 inline-block group"
                        >
                          <span className="text-[15px] !text-gray-400 !rounded-md">
                            {link.text}
                          </span>
                          <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        .animate-fadeInUp {
          opacity: 0;
          transform: translateY(15px);
          animation: fadeInUp 0.6s ease forwards;
        }
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};










