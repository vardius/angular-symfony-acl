/**
 * This file is part of the angular-symfony-acl package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {AccessService} from "../services/AccessService";

export class AccessServiceProvider {

    /**
     * Inject dependencies
     */
    constructor() {
        this.config = {
            rolesHierarchy: {
                1: 'ROLE_USER',
                2: 'ROLE_ADMIN',
                3: 'ROLE_SUPER_ADMIN'
            },
            storage: 'sessionStorage', //localStorage
            storageKey: 'AccessService'
        };
    }

    /**
     * Configure factory
     *
     * @param config
     */
    configure(config) {
        for (let attr in config) {
            if (config.hasOwnProperty(attr)) {
                this.config[attr] = config[attr];
            }
        }
    }

    /**
     * Get factory
     *
     * @returns {AccessService}
     */
    $get() {
        return new AccessService(this.config);
    }
}