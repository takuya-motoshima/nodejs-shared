export default class Media {
    /**
     * Write DataURL to a file.
     */
    static writeDataUrlToFile(filePath: string, dataUrl: string, permission?: number): Media;
    /**
     * Convert DataURL to blob data in base64 format.
     */
    static dataUrlToBase64(dataUrl: string): string;
    /**
     * Check if the string is in DataURL format.
     */
    static isDataUrl(dataUrl: string): boolean;
    /**
     * Obtain the MIME type and base64 from the DataURL string.
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
     * Get the byte size of DataURL.
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
}
