<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();

const profile = ref({
  username: authStore.user.username,
  email: authStore.user.email,
});

const subscriptionData = ref([]);
const paymentMethods = ref([]);
const payments = ref([]);

// Fetching data from Stripe API
const { data, error } = await useFetch("/api/customers/me", {
  headers: {
    authorization: `Bearer ${authStore.userToken}`,
  },
});
if (error.value) {
  errorStore.setError({
    title: "Could not fetch account data",
    texte: error.value.data,
  });
} else {
  subscriptionData.value = data.value.subscriptions || [];
  paymentMethods.value = data.value.paymentMethods || [];
  payments.value = data.value.payments || [];
}

const formatCurrency = (amount, currency) =>
  `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
const formatDate = (timestamp) =>
  new Date(timestamp * 1000).toLocaleDateString();
</script>

<template>
  <v-container
    class="my-8"
    style="
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    "
    fluid
  >
    <!-- Profile Section Section -->
    <v-card outlined class="mb-4">
      <v-card-title class="text-h5"> Profile </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          v-model="authStore.user.email"
          label="Email"
          variant="outlined"
          disabled
          dense
          class="mt-4"
        >
        </v-text-field>
        <v-text-field
          v-model="authStore.user.username"
          label="Username"
          variant="outlined"
          disabled
          dense
          class="mt-4"
        >
        </v-text-field>
      </v-card-text>
    </v-card>
    <!-- Subscriptions Section -->
    <v-card outlined class="mb-4">
      <v-card-title class="text-h5">Subscriptions</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table-virtual
          :headers="[
            { title: 'Status', value: 'status', align: 'center' },
            { title: 'Product', value: 'product' },
            { title: 'Billing Frequency', value: 'billing_frequency' },
            { title: 'Next Payment Date', value: 'next_payment_date' },
            { title: '', value: 'action' },
          ]"
          :items="
            subscriptionData.map((sub) => ({
              status: sub.status,
              // product: sub.items.data[0]?.price.product.name,
              product: 'Libtune Permium',
              billing_frequency:
                sub.items.data[0]?.price.recurring.interval === 'month'
                  ? 'Monthly'
                  : 'Yearly',
              next_payment_date: formatDate(sub.current_period_end),
              action,
            }))
          "
        >
          <template v-slot:item.status="{ item }">
            <v-chip v-if="item.status == 'active'" color="green" small>
              active
            </v-chip>
            <v-chip v-else color="red" small> inactive </v-chip>
          </template>

          <template v-slot:item.product="{ item }">
            <strong>
              {{ item.product }}
            </strong>
          </template>

          <template v-slot:item.action="{ item }">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn
                  icon="mdi-dots-vertical"
                  size="small"
                  variant="plain"
                  v-bind="props"
                ></v-btn>
              </template>
              <v-list>
                <v-list-item @click="goToPath('/unsubscribe')">
                  <v-list-item-title style="color: red"
                    >Cancel Subscription</v-list-item-title
                  >
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table-virtual>
      </v-card-text>
    </v-card>

    <!-- Payment Methods Section -->
    <v-card outlined class="mb-4">
      <v-card-title class="text-h5">Payment Methods</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table-virtual
          :headers="[
            { title: '', value: 'brand' },
            { title: 'Card Number', value: 'card_number' },
            { title: 'Expiry Date', value: 'expiry_date' },
            { title: 'Billing Details', value: 'actions', align: 'center' },
          ]"
          :items="
            paymentMethods.map((method, index) => ({
              brand: method.card.brand,
              card_number: `**** **** **** ${method.card.last4}`,
              expiry_date: `${method.card.exp_month}/${method.card.exp_year}`,
              index,
            }))
          "
          item-value="index"
          item-expanded-value="index"
          show-expand
        >
          <template v-slot:item.brand="{ item }">
            <div style="display: flex; align-items: center">
              <v-img
                :src="`/images/${item.brand}.png`"
                width="30"
                height="30"
              ></v-img>
              <strong>
                {{ item.brand }}
              </strong>
            </div>
          </template>

          <template v-slot:expanded-row="{ item }">
            <v-card flat>
              <v-card-text>
                <p>
                  <strong>Billing Name:</strong>
                  {{ paymentMethods[item.index].billing_details.name }}
                </p>
                <p>
                  <strong>Address:</strong>
                  {{ paymentMethods[item.index].billing_details.address.line1 }}
                </p>
                <p>
                  <strong>City:</strong>
                  {{ paymentMethods[item.index].billing_details.address.city }}
                </p>
                <p>
                  <strong>Country:</strong>
                  {{
                    paymentMethods[item.index].billing_details.address.country
                  }}
                </p>
              </v-card-text>
            </v-card>
          </template>
        </v-data-table-virtual>
      </v-card-text>
    </v-card>

    <!-- Payments Section -->
    <v-card outlined class="mb-4">
      <v-card-title class="text-h5">Payments</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table-virtual
          :headers="[
            { title: 'Amount', value: 'amount' },
            { title: 'Status', value: 'status' },
            { title: 'Description', value: 'description' },
            { title: 'Date', value: 'date' },
          ]"
          :items="
            payments.map((payment) => ({
              status: payment.status,
              amount: formatCurrency(payment.amount, payment.currency),
              description: payment.description || 'No description provided',
              date: formatDate(payment.created),
            }))
          "
        >
          <template v-slot:item.status="{ item }">
            <v-chip :color="item.status == 'succeeded' ? 'green' : 'red'" small>
              {{ item.status }}
            </v-chip>
          </template>

          <template v-slot:item.amount="{ item }">
            <strong>
              {{ item.amount }}
            </strong>
          </template>
        </v-data-table-virtual>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
.mb-4 {
  margin-bottom: 16px;
  width: 800px;
  min-width: 100vh;
}

.elevation-1 {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
