<script setup>
import { useIntersectionObserver, useDebounce } from "@vueuse/core";
const authStore = useAuthStore();
const errorStore = useErrorStore();
const displayStore = useDisplayStore();

const search = ref("");
const debouncedSearch = useDebounce(search, 800); // Debounced ref
const filter = ref([]);
const headers = [
  { title: "", key: "play", align: "center", sortable: false },
  { title: "Title", key: "title", align: "left" },
  { title: "Length", key: "length", align: "center" },
  { title: "Tags", key: "tags", align: "center", sortable: false },
  { title: "", key: "download", align: "center", sortable: false },
];
const songs = ref([]);
const currentPlayingAudio = ref(null);

const isLoading = ref(false);
const allLoaded = ref(false);
// Trigger fetch on scroll
const loadMoreTrigger = ref(null);
let page = 1;
const pageSize = 50; // Adjust based on performance

const getPremiumDialog = ref(false);
const loginDialog = ref(false);

async function getSongs(setup = false) {
  if (isLoading.value || allLoaded.value) return;

  isLoading.value = true;

  try {
    let data;
    if (setup) {
      const response = await useFetch("/api/musics", {
        params: {
          search: debouncedSearch.value,
          filter: filter.value.join(","),
          page,
          pageSize,
        },
      });
      data = response.data.value?.data;
    } else {
      const response = await $fetch("/api/musics", {
        params: {
          search: debouncedSearch.value,
          filter: filter.value.join(","),
          page,
          pageSize,
        },
      });
      data = response.data;
    }

    if (data?.length && data?.length > 0) {
      songs.value.push(...data);
      page++;
    } else {
      allLoaded.value = true;
    }
  } catch (error) {
    errorStore.setError({
      title: "Error while fetching music",
      text: error.message,
    });
  } finally {
    isLoading.value = false;
  }
}

// Fetch initial songs on setup
getSongs(true);

useIntersectionObserver(
  loadMoreTrigger,
  ([{ isIntersecting }]) => {
    if (isIntersecting) {
      getSongs();
    }
  }
);

// Trigger fetch when debouncedSearch changes
watch(debouncedSearch, () => {
  songs.value = [];
  page = 1;
  allLoaded.value = false;
  getSongs();
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
    errorStore.setError({
      title: "Error downloading song",
      text: error.message,
    });
  }
}

function handleTogglePlay(audioId) {
  currentPlayingAudio.value =
    currentPlayingAudio.value === audioId ? null : audioId;
}

function getCurrent() {
  return currentPlayingAudio.value;
}

function getRowProps(row) {
  return {
    class: row.item.id === getCurrent() ? "playingClass" : "",
  };
}

function getHeaderClass(isMobile) {
  if (!isMobile) {
    return "text-center text-h4 font-weight-bold pb-4";
  }
  return "text-center font-weight-bold pb-4";
}
</script>

<template>
  <v-container class="py-8 music-page-container">
    <v-card class="music-page-card" flat max-width="1200px" elevation="8">
      <!-- Header -->
      <v-card-title :class="getHeaderClass(displayStore.isMobile)">
        100% Royalty-Free Music
      </v-card-title>
      <v-divider></v-divider>

      <!-- Search and Filter Row -->
      <v-container class="filter-container pt-4">
        <v-row justify="space-between" align-content="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model.trim="search"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="outlined"
              hide-details
              :rules="[validationRules.safe, validationRules.max(100)]"
              dense
            />
          </v-col>

          <v-col cols="12" md="5">
            <v-autocomplete
              v-model="filter"
              multiple
              :items="Object.keys(sunoTags).concat('Instrumental')"
              label="Filter by Tags"
              clearable
              chips
              dense
              outlined
              @update:model-value="
                () => {
                  songs = [];
                  page = 1;
                  allLoaded = false;
                  getSongs();
                }
              "
            />
          </v-col>
        </v-row>
      </v-container>
      <!-- Music Table -->
      <v-data-table-virtual v-if="!displayStore.isMobile"
        :headers="headers"
        :items="songs"
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
        <template v-slot:[`item.play`]="{ item }">
          <AudioPlayer
            :imageSource="item.image_url"
            :audioId="item.id"
            :isPlaying="currentPlayingAudio === item.id"
            @toggle-play="handleTogglePlay"
          />
        </template>

        <!-- Length Column -->
        <template v-slot:[`item.length`]="{ item }">
          {{ item.length || "00:00" }}
        </template>

        <!-- Tags Column -->
        <template v-slot:[`item.tags`]="{ item }">
          <v-chip v-if="item.instrumental" color="green" small>
            Instrumental
          </v-chip>
          <v-chip
            v-for="tag in [
              ...new Set(
                item.tags
                  ?.split(' ')
                  .filter((tag) => !excludedTags.includes(tag))
              ),
            ]"
            :key="tag"
            small
            class="tag-chip"
            :color="sunoTags[tag] || 'grey'"
          >
            {{ tag }}
          </v-chip>
        </template>

        <!-- Download Button -->
        <template v-slot:[`item.download`]="{ item }">
          <v-btn
            color="purple"
            icon="mdi-download"
            size="small"
            class="ma-2"
            @click="handleDownload(item)"
          ></v-btn>
        </template>
      </v-data-table-virtual>

      <v-data-table-virtual v-else
  :headers="[headers[0], { title: '', key: 'title', align: 'center' }, headers[4]] "
  :items="songs"
  hover
  multi-sort
  class="mt-4"
  :row-props="getRowProps"
  hide-default-header=true
>
  <template v-slot:loading>
    <div class="d-flex justify-center my-4">
      <v-progress-circular
        indeterminate
        color="primary"
        size="40"
      ></v-progress-circular>
    </div>
  </template>

  <template v-slot:item="{ item }">
    <!-- Main Row -->
    <tr>
      <td style="padding: 10px 0 10px 0" >
        <div style=" display: flex; flex-direction: column; justify-content: space-around; align-items:center; gap:10px">
          <AudioPlayer
            :imageSource="item.image_url"
            :audioId="item.id"
            :isPlaying="currentPlayingAudio === item.id"
            @toggle-play="handleTogglePlay"
          />
          <h6>
            {{ item.length || "00:00" }}
          </h6>
        </div>
      </td>
      <td style="padding: 10px 0 10px 0">
        <div style="display: flex; flex-direction: column; justify-content: center; align-items:center; gap:10px">
          <h5> {{ item.title }}</h5>
          <div style="display: flex; justify-content: center; align-items:center; flex-wrap: wrap;">
            <v-chip v-if="item.instrumental" color="green" size="x-small">
              Instrumental
            </v-chip>
            <v-chip
              v-for="tag in [
                ...new Set(
                  item.tags
                    ?.split(' ')
                    .filter((tag) => !excludedTags.includes(tag))
                ),
              ]"
              :key="tag"
              size="x-small"
              class="tag-chip"
              :color="sunoTags[tag] || 'grey'"
            >
              {{ tag }}
            </v-chip>
          </div>
        </div>
      </td>
      <td style="padding: 10px 0 10px 0">
        <v-btn
          color="purple"
          icon="mdi-download"
          size="x-small"
          class="ma-2"
          @click="handleDownload(item)"
        ></v-btn>
      </td>
    </tr>
  </template>
</v-data-table-virtual>

      <!-- Loading Indicator -->
      <div ref="loadMoreTrigger" v-if="!allLoaded" class="my-4 text-center">
        <v-progress-circular v-if="isLoading" indeterminate color="primary" />
      </div>
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

.playingClass {
  background-color: rgb(70, 138, 138);
  color: white;
}
</style>