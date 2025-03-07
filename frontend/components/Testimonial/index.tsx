import React from "react";
import Slider from "react-slick";
import { Typography } from "@mui/material";
import Person1 from "@/components/assets/img/person1.png";

export default function Testimonial() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 3000,
  };
  return (
    <div id="testimonial" className="bg-green1 w-full relative flex justify-center items-center">
      <div className="container">
        <div className="bg-[url('/map-background.svg')] bg-no-repeat bg-cover bg-left-bottom w-full h-full">
          <div className="py-24">
            <div className="text-center text-cyan-300">
              <Typography
                color="primary"
                variant="subtitle1"
                className="font-bold"
              >
                Testimonial
              </Typography>
              <Typography variant="h2" className="mt-2 font-bold">
                Our clients <span className="text-red-500">love us?</span>
              </Typography>
            </div>

            <div className="px-3 mt-16 flex justify-center">
              <div className="max-w-md w-full">
                <Slider {...settings} >
                  {testimonials.map((testimonial, i) => (
                    <div key={i}>
                      <Typography
                        variant="h3"
                        className="font-bold text-white text-center"
                      >
                        {testimonial.company}
                      </Typography>
                      <Typography
                        variant="h6"
                        className="mt-8 text-center font-bold text-white"
                      >
                        {testimonial.testimonial}
                      </Typography>

                      <div className="mt-8 flex justify-center flex-col items-center text-cyan-200">
                        {/* <Avatar
                          alt={testimonial.fullname}
                          src={testimonial.pics}
                        /> */}
                        <Typography variant="h5" className="font-bold ">
                          - {testimonial.fullname}
                        </Typography>
                        <Typography variant="caption">
                          {testimonial.role}
                        </Typography>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    company: "JobberCraft",
    testimonial:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
    pics: Person1,
    fullname: "Isaac J.",
    role: "Developer, JobberCraft",
  },
  {
    company: "JobberCraft",
    testimonial:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
    pics: Person1,
    fullname: "Bamishe Aderonke",
    role: "Media Analyst",
  },
  {
    company: "JobberCraft",
    testimonial:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
    pics: Person1,
    fullname: "Gideon MLali.",
    role: "Product Designer, JobberCraft",
  },
  {
    company: "JobberCraft",
    testimonial:
      "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et",
    pics: Person1,
    fullname: "Larry Ted.",
    role: "Tech lead, QES Ltd",
  },
];