import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { memoireActions } from '../../rtk/features/memoire';

const Cards = ({ value, url }) => {
  // const [link, setLink] = useState('card.png');
  const [isShowed, setIsShowed] = useState(false);
  const [canClick , setCanClick] = useState(true)
  const first = useSelector(state => state.memoire.first);
  const second = useSelector(state => state.memoire.second);
  const founded = useSelector(state => state.memoire.founded)
  const dispatch = useDispatch();
  const handleClick = e => {
    if (isShowed) {
      setIsShowed(false);
      if (second !== '') {
        dispatch(memoireActions.clearSecond());
      } else if (first !== '') {
        dispatch(memoireActions.clearFirst());
      }
    } else {
      setIsShowed(true);
      if (first === '') {
        dispatch(memoireActions.setFirst(value));
      } else if (second === '') {
        dispatch(memoireActions.setSecond(value));

        console.log('second', value)
        if (first === value) {
          console.log('founded')
          dispatch(memoireActions.addFounded(value));
          dispatch(memoireActions.clearSecond());
          dispatch(memoireActions.clearFirst());
          
        }else{

          setTimeout(()=>{
            dispatch(memoireActions.clearPos())
          },1000)
        }
      } else {
        dispatch(memoireActions.clearPos());
      }
    }
  };
  useEffect(()=>{
    if(value !== first && value !== second && !founded.includes(value)){
      setIsShowed(false)
    }
  },[first, second])
  useEffect(()=>{
    if(founded.includes(value)){
      setCanClick(false)
    }
  },[founded])

  return (
    <div className="card" onClick={canClick ? handleClick : null}>
      <img src={isShowed ? url : 'card.png'} alt="card" />
    </div>
  );
};

export default Cards;
