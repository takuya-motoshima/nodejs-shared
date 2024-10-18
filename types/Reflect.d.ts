/**
 * Interface for retrieving reflective information about classes and objects.
 * @hideconstructor
 */
export default class {
    /**
     * Find static methods from the class.
     * @example
     * import {Reflect} from 'nodejs-shared';
     *
     * class Dog {
     *   name;
     *
     *   constructor(name) {
     *     this.name = name;
     *   }
     *
     *   bark() {
     *     return "Woof!";
     *   }
     *
     *   static isDog(animal) {
     *     return animal instanceof Dog;
     *   }
     *
     *   static createDog(name) {
     *     return new Dog(name);
     *   }
     * }
     *
     * Reflect.getStaticMethods(Dog);// {'isDog', 'createDog'};
     * @param {any} clazz Class.
     * @return {Set<string>} Static method name list.
     */
    static getStaticMethods(clazz: any): Set<string>;
    /**
     * Find a method from an instance.
     * @example
     * import {Reflect} from 'nodejs-shared';
     *
     * class Dog {
     *   name;
     *
     *   constructor(name) {
     *     this.name = name;
     *   }
     *
     *   bark() {
     *     return "Woof!";
     *   }
     *
     *   static isDog(animal) {
     *     return animal instanceof Dog;
     *   }
     *
     *   static createDog(name) {
     *     return new Dog(name);
     *   }
     * }
     *
     * Reflect.getMethods(new Dog);// {'constructor', 'bark'};
     * @param {any} instance Class instance.
     * @return {Set<string>} Instance method name list.
     */
    static getMethods(instance: any): Set<string>;
}
