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
      <v-icon color="black" @click="togglePlay"
        >{{ !isPlaying ? "mdi-play-circle" : "mdi-pause-circle" }}
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
  
  <script>
export default {
  props: {
    audioSource: {
      type: String,
      required: true,
    },
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
  },
  data() {
    return {
      isPlayingInternal: false,
      audioProgress: 0,
    };
  },
  watch: {
    isPlaying(newVal) {
      // Watch the `isPlaying` prop to control the audio element
      const audioElement = this.$refs.audio;
      if (newVal) {
        audioElement.play();
        this.isPlayingInternal = true;
      } else {
        audioElement.pause();
        this.isPlayingInternal = false;
      }
    },
  },
  methods: {
    togglePlay() {
      const audio = this.$refs.audio;
      if (this.isPlayingInternal) {
        this.$emit("toggle-play", null);
      } else {
        this.$emit("toggle-play", this.audioId);
      }
    },
    updateProgress() {
      const audio = this.$refs.audio;
      this.audioProgress = (audio.currentTime / audio.duration) * 100;
    },
  },
};
</script>
  
  <style scoped>
.v-progress-circular {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
  