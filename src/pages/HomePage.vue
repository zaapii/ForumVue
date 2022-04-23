<template>
  <h1>Bienvenido al Foro</h1>

 <div class="forum-list col-full" v-for="category in categories" :key="category.id">
  <CategoryList :category="category"/>
 </div>

</template>

<script>
import dataJson from '@/data.json'
import CategoryList from '@/components/CategoryList.vue'
export default {
  components: {
    CategoryList
  },
  data () {
    return {
      categories: dataJson.categories
    }
  }
}
</script>

<style scoped></style>
