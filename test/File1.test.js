const {File} = require('../dist/build.common.js');

const uploadDir = `${__dirname}/upload`;
// const uploadDir = `upload`;

// Find all files.
let list = File.find(`${uploadDir}/*.*`);
console.log('All files:', list);
// All files: [
//   'upload/test1.png',
//   'upload/test2.png',
//   'upload/test3.svg',
//   'upload/test4.jpg'
// ]

// Find all files, including subdirectories.
list = File.find(`${uploadDir}/**/*.*`);
console.log('All files, including subdirectories:', list);
// All files, including subdirectories: [
//   'upload/subdirectory/test5.png',
//   'upload/test1.png',
//   'upload/test2.png',
//   'upload/test3.svg',
//   'upload/test4.jpg'
// ]

// Find only files with specific extensions.
list = File.find(`${uploadDir}/**/*.png`);
console.log('Only files with specific extensions:', list)
// Only files with specific extensions: [
//   'upload/subdirectory/test5.png',
//   'upload/test1.png',
//   'upload/test2.png'
// ]

// Find only JPG and PNG.
list = File.find(`${uploadDir}/**/*.+(png|jpg)`);
console.log('JPG and PNG only:', list);
// JPG and PNG only: [
//   'upload/subdirectory/test5.png',
//   'upload/test1.png',
//   'upload/test2.png',
//   'upload/test4.jpg'
// ]