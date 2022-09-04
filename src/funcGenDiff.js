import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const getFullPath = (strPath) => path.resolve(process.cwd(), strPath);
const readFile = (strPath) => fs.readFileSync(getFullPath(strPath), 'utf-8');
const makePathtoObj = (strPath) => JSON.parse(readFile(strPath));

const genDiff = (strPath1, strPath2) => {
  const obj1 = makePathtoObj(strPath1);
  const obj2 = makePathtoObj(strPath2);

  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);

  const unicKeys = _.sortBy(_.union(keys1, keys2));

  const result = unicKeys.reduce((acc, item) => {
    if (item in obj1) {
      if (item in obj2) {
        if (obj1[item] === obj2[item]) {
          // there are identical in two objects
          return `${acc}   ${item}: ${obj1[item]}\n`;
        }
        // different properties
        return `${acc} - ${item}: ${obj1[item]}\n + ${item}: ${obj2[item]}\n`;
      }
      // is only in the first
      return `${acc} - ${item}: ${obj1[item]}\n`;
    }
    // is only in the second
    return `${acc} + ${item}: ${obj2[item]}\n`;
  }, '');
  return `{\n${result}}`;
};

export default genDiff;
