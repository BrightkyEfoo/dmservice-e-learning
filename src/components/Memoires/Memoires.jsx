import React, { useState } from 'react';
import { list } from '../../data/mock-memoire';
import Cards from './Cards';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { TimerActions } from '../../rtk/features/timer';
import { secsToMin } from '../../utils/math';

let i = 0;
let List = [];
let repList = [...list, ...list];

for (i = 0; i < 2 * list.length; i++) {
  let j = Math.floor(Math.random() * repList.length);
  console.log('j', j);
  const rep = repList[j];
  repList.splice(j, 1);
  List.push(<Cards key={`${i}`} value={rep.value} url={rep.url} />);
}

const Memoires = () => {
  const dispatch = useDispatch();
  const timer = useSelector(state => state.timer.value);
  const [inter, setInter] = useState(0)
  
// setInter(setInterval(()=>{
  
// }))
  // };
  // useEffect(() => {
  //   first
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  
  return (
    <div className="memories-container" >
      <h1>Memoires</h1>
      <div>Ici vous devez juste selectionner une carte et retrouver la carte correspondante</div>
      <div className="card-container">{List}</div>
      {timer ? <div className="timer">{secsToMin(timer)}</div> : null}
    </div>
  );
};

export default Memoires;
