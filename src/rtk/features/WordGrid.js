import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  grid: {
    x: null,
    y: null,
    letters: [['']],
    n: null,
    m: null,
    lettersSpace: null,
    lettersWidth: null,
    width: null,
    height: null,
  },
  actualHovered: {
    start: {
      i: null,
      j: null,
    },
    end: {
      i: null,
      j: null,
    },
  },
  founded: [],
  timer: 0,
};

const WordGridSlice = createSlice({
  name: 'WordGrid',
  initialState,
  reducers: {
    setGrid: (state, data) => {
      state.grid.x = data.payload.x;
      state.grid.y = data.payload.y;
      state.grid.letters = data.payload.letters;
      state.grid.n = data.payload.letters.length;
      state.grid.m = data.payload.letters[0].length;
      state.grid.lettersSpace = data.payload.lettersSpace;
      state.grid.lettersWidth = data.payload.lettersWidth;
      state.grid.width = data.payload.width;
      state.grid.height = data.payload.height;
    },
    clearGrid: state => {
      state.grid = {
        x: null,
        y: null,
        letters: [['']],
        n: null,
        m: null,
        lettersSpace: null,
        lettersWidth: null,
        width: null,
        height: null,
      };
    },
    addFounded: (state, data) => {
      let temp = [...state.founded];
      temp.push(data.payload);
      state.founded = temp;
    },
    clearFounded: (state, data) => {
      state.founded = [];
    },
    setHovered: (state, data) => {
      state.actualHovered.start =
        data.payload.start || state.actualHovered.start;
      state.actualHovered.end = data.payload.end || state.actualHovered.end;
      if (
        state.actualHovered.start.i === state.actualHovered.end.i &&
        state.actualHovered.start.j === state.actualHovered.end.j
      ) {
        state.actualHovered.start = {
          i: null,
          j: null,
        };
        state.actualHovered.end = {
          i: null,
          j: null,
        };
      }
    },
    setTimer: (state, data) => {
      state.timer = data.payload;
    },
    decrementTimer: state => {
      state.timer = state.timer - 1;
    },
    clearHoveredPos: state => {
      state.actualHovered.start = {
        i: null,
        j: null,
      };
      state.actualHovered.end = {
        i: null,
        j: null,
      };
    },
    // setMousePos: (state, data) => {
    //   state.mousePos.x = data.payload.x || state.mousePos.x;
    //   state.mousePos.y = data.payload.y || state.mousePos.y;
    //   state.mousePos.mouseDown =
    //     data.payload.mouseDown || state.mousePos.mouseDown;
    //   //   state.mousePos.i = data.payload.i || state.mousePos.i;
    //   //   state.mousePos.j = data.payload.j || state.mousePos.j;
    //   //   state.mousePos.X = data.payload.X || state.mousePos.X;
    //   // state.mousePos.Y = data.payload.Y || state.mousePos.Y;
    // },
  },
});
const WordGridReducer = WordGridSlice.reducer;
export default WordGridReducer;
export const WordGridActions = WordGridSlice.actions;
