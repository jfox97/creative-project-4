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
      <tr v-for="transaction in sortedTransactions" :key="transaction.id">
        <td>{{transaction.date}}</td>
        <td>{{transaction.description}}</td>
        <td>{{transaction.category}}</td>
        <td class="align-right">{{transaction.amount}}</td>
        <td class="align-center">
          <button @click="remove(transaction)">Remove</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
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
    remove(transaction) {
      let transactionIndex = this.$root.$data.transactions.findIndex(
        _transaction => _transaction.id === transaction.id);
      this.$root.$data.transactions.splice(transactionIndex, 1);
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
}

button {
  color: #7d8dbd;
  background-color: inherit;
	text-decoration: none;
  font-size: 16px;
	border: 0px;
}

button:hover {
	cursor: pointer;
	color: #e02800;
}
</style>
