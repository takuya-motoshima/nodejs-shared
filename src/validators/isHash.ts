import validator from 'validator';

/**
 * Checks if the given string is a valid hash for the specified algorithm.
 * @param {string} value The string to validate.
 * @param {'md4'|'md5'|'sha1'|'sha256'|'sha384'|'sha512'|'ripemd128'|'ripemd160'|'tiger128'|'tiger160'|'tiger192'|'crc32'|'crc32b'} algorithm The hash algorithm to check against.
 * @return {boolean} True if the string is a valid hash for the specified algorithm, false otherwise.
 */
export default (value: string, algorithm: 'md4'|'md5'|'sha1'|'sha256'|'sha384'|'sha512'|'ripemd128'|'ripemd160'|'tiger128'|'tiger160'|'tiger192'|'crc32'|'crc32b'): boolean => {
  return validator.isHash(value, algorithm);
}