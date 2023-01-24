// import { Component } from "react";

export const randomSort = (tab , Compon)=> {
  let a = [...tab];
  let i = 0;
  let List = [];

  for (i = 0; i < a.length; i++) {
    let j = Math.floor(Math.random() * a.length);
    console.log('j', j);
    const rep = a[j];
    a.splice(j, 1);
    List.push(<Compon key={`${i}`} data={rep} />);
    return List
  }
};
