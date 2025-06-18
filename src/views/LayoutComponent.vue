<script setup lang="ts">
import { useRoute } from 'vue-router'
import HeaderComponent from '@/components/HeaderComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import Newsletter from '@/components/Newsletter.vue'

const route = useRoute()
</script>

<template>
  <div class="wrapper" :key="route.fullPath">
    <HeaderComponent />

    <main>
      <router-view />
    </main>

    <Newsletter v-if="route.path !== '/contact'" />
    <FooterComponent />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
