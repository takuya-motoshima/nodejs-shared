/**
 * Interface for retrieving reflective information about classes and objects.
 */
export default class {
    /**
     * Find static methods from the class.
     */
    static getStaticMethods(clazz: any): Set<string>;
    /**
     * Find a method from an instance.
     */
    static getMethods(instance: any): Set<string>;
}
