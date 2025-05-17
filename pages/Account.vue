<script setup>
const authStore = useAuthStore();
const errorStore = useErrorStore();
const displayStore = useDisplayStore();
const { t, locales, setLocale } = useI18n();

const subscriptionData = ref([]);
const paymentMethods = ref([]);
const payments = ref([]);

useSeoMeta({
  title: t("Account.PageTitle"),
  ogtitle: t("Account.PageTitle"),
  description: t("Account.PageDescription"),
  oDescription: t("Account.PageDescription"),
  robots: {
    noindex: true,
    nofollow: true,
  },
});

if (!authStore?.userToken) {
  goToPath("/login");
}

if (authStore?.user?.customerId) {
  const { data, error } = await useFetch("/api/customers/me", {
    headers: {
      authorization: `Bearer ${authStore.userToken}`,
    },
  });
  if (error.value) {
    errorStore.setError({
      title: t("Account.FetchError"),
      texte: error.value.data,
    });
  } else {
    subscriptionData.value = data.value.subscriptions || [];
    paymentMethods.value = data.value.paymentMethods || [];
    payments.value = data.value.payments || [];
  }
}

const formatCurrency = (amount, currency) =>
  `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
const formatDate = (timestamp) =>
  new Date(timestamp * 1000).toLocaleDateString();
</script>

<template>
  <v-container class="py-8" fluid style="display: flex; flex-direction: column; justify-content: center; align-items: center">
    <!-- Profile -->
    <v-card outlined :class="displayStore.isMobile ? 'mb-4-mobile' : 'mb-4'">
      <v-card-title class="text-h5">{{ t("Account.Profile") }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          v-model="authStore.user.email"
          :label="t('Account.Email')"
          variant="outlined"
          disabled
          dense
          class="mt-4"
        />
        <v-text-field
          v-model="authStore.user.username"
          :label="t('Account.Username')"
          variant="outlined"
          disabled
          dense
          class="mt-4"
        />
      </v-card-text>
    </v-card>

    <!-- Subscriptions -->
    <v-card outlined :class="displayStore.isMobile ? 'mb-4-mobile' : 'mb-4'">
      <v-card-title class="text-h5">{{ t("Account.Subscriptions") }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table-virtual
          :headers="[
            { title: t('Account.Status'), value: 'status', align: 'center' },
            { title: t('Account.Product'), value: 'product' },
            { title: t('Account.BillingFrequency'), value: 'billing_frequency' },
            { title: t('Account.NextPaymentDate'), value: 'next_payment_date' },
            { title: '', value: 'action' },
          ]"
          :items="subscriptionData.map((sub) => ({
            status: sub.status,
            product: 'Libtune Premium',
            billing_frequency: sub.items.data[0]?.price.recurring.interval === 'month' ? t('Account.Monthly') : t('Account.Yearly'),
            next_payment_date: formatDate(sub.current_period_end),
            action,
          }))"
        >
          <template v-slot:no-data>
            <div style="display: flex; justify-content: space-around">
              <h2>{{ t("Account.NoSubscription") }}</h2>
              <v-btn @click="goToPath('/subscribe')" variant="elevated" color="purple">
                {{ t("Account.BuyPremium") }}
              </v-btn>
            </div>
          </template>
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="item.status == 'active' ? 'green' : 'red'" small>
              {{ item.status == 'active' ? t("Account.Active") : item.status }}
            </v-chip>
          </template>
          <template v-slot:[`item.product`]="{ item }">
            <strong>{{ item.product }}</strong>
          </template>
          <template v-slot:[`item.action`]="{}">
            <v-menu>
              <template v-slot:activator="{ props }">
                <v-btn icon="mdi-dots-vertical" size="small" variant="plain" v-bind="props" />
              </template>
              <v-list>
                <v-list-item @click="goToPath('/unsubscribe')">
                  <v-list-item-title style="color: red">
                    {{ t("Account.CancelSubscription") }}
                  </v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table-virtual>
      </v-card-text>
    </v-card>

    <!-- Payment Methods -->
    <v-card v-if="authStore?.user?.customerId" outlined :class="displayStore.isMobile ? 'mb-4-mobile' : 'mb-4'">
      <v-card-title class="text-h5">{{ t("Account.PaymentMethods") }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table-virtual
          :headers="[
            { title: '', value: 'brand' },
            { title: t('Account.CardNumber'), value: 'card_number' },
            { title: t('Account.ExpiryDate'), value: 'expiry_date' },
            { title: t('Account.BillingDetails'), value: 'actions', align: 'center' },
          ]"
          :items="paymentMethods.map((method, index) => ({
            brand: method.card.brand,
            card_number: `**** **** **** ${method.card.last4}`,
            expiry_date: `${method.card.exp_month}/${method.card.exp_year}`,
            index,
          }))"
          item-value="index"
          item-expanded-value="index"
          show-expand
        >
          <template v-slot:[`item.brand`]="{ item }">
            <div style="display: flex; align-items: center">
              <v-img :src="`/images/${item.brand}.png`" width="30" height="30" />
              <strong>{{ item.brand }}</strong>
            </div>
          </template>
          <template v-slot:expanded-row="{ item }">
            <v-card flat>
              <v-card-text>
                <p><strong>{{ t("Account.BillingName") }}:</strong> {{ paymentMethods[item.index].billing_details.name }}</p>
                <p><strong>{{ t("Account.Address") }}:</strong> {{ paymentMethods[item.index].billing_details.address.line1 }}</p>
                <p><strong>{{ t("Account.City") }}:</strong> {{ paymentMethods[item.index].billing_details.address.city }}</p>
                <p><strong>{{ t("Account.Country") }}:</strong> {{ paymentMethods[item.index].billing_details.address.country }}</p>
              </v-card-text>
            </v-card>
          </template>
        </v-data-table-virtual>
      </v-card-text>
    </v-card>

    <!-- Payments -->
    <v-card v-if="authStore?.user?.customerId" outlined :class="displayStore.isMobile ? 'mb-4-mobile' : 'mb-4'">
      <v-card-title class="text-h5">{{ t("Account.Payments") }}</v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-data-table-virtual
          :headers="[
            { title: t('Account.Amount'), value: 'amount' },
            { title: t('Account.Status'), value: 'status' },
            { title: t('Account.Description'), value: 'description' },
            { title: t('Account.Date'), value: 'date' },
          ]"
          :items="payments.map((payment) => ({
            status: payment.status,
            amount: formatCurrency(payment.amount, payment.currency),
            description: payment.description || t('Account.NoDescription'),
            date: formatDate(payment.created),
          }))"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip :color="item.status == 'succeeded' ? 'green' : 'red'" small>
              {{ item.status }}
            </v-chip>
          </template>
          <template v-slot:[`item.amount`]="{ item }">
            <strong>{{ item.amount }}</strong>
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

.mb-4-mobile {
  margin-bottom: 16px;
  width: 100%
}

.elevation-1 {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
}
</style>
