export const slicedBundle = (gap: number, array: any[]) => {
  let temp = [];
  for (let i = 0; i < array.length; i += gap) {
    temp.push(array.slice(i, gap + i));
  }
  return temp;
};
