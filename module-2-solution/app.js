(function () {
'use strict';

angular.module('Module2', [])
.controller('ShoppingListBuyController', ShoppingListBuyController)
.controller('ShoppingListBoughtController', ShoppingListBoughtController)
.service('ShoppingListService', ShoppingListService);

ShoppingListBuyController.$inject = ['ShoppingListService'];
function ShoppingListBuyController(ShoppingListService) {
  var itemBuyer = this;

  itemBuyer.buyList = ShoppingListService.getBuyItems();

  itemBuyer.buyItem = function (itemIndex) {
    ShoppingListService.buyItem(itemIndex);
  }

  itemBuyer.buyListEmpty = function () {
    return ShoppingListService.buyListEmpty();
  }
}


ShoppingListBoughtController.$inject = ['ShoppingListService'];
function ShoppingListBoughtController(ShoppingListService) {
  var showList = this;

  showList.boughtList = ShoppingListService.getBoughtItems();


  showList.boughtListEmpty = function () {
    return ShoppingListService.boughtListEmpty();
  }
}


function ShoppingListService() {
  var service = this;

  var buyList = [
    { name: "Bannanas",      quantity: "6" },
    { name: "Apples",        quantity: "12" },
    { name: "Carrots",       quantity: "24" },
    { name: "brocoli",       quantity: "2 bunches" },
    { name: "Kale",          quantity: "1 bunch" },
    { name: "Ground Bison",  quantity: "5 lbs" }
  ];

  var boughtList = [];


  service.buyItem = function (itemIndex) {

    var buyItem = buyList[itemIndex];
    boughtList.push( buyItem );
    buyList.splice( itemIndex, 1);

  };


  service.boughtListEmpty = function () {
    return boughtList.length == 0;
  }

  service.buyListEmpty = function () {
    return buyList.length == 0;
  }

  service.getBuyItems = function () {
    return buyList;
  };

  service.getBoughtItems = function () {
    return boughtList;
  };

}

})();
