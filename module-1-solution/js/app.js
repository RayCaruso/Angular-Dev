
(function () {

'use strict';

angular.module('Mod1', []).controller('Mod1Controller', Mod1Controller);

Mod1Controller.$inject = ['$scope', '$filter'];

function Mod1Controller( $scope, $filter ) {

  $scope.message = "";

  $scope.checkItems = function() {

    if( $scope.items == undefined ) {
      $scope.message = "Please enter data first.";
      return;
    }
    var itemArray = $scope.items.split(",");
    var numItems = 0;
    for ( var i in itemArray ) {

      var item = itemArray[i].replace( /"/g, "");
      item = item.replace(/'/g, "");
      item = item.trim();
      //console.log( "item is " + item + " it's length is " + item.length );

      if( item.length > 0 )
        numItems++;
    }

    if( numItems == 0 ) {
      $scope.message = "Please enter data first.";
    }
    else if( numItems <= 3 ) {
      $scope.message = "Enjoy!";
    }
    else {
      $scope.message = "Too much!";
    }
    // $scope.message = "You entered " + $scope.items + ". That is " + itemArray.length + " items. Actual count = " + numItems;
  };

 };

}) ();
