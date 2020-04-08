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
      <button v-if="!editMode" type="submit">Add</button>
      <button v-if="editMode" type="button" @click="editSubmit">Edit</button>
      <button v-if="editMode" class="cancel" type="button" @click="editCancel">Cancel</button>
    </form>
    <div id="date-filter">
      <label>Filter transactions:</label>
      <input type="date" v-model="minDate" /> &mdash;
      <input type="date" v-model="maxDate" />
    </div>
    <TransactionView :transactions="transactions" @editClicked="edit" @deleteClicked="remove"/>
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
      maxDate: moment().format("YYYY-MM-DD"),
      editMode: false,
      editTransactionID: ""
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

      this.date = moment().format("YYYY-MM-DD");
      this.description = "";
      this.category = "";
      this.amount = "";

      this.getTransactions();
    },
    async getTransactions() {
      let response = await axios.get("/api/transaction");
      this.transactions = response.data;
      return true;
    },
    async remove(transaction) {
      await axios.delete("/api/transaction/" + transaction._id);
      this.getTransactions();
    },
    edit(transaction) {
      this.date = transaction.date.slice(0,10);
      this.description = transaction.description;
      this.category = transaction.category;
      this.amount = transaction.amount;
      this.editTransactionID = transaction._id;
      this.editMode = true;
    },
    async editSubmit() {
      await axios.put("/api/transaction/" + this.editTransactionID, {
        date: this.date,
        description: this.description,
        category: this.category,
        amount: Number(this.amount).toFixed(2)
      });

      this.date = moment().format("YYYY-MM-DD");
      this.description = "";
      this.category = "";
      this.amount = "";
      this.editTransactionID = "";
      this.editMode = false;

      this.getTransactions();
    },
    editCancel() {
      this.date = moment().format("YYYY-MM-DD");
      this.description = "";
      this.category = "";
      this.amount = "";
      this.editTransactionID = "";
      this.editMode = false;
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

  form button.cancel {
    padding: 8px 35px;
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
