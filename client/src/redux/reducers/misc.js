import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotification: false,
  isMobile: false,
  isSearch: false,
  isFileMenu: false,
  isProfileOpen: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  showEmojiPicker: false,
  selectedDeleteChat: {
    groupChat: false,
    chatId: ""
  },
  onlineUsers: []
};

const utilitySlice = createSlice({
  name: "utility",
  initialState,
  reducers: {
    setIsNewGroup: (state, action) => {
      state.isNewGroup = action.payload;
    },
    setIsAddMember: (state, action) => {
      state.isAddMember = action.payload;
    },
    setIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
    setIsSearch: (state, action) => {
      state.isSearch = action.payload;
    },
    setIsFileMenu: (state, action) => {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu: (state, action) => {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader: (state, action) => {
      state.uploadingLoader = action.payload;
    },
    setShowEmojiPicker: (state, action) => {
      state.showEmojiPicker = action.payload;
    },
    setSelectedDeleteChat: (state, action) => {
      state.selectedDeleteChat = action.payload;
    },
    setOnlineUsers: (state,action) => {
      state.onlineUsers = action.payload
    },
    setIsProfileOpen: (state, action) => {
      state.isProfileOpen = action.payload
    }
  },
});

export default utilitySlice;
export const {
  setIsNewGroup,
  setIsAddMember,
  setIsNotification,
  setIsMobile,
  setIsSearch,
  setIsFileMenu,
  setIsDeleteMenu,
  setUploadingLoader,
  setShowEmojiPicker,
  setSelectedDeleteChat,
  setOnlineUsers,
  setIsProfileOpen
} = utilitySlice.actions;
