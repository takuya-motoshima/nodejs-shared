<!-- # nodejs-shared -->
Essential Node.js utilities, shared and ready to use. 

A comprehensive list of changes in each version may be found in the [CHANGELOG](https://github.com/takuya-motoshima/nodejs-shared/blob/main/CHANGELOG.md).

* [nodejs-shared Documentation](https://takuya-motoshima.github.io/nodejs-shared/)

    <img src="https://raw.githubusercontent.com/takuya-motoshima/nodejs-shared/refs/heads/main/typedoc.jpeg" width="800">
* [github.com/takuya-motoshima/nodejs-shared](https://github.com/takuya-motoshima/nodejs-shared)

 **Requirements**:

* **Node.js version:** 18 or higher.
* **ImageMagick:** Required for `ImageUtils` class methods that retrieve the first frame of a GIF and count GIF frames.

**Table of contents:**

- [Quickstart](#quickstart)
  - [Installing the library](#installing-the-library)
  - [Using the library](#using-the-library)
- [Testing](#testing)
- [Release Notes](#release-notes)
- [Author](#author)
- [License](#license)

## Quickstart
### Installing the library
```bash
npm install --save nodejs-shared
```

### Using the library
```js
import {ProcessUtils, FileUtils} from 'nodejs-shared';

// Get the UID for the user 'ec2-user'.  Example: Returns 1000.
const uid = ProcessUtils.getUid('ec2-user');

// Get the GID for the user 'ec2-user'.  Example: Returns 1000.
const gid = ProcessUtils.getGid('ec2-user');

// Print the UID and GID.
console.log(`UID: ${uid}, GID: ${gid}`);

// Write a string to a file.
FileUtils.write('path/to/another-file.txt', 'Hello, world!');

// Write a Buffer to a file.
const buffer = Buffer.from('Hello, world!');
FileUtils.write('path/to/file.txt', buffer);

// Write to a file, specifying file mode, owner, and group.
// mode: 0o644 (read/write for owner, read-only for group and others)
// owner: Sets the file owner to the 'nginx' user and group.
FileUtils.write('path/to/file.txt', buffer, {
  mode: 0o644,
  owner: {username: 'nginx', groupName: 'nginx'},
});

// Parse a data URL to extract its MIME type, base64 encoded data, file extension, and size.
const dataUrlParts = MediaUtils.parseDataUrl('data:image/jpeg;base64,AA==...'); 
console.log(dataUrlParts);
// {
//   mimeType: 'image/jpeg',
//   base64: '/9j/4AAQSk...',
//   extension: 'jpg',
//   bytesize: 45056
// }

// Write a JPEG image to a file using a data URL.
MediaUtils.writeDataUrl('path/to/image.jpg', 'data:image/jpeg;base64,AA==...');

// Write a JPEG image to a file, specifying file mode, owner, and group.
// mode: 0o644 (read/write for owner, read-only for group and others)
// owner: Sets the file owner to the 'nginx' user and group.
MediaUtils.writeDataUrl('path/to/image.jpg', 'data:image/jpeg;base64,AA==...', {
  mode: 0o644,
  owner: {username: 'nginx', groupName: 'nginx'},
});
```

## Testing
With [npm](http://npmjs.org) do:

```sh
npm test
```

## Release Notes
All changes can be found [here](CHANGELOG.md).

## Author
**Takuya Motoshima**

* [github/takuya-motoshima](https://github.com/takuya-motoshima)
* [twitter/TakuyaMotoshima](https://twitter.com/TakuyaMotoshima)
* [facebook/takuya.motoshima.7](https://www.facebook.com/takuya.motoshima.7)

## License
[MIT](LICENSE)