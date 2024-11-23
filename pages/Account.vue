<script setup>
const authStore = useAuthStore();

const profile = ref({
  username: authStore.user.username,
  email: authStore.user.email,
});

const subscriptionData = ref(null);
const paymentMethods = ref(null);
const payments = ref(null);
const invoices = ref(null);

// Fetching data from Stripe (simulated here)
  const customerData = await useFetch('/api/customers/me');  // Assuming you fetch data with the customer ID
  subscriptionData.value = customerData.subscription;
  paymentMethods.value = customerData.paymentMethods;
  payments.value = customerData.payments;
  invoices.value = customerData.invoices;

// Unsubscribe function
const unsubscribe = () => {
  // Logic to unsubscribe the user (can be tied to an API call)
  alert("You have successfully unsubscribed.");
};
</script>

<template>
  <v-container class="my-8" fluid>
    <!-- Profile Section -->
    <v-card outlined>
      <v-card-title class="text-h5">Profile</v-card-title>
      <v-divider></v-divider>

      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Username</v-list-item-title>
              <v-text-field
                v-model="profile.username"
                outlined
                :rules="[validationRules.safe, validationRules.max(30)]"
                class="input-field"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Email</v-list-item-title>
              <v-text-field
                v-model="profile.email"
                outlined
                disabled
                class="input-field"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>

    <!-- Subscriptions Section -->
    <v-card outlined class="mt-4">
      <v-card-title class="text-h5">Subscriptions</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="subscriptionData">
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Status: </v-list-item-title>
                <v-chip color="purple" dark>
                  {{ subscriptionData.status }}
                </v-chip>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>Next Payment Date: </v-list-item-title>
                <v-text-field
                  outlined
                  disabled
                  :value="subscriptionData.nextPaymentDate"
                  class="input-field"
                ></v-text-field>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div v-else>
          <v-alert type="error">No subscription data available.</v-alert>
        </div>
      </v-card-text>
    </v-card>

    <!-- Payment Methods Section -->
    <v-card outlined class="mt-4">
      <v-card-title class="text-h5">Payment Methods</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="paymentMethods">
          <v-list>
            <v-list-item v-for="(method, index) in paymentMethods" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ method.cardType }} ending in {{ method.last4 }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div v-else>
          <v-alert type="error">No payment methods found.</v-alert>
        </div>
      </v-card-text>
    </v-card>

    <!-- Payments Section -->
    <v-card outlined class="mt-4">
      <v-card-title class="text-h5">Payments</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="payments">
          <v-list>
            <v-list-item v-for="(payment, index) in payments" :key="index">
              <v-list-item-content>
                <v-list-item-title>{{ payment.amount }} - {{ payment.date }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div v-else>
          <v-alert type="error">No payment records found.</v-alert>
        </div>
      </v-card-text>
    </v-card>

    <!-- Invoices Section -->
    <v-card outlined class="mt-4">
      <v-card-title class="text-h5">Invoices</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div v-if="invoices">
          <v-list>
            <v-list-item v-for="(invoice, index) in invoices" :key="index">
              <v-list-item-content>
                <v-list-item-title>Invoice #{{ invoice.number }} - {{ invoice.amount }}</v-list-item-title>
                <v-list-item-subtitle>{{ invoice.date }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </div>
        <div v-else>
          <v-alert type="error">No invoices found.</v-alert>
        </div>
      </v-card-text>
    </v-card>

    <!-- Unsubscribe Section -->
    <v-card outlined class="mt-4">
      <v-card-title class="text-h5">Unsubscribe</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-btn
          color="red"
          variant="elevated"
          @click="unsubscribe"
          class="unsubscribe-btn"
        >
          Unsubscribe
        </v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.input-field {
  width: 100%;
}

.mt-4 {
  margin-top: 16px;
}

.unsubscribe-btn {
  width: 100%;
  font-weight: bold;
}
</style>
