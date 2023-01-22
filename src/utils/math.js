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
