import {validators} from '../../dist/build.mjs';

test.each([
  ['abc', {}, true],
  ['ABC', {}, true],
  ['FoObar', {}, true],
  ['abc1', {}, false],
  ['  foo  ', {}, false],
  ['', {}, false],
  ['ÄBC', {}, false],
  ['FÜübar', {}, false],
  ['Jön', {}, false],
  ['Heiß', {}, false],
  ['en-US', {ignore: '- /'}, true],
  ['this is a valid alpha string', {ignore: '- /'}, true],
  ['us/usa', {ignore: '- /'}, true],
  ['en-US', {ignore: /[\s/-]/g}, true],
  ['this is a valid alpha string', {ignore: /[\s/-]/g}, true],
  ['us/usa', {ignore: /[\s/-]/g}, true],
  ['1. this is not a valid alpha string', {ignore: '- /'}, false],
  ['this$is also not a valid.alpha string', {ignore: '- /'}, false],
  ['this is also not a valid alpha string.', {ignore: '- /'}, false],
  ['1. this is not a valid alpha string', {ignore: /[\s/-]/g}, false],
  ['this$is also not a valid.alpha string', {ignore: /[\s/-]/g}, false],
  ['this is also not a valid alpha string.', {ignore: /[\s/-]/g}, false],
])('validators.isAlpha("%s", "%s") should return %s', (received, options, expected) => {
  expect(validators.isAlpha(received, options)).toBe(expected);
});