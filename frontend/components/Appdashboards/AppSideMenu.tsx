import { useState } from "react";
import { Drawer, useMediaQuery, List, Icon, Typography, Button, IconButton, MenuProps,} from "@mui/material";
import { APP_SIDE_MENU_WIDTH, MediaQueryBreakpointEnum,} from "../constants";
import { Link,} from "react-router-dom";
import { JobberCraftLogo } from "../assets";
import { RouteEnum } from "../constants";
import { AppSideMenuSubmenu } from "./AppSideMenuSubmenu";

function AppSideMenu() {
  const [ isSideMenu, setSideMenu ] = useState<boolean>(false);
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const defaultSelectedKey = '1';
  const toggleSideMenu = (x:boolean) => setSideMenu(x);

  return (
    <Drawer
      open={isSideMenu}
      elevation={0}
      variant={islg ? "permanent" : "temporary"}
      PaperProps={{
        style: {
          width: APP_SIDE_MENU_WIDTH,
          padding: "10px 20px",
          // minHeight: "100vh",
          borderRight: "1.5px dashed rgba(145, 158, 171, 0.24)",
        },
      }}
      onClose={() => setSideMenu(false)}
    >
      <div className="h-full flex flex-col">
        <div className="py-5 pl-4 flex justify-between items-center">
          <Link to={RouteEnum.HOME}>
            <JobberCraftLogo />
          </Link>
          <IconButton
            onClick={() => {
              toggleSideMenu(false);
            }}
          >
            {
              islg? <Icon fontSize="small">menu_open</Icon> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-cyan-700">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            }
          </IconButton>
        </div>

        <div className="flex flex-col justify-between h-full">
          <AppSideMenuSubmenu 
            defaultSelectedKey={defaultSelectedKey} 
            // items={items} 
          />
          <div className="flex justify-center bg-white py-6 flex-col items-center w-full">
            <div className="text-center max-w-[200px]">
              <Typography
                variant="subtitle1"
                noWrap
                className="font-bold capitalize"
              >
                Hi, User
                {/* {authUser.fullName} */}
              </Typography>
              <Typography variant="body2" className="mt-2">
                Need help,<br></br> Please check our docs
              </Typography>
            </div>
            <div className="flex justify-center">
              <Button size="medium" className="font-bold mt-6">
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default AppSideMenu;

const LINKS = [
  {
    name: "Dashboard",
    path: RouteEnum.DASHBOARD,
    icon: "clarity:dashboard-line",
    iconify: true,
    end: true,
    submenu: false,
    children: ''
  },
  {
    name: "Main",
    icon: "group",
    submenu: false,
    children: ''
  },
];
