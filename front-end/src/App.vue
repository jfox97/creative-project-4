<template>
  <div id="app">
    <div id="nav">
      <div id="brand">
        <router-link to="/">
          <img src="./assets/logo.png" />
        </router-link>
      </div>
      <div id="side">
        <router-link to="/transactions">Transactions</router-link>
        <router-link to="/budget">Budget</router-link>
      </div>
    </div>
    <router-view/>
    <footer>
      <a target="_blank" href="https://github.com/jfox97/creative-project-4">
        Creative Project 4 Github
      </a>
    </footer>
  </div>
</template>

<style>

body {
  font-family: 'Lato', sans-serif;
  font-weight: 400;
  background-color: #f8f9fa;
  color: #484e61;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  min-height: 98vh;
}

#nav {
  display: flex;
  align-items: center;
  padding: 10px 40px;
}

#side {
  padding-right: 30px;
  padding-bottom: 10px;
}

#side a {
  text-decoration: none;
  font-size: 18px;
  color: #484e61;
  padding: 0px 20px;
}

#side a:hover {
  color: #EC4E20;
}

#brand {
  margin-right: auto;
}

footer {
  text-align: left;
  margin-top: auto;
  padding: 50px 0px 20px 50px;
}

footer a {
  text-decoration: none;
  font-size: 18px;
  color: #484e61;
}

footer a:hover {
  color: #EC4E20;
}
</style>
