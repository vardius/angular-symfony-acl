/**
 * This file is part of the symfony-acl package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */
(function () {
    'use strict';

    angular
        .module('symfony-acl', [])
        .run(['$rootScope', 'AccessService', run])
    ;

    function run($rootScope, AccessService) {
        $rootScope.$on("$routeChangeStart", function (event, next, current) {
            if (next.requireLogin) {
                var userAccessLevel = 0;
                var roleAccessLevel = 1;

                var currentUser = AccessService.getUser();
                if (currentUser) {
                    userAccessLevel = AccessService.getUserAccessLevel(currentUser);
                    roleAccessLevel = AccessService.getRoleAccessLevel(next.role);
                }

                if (roleAccessLevel < userAccessLevel) {
                    alert("You need to be authenticated to see this page!");
                    event.preventDefault();
                }
            }
        });
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.requireLogin) {
                var userAccessLevel = 0;
                var roleAccessLevel = 1;

                var currentUser = AccessService.getUser();
                if (currentUser) {
                    userAccessLevel = AccessService.getUserAccessLevel(currentUser);
                    roleAccessLevel = AccessService.getRoleAccessLevel(toState.role);
                }

                if (roleAccessLevel < userAccessLevel) {
                    alert("You need to be authenticated to see this page!");
                    event.preventDefault();
                }
            }
        });
    }

})();
