symfony-acl
======================

ACL component for Angular Js based on symfony2 user roles

For usage and examples go to app directory

## Installation

Install with bower:

```bash
$ bower install symfony-acl --save
```

Install with npm:

```bash
$ npm install symfony-acl
```

Load the `symfony-acl` module in your app.

```javascript
angular.module('app', ['symfony-acl']);
```

## Configure

```javascript
    angular
        .module('app', [
            'symfony-acl',
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
```

## Usage Example

Example usage using states:

```javascript

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
            .state('secured', {
                url: "/secured",
                requireLogin: true,
                views: {
                    "content": {
                        templateUrl: "/src/views/secured.view.html",
                        controller: 'SecuredController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('admin', {
                url: "/admin",
                requireLogin: true,
                roles: ['ROLE_ADMIN', 'ROLE_SUPER_ADMIN'],
                views: {
                    "content": {
                        templateUrl: "/src/views/admin.view.html",
                        controller: 'AdminController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('superadmin', {
                url: "/super-admin",
                requireLogin: true,
                roles: 'ROLE_SUPER_ADMIN',
                views: {
                    "content": {
                        templateUrl: "/src/views/superadmin.view.html",
                        controller: 'SuperAdminController',
                        controllerAs: 'vm'
                    }
                }
            })

    }

})();
```
