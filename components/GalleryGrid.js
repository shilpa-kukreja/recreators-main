// "use client";
// import Link from "next/link";

// export const GalleryGrid = () => {
//   return (
//     <div>
//          <section className="project-area rel z-1">
//         <div className="container   px-sm-0 py-130 rpy-100">
//           <div className="row justify-content-center">
//             <div className="col-xl-7 col-lg-9">
//               <div
//                 className="section-title text-center mb-50"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <span className="subtitle mb-15">Popular Works</span>
//                 <h2>Explore Our Latest Projects</h2>
//               </div>
//             </div>
//           </div>
//           <div className="row justify-content-center">
//             <div className="col-xl-8">
//               <div
//                 className="project-item"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <a
//                   href="assets/images/projects/project-image1.jpg"
//                   className="image"
//                 >
//                   <img
//                     src="assets/images/projects/project-image1.jpg"
//                     alt="Project"
//                   />
//                 </a>
//                 <div className="content">
//                   <span className="category">Marketing</span>
//                   <h4>
//                     <Link href="project-details">Website Development</Link>
//                   </h4>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div
//                 className="project-item"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <a
//                   href="assets/images/projects/project-image2.jpg"
//                   className="image"
//                 >
//                   <img
//                     src="assets/images/projects/project-image2.jpg"
//                     alt="Project"
//                   />
//                 </a>
//                 <div className="content">
//                   <span className="category">Marketing</span>
//                   <h6>
//                     <Link href="project-details">Website Development</Link>
//                   </h6>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div
//                 className="project-item"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <a
//                   href="assets/images/projects/project-image2.jpg"
//                   className="image"
//                 >
//                   <img
//                     src="assets/images/projects/project-image2.jpg"
//                     alt="Project"
//                   />
//                 </a>
//                 <div className="content">
//                   <span className="category">Marketing</span>
//                   <h6>
//                     <Link href="project-details">Website Development</Link>
//                   </h6>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-8">
//               <div
//                 className="project-item"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <a
//                   href="assets/images/projects/project-image4.jpg"
//                   className="image"
//                 >
//                   <img
//                     src="assets/images/projects/project-image4.jpg"
//                     alt="Project"
//                   />
//                 </a>
//                 <div className="content">
//                   <span className="category">Marketing</span>
//                   <h4>
//                     <Link href="project-details">Website Development</Link>
//                   </h4>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-8">
//               <div
//                 className="project-item"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <a
//                   href="assets/images/projects/project-image5.jpg"
//                   className="image"
//                 >
//                   <img
//                     src="assets/images/projects/project-image5.jpg"
//                     alt="Project"
//                   />
//                 </a>
//                 <div className="content">
//                   <span className="category">Marketing</span>
//                   <h4>
//                     <Link href="project-details">Website Development</Link>
//                   </h4>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-4 col-md-6">
//               <div
//                 className="project-item"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <a
//                   href="assets/images/projects/project-image6.jpg"
//                   className="image"
//                 >
//                   <img
//                     src="assets/images/projects/project-image6.jpg"
//                     alt="Project"
//                   />
//                 </a>
//                 <div className="content">
//                   <span className="category">Marketing</span>
//                   <h6>
//                     <Link href="project-details">Website Development</Link>
//                   </h6>
//                 </div>
//               </div>
//             </div>
//                <div className="col-xl-4 col-md-6">
//               <div
//                 className="project-item"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <a
//                   href="assets/images/projects/project-image2.jpg"
//                   className="image"
//                 >
//                   <img
//                     src="assets/images/projects/project-image2.jpg"
//                     alt="Project"
//                   />
//                 </a>
//                 <div className="content">
//                   <span className="category">Marketing</span>
//                   <h6>
//                     <Link href="project-details">Website Development</Link>
//                   </h6>
//                 </div>
//               </div>
//             </div>
//             <div className="col-xl-8">
//               <div
//                 className="project-item"
//                 data-aos="zoom-in"
//                 data-aos-duration={1500}
//                 data-aos-offset={50}
//               >
//                 <a
//                   href="assets/images/projects/project-image4.jpg"
//                   className="image"
//                 >
//                   <img
//                     src="assets/images/projects/project-image4.jpg"
//                     alt="Project"
//                   />
//                 </a>
//                 <div className="content">
//                   <span className="category">Marketing</span>
//                   <h4>
//                     <Link href="project-details">Website Development</Link>
//                   </h4>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-12 text-center">
//               <Link
//                 href="project-grid"
//                 className="theme-btn style-two mt-20"
//                 // data-hover="Explore Projects"
//               >
//                 <span>Explore More</span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
      
//     </div>
//   )
// }



"use client";
import { useState } from "react";
import Link from "next/link";

export const GalleryGrid = () => {
  const allProjects = [
    { id: 1, img: "assets/images/projects/project-image1.jpg", title: "Website Development", category: "Marketing", col: "col-xl-8" },
    { id: 2, img: "assets/images/projects/project-image2.jpg", title: "Website Development", category: "Marketing", col: "col-xl-4 col-md-6" },
    { id: 3, img: "assets/images/projects/project-image2.jpg", title: "Website Development", category: "Marketing", col: "col-xl-4 col-md-6" },
    { id: 4, img: "assets/images/projects/project-image4.jpg", title: "Website Development", category: "Marketing", col: "col-xl-8" },
    { id: 5, img: "assets/images/projects/project-image5.jpg", title: "Website Development", category: "Marketing", col: "col-xl-8" },
    { id: 6, img: "assets/images/projects/project-image6.jpg", title: "Website Development", category: "Marketing", col: "col-xl-4 col-md-6" },
    { id: 7, img: "assets/images/projects/project-image2.jpg", title: "Website Development", category: "Marketing", col: "col-xl-4 col-md-6" },
    { id: 8, img: "assets/images/projects/project-image4.jpg", title: "Website Development", category: "Marketing", col: "col-xl-8" },
    { id: 9, img: "assets/images/projects/project-image5.jpg", title: "Website Development", category: "Marketing", col: "col-xl-8" },
    { id: 10, img: "assets/images/projects/project-image6.jpg", title: "Website Development", category: "Marketing", col: "col-xl-4 col-md-6" },
  ];

  const [visibleCount, setVisibleCount] = useState(6);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <section className="project-area rel z-1">
      <div className="container   px-sm-0 py-130 rpy-100">
        <div className="row justify-content-center">
          <div className="col-xl-7 col-lg-9">
            <div
              className="section-title text-center mb-50"
              data-aos="zoom-in"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <span className="subtitle mb-15">Popular Works</span>
              <h2>Explore Our Latest Projects</h2>
            </div>
          </div>
        </div>

        <div className="row justify-content-center">
          {allProjects.slice(0, visibleCount).map((project) => (
            <div
              key={project.id}
              className={`${project.col}`}
              data-aos="zoom-in"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="project-item">
                <a href={project.img} className="image">
                  <img src={project.img} alt={project.title} />
                </a>
                <div className="content">
                  <span className="category">{project.category}</span>
                  {project.col.includes("xl-8") ? (
                    <h4>
                      <Link href="project-details">{project.title}</Link>
                    </h4>
                  ) : (
                    <h6>
                      <Link href="project-details">{project.title}</Link>
                    </h6>
                  )}
                </div>
              </div>
            </div>
          ))}

          {visibleCount < allProjects.length && (
            <div className="col-lg-12 text-center">
              <button
                onClick={handleLoadMore}
                className="theme-btn style-two mt-20"
              >
                <span>Explore More</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
