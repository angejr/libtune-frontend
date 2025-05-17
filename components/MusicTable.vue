<script setup>
import { useIntersectionObserver, useDebounce } from "@vueuse/core";
const authStore = useAuthStore();
const errorStore = useErrorStore();
const displayStore = useDisplayStore();
const { t, locales, setLocale } = useI18n();

const search = ref("");
const debouncedSearch = useDebounce(search, 800); // Debounced ref
const filter = ref([]);
const headers = [
  { title: "", key: "play", align: "center", sortable: false },
  { title: t('MusicTable.title'), key: "title", align: "left" },
  { title: t('MusicTable.length'), key: "length", align: "center" },
  { title: t('MusicTable.tags'), key: "tags", align: "center", sortable: false },
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

onMounted( () => {
  // Fetch initial songs on setup
  getSongs(false);
})

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
  currentPlayingAudio.value = audioId;
}

function getCurrent() {
  return currentPlayingAudio.value;
}

function getRowProps(row) {
  if (row.item.id === getCurrent()){
    return {
      style: "background-color: rgb(70, 138, 138); color: white;",
    };
  }
}

function getHeaderClass(isMobile) {
  if (!isMobile) {
    return "text-center text-h4 font-weight-bold pb-4";
  }
  return "text-center font-weight-bold pb-4";
}
</script>

<template>
  <v-container :class="!displayStore.isMobile ? 'py-8' : 'zero-padding'" >
    <v-card class="music-page-card" :style="{ borderRadius: displayStore.isMobile ? 0 : '12px'}" flat max-width="1200px" elevation="8">
      <!-- Header -->
      <v-card-title :class="getHeaderClass(displayStore.isMobile)">
        {{t("MusicTable.PageTitle")}}
      </v-card-title>
      <v-divider></v-divider>

      <!-- Search and Filter Row -->
      <v-container class="filter-container pt-4">
        <v-row justify="space-between" align-content="center">
          <v-col cols="12" md="6">
            <v-text-field
              v-model.trim="search"
              :label="t('MusicTable.labelSearch')"
              :placeholder="t('MusicTable.labelPlaceholder')"
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
              :label="t('MusicTable.labelTags')"
              clearable
              chips
              dense
              variant="outlined"
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
        no-data-text=""
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
          <v-chip v-if="item.instrumental" color="green" small :variant="item.id === getCurrent() ? 'elevated' : undefined">
            Instrumental
          </v-chip>
          <v-chip
            :variant="item.id === getCurrent() ? 'elevated' : undefined"
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
  hide-default-header
  no-data-text="">
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
    <tr :style="currentPlayingAudio === item.id ? 'background-color: rgb(70, 138, 138); color: white': ''">
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
            <v-chip v-if="item.instrumental" color="green" size="x-small" :variant="item.id === getCurrent() ? 'elevated' : undefined">
              Instrumental
            </v-chip>
            <v-chip
            :variant="item.id === getCurrent() ? 'elevated' : undefined"
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
        <v-card-title class="headline">{{t("MusicTable.downloadMusic")}}</v-card-title>
        <v-card-text>
          {{t('MusicTable.upgradeTo')}} <strong>Libtune Premium</strong> {{t('MusicTable.andEnjoy')}}
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
          {{t('MusicTable.getPremium')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Login Dialog -->
    <v-dialog v-model="loginDialog" max-width="500">
      <v-card>
        <v-card-title class="headline">{{t("MusicTable.downloadMusic")}}</v-card-title>
        <v-card-text>
          {{t("MusicTable.please")}}
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
          {{t("MusicTable.login")}}
          </v-btn>
          <v-btn
            color="primary"
            outlined
            @click="
              loginDialog = false;
              goToPath('/signup');
            "
          >
          {{t("MusicTable.signup")}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.zero-padding{
  padding: 0;
}

.music-page-card {
  border-radius: 12px;
  padding: 20px;
}

.tag-chip {
  margin: 2px;
}
</style>