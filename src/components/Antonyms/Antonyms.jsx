import React, { useState } from 'react';
import './style.css';
import { questions } from '../../data/mock-antonyms';
import ReponseBlock from './ReponseBlock';
import { createContext } from 'react';

let i = 0;
let questionsList = [];
let repList = questions.map(el => el.reponse);

for (i = 0; i < questions.length; i++) {
  let j = Math.floor(Math.random() * repList.length);
  console.log('j', j);
  const rep = repList[j];
  repList.splice(j, 1);
  questionsList.push(<ReponseBlock key={`${i}`} text={questions[i].title} fakeResponse={rep} rep = {questions[i].reponse} />);
}

export const AntonymsContext = createContext();

const Antonyms = () => {
  const [mousePos, setmousePos] = useState([null, null]);
  
  const [dataMooving , setDataMooving] = useState({
    data : {},
    isMooving : false,
    item : null
  })
  const handleMouseMoove = e => {
    setmousePos(prev => {
      let obj = [e.clientX, e.clientY];
      // obj
      return obj;
    });
  };
  
  return (
    <AntonymsContext.Provider value={{ mousePos, setmousePos ,dataMooving , setDataMooving }}>
      <div className="antonyms-container" onMouseMove={handleMouseMoove}>
        <h1>Antonyms</h1>
        <div className="antonyms-subcontainer">{questionsList}</div>
      </div>
    </AntonymsContext.Provider>
  );
};

export default Antonyms;
