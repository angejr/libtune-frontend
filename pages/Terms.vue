<script setup>
  const displayStore = useDisplayStore()

  useSeoMeta({
  title: "Terms and Conditions",
  ogTitle: "Terms and Conditions",
  robots: {
    noindex: true,
    follow: true
  }
})

</script>

<template>
    <v-container class="py-8" style="display: flex; justify-content: center; border-radius: 12px;">
      <v-card style="border-radius: 12px;">
        <v-card-title style="display: flex; justify-content: center">
          <h1 v-if="!displayStore.isMobile">Terms and Conditions</h1>
          <h3 v-else>Terms and Conditions</h3>
        </v-card-title>
        <v-card-text>
          <body class="termsContent">
            <h1 v-if="!displayStore.isMobile">Terms of Service for Libtune</h1>
            <p><strong>Effective Date:</strong> 24/11/2024</p>
            <p><strong>Last Updated:</strong> 24/11/2024</p>
            <p>
              Welcome to Libtune! These Terms of Service (“Terms”) govern your 
              access to and use of the Libtune platform, including our website,
              services, and music library (collectively, the “Services”). By using
              Libtune, you agree to these Terms. If you do not agree, you may not
              use the Services.
            </p>
  
            <h2 v-if="!displayStore.isMobile">1. Definitions</h2>
            <h3 v-else>1. Definitions</h3>
            <ul>
              <li>
                <strong>"Libtune"</strong> refers to our platform, services, and
                any associated applications.
              </li>
              <li>
                <strong>"Content"</strong> refers to the music, soundtracks, and
                other audio files available on Libtune.
              </li>
              <li>
                <strong>"User"</strong> refers to any inbodyidual or entity using
                the Services, whether free or paying.
              </li>
              <li>
                <strong>"Subscription Plan"</strong> refers to the paid service
                that provides access to download and use Content under the
                specified license.
              </li>
            </ul>
  
            <h2 v-if="!displayStore.isMobile">2. License Grant</h2>
            <h3 v-else>2. License Grant</h3>
            <p>
              <strong>2.1 Permitted Uses:</strong> Upon subscribing to a paid
              Subscription Plan, Libtune grants you a non-exclusive,
              non-transferable, royalty-free license to:
            </p>
            <ul>
              <li>
                Use the Content recreationally (e.g., personal listening or
                private projects).
              </li>
              <li>
                Use the Content for commercial purposes, such as in monetized
                YouTube videos, podcasts, advertisements, or other media projects.
              </li>
            </ul>
            <p><strong>2.2 Prohibited Uses:</strong> You may not:</p>
            <ul>
              <li>
                Redistribute, sell, or sublicense the Content as is or as part of
                a competing service.
              </li>
              <li>Claim ownership of the Content.</li>
              <li>
                Use the Content in projects that violate applicable laws or
                promote hate speech, violence, or illegal activities.
              </li>
            </ul>
  
            <h2 v-if="!displayStore.isMobile">3. Subscription and Payment</h2>
            <h3 v-else>3. Subscription and Payment</h3>
            <p>
              <strong>3.1 Subscription Plans:</strong> Access to Libtune’s
              downloadable Content is available through a paid Subscription Plan.
              Plan details, including pricing and benefits, are listed on our
              website.
            </p>
            <p>
              <strong>3.2 Payments:</strong> All payments are processed securely
              via [insert payment gateway, e.g., Stripe or PayPal]. Subscription
              fees are billed on a recurring monthly basis.
            </p>
            <p>
              <strong>3.3 Cancellation:</strong> You may cancel your subscription
              at any time through your account settings. Upon cancellation, you
              will retain access to the Services until the end of your billing
              cycle.
            </p>
  
            <h2 v-if="!displayStore.isMobile">4. Intellectual Property</h2>
            <h3 v-else>4. Intellectual Property</h3>
            <p>
              <strong>4.1 Ownership:</strong> All Content available on Libtune
              remains the intellectual property of Libtune and/or its licensors.
              Users do not obtain ownership rights to the Content.
            </p>
            <p>
              <strong>4.2 Attribution:</strong> While attribution is not required,
              we encourage users to credit Libtune in their projects where
              applicable.
            </p>
  
            <h2 v-if="!displayStore.isMobile">5. User Responsibilities</h2>
            <h3 v-else>5. User Responsibilities</h3>
            <p>
              <strong>5.1 Account Security:</strong> You are responsible for
              maintaining the security of your account credentials and for all
              activities conducted through your account.
            </p>
            <p>
              <strong>5.2 Compliance:</strong> You agree to use the Services in
              accordance with all applicable laws and regulations.
            </p>
  
            <h2 v-if="!displayStore.isMobile">6. Termination</h2>
            <h3 v-else>6. Termination</h3>
            <p>
              <strong>6.1</strong> Libtune reserves the right to suspend or
              terminate your account at any time for violation of these Terms or
              misuse of the Services.
            </p>
            <p>
              <strong>6.2</strong> Upon termination, your access to the Content
              will be revoked, but any projects created during your active
              subscription may continue to use the licensed Content.
            </p>
  
            <h2 v-if="!displayStore.isMobile">7. Disclaimer of Warranties</h2>
            <h3 v-else>7. Disclaimer of Warranties</h3>
            <p>
              Libtune provides the Services “as is” and disclaims all warranties,
              express or implied, including but not limited to merchantability,
              fitness for a particular purpose, and non-infringement.
            </p>
  
            <h2 v-if="!displayStore.isMobile">8. Limitation of Liability</h2>
            <h3 v-else>8. Limitation of Liability</h3>
            <p>
              To the fullest extent permitted by law, Libtune shall not be liable
              for any indirect, incidental, consequential, or special damages
              arising out of or in connection with your use of the Services.
            </p>
  
            <h2 v-if="!displayStore.isMobile">9. Indemnification</h2>
            <h3 v-else>9. Indemnification</h3>
            <p>
              You agree to indemnify and hold Libtune harmless from any claims,
              damages, or expenses (including reasonable legal fees) arising out
              of your use of the Services or breach of these Terms.
            </p>
  
            <h2 v-if="!displayStore.isMobile">10. Governing Law</h2>
            <h3 v-else>10. Governing Law</h3>
            <p>
              These Terms are governed by the laws of France. Any disputes arising
              from or related to these Terms shall be resolved in the courts of
              [insert specific jurisdiction in France, e.g., Paris].
            </p>
  
            <h2 v-if="!displayStore.isMobile">11. Changes to the Terms</h2>
            <h3 v-else>11. Changes to the Terms</h3>
            <p>
              Libtune reserves the right to modify these Terms at any time. We
              will notify users of significant changes via email or platform
              notifications. Continued use of the Services after changes are
              implemented constitutes your acceptance of the new Terms.
            </p>
  
            <h2 v-if="!displayStore.isMobile">12. Contact Information</h2>
            <h3 v-else>12. Contact Information</h3>
            <p>If you have questions about these Terms, please contact us at:</p>
            <p><strong>Email:</strong> support@libtune.com</p>
            <p>
              By using Libtune, you agree to these Terms. Thank you for choosing
              Libtune for your music needs!
            </p>
          </body>
        </v-card-text>
      </v-card>
    </v-container>
</template>

<style scoped>
  .termsContent {
    font-family: Arial, sans-serif;
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