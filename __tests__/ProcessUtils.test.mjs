import {ProcessUtils} from '../dist/build.mjs';

const validUser = 'ec2-user';
const invalidUser = 'invaliduser';
const validGroup = 'ec2-user';
const invalidGroup = 'invalidgroup';

describe('getUid', () => {
  test('should return the UID for a valid username', () => {
    expect(ProcessUtils.getUid(validUser)).toBe(1000);
  });

  test('should throw an error for an invalid username', () => {
    expect(() => ProcessUtils.getUid(invalidUser)).toThrow();
  });
});

describe('getGid', () => {
  test('should return the GID for a valid group name', () => {
    expect(ProcessUtils.getGid(validGroup)).toBe(1000);
  });

  test('should throw an error for an invalid group name', () => {
    expect(() => ProcessUtils.getGid(invalidGroup)).toThrow();
  });
});