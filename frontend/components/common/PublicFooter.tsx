import React from "react";
import Link  from "next/link";
import { Divider, Typography } from "@mui/material";
import { Icon as Iconify } from "@iconify/react";
import { JobberCraftTempLogo } from "./PublicNavbar";

export default function PublicFooter() {
  return (
    <div>
      <footer>
        <div className=" w-full relative flex justify-center items-center my-0">
          <div className="bg-green1 w-full h-full justify-center p-4">
            <div className="container flex flex-wrap items-center mx-auto">
              <div className="w-full flex flex-col md:flex-row justify-between gap-4 py-11">
                <div>
                  <Link href="/" className="flex items-center">
                    <JobberCraftTempLogo />
                  </Link>
                  {/* <Typography variant="body1" className="text-gray-300  my-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. At
                    sed ac nulla amet.
                  </Typography> */}
                </div>

                <div className="text-white">
                  <Typography variant="h6" color="white" className="font-bold">
                    Our Products
                  </Typography>
                  <ul className="text-gray-300 mt-2">
                    {footerLinks.products.map((link, i) => (
                      <li key={i} className="mb-2">
                        <Link href={link.to}>{link.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <Typography variant="h6" color="white" className="font-bold">
                    About Us
                  </Typography>
                  <ul className="text-gray-300 mt-2">
                    {footerLinks.contactus.map((link, i) => (
                      <li key={i} className="mb-2">
                        <Link href={link.to}>{link.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="w-full flex flex-row">
                <div>
                  <ul className="flex gap-4 flex-wrap justify-center">
                    {socialLinks.map((link, i) => (
                      <li key={i}>
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Iconify
                            color="#919EAB"
                            fontSize={30}
                            icon={link.icon}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <Divider className="my-4" />
              </div>
              <Typography color="white" className="my-8">
                Powered by <strong>JobberCraft</strong>. All right reserved
              </Typography>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const footerLinks = {
  products: [
    { title: "Borrows", to: "/" },
    { title: "Advance", to: "/" },
  ],
  contactus: [
    { title: "Contact Us", to: "/" },
    { title: "FAQs", to: "/" },
  ],
};

const socialLinks = [
  { icon: "fontisto:facebook", to: "" },
  { icon: "a-brands:instagram-square", to: "" },
  { icon: "eva:linkedin-fill", to: "" },
  { icon: "akar-icons:twitter-fill", to: "" },
  { icon: "flat-color-icons:google", to: "" },
  { icon: "akar-icons:youtube-fill", to: "" },
];
