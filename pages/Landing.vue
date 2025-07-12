<script setup>
const displayStore = useDisplayStore();
const authStore = useAuthStore();
const errorStore = useErrorStore();
const config = useRuntimeConfig();
const STRAPI_URL = config.public.strapiUrl;
const stripeLoading = ref(false);
const { t, locales, setLocale, locale } = useI18n();
const landingDialog = useCookie('landingDialog', { default: () => true });
const landingDialogState = useLandingDialog()
const { email, leadSuccess, leadLoading, isFormValid, formRef } = landingDialogState


const submitForm = async () => {
  if (formRef.value && formRef.value.validate()) {
    leadLoading.value = true
    try {
      await authStore.postLead(email.value, locale.value);
      leadSuccess.value = true
      landingDialog.value = false

    } catch (e) {
      errorStore.setError({title: "Lead Error:", text: e.message})
    }
    leadLoading.value= false
  }
}

useSeoMeta({
  title: t("Landing.PageTitle"),
  ogTitle: t("Landing.PageTitle"),
  robots: {
    noindex: true,
    nofollow: true,
  },
});

async function goToStripe() {
  // for product Checkout
  try {
    stripeLoading.value = true;
    await SS_ProductCheckout(
      displayStore.countryPrice.priceId,
      STRAPI_URL,
      authStore.user.email
    );
  } catch (e) {
    errorStore.setError({ title: "Error", text: e.message });
    stripeLoading.value = false;
  }
}

// Generate a random pastel color based on username
function getColor(name) {
  const colors = ["blue", "red", "green", "purple", "orange", "pink", "teal"];
  return colors[name.charCodeAt(0) % colors.length]; // Pick a color based on the first letter
}

async function subscribe() {
  if (authStore?.userToken) {
    await goToStripe();
  } else {
    displayStore.setSubscribeAfterSignUp(true);
    goToPath("/signup");
  }
}

const items = [
  { id: 1, title: "Pop", color: "pink", image: "images/pop.jpg" },
  {
    id: 2,
    title: t("Landing.MusicCategory.Electronic"),
    color: "purple",
    image: "images/electronic.jpg",
  },
  {
    id: 3,
    title: t("Landing.MusicCategory.Hip-Hop"),
    color: "orange",
    image: "images/hip-hop.jpg",
  },
  {
    id: 4,
    title: t("Landing.MusicCategory.Cinematic"),
    color: "tiel",
    image: "images/cinematic.jpg",
  },
  {
    id: 5,
    title: t("Landing.MusicCategory.Classical"),
    color: "yellow",
    image: "images/classical.jpg",
  },
  {
    id: 5,
    title: t("Landing.MusicCategory.Acoustic"),
    color: "pink",
    image: "images/acoustic.jpg",
  },
];

const faq = [
  {
    title: t("Landing.Faq.1.title"),
    text: t("Landing.Faq.1.text"),
  },
  {
    title: t("Landing.Faq.2.title"),
    text: t("Landing.Faq.2.text"),
  },
  {
    title: t("Landing.Faq.3.title"),
    text: t("Landing.Faq.3.text"),
  },
  {
    title: t("Landing.Faq.4.title"),
    text: t("Landing.Faq.4.text"),
  },
  {
    title: t("Landing.Faq.5.title"),
    text: t("Landing.Faq.5.text"),
  },
  {
    title: t("Landing.Faq.6.title"),
    text: t("Landing.Faq.6.text"),
  },
  {
    title: t("Landing.Faq.7.title"),
    text: t("Landing.Faq.7.text"),
  },
  {
    title: t("Landing.Faq.8.title"),
    text: t("Landing.Faq.8.text"),
  },
  {
    title: t("Landing.Faq.9.title"),
    text: t("Landing.Faq.9.text"),
  },
  {
    title: t("Landing.Faq.10.title"),
    text: t("Landing.Faq.10.text"),
  },
];

