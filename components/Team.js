import Link from "next/link";

const Team = ({
  bg = "bgc-lighter",
  teamMembers = [
   
    {
      image: "assets/images/team/team-two3.png",
      name: "Shilpa Kukreja",
      designation: "Co-Founder & Creative Director",
      description: "Shilpa leads every visual decision at Recreators- branding, packaging, and communication design built to do more than just look good. Her work is engineered to make people stop, notice, and remember.",
    },
    {
      image: "assets/images/team/team-two4.png",
      name: "Gaurav Kukreja",
      designation: "Co-Founder & Digital Marketing Expert",
      description: "Gaurav turns creative work into measurable growth- SEO, social, and performance marketing built on data, not guesswork. If it doesn't move the numbers, it doesn't ship.", 
    },
  ],
}) => {
  return (
    <section className={`team-area-two ${bg}`}>
      <div className="container   sm:pt-130 !pt-10 rpt-100 sm:pb-100 !pb-5 rpb-70 px-sm-0">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div
              className="section-title text-center mb-50"
              data-aos="zoom-in"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <span className="subtitle mt-10 mb-15">MEET OUR STUDIO</span>
              <h2>The Makers </h2>
              <p>Two Founders. One Obsession With Getting It Right.</p>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          {teamMembers.map((member) => (
            <div
            className="col-xl-3 col-lg-3 col-sm-3"
              key={member.name}
              data-aos="flip-left"
              data-aos-duration={1500}
              data-aos-offset={50}
            >
              <div className="team-item style-two">
                <div className="image">
                  <img src={member.image} alt={member.name} />
                  <div className="social-style-one">
                    <a href="#">
                      <i className="fab fa-facebook-f" />
                    </a>
                    <a href="#">
                      <i className="fab fa-youtube" />
                    </a>
                    <a href="#">
                      <i className="fab fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fab fa-linkedin-in" />
                    </a>
                  </div>
                </div>
                <div className="content">
                  <h5>
                    <Link href="team-details">{member.name}</Link>
                  </h5>
                  <span className="designation text-black font-bold">{member.designation}</span>
                  <p className="text text-gray-700 text-justify">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Team;
