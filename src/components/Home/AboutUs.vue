<script lang="ts" setup>
import { useAsset } from '@/composables'
import { onMounted } from 'vue'
import { useMainStore } from '@/store'

const store = useMainStore()

onMounted(async () => await store.fetchAboutUs())
</script>

<template>
  <section class="about-us">
    <h1 class="title is-3 has-text-centered">About Us</h1>
    <div v-if="store.aboutUs?.aboutUsData.length">
      <div
        v-for="(item, i) in store.aboutUs?.aboutUsData"
        :key="i"
        :class="[
          'columns is-vcentered about-us-content',
          { 'is-reverse': item?.reverse },
        ]"
      >
        <!-- Image Section -->
        <div class="column is-half image-container">
          <img
            :src="useAsset(item?.image)"
            alt="home-img"
            class="about-us-img"
            loading="lazy"
            title="home-img"
          />
        </div>

        <!-- Text Section -->
        <div class="column is-half about-us-text">
          <h2 class="subtitle is-4">{{ item.title }}</h2>
          <p>{{ item.text }}</p>
        </div>
      </div>
    </div>
    <p v-else>Loading...</p>
  </section>
</template>

<style lang="scss" scoped>
.about-us {
  padding: $spacing-8;
}

.about-us-content {
  margin-bottom: $spacing-8;
}

.image-container img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.about-us-text {
  background-color: rgba(255, 255, 255, 0.9);
  padding: $spacing-8;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-left: -5%;
  z-index: 1;
}

.is-reverse {
  flex-direction: row-reverse;
}

.is-reverse .about-us-text {
  margin-left: 0;
  margin-right: -5%;
  text-align: right;
}

@include responsive(mobile, max) {
  .about-us-content {
    flex-direction: column !important;
  }

  .image-container,
  .about-us-text {
    width: 100%;
    margin: 0;
  }

  .about-us-text {
    padding: $spacing-base;
    box-shadow: none;
    background-color: transparent;
  }
}
</style>
