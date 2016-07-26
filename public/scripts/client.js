angular.module('groceryApp', []);

angular.module('groceryApp').controller('GroceryController', function($http){
  var vm = this;

  vm.getGroceryItems = function(){
    $http.get('/groceryItems/getGroceryItems').then(function(response){
      vm.groceryItems = response.data;
      console.log(vm.groceryItems);
    }, function(response){
      console.log('get items fail');
    })
  }

  vm.getGroceryItems();

  vm.addItem = function(){
    var sendData = {};

    sendData.itemName = vm.name;
    sendData.itemQty = vm.qty;
    $http.post('/groceryItems/newGroceryItem', sendData).then(function(response){
      console.log(response);
      vm.name = '';
      vm.qty = '';
      vm.getGroceryItems();
    }, function(response){
      console.log('add new item fail');
    })
  }

  vm.deleteItem = function(clickedId){
    console.log('click', clickedId);
    $http.delete('/groceryItems/deleteItem/' + clickedId).then(function(response){
      console.log(response);
      vm.getGroceryItems();
    }, function(response){
      console.log('failed to delete');
    })
  }

  vm.updateItem = function(clickedItem){
    console.log('click', clickedItem);
    var sendData = {};

    sendData.itemName = clickedItem.name;
    sendData.itemQty = clickedItem.qty;
    console.log(this.name);

    $http.put('/groceryItems/updateItem/' + clickedItem._id, sendData).then(function(response){
      console.log(response);
      vm.getGroceryItems();
    }, function(response){
      console.log('failed to update');
    })
  }
})
