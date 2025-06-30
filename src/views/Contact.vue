<script lang="ts" setup>
import { useHead } from '@unhead/vue'
import ContactForm from '@/components/ContactForm.vue'

useHead({
  title: 'Contact Us - Vue Demo Store',
  meta: [
    { name: 'description', content: 'Get in touch with us at Vue Demo Store.' },
  ],
  link: [
    { rel: 'canonical', href: 'https://vue-demo-store.pages.dev/contact' },
  ],
})
</script>

<template>
  <ContactForm />
</template>
