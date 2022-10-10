const {Media} = require('../dist/build.common.js');

const mimeType = Media.getMimeTypeFromDataUrl('data:image/png;base64,abc...');
console.log(`mimeType=${mimeType}`);

let extension = Media.getExtensionFromDataUrl('data:image/png;base64,abc...');
console.log(`extension=${extension}`);

extension = Media.getExtensionFromDataUrl('data:image/jpeg;base64,abc...');
console.log(`extension=${extension}`);

// Writes DataURL to a file with the specified extension.
Media.writeDataUrlToFile('test1.png', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==');

// Writes DataURL to files with extensions detected automatically.
const writtenFilePath = Media.writeDataUrlToFile('test2', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQYV2NgYGD4DwABBAEAcCBlCwAAAABJRU5ErkJggg==');
console.log(writtenFilePath);
// =>test2.png
