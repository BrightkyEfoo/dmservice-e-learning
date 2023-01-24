import React, { useEffect, useState } from 'react';
import list, { vectors } from '../../data/mock-words';
import { Stage, Layer, Rect, Text, Circle, Line } from 'react-konva';

import './style.css';
import { createContext } from 'react';
import LetterBox from './LetterBox';
import { useRef } from 'react';
import { inn } from '../../utils/Vectors';
import { All, secsToMin } from '../../utils/math';
export const WordGridContext = createContext();

const WordGrid = () => {
  const [selected, setSelected] = useState({
    x: 0,
    y: 0,
    isSelected: false,
  });
  const [inter, setInter] = useState(0);
  const [timer, setTimer] = useState(300);
  const [actual, setActual] = useState([null, null]);
  const [selectedVector, setSelectedVector] = useState({
    start: [null, null],
    end: [null, null],
  });
  const [foundedWords, setFoundedWords] = useState([]);
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

  const [words, setWords] = useState([]);
  const [tab, setTab] = useState([[]]);

  let i = 0;
  let j = 0;
  // for (i = 0; i < list.length; i++) {
  //   refTab.push([]);
  //   for (j = 0; j < list[i].length; j++) {
  //     refTab[i].push(useRef(null));
  //   }
  // }
  for (i = 0; i < list.length; i++) {
    tab.push([]);
    for (j = 0; j < list[i].length; j++) {
      tab[i].push(<LetterBox key={i + '-' + j} x={40 + 60 * j} y={40 + 60 * i} i={i} j={j} text={list[i][j]} />);
    }
  }
  const vect = vectors.map(el => [el[0] ,el[1]])
  useEffect(() => {
    if (timer <0 || All((el) => inn(el,words),vect)) {
      console.log('timer', timer)
      clearInterval(inter);
    }
  }, [words, timer]);
  const parent = useRef(null);
  return (
    <WordGridContext.Provider
      value={{
        parent,
        setTab,
        tab,
        foundedWords,
        setFoundedWords,
        mousePos,
        selected,
        setSelected,
        selectedVector,
        setSelectedVector,
        actual,
        setActual,
        words,
        setWords,
      }}
    >
      <div
        className="WordGrid"
        onMouseMove={HandleMouseMove}
        onClick={e => {
          if (timer === 300) {
            setInter(
              setInterval(() => {
                console.log('une sec');
                setTimer(prev => prev - 1);
              }, 1000)
            );
          }
        }}
      >
        <Stage width={900} height={900} className="wordGrid">
          <Layer className="wordGrid" ref={parent}>
            {tab}
          </Layer>
        </Stage>
      </div>
      <div className="main" w>
        <h1>Mot caches</h1>
        <div> Vous avez 5min des que vous commencerez le jeu.</div>
        <div> Il est question ici de chercher des mots</div>
        <div> et ce dans la liste suivante</div>
        <div className="words">
          {vectors.map(el => {
            let a = [el[0], el[1]];
            return (
              <p key={`${vectors.indexOf(el)}`} className={inn(a, words) ? 'line-through' : 'simple'}>
                {el[2]}
              </p>
            );
          })}
        </div>
        <div className="timer">{timer > 0 && secsToMin(timer)}</div>
      </div>
    </WordGridContext.Provider>
  );
};

export default WordGrid;
