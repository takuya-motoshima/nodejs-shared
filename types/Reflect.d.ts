/**
 * Interface for retrieving reflective information about classes and objects.
 */
export default class {
    /**
     * Find static methods from the class.
     *
     * @static
     * @param {any} clazz Class.
     * @return {Set<string>} Static method name list.
     */
    static getStaticMethods(clazz: any): Set<string>;
    /**
     * Find a method from an instance.
     *
     * @static
     * @param {any} instance Class instance.
     * @return {Set<string>} Instance method name list.
     */
    static getMethods(instance: any): Set<string>;
}
