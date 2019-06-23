<template>
  <div id="app">    
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body {
	margin: 0;
	padding: 0;
}
* {
  box-sizing: border-box;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 20px;
  max-width: 800px;
  position: relative;
  margin: 0 auto;
  margin-top: 20px;
  min-height: calc(100vh - 40px);
  border: 1px solid silver;
  
}
</style>
