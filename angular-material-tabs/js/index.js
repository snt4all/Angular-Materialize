angular.module('demoApp', ['ngMaterial'])
  .controller('AppCtrl', function ($scope, $log) {
    var tabs = [
      { title: 'Demo 1', content: "Tab 01"},
      { title: 'Demo 2', content: "Tab 02"},
      { title: 'Demo 3', content: "Tab 03"},
   ];
    $scope.tabs = tabs;
    $scope.selectedIndex = 2;
    $scope.$watch('selectedIndex', function(current, old){
      if ( old && (old != current)) $log.debug('Goodbye ' + tabs[old].title + '!');
      if ( current )                $log.debug('Hello ' + tabs[current].title + '!');
    });
    $scope.addTab = function (title, view) {
      view = view || title + " Content View";
      tabs.push({ title: title, content: view, disabled: false});
    };
    $scope.removeTab = function (tab) {
      for (var j = 0; j < tabs.length; j++) {
        if (tab.title == tabs[j].title) {
          $scope.tabs.splice(j, 1);
          break;
        }
      }
    };
  });