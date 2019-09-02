<template>
  <div>
    <p></p>
  </div>
</template>
<script>
export default {
  name: 'Home',
  props: {
    msg: String
  },
  mounted(){
    this.$store.dispath('common/getProduct').then((products)=>{
        console.info(products)
    })
  }
}
</script>