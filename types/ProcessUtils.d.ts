/**
 * A utility class for retrieving user and group information.
 */
export default class {
    /**
     * Gets the UID for a given username.
     * @example
     * import {ProcessUtils} from 'nodejs-shared';
     *
     * ProcessUtils.getUid('ec2-user');// 1000
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
     * ProcessUtils.getGid('ec2-user');// 1000
     * @param {string} groupName The group name to look up.
     * @return {number} The GID.
     * @throws {Error} If the group name is not found or another error occurs.
     */
    static getGid(groupName: string): number;
}
