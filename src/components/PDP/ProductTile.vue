<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store'
import { useAsset } from '@/composables'
import type { Product } from '@/types'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'

const quantity = ref(1)

const store = useMainStore()
const router = useRouter()

defineProps<{
  product: Product
  isRelatedProduct?: boolean
}>()

function updateQuantity(newQuantity: number): void {
  quantity.value = newQuantity
}

function handleClick(actionType: string, product?: Product): void {
  switch (actionType) {
    case 'increment':
      if (quantity.value < 9) {
        updateQuantity(quantity.value + 1)
      }
      break

    case 'decrement':
      if (quantity.value > 1) {
        updateQuantity(quantity.value - 1)
      }
      break

    case 'addToCart':
      if (product) {
        for (let i = 0; i < quantity.value; i++) {
          store.inCart(product)
          store.updateLocalStorage()
        }
        store.toggleCart()
      }
      break

    case 'navigateToProduct':
      if (product) {
        router.push(`/details/${product?.id}`).then(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        })
      }
      break
  }
}
</script>

<template>
  <div
    :class="[
      isRelatedProduct ? 'product-detail__related-product' : 'product-detail',
    ]"
  >
    <ButtonComponent
      :isRelatedProduct="true"
      :product="product"
      :style="{ cursor: !isRelatedProduct ? 'auto' : '' }"
      buttonClass="view-item-button"
      @click="handleClick('navigateToProduct', product)"
    >
      <img
        :alt="product?.title"
        :src="useAsset(product?.img)"
        class="img-fluid"
      />
    </ButtonComponent>

    <div class="product-info">
      <template v-if="!isRelatedProduct">
        <h1 class="title">{{ product?.title }}</h1>
        <h6 class="is-size-6 title-reviews">
          <span class="pr-3">{{ product?.stars }}</span>
          {{ product?.reviews }} reviews
        </h6>
        <p>{{ product?.description }}</p>
      </template>

      <h1 v-if="isRelatedProduct" class="title">{{ product?.title }}</h1>
      <h3 class="price">${{ product?.price }}</h3>

      <div class="flex counter-container has-text-centered">
        <div class="counter-container-buttons">
          <ButtonComponent
            :quantity="quantity"
            actionType="decrement"
            buttonClass="button update-quantity"
            buttonText="−"
            @click="handleClick('decrement')"
          />
          <span class="quantity">{{ quantity }}</span>
          <ButtonComponent
            :quantity="quantity"
            actionType="increment"
            buttonClass="button update-quantity"
            buttonText="+"
            @click="handleClick('increment')"
          />
        </div>
        <ButtonComponent
          actionType="addToCart"
          buttonClass="button add-to-cart-button"
          buttonText="add to cart"
          @click="handleClick('addToCart', product)"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.title-reviews {
  width: fit-content;
}

.view-item-button {
  padding-inline: $spacing-base;
  background: $color-white;
  flex: 100%;
  border: none;
}

.counter-container {
  @include flex(
    $direction: row,
    $justifyContent: center,
    $alignItems: center,
    $gap: $spacing-base
  );

  @include responsive(mobile) {
    flex-direction: row;
  }
}

.counter-container-buttons {
  @include flex(
    $direction: row,
    $justifyContent: center,
    $alignItems: center,
    $gap: $spacing-1
  );
}

.update-quantity {
  border: 1px solid $color-black;
  outline: none;
  padding-bottom: 0.2rem;
  height: 33px;
}

.quantity {
  font-weight: bolder;
  padding: $spacing-1 $spacing-2;
  width: 3.2ch;
  background-color: rgba(0, 0, 0, 0.05);
  border: 0.75px solid rgba(0, 0, 0, 0.07);
}

.title {
  margin: 0.5rem 0 0;
  font-size: 1.8rem;

  @include responsive(mobile) {
    font-size: $font-size-xl;
    margin: 0;
  }
}

.price {
  font-size: $font-size-lg;
  font-weight: $bolder;
}

.product-info {
  gap: $spacing-3;
  width: 100%;

  @include flex(
    $direction: column,
    $gap: $spacing-2,
    $alignItems: flex-start,
    $justifyContent: center
  );

  @include responsive(mobile) {
    gap: $spacing-3;
  }
}

.product-detail {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  width: 100%;
  margin: auto;

  @include flex($direction: row, $gap: $spacing-8);

  @include responsive(mobile) {
    @include flex($direction: column);

    width: fit-content;
  }

  .product-info {
    @include responsive(mobile, max) {
      padding: $spacing-base;
    }
    @include responsive(tablet-min, min) {
      padding: $spacing-8;
    }
  }
}

.product-detail__related-product {
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  @include flex($direction: column, $alignItems: center);

  .product-info {
    margin: 0 0 $spacing-base 0;
    align-items: center;
  }
  .counter-container {
    gap: $spacing-2;
    flex-direction: column;
  }
}

.img-fluid {
  width: 100%;
}

.add-to-cart-button {
  background-color: $color-black;
  color: $color-white;
  line-height: $line-height-xl;
  transition-duration: 500ms;
  font-size: 15px;
  cursor: pointer;
  border: none;
  border-radius: 2px;
  text-transform: uppercase;

  &:hover,
  &:focus {
    color: $color-black;
    outline: 1px solid $color-black;
    background-color: inherit;
  }
}
</style>
