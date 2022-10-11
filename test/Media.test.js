const {Media} = require('../dist/build.common.js');

// Get the Mime type of the PNG image data URL.
let mimeType = Media.getMimeTypeFromDataUrl('data:image/png;base64,abc...');
console.log(`Mime type of PNG image data URL: ${mimeType}`);
// =>Mime type of PNG image data URL: image/png

// Get the Mime type of SVG image data URL.
mimeType = Media.getMimeTypeFromDataUrl('data:image/svg+xml;utf8,abc...');
console.log(`Mime type of SVG image data URL: ${mimeType}`);
// =>Mime type of SVG image data URL: image/svg+xml

// Get PNG image extension.
let extension = Media.getExtensionFromDataUrl('data:image/png;base64,abc...');
console.log(`PNG image extension: ${extension}`);
// =>PNG image extension: png

// Get JPG image extension.
extension = Media.getExtensionFromDataUrl('data:image/jpeg;base64,abc...');
console.log(`JPG image extension: ${extension}`);
// =>JPG image extension: jpg

// Get SVG image extension.
extension = Media.getExtensionFromDataUrl('data:image/svg+xml;utf8,abc...');
console.log(`SVG image extension: ${extension}`);
// =>SVG image extension: svg

// Writes DataURL to a file with the specified extension.
let writtenFilePath = Media.writeDataUrlToFile('test1.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGBg+A8AAQQBAHAgZQsAAAAASUVORK5CYII=');
console.log(`Write ${writtenFilePath}`);
// =>Write test1.png

// Writes DataURL to files with extensions detected automatically.
writtenFilePath = Media.writeDataUrlToFile('test2', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdjYGBg+A8AAQQBAHAgZQsAAAAASUVORK5CYII=');
console.log(`Write ${writtenFilePath}`);
// =>Write test2.png

// Writes DataURL to files with extensions detected automatically.
writtenFilePath = Media.writeDataUrlToFile('test3', 'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221%22%20height%3D%221%22%20style%3D%22background%3A%20rgb(0%2C%200%2C%200)%3B%22%3E%3C%2Fsvg%3E');
console.log(`Write ${writtenFilePath}`);
// =>Write test3.svg