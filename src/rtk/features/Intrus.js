import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  actual : 0,
  selected : '',
  waited : ''
};

const IntrusSlice = createSlice({
  name: 'Intrus',
  initialState,
  reducers: {
    setActual: (state, data) => {
      state.actual = data.payload.actual || state.actual;
      state.waited = data.payload.waited || state.waited
    },
    setSelected : (state,data) => {
        state.selected = data.payload
    },
    clearPos : (state ) => {
        state.selected = ''
        state.waited = ''
    },
    clear : (state) => {
        state.actual = 0
        state.selected = ''
        state.waited = ''
    }
  },
});
const IntrusReducer = IntrusSlice.reducer;
export default IntrusReducer;
export const IntrusActions = IntrusSlice.actions;
