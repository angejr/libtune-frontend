<script setup>
const authStore = useAuthStore();

// const username = ref(authStore.user.username);
// const email = ref("");
// const password = ref("");
</script>

<template>
  <v-container class="my-8" fluid>
    <!-- Parent Account Card -->
    <v-card outlined>
      <v-card-title class="text-h5">My Account</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-row>
          <!-- Account Information Section -->
          <v-col cols="12" md="6">
            <v-card outlined class="account-section">
              <v-card-title>Account Information</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Username</v-list-item-title>
                      <v-text-field outlined v-model="authStore.user.username"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Email</v-list-item-title>
                      <v-text-field outlined disabled v-model="authStore.user.email"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Last Name</v-list-item-title>
                      <v-text-field outlined v-model="authStore.user.lastName"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>First Name</v-list-item-title>
                      <v-text-field outlined v-model="authStore.user.firstName"></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Billing Information Section -->
          <v-col cols="12" md="6">
            <v-card outlined class="account-section">
              <v-card-title>Billing Information</v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Card Number</v-list-item-title>
                      <v-text-field outlined></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-content>
                      <v-list-item-title>Expiration Date</v-list-item-title>
                      <v-text-field outlined></v-text-field>
                    </v-list-item-content>
                  </v-list-item>
                  <!-- Add more fields as needed -->
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- Save Changes Button -->
      <v-card-actions class="justify-end">
        <v-btn color="primary" variant="elevated" @click="saveAllChanges">Save All Changes</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>