import React, { useEffect, useState } from 'react';
import IntrusContainer from './IntrusContainer';
import './style.css'
import { secsToMin } from '../../utils/math';
import { useDispatch, useSelector } from 'react-redux';
import { TimerActions } from '../../rtk/features/timer';

const Intrus = () => {
    const timer = useSelector(state => state.timer)
    const [inter, setInter] = useState(0)
    const actual = useSelector(state => state.intrus.actual)
    const dispatch = useDispatch()
    useEffect(() => {
      if(timer.active && inter === 0){
        setInter(setInterval(()=>{
            dispatch(TimerActions.decrement())
        },1000))
      }
    
    }, [timer.active])

    useEffect(()=>{
        if(timer.value <= 0 || actual === -1){
          clearInterval(inter)
        }
    },[timer.value , actual])
    
  return (
    <div className='intrus-container'>
      <h1>Trouvez l'intrus</h1>
      <div className="desc">Ici, il s'agit pour vous de choisir lequel des mots ci-dessous est l'intrus.</div>
      <IntrusContainer />
      <div className='timer'>{secsToMin(timer.value)}</div>
    </div>
  );
};

export default Intrus;
