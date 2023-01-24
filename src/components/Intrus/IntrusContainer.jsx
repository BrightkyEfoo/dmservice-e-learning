import React, { useEffect, useRef, useState } from 'react';
import { randomSort } from '../../utils/Array';
import { listIntrus } from '../../data/mock-intrus';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { TimerActions } from '../../rtk/features/timer';
import { IntrusActions } from '../../rtk/features/Intrus';
const IntrusBlock = ({ list, intrus }) => {
  const dispatch = useDispatch();
  const actual = useSelector(state => state.intrus.actual);
  useEffect(() => {
    dispatch(IntrusActions.setActual({ waited: intrus }));
  }, [actual]);

  return (
    <div className="intrus-list">
      <h2 className="intrus-title">Question n° {actual + 1}</h2>
      <div className="intru-list">
        {list.map((el, i) => {
          return <IntrusSelectable text={el} key={`${i}`} idx={i} isIntrus={el === intrus} intrus={intrus} />;
        })}
      </div>
    </div>
  );
};

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

const IntrusSelectable = ({ text, isIntrus, idx, intrus }) => {
  const timer = useSelector(state => state.timer);
  const intr = useRef();
  const selected = useSelector(state => state.intrus.selected);
  const waited = useSelector(state => state.intrus.waited);
  const [isSelected, setIsSelected] = useState(false);
  const dispatch = useDispatch();
  const actual = useSelector(state => state.intrus.actual);
  const handleClick = e => {
    if (!timer.active) {
      dispatch(TimerActions.set({ active: true, value: 300 }));
    }

    dispatch(IntrusActions.setSelected(text));
    setIsSelected(true);
    // if (Intrus.selected === waited) {
    //   console.log('intrus.selected', Intrus.selected);
    //   intr.current.backgroundColor = '#0000ff7c';
    //   setTimeout(() => {
    //     dispatch(IntrusActions.clearPos());
    //     dispatch(IntrusActions.setActual({ actual: actual === listIntrus.length - 1 ? -1 : actual + 1, waited: intrus }));
    //   }, 700);
    // }

    // if (!timer.active) {
    //   dispatch(TimerActions.set({ active: true, value: 300 }));
    // }
  };
  useEffect(() => {
    if (isSelected) {
      if (selected === waited && selected !== '') {
        intr.current.style.backgroundColor = '#6666fa7c';
        setTimeout(() => {
          dispatch(IntrusActions.clearPos());
          dispatch(IntrusActions.setActual({ actual: actual === listIntrus.length - 1 ? -1 : actual + 1, waited: intrus }));
        }, 700);
      }
      dispatch(IntrusActions.clearPos());
      setIsSelected(false);
    }
  }, [isSelected]);
  return (
    <div ref={intr} className="intru-selectable" onClick={handleClick}>
      {text}
    </div>
  );
};

const tab = listIntrus.map((el, i) => {
  let j = 0;
  const newlist = [];
  const l = [...el.list];
  for (j = 0; j < el.list.length; j++) {
    let c = Math.floor(Math.random() * l.length);
    newlist.push(l[c]);
    l.splice(c, 1);
  }
  return { ...el, list: newlist };
});

let a = [...tab];
const Tab = [];
let i = 0;
for (i = 0; i < tab.length; i++) {
  let j = Math.floor(Math.random() * a.length);
  Tab.push(<IntrusBlock key={`${i}`} intrus={a[j].intrus} list={a[j].list} />);
  a.splice(j, 1);
}

// const a = listIntrus.map((el,i)=>{
//     return <IntrusBlock data={el}
// })

// const l = randomSort(listIntrus , IntrusBlock)

const IntrusContainer = () => {
  const actual = useSelector(state => state.intrus.actual);
  return <div>{actual < Tab.length ? Tab[actual] : 'Terminé'}</div>;
};

export default IntrusContainer;
