import React from "react";
import { Typography } from "@mui/material";
import Person1 from "@/components/assets/img/person1.png";
import Image from "next/image";

export default function Testimonial() {
  const [ slideIndex, setIndex] = React.useState<number>(0);

  React.useEffect(() => {
    const length = testimonials.length;
    setTimeout(
      () => setIndex(
        (prev) => {
          return prev === (length - 1)? 0 : prev + 1;
        }
      ), 
      7000
    );
  });
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 max-w-7xl w-full">
                {/* <Slider {...settings} > */}
                  {testimonials.filter((item, i) => i === slideIndex).map((testimonial, i) => (
                    <div key={i} className="p-6 text-center flex justify-between items-center gap-2">
                      <button className="text-white/40 text-lg font-bold p-2 text-center">{'<'}</button>
                      <div className={`bg-gray1 p-4 rounded-3xl`}>
                        <h3 className="font-bold text-red-400 text-center">
                          {testimonial.company}
                        </h3>
                        <h3 className={`mt-4 text-center text-lg font-bold text-white h-[150px]`}>
                          {testimonial.testimonial}
                        </h3>

                        <div className="mt-4 flex justify-center flex-col items-center text-cyan-200">
                          <Image
                            alt={testimonial.fullname}
                            src={testimonial.pics}
                          />
                          <h5 className="font-bold ">
                            - {testimonial.fullname}
                          </h5>
                          <h5 className="text-xs text-cyan-500">
                      
                            {testimonial.role}
                          </h5>
                        </div>
                      </div>
                      <button className="text-white/40 text-lg font-bold p-2 text-center">{'>'}</button>
                    </div>
                  ))}
                {/* </Slider> */}
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
      "Building something that people love using has never been easy. But that joy seeing people derive value in what you build is very expensive",
    pics: Person1,
    fullname: "Isaac J.",
    role: "Developer, JobberCraft",
  },
  {
    company: "JobberCraft",
    testimonial:
      "With JobberCraft, I am confident in th system. I get best hands to work on my project. The whole processes is full of fun",
    pics: Person1,
    fullname: "Bamishe Aderonke",
    role: "Media Analyst",
  },
  {
    company: "JobberCraft",
    testimonial:
      "As a curator, I gain more experience coordinating projects. Even so, I earn something reasonable and commensurate to my efforts. Thank you JobberCraft.",
    pics: Person1,
    fullname: "Gideon MLali.",
    role: "Product Designer, JobberCraft",
  },
  {
    company: "JobberCraft",
    testimonial:
      "JobberCraft helped me overcome over 2 years challenges trying to complete a project. In two weeks, I get couple of developers collaborate and finished up. That was impressive",
    pics: Person1,
    fullname: "Larry Ted.",
    role: "Tech lead, QES Ltd",
  },
];