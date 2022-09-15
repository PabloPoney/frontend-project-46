import _ from 'lodash';
import {
  getChildren, getKey, getStatus, getValue,
} from '../makeTree.js';

const isComplexValue = (data) => {
  if (_.isObject(data)) return '[complex value]';
  if (typeof data === 'string') return `'${data}'`;
  return data;
};

const makeDiffStr2 = (tree) => {
  const iter = (subTree, path = '') => {
    const subResult = subTree.reduce((acc, node) => {
      const startStr = `${acc}Property '${path}${getKey(node)}'`;
      const valueStr = (item = 0) => `${isComplexValue(getValue(node)[item])}`;

      if (getStatus(node) === 'added') {
        return `${startStr} was added with value: ${valueStr()}\n`;
      }
      if (getStatus(node) === 'remooved') {
        return `${startStr} was removed\n`;
      }
      if (getStatus(node) === 'nested') {
        return `${acc}${iter(getChildren(node), `${path}${getKey(node)}.`)}`;
      }
      if (getStatus(node) === 'updated') {
        return `${startStr} was updated. From ${valueStr()} to ${valueStr(1)}\n`;
      }
      // getStatus(node) === 'nochenged'
      return acc;
    }, '');
    return subResult;
  };
  const result = iter(tree);
  return result.substring(0, result.length - 1);
};

export default makeDiffStr2;
