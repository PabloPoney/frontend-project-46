import { makePathtoObj } from './parsers.js';
import { makeDiffTree } from './makeTree.js';
import pickFormat from './formatters/index.js';

const genDiff = (strPath1, strPath2, formater) => {
  const obj1 = makePathtoObj(strPath1);
  const obj2 = makePathtoObj(strPath2);

  const diffTree = makeDiffTree(obj1, obj2);
  const diffStr = pickFormat(formater, diffTree);

  return diffStr;
};

export default genDiff;
