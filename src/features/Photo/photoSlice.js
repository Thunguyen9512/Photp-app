/* PHOTOSLICE */
/* instead of setup action & reducer, in redux toolkit we set up slice */
import { createSlice } from "@reduxjs/toolkit";

//const initialState = JSON.parse(localStorage.getItem("photo_list")) || []

const initialState = {};

export const photoSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    // addPhoto: (state, action) => {
    //   state.push(action.payload);
    // },
    addToEdit: (state, action) => {
      const newState = action.payload
      return newState;
    },
    clearEdit: (state) => {
      const newState = {}
      return newState;
    }


    // removePhoto: (state, action) => {
    //   state.forEach((item, index) => {
    //     if (item.Id === action.payload.Id) {
    //       state[index].active = false;
    //     }
    //   });
    // },

    // editPhotoResetState: (state) => {
    //   state.forEach((item) => {
    //     item.onEditting = false;
    //   });
    // },
    // updatePhoto: (state, action) => {
    //   state.forEach((item, index) => {
    //     if (item.Id === action.payload.Id) {
    //       state[index] = action.payload;
    //       return;
    //     }
    //   });
    // },

    // editPhoto: (state, action) => {
    //   state.forEach((item, index) => {
    //     if (item.Id === action.payload.Id) {
    //       state[index].onEditting = true;
    //     }
    //   });
    // },

    // reloadPhoto: (state) => {
    //   const newState = state.filter((item) => item.active);
    //   return newState;
    // },
  },
});

export const {
  addPhoto,
  removePhoto,
  editPhoto,
  updatePhoto,
  editPhotoResetState,
  reloadPhoto,
  addToEdit,
  clearEdit
} = photoSlice.actions;
const photoReducer = photoSlice.reducer;
export default photoReducer;
