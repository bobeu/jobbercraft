import React, { useState, useLayoutEffect } from "react";
import { Button, Icon, IconButton } from "@mui/material";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";

interface PublicNavbarProp {
  whiteNavbar: boolean;
}

export const JobberCraftTempLogo = () => {
  return(
    <Link href={"/"} className="flex items-center">
      <h1 className="relative text-cyan-600 text-4xl font-black">
        J
        <span className="absolute text-cyan-200 text-2xl">Craft</span>
      </h1>
    </Link>
  )
}

function PublicNavbar(props: PublicNavbarProp) {
  const [isFixedHeader, setIsFixedHeader] = React.useState<boolean>(false);
  const [isMenuLink, setIsMenuLink] = useState<boolean>(true);
  const { whiteNavbar } = props;
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const toggleMenuLink = () => setIsMenuLink(!isMenuLink);

  const handleClick = (tagId: string) => {
    document.getElementById(`${tagId}`)?.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'start'})
  };

  useLayoutEffect(() => {
    function handleScroll(e: any) {
      setIsFixedHeader(window.scrollY >= 50);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={clsx("fixed top-0 left-0 w-full z-50 p-4", isFixedHeader ? "bg-gray1 shadow" : "")}>
      <nav className={clsx("border-gray-200 py-5", isFixedHeader ? (whiteNavbar ? "bg-primary-main" : "bg-white") : " bg-transparent")}>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <JobberCraftTempLogo />
          <div className="flex items-center  md:hidden ">
            <div data-collapse-toggle="mobile-menu" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden dark:text-gray-400 " aria-controls="mobile-menu" aria-expanded="false" onClick={toggleMenuLink}>
              <span className="sr-only">Open main menu</span>

              {isMenuLink && (
                <IconButton edge="start" className="text-black" aria-label="menu">
                  <Icon>menu</Icon>
                </IconButton>
              )}
              {!isMenuLink && (
                <IconButton edge="start" className="text-black" aria-label="close">
                  <Icon>close</Icon>
                </IconButton>
              )}
            </div>
          </div>

          <ul className={`flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 text-sm font-bold ${isMd ? "block" : "hidden"} `}>
            {NAVLINKS.map((name) => (
              <li key={name}>
                <h5 className={`block py-2 pr-4 pl-3  cursor-pointer ${whiteNavbar? "text-cyan-300" : "text-cyan-700"} rounded md:bg-transparent  md:p-0`} onClick={() => handleClick(name.toLowerCase())}>
                  {name}
                </h5>
              </li>
            ))}
          </ul>
        </div>

        {!isMenuLink && !isMd && <PublicNavbarResponsive  />}
      </nav>
    </div>
  );
}

function PublicNavbarResponsive() {
  const handleScroll = (tagId: string) => {
    location.href = tagId;
  };

  return (
    <div className={`w-ful md:w-auto py-5 bg-white`} id="mobile-menu">
      <div>
        <ul className={`flex flex-col items-center mt-4 md:flex-row md:space-x-8 md:mt-0 text-sm font-bold `}>
          {NAVLINKS.map((name) => (
            <li key={name}>
              <Button variant="contained" onClick={() => handleScroll(name.toLowerCase())}>
                {name}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const NAVLINKS = ['Features', 'Testimonial'];

export default PublicNavbar;

