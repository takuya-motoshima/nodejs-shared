const {File} = require('../dist/build.common');
const loadEnv = require('./support/loadEnv');

beforeAll(() => {
  loadEnv();
});

test('If the environment variable `TMPDIR` is `/var/tmp`, the tmp path should start with `/var/tmp/`', () => {
  expect(File.getTmpPath().startsWith('/var/tmp/')).toBe(true);
});

test('If the environment variable `TMPDIR` is `/var/tmp`, the tmp path with extension should start with `/var/tmp/`.', () => {
  expect(File.getTmpPath('txt').startsWith('/var/tmp/')).toBe(true);
});

test('Without the `TMPDIR` environment variable, the tmp path should start with `/tmp/`', () => {
  delete process.env.TMPDIR;
  expect(File.getTmpPath().startsWith('/tmp/')).toBe(true);
});