import * as lib from './Node';

test('对 value 字段测试', () => {
  expect(lib.getVal('a')).toBe('"a"');

  expect(lib.getVal('2')).toBe('2');

  expect(lib.getVal('2.3')).toBe('2.3');

  expect(lib.getVal('true')).toBe('true');
  expect(lib.getVal(true)).toBe('true');

  expect(lib.getVal('false')).toBe('false');
});
