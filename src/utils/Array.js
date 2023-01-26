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

export const treeToOne = (tab)=>{
  const a = []
  let i = 0
  let j = 0
  let k = 0
  for(i = 0 ; i<tab.length ; i++){
    for(j = 0 ; j < tab[i].length;j++){
      for(k = 0; k < tab[i][j].length ; k++){
        a.push(tab[i][j][k])
      }
    }
  }
  return a
}