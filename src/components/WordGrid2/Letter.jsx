import Konva from 'konva';
import React, { useContext, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { useDispatch, useSelector } from 'react-redux';
import { WordGridActions } from '../../rtk/features/WordGrid';
import { GridContext } from './WordGrid';
import Line from './Line';
import { MousePosActions } from '../../rtk/features/MousePos';
// import { MousePosActions } from '../../rtk/features/MousePos';
// import { render } from 'react-dom';

const Letter = ({ i, j, letter }) => {
  // ici i et j sont les positions de cette box dans le repere
  // X , Y sont les positions en pixels de la grille
  const { Lines, setLines, LayerRef, render, setRender } = useContext(GridContext);
  const mousePos = useSelector(state => state.mousePos);
  const grid = useSelector(state => state.wordGrid.grid);
  const actualHovered = useSelector(state => state.wordGrid.actualHovered);
  const dispatch = useDispatch();
  const x = (i + 1) * grid.lettersSpace + i * grid.lettersWidth;
  const y = (j + 1) * grid.lettersSpace + j * grid.lettersWidth;

  const handleClick = e => {
    // setRender(render+1)
    // console.log(render)
    // console.log('i', i);
    // console.log('j', j);
    // const line = new Konva.Rect({
    //   x: 20,
    //   y: 20,
    //   width: 100,
    //   height: 50,
    //   fill: 'green',
    //   stroke: 'black',
    //   strokeWidth: 4,
    // });
  };
  const handleMouseDown = e => {
    dispatch(WordGridActions.setHovered({ start: { i, j } }));
    dispatch(MousePosActions.setMouseDown(true));
    // console.log('i', i);
    // console.log('j', j);
    console.log('down');
    // dispatch()
    let a = false;
    setLines(prev => {
      const k = prev[i][j].length;
      if (!a) {
        prev[i][j].push(
          <Line
            i={i}
            j={j}
            k={k}
            key={`${i}-${j}-${k}`}
            cornerRadius={50}
            x={x}
            y={y}
            width={grid.lettersWidth}
            height={grid.lettersWidth}
            fill={'#194fe441'}
          />
        );
        a = true;
      }
      return prev;
    });
    a = false;
    setRender(prev => prev + 1);
    // console.log('render', render);
  };
  const handleMouseEnter = e => {
    console.log('i', i);
    console.log('j', j);
    if (!mousePos.mouseDown) {
      dispatch(WordGridActions.setHovered({ start: { i, j }, end: { i: null, j: null } }));
    } else {
      dispatch(WordGridActions.setHovered({ end: { i, j } }));
    }
    // console.log('actualHovered', actualHovered);
  };
  const handleMouseUp = e => {
    dispatch(MousePosActions.setMouseDown(false));
    dispatch(WordGridActions.setHovered({ end: { i, j } }));
    // console.log('actualHovered', actualHovered);
  };
  return (
    <Group
      onClick={handleClick}
      onMouseOver={handleMouseEnter}
      onMouseEnter={handleMouseEnter}
      onMouseUp={handleMouseUp}
      onMouseDown={handleMouseDown}
      /*zIndex={selected.isSelected ? 500 : 2}*/
    >
      <Text
        // onMouseDown={e => {
        //   e.stopPropagation();
        //   e.stopImmediatePropagation();
        // }}
        text={letter}
        x={x + grid.lettersSpace / 2}
        y={y + grid.lettersSpace / 2}
        fontSize={20}
      />
      <Rect
        x={x}
        y={y}
        width={grid.lettersWidth}
        height={grid.lettersWidth}
        // stroke={'black'}
        // strokeWidth={1}
      />
    </Group>
  );
};

export default Letter;
