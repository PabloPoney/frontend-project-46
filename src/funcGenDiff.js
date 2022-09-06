import { makePathtoObj } from './parsers.js';
import { makeDiffTree } from './makeTree.js';
import makeDiffStr from './DiffTreetoStr.js';

const genDiff = (strPath1, strPath2) => {
  const obj1 = makePathtoObj(strPath1);
  const obj2 = makePathtoObj(strPath2);

  const diffTree = makeDiffTree(obj1, obj2);
  const diffStr = makeDiffStr(diffTree);

  return diffStr;
};

export default genDiff;
