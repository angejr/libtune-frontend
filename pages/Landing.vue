<script setup>
const displayStore = useDisplayStore();
const authStore = useAuthStore();

const items = [
  { id: 1, title: "Pop", color: "pink", image: "images/pop.jpg" },
  { id: 2, title: "Electronic", color: "purple", image: "images/electronic.jpg" },
  { id: 3, title: "Hip-Hop", color: "orange", image: "images/hip-hop.jpg" },
  { id: 4, title: "Cinematic", color: "tiel", image: "images/cinematic.jpg" },
  { id: 5, title: "Classical", color: "yellow", image: "images/classical.jpg" },
  { id: 5, title: "Acoustic", color: "pink", image: "images/acoustic.jpg" },
];
</script>

<template>
  <v-container style="width: 100%; padding: 0">
    <v-container
      class="py-8"
      style="
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
      "
      fluid
    >
      <v-card
        style="width: 100%; box-shadow: 0 0 0 0; background-color: transparent"
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
                Licence to use the songs for any project, videos, streams and
                podcasts
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
                  goToPath('/signup');
                } else {
                  goToPath('/subscribe');
                }
              "
            >
              Subscribe</v-btn
            >
            <p class="font-inter" style="font-size: small; font-weight: 600">
              Subscribe now, Cancel anytime
            </p>
          </div>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-container style="width: 100%; background-color: black;">
        <v-row>
      <v-col 
        v-for="item in items" :key="item.id" cols="6" sm="4" md="3"
      >
        <v-card class="pa-2" style="padding:0 !important" rounded="0">
          <v-card-title :style="{ backgroundColor: item.color, fontWeight: 'bold'}">{{ item.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    </v-container>
    <v-container fluid>
      <v-row width="100%">
        <v-col cols="12" md="6">
            <v-img src="/images/bg.jpg" width="100%"></v-img>
        </v-col>
        <v-col cols="12" md="6">
            <v-card style="background-color: transparent; box-shadow: 0 0 0 0">
                <v-card-title class="font-inter">
                        Why Libtune ? 
                </v-card-title>
                <v-card-text>
                    <v-list style="background-color: transparent ; box-shadow: 0 0 0 0; display:flex; flex-direction: column; gap:15px ">
                        <v-list-item class="libtune-advantage" style="padding-left:0; padding-right:0"> <h3> 2,000+ Royalty Free Songs </h3></v-list-item>
                        <v-list-item class="libtune-advantage" style="padding-left:0; padding-right:0"> <h3> Unlimited downloads</h3></v-list-item>
                        <v-list-item class="libtune-advantage" style="padding-left:0; padding-right:0"> <h3> Publish anywhere</h3></v-list-item>
                        <v-list-item class="libtune-advantage" style="padding-left:0; padding-right:0"> <h3>Soundtrack your content</h3></v-list-item>
                    </v-list>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="black" variant="elevated">
                    Subscribe
                  </v-btn>
                </v-card-actions>
            </v-card>
        </v-col>
      </v-row>
    </v-container>
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
  font-family: 'Times New Roman', Times, serif;
  font-size: x-large;
}
</style>