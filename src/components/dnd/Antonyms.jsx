// celui ci fonction!

import React, { useEffect, useState } from 'react';
import './style.css';
import { questions } from '../../data/mock-antonyms';
import { createContext } from 'react';
import RepBlock from './RepBlock';
import { useDispatch, useSelector } from 'react-redux';
import { TimerActions } from '../../rtk/features/timer';
import { secsToMin } from '../../utils/math';
import { FoundedActions } from '../../rtk/features/founded';

let i = 0;
let questionsList = [];
let repList = questions.map(el => el.reponse);

for (i = 0; i < questions.length; i++) {
  let j = Math.floor(Math.random() * repList.length);
  //   console.log('j', j);
  const rep = repList[j];
  repList.splice(j, 1);
  questionsList.push(<RepBlock key={`${i}`} text={questions[i].title} fakeResponse={rep} rep={questions[i].reponse} />);
}

export const AntonymsContext = createContext();

const Antonyms = () => {
  const dispatch = useDispatch();
  const timer = useSelector(state => state.timer);
  const founded = useSelector(state => state.founded.antonyms);
  const [inter, setInter] = useState(0);
  useEffect(() => {
    dispatch(TimerActions.set({ value: 300, active: false }));
    dispatch(FoundedActions.set({ state: 'antonyms', value: 10 }));
    return () => {
      dispatch(TimerActions.reset());
      dispatch(FoundedActions.set({ state: 'antonyms', value: 10 }));
    };
  }, []);
  useEffect(() => {
    if (timer.active) {
      // clearInterval(inter)
      setInter(
        setInterval(() => {
          dispatch(TimerActions.decrement());
          // console.log('founded', founded)
        }, 1000)
      );
      console.log('inter', inter);
      if (timer.value < 0 || founded === 0) {
        clearInterval(inter);
        dispatch(TimerActions.set({ active: false }));
      }
    } else {
      clearInterval(inter);
    }
    return () => {
      // dispatch(TimerActions.reset())
      console.log('interCleaned', inter);
      clearInterval(inter);
    };
  }, [timer.active, founded]);
  // useEffect
  return (
    <div className="antonyms-container">
      <h1>Antonyms</h1>
      <div className="desc">
        Ceci est un jeu ou vous devez porter chaque mots surlignés et les placer chacun dans une case bleu mais biensur celle qui correspond
      </div>
      <div className="antonyms-subcontainer">{questionsList}</div>
      <div className='timer'>{timer.active && timer.value > 0 ? secsToMin(timer.value) : ''}</div>
    </div>
  );
};

export default Antonyms;
