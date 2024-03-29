/**
 * Check if it is a hash of the specified algorithm.
 * @param {string} value Value to be validated.
 * @param {'md4'|'md5'|'sha1'|'sha256'|'sha384'|'sha512'|'ripemd128'|'ripemd160'|'tiger128'|'tiger160'|'tiger192'|'crc32'|'crc32b'} algorithm Hash algorithm.
 * @return {boolean} True for pass, false for fail.
 */
declare const _default: (value: string, algorithm: 'md4' | 'md5' | 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'ripemd128' | 'ripemd160' | 'tiger128' | 'tiger160' | 'tiger192' | 'crc32' | 'crc32b') => boolean;
export default _default;
