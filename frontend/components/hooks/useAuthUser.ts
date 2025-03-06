import { useSelector } from "react-redux";

function useAuthUser() {
  return useSelector((state: {global: {authUser: any}}) => state.global.authUser);
}

export default useAuthUser;
