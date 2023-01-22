import React, { useContext, useEffect, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { getAngle, norme } from '../../utils/math';
import { WordGridContext } from './WordGrid';

const LetterBox = ({ x, y, text, i, j }) => {
  const { mousePos, actual, setActual , selectedVector, setSelectedVector} = useContext(WordGridContext);
  const [selected, setSelected] = useState({
    x: 0,
    y: 0,
    isSelected: false,
  });
  const [props, setProps] = useState({
    x: x,
    y: y,
    width: 50,
    height: 50,
    rotation: 0,
    color : selected.isSelected ? '#a6a6a680' : '#a5a5a562'
  });
  const [word , setWord] = useState({
    start : [null , null],
    end : [null , null]
  })
  
  const handleClick = e => {
    let a = e.target.attrs.x;
    let b = e.target.attrs.y;
    console.log(`i : ${i} , j : ${j}`);
    let angle = getAngle(a, b, mousePos.x, mousePos.y);
    console.log('actual', actual)
    setProps(prev => {
      return { ...prev, rotation: angle };
    });

    if(actual[0] === null){
      setActual([i,j])
      setSelectedVector(prev =>{
        return {...prev, start : [i,j]}
      })
      setSelected(prev => {
        return { x: a, y: b, isSelected: !prev.isSelected };
      });
    }else if (actual.i === i && actual.j===j){
      setActual([null,null])
      setSelected(prev => {
        return { x: a, y: b, isSelected: !prev.isSelected };
      });
    }else {
      setSelectedVector(prev =>{
        console.log([i,j])
        return {...prev, end : [i,j]}
      })
      
      // setSelectedVector(prev => {
      //   console.log(selectedVector)
      //   return {...prev, start : [null,null]}
      // })
      if(selectedVector)
      setActual([null,null])
    }
  };

  // selectedVector.start[0] === i && selectedVector.start[1]===j
  useEffect(() => {
    if (actual[0] === i & actual[1]===j) {
      let angle = getAngle(selected.x, selected.y, mousePos.x, mousePos.y);
      setProps(prev => {
        return { ...prev, rotation: angle, height: 50 + norme(selected.x, selected.y, mousePos.x, mousePos.y) };
      });
      // console.log(props.rotation);
    }
  }, [selected.x, selected.y, mousePos.x, mousePos.y, selected.isSelected, actual.i,actual.j, i, j, props]);

  // useEffect(() => {
  //   if()
  
  //   return () => {
  //     second
  //   }
  // }, [third])
  
  return (
    <Group /*zIndex={selected.isSelected ? 500 : 2}*/>
      <Text text={text} x={props.x - 11} y={props.y - 12} fontSize={35} />
      <Rect
        x={props.x}
        y={props.y}
        width={props.width}
        height={props.height}
        fill={selected.isSelected ? '#a6a6a680' : '#a5a5a500'}
        onClick={handleClick}
        rotation={props.rotation}
        offsetX={25}
        offsetY={25}
      />
    </Group>
  );
};

export default LetterBox;
