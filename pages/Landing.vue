<script setup>
const displayStore = useDisplayStore();
const authStore = useAuthStore();
const errorStore = useErrorStore()
const config = useRuntimeConfig()
const STRAPI_URL = config.public.strapiUrl
const stripeLoading = ref(false);

useSeoMeta({
  title: "Landing",
  ogTitle: "Landing",
  robots: {
    noindex: true,
    nofollow: true
  }
  })

function goToStripe() {
  // for product Checkout
  try {
    SS_ProductCheckout(2, STRAPI_URL, authStore.user.email);
  } catch (e) {
    errorStore.setError({ title: "Error", text: e.message });
  }
}

// Generate a random pastel color based on username
function getColor(name){
  const colors = ["blue", "red", "green", "purple", "orange", "pink", "teal"];
  return colors[name.charCodeAt(0) % colors.length]; // Pick a color based on the first letter
}; 

const items = [
  { id: 1, title: "Pop", color: "pink", image: "images/pop.jpg" },
  {
    id: 2,
    title: "Electronic",
    color: "purple",
    image: "images/electronic.jpg",
  },
  { id: 3, title: "Hip-Hop", color: "orange", image: "images/hip-hop.jpg" },
  { id: 4, title: "Cinematic", color: "tiel", image: "images/cinematic.jpg" },
  { id: 5, title: "Classical", color: "yellow", image: "images/classical.jpg" },
  { id: 5, title: "Acoustic", color: "pink", image: "images/acoustic.jpg" },
];

const faq = [
  {
    title: "What is royalty-free music?",
    text: "Royalty-free music is a type of licensing that allows the use of licensed music in multiple projects without paying additional fees. The purchaser pays a one-time fee often for a perpetual license. It's commonly used in films, TV shows, commercials, and other media projects. The cost varies depending on length, usage, and composer popularity. It's a cost-effective alternative to traditional licensing, where ongoing royalties must be paid each time the music is used."
  },
  {
    title: "How can I use royalty-free music?",
    text: "You can use royalty-free music as background music for videos on platforms like YouTube, Vimeo, Instagram, TikTok, and more. Other common media projects where you can use your royalty-free music are on websites in various projects, as background music in all sorts of games, mobile apps, presentations, and more."
  },
  {
    title: "Where can I find royalty-free music?",
    text: "There are many websites that offer royalty-free music that you can use for your different projects. However, the music quality can vary a lot as well as the license agreements."
  },
  {
    title: "Is royalty-free music really free?",
    text: "Royalty-free music means that the music is free from any additional royalties. However, while the music may be free from royalties, it is usually not completely free of cost as you at first most likely need to buy the license."
  },
  {
    title: "Can I use royalty-free music for commercial purposes?",
    text: "Yes, you can use royalty-free music for commercial purposes, as long as you follow the terms and conditions specified by the licensor of the music. Libtune's royalty-free music can be used for any purpose, including commercial purposes."
  },
  {
    title: "Do I need to give credit to the artist when using royalty-free music?",
    text: "It depends on the terms and conditions specified by the license provider. Some royalty-free music providers may require you to give credit to the artist, while others may not. Libtune does not require subscribers to give credit to any artists, although it’s highly appreciated."
  },
  {
    title: "Are there any limitations to using royalty-free music with Libtune?",
    text: "Our music is forbidden to be used with explicit or illegal content. Other than that, our music has no limitations as long as you have a valid subscription."
  },
  {
    title: "Is copyright-free music and license-free music the same as royalty-free music?",
    text: "No, 'copyright-free music' and 'license-free music' are not the same as 'royalty-free music'. Copyright-free music means that the music is not protected by copyright law and can be used freely. However, just because the music is not protected, it doesn't mean that the music is free of charge. License-free music means that the music does not require a license to be used and the user does not need to pay for the right to use the music, but this doesn't necessarily mean that the music is free of charge. Royalty-free music, on the other hand, refers to music that can be used without paying royalties each time the music is used or performed."
  },
  {
    title: "How do I make sure that I have the right to use the royalty-free music?",
    text: "When buying a subscription from Libtune, you have the complete right to use the music as you wish on any platform. If using another royalty-free music provider, make sure to read the licensing agreement carefully before using the music for any projects. This agreement will specify the terms and conditions under which the music can be used."
  },
  {
    title: "Can I use royalty-free music on all social platforms?",
    text: "In most cases, yes. However, you need to verify the terms of the license agreement from your music provider as well as the policies of that particular social platform. Some royalty-free music licenses may restrict usage on certain platforms for various reasons, while others may provide free usage on all platforms. Additionally, some social platforms have their own music libraries and licensing agreements which you have to consider before using your own licensed music. Libtune does not restrict the usage of your purchased music in any form, except if used for explicit or illegal content."
  }
];

