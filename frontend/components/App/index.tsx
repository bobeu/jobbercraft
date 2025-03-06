import React from "react";
import PublicFooter from "../common/PublicFooter";
import DashBoardFeatures from "@/components/Features";
import HomeHeader from "./HomeHeader";
import Testimonial from "@/components/Testimonial";
import PublicNavbar from "@/components/common/PublicNavbar";
import { Nodeselector } from "./NodeSelector";
import AppMain from "../Appdashboards/AppMain";
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
    <main className="p-0 bg-gray-100 min-h-screen">
      <Nodeselector 
        nodes={[home(), <AppMain />,<BecomeAJobber />]} 
        paths={["/", "/appmain","/becomeajobber"]} 
      />
      <PublicFooter />
    </main>
  );
}
