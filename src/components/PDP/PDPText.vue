<script lang="ts" setup>
import { onUnmounted, reactive } from 'vue'

const text = reactive({
  moreInfo: ['DESCRIPTION', 'WARRANTY', 'REVIEWS'],
  active: 0,
})

onUnmounted(() => {
  // clear the reactive object
  text.moreInfo = []
  text.active = 0
})
//More Info area tab selector
const selectedInfo = (index: number): number => (text.active = index)
</script>

<template>
  <div class="product-description has-text-centered columns is-mobile is-0">
    <div
      v-for="(info, index) in text.moreInfo"
      :key="index"
      :class="{ 'is-active': index === text.active }"
      class="column is-flex-grow-1"
      @click="selectedInfo(index)"
    >
      <h6>{{ info }}</h6>
    </div>
  </div>
  <div class="container pt-3">
    <div class="columns">
      <div class="column">
        <p>
          Discover the epitome of modern elegance with our sleek, minimalist
          coffee table. Crafted from premium oak wood and featuring a smooth,
          matte black finish, this table blends effortlessly into any
          contemporary living space. Its clean lines and understated design make
          it a versatile piece, while the sturdy construction ensures
          durability. Perfect for showcasing your favorite books, decorative
          items, or enjoying a cozy cup of coffee, this table is both functional
          and stylish, adding a touch of sophistication to your home.
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product-description {
  margin-block: $spacing-8;
}
.column h6 {
  height: $spacing-6;
  padding-bottom: $spacing-6;
  border-bottom: 1px solid $color-grey;
  color: grey;
  cursor: pointer;
}

.is-active h6 {
  font-weight: $bold;
  border-bottom: 1px solid $color-black;
  color: $color-black;
}
</style>
