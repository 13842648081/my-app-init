<template>
  <div id="app" class="wrapper">
    <router-view name="header"></router-view>
    <router-view />
    <router-view name="footer"></router-view>
  </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="css">
@import "./assets/css/import.css";
</style>
