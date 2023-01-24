import React, { useEffect, useRef } from 'react';
import { ReactDOM } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActiveDropZoneActions } from '../../rtk/features/ActiveDropZone';
import { useRect } from '../../useRect';
import { ItemSelectedActions } from '../../rtk/features/ItemSelected';
import { MousePosActions } from '../../rtk/features/MousePos';
import { TimerActions } from '../../rtk/features/timer';
import { FoundedActions } from '../../rtk/features/founded';

const RepBlock = ({ text, fakeResponse, rep }) => {
  return (
    <div className="response-block">
      <DropZone waited={rep}></DropZone>
      <div>{text}</div>
      <Draggable>{fakeResponse}</Draggable>
    </div>
  );
};

export default RepBlock;

const Draggable = ({ children }) => {
  const mousePos = useSelector(state => state.mousePos);
  const dispatch = useDispatch()
  const itemData = useSelector(state => state.itemSelected.data)
  const isMoving = useSelector(state => state.itemSelected.isMoving)
  const activeDropZone = useSelector(state => state.activeDropZone)
  const active = useSelector(state=> state.timer.active)
  const drag = useRef()
  const handleMouseDown = e => {
    if(!active){
      dispatch(TimerActions.set({active : true}))
    }
    dispatch(ItemSelectedActions.set({data : children , isMoving : true}))
    dispatch(MousePosActions.setMouseDown(true))
  }
  const handleMouseUp = e => {
    dispatch(MousePosActions.setMouseDown(false))
    if(activeDropZone.x){
      if(activeDropZone.waited === itemData){
        dispatch(FoundedActions.decrement({state : 'antonyms'}))
        drag.current.style.top = `${activeDropZone.y+5}px`
        drag.current.style.left = `${activeDropZone.x+5}px`
      }else{
        drag.current.style.position = ''
        drag.current.style.top = ''
        drag.current.style.left = ''
      }
    }else{
      drag.current.style.position = ''
      drag.current.style.top = ''
      drag.current.style.left = ''
    }
    dispatch(ItemSelectedActions.set({data : '' , isMoving : false}))
  }
  useEffect(()=>{
    if(itemData === children && isMoving){
      if(children === itemData)
      drag.current.style.position = 'fixed'
      drag.current.style.left = mousePos.x+'px'
      drag.current.style.top = mousePos.y+'px'
      drag.current.style.zIndex = 500
    }
  },[itemData , isMoving , mousePos])
  return <div className="rep unselectable" ref = {drag} onMouseUp={handleMouseUp} onMouseDown={handleMouseDown}>{children}</div>;
};

const DropZone = ({ children, waited }) => {
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
    
    if (mousePos.y <= y + 50 && mousePos.y >= y && mousePos.x >= x && mousePos.x <= x + 120) {
      // console.log('first', first)
      dispatch(ActiveDropZoneActions.set({ x, y, waited }));
    }else if(activeDropZone.x === x && activeDropZone.y === y){
      dispatch(ActiveDropZoneActions.clear())
    }
  }, [mousePos]);
  return (
    <div className="drop-zone" ref={drop}>
      {children}
    </div>
  );
};
