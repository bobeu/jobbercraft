import React from "react";
import PublicFooter from "../common/PublicFooter";
import DashBoardFeatures from "@/components/Features";
import HomeHeader from "./HomeHeader";
import Testimonial from "@/components/Testimonial";
import PublicNavbar from "@/components/common/PublicNavbar";
import AppMain from "../Appdashboards/AppMain";
import { Routes, Route } from "react-router-dom";
import BecomeAJobber from "../Appdashboards/Dashboard/JobSection/JobTabs/BecomeAJobber";

const home = () => {
  return (
    <React.Fragment>
      <PublicNavbar whiteNavbar />
      <HomeHeader />
      <DashBoardFeatures />
      <Testimonial />
    </React.Fragment>
  );
};

export default function App() {
  return (
    <div className="bg-[url('/map-background.svg')] bg-no-repeat bg-cover bg-right-top w-full bg-gray1">
      <main className="">
        <div className="">
          <Routes >
            <Route path={"/"} element={home()} />
            <Route path={"/appmain"} element={<AppMain />} />
            <Route path={"/becomeajobber"} element={<BecomeAJobber />} />
          </Routes>
        </div>
        <PublicFooter />
      </main>
    </div>
  );
}
