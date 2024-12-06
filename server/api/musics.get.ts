export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const STRAPI_API_URL = config.strapiApiUrl
  const STRAPI_TOKEN_MUSIC = config.strapiTokenMusic

  let allItems : any = [];
  let page = 1;
  const pageSize = 100; // Adjust based on your needs

  let response : any;
  do {
    response = await $fetch(
      `${STRAPI_API_URL}/musics`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${STRAPI_TOKEN_MUSIC}`,
        },
        query: {
          [`pagination[page]`]: page ,
          [`pagination[pageSize]`]: pageSize ,
        }
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

    // Combine results
    allItems = [...allItems, ...response.data];

    console.log({response: response.meta})

    // Increment to fetch the next page
    page++;
  } while (response.meta.pagination.pageCount >= page); // Check if there are more pages

  return {data: allItems}
})
