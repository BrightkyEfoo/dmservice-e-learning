import React, { useEffect, useRef, useState } from 'react';
import ParagraphText from './ParagraphText';
import { text } from '../../data/mock-paragraph';
import { useDispatch, useSelector } from 'react-redux';
import { TimerActions } from '../../rtk/features/timer';
import { ItemSelectedActions } from '../../rtk/features/ItemSelected';
import { MousePosActions } from '../../rtk/features/MousePos';
import { FoundedActions } from '../../rtk/features/founded';
import { secsToMin } from '../../utils/math';

let i = 0;
let questionsList = [];
let repList = text.map(el => el.waited);

const Draggable = ({ children }) => {
  const mousePos = useSelector(state => state.mousePos);
  const dispatch = useDispatch();
  const itemData = useSelector(state => state.itemSelected.data);
  const isMoving = useSelector(state => state.itemSelected.isMoving);
  const activeDropZone = useSelector(state => state.activeDropZone);
  const active = useSelector(state => state.timer.active);
  const drag = useRef();
  const handleMouseDown = e => {
    if (!active) {
      dispatch(TimerActions.set({ active: true }));
    }
    dispatch(ItemSelectedActions.set({ data: children, isMoving: true }));
    dispatch(MousePosActions.setMouseDown(true));
  };
  const handleMouseUp = e => {
    dispatch(MousePosActions.setMouseDown(false));
    if (activeDropZone.x) {
      if (activeDropZone.waited === itemData) {
        dispatch(FoundedActions.decrement({ state: 'words' }));
        drag.current.style.top = `${activeDropZone.y + 5}px`;
        drag.current.style.left = `${activeDropZone.x + 5}px`;
      } else {
        drag.current.style.position = '';
        drag.current.style.top = '';
        drag.current.style.left = '';
      }
    } else {
      drag.current.style.position = '';
      drag.current.style.top = '';
      drag.current.style.left = '';
    }
    dispatch(ItemSelectedActions.set({ data: '', isMoving: false }));
  };
  useEffect(() => {
    if (itemData === children && isMoving) {
      if (children === itemData) drag.current.style.position = 'fixed';
      drag.current.style.left = mousePos.x + 'px';
      drag.current.style.top = mousePos.y + 'px';
      drag.current.style.zIndex = 500;
    }
  }, [itemData, isMoving, mousePos]);
  return (
    <div className="rep unselectable" ref={drag} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>
      {children}
    </div>
  );
};

for (i = 0; i < text.length; i++) {
  let j = Math.floor(Math.random() * repList.length);
  //   console.log('j', j);
  const rep = repList[j];
  repList.splice(j, 1);
  if (rep) {
    questionsList.push(<Draggable key={i}>{rep}</Draggable>);
  }
}

const Paragraph = () => {
  const dispatch = useDispatch();
  const timer = useSelector(state => state.timer);
  const founded = useSelector(state => state.founded.words);
  const [inter, setInter] = useState(0);
  useEffect(() => {
    dispatch(TimerActions.set({ value: 300, active: false }));
    dispatch(FoundedActions.set({ state: 'words', value: 5 }));
    return () => {
      dispatch(TimerActions.reset());
      dispatch(FoundedActions.set({ state: 'words', value: 5 }));
    };
  }, []);
  useEffect(() => {
    if (timer.active) {
      clearInterval(inter)
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
  return (
    <div className="antonyms-container">
      <h1>Completez le texte</h1>
      <div className="desc">
        En lisant le texte, cherchez les mots manquants dans la liste en dessous du texte. portez les et deposez les dans les vides
      </div>

      <ParagraphText />
      <div className="rep-list">{questionsList}</div>
      <div className='timer'>{founded && timer.active && timer.value > 0 ? secsToMin(timer.value) : ''}</div>
    </div>
  );
};

export default Paragraph;
