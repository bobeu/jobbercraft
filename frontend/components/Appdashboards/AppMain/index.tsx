
import React from "react";
// import { useMediaQuery } from "@mui/material";
// import { APP_SIDE_MENU_WIDTH, MediaQueryBreakpointEnum } from "../../constants";
// import { Navigate, RouteObject } from "react-router-dom";
import Suspense from "../../common/Suspense";
import AppHeader from "../AppHeader";
// import AppSideMenu from "../AppSideMenu";
// import LoadingContent from "../../common/LoadingContent";
// import { RouteEnum } from "../../constants";
import DashBoard from "../Dashboard";

function AppMain() {
  // const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  // const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  return (
    <React.Fragment>
      <AppHeader />
      <Suspense fallback>
        <DashBoard />
      </Suspense>
    </React.Fragment>
  );
}

export default AppMain;