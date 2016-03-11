/**
 * This file is part of the angular-symfony-acl package.
 *
 * (c) Rafał Lorenz <vardius@gmail.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

run.$inject = ['$rootScope', 'AccessService'];

export function run($rootScope, AccessService) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (next.hasOwnProperty('requireLogin') && next.requireLogin) {
            var currentUser = AccessService.getUser();
            if (!currentUser) {
                $rootScope.$emit('vsymfonyacl:error', currentUser);
                event.preventDefault();
            } else if (next.hasOwnProperty('roles')) {
                if (currentUser.hasOwnProperty('roles')) {
                    if (typeof next.roles === 'string' && currentUser.roles.indexOf(next.roles) == -1) {
                        $rootScope.$emit('vsymfonyacl:error', currentUser);
                        event.preventDefault();
                    } else if (next.roles instanceof Array && !AccessService.compareRoleArrays(currentUser.roles, next.roles)) {
                        $rootScope.$emit('vsymfonyacl:error', currentUser);
                        event.preventDefault();
                    }
                } else {
                    $rootScope.$emit('vsymfonyacl:error', currentUser);
                    event.preventDefault();
                }
            }
        }
    });

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        if (toState.hasOwnProperty('requireLogin') && toState.requireLogin) {
            var currentUser = AccessService.getUser();
            if (!currentUser) {
                $rootScope.$emit('vsymfonyacl:error', currentUser);
                event.preventDefault();
            } else if (toState.hasOwnProperty('roles')) {
                if (currentUser.hasOwnProperty('roles')) {
                    if (typeof toState.roles === 'string' && currentUser.roles.indexOf(toState.roles) == -1) {
                        $rootScope.$emit('vsymfonyacl:error', currentUser);
                        event.preventDefault();
                    } else if (toState.roles instanceof Array && !AccessService.compareRoleArrays(currentUser.roles, toState.roles)) {
                        $rootScope.$emit('vsymfonyacl:error', currentUser);
                        event.preventDefault();
                    }
                } else {
                    $rootScope.$emit('vsymfonyacl:error', currentUser);
                    event.preventDefault();
                }
            }
        }
    });
}