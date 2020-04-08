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
const moment = require('moment');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.post('/api/transaction', async (req, res) => {
  const transaction = new Transaction({
    date: req.body.date,
    created: moment().format(),
    description: req.body.description,
    category: req.body.category,
    amount: req.body.amount
  });
  try {
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/transaction', async (req, res) => {
  try {
    let transactions = await Transaction.find();
    res.send(transactions);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/transaction/:id', async (req, res) => {
  try {
    await Transaction.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/transaction/:id', async (req, res) => {
  try {
    let transaction = await Transaction.findOne({
      _id: req.params.id
    });
    transaction.date = req.body.date;
    transaction.description = req.body.description;
    transaction.category = req.body.category;
    transaction.amount = req.body.amount;
    await transaction.save();
    res.send(transaction);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
})

app.listen(3000, () => console.log('Server listening on port 3000'));
