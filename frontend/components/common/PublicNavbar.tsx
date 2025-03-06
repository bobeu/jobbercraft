import React, { useState, useLayoutEffect } from "react";
import { Button, Icon, IconButton } from "@mui/material";
import Link from "next/link";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import clsx from "clsx";
// import { RouteEnum } from "../constants";
import { JobberCraftLogo } from "../assets";
// import { useRouter } from "next/router";

interface PublicNavbarProp {
  whiteNavbar: boolean;
}

function PublicNavbar(props: PublicNavbarProp) {
  const [isFixedHeader, setIsFixedHeader] = React.useState<boolean>(false);
  const [isMenuLink, setIsMenuLink] = useState<boolean>(true);
  const { whiteNavbar } = props;
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"));
  const toggleMenuLink = () => setIsMenuLink(!isMenuLink);

  const handleClick = (tagId: string) => {
    // console.log("TagID", tagId);
    document.getElementById(`${tagId}`)?.scrollIntoView({behavior: 'smooth', inline: 'start', block: 'start'})
    // location.href = tagId;
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
    <div className={clsx("fixed top-0 left-0 w-full z-50 p-4", isFixedHeader ? "bg-white shadow" : "")}>
      <nav className={clsx("border-gray-200 py-5", isFixedHeader ? (whiteNavbar ? "bg-primary-main" : "bg-white") : " bg-transparent")}>
        <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link href={"/"} className="flex items-center">
            <JobberCraftLogo />
          </Link>
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

// const LINKS = [
//   { name: "Features", to: RouteEnum.FEATURES, tagId: "features" },
//   { name: "Testimonial", to: RouteEnum.TESTIMONIAL, tagId: "testimonial" }
//   // { name: "B", to: RouteEnum.DASHBOARD, tagId: '#' }
// ];

export default PublicNavbar;

                {/* <Link key={name} className={`block py-2 pr-4 pl-3`} {...link} onClick={toggleMenuLink} href={to}> */}


// import AppBar from '@mui/material/AppBar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Typography from '@mui/material/Typography';
// import Zoom from '@mui/material/Zoom';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import UpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { green } from '@mui/material/colors';
// import Box from '@mui/material/Box';
// import { SxProps } from '@mui/system';

// const fabStyle = {
//   position: 'absolute',
//   bottom: 16,
//   right: 16,
// };

// const fabGreenStyle = {
//   color: 'common.white',
//   bgcolor: green[500],
//   '&:hover': {
//     bgcolor: green[600],
//   },
// };

// function FloatingActionZoom({index} : {index: number}) {
//   const theme = useTheme();
//   const [value, setValue] = React.useState(0);

//   const handleChange = (event: unknown, newValue: number) => {
//     setValue(newValue);
//   };

//   const handleChangeIndex = (index: number) => {
//     setValue(index);
//   };

//   const transitionDuration = {
//     enter: theme.transitions.duration.enteringScreen,
//     exit: theme.transitions.duration.leavingScreen,
//   };

//   return (
//     <Box
//       sx={{
//         bgcolor: 'background.paper',
//         width: 500,
//         position: 'relative',
//         minHeight: 200,
//       }}
//     >
//       <Zoom
//         in={value === index}
//         timeout={transitionDuration}
//         style={{
//           transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
//         }}
//         unmountOnExit
//       >
//         <Fab sx={{ ...fabStyle, ...fabGreenStyle }} aria-label='Expand' color='inherit'>
//           <UpIcon />
//         </Fab>
//       </Zoom>
//     </Box>
//   );
//                 }