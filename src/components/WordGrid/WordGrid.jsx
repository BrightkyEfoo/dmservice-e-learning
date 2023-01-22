import React, { useEffect, useState } from 'react';
import list from '../../data/mock-words';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

import './style.css';
import { createContext } from 'react';
import LetterBox from './LetterBox';
export const WordGridContext = createContext();

const WordGrid = () => {
  const [selected, setSelected] = useState({
    x: 0,
    y: 0,
    isSelected: false,
  });
  const [actual, setActual] = useState([null,null])
  const [selectedVector, setSelectedVector] = useState({
    start : [null,null],
    end : [null,null]
  })
  const [foundedWords, setFoundedWords] = useState([
  ])
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const HandleMouseMove = e => {
    // console.log('e', e)
    setMousePos({
      x: e.clientX,
      y: e.clientY,
    });
  };

  const tab = [[]];
  let i = 0;
  let j = 0;
  for (i = 0; i < list.length; i++) {
    tab.push([]);
    for (j = 0; j < list[i].length; j++) {
      tab[i].push(<LetterBox key={i + '-' + j} x={40 + 60 * j} y={40 + 60 * i} i={i} j={j} text={list[i][j]} />);
    }
  }
  return (
    <WordGridContext.Provider value={{ foundedWords, setFoundedWords, mousePos, selected, setSelected , selectedVector, setSelectedVector , actual, setActual}}>
      <div className="WordGrid" onMouseMove={HandleMouseMove}>
        <Stage width={900} height={900} className="wordGrid">
          <Layer className="wordGrid">{tab}</Layer>
        </Stage>
      </div>
    </WordGridContext.Provider>
  );
};

export default WordGrid;
