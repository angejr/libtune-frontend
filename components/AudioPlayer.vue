<template>
  <div class="d-flex justify-center align-center" style="position: relative">
    <v-progress-circular
      :model-value="audioProgress"
      :size="45"
      :width="5"
      color="white"
      style="position: absolute; z-index: 1"
    >
      <!-- Circular Play/Pause Button -->
      <v-icon color="black" @click="togglePlay">
        {{ !isPlayingInternal ? "mdi-play-circle" : "mdi-pause-circle" }}
      </v-icon>
    </v-progress-circular>
    <v-img
      :src="
        imageSource || '/images/image_2129f9df-9159-45e4-9a49-ef626338842b.jpeg'
      "
      :width="50"
    ></v-img>

    <!-- Hidden audio element -->
    <audio
      :id="audioId"
      ref="audio"
      :src="audioSource"
      @timeupdate="updateProgress"
    ></audio>
  </div>
</template>

<script setup>
const audioSource = ref(null)

// Props
const props = defineProps({
  imageSource: {
    type: String,
    required: true,
  },
  isPlaying: {
    type: Boolean,
    required: true,
  },
  audioId: {
    type: String,
    required: true,
  },
});

// Define custom events that the component can emit
const emit = defineEmits(['toggle-play']);

// Refs and reactive variables
const audio = ref(null);
const isPlayingInternal = ref(false);
const audioProgress = ref(0);

// Watcher for the `isPlaying` prop to control audio element
watch(() => props.isPlaying, (newVal) => {
  if (audio.value) {
    if (newVal) {
      audio.value.play();
      isPlayingInternal.value = true;
    } else {
      audio.value.pause();
      isPlayingInternal.value = false;
    }
  }
});

// Methods
async function togglePlay() {
  if (isPlayingInternal.value) {
    emit('toggle-play', null);
  } else {
    await getSong()
    emit('toggle-play', props.audioId);
  }
}

function updateProgress() {
  if (audio.value) {
    audioProgress.value = (audio.value.currentTime / audio.value.duration) * 100;
  }
}

async function getSong(){
  const {url} = await $fetch(`/api/musics/${props.audioId}`)
  audioSource.value = url
}
</script>

<style scoped>
.v-progress-circular {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>