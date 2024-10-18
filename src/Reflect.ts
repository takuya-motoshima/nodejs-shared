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
  public static getStaticMethods(clazz: any): Set<string> {
    const methods = new Set<string>();
    for(let obj = clazz; obj !== null && typeof obj.__proto__! === 'function'; obj = Object.getPrototypeOf(obj)) {
      let names = Object.getOwnPropertyNames(obj).filter(prop => {
        try {
          return typeof obj[prop] === 'function';
        } catch {}
        return false;
      });
      names.forEach(i => methods.add(i));
    }
    return methods;
  }

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
  public static getMethods(instance: any): Set<string> {
    const methods = new Set<string>();
    for(let obj = Object.getPrototypeOf(instance); obj !== null && obj.__proto__! !== null; obj = Object.getPrototypeOf(obj)) {
      let names = Object.getOwnPropertyNames(obj)
      names.forEach(i => methods.add(i));
    }
    return methods;
  }
}