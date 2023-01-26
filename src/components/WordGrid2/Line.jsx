import React, { useContext, useEffect, useState } from 'react';
import { Rect } from 'react-konva';
import { getAngle, norme } from '../../utils/math';
import { useDispatch, useSelector } from 'react-redux';
// import { norme  , } from '../../utils/math';
import { GridContext } from './WordGrid';
import { MousePosActions } from '../../rtk/features/MousePos';
import { In } from '../../utils/Vectors';
import { vectors } from '../../data/mock-words';
import { WordGridActions } from '../../rtk/features/WordGrid';

const Line = ({ i, j, k, start, end, cornerRadius, x, y, width, height, fill }) => {
  const { Lines, setLines, LayerRef, render, setRender } = useContext(GridContext);
  const dispatch = useDispatch();
  const actualHovered = useSelector(state => state.wordGrid.actualHovered);
  const mousePos = useSelector(state => state.mousePos);
  const grid = useSelector(state => state.wordGrid.grid);
  const [props, setProps] = useState({
    x,
    y,
    width,
    height,
    rotation: 0,
    fill,
    offsetX: 0,
    offsetY: 0,
    zIndex: null,
  });
  const [isLocked, setIsLocked] = useState(false);
  const [vector, setVector] = useState({
    start: {
      i,
      j,
    },
    end: {
      i: null,
      j: null,
    },
  });
  const handleMouseMove = e => {
    // console.log('moving');
  };
  const handleMouseUp = () => {
    // console.log('upped');
    dispatch(MousePosActions.setMouseDown(false));
    setVector({
      ...vector,
      end: {
        i: actualHovered.end.i,
        j: actualHovered.end.j,
      },
    });
    if (actualHovered.end.i === null) {
      setLines(prev => {
        console.log('prev[i][j]', prev[i][j]);
        prev[i][j].splice(k, 1);
        return prev;
      });
      setRender(prev => prev + 1);
      // console.log('render', render);
    } else {
      console.log('a', [
        //attention, j'ai inverséici pour que ce soit correct
        [j, i],
        [vector.end.j, vector.end.i],
      ]);
      // console.log('vectors', vectors);
      let [a, e] = In(
        [
          [j, i],
          [vector.end.j, vector.end.i],
        ],
        vectors
      );
      if (a) {
        console.log('founded');
        setProps({...props , height : props.height+35})
        dispatch(WordGridActions.addFounded(vectors[e][2]));
        setIsLocked(true);
      } else {
        console.log('nope');
        setLines(prev => {
          console.log('prev[i][j]', prev[i][j]);
          prev[i][j].splice(k, 1);
          return prev;
        });
        setRender(prev => prev + 1);
        // console.log('render', render);
      }
    }
  };

  useEffect(() => {
    if (mousePos.mouseDown && i === actualHovered.start.i && j === actualHovered.start.j) {
      // const endX = (actualHovered.end.i + 1) * grid.lettersSpace + actualHovered.end.i * grid.lettersWidth;
      // const endY = (actualHovered.end.j + 1) * grid.lettersSpace + actualHovered.end.j * grid.lettersWidth;
      let aa = norme(x, y, mousePos.x - grid.x, mousePos.y - grid.y) + grid.lettersWidth / 2
      setProps({
        ...props,
        x: x + grid.lettersWidth / 2,
        y: y + grid.lettersWidth / 2,
        offsetX: grid.lettersWidth / 2,
        offsetY: grid.lettersWidth / 2,
        rotation: getAngle(x + grid.lettersWidth / 2, y + grid.lettersWidth / 2, mousePos.x - grid.x, mousePos.y - grid.y),
        height: aa > 35 ? aa-35 : aa,
        zIndex: 1,
      });
    }else if(i === actualHovered.start.i && j === actualHovered.start.j){
      setProps({...props , height : props.height})
    }
    setVector(prev => ({
      ...prev,
      end: {
        i: actualHovered.end.i,
        j: actualHovered.end.j,
      },
    }));
    setRender(prev => prev + 1);
    // console.log('render', render);
  }, [mousePos.x, mousePos.y, mousePos.mouseDown, vector.end.i]);
  useEffect(()=>{
    if(!mousePos.mouseDown && !isLocked){
      handleMouseUp()
    }
  }, [mousePos.mouseDown])
  return (
    <Rect
      onMouseMove={isLocked ? null : handleMouseMove}
      onMouseUp={isLocked ? null : handleMouseUp}
      cornerRadius={cornerRadius}
      x={props.x}
      y={props.y}
      width={props.width}
      height={props.height}
      fill={props.fill}
      offsetX={props.offsetX}
      offsetY={props.offsetY}
      rotation={props.rotation}
    />
  );
};

export default Line;
