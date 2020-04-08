<template>
  <div id="wrapper">
    <h1>Transactions</h1>
    <form v-on:submit.prevent="addTransaction">
      <div id="input">
        <input type="date" v-model="date" />
        <input type="text" placeholder="Description" v-model="description" />
        <input type="text" placeholder="Category" v-model="category" />
        <input type="text" class="small" placeholder="Amount" v-model="amount" />
      </div>
      <button type="submit">Add</button>
    </form>
    <div id="date-filter">
      <label>Filter transactions:</label>
      <input type="date" v-model="minDate" /> &mdash;
      <input type="date" v-model="maxDate" />
    </div>
    <TransactionView :transactions="transactions" />
  </div>
</template>

<script>
import TransactionView from "../components/TransactionView.vue";
import axios from 'axios';
import moment from "moment";
export default {
  name: 'Transactions',
  components: {
    TransactionView
  },
  data() {
    return {
      transactions: [],
      date: moment().format("YYYY-MM-DD"),
      description: "",
      category: "",
      amount: "",
      minDate: moment().startOf('month').format("YYY-MM-DD"),
      maxDate: moment().format("YYYY-MM-DD")
    }
  },
  created() {
    this.getTransactions();
  },
  methods: {
    async addTransaction() {
      if (this.amount === "")
        return;

      if (isNaN(this.amount))
        return;

      await axios.post("/api/transaction", {
        date: this.date,
        description: this.description,
        category: this.category,
        amount: Number(this.amount).toFixed(2)
      });

      this.description = "";
      this.category = "";
      this.amount = "";

      this.getTransactions();
    },
    async getTransactions() {
      let response = await axios.get("/api/transaction");
      this.transactions = response.data;
      return true;
    }
  }
}
</script>

<style scoped>
  #wrapper {
    width: 1200px;
    margin: 40px auto;
  }

  h1 {
      text-align: left;
  }

  form {
    text-align: left;
    margin: 40px 0px;
  }

  #input {
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  #input input {
    padding: 5px 10px;
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 18px;
    color: 484e61;
  }

  .small {
    width: 200px !important;
  }

  #input input[type="date"] {
    width: 200px !important;
    font-size: 14px;
    text-align: center;
  }

  form button {
    font-size: 14px;
    font-weight: 600;
    background-color: #EC4E20;
    color: #f8f9fa;
    border: 0px;
    border-radius: 5px;
    padding: 8px 45px;
    margin: 20px 15px;
  }

  form button:hover {
    cursor: pointer;
    background-color: #e02800;
  }

  #date-filter {
    text-align: left;
    margin: 10px;
  }

  #date-filter input {
    margin: 0px 20px;
    border: 1px solid #ddd;
    border-radius: 3px;
    padding: 2px 5px;
    font-size: 14px;
    font-family: 'Lato', sans-serif;
    color: #484e61;
  }
</style>
