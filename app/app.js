(function () {
    'use strict';

    angular
        .module('app', [
            'route-provider',
            'state-provider',
            'vSymfonyACL'
        ])
        .config(['AccessServiceProvider', config])
    ;

    function config(AccessServiceProvider) {
        var myConfig = {
            rolesHierarchy: {
                1: 'ROLE_USER',
                2: 'ROLE_MODERATOR',
                6: 'ROLE_ADMIN',
                7: 'ROLE_SUPER_ADMIN'
            },
            storage: 'localStorage',
            storageKey: 'user'
        };
        AccessServiceProvider.config(myConfig);
    }


    angular.module('state-provider', ['ui.router']);
    angular.module('route-provider', ['ngRoute']);
})();
