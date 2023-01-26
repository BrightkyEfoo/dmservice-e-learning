import React, { useState } from 'react';
import WordGrid from '../../components/WordGrid2/WordGrid';
import { useDispatch, useSelector } from 'react-redux';
import { MousePosActions } from '../../rtk/features/MousePos';
import list, { vectors } from '../../data/mock-words';
import './style.css';
import { WordGridActions } from '../../rtk/features/WordGrid';
import { secsToMin } from '../../utils/math';
const WordGridPage = () => {
  const dispatch = useDispatch();
  const handleMouseMove = e => {
    dispatch(MousePosActions.set({ x: e.clientX, y: e.clientY }));
  };
  const time = useSelector(state => state.wordGrid.timer)
  
  const founded = useSelector(state => state.wordGrid.founded);
  return (
    <div className="word-grid-container" onMouseMove={handleMouseMove}>
      <h1>Mots cachés</h1>
      <WordGrid lettersList={list} lettersWidth={25} lettersSpace={8} />
      <div className="gridFooter">
        <div className="head-of-footer">
          Trouvez les mots :
          <div>
            {vectors.map((el, i) => (
              <p className={founded.includes(el[2]) ? 'line-through words-span' : 'words-span'} key={i}>
                {el[2]}
              </p>
            ))}
          </div>
        </div>
        <div className='small-timer' >Temps restant : {secsToMin(time)}</div>
      </div>
    </div>
  );
};

export default WordGridPage;
