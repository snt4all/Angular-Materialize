angular.module('bottomSheetDemo1', ['ngMaterial'])
.controller('BottomSheetExample', function($scope, $timeout, $mdBottomSheet){
  $scope.alert = '';
  var listTemplate = ' <md-bottom-sheet class="md-list md-has-header">\
  <md-subheader>Comment Actions</md-subheader>\
  <md-list>\
    <md-item ng-repeat="item in items">\
      <md-button aria-label="{{item.name}}" ng-click="listItemClick($index)">\
        <!-- Using custom inline icon until md-icon is ready. DONT USE ME! -->\
        <md-inline-list-icon icon="{{item.icon}}"></md-inline-list-icon>\
        <span class="md-inline-list-icon-label">{{ item.name }}</span>\
      </md-button>\
    </md-item>\
  </md-list>\
</md-bottom-sheet>'
  $scope.showListBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: listTemplate,
      controller: 'ListBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
  var gridTemplate = '<md-bottom-sheet class="md-grid">\
  <md-list>\
    <md-item ng-repeat="item in items">\
      <md-button class="md-grid-item-content" aria-label="{{item.name}}" ng-click="listItemClick($index)">\
        <div class="md-icon-container">\
          <md-inline-grid-icon icon="{{item.icon}}"></md-inline-grid-icon>\
        </div>\
        <p class="md-grid-text"> {{ item.name }} </p>\
      </md-button>\
    </md-item>\
  </md-list>\
</md-bottom-sheet>';
  $scope.showGridBottomSheet = function($event) {
    $scope.alert = '';
    $mdBottomSheet.show({
      template: gridTemplate,
      controller: 'GridBottomSheetCtrl',
      targetEvent: $event
    }).then(function(clickedItem) {
      $scope.alert = clickedItem.name + ' clicked!';
    });
  };
})
.controller('ListBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Share', icon: 'share' },
    { name: 'Upload', icon: 'upload' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Print this page', icon: 'print' },
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
})
.controller('GridBottomSheetCtrl', function($scope, $mdBottomSheet) {
  $scope.items = [
    { name: 'Hangout', icon: 'hangout' },
    { name: 'Mail', icon: 'mail' },
    { name: 'Message', icon: 'message' },
    { name: 'Copy', icon: 'copy' },
    { name: 'Facebook', icon: 'facebook' },
    { name: 'Twitter', icon: 'twitter' },
  ];
  $scope.listItemClick = function($index) {
    var clickedItem = $scope.items[$index];
    $mdBottomSheet.hide(clickedItem);
  };
});