import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  x: null,
  y: null,
  mouseDown: false,
};

const MousePosSlice = createSlice({
  name: 'MousePos',
  initialState,
  reducers: {
    set: (state, data) => {
      state.x = data.payload.x;
      state.y = data.payload.y;
    },
    setMouseDown: (state, data) => {
      state.mouseDown = data.payload;
    },
  },
});
const MousePosReducer = MousePosSlice.reducer;
export default MousePosReducer;
export const MousePosActions = MousePosSlice.actions;
