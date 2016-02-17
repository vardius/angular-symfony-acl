symfony-acl
======================

ACL component for Angular Js based on symfony2 user roles

For usage and examples go to app directory

## Installation

Install with bower:

```bash
$ bower install symfony-acl --save
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
```
