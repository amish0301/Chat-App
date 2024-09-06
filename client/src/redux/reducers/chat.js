import { createSlice } from "@reduxjs/toolkit";
import { getOrSaveFromStorage } from "../../lib/feature";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: getOrSaveFromStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatdId: "",
      messageCnt: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    setNewMessagesAlert: (state, action) => {
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatdId === action.payload.chatdId
      );

      // index = if chat id exist in socket then only increment the message count
      if (index !== -1) {
        state.newMessagesAlert[index].messageCnt += 1;
      } else {
        state.newMessagesAlert.push({
          chatId: action.payload.chatdId,
          messageCnt: 1,
        });
      }
    },
    removeNewMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatdId !== action.payload
      );
    },
  },
});

export default chatSlice;
export const {
  incrementNotificationCount,
  resetNotificationCount,
  removeNewMessagesAlert,
  setNewMessagesAlert,
} = chatSlice.actions;
