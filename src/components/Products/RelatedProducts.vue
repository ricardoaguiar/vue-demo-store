<script lang="ts" setup>
import { useMainStore } from '@/store'
import ProductTile from '@/components/PDP/ProductTile.vue'

const store = useMainStore()
</script>

<template>
  <div class="related-products">
    <template v-for="product in store.filteredProducts" :key="product.id">
      <ProductTile :isRelatedProduct="true" :product="product" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
.related-products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: $spacing-base;

  @include responsive(tablet, max) {
    grid-template-columns: 1fr 1fr;
    gap: $spacing-2;
  }
}
</style>
