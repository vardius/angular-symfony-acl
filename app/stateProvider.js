(function () {
    'use strict';

    angular
        .module('state-provider')
        .config(['$stateProvider', config]);

    function config($stateProvider) {
        $stateProvider
            .state('home', {
                url: "/",
                requireLogin: false,
                views: {
                    "content": {
                        templateUrl: "/src/views/home.view.html",
                        controller: 'HomeController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('admin', {
                url: "/admin",
                requireLogin: true,
                role: 'ROLE_ADMIN',
                views: {
                    "content": {
                        templateUrl: "/src/views/admin.view.html",
                        controller: 'AdminController',
                        controllerAs: 'vm'
                    }
                }
            })

    }

})();
