'use strict';

angular.module('demo', [
  'ngMaterial',
  'ui.router'
])

// Directives
.directive('mdSvgIcon', function ($http) {
  return {
    restrict: 'E',
    template: '<div class="md-icon"></div>',
    link: function (scope, element, attrs) {
      attrs.$observe('href', function (val) {
        $http.get(val, { cache: true })
          .then(function (res) {
            var $svg = angular.element(res.data);
            $svg.css('fill', attrs.fill || 'currentColor');
            element.empty().append($svg);
          });
      });

      attrs.$observe('icon', function (val) {
        if (attrs.href) return;
        var $svg = angular.element('<svg><use xlink:href="#'+val+'"></use></svg>');
        element.empty().append($svg);
      });
    }
  };
})

// Controllers
.controller('AppCtrl', function ($scope, $state, $mdSidenav) {
  $scope.$state = $state;

  $scope.$page = {};
  $scope.$page.title = 'Demo';
  $scope.$page.sideNav = true;
  $scope.$page.backBtutton = false;

  this.closeMenu = function () {
    $mdSidenav('left').close();
  };

  this.openMenu = function () {
    $mdSidenav('left').open();
  };
})

.controller('SidenavCtrl', function ($scope) {
  this.items = [
    { title: 'Menu 1', icon: 'ic_bookmark', uiSref: '.home' },
    { title: 'Menu 2', icon: 'ic_recent_actors', uiSref: '.home' },
    { title: 'Menu 3', icon: 'ic_message', uiSref: '.home' },
    { title: 'Menu 4', icon: 'ic_people', uiSref: '.home' },
    { title: 'Menu 5', icon: 'ic_explore', uiSref: '.home' },
    { title: 'Menu 6', icon: 'ic_trending_up', uiSref: '.home' },
    { title: 'Menu 7', icon: 'ic_star', uiSref: '.home' },
    { title: 'Menu 8', icon: 'ic_settings', uiSref: '.home' },
    { title: 'Menu 9', icon: 'ic_exit_to_app', uiSref: '.home' },
  ];
})

// Routes
.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      abstract: true,
      views: {
        'app': {
          templateUrl: 'partials/layout.html',
          controller: 'AppCtrl as appCtrl'
        },
        'toolbar@app': {
          templateUrl: 'partials/toolbar.html'
        },
        'sidenav@app': {
          templateUrl: 'partials/sidenav.html',
          controller: 'SidenavCtrl as sidenavCtrl'
        },
      }
    })

    .state('app.home', {
      url: '/',
      views: {
        'content': {
          templateUrl: 'partials/home.html'
        }
      }
    });

  $urlRouterProvider.otherwise('/');
});