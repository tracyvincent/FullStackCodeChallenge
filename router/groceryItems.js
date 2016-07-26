var router = require('express').Router();

var GroceryItem = require('../models/groceryItems');

router.get('/getGroceryItems', function(request, response){
  GroceryItem.find({}, function(err, groceryItems){
    if (err) {
      console.log(err),
      response.sendStatus(500);
    } else {
      console.log(groceryItems);
      response.send(groceryItems);
    }
  })
})

router.post('/newGroceryItem', function(request, response){
  console.log('creating new grocery item');
  var data = request.body;

  var newItem = new GroceryItem({
    name: data.itemName,
    qty: data.itemQty
  });
    newItem.save(function(err){
    if (err){
      console.log('save err', err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  })
})

router.delete('/deleteItem/:id', function(request, response){
  console.log('deleteing item');
  GroceryItem.findByIdAndRemove(request.params.id, function(err, item){
    if (err){
      console.log(err);
      response.sendStatus(500);
    } else {
      response.sendStatus(200);
    }
  })
})

router.put('/updateItem/:id', function(request, response){
  console.log('updating item');
  var data = request.body;

  var newItem = new GroceryItem({
    name: data.itemName,
    qty: data.itemQty
  });
  GroceryItem.update({_id: request.params.id}, {
    name: newItem.name,
    qty: newItem.qty
  }, function(err){
    if(err){
    console.log(err);
    response.sendStatus(500);
  } else {
    response.sendStatus(200);
  }
})
})




module.exports = router;
