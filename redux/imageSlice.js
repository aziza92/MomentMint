import { createSlice } from '@reduxjs/toolkit';

const imageSlice = createSlice({
  name: 'images',
  initialState: [],
  reducers: {
    addImage: (state, action) => {
      const imageExists = state.some(image => image.id === action.payload.id);
      if (!imageExists) {
        state.push(action.payload);
      }
    },
    deleteImage: (state, action) => {
      return state.filter(image => image.id !== action.payload);
    },
  },
});

export const { addImage, deleteImage } = imageSlice.actions;
export default imageSlice.reducer;
