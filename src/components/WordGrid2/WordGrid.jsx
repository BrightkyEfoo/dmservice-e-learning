import React, { createContext, useEffect, useRef, useState } from 'react';
import { useRect } from '../../useRect';
import { Layer, Line, Rect, Stage } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { WordGridActions } from '../../rtk/features/WordGrid';
import styled from 'styled-components';
import Letter from './Letter';
// import Line from './Line';
import { treeToOne } from '../../utils/Array';
import { vectors } from '../../data/mock-words';

const GridContainer = styled.div`
  height: ${({ height }) => {
    return height + 'px';
  }};
  width: ${({ width }) => {
    return width + 'px';
  }};
  cursor: pointer;
  border: 2px solid black;
`;

export const GridContext = createContext();

const WordGrid = ({ lettersList, lettersWidth, lettersSpace }) => {
  // console.log('first')
  const dispatch = useDispatch();
  const n = lettersList.length;
  const m = lettersList[0].length;
  const width = (m + 1) * lettersSpace + m * lettersWidth;
  const height = (n + 1) * lettersSpace + n * lettersWidth;
  const [isStarted, setIsStarted] = useState(false);
  const [inter, setInter] = useState(0);
  const Mouse = useSelector(state => state.mousePos);
  const grid = useRef();
  const rects = useRect(grid);
  let I = 0;
  let J = 0;
  const t = Array(0);
  const [render, setRender] = useState(0);
  for (I = 0; I < n; I++) {
    t.push(Array(0));
    for (J = 0; J < m; J++) {
      t[I].push(Array(0));
    }
  }
  useEffect(() => {
    dispatch(WordGridActions.setTimer(300));
  }, []);
  const founded = useSelector(state => state.wordGrid.founded);
  const time = useSelector(state => state.wordGrid.timer);
  const [Lines, setLines] = useState(t);
  useEffect(() => {
    dispatch(
      WordGridActions.setGrid({
        x: rects.x,
        y: rects.y,
        letters: [...lettersList],
        n,
        m,
        lettersSpace,
        lettersWidth,
        width,
        height,
      })
    );
  }, [rects.x, rects.y]);

  const tab = lettersList.map((el, i) => {
    return el.map((letter, j) => {
      return <Letter key={`${i}-${j}`} letter={letter} i={j} j={i} />;
    });
  });
  const LayerRef = useRef();
  const a = treeToOne(Lines);
  const handleClick = e => {
    if (!isStarted) {
      setIsStarted(true);
      setInter(
        setInterval(() => {
          dispatch(WordGridActions.decrementTimer());
        }, 1000)
      );
    }
  };
  useEffect(() => {
    if (time < 1 || founded.length === vectors.length) {
      clearInterval(inter);
    }
  }, [founded, time]);
  return (
    <GridContext.Provider value={{ render, setRender, Lines, setLines, LayerRef }}>
      <GridContainer width={width} height={height} ref={grid} onClick={handleClick}>
        <Stage width={width} height={height}>
          <Layer ref={LayerRef}>
            {tab}
            {a}
          </Layer>
        </Stage>
      </GridContainer>
    </GridContext.Provider>
  );
};

export default WordGrid;
