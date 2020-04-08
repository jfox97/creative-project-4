const mongoose = require('mongoose');
const Double = require('@mongoosejs/double');

mongoose.connect('mongodb://localhost:27017/creative4', {
  useNewUrlParser: true
});

const transactionSchema = new mongoose.Schema({
  date: Date,
  created: Date,
  description: String,
  category: String,
  amount: Double
});

const budgetSchema = new mongoose.Schema({
  created: Date,
  name: String,
  category: String,
  max: Double
});

const Transaction = mongoose.model('Transaction', transactionSchema);
const Budget = mongoose.model('Budget', budgetSchema);

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.listen(3000, () => console.log('Server listening on port 3000'));
