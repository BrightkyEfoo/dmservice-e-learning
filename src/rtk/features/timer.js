import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  active: false,
  value: 0,
};

const TimerSlice = createSlice({
  name: 'Timer',
  initialState,
  reducers: {
    set: (state, data) => {
      state.active = data.payload.active || state.active;
      state.value = data.payload.value || state.value;
    },
    reset: (state) => {
      state.active = false;
      state.value = 300;
    },
    decrement:(state)=>{
        state.value = state.value-1
    }
  },
});
const TimerReducer = TimerSlice.reducer;
export default TimerReducer;
export const TimerActions = TimerSlice.actions;
