export const inn = (el, tab) => {
  let toFind = el;
  // console.log('tab', tab)
  let res = tab.find(
    element =>
      (element[0][0] === toFind[0][0] &&
      element[0][1] === toFind[0][1] &&
      element[1][1] === toFind[1][1] &&
      element[1][0] === toFind[1][0])
      ||(
        element[0][0] === toFind[1][0] &&
      element[0][1] === toFind[1][1] &&
      element[1][0] === toFind[0][0] &&
      element[1][1] === toFind[0][0]
      )
  );
  if (Array.isArray(res) && res[0]) {
    return true;
  }
  return false;
};

const reverse = el => {
  let [a, b ] = el;
  return [b, a];
};

// const vectors = [
//   [
//     [0, 2],
//     [0, 10],
//   ],
//   [
//     [0, 1],
//     [0, 3],
//   ],
// ];

// console.log(
//   inn(
//     [
//       [0, 3],
//       [0, 1],
//     ],
//     vectors
//   )
// );
