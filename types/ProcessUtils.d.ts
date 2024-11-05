/**
 * A utility class for retrieving user and group information.
 * @hideconstructor
 */
export default class {
    /**
     * Gets the UID for a given username.
     * @example
     * import {ProcessUtils} from 'nodejs-shared';
     *
     * // Get the UID for the user 'ec2-user'.  Example: Returns 1000.
     * ProcessUtils.getUid('ec2-user');
     * @param {string} username The username to look up.
     * @return {number|undefined} The UID.
     * @throws {Error} If the username is not found or another error occurs.
     */
    static getUid(username: string): number;
    /**
     * Gets the GID for a given group name.
     * @example
     * import {ProcessUtils} from 'nodejs-shared';
     *
     * // Get the GID for the user 'ec2-user'.  Example: Returns 1000.
     * ProcessUtils.getGid('ec2-user');
     * @param {string} groupName The group name to look up.
     * @return {number} The GID.
     * @throws {Error} If the group name is not found or another error occurs.
     */
    static getGid(groupName: string): number;
}
