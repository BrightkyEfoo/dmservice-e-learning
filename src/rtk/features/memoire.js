import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  founded: [],
  first: '',
  second: '',
};

const memoireSlice = createSlice({
  name: 'memoire',
  initialState,
  reducers: {
    setFirst: (state, data) => {
      state.first = data.payload;
    },
    clearFirst: state => {
      state.first = '';
    },
    setSecond: (state, data) => {
      state.second = data.payload;
    },
    clearSecond: state => {
      state.second = '';
    },
    clearPos: state => {
      state.first = '';
      state.second = '';
    },
    addFounded: (state, data) => {
      let obj = [...state.founded]
      obj.push(data.payload)
      state.founded = [...obj]
    },
    clearAll: state => {
      state.first = '';
      state.second = '';
      state.founded = [];
    },
  },
});
const memoireReducer = memoireSlice.reducer;
export default memoireReducer;
export const memoireActions = memoireSlice.actions;
