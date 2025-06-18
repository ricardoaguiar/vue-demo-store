<script setup lang="ts">
import { useMainStore } from '@/store'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import ButtonComponent from '@/components/UI/ButtonComponent.vue'

const store = useMainStore()
const router = useRouter()

onMounted(async () => await store.fetchNavigation())

const { isHeaderNavigation } = defineProps({
  isHeaderNavigation: {
    type: Boolean,
    required: false,
  },
})

function navigateTo(path: string): void {
  const isSamePath = router.currentRoute.value.fullPath === path
  const shouldToggleMenu = !isHeaderNavigation

  if (isSamePath && shouldToggleMenu) {
    store.toggleMobileMenu()
  } else {
    router.push(path).then(() => {
      if (shouldToggleMenu) {
        store.toggleMobileMenu()
      }
    })
  }
}
</script>

<template>
  <div class="nav-container">
    <template v-for="(link, i) in store.navLinks" :key="i">
      <ButtonComponent
        @click="navigateTo(link.url)"
        buttonClass="nav-link-button"
      >
        {{ link.name }}
      </ButtonComponent>
    </template>
  </div>
</template>

<style scoped lang="scss">
.nav-container {
  @include flex($justifyContent: space-between, $gap: $spacing-base);
  @include responsive(mobile, max) {
    font-size: $font-size-xl;
    flex-direction: column;
    align-items: flex-start;
    gap: 0;

    &:deep(.nav-link-button) {
      padding: $spacing-base $spacing-5;
      border-bottom: 1px solid $color-grey;
      justify-content: flex-start;
      width: 100%;
      text-align: left;

      &:hover {
        background-color: $hover-color;
        border-radius: 0;
      }
    }
  }
}

.nav-container:not(.mobile-menu .nav-container) {
  @include responsive(mobile, max) {
    display: none;
  }
}

.nav-link {
  background-color: white;
}

.nav-link-button {
  border: none;
}
</style>
