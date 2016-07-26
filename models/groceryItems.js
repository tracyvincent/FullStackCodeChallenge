var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var grocerySchema = new Schema({
  name: String,
  qty: Number
})

var GroceryItem = mongoose.model('GroceryItem', grocerySchema);

module.exports = GroceryItem;
