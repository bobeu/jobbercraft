import React from "react";
import Suspense from "../../common/Suspense";
import AppHeader from "../AppHeader";
import DashBoard from "../Dashboard";

function AppMain() {
  return (
    <React.Fragment>
      <Suspense fallback>
        <DashBoard />
      </Suspense>
    </React.Fragment>
  );
}

export default AppMain;