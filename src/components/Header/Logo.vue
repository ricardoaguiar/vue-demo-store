<script lang="ts" setup>
import { useAsset } from '@/composables'
</script>

<template>
  <router-link class="logo" to="/">
    <img
      :src="useAsset('logo.svg')"
      alt="site-logo"
      height="40"
      title="site-logo"
      width="40"
    />
  </router-link>
</template>

<style lang="scss" scoped>
.logo {
  @include responsive(mobile, max) {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  & {
    @include flex();
    width: $spacing-8;
    height: $spacing-8;
  }
}
</style>
