export const getAngle = (a, b, x, y) => {
  let X = x - a;
  let Y = y - b;
  let angle = -Math.atan2(X, Y);
  angle = (angle * 180) / Math.PI;
  return angle;
};

export const norme = (a, b, x, y) => {
  let X = x - a;
  let Y = y - b;
  let nor = Math.sqrt(X*X + Y*Y)
  return nor
};


export const secsToMin = (a)=>{
  let mins = (a-a%60)/60
  let secs = a%60
  return `${mins} min : ${secs} s`
}

export const All = (condition , tab)=>{
  let i = 0
  for(i=0 ; i<tab.length ; i++){
    if(!condition(tab[i])){
      return false
    }
  }
  return true
}