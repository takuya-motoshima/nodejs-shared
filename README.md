<!-- # nodejs-shared -->
Essential Node.js utilities, shared and ready to use. 

## Installation
```bash
npm install --save nodejs-shared
```

## Requirements
- [ImageMagick](https://imagemagick.org/index.php) is required to use the methods to retrieve the first frame of a GIF in the Media class and to get the number of frames in a GIF.  
    In Mac OS X, you can simply use [Homebrew](https://brew.sh/) and do:
    ```bash
    brew install imagemagick
    ```

    Confirmation of installation results.
    ```bash
    convert -version
    ```

## API

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