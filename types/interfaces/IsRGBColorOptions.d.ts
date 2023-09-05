/**
 * RGB color validate option.
 */
export default interface IsRGBColorOptions {
    /**
     * If true, allow percentages of rgb or rgba values, such as rgb(5%,5%,5%) or rgba(90%,90%,90%,.3). Default is true.
     */
    includePercentValues?: boolean;
}
