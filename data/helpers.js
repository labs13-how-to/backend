module.exports = {
  genUniqueArr,
}

function genUniqueArr(num, fakerFn) {
  let arr = [];
  while (arr.length < num) {
    const temp = fakerFn();
    if (!arr.includes(temp)) {
      arr.push(temp);
    }
  }
  return arr;
};
