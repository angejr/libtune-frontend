export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl
    const STRAPI_TOKEN_MUSIC = config.strapiTokenMusic

    return await $fetch(
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
})
