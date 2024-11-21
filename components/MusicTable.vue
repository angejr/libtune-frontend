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
const loadingError = ref("");

async function getSongs() {
  const { data, error } = await useFetch("/api/musics");

  if (data.value?.data) {
    songs.value = data.value.data.map((item) => ({
      id: item.id,
      ...item.attributes,
      instrumental: item.attributes.lyric === "[Instrumental]",
    }));
  } else {
    loadingError.value = error.value.message;
  }
}

// Fetching songs on component setup
getSongs();

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

// Functions

function handleDownload(item) {
  if (!authStore.userToken) {
    loginDialog.value = true;
  } else {
    if (!authStore.user?.customerId) {
      getPremiumDialog.value = true; // Open the dialog if isCustomer is false
    } else {
      downloadSong(item);
    }
  }
}

async function downloadSong(item) {
  try {
    const link = document.createElement("a");
    const { url } = await $fetch(`/api/musics/download/${item.id}`, {
      headers: {
        authorization: `Bearer ${authStore.userToken}`,
      },
    });
    link.href = url;
    link.setAttribute("download", item.title);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error fetching song URL:", error);
  }
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
  <v-container class="py-8 music-page-container">
    <v-card class="music-page-card" flat max-width="960px">
      <!-- Header -->
      <v-card-title class="text-center text-h4 font-weight-bold pb-4">
        100% Royalty-Free Music
      </v-card-title>
      <v-divider></v-divider>

      <!-- Search and Filter Row -->
      <v-container class="filter-container pt-4">
        <v-row justify="space-between" align-content="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              dense
            />
          </v-col>

          <v-col cols="12" md="5">
            <v-autocomplete
              v-model="filter"
              :items="Object.keys(sunoTags).concat('Instrumental')"
              label="Filter by Tags"
              clearable
              chips
              dense
              outlined
            />
          </v-col>
        </v-row>
      </v-container>

      <!-- Error Message -->
      <v-alert v-if="loadingError" type="error" dismissible class="mt-4">
        {{ loadingError }}
      </v-alert>

      <!-- Music Table -->
      <v-data-table-virtual
        v-else
        :headers="headers"
        :items="filteredItems"
        :search="search"
        hover
        multi-sort
        class="mt-4"
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

        <!-- Play Button -->
        <template v-slot:item.play="{ item }">
          <AudioPlayer
            :imageSource="item.image_url"
            :audioId="item.id"
            :isPlaying="currentPlayingAudio === item.id"
            @toggle-play="handleTogglePlay"
          />
        </template>

        <!-- Length Column -->
        <template v-slot:item.length="{ item }">
          {{ item.length || "00:00" }}
        </template>

        <!-- Tags Column -->
        <template v-slot:item.tags="{ item }">
          <v-chip v-if="item.instrumental" color="green" small>
            Instrumental
          </v-chip>
          <v-chip
            v-for="tag in item.tags?.split(' ')"
            :key="tag"
            small
            class="tag-chip"
            :color="sunoTags[tag] || 'grey'"
          >
            {{ tag }}
          </v-chip>
        </template>

        <!-- Download Button -->
        <template v-slot:item.download="{ item }">
          <v-btn
            color="purple"
            icon="mdi-download"
            size="small"
            class="ma-2"
            @click="handleDownload(item)"
          ></v-btn>
        </template>
      </v-data-table-virtual>
    </v-card>

    <!-- Premium Dialog -->
    <v-dialog v-model="getPremiumDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Download Music</v-card-title>
        <v-card-text>
          Upgrade to <strong>Libtune Premium</strong> and enjoy unlimited music
          downloads!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="purple"
            variant="elevated"
            @click="
              getPremiumDialog = false;
              goToPath('/subscribe');
            "
          >
            Get Premium
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Login Dialog -->
    <v-dialog v-model="loginDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">Download Music</v-card-title>
        <v-card-text>
          Please log in to download music. Not a member yet? Sign up now!
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            variant="elevated"
            @click="
              loginDialog = false;
              goToPath('/login');
            "
          >
            Log In
          </v-btn>
          <v-btn
            color="primary"
            outlined
            @click="
              loginDialog = false;
              goToPath('/signup');
            "
          >
            Sign Up
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.music-page-container {
  padding: 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
}

.music-page-card {
  border-radius: 12px;
  padding: 20px;
}

.tag-chip {
  margin: 2px;
}

.v-alert {
  border-radius: 8px;
  font-size: 14px;
}

.playingClass {
  background-color: rgb(70, 138, 138);
  color: white;
}
</style>