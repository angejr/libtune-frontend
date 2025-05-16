<script setup>
  const displayStore = useDisplayStore()
  const { t, locales, setLocale } = useI18n();

  useSeoMeta({
    title: t("Terms.pageTitle"),
    ogTitle: t("Terms.pageTitle"),
    robots: {
      noindex: true,
      follow: true
    }
  })
</script>

<template>
  <v-container :class="!displayStore.isMobile ? 'py-8' : 'zero-padding'" style="display: flex; justify-content: center; border-radius: 12px;">
    <v-card :style="{ borderRadius: displayStore.isMobile ? 0 : '12px'}">
      <v-card-title style="display: flex; justify-content: center">
        <h1 v-if="!displayStore.isMobile">{{ $t('Terms.pageTitle') }}</h1>
        <h3 v-else>{{ $t('Terms.pageTitle') }}</h3>
      </v-card-title>
      <v-card-text>
        <body class="termsContent">
          <h1 v-if="!displayStore.isMobile">{{ $t('Terms.heading') }}</h1>
          <p><strong>{{ $t('Terms.effectiveDateLabel') }}</strong> 24/11/2024</p>
          <p><strong>{{ $t('Terms.lastUpdatedLabel') }}</strong> 24/11/2024</p>
          <p>{{ $t('Terms.intro') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.definitionsTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.definitionsTitle') }}</h3>
          <ul>
            <li>{{ $t('Terms.definitions.libtune') }}</li>
            <li>{{ $t('Terms.definitions.content') }}</li>
            <li>{{ $t('Terms.definitions.user') }}</li>
            <li>{{ $t('Terms.definitions.plan') }}</li>
          </ul>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.licenseTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.licenseTitle') }}</h3>
          <p><strong>{{ $t('Terms.license.permittedTitle') }}</strong> {{ $t('Terms.license.permitted') }}</p>
          <ul>
            <li>{{ $t('Terms.license.useRecreational') }}</li>
            <li>{{ $t('Terms.license.useCommercial') }}</li>
          </ul>
          <p><strong>{{ $t('Terms.license.prohibitedTitle') }}</strong></p>
          <ul>
            <li>{{ $t('Terms.license.redistribute') }}</li>
            <li>{{ $t('Terms.license.ownershipClaim') }}</li>
            <li>{{ $t('Terms.license.illegal') }}</li>
          </ul>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.subscriptionTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.subscriptionTitle') }}</h3>
          <p>{{ $t('Terms.subscription.plans') }}</p>
          <p>{{ $t('Terms.subscription.payments') }}</p>
          <p>{{ $t('Terms.subscription.cancellation') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.ipTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.ipTitle') }}</h3>
          <p>{{ $t('Terms.ip.ownership') }}</p>
          <p>{{ $t('Terms.ip.attribution') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.responsibilitiesTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.responsibilitiesTitle') }}</h3>
          <p>{{ $t('Terms.responsibilities.security') }}</p>
          <p>{{ $t('Terms.responsibilities.compliance') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.terminationTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.terminationTitle') }}</h3>
          <p>{{ $t('Terms.termination.clause1') }}</p>
          <p>{{ $t('Terms.termination.clause2') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.disclaimerTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.disclaimerTitle') }}</h3>
          <p>{{ $t('Terms.disclaimer') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.liabilityTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.liabilityTitle') }}</h3>
          <p>{{ $t('Terms.liability') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.indemnificationTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.indemnificationTitle') }}</h3>
          <p>{{ $t('Terms.indemnification') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.lawTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.lawTitle') }}</h3>
          <p>{{ $t('Terms.law') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.changesTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.changesTitle') }}</h3>
          <p>{{ $t('Terms.changes') }}</p>

          <h2 v-if="!displayStore.isMobile">{{ $t('Terms.contactTitle') }}</h2>
          <h3 v-else>{{ $t('Terms.contactTitle') }}</h3>
          <p>{{ $t('Terms.contact.intro') }}</p>
          <p><strong>{{ $t('Terms.contact.emailLabel') }}</strong> support@libtune.com</p>
          <p>{{ $t('Terms.contact.closing') }}</p>
        </body>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<style scoped>
  .zero-padding{
  padding: 0;
}

  .termsContent {
    font-family: Inter;
    line-height: 1.6;
    margin: 20px;
  }
  h1,
  h2 {
    color: #333;
  }
  p {
    margin: 10px 0;
  }
  ul {
    margin-left: 20px;
  }
  </style>