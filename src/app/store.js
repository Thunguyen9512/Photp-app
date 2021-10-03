/* STORE */

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/authentication/userSlice";
import counterReducer from "../features/counter/counterSlice";
import photoReducer from "../features/Photo/photoSlice";

/* config store */

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    photos: photoReducer,
    user: userReducer,
  },
});

/* set data to localStrorage */

store.subscribe(() => {
  const newPhotoList = store.getState().photos;
  localStorage.setItem("photo_list", JSON.stringify(newPhotoList));
});
