export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const STRAPI_API_URL = config.strapiApiUrl
  const STRAPI_TOKEN_MUSIC = config.strapiTokenMusic

  const response = await $fetch(
    `${STRAPI_API_URL}/musics`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN_MUSIC}`,
      },
      query: {
        [`pagination[limit]`]: 1000,
      },
    }
  )

  response.data = response.data.map((song: any) => {
    return {
      id: song.id,
      attributes: {
        title: song.attributes.title,
        length: song.attributes.length,
        tags: song.attributes.tags,
        image_url: song.attributes.image_url,
        lyric: song.attributes.lyric

      },
    }
  })

  return response
})
