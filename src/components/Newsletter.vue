<script lang="ts" setup>
import { ref } from 'vue'

const isSubmitted = ref(false)

function submit(): void {
  isSubmitted.value = true
}
</script>

<template>
  <section class="newsletter-area">
    <div class="container">
      <div class="columns is-justify-content-space-between">
        <div class="column is-full-mobile">
          <div class="newsletter-text">
            <h2 class="title is-3">Join our Newsletter</h2>
            <p>Get the latest trends in design furniture.</p>
          </div>
        </div>

        <div class="column is-full-mobile">
          <div v-if="!isSubmitted" class="newsletter-form">
            <form @submit.prevent="submit">
              <input
                class="input"
                placeholder="Your E-mail"
                required
                type="email"
              />
              <button class="submit-button is-dark input-button">Submit</button>
            </form>
          </div>

          <div v-else class="thank-you-message">
            <p>Thank you for subscribing!</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.newsletter-area {
  background-color: $light-blue;
  padding: $spacing-16;

  @include responsive(mobile, max) {
    padding: $spacing-12 $spacing-base;
  }
}

.newsletter-text {
  h2 {
    color: $color-black;
    margin-bottom: $spacing-3;
  }

  p {
    color: $color-black;
    margin-bottom: 0;
  }
}

.newsletter-form {
  form {
    display: flex;
    gap: $spacing-base;

    @include responsive(mobile, max) {
      flex-direction: column;
      .input-button {
        padding-block: $spacing-2;
      }
    }

    .input-button {
      transition-duration: 500ms;
      background-color: $color-black;
      color: $color-white;
      font-size: $font-size-lg;
      border-radius: $spacing-1;
      padding-inline: $spacing-8;
      border: none;

      &:hover,
      &:focus {
        background-color: inherit;
        color: $color-black;
        border: 1px solid $color-black;
      }
    }
  }
}

.thank-you-message {
  padding: $spacing-base;
  background-color: $light-blue;
  text-align: center;
  font-size: $font-size-lg;
  color: $color-black;
}
</style>
