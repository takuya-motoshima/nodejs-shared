/**
 * ```sh
 * node prototypes/is-file.js
 * ```
 */
const path = require('path');
function isPath(str) {
  if (typeof str !== 'string' || str.replace(/^[\s　]+|[\s　]+$/g, '') === '')
    return false;
  const rootPath = path.parse(str).root;
  if (rootPath)
    str = str.slice(rootPath.length);
  return !/[<>:"|?*]/.test(str);
};

for (let str of [
  '.',
  'aa',
  'abc.js',
  '/abc/def/ghi.js',
  'abc/def/ghi.js',
  '*.js',
  '!*.js',
  '!foo',
  '!foo.js',
  '**/abc.js',
  'abc/*.js',
])
  console.log(`${str} is ${isPath(str) ? 'valid' : 'invalid'}`);