import { createSlice } from "@reduxjs/toolkit";
import { logoutAction } from "./StoreActionConfig";
export const globalInitialState = {
  isSideMenu: false,
  isDocumentPreviewSideMenu: false,
  isSideMenuTemporary: false,
  isLoadingModal: false,
  authUser: false,
};

const slice = createSlice({
  name: "global",
  initialState: globalInitialState,
  reducers: {
    toggleSideMenuAction: (state, { payload }) => {
      state.isSideMenu = payload !== undefined ? !!payload : !state.isSideMenu;
    },
    toggleDocumentPreviewSideMenuAction: (state, { payload }) => {
      state.isDocumentPreviewSideMenu =
        payload !== undefined ? !!payload : !state.isDocumentPreviewSideMenu;
    },
    toggleSideMenuTemporaryAction: (state, { payload }) => {
      state.isSideMenuTemporary =
        payload !== undefined ? !!payload : !state.isSideMenuTemporary;
    },
    toggleLoadingModalAction: (state, { payload }) => {
      state.isLoadingModal =
        payload !== undefined ? !!payload : !state.isLoadingModal;
    },
    setAuthUser: (state, { payload }) => {
      state.authUser = payload !== undefined ? payload : {};
    },
  },
  extraReducers: (builder) =>
    builder.addCase(logoutAction, () => ({ ...globalInitialState })),
});

export const {
  toggleSideMenuAction,
  toggleLoadingModalAction,
  toggleSideMenuTemporaryAction,
  toggleDocumentPreviewSideMenuAction,
  setAuthUser,
} = slice.actions;

export default slice;

export function getGlobalSliceStorageState({ authUser } : {authUser: any}) {
  return { authUser };
}
