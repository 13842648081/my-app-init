<template>
  <div class="main">
    <p v-if="product">{{product.productNm}}</p>
    <p v-if="product">{{product.productNo}}</p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState('product', ['product'])
  },
  mounted () {
  }
}
</script>
