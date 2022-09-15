import makeDiffStr from './stylish.js';
import iter from './plain.js';

const pickFormat = (format, tree) => {
  if (format === 'plain') return iter(tree);
  return makeDiffStr(tree);
};

export default pickFormat;
