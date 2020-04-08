<template>
  <table>
    <thead>
      <tr>
        <th>Date</th>
        <th>Description</th>
        <th>Category</th>
        <th>Amount</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in sortedTransactions" :key="transaction._id">
        <td>{{getFormatted(transaction.date)}}</td>
        <td>{{transaction.description}}</td>
        <td>{{transaction.category}}</td>
        <td class="align-right">${{transaction.amount.toFixed(2)}}</td>
        <td class="align-center">
          <button @click="remove(transaction)">Remove</button>
          <button @click="edit(transaction)">Edit</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import moment from "moment";
export default {
  name: 'TransactionView',
  props: {
    transactions: Array
  },
  computed: {
    sortedTransactions() {
      let transactionsCopy = this.transactions.slice(0);
      return transactionsCopy.sort((a, b) => (a.date > b.date) ? 1 : -1);
    }
  },
  methods: {
    async remove(transaction) {
      this.$emit('deleteClicked', transaction);
    },
    edit(transaction) {
      this.$emit('editClicked', transaction);
    },
    getFormatted(date) {
      return moment(date.slice(0,10), "YYYY-MM-DD").format("MMMM DD YYYY");
    }
  }
}
</script>

<style scoped>
table {
  text-align: left;
  border-collapse: collapse;
  width: 100%;
}

th {
  color: white;
  background-color: #EC4E20;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

tbody tr:nth-child(even) {
  background-color: #ebeffa;
}

.align-right {
  text-align: right;
}

.align-center {
  text-align: center;
  max-width: 60px;
}

button {
  color: #7d8dbd;
  background-color: inherit;
	text-decoration: none;
  font-size: 16px;
	border: 0px;
  padding: 0px 20px;
}

button:hover {
	cursor: pointer;
	color: #e02800;
}
</style>
