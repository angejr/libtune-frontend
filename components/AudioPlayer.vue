<template>
    <div class="d-flex justify-center align-center">
      <v-progress-circular
        :model-value="audioProgress"
        :size="60"
        :width="15"
        color="blue"
      >
        <!-- Circular Play/Pause Button -->
        <v-btn
          icon
          @click="togglePlay"
        >
          <v-icon v-if="!isPlaying">mdi-play-circle</v-icon>
          <v-icon v-else>mdi-pause-circle</v-icon>
        </v-btn>
      </v-progress-circular>
  
      <!-- Hidden audio element -->
      <audio ref="audio" :src="audioSource" @timeupdate="updateProgress"></audio>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      // Accept the audio URL as a prop
      audioSource: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isPlaying: false,
        audioProgress: 0,
      };
    },
    methods: {
      togglePlay() {
          const audio = this.$refs.audio;
        if (this.isPlaying) {
          audio.pause();
        } else {
          audio.play();
        }
  
        this.isPlaying = !this.isPlaying;
      },
      updateProgress() {
        const audio = this.$refs.audio;
        this.audioProgress = (audio.currentTime / audio.duration) * 100;
        console.log(this.audioProgress)
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
  