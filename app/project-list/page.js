"use client";
import { useEffect, useState } from "react";
import PageBanner from "@/components/PageBanner";
import RiddaLayout from "@/layout/RiddaLayout";
import Link from "next/link";

const ProjectListPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/portfolio/getportfolio`);
        const data = await res.json();

        // ✅ If API returns { success, data: [...] }
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (Array.isArray(data.data)) {
          setProjects(data.data);
        } else {
          setProjects([]);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <RiddaLayout>
      <PageBanner pageTitle="Project List" pageName="Project List" />
      <section className="project-list py-130 rpy-100">
        <div className="container container-1290">
          <div className="row justify-content-center">
            <div className="col-lg-12">
              <div
                className="section-title text-center mb-65"
                data-aos="zoom-in"
                data-aos-duration={1500}
                data-aos-offset={50}
              >
                <span className="subtitle mt-10 mb-15">Popular Works</span>
                <h2>Explore Our Latest Projects</h2>
              </div>
            </div>
          </div>

          {projects.length === 0 ? (
            <p className="text-center">No projects found.</p>
          ) : (
            projects.map((project) => (
              <div className="project-list-item" key={project._id}>
                <div className="content">
                  <div className="top">
                    <div className="project-tags">
                      {project.portfolioTags
                        ?.split(",")
                        .map((tag, index) => (
                          <a key={index} href="#">
                            {tag.trim()}
                          </a>
                        ))}
                    </div>
                    <h4>
                      <Link href={`/project-details/${project._id}`}>
                        {project.portfolioName}
                      </Link>
                    </h4>
                  </div>
                  <div className="bottom">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: project.portfolioDetail,
                      }}
                    />
                    <Link
                      href={project.portfolioLink || "#"}
                      className="theme-btn style-two"
                      target="_blank"
                    >
                      <span>Project Details</span>
                    </Link>
                  </div>
                </div>
                <div className="image">
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${project.portfolioImg}`}
                    alt={project.portfolioName}
                    className="w-[700px]  aspect-6/4 object-cover"
                  />
                </div>
              </div>
            ))
          )}

          <div className="text-center pt-20">
            <Link href="/project-grid" className="theme-btn hover-primary">
              <span>View More Projects</span>
            </Link>
          </div>
        </div>
      </section>
    </RiddaLayout>
  );
};

export default ProjectListPage;
