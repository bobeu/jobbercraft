import { AppBar, Icon, IconButton, Toolbar, useMediaQuery, Typography, Avatar, Container, Popover, ListItemButton, InputAdornment } from "@mui/material";
import { APP_SIDE_MENU_WIDTH, MediaQueryBreakpointEnum } from "../constants";
import useSideMenu from "../hooks/useSideMenu";
import SearchTextField from "../common/SearchTextField";
import { useLayoutEffect, useState } from "react";
import { IconNotification } from "../assets";
import MuiDayLightSwitch from "../common/MuiDayLightSwitch";

function AppHeader() {
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const [elevateHeader, setElevateHeader] = useState(false);
  const { toggleSideMenu } = useSideMenu();

  useLayoutEffect(() => {
    function handleScroll(e: any) {
      setElevateHeader(window.scrollY >= 20);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <AppBar
      color="transparent"
      sx={{background: elevateHeader? 'white' : 'transparent',}}
      className={elevateHeader? "bg-white" : "bg-gray-100"}
      elevation={elevateHeader ? 1 : 0}
      style={{
        left: islg ? APP_SIDE_MENU_WIDTH : 0,
        width: islg ? `calc(100% - ${APP_SIDE_MENU_WIDTH}px)` : "100%",
      }}
    >
      <Container maxWidth="xl" className="text-text-secondary">
      <Toolbar disableGutters>
          {!islg && (
            <IconButton color="inherit" onClick={toggleSideMenu}>
              <Icon>menu</Icon>
            </IconButton>
          )}
          <div className="flex-1" />
          <IconNotification width="50" height="50"/>
          {islg && (
            <SearchTextField
              variant="outlined"
              size="small"
              className="w-1/3 p-2"
              // position="start"
              placeholder="Search"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Icon>search</Icon>
                  </InputAdornment>
                ),
                startAdornment: <InputAdornment position="end"></InputAdornment>,
              }}
            />
          )}

          <div className="flex items-center">
            <MuiDayLightSwitch/>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AppHeader;


// const data = new Array(10000).fill().map((value, index) => ({ id: index, title: faker.lorem.words(5), body: faker.lorem.sentences(4) }))

// function App() {
//   return (
//     <div>
//       {data.map(((item) => (
//         <div key={item.id} className="post">
//           <h3>{item.title} - {item.id}</h3>
//           <p>{item.body}</p>
//         </div>
//       )))}
//     </div>
//   );
// }