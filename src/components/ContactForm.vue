<template>
  <section class="contact-form">
    <div class="contact-us-img"></div>
    <div class="contact-us-form is-half">
      <h1 class="title">Hello there</h1>
      <h2 class="subtitle" style="color: grey">Get in touch.</h2>
      <form>
        <div class="field">
          <div class="control">
            <label class="label" for="name">Name </label>
            <input
              id="name"
              class="input"
              placeholder="name"
              required
              type="text"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label" for="email">E-mail </label>
            <input
              id="email"
              class="input"
              placeholder="email"
              required
              type="email"
            />
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="label" for="message">Message </label>
            <textarea
              id="message"
              class="textarea"
              placeholder="message"
              required
              rows="3"
            ></textarea>
          </div>
        </div>
        <button class="button is-light" type="submit">Submit</button>
      </form>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.contact-form {
  margin: $spacing-16;
  gap: $spacing-16 $spacing-8;
  min-height: 100%;
  width: 80vw;
  @include flex;

  @include responsive(mobile, max) {
    margin: $spacing-2 0;
    row-gap: $spacing-2;
    flex-direction: column;
    width: 100vw;
  }
}

.contact-us-img {
  background-image: url('@/assets/img/speaker.jpg');
  background-size: cover;
  background-position: center;
  width: 40%;

  @include responsive(mobile, max) {
    height: 25vh;
    width: 100vw;
  }
}

.contact-us-form {
  flex: 1;

  .subtitle {
    margin-bottom: $spacing-2;
  }

  @include responsive(mobile, max) {
    row-gap: $spacing-2;
    padding: $spacing-base;
  }
}

.label {
  font-size: $font-size-sm;
  color: $color-black;
}

.button {
  transition-duration: 500ms;
  background-color: $color-black;
  color: $color-white;
  font-size: $font-size-lg;
  border-radius: $spacing-1;
  padding-inline: $spacing-8;
  padding-block: $spacing-2;
  border: 1px solid transparent;
  transition: background-color 0.3s ease;
  cursor: pointer;
  width: 45%;

  &:hover,
  &:focus {
    color: $color-black;
    border: 1px solid $color-black;
    background-color: inherit;
  }

  @include responsive(mobile-small, max) {
    width: 100%;
  }
}
</style>
