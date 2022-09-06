import _ from 'lodash';
import {
  getChildren, getKey, getStatus, getValue,
} from './makeTree.js';

const makeObjToStr = (data, depth) => {
  if (!_.isObject(data)) return data;
  const space = '  '.repeat(depth);
  const result = Object.entries(data)
    .map(([key, value]) => `${space}${key}: ${makeObjToStr(value, depth + 2)}\n`)
    .join('');
  return `{\n${result}${'  '.repeat(depth - 2)}}`;
};

const makeDiffStr = (tree, depth = 1, space = '  ') => {
  const result = tree.reduce((acc, node) => {
    const startStr = `${acc}${space.repeat(depth)}`;
    const endStr = (item = 0) => ` ${getKey(node)}: ${makeObjToStr(getValue(node)[item], depth + 3)}\n`;

    if (getStatus(node) === 'added') {
      return `${startStr}+${endStr()}`;
    }
    if (getStatus(node) === 'remooved') {
      return `${startStr}-${endStr()}`;
    }
    if (getStatus(node) === 'nochenged') {
      return `${startStr} ${endStr()}`;
    }
    if (getStatus(node) === 'nested') {
      return `${startStr}  ${getKey(node)}: ${makeDiffStr(getChildren(node), depth + 2)}\n`;
    }
    // getStatus(node) === 'updated'
    return `${startStr}-${endStr()}${space.repeat(depth)}+${endStr(1)}`;
  }, '');
  return `{\n${result}${space.repeat(depth - 1)}}`;
};

export default makeDiffStr;
