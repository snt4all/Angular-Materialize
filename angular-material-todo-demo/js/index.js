(function () {
  'use strict';
  angular
      .module('MyApp',['ngMaterial','dndLists'])
      .controller('AppCtrl', AppCtrl)
      .service('local',local);

  function AppCtrl ($scope, $log, $mdDialog, local) {
    var tabs = [
          { title: 'One', content: "Tabs will become paginated if there isn't enough room for them."},
          { title: 'Two', content: "You can swipe left and right on a mobile device to change tabs."},
          { title: 'Three', content: "You can bind the selected tab via the selected attribute on the md-tabs element."},
          { title: 'Four', content: "If you set the selected tab binding to -1, it will leave no tab selected."},
          { title: 'Five', content: "If you remove a tab, it will try to select a new one."},
          { title: 'Six', content: "There's an ink bar that follows the selected tab, you can turn it off if you want."},
          { title: 'Seven', content: "If you set ng-disabled on a tab, it becomes unselectable. If the currently selected tab becomes disabled, it will try to select the next tab."},
          { title: 'Eight', content: "If you look at the source, you're using tabs to look at a demo for tabs. Recursion!"},
          { title: 'Nine', content: "If you set md-theme=\"green\" on the md-tabs element, you'll get green tabs."},
          { title: 'Ten', content: "If you're still reading this, you should just go check out the API docs for tabs!"}
        ],
        selected = null,
        previous = null;
    $scope.tabs = tabs;
    $scope.selectedIndex = 2;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
      if ( old + 1 && (old != current)) $log.debug('Goodbye ' + previous.title + '!');
      if ( current + 1 )                $log.debug('Hello ' + selected.title + '!');
    });

    $scope.lists=local.get(),
    $scope.selectedIndex = local.getTab();

    $scope.saveTab = function() {
      local.setTab($scope.selectedIndex);
    }

      $scope.addTab = function () {
        $scope.lists.push({ title: $scope.tTitle, items: [], disabled: false});
        $scope.tTitle="";
        local.set($scope.lists)
      };
      $scope.removeTab = function (tab) {
        if ($scope.lists.length === 1) {return}
        var index = $scope.lists.indexOf(tab);
        $scope.lists.splice(index, 1);
        local.set($scope.lists);
      };

      $scope.inputItem=[];
      $scope.addItem=function(listIndex){
        if ($scope.inputItem[listIndex]=="") {return}
        $scope.lists[listIndex].items.push({
          name: $scope.inputItem[listIndex],
          completed: false
        });
        local.set($scope.lists);
        $scope.inputItem[listIndex]='';
      }

      $scope.updateCompleted = function() {
        local.set($scope.lists);
      }

      $scope.clear=function(index) {
        for (var i=0; i < $scope.lists[index].items.length; i++) {
          if ($scope.lists[index].items[i].completed) {
            $scope.lists[index].items[i]=null;
          }
        }
        $scope.lists[index].items = $scope.lists[index].items.filter(function(item) {return item!==null});
        local.set($scope.lists);
      }

      $scope.deleteItem=function(listIndex,itemIndex) {
        $scope.lists[listIndex].items.splice(itemIndex,1);
        local.set($scope.lists);
      }

      $scope.update = function(){local.set($scope.lists);}

      $scope.showAlert = function(ev) {
        $mdDialog.show(
          $mdDialog.alert()
            .parent(angular.element(document.body))
            .title('Angular Material To-Do')
            .content("This was a project I used to learn Angular Material, various javascript libraries and local storage. Try re-ordering your list items by dragging, or deleting the default lists and list-items and adding your own. Your lists will persist until you clear your browser data.")
            .ariaLabel('App Info')
            .ok('Got it!')
            .targetEvent(ev)
        );
      }

  }



    function local() {
      this.get=function(){
        var defaultList = [
          {
          title: 'Todo',
          disabled: false,
          items: [
            {
              name:'local-storage lists app',
              completed: false
            },
            {
              name:'Add a new list item above',
              completed: true,
            },
            {
              name:'Create a new list with the form below',
              completed: false
            },
            {
              name:'Drag list items to reorder',
              completed: false
            },
            {
              name:'please hire me: me@clnhll.com',
              completed: false
            }
          ]},
        {
          title: 'Groceries',
          disabled: false,
          items: [
            {
              name:'Multple tabs',
              completed: false
            },
            {
              name:'How cool!',
              completed: false,
            },
            {
              name:'I should buy fruit so my insides don\'t rot',
              completed: true
            }
            ]}
          ];

        if (localStorage !== null) {
          return localStorage.getItem('lists')!==null ? JSON.parse(localStorage.getItem('lists')) : defaultList;
        } else {
          return defaultList;
        }
      };
      this.set=function(lists) {
        if (localStorage !== null) {
          localStorage.setItem('lists',JSON.stringify(lists));
        }
      }
      this.getTab = function() {
        if (localStorage !== null) {
          return localStorage.getItem('savedTab')!==null ? JSON.parse(localStorage.getItem('savedTab')) : 0;
        } else {
          return 0;
        }
      }
      this.setTab = function(tab) {
        if (localStorage !== null) {
          localStorage.setItem('savedTab',JSON.stringify(tab));
        }
      }

    };



})();