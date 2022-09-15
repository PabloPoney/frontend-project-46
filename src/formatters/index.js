import makeDiffStr from './stylish.js';
import makeDiffStr2 from './plain.js';
import makeDiffStr3 from './json.js';

const pickFormat = (format, tree) => {
  if (format === 'plain') return makeDiffStr2(tree);
  if (format === 'json') return makeDiffStr3(tree);
  return makeDiffStr(tree);
};

export default pickFormat;
