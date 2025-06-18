<template>
  <HeaderComponent />
  <div class="not-found-container">
    <h1 class="not-found-title">Oops! 404 - Page Not Found</h1>
    <p class="not-found-message">
      It looks like the page you're looking for doesn't exist or has been moved.
    </p>
    <img
      class="not-found-image"
      :src="useAsset('404.jpg')"
      alt="Page Not Found"
    />
    <ButtonComponent class="back-button" @click="backToProducts"
      >Back to Product List</ButtonComponent
    >
  </div>
  <FooterComponent />
</template>

<script setup lang="ts">
import router from '@/router'
import { useAsset } from '@/composables'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'

function backToProducts(): void {
  router.push({ path: '/products' })
}
</script>

<style scoped lang="scss">
.not-found-container {
  @include flex(
    $direction: column,
    $alignItems: center,
    $justifyContent: center
  );
  padding: $spacing-5;
  color: $color-black;
  margin-top: $spacing-10;
  text-align: center;

  @include responsive(mobile, max) {
    margin-top: $spacing-6;
    padding: 0;
  }
}

.not-found-title {
  font-size: $font-size-3xl;
  margin-bottom: $spacing-base;

  @include responsive(mobile, max) {
    font-size: $font-size-2xl;
  }
}

.not-found-message {
  font-size: $font-size-xl;
  color: $color-grey;
  margin-bottom: $spacing-8;
}

.not-found-image {
  margin-bottom: $spacing-8;
  width: 80%;

  @include responsive(mobile, max) {
    width: 100vw;
  }
}

.back-to-products {
  text-decoration: none;
}

.back-button {
  background-color: $color-black;
  color: $color-white;
  padding: $spacing-2 $spacing-base;
  font-weight: $bold;
  font-size: $font-size-xl;
  border: 1px solid transparent;
  text-transform: capitalize;
  cursor: pointer;
  transition: background-color 0.3s ease;

  @include responsive(mobile, max) {
    margin-bottom: $spacing-8;
  }
}

.back-button:hover {
  background-color: $color-white;
  color: $color-black;
}
</style>
