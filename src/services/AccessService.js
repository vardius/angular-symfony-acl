/**
 * This file is part of the angular-symfony-acl package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

export class AccessService {
    /**
     * @param config
     */
    constructor(config) {
        this.config = config;
    }

    compareRoleArrays(roles, userRoles) {
        for (var i = 0; i < userRoles.length; i++) {
            for (var j = 0; j < roles.length; j++) {
                if (userRoles[i] === roles[j]) return true;
            }
        }

        return false
    }

    setUser(data) {
        window[this.config.storage].setItem(this.config.storageKey, JSON.stringify(data));
    }

    getUser() {
        var data = window[this.config.storage].getItem(this.config.storageKey);
        return (data) ? JSON.parse(data) : false;
    }

    getUserAccessLevel(user) {
        if (user) {
            var roles = [1];
            for (var key in user.roles) {
                if (user.roles.hasOwnProperty(key)) {
                    roles.push(this.getRoleAccessLevel(user.roles[key]));
                }
            }

            return Math.max.apply(null, roles);
        }

        return 0;
    }

    getMaxRole(user) {
        var accessLevel = this.getUserAccessLevel(user);

        if (accessLevel > 0) {
            return this.config.rolesHierarchy[accessLevel];
        }

        return '';
    }

    getRoleAccessLevel(value) {
        for (var prop in this.config.rolesHierarchy) {
            if (this.config.rolesHierarchy.hasOwnProperty(prop)) {
                if (this.config.rolesHierarchy[prop] === value)
                    return prop;
            }
        }
    }
}