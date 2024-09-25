<script lang="js">
  export default {

    data () {
      return {
        search: "",
        headers: [
          { title: '', key: 'play', align:"center", sortable: false },
          { title: 'Title', key: 'title', align:"left" },
          { title: 'Length', key: 'length', align:"center" },
          { title: 'Tags', key: 'tags', align:"center" },
          { title: '', key: 'download', align:"center", sortable: false },
        ],
        songs: [],
        currentPage: 1,
        itemsPerPage: 10,
        currentPlayingAudio: null
      }
    },
    computed: {
      pageCount () {
        return Math.ceil(this.songs.length / this.itemsPerPage)
      },
    },
    async mounted() {
      await this.getSongs()
      console.log(this.songs.filter(el => el.image_url))
    },
    methods: {
      async getSongs(){
        const {data} = await useFetch(() => `${STRAPI_API_URL}/musics`, {
                              "headers": {
                                "Authorization": `Bearer ${STRAPI_TOKEN_MUSIC}`
                              }
                            })

          for (let item of data.value.data){
              this.songs.push({id: item.id, ...item.attributes})
          }
        },

      async downloadSong(item){
        // Create an invisible anchor element programmatically
        const link = document.createElement('a');
        link.href = item.s3_url; // Set href to the audio file URL
        link.setAttribute('download', item.title); // Set the download attribute with the file name

        // Append the link to the document body
        document.body.appendChild(link);

        // Programmatically click the link to trigger the download
        link.click();

        // Remove the link from the document
        document.body.removeChild(link);
      },
     
      handleTogglePlay(audioId) {
        // Set the new currently playing audio
        // If the same audio is clicked again, stop it
        this.currentPlayingAudio = this.currentPlayingAudio === audioId ? null : audioId;
      }

    }, 
    
  }

</script>


<template>
  <v-card title="Music" flat width="60%">
    <template v-slot:text>
      <v-text-field
        v-model="search"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="outlined"
        hide-details
        single-line
        width="50%"
      ></v-text-field>
    </template>

    <v-data-table
      :headers="headers"
      :items="songs"
      :search="search"
      v-model:page="currentPage"
      :items-per-page="itemsPerPage"
      height="100%"
      hover
      multi-sort
    >
  
      <template v-slot:item.play="{ item }">
        <AudioPlayer
          :audioSource="item.s3_url"
          :imageSource="item.image_url"
          :audioId="item.id"
          :isPlaying="currentPlayingAudio === item.id"
          @toggle-play="handleTogglePlay"
        >
        </AudioPlayer>
      </template>
      <template v-slot:item.length="{ item }">
        {{ item.length || "00:00" }}
      </template>

      <template v-slot:item.download="{ item }">
        <!-- Download Button -->
        <v-btn
          class="ma-2"
          color="red-lighten-2"
          icon="mdi-download"
          variant="text"
          @click="downloadSong(item)"
        >
        </v-btn>
      </template>

      <template v-slot:item.tags="{ item }">
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

      <template v-slot:bottom>
        <div class="text-center pt-2">
          <v-pagination
            v-model="currentPage"
            :length="pageCount"
          ></v-pagination>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>