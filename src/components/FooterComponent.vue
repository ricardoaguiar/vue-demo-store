<script lang="ts" setup>
import { onMounted } from 'vue'
import { useMainStore } from '@/store'

const store = useMainStore()

onMounted(async () => await store.fetchFooter())
</script>

<template>
  <footer class="footer has-background-light">
    <div class="footer-top">
      <div
        v-for="(section, index) in store.footerData?.sections"
        :key="index"
        class="footer-section"
      >
        <h3 class="title is-5">{{ section?.title }}</h3>
        <ul class="links-list">
          <li v-for="(link, linkIndex) in section.links" :key="linkIndex">
            <RouterLink :to="link.url">{{ link?.text }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-bottom-left">
        <h3 class="title is-5">Get Social</h3>
        <div class="social-links">
          <a
            v-for="(social, i) in store.footerData?.social"
            :key="i"
            :href="social.url"
            class="social-link"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span class="social-icon" v-html="social.icon"></span>
          </a>
        </div>
      </div>

      <div class="footer-bottom-right">
        <p>{{ store.footerData?.contactInfo?.address }}</p>
        <p>
          Email:
          <a :href="'mailto:' + store.footerData?.contactInfo.email">{{
            store.footerData?.contactInfo.email
          }}</a>
        </p>
        <p>
          Phone:
          <a :href="'tel:' + store.footerData?.contactInfo.phone">{{
            store.footerData?.contactInfo.phone
          }}</a>
        </p>
      </div>
    </div>

    <div class="copyright has-text-centered">
      <p>{{ store.footerData?.copyright }}</p>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.footer {
  padding: $spacing-base;
}

.footer-top {
  @include flex(
    $direction: row,
    $justifyContent: space-between,
    $gap: $spacing-base
  );
  margin: $spacing-8 $spacing-16;
  padding-bottom: $spacing-8;
  width: 80%;

  @include responsive(mobile-small, max) {
    flex-direction: column;
    align-items: flex-start;
    margin: 0;
    width: 100%;
  }

  @include responsive(mobile, max) {
    margin: $spacing-8 $spacing-2;
    width: 90%;
  }
}

.footer-section {
  line-height: $line-height-xl;

  @include responsive(mobile-small, max) {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-bottom: 1px solid $color-grey;

    .title {
      margin-bottom: $spacing-1;
    }

    &:first-child {
      margin-top: $spacing-5;
    }

    &:last-child {
      margin-bottom: $spacing-5;
      border-bottom: none;
    }
  }
}

.links-list {
  @include flex(
    $direction: column,
    $justifyContent: space-between,
    $alignItems: flex-start
  );
  padding: 0;
  margin: 0;

  @include responsive(mobile-small, max) {
    justify-content: space-between;
    flex-flow: row wrap;
    margin-bottom: $spacing-base;

    li {
      flex-basis: 50%;
      width: 50%;
    }
  }
}

.footer-bottom {
  @include flex(
    $direction: row,
    $justifyContent: space-between,
    $gap: $spacing-base
  );
  width: 100%;
  padding-inline: $spacing-8;
  margin-bottom: $spacing-base;

  @include responsive(mobile-small, max) {
    flex-direction: column;
    align-items: flex-start;
    padding-inline: 0;
  }

  @include responsive(mobile, max) {
    padding-inline: $spacing-2;
  }
}

.footer-bottom-left {
  .title {
    margin-bottom: $spacing-3;
  }
}

.footer-bottom-right {
  p,
  a {
    font-weight: normal;
    text-align: right;

    @include responsive(mobile-small, max) {
      text-align: left;
    }
  }
}

.social-links {
  display: flex;
  justify-content: flex-start;
  gap: $spacing-base;
}

.social-icon {
  &:deep(svg) {
    width: 1.5rem;
    height: 1.5rem;
    fill: $primary-color;
  }
}

.copyright {
  padding: $spacing-base;
}
</style>
