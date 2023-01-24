import React, { useContext, useEffect, useState } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { getAngle, norme } from '../../utils/math';
import { WordGridContext } from './WordGrid';
import { inn } from '../../utils/Vectors';
import list, { vectors } from '../../data/mock-words';

const LetterBox = ({ x, y, fill, text, i, j }) => {
  const { words , setWords ,tab, parent, mousePos, actual, setActual, selectedVector, setSelectedVector } = useContext(WordGridContext);
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
    color: null,
  });
  

  const handleClick = e => {
    let a = e.target.attrs.x;
    let b = e.target.attrs.y;
    console.log(`i : ${i} , j : ${j}`);
    let angle = getAngle(a, b, mousePos.x, mousePos.y);
    console.log('actual', actual);
    setProps(prev => {
      return { ...prev, rotation: angle };
    });

    if (actual[0] === null) {
      setActual([i, j]);
      setSelectedVector(prev => {
        return { ...prev, start: [i, j] };
      });
      setSelected(prev => {
        return { x: a, y: b, isSelected: !prev.isSelected };
      });
    } else if (actual.i === i && actual.j === j) {
      setActual([null, null]);
      setSelected(prev => {
        return { x: a, y: b, isSelected: !prev.isSelected };
      });
    } else {
      setSelectedVector(prev => {
        console.log('ii ', [i, j]);

        console.log('selectedVector', prev);
        if (inn([selectedVector.start, [i, j]], vectors)) {
          console.log(tab[selectedVector.start[0]][selectedVector.start[1]]);
          console.log(selectedVector);
          setWords(prev => {
            console.log('prev', prev)
            
            let obj
            if(prev.length === 0){
              obj = [[selectedVector.start , [i, j]] ]
              return obj
            }
            obj = prev
            obj.push([selectedVector.start , [i, j]])
            return [...obj]
          })
          parent.current.children[selectedVector.start[0] * 14 + selectedVector.start[1]].children[1].attrs.fill = '#0004ff88';
        } else {
          parent.current.children[selectedVector.start[0]*14 + selectedVector.start[1]].children[1].attrs.height=50
          parent.current.children[selectedVector.start[0]*14 + selectedVector.start[1]].children[1].attrs.fill='#ff000000'
        }
        return { ...prev, end: [i, j] };
      });

      setActual([null, null]);
      // console.log(vectors);
      // if (inn([selectedVector.start, selectedVector.end], vectors)) {
      //   setProps(prev => {
      //     return { ...prev, color: '#0000ff80' };
      //   });
      // } else {
      //   setProps(prev => {
      //     return { ...prev, rotation: 0, height: 50 };
      //   });
      // }
    }
  };

  // selectedVector.start[0] === i && selectedVector.start[1]===j
  useEffect(() => {
    if ((actual[0] === i) & (actual[1] === j)) {
      let angle = getAngle(selected.x, selected.y, mousePos.x, mousePos.y);
      setProps(prev => {
        return { ...prev, rotation: angle, height: 50 + norme(selected.x, selected.y, mousePos.x, mousePos.y) };
      });
      // console.log(props.rotation);
    }
  }, [mousePos.x, mousePos.y, selected.isSelected]);

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
        fill={fill ? fill : selected.isSelected ? '#65666980' : '#a5a5a500'}
        onClick={handleClick}
        rotation={props.rotation}
        offsetX={25}
        offsetY={25}
      />
    </Group>
  );
};

export default LetterBox;
