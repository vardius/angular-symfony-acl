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
        .provider('AccessService', AccessService)
    ;

    AccessService.$inject = [];

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

        function AccessService() {
            /**
             * Polyfill for IE8
             *
             * http://stackoverflow.com/a/1181586
             */
            if (!Array.prototype.indexOf) {
                Array.prototype.indexOf = function (needle) {
                    var l = this.length;
                    for (; l--;) {
                        if (this[l] === needle) {
                            return l;
                        }
                    }
                    return -1;
                };
            }

            var config = {
                rolesHierarchy: {
                    1: 'ROLE_USER',
                    2: 'ROLE_ADMIN',
                    3: 'ROLE_SUPER_ADMIN'
                },
                storage: 'sessionStorage', //localStorage
                storageKey: 'AccessService'
            };


            var service = {};

            service.setUser = setUser;
            service.getUser = getUser;
            service.getUserAccessLevel = getUserAccessLevel;
            service.getMaxRole = getMaxRole;
            service.getRoleAccessLevel = getRoleAccessLevel;

            function setUser() {
                window[config.storage].setItem(config.storageKey, JSON.stringify(data));
            }

            function getUser() {
                var data = window[config.storage].getItem(config.storageKey);
                return (data) ? JSON.parse(data) : false;
            }

            function getUserAccessLevel(user) {
                if (user) {
                    var roles = [1];
                    for (var key in user.roles) {
                        if (user.roles.hasOwnProperty(key)) {
                            roles.push(getRoleAccessLevel(user.roles[key]));
                        }
                    }

                    return Math.max.apply(null, roles);
                }

                return 0;
            }

            function getMaxRole(user) {
                if (user) {
                    var roles = [1];
                    for (var key in user.roles) {
                        if (user.roles.hasOwnProperty(key)) {
                            roles.push(getValue(user.roles[key]));
                        }
                    }

                    return config.rolesHierarchy[Math.max.apply(null, roles)];
                }

                return '';
            }

            function getRoleAccessLevel(value) {
                for (var prop in config.rolesHierarchy) {
                    if (config.rolesHierarchy.hasOwnProperty(prop)) {
                        if (config.rolesHierarchy[prop] === value)
                            return prop;
                    }
                }
            }

            return {
                config: function (userConfig) {
                    angular.extend(config, userConfig);
                },
                $get: function () {
                    return service;
                }
            };
        }

    }

    )();
