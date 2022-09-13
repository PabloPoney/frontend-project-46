import { test, expect } from '@jest/globals';
import genDiff from '../src/funcGenDiff.js';

const expectFlatObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectNestedObj = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

test('Diff bettwen two flat JSON', () => {
  expect(genDiff('__fixtures__/file1.JSON', '__fixtures__/file2.JSON')).toBe(expectFlatObj);
});

test('Diff bettwen two flat yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(expectFlatObj);
});

test('Diff bettwen two flat yaml', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toBe(expectFlatObj);
});

test('Diff bettwen two nested JSON', () => {
  expect(genDiff('__fixtures__/nestedFile1.JSON', '__fixtures__/nestedFile2.JSON')).toBe(expectNestedObj);
});

test('Diff bettwen two nested yaml', () => {
  expect(genDiff('__fixtures__/nestedFile1.yaml', '__fixtures__/nestedFile2.yaml')).toBe(expectNestedObj);
});

// NODE_OPTIONS=--experimental-vm-modules npx jest
