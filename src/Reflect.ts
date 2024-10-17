/**
 * Interface for retrieving reflective information about classes and objects.
 */
export default class {
  /**
   * Find static methods from the class.
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