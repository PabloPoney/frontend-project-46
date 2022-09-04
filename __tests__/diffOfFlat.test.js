import { test, expect } from '@jest/globals';
import genDiff from '../src/funcGenDiff.js';

const expectObj = `{
 - follow: false
   host: hexlet.io
 - proxy: 123.234.53.22
 - timeout: 50
 + timeout: 20
 + verbose: true
}`;

test('Diff bettwen two flat JSON', () => {
  expect(genDiff('__fixtures__/file1.JSON', '__fixtures__/file2.JSON')).toBe(expectObj);
});

test('Diff bettwen two flat yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(expectObj);
});

// NODE_OPTIONS=--experimental-vm-modules npx jest
