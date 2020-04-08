<template>
  <div id="wrapper">
    <h1>Budget</h1>
    <form v-on:submit.prevent="addBudget">
      <div id="input">
        <input type="text" placeholder="Name" v-model="name" />
        <input type="text" placeholder="Category" v-model="category" />
        <input type="text" placeholder="Limit" v-model="limit" />
      </div>
      <button v-if="!editMode" type="submit">Add</button>
      <button v-if="editMode" type="button" @click="editSubmit">Edit</button>
      <button v-if="editMode" class="cancel" type="button" @click="editCancel">Cancel</button>
    </form>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Total</th>
          <th>Limit</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="budget in budgets" :key="budget._id">
          <td>{{budget.name}}</td>
          <td>{{budget.category}}</td>
          <td>${{formatSpending(categorySpending[budget.category])}}</td>
          <td>${{budget.max.toFixed(2)}}</td>
          <td class="align-center">
            <button @click="removeBudget(budget)">Remove</button>
            <button @click="edit(budget)">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Budget",
  data() {
    return {
      budgets: [],
      categorySpending: {},
      name: "",
      category: "",
      limit: "",
      editMode: false,
      editBudgetID: ""
    }
  },
  created() {
    this.getBudgets();
    this.getCategorySpending();
  },
  methods: {
    reset() {
      this.name = "";
      this.category = "";
      this.limit = "";
      this.editMode = false;
      this.editBudgetID = "";
    },
    refresh() {
      this.reset();
      this.getBudgets();
      this.getCategorySpending();
    },
    async getBudgets() {
      let response = await axios.get('/api/budget');
      this.budgets = response.data;
      return true;
    },
    async getCategorySpending() {
      let response = await axios.get('/api/category-sum');
      for (let i = 0; i < response.data.length; i++) {
        this.categorySpending[response.data[i]._id] = response.data[i].amount;
      }
      return true;
    },
    async addBudget() {
      if (this.limit === "")
        return;

      if (this.category === "")
        return;

      await axios.post('/api/budget', {
        name: this.name,
        category: this.category,
        max: this.limit
      });

      this.refresh();
    },
    async removeBudget(budget) {
      await axios.delete('/api/budget/' + budget._id);
      this.refresh();
    },
    edit(budget) {
      this.name = budget.name;
      this.category = budget.category;
      this.limit = budget.max;
      this.editMode = true;
      this.editBudgetID = budget._id;
    },
    async editSubmit() {
      if (this.limit === "")
        return;

      if (this.category === "")
        return;

      await axios.put('/api/budget/' + this.editBudgetID, {
        name: this.name,
        category: this.category,
        max: this.limit
      });

      this.refresh();
    },
    editCancel() {
      this.reset();
    },
    formatSpending(spending) {
      if (spending === undefined)
        return "0.00";
      return spending.toFixed(2);
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
    width: 350px;
    border: 1px solid #ddd;
    border-radius: 3px;
    font-size: 18px;
    color: 484e61;
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
