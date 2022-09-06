import { getChildren, getKey, getStatus, getValue } from "./makeTree.js"
import _ from 'lodash';

const makeObjToStr = (data, depth) => {
  if (!_.isObject(data)) return data;
  const space = '    '.repeat(depth);
  const result = Object.entries(data)
    .map(([key, value]) => `${space}${key}: ${makeObjToStr(value, depth + 1)}\n`)
    .join('');
  return `{\n${result}${'    '.repeat(depth - 1)}}`;
}

export const makeDiffStr = (tree, depth = 1, space = '  ') => {
  const result = tree.reduce((acc, node) => {
    const startStr = `${acc}${space.repeat(depth)}`;
    const endStr = (item = 0) => ` ${getKey(node)}: ${makeObjToStr(getValue(node)[item], depth + 1)}\n`;

    // makeDiffStr(getValue(node), depth + 1)

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
      return `${startStr}  ${getKey(node)}: ${makeDiffStr(getChildren(node), depth + 1)}\n`;
    }
    if (getStatus(node) === 'updated') {
      return `${startStr}-${endStr()}${space.repeat(depth)}+${endStr(1)}`
    }
  }, '');
  return `${space.repeat(depth - 1)}{\n${result}${space.repeat(depth - 1)}}`;
}
