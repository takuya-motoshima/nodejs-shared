import fs from 'node:fs';
import path from 'node:path';
import url from 'node:url';
import {parse} from 'csv-parse/sync';

// Extract the directory portion of the URL.  This is the equivalent of __dirname in CommonJS.
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * Reads data from a CSV file and returns the first column as an array.
 * @param {string} fileName The name of the CSV file.
 * @return {string[]} An array containing the values from the first column of the CSV file.
 */
export default fileName => {
  const filePath = path.join(__dirname, '../inputs', fileName);
  const csvData = fs.readFileSync(filePath, 'utf-8');
  const records = parse(csvData);
  return records.map((record) => record[0]);
}