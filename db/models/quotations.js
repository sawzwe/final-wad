// File: ./models/quotation.js

//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var QuotationSchema = new Schema({
  item: String,
  priceperunit: Number,
  quantity: Number,
  amount:Number,
  date: Date
});

//Export function to create "ProductSchema" model class
module.exports = mongoose.model('Quotations', QuotationSchema );