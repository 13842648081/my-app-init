<template>
  <div class="main">
    <p>商品列表</p>
    <ul>
      <li>name</li>
      <li>name</li>
      <li>name</li>
      <li>name</li>
      <li>name</li>
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('product', ['product'])
  }
}
</script>