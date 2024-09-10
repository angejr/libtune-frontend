<script lang="js">
  export default {

    data () {
      return {
        headers: [
          { title: 'play', key: 'play' },
          { title: 'title', key: 'title' },
          { title: 'length', key: 'length' },
          { title: 'tags', key: 'tags' },
          { title: 'download', key: 'download' },
        ],

        songs: []
      }
    },
    async mounted() {
      this.getSongs()
    },
    methods: {
      async getSongs(){
        const {data, pending, error} = await useFetch(() => `${STRAPI_API_URL}/musics`, {
      "headers": {
        "Authorization": `Bearer ${STRAPI_TOKEN_MUSIC}`
      }
    })

          for (let item of data.value.data){
              this.songs.push({id: item.id, ...item.attributes})
          }

          console.log(this.songs)
        },

        async downloadSongs(item){
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
        }

      
      }
  }

</script>

<template>
  <v-data-table-virtual
    :headers="headers"
    :items="songs"
    height="400"
    width="20"
  >
  <template v-slot:item.play="{ item }">
        <AudioPlayer :audio-source="item.s3_url">
        </AudioPlayer>
      </template>

  <template v-slot:item.download="{ item }">
    <!-- Download Button -->
    <v-btn class="ma-2"
        color="red-lighten-2"
        icon="mdi-download"
        variant="text"
        @click="downloadSongs(item)"
        >
    </v-btn>
  </template>

</v-data-table-virtual>


</template>