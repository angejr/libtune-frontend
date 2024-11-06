<script setup>
const authStore = useAuthStore();

const search = ref("");

const headers = [
  { title: "", key: "play", align: "center", sortable: false },
  { title: "Title", key: "title", align: "left" },
  { title: "Length", key: "length", align: "center" },
  { title: "Tags", key: "tags", align: "center", sortable: false },
  { title: "", key: "download", align: "center", sortable: false },
];
const songs = ref([]);
const currentPlayingAudio = ref(null);
const filter = ref([]);

const getPremiumDialog = ref(false);
const loginDialog = ref(false);

const filteredItems = computed(() => {
  return filter.value.length === 0
    ? songs.value
    : songs.value.filter((el) =>
        filter.value.some((element) => {
          let tags = el?.tags?.split(" ");
          if (el?.instrumental) tags.push("Instrumental");
          return tags?.includes(element);
        })
      );
});

// Fetching songs on component mount
onMounted(async () => {
  await getSongs();
});

// Functions
async function getSongs() {
  const { data } = await useFetch(() => `${STRAPI_API_URL}/musics`, {
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN_MUSIC}`,
    },
    query: {
      [`pagination[limit]`]: 1000,
    },
  });

  if (data.value?.data) {
    songs.value = data.value.data.map((item) => ({
      id: item.id,
      ...item.attributes,
      instrumental: item.attributes.lyric === "[Instrumental]",
    }));
  }
}

function handleDownload(item) {
  if (!authStore.userToken) {
    loginDialog.value = true;
  } else {
    if (!authStore.user.customerId) {
      getPremiumDialog.value = true; // Open the dialog if isCustomer is false
    } else {
      downloadSong(item);
    }
  }
}

function downloadSong(item) {
  const link = document.createElement("a");
  link.href = item.s3_url;
  link.setAttribute("download", item.title);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function handleTogglePlay(audioId) {
  currentPlayingAudio.value =
    currentPlayingAudio.value === audioId ? null : audioId;
}

function getCurrent() {
  return currentPlayingAudio.value;
}

function getRowProps(item) {
  return {
    class: item.item.id === getCurrent() ? "playingClass" : "",
  };
}

</script>

<template>
  <v-container class="py-8">
    <v-card
      title="100% Royalty-Free Music"
      flat
      max-width="960px"
      class="mx-auto"
    >
      <!-- Search and Filter Row -->
      <v-container>
        <v-row justify="space-around">
          <v-col cols="12" md="4">
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              single-line
              outlined
            />
          </v-col>

          <v-col cols="12" md="3">
            <v-autocomplete
              v-model="filter"
              :items="Object.keys(sunoTags).concat('Instrumental')"
              label="Select Tags"
              clearable
              chips
              multiple
              outlined
            />
          </v-col>
        </v-row>
      </v-container>

      <v-data-table-virtual
        :headers="headers"
        :items="filteredItems"
        :search="search"
        hover
        multi-sort
        :row-props="getRowProps"
      >
        <!-- Loading Slot -->
        <template v-slot:loading>
          <div class="d-flex justify-center my-4">
            <v-progress-circular
              indeterminate
              color="primary"
              size="40"
            ></v-progress-circular>
          </div>
        </template>

        <!-- No Data Slot (optional) -->
        <template v-slot:no-data>
          <v-progress-circular
            indeterminate
            color="primary"
            size="40"
          ></v-progress-circular>
        </template>

        <template v-slot:item.play="{ item }">
          <AudioPlayer
            :audioSource="item.s3_url"
            :imageSource="item.image_url"
            :audioId="item.id"
            :isPlaying="currentPlayingAudio === item.id"
            @toggle-play="handleTogglePlay"
          />
        </template>
        <template v-slot:item.length="{ item }">
          {{ item.length || "00:00" }}
        </template>

        <template v-slot:item.download="{ item }">
          <v-btn
            class="ma-2"
            color="purple"
            icon="mdi-download"
            variant="elevated"
            size="x-small"
            @click="handleDownload(item)"
          >
          </v-btn>
          <!-- Dialog that appears if user is not customer is false -->
          <v-dialog
            v-model="getPremiumDialog"
            max-width="500"
            opacity="0.01"
            elevation="0"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Download Music</span>
              </v-card-title>
              <v-card-text>
                Get Libtune Premium and download music without limit !
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="purple"
                  variant="elevated"
                  text
                  @click="
                    getPremiumDialog = false;
                    goToPath('/Subscribe');
                  "
                  >Buy Premium</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog
            v-model="loginDialog"
            max-width="500"
            opacity="0.01"
            elevation="0"
          >
            <v-card>
              <v-card-title>
                <span class="headline">Download Music</span>
              </v-card-title>
              <v-card-text>
                Login first to be able to download music without limit !
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  variant="elevated"
                  text
                  @click="
                    loginDialog = false;
                    goToPath('/login');
                  "
                  >Login</v-btn
                >
                <v-btn
                  color="primary"
                  variant="outlined"
                  text
                  @click="
                    loginDialog = false;
                    goToPath('/signup');
                  "
                  >Sign-up</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>

        <template v-slot:item.tags="{ item }">
          <v-chip v-if="item.instrumental" color="green"> Instrumental </v-chip>
          <v-chip
            v-if="item.tags"
            v-for="tag in item.tags.split(' ')"
            style="margin: 2px"
            size="small"
            :color="sunoTags[`${tag}`] ? sunoTags[`${tag}`] : `grey`"
            :key="tag"
          >
            {{ tag }}
          </v-chip>
        </template>
      </v-data-table-virtual>
    </v-card>
  </v-container>
</template>

<style lang="css">
.playingClass {
  background-color: rgb(70, 138, 138);
  color: white;
}
</style>