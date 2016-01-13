(function () {
    'use strict';

    angular
        .module('tacticApp', [
            'route-provider',
            'state-provider',
            'symfony-acl',
        ])
        .constant("CONFIG", {
            url: "http://api.tactic.luceytechnology.com",
            domain: "http://dashboard.tactic.dev",
            clientId: '1_3p6czexsg8isgsogk4w8c448oscgsw80sk8scwo0kog0wwwoc0',
            clientSecret: '2hbdh0s6wvc4s04c4sogw0040swws0ck48k0w00kso8kcwwsg4',
            port: "80"
        })
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
