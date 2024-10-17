/**
 * A utility class for retrieving user and group information.
 */
export default class {
    /**
    * Gets the UID for a given username.
    * @param {string} username The username to look up.
    * @return {number|undefined} The UID.
    * //@return {number|undefined} The UID, or undefined if not found.
    * @throws {Error} If the username is not found or another error occurs.
    * //@throws {Error} If an error occurs during execution
    */
    static getUid(username: string): number;
    /**
    * Gets the GID for a given group name.
    * @param {string} groupName The group name to look up.
    * @return {number} The GID.
    * //@return {number} The GID, or undefined if not found.
    * @throws {Error} If the group name is not found or another error occurs.
    * //@throws {Error} If an error occurs during execution
    */
    static getGid(groupName: string): number;
}
