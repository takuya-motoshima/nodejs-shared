/**
 * PDF Utility.
 */
export default class {
    /**
     * Get the total number of pages in the PDF document.
     *
     * @param {string}    filePath  Path of the PDF file.
     * @returns {Promise<number>}   Total number of pages in the PDF document.
     */
    static getTotalNumberOfPages(filePath: string): Promise<number>;
    /**
     * Write a thumbnail for each page of the PDF document.
     */
    static writeThumbnails(filePath: string, thumbnailPath: string): Promise<void>;
}
