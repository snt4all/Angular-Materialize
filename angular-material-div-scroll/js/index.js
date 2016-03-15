angular.module('app', [
  'ngAnimate',
  'ngAria',
  'ngMaterial',
  'ngMessages'
])
.config(function($mdThemingProvider) {
  $mdThemingProvider.theme('default')
  .primaryPalette('blue');
});