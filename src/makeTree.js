import _ from 'lodash';

export const makeDiffTree = (data1, data2) => {
  const dataKeys1 = _.keys(data1);
  const dataKeys2 = _.keys(data2);

  const unicKeys = _.sortBy(_.union(dataKeys1, dataKeys2));

  return unicKeys.map((key) => {
    if (!dataKeys1.includes(key)) {
      return { key, value: [data2[key]], status: 'added' };
    }
    if (!dataKeys2.includes(key)) {
      return { key, value: [data1[key]], status: 'remooved' };
    }
    if (_.isEqual(data1[key], data2[key])) {
      return { key, value: [data1[key]], status: 'nochenged' };
    }
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return { key, children: makeDiffTree(data1[key], data2[key]), status: 'nested' };
    }
    return { key, value: [data1[key], data2[key]], status: 'updated' };
  });
};

export const getChildren = (node) => node.children;
export const getKey = (node) => node.key;
export const getValue = (node) => node.value;
export const getStatus = (node) => node.status;
