import {execSync} from 'node:child_process';

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
  static getUid(username: string): number {
    try {
      const stdout = execSync(`id -u ${username} 2>/dev/null`);
      const uid = parseInt(stdout.toString().trim(), 10);
      if (isNaN(uid))
        throw new Error(`User ${username} not found.`);
        // return undefined;

      // Return the UID if the conversion to number is successful.
      return uid;
    } catch (error: any) {
      throw new Error(`Failed to get uid for ${username}: ${error.message}`);
    }
  }

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
  static getGid(groupName: string): number {
    try {
      const stdout = execSync(`getent group ${groupName}|cut -d: -f3 2>/dev/null`);
      const gid = parseInt(stdout.toString().trim(), 10);
      if (isNaN(gid))
        throw new Error(`Group ${groupName} not found.`);
        // return undefined;

      // Return the GID if the conversion to number is successful.
      return gid;
    } catch (error: any) {
      throw new Error(`Failed to get gid for ${groupName}: ${error.message}`);
    }
  }
}