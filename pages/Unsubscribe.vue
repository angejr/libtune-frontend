<script setup>
const authStore = useAuthStore();
const feedback = ref('');
const feedbackError = ref(false);

const unsubscribe = () => {
  if (!feedback.value.trim()) {
    feedbackError.value = true;
    return;
  }
  feedbackError.value = false;

  

  // Logic to handle unsubscription, e.g., API call
//   alert('You have unsubscribed successfully. We’re sorry to see you go!');
};
</script>

<template>
  <v-container class="py-8" style="display: flex; justify-content: center">
    <v-card class="unsubscribe-card" elevation="10" max-width="500">
      <!-- Title -->
      <v-card-title class="text-center text-h5 font-weight-bold">
        <v-icon icon="mdi-close" color="red"></v-icon>
        Cancel Premium
      </v-card-title>

      <!-- Benefits Lost -->
      <v-card-subtitle class="text-center text-h6 font-weight-medium">
        By unsubscribing, you’ll lose access to:
      </v-card-subtitle>
      <v-card-text>
        <v-list dense>
          <v-list-item>
            <v-icon icon="mdi-close" color="red" class="list-icon"></v-icon>
            Unlimited downloads of high-quality music
          </v-list-item>
          <v-list-item>
            <v-icon icon="mdi-close" color="red" class="list-icon"></v-icon>
            Royalty-free license for all downloaded music
          </v-list-item>
          <v-list-item>
            <v-icon icon="mdi-close" color="red" class="list-icon"></v-icon>
            Use in recreational and personal projects
          </v-list-item>
          <v-list-item>
            <v-icon icon="mdi-close" color="red" class="list-icon"></v-icon>
            Monetized commercial use (e.g., YouTube, podcasts)
          </v-list-item>
        </v-list>
      </v-card-text>

      <!-- Legal Note -->
      <v-divider></v-divider>
      <v-card-text class="legal-note">
        <p>
          <strong>Note:</strong> Upon unsubscribing, you will no longer have the
          legal right to use previously downloaded music for any purposes.
        </p>
      </v-card-text>

      <!-- Feedback Section -->
      <v-divider></v-divider>
      <v-card-text>
        <v-textarea
          v-model="feedback"
          outlined
          label="Please let us know why you're unsubscribing"
          :error="feedbackError"
          :error-messages="feedbackError ? 'Feedback is required.' : ''"
          rows="4"
        ></v-textarea>
      </v-card-text>

      <!-- Unsubscribe Button -->
      <v-card-actions style="display: flex; justify-content: center">
        <v-btn
          color="red"
          variant="elevated"
          large
          :disabled="!feedback.trim()"
          @click="unsubscribe"
        >
          Cancel Subscription
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.unsubscribe-card {
  border-radius: 12px;
}

.list-icon {
  margin-right: 8px;
}

.legal-note {
  color: #f44336;
  font-size: 0.875rem;
}
</style>
