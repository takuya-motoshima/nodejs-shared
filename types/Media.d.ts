export default class Media {
    /**
     * Write data URL to a file.
     * If the file path does not have an extension, the extension determined from DataURL is automatically assigned to the file path.
     * This method returns the path to the written file.
     */
    static writeDataUrlToFile(filePath: string, dataUrl: string, permission?: number): Media;
    /**
     * Convert data URL to blob data in base64 format.
     */
    static dataUrlToBase64(dataUrl: string): string;
    /**
     * Check if the string is in data URL format.
     */
    static isDataUrl(dataUrl: string): boolean;
    /**
     * Obtain the MIME type and base64 from the data URL string.
     */
    static statDataUrl(dataUrl: string): {
        blob: string;
        type: string;
    } | undefined;
    /**
     * Obtain the dimensions (pixels) of the image.
     */
    static getDimensions(filePath: string): {
        width: number;
        height: number;
    } | null;
    /**
     * Crop from image.
     */
    static crop(input: string, output: string, { left, top, width, height }: {
        left: number;
        top: number;
        width: number;
        height: number;
    }): Promise<void>;
    /**
     * Resize the image.
     */
    static resize(input: string, { width, height, output, contain }: {
        width?: number;
        height?: number;
        output?: string;
        contain?: boolean;
    }): Promise<void>;
    /**
     * Get the byte size of data URL.
     *
     * x = (n * (3/4)) - y
     * Where:
     * 1. x is the size of a file in bytes
     * 2. n is the length of the Base64 String
     * 3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.
     */
    static dataUrlByteSize(dataUrl: string): number;
    /**
     * Get base64 byte size.
     *
     * x = (n * (3/4)) - y
     * Where:
     * 1. x is the size of a file in bytes
     * 2. n is the length of the Base64 String
     * 3. y will be 2 if Base64 ends with '==' and 1 if Base64 ends with '='.
     */
    static base64ByteSize(base64: string): number;
    /**
     * Get Mime type from data URL.
     */
    static getMimeTypeFromDataUrl(dataUrl: string): string | null;
    /**
     * Get extension from data URL.
     */
    static getExtensionFromDataUrl(dataUrl: string): string | null;
}
