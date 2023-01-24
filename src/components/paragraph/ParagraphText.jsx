import React, { useEffect, useRef } from 'react';
import { text } from '../../data/mock-paragraph';
import './style.css'
import { useRect } from '../../useRect';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveDropZoneActions } from '../../rtk/features/ActiveDropZone';
const ParagraphText = () => {
  return (
    <div className='paragrah-container'>
      {text.map((el , i) => {
        return <Droppable key = {i} text={el.text} waited={el.waited} />
      })}
    </div>
  );
};

export default ParagraphText;

const Droppable = ({ text, waited }) => {
    const mousePos = useSelector(state => state.mousePos);
    const activeDropZone = useSelector(state => state.activeDropZone)
    const drop = useRef();
    const rect = useRect(drop)
    const dispatch = useDispatch();
    const y = rect.y;
    const x = rect.x;
    // const rect = drop.current?.getClientRects;
    // console.log('x', x)
    useEffect(() => {
      
      if (mousePos.y <= y + 30 && mousePos.y >= y && mousePos.x >= x && mousePos.x <= x + 120) {
        // console.log('first', first)
        dispatch(ActiveDropZoneActions.set({ x, y, waited }));
      }else if(activeDropZone.x === x && activeDropZone.y === y){
        dispatch(ActiveDropZoneActions.clear())
      }
    }, [mousePos]);
  return (
    <div className='droppable'>
      <span>{text}</span>
      {waited && <div className='paragraphe-drop' ref={drop}></div>}
    </div>
  );
};