const reviews = [
  { id: 1, text: "Libtune has an awesome selection of tracks, super useful!", user: "AliceM", value: 4.5 },
  { id: 2, text: "Great for background music! Just wish there were more search filters.", user: "Jake92", value: 4.0 },
  { id: 3, text: "Finally a site that makes finding royalty-free music easy. Love it!", user: "Samantha_R", value: 5 },
  { id: 4, text: "Pretty solid, tho some tracks feel a bit generic. Still good tho!", user: "Mike_T", value: 4 },
  { id: 5, text: "Libtune is my go-to for video projects. Affordable and legit.", user: "FilmmakerJoe", value: 4.5 },
  { id: 6, text: "Gr8 site, easy to use. Found a lot of gems here!", user: "ElenaV", value: 4.5 },
  { id: 7, text: "Was skeptical at first but it's actually really good.", user: "Chris_W", value: 4 },
  { id: 8, text: "One of the better libraries out there. Needs more rock tho.", user: "ZaneF", value: 4 },
  { id: 9, text: "Best royalty-free music site I’ve used, hands down.", user: "MelodyQueen", value: 5.0 },
  { id: 10, text: "Decent variety. Some categories could use expansion.", user: "Leo_D", value: 4.0 },
  { id: 11, text: "Tbh, didn’t expect much but ended up using it all the time.", user: "JayJay", value: 4.5 },
  { id: 12, text: "Love the premium options. Wud be nice to have a mobile app!", user: "Steph_K", value: 4.5 },
  { id: 13, text: "Everything works well, but UI could be a bit more modern.", user: "DesignGuru", value: 3.5 },
  { id: 14, text: "Helped me find exactly what I needed for my podcast!", user: "PodcastSteve", value: 5 },
  { id: 15, text: "The search function is way better than other sites. 👍", user: "Nina_S", value: 4.5 },
  { id: 16, text: "Affordable, easy to navigate, and great variety.", user: "Marko", value: 4.5 },
  { id: 17, text: "Good stuff, just wish some songs had more variations.", user: "LiamB", value: 4 },
  { id: 18, text: "Better than expected. Customer support was quick too!", user: "RealJohnDoe", value: 4.5 },
  { id: 19, text: "I use it for my Twitch streams. No copyright issues!", user: "StreamerAlex", value: 5 },
  { id: 20, text: "Had some doubts at first but now I keep coming back!", user: "KatieW", value: 4.5 }
];


</script>

