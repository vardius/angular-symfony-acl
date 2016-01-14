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
            if (next.hasOwnProperty('requireLogin') && next.requireLogin) {
                var currentUser = AccessService.getUser();
                if (currentUser && currentUser.hasOwnProperty('roles')) {
                    if (next.hasOwnProperty('roles')) {
                        if (typeof next.roles === 'string') {
                            if (currentUser.roles.indexOf(next.roles) == -1) {
                                alert("You dont have access to see this page!");
                                event.preventDefault();
                            }
                        } else if (next.roles instanceof Array) {
                            if (!AccessService.compareRoleArrays(currentUser.roles, next.roles)) {
                                alert("You dont have access to see this page!");
                                event.preventDefault();
                            }
                        }
                    }
                } else {
                    alert("You dont have access to see this page!");
                    event.preventDefault();
                }
            }
        });
        $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
            if (toState.hasOwnProperty('requireLogin') && toState.requireLogin) {
                var currentUser = AccessService.getUser();
                if (currentUser && currentUser.hasOwnProperty('roles')) {
                    if (toState.hasOwnProperty('roles')) {
                        if (typeof toState.roles === 'string') {
                            if (currentUser.roles.indexOf(toState.roles) == -1) {
                                alert("You dont have access to see this page!");
                                event.preventDefault();
                            }
                        } else if (toState.roles instanceof Array) {
                            if (!AccessService.compareRoleArrays(currentUser.roles, toState.roles)) {
                                alert("You dont have access to see this page!");
                                event.preventDefault();
                            }
                        }
                    }
                } else {
                    alert("You dont have access to see this page!");
                    event.preventDefault();
                }
            }
        });
    }

})();
