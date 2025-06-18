<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, reactive, computed } from 'vue'
import { useMainStore } from '@/store'

// Components
import Card from '@/components/Products/RelatedProducts.vue'
import Breadcrumb from '@/components/PDP/Breadcrumb.vue'
import ProductTile from '@/components/PDP/ProductTile.vue'
import ProductDescription from '@/components/PDP/PDPText.vue'

// types
import type { Product } from '@/types'

// Store and routing
const store = useMainStore()
const route = useRoute()
const router = useRouter()

// State
const item = reactive<{
  details: Product | null | undefined
  relatedItems: Product[]
}>({
  details: null,
  relatedItems: [],
})

// Fetch item details on mount
onMounted(async () => {
  const itemId = Number(route.params.id)
  item.details = store.products[itemId]

  if (store.products.length === 0) {
    await store.fetchProducts()
  }

  item.details = store.products.find((product) => product.id === itemId)

  if (!item.details) {
    await router.push('/404')
  }
})

// Generate related items
const sliceItems = computed(() => {
  if (item.details) {
    while (item.relatedItems.length < 3) {
      const randomIndex = Math.floor(Math.random() * store.products.length)
      const relatedItem = store.products[randomIndex]

      // Ensure we don't include the current item or duplicates
      if (
        relatedItem !== item.details &&
        !item.relatedItems.includes(relatedItem)
      ) {
        item.relatedItems.push(relatedItem)
      }
    }
  }
  return item.relatedItems
})
</script>

<template>
  <div v-if="item.details" class="product-details">
    <Breadcrumb :details="item.details" />
    <ProductTile :product="item.details" />
    <ProductDescription />

    <div v-if="sliceItems.length > 0" class="related-item">
      <h6 class="relate-product-title">Related Products</h6>
      <Card :cards="sliceItems" />
    </div>
  </div>

  <div v-else>
    <p>Product not found.</p>
    <router-link to="/">Back to Products</router-link>
  </div>
</template>
<style lang="scss" scoped>
.product-details {
  margin-inline: $spacing-base;
  margin-block: $spacing-5;
}

.related-item {
  height: auto;
  text-align: center;
}

.relate-product-title {
  font-size: $font-size-3xl;
  font-weight: $bold;
  margin: $spacing-16 auto $spacing-5;
}
</style>
