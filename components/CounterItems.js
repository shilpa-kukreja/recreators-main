import Counter from "./Counter";
const CounterItems = () => {
  return (
    <div
      className="counter-wrap br-10 m-0"
      data-aos="fade-left"
      data-aos-duration={1500}
      data-aos-offset={50}
      style={{
        backgroundImage:
          "url(assets/images/background/counter-bg-with-dots.png)",
      }}
    >
      <div className="row">
        {[
          { end: 500, title: "Creative Projects Delivered" , text: "Packaging Designs Delivered Every pack engineered to sell before a word is read." },
          { end: 350, title: "Happy Clients" , text: "Happy Clients Brands that trust us as their one-stop design & growth partner."},
          { end: 5, title: "Years of Excellence", text: "Years of Excellence Since 2020, blending creativity, packaging expertise, and strategy to fuel business growth." },
        ].map(({ end, title , text}, i) => (
          <div key={i} className="col-md-4 col-sm-6">
            <div className="counter-item counter-text-wrap">
              <span
                className="count-text plus"
                data-speed={3000}
                data-stop={end}
              >
                <Counter end={end} />
              </span>
              <span className="counter-title">{title}</span>
              <div className="text !text-justify">{text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CounterItems;
