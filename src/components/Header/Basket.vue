<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useMainStore } from '@/store'

// components
import Item from '@/components/Cart/Item.vue'
import Notification from '@/components/Notification.vue'
import Total from '@/components/Cart/Total.vue'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'

// variables
const store = useMainStore()
const router = useRouter()

// functions
function handleCheckout(): void {
  const purchasedItems = store.cartItems.map((item) => ({
    ...item,
    quantity: item.quantity,
  }))
  store.handleCheckout(purchasedItems)
  store.cartItems = []
  store.updateLocalStorage()
  router.push({ name: 'ThankYou' })
  store.toggleCart()
}

function goShopping(): void {
  router.push({ path: '/products' })
  store.toggleCart()
}
</script>

<template>
  <div :class="['cart', store.isCartOpen ? 'on' : '']">
    <div class="cart-title">
      <ButtonComponent buttonClass="close-basket" @click="store.toggleCart()"
        >&#10006;</ButtonComponent
      >
      <h2 class="has-text-centered is-size-3">Cart</h2>
    </div>
    <div class="cart-items">
      <Notification v-if="!store.itemsNumber">
        Your cart is empty, try to add some items.
      </Notification>
      <div
        v-for="item in store.cartItems"
        :key="item.id"
        class="cart-container is-mobile"
      >
        <div class="cart-item column is-full">
          <Item :item="item" />
        </div>
      </div>

      <Total v-if="store.itemsNumber" />

      <div v-if="store.cartItems.length > 0" class="basket-buttons">
        <ButtonComponent
          buttonClass="continue-shopping"
          buttonText="Continue Shopping"
          @click="goShopping"
        />

        <ButtonComponent
          buttonClass="complete-checkout"
          buttonText="Complete Checkout"
          @click="handleCheckout"
        />
      </div>

      <ButtonComponent
        v-if="store.cartItems.length === 0"
        buttonClass="go-shopping"
        buttonText="Go Shopping"
        @click="goShopping"
      />
    </div>
  </div>
  <div
    :class="['modal-background', store.isCartOpen ? '' : 'is-hidden']"
    @click="store.toggleCart()"
  ></div>
</template>

<style lang="scss" scoped>
.cart-title {
  border-bottom: 1px solid rgba(211, 211, 211, 0.5);
  background: $color-black;
  color: $color-white;
  padding: $spacing-2 0;
  width: 100%;
}

.close-basket {
  top: $spacing-base;
  right: $spacing-base;
  width: $spacing-6;
  height: $spacing-6;
  color: $color-white;
  position: absolute;
  border-radius: 50%;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
  white-space: nowrap;
  background: transparent;
  border: none;
}

.continue-shopping,
.go-shopping {
  background: $color-black;
  color: $color-white;
  padding: $spacing-base;
  display: block;
  width: 100%;
}

.complete-checkout {
  font-size: $font-size-base;
  padding: $spacing-base $spacing-6;
  background: $secondary-color;
  font-weight: $bold;
  width: 100%;
}

.cart-container {
  padding: $spacing-2;
  margin-bottom: $spacing-2;
  position: relative;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 2px;
}

.cart-item {
  column-gap: $spacing-2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
}

/* Cart Body */
.cart {
  background: $color-white;
  position: fixed;
  top: 0;
  right: 0;
  width: 25rem;
  height: 100%;
  overflow-y: auto;
  z-index: 1500;
  transform: translateX(100%);
  transition: transform 0.4s;
}

.cart.on {
  transform: translateX(0);

  @include responsive(mobile-small, max) {
    width: 100%;
  }
}

.cart-items {
  color: $color-black;
  padding: $spacing-base;
}

.total {
  margin-block: calc($spacing-5 / 2);
}

.basket-buttons {
  @include flex($direction: column, $gap: $spacing-2);
}
</style>
