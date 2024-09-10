<script setup lang="ts">

    const {data, pending, error} = await useFetch(() => `${STRAPI_API_URL}/musics`, {
      "headers": {
        "Authorization": `Bearer ${STRAPI_TOKEN_MUSIC}`
      }
    })

    let songs = []
    for (let item of data.value.data){
        songs.push({id: item.id, ...item.attributes})
    }



</script>

<template>
    <v-table>
        <thead>
      <tr>
        <th class="text-left">
          Play
        </th>
        <th class="text-left">
          Title
        </th>
        <th class="text-left">
          Time
        </th>
        <th class="text-left">
          Tags
        </th>
      </tr>
    </thead>
    <tbody>

        <tr
        v-for="item in songs"
        :key="item.id"
      >
        <td>
            <AudioPlayer :audioSource="item.s3_url">
            </AudioPlayer>
        </td>
        <td>{{ item.title }}</td>
        <td>{{ item.length }}</td>
        <td>{{ item.tags }}</td>
      </tr>
    </tbody>
    </v-table>
</template>