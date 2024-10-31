<script setup>
const authStore = useAuthStore();

console.log(window.onload)

onMounted(() => {
  // Check if `window.onload` is a function and call it manually
  if (typeof window.onload === 'function') {
    window.onload();
  }
});

// Define the URL as a ref or computed property
const url = ref(STRAPI_URL);

</script>

<template>
  <v-container>
    <h1>COUCOU</h1>
    <v-btn class="SS_ProductCheckout" color="primary" data-id="1" :data-url="url" :data-email="authStore.user.email">
      Subscribe
    </v-btn>
  </v-container>
</template>