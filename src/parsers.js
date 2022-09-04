import fs from 'fs';
import path from 'path';

export const getFullPath = (strPath) => path.resolve(process.cwd(), strPath);
export const readFile = (strPath) => fs.readFileSync(getFullPath(strPath), 'utf-8');
export const makePathtoObj = (strPath) => JSON.parse(readFile(strPath));
