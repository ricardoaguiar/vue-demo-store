<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

// composables
import { useAsset } from '@/composables'

// types
import { Product } from '@/types'

// components
import ButtonComponent from '@/components/UI/ButtonComponent.vue'

// variables
const router = useRouter()
const orderId = ref('')
const purchasedItems = ref<Product[]>([])

onMounted(() => {
  try {
    // Retrieve order ID, purchased items from localStorage
    const storedOrderId = localStorage.getItem('orderId')
    const storedItems = localStorage.getItem('purchasedItems')
    // Check if the data exists
    if (storedOrderId && storedItems) {
      orderId.value = storedOrderId
      purchasedItems.value = JSON.parse(storedItems)
    } else {
      console.warn('No order data found in localStorage.')
    }
  } catch (error) {
    console.error('Error retrieving order data from localStorage:', error)
  }
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const orderTotal = computed((): number => {
  return purchasedItems.value.reduce((total, item) => {
    return total + item.price * item.quantity
  }, 0)
})

function deleteOrder(): void {
  localStorage.removeItem('orderId')
  localStorage.removeItem('purchasedItems')
  orderId.value = ''
  purchasedItems.value = []
}

function goShopping(): void {
  router.push({ path: '/products' })
}
</script>

<template>
  <div :class="['thank-you-page', { 'has-order-id': orderId }]">
    <template v-if="orderId">
      <h1 class="title pb-3">Thank you for your purchase!</h1>
      <p class="subtitle">Here are the items you purchased:</p>
      <p class="subtitle">Order ID: {{ orderId }}</p>
    </template>

    <div v-if="purchasedItems.length > 0">
      <ul class="product-list">
        <li
          v-for="item in purchasedItems"
          :key="item.id"
          class="product-list-item"
        >
          <router-link :to="`/details/${item.id}`" class="product-link">
            <span class="product-list-tile">
              <img
                :alt="item.name"
                :src="useAsset(item.img)"
                class="product-image"
              />
              <strong>{{ item.title }}</strong>
              <span>Quantity: {{ item.quantity }}</span>
              <span>Total: ${{ item.price * item.quantity }}</span>
            </span>
          </router-link>
        </li>
      </ul>

      <div class="order-total pb-5">
        <h6 class="subtitle">Total Order Cost: ${{ orderTotal }}</h6>
      </div>
    </div>

    <div v-else class="nothing-here">
      <h2 class="title">Nothing here. Go shopping!</h2>
      <div class="nothing-here-img" />
    </div>

    <div :class="['action-buttons', { 'order-deleted': !orderId }]">
      <ButtonComponent
        v-if="purchasedItems.length !== 0"
        buttonClass="delete-order"
        buttonText="Delete Order"
        class="button delete-order"
        @click="deleteOrder"
      />

      <ButtonComponent
        :class="{ 'deleted-order': !orderId }"
        buttonClass="go-shopping"
        buttonText="Continue Shopping"
        @click="goShopping"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.thank-you-page {
  width: 100%;
}

.has-order-id {
  padding: $spacing-8 $spacing-6;
}

.nothing-here {
  margin-block: $spacing-8;

  h2 {
    margin-inline: $spacing-6;
  }
}

.nothing-here-img {
  background-image: url('@/assets/img/empty-basket.jpg');
  height: 30rem;
  background-size: cover;
  background-position: center;
}

.order-total .subtitle {
  font-weight: $bold;
}

.action-buttons {
  @include flex($direction: row, $gap: $spacing-base);
}

.order-deleted {
  justify-content: center;
  margin-bottom: $spacing-8;
}

.product-list {
  @include flex(
    $direction: row,
    $wrap: wrap,
    $gap: $spacing-2,
    $justifyContent: flex-start
  );
  margin-bottom: $spacing-8;
}

.product-list-item {
  @include responsive(mobile, max) {
    width: 30%;
  }

  @include responsive(mobile-small, max) {
    width: 45%;
  }
}

.product-list-tile {
  border-radius: 2px;

  @include flex($direction: column);
  border: 1px solid $color-grey;
  padding: 0 $spacing-base $spacing-base;
}

.product-link {
  width: 100%;
  height: 100%;
}

.product-image {
  flex: 1 0 30%;
  max-width: 15rem;

  @include responsive(mobile-small, max) {
    max-width: 10rem;
  }
}

.delete-order,
.go-shopping {
  background-color: $color-black;
  color: $color-white;
  font-weight: $bold;
  padding: $spacing-2 $spacing-base;
  border-radius: 2px;
}

.delete-order {
  background-color: $color-red;
}
</style>
