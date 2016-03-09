/**
 * This file is part of the angular-symfony-acl package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import {AccessServiceProvider} from "./provider/AccessServiceProvider";
import {run as aclRun} from "./configs/acl";

(function (root, factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module !== 'undefined' && typeof module.exports === 'object') {
        module.exports = factory(require('angular'));
    } else {
        return factory(root.angular);
    }
}(this, repository));

function repository(angular) {
    'use strict';

    var moduleName = 'vSymfonyACL';

    angular
        .module(moduleName, [])
        .provider("AccessService", AccessServiceProvider)
        .run(aclRun)
    ;

    return moduleName;
}