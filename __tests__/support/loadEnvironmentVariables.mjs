import path from 'node:path';
import url from 'node:url';
import * as dotenv from 'dotenv'

// Extract the directory portion of the URL.  This is the equivalent of __dirname in CommonJS.
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * Loads environment variables from a .env file.
 */
export default () => {
  dotenv.config({path: path.join(__dirname, '../.env')});
}