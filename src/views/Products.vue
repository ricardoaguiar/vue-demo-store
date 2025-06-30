<template>
  <section class="products-page-view container py-5">
    <div>
      <h1 class="title pt-3 has-text-centered">New Arrivals</h1>
      <BreadCrumbs />
    </div>
    <SidebarNavigation />
    <PLP />
  </section>
</template>

<script lang="ts" setup>
import { useHead } from '@unhead/vue'

// Components
import BreadCrumbs from '@/components/Products/BreadCrumbs.vue'
import PLP from '@/components/Products/PLP.vue'
import SidebarNavigation from '@/components/Products/SidebarNavigation.vue'

useHead({
  title: 'Products - Vue Demo Store',
  meta: [
    {
      name: 'description',
      content: 'Explore our wide range of products at Vue Demo Store.',
    },
  ],
  link: [
    { rel: 'canonical', href: 'https://vue-demo-store.pages.dev/products' },
  ],
})
</script>

<style lang="scss" scoped>
.products-page-view {
  display: grid;
  grid-template-areas:
    'breadCrumbs breadCrumbs'
    'filterBar productList';
  grid-template-columns: 1fr;
  gap: $spacing-base;

  @include responsive(desktop, min) {
    grid-template-columns: 1fr 3fr;
  }

  @include responsive(mobile, max) {
    padding-inline: $spacing-3;
  }

  @include responsive(tablet-min, min) {
    padding-inline: $spacing-5;
  }

  // Ensure full width for breadcrumbs
  & > *:nth-child(1) {
    grid-area: breadCrumbs;
  }

  // Assign filterBar to first column
  & > *:nth-child(2) {
    grid-area: filterBar;
  }

  // Assign product list to second column
  & > *:nth-child(3) {
    grid-area: productList;
  }

  @include responsive(mobile) {
    grid-template-areas:
      'breadCrumbs'
      'filterBar '
      'productList';
  }
}
</style>