const reviews = [
  {
    id: 1,
    text: t("Landing.Reviews.1"),
    user: "AliceM",
    value: 4.5,
  },
  {
    id: 2,
    text: t("Landing.Reviews.2"),
    user: "Jake92",
    value: 4.0,
  },
  {
    id: 3,
    text: t("Landing.Reviews.3"),
    user: "Samantha_R",
    value: 5,
  },
  {
    id: 4,
    text: t("Landing.Reviews.4"),
    user: "Mike_T",
    value: 4,
  },
  {
    id: 5,
    text: t("Landing.Reviews.5"),
    user: "FilmmakerJoe",
    value: 4.5,
  },
  {
    id: 6,
    text: t("Landing.Reviews.6"),
    user: "ElenaV",
    value: 4.5,
  },
  {
    id: 7,
    text: t("Landing.Reviews.7"),
    user: "Chris_W",
    value: 4,
  },
  {
    id: 8,
    text: t("Landing.Reviews.8"),
    user: "ZaneF",
    value: 4,
  },
  {
    id: 9,
    text: t("Landing.Reviews.9"),
    user: "MelodyQueen",
    value: 5.0,
  },
  {
    id: 10,
    text: t("Landing.Reviews.10"),
    user: "Leo_D",
    value: 4.0,
  },
  {
    id: 11,
    text: t("Landing.Reviews.11"),
    user: "JayJay",
    value: 4.5,
  },
  {
    id: 12,
    text: t("Landing.Reviews.12"),
    user: "Steph_K",
    value: 4.5,
  },
  {
    id: 13,
    text: t("Landing.Reviews.13"),
    user: "DesignGuru",
    value: 3.5,
  },
  {
    id: 14,
    text: t("Landing.Reviews.14"),
    user: "PodcastSteve",
    value: 5,
  },
  {
    id: 15,
    text: t("Landing.Reviews.15"),
    user: "Nina_S",
    value: 4.5,
  },
  {
    id: 16,
    text: t("Landing.Reviews.16"),
    user: "Marko",
    value: 4.5,
  },
  {
    id: 17,
    text: t("Landing.Reviews.17"),
    user: "LiamB",
    value: 4,
  },
  {
    id: 18,
    text: t("Landing.Reviews.18"),
    user: "RealJohnDoe",
    value: 4.5,
  },
  {
    id: 19,
    text: t("Landing.Reviews.19"),
    user: "StreamerAlex",
    value: 5,
  },
  {
    id: 20,
    text: t("Landing.Reviews.20"),
    user: "KatieW",
    value: 4.5,
  },
];
</script>

