import { test, expect } from '@jest/globals';
import genDiff from '../src/funcGenDiff.js';

const expectedFlatObj = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const expectedNestedObj = `{
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

const expectedPlainFormat = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

test('Diff bettwen two flat JSON', () => {
  expect(genDiff('__fixtures__/file1.JSON', '__fixtures__/file2.JSON')).toBe(expectedFlatObj);
});

test('Diff bettwen two flat yml', () => {
  expect(genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toBe(expectedFlatObj);
});

test('Diff bettwen two flat yaml', () => {
  expect(genDiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toBe(expectedFlatObj);
});

test('Diff bettwen two nested JSON', () => {
  expect(genDiff('__fixtures__/nestedFile1.JSON', '__fixtures__/nestedFile2.JSON')).toBe(expectedNestedObj);
});

test('Diff bettwen two nested yaml', () => {
  expect(genDiff('__fixtures__/nestedFile1.yaml', '__fixtures__/nestedFile2.yaml')).toBe(expectedNestedObj);
});

test('Diff bettwen two nested JSON with plain format', () => {
  expect(genDiff('__fixtures__/nestedFile1.JSON', '__fixtures__/nestedFile2.JSON', 'plain')).toBe(expectedPlainFormat);
});

// NODE_OPTIONS=--experimental-vm-modules npx jest
