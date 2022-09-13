import fs from 'fs';
import path from 'path';
import { load } from 'js-yaml';

const parsers = {
  json: JSON.parse,
  yml: load,
  yaml: load,
};

const pickParser = (data, format) => parsers[format](data);

export const getFullPath = (strPath) => path.resolve(process.cwd(), strPath);

export const readFile = (strPath) => {
  const data = fs.readFileSync(getFullPath(strPath), 'utf-8');
  const [, format] = strPath.toLowerCase().split('.');
  return [data, format];
};

export const makePathtoObj = (strPath) => pickParser(...readFile(strPath));
