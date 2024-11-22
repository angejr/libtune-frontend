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
        {{ isPlayingInternal ? "mdi-pause-circle" : "mdi-play-circle" }}
      </v-icon>
    </v-progress-circular>
    <v-img
      :src="imageSource || '/images/image_2129f9df-9159-45e4-9a49-ef626338842b.jpeg'"
      :width="50"
    ></v-img>

    <!-- Hidden audio element -->
    <audio
      :id="audioId"
      ref="audio"
      :src="audioSource"
      @timeupdate="updateProgress"
      @loadeddata="onAudioLoaded"
      @play="onPlay"
      @pause="onPause"
      @error="onAudioError"
    ></audio>
  </div>
</template>

<script setup>
const audioSource = ref(null);
const errorStore = useErrorStore();

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
const audioProgress = ref(0);
const isPlayingInternal = ref(false); // Explicit state for play/pause icon

// Watcher for the `isPlaying` prop to control the audio element
watch(
  () => props.isPlaying,
  async (newVal) => {
    if (audio.value) {
      try {
        if (newVal) {
          if (audioSource.value !== null) {
            await audio.value.play();
          }
        } else {
          audio.value.pause();
        }
      } catch (error) {
        errorStore.setError({title: "Error controlling audio playback", text: error.message})
      }
    }
  }
);

// Methods
async function togglePlay() {
  try {
    if (audio.value) {
      if (isPlayingInternal.value) {
        audio.value.pause();
        emit('toggle-play', null);
      } else {
        if (!audioSource.value) {
          await getSong();
        }

        if (audio.value.readyState >= 3) {
          await audio.value.play();
          emit('toggle-play', props.audioId);
        } else {
          audio.value.addEventListener(
            'loadeddata',
            async () => {
              try {
                await audio.value.play();
                emit('toggle-play', props.audioId);
              } catch (error) {
                errorStore.setError({title: "Playback failed after loading data", text: error.message})
              }
            },
            { once: true }
          );

          audio.value.load(); // Ensure the audio is loaded with the new source
        }
      }
    }
  } catch (error) {
    errorStore.setError({title: "Error toggling play", text: error.message})
  }
}

function updateProgress() {
  if (audio.value && audio.value.duration) {
    audioProgress.value = (audio.value.currentTime / audio.value.duration) * 100;
  }
}

async function getSong() {
  try {
    const { url } = await $fetch(`/api/musics/${props.audioId}`);
    audioSource.value = url;
  } catch (error) {
    errorStore.setError({title: "Error fetching song URL", text: error.message})
  }
}

function onAudioLoaded() {
  console.log("Audio is ready to play");
}

function onAudioError() {
  errorStore.setError({title: "Error loading audio source", text: error.message})
}

// Sync play/pause state with audio element events
function onPlay() {
  isPlayingInternal.value = true;
}

function onPause() {
  isPlayingInternal.value = false;
}
</script>

<style scoped>
.v-progress-circular {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
