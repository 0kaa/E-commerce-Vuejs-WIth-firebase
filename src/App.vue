<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "App",
};
</script>
<style lang="scss">
body {
  font-family: "Poppins", sans-serif;
  font-weight: 400;
}
body,
html,
#app {
  height: 100%;
}
</style>