<template>
  <v-container style="width: 100%; padding: 0">
    <v-container class="py-8" fluid>
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
              <h1>Royalty free music for all projects</h1>
            </v-card-title>
            <v-card-text>
              <v-list style="background-color: transparent">
                <v-list-item style="padding-left: 0; padding-right: 0">
                  <div class="list-div font-inter">
                    <v-icon> mdi-music</v-icon>
                    <p>Access to thousands of high quality songs</p>
                  </div>
                </v-list-item>
                <v-list-item style="padding-left: 0; padding-right: 0">
                  <div class="list-div font-inter">
                    <v-icon> mdi-download</v-icon>
                    Unlimited downloads
                  </div>
                </v-list-item>
                <v-list-item style="padding-left: 0; padding-right: 0">
                  <div class="list-div font-inter">
                    <v-icon> mdi-license</v-icon>
                    Licence to use the songs for any project, videos, streams
                    and podcasts
                  </div>
                </v-list-item>
                <v-list-item style="padding-left: 0; padding-right: 0">
                  <div class="list-div font-inter">
                    <v-icon> mdi-cash</v-icon>
                    Publish anywhere and monetize your content
                  </div>
                </v-list-item>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <div style="display: flex; flex-direction: column; gap: 15px">
                <v-btn
                  class="font-inter"
                  style="padding: 30px; display: flex; justify-content: center"
                  color="purple"
                  variant="elevated"
                  @click="
                    landingDialog = false;
                    if (!authStore?.userToken) {
                      goToPath('/signup?subscribe=true');
                    } else {
                      goToPath('/subscribe');
                    }
                  "
                >
                Start Free Trial</v-btn
                >
                <p
                  class="font-inter"
                  style="font-size: small; font-weight: 600; text-align: center;"
                >
                  Start free trial. cancel anytime
                </p>
              </div>
            </v-card-actions>
          </v-card>
        </v-col>
        <v-col v-if="!displayStore.isMobile" cols="12" md="6">
          <v-img src="/images/bg.jpg" width="100%"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-8" style="width: 100%; background-color: black">
      <v-row>
        <v-col v-for="item in items" :key="item.id" cols="6" sm="4" md="3">
          <v-card class="pa-2" style="padding: 0 !important" rounded="0">
            <v-card-title
              :style="{ backgroundColor: item.color, fontWeight: 'bold' }"
              @click="goToPath('/')"
              >{{ item.title }}</v-card-title
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-8" fluid>
      <v-row width="100%">
        <v-col cols="12" md="6">
          <v-img src="/images/bg (4).jpg" width="100%"></v-img>
        </v-col>
        <v-col cols="12" md="6">
          <v-card style="background-color: transparent; box-shadow: 0 0 0 0">
            <v-card-title class="font-inter"> Why Libtune ? </v-card-title>
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
                  <h3>2,000+ Royalty Free Songs</h3></v-list-item
                >
                <v-list-item
                  class="libtune-advantage"
                  style="padding-left: 0; padding-right: 0"
                >
                  <h3>Unlimited downloads</h3></v-list-item
                >
                <v-list-item
                  class="libtune-advantage"
                  style="padding-left: 0; padding-right: 0"
                >
                  <h3>Publish anywhere</h3></v-list-item
                >
                <v-list-item
                  class="libtune-advantage"
                  style="padding-left: 0; padding-right: 0"
                >
                  <h3>Soundtrack your content</h3></v-list-item
                >
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-btn
                color="black"
                variant="elevated"
                @click="
                  landingDialog = false;
                  if (!authStore?.userToken) {
                    goToPath('/signup?subscribe=true');
                  } else {
                    goToPath('/subscribe');
                  }
                "
              >
                Start Free Trial
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-8">
      <div class="mb-6">
        <h1 style="font-family: Montserrat; font-size: x-large; text-align:center">
          What our customers say
        </h1>
      </div>
      <v-slide-group :mobile="displayStore.isMobile">
        <v-slide-group-item v-for="review in reviews" :key="review.id">
          <v-card class="mx-6 pa-4" width="300">
            <template v-slot:prepend>
              <v-avatar :color="getColor(review.user)">
                <span class="text-white text-h6">{{ review.user.charAt(0).toUpperCase() }}</span>
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
          Our Subscription
        </h1>
      </div>
      <v-card class="premium-plan-card" elevation="10" max-width="400">
        <v-card-title class="text-center text-h5 font-weight-bold">
          Premium Plan
        </v-card-title>
        <v-card-title class="text-center text-h6">
          <div
            class="price"
            style="
              display: flex;
              align-items: baseline;
              justify-content: center;
            "
          >
            <h1>$5.25</h1>
            <p style="font-size: x-small">/month</p>
          </div>
          <h6>Billed monthly, cancel anytime</h6>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-list dense>
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-check-outline"
                class="list-icon positive"
              ></v-icon>
              Unlimited downloads
            </v-list-item>
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-check-outline"
                class="list-icon positive"
              ></v-icon>
              License for all downloaded songs
            </v-list-item>
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-check-outline"
                class="list-icon positive"
              ></v-icon>
              Commercial use allowed
            </v-list-item>
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-check-outline"
                class="list-icon positive"
              ></v-icon>
              No attribution required
            </v-list-item>
            <v-list-item class="premium-feature">
              <v-icon
                icon="mdi-close-outline"
                class="list-icon negative"
              ></v-icon>
              Redistribution or resale prohibited
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-actions style="display: flex; justify-content: center">
          <v-btn
            v-if="!authStore?.user?.customerId"
            color="purple"
            variant="elevated"
            large
            style="font-family: Inter"
            :disabled="stripeLoading"
            :loading="stripeLoading"
            @click="
              if (authStore?.userToken) {
                stripeLoading = true
                goToStripe();
                stripeLoading= false
              } else {
                goToPath('/signup?subscribe=true');
              }
            "
          >
          Start Free Trial
          </v-btn>
          <h3 v-else>You are already subscribed !</h3>
        </v-card-actions>
      </v-card>
    </v-container>
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
          Frequently Asked Questions
        </h1>
      </div>
      <v-list style="width: 100%; background-color: transparent; box-shadow: 0 0 0 0;">
        <v-list-item v-for="q in faq" :key="q" style="padding-left: 0; padding-right: 0" class="font-inter">
          <v-expansion-panels>
            <v-expansion-panel
              :title="q.title"
              :text="q.text"
            >
            </v-expansion-panel>
          </v-expansion-panels>
        </v-list-item>
      </v-list>
    </v-container>
    <v-footer color="#1e1e2f" style="display: flex; flex-direction: row; align-items: center; justify-content: center;">
      Contact : <strong>support@libtune.com</strong>
    </v-footer>
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