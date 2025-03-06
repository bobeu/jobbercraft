import { useSelector, useDispatch } from "react-redux";
import { toggleSideMenuAction } from "../configs/StoreSliceConfig";

function useSideMenu() {
  const dispatch = useDispatch();
  const isSideMenu = useSelector((state:any) => state.global.isSideMenu);

  function toggleSideMenu(payload: any) {
    dispatch(
      toggleSideMenuAction(typeof payload === "boolean" ? payload : undefined)
    );
  }

  return { isSideMenu, toggleSideMenu };
}

export default useSideMenu;
