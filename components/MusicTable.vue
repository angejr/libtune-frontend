<script lang="js">
  export default {

    data () {
      return {
        search: "",
        headers: [
          { title: '', key: 'play', align:"center", sortable: false },
          { title: 'Title', key: 'title', align:"left" },
          { title: 'Length', key: 'length', align:"center" },
          { title: 'Tags', key: 'tags', align:"center", sortable: false },
          { title: '', key: 'download', align:"center", sortable: false },
        ],
        songs: [],
        currentPage: 1,
        itemsPerPage: 10,
        currentPlayingAudio: null,
        filter: [], 
      }
    },
    computed: {
      pageCount () {
        return Math.ceil(this.songs.length / this.itemsPerPage)
      },
      filteredItems(){
        return this.filter.length === 0 ? this.songs : this.songs.filter(el => this.filter.some( (element) => {
          let tags = el?.tags?.split(' ')
          if (el?.instrumental){
            tags.push('Instrumental')
          }
          return tags?.includes(element)
        } ) )
      }
    },
    async mounted() {
      await this.getSongs()
    },
    methods: {
      async getSongs(){
        const {data} = await useFetch(() => `${STRAPI_API_URL}/musics`, {
                              "headers": {
                                "Authorization": `Bearer ${STRAPI_TOKEN_MUSIC}`
                              }
                            })

          for (let item of data.value.data){
              this.songs.push({id: item.id, ...item.attributes, instrumental: item.attributes.lyric === "[Instrumental]"})
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
      },
      getCurrent(){
        return this.currentPlayingAudio
      },
      getRowProps(item){
        return {
          class:  item.item.id === this.getCurrent() ? 'playingClass' : ''
        }
      }
    },
    
  }

</script>


<template>
  <v-card title="Music" flat width="60%">
    <template v-slot:text>
      <v-container>
        <v-row align="start">
          <v-text-field
            v-model="search"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="outlined"
            hide-details
            single-line
            width="40%"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-autocomplete
            v-model="filter"
            :items="Object.keys(sunoTags).concat('Instrumental')"
            label="Select Tags"
            clearable
            chips
            multiple
            width="25%"
          >
          </v-autocomplete>
        </v-row>
      </v-container>
    </template>

    <v-data-table-virtual
      :headers="headers"
      :items="filteredItems"
      :search="search"
      height="100%"
      hover
      multi-sort
      :row-props="getRowProps"
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
          color="grey-darken-2"
          icon="mdi-download"
          variant="text"
          @click="downloadSong(item)"
        >
        </v-btn>
      </template>

      <template v-slot:item.tags="{ item }">
        <v-chip v-if="item.instrumental" color="green">
          Instrumental
        </v-chip>
        <v-chip
          v-if="item.tags"
          v-for="tag in item.tags.split(' ')"
          style="margin: 2px"
          size="small"
          :color="
            sunoTags[`${tag}`] ? sunoTags[`${tag}`] : `grey`
          "
          :key="tag"
          >{{ tag }}
        </v-chip>
      </template>
    </v-data-table-virtual>
  </v-card>
</template>

<style lang="css">
.playingClass {
  background-color: rgb(70, 138, 138);
  color: white;
}
</style>