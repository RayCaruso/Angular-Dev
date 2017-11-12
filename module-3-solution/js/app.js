(function () {
'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .directive('foundItems', FoundItemsDDOFactory)
  .service('MenuSearchService', MenuSearchService);


  function FoundItemsDDOFactory() {

    var ddo = {
      templateUrl: 'founditems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
    controller: FoundListDirectiveController,
    controllerAs: 'list',
    bindToController: true
    };

    return ddo;

  } // End FoundItemsDDOFactory()

  function FoundListDirectiveController() {
    var list = this;

    list.nothingFound = function () {

      if( list.items === undefined || list.items.length > 0 ) {
        return false;
      } else {
        return true;
      }

    };

  }


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController( MenuSearchService ) {

    var controller = this;
    var foundItems = [];

    controller.removeItem = function( index ) {

      this.foundItems.splice( index, 1 );

    }

    controller.searchItems = function () {

      controller.foundItems = [];
      foundItems = [];

      if ( controller.searchTerm === undefined || controller.searchTerm.length == 0 ) {
        return;
      }

      var promise = MenuSearchService.getMatchedMenuItems();

      promise.then( function( response ) {

        for ( var item in response.data.menu_items ) {

            if( response.data.menu_items[item].name.search( controller.searchTerm ) > -1 ||
                response.data.menu_items[item].description.search( controller.searchTerm ) > -1  ) {
                  foundItems.push(response.data.menu_items[item]);
            }

        }

        controller.foundItems = foundItems;

      }).catch( function( error ) {

        console.log( "Promise.catch()" );
        console.log( "Something bad happened" );

      });


    } // end searchItems = fucntion()

  } // End NarrowItDownController


  MenuSearchService.$inject = ['$http']
  function MenuSearchService( $http ) {

    var service = this;


    // Function to retrieve menu items from the server,
    // loop through resuls and select items that contain
    // given search terms.
    service.getMatchedMenuItems = function( searchTerm ) {
        var response = $http({
                method: 'GET',
                url: 'https://davids-restaurant.herokuapp.com/menu_items.json'

              });
        return response;

    } // End getMatchedMenuItems

  } // End MenuSearchService



})();