<template>
  <v-container style="width: 100%; padding: 0">
    <!-- Landing Dialog -->
     <ClientOnly>
       <v-dialog v-model="landingDialog" max-width="500px">
         <v-card>
           <v-card-title style="text-align: center; font-weight: bold;" class="font-inter"> 🎁 {{ $t('app.FreeMusicPackage') }} 🎁 </v-card-title>
           <v-card-text v-if="!leadSuccess" style="display: flex; flex-direction: column; gap: 10px">
             <p class="text-justify font-inter">
               {{ $t('app.GetFreeBundle') }}
             </p>
   
             <v-form
             v-model="isFormValid"
             ref="formRef"
             lazy-validation
           >
             <v-text-field
               v-model="email"
               :label="$t('SignUp.email')"
               variant="outlined"
               :rules="[validationRules.required, validationRules.email, validationRules.safe, validationRules.max(60)]"
               dense
               class="mt-4"
             ></v-text-field>
             <v-btn
               :disabled="!isFormValid"
               @click="submitForm"
               :color="!isFormValid ? 'grey' : 'primary'"
               block
               size="large"
               class="text-capitalize font-inter"
               :loading="leadLoading"
             >
             {{ $t('app.GetFreeSongs') }}
             </v-btn>
           </v-form>
         </v-card-text>
         <v-card-text v-else  style="display: flex; justify-content: center;">
           <v-icon large color="green" class="mr-3">mdi-check-circle</v-icon>
           <p class="font-inter font-weight-medium">
             {{ $t('app.RequestSent') }}
           </p>
             
         </v-card-text>
         </v-card>
       </v-dialog>
     </ClientOnly> 
    <!-- Presentation -->
    <v-container class="py-4" fluid>
      <v-row>
        <v-col cols="12" md="6">
          <v-card
            style="
              width: 100%;
              box-shadow: 0 0 0 0;
              background-color: transparent;
            "
          >
            <v-card-title
              style="
                font-family: Montserrat;
                line-height: 1;
                word-wrap: break-word;
                overflow: visible;
                white-space: normal;
              "
            >
              <h1>
                {{ $t(`Landing.TitleVersions.${displayStore.titleVersion}`) }}
              </h1>
            </v-card-title>
            <v-card-text>
              <v-list
                v-if="displayStore.subtitleVersion === 1"
                style="background-color: transparent"
              >
                <v-list-item style="padding-left: 0; padding-right: 0">
                  <div class="list-div font-inter">
                    <v-icon> mdi-music</v-icon>
                    <p>{{ $t("Landing.SubtitleVersions.1.1") }}</p>
                  </div>
                </v-list-item>
                <v-list-item style="padding-left: 0; padding-right: 0">
                  <div class="list-div font-inter">
                    <v-icon> mdi-download</v-icon
                    >{{ $t("Landing.SubtitleVersions.1.2") }}
                  </div>
                </v-list-item>
                <v-list-item style="padding-left: 0; padding-right: 0">
                  <div class="list-div font-inter">
                    <v-icon> mdi-license</v-icon
                    >{{ $t("Landing.SubtitleVersions.1.3") }}
                  </div>
                </v-list-item>
                <v-list-item style="padding-left: 0; padding-right: 0">
                  <div class="list-div font-inter">
                    <v-icon> mdi-cash</v-icon
                    >{{ $t("Landing.SubtitleVersions.1.4") }}
                  </div>
                </v-list-item>
              </v-list>
              <p
                v-else
                class="font-inter text-subtitle-1 font-weight-medium mt-4"
              >
                {{ $t(`Landing.SubtitleVersions.${displayStore.subtitleVersion}`) }}
              </p>
            </v-card-text>
            <v-card-actions>
              <div style="display: flex; flex-direction: column; gap: 15px">
                <v-btn
                  class="font-inter text-capitalize text-h6"
                  style="padding: 30px; display: flex; justify-content: center"
                  color="purple"
                  variant="elevated"
                  @click="goToPath('/subscribe')"
                >
                  {{ $t("Landing.StartFreeTrial") }}</v-btn
                >
                <p
                  class="font-inter"
                  style="font-size: small; font-weight: 600; text-align: center"
                >
                  {{
                    $t("Landing.TrialCondition", {
                      price: displayStore.countryPrice.priceValue,
                    })
                  }}
                </p>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-if="!displayStore.isMobile" cols="12" md="6">
          <v-img src="/images/image_landing_title.webp" width="100%"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-8" style="width: 100%; background-color: black">
      <v-row>
        <v-col v-for="item in items" :key="item.id" cols="6" sm="4" md="3">
          <v-card class="pa-2" style="padding: 0 !important" rounded="0">
            <v-card-title
              :style="{ backgroundColor: item.color, fontWeight: 'bold' }"
              >{{ item.title }}</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-lazy>
      <v-container class="py-8" fluid>
        <v-row width="100%">
          <v-col cols="12" md="6">
            <v-img src="/images/image_landing_subtitle.webp" width="100%"></v-img>
          </v-col>
          <v-col cols="12" md="6">
            <v-card style="background-color: transparent; box-shadow: 0 0 0 0">
              <v-card-title class="font-inter">
                {{ $t("Landing.WhyLibtune.title") }}
              </v-card-title>
              <v-card-text>
                <v-list
                  style="
                    background-color: transparent;
                    box-shadow: 0 0 0 0;
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                  "
                >
                  <v-list-item
                    class="libtune-advantage"
                    style="padding-left: 0; padding-right: 0"
                  >
                    <h3>
                      {{ $t("Landing.WhyLibtune.2") }}
                    </h3></v-list-item
                  >
                  <v-list-item
                    class="libtune-advantage"
                    style="padding-left: 0; padding-right: 0"
                  >
                    <h3>
                      {{ $t("Landing.WhyLibtune.3") }}
                    </h3></v-list-item
                  >
                  <v-list-item
                    class="libtune-advantage"
                    style="padding-left: 0; padding-right: 0"
                  >
                    <h3>
                      {{ $t("Landing.WhyLibtune.4") }}
                    </h3></v-list-item
                  >
                  <v-list-item
                    class="libtune-advantage"
                    style="padding-left: 0; padding-right: 0"
                  >
                    <h3>
                      {{ $t("Landing.WhyLibtune.5") }}
                    </h3></v-list-item
                  >
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  color="black"
                  variant="elevated"
                  @click="goToPath('/subscribe')"
                  class="text-capitalize font-inter"
                >
                  {{ $t("Landing.StartFreeTrial") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-lazy>
    <v-lazy>
      <!-- Reviews -->
      <v-container class="py-4">
        <div class="mb-6">
          <h1
            style="
              font-family: Montserrat;
              font-size: x-large;
              text-align: center;
            "
          >
            {{ $t("Landing.Reviews.title") }}
          </h1>
        </div>
        <v-slide-group :mobile="displayStore.isMobile">
          <v-slide-group-item v-for="review in reviews" :key="review.id">
            <v-card class="mx-6 pa-4" width="300">
              <template v-slot:prepend>
                <v-avatar :color="getColor(review.user)">
                  <span class="text-white text-h6">{{
                    review.user.charAt(0).toUpperCase()
                  }}</span>
                </v-avatar>
              </template>
              <v-card-title>{{ review.user }}</v-card-title>
              <v-card-subtitle>
                <v-rating
                  :key="`rating-${review.id}`"
                  :id="`rating-${review.id}`"
                  :name="`rating-${review.id}`"
                  half-increments
                  readonly
                  :length="5"
                  :size="33"
                  :model-value="review.value"
                  active-color="#FF9900"
                />
              </v-card-subtitle>
              <v-card-text>{{ review.text }}</v-card-text>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-container>
    </v-lazy>
    <v-lazy>
      <v-container
        class="py-8"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 20px;
        "
      >
        <div>
          <h1 style="font-family: Montserrat; font-size: xx-large">
            {{ $t("Landing.Subscription.title") }}
          </h1>
        </div>
        <v-card class="premium-plan-card" elevation="10" max-width="400">
          <v-card-title class="text-center text-h5 font-weight-bold">
            {{ $t("Landing.Subscription.plan") }}
          </v-card-title>
          <v-card-title class="text-center text-h6">
            <div style="display: flex; justify-content: center; gap: 5px">
              <p class="text-decoration-line-through text-sm">
                {{ displayStore.countryPrice.priceOriginalValue }}/{{
                  $t("Landing.Subscription.month")
                }}
              </p>
            </div>
            <div
              class="price"
              style="
                display: flex;
                align-items: baseline;
                justify-content: center;
                color: red;
              "
            >
              <h1>{{ displayStore.countryPrice.priceValue }}</h1>
              <p style="font-size: x-small">
                /{{ $t("Landing.Subscription.month") }}
              </p>
            </div>
            <div v-if="displayStore.countryPrice.currency !== 'usd'" style="display: flex; align-items: center; justify-content: center; gap:5px">
                      <p class="font-inter" style="font-size: xx-small">{{$t("Subscribe.billedInDollars")}}</p>
                  <div style="display: flex; align-items: baseline; justify-content: center">
                      <h6 style="font-weight: lighter;">$5.25</h6>
                      <p style="font-size:xx-small">/{{$t("Landing.Subscription.month")}}</p> 
                </div>
                </div>
            <p class="font-inter" style="font-size:xx-small">{{ $t("Landing.Subscription.billing") }}</p>
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text>
            <v-list dense>
              <v-list-item class="premium-feature">
                <v-icon
                  icon="mdi-check-outline"
                  class="list-icon positive"
                ></v-icon
                >{{ $t("Landing.Subscription.features.1") }}</v-list-item
              >
              <v-list-item class="premium-feature">
                <v-icon
                  icon="mdi-check-outline"
                  class="list-icon positive"
                ></v-icon
                >{{ $t("Landing.Subscription.features.2") }}</v-list-item
              >
              <v-list-item class="premium-feature">
                <v-icon
                  icon="mdi-check-outline"
                  class="list-icon positive"
                ></v-icon
                >{{ $t("Landing.Subscription.features.3") }}</v-list-item
              >
              <v-list-item class="premium-feature">
                <v-icon
                  icon="mdi-check-outline"
                  class="list-icon positive"
                ></v-icon
                >{{ $t("Landing.Subscription.features.4") }}</v-list-item
              >
              <v-list-item class="premium-feature">
                <v-icon
                  icon="mdi-gift-outline"
                  class="list-icon positive"
                ></v-icon
                >{{ $t("Landing.Subscription.features.5") }}</v-list-item
              >
            </v-list>
          </v-card-text>
          <v-card-actions
            class="mb-4"
            style="display: flex; justify-content: center"
          >
            <v-btn
              v-if="!authStore?.user?.customerId"
              color="primary"
              variant="elevated"
              large
              :disabled="stripeLoading"
              :loading="stripeLoading"
              @click="subscribe"
              class="text-capitalize font-inter"
              style="width: 75%"
            >
            {{ $t("Landing.Subscription.subscribe") }}
            </v-btn>
            <h3 v-else>{{ $t("Landing.Subscription.alreadySubscribed") }}</h3>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions
            class="mt-4"
            style="
              display: flex;
              justify-content: center;
              flex-direction: column;
              gap: 10px;
            "
          >
            <v-chip size="small" dense prepend-icon="mdi-lock">
              {{ $t("Landing.Subscription.secured") }}
            </v-chip>
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
              "
            >
              <v-img
                :src="`/images/payment_methods/visa.webp`"
                width="35"
                height="35"
              ></v-img>
              <v-img
                :src="`/images/payment_methods/mastercard.webp`"
                width="35"
                height="35"
              ></v-img>
              <v-img
                :src="`/images/payment_methods/paypal.webp`"
                width="40"
                height="40"
              ></v-img>
              <v-img
                :src="`/images/payment_methods/link.webp`"
                width="35"
                height="35"
              ></v-img>
              <v-img
                :src="`/images/payment_methods/google_pay.webp`"
                width="40"
                height="40"
              ></v-img>
            </div>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-lazy>
    <v-lazy>
      <v-container
        class="py-8"
        style="
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 10px;
        "
      >
        <div style="align-self: start">
          <h1 style="font-family: Montserrat; font-size: x-large">
            {{ $t("Landing.Faq.title") }}
          </h1>
        </div>
        <v-list
          style="width: 100%; background-color: transparent; box-shadow: 0 0 0 0"
        >
          <v-list-item
            v-for="q in faq"
            :key="q"
            style="padding-left: 0; padding-right: 0"
            class="font-inter"
          >
            <v-expansion-panels>
              <v-expansion-panel :title="q.title" :text="q.text">
              </v-expansion-panel>
            </v-expansion-panels>
          </v-list-item>
        </v-list>
      </v-container>
    </v-lazy>
    <v-lazy>
      <v-footer
        color="#1e1e2f"
        style="
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
        "
      >
        {{ $t('Landing.Contact')}} : <strong>support@libtune.com</strong>
      </v-footer>
    </v-lazy>
  </v-container>
</template>

<style scoped>
.list-div {
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-size: medium;
}

.font-inter {
  font-family: Inter;
}

.libtune-advantage {
  font-family: Montserrat;
  font-size: x-large;
}

.premium-plan-card {
  border-radius: 12px;
}
.price {
  color: black;
  font-weight: bold;
}
.premium-feature {
  font-weight: 500;
  font-family: Inter;
  display: flex;
  align-items: center;
}

.list-icon {
  margin-right: 8px;
}

.positive {
  color: green;
}

.negative {
  color: red;
}
</style>