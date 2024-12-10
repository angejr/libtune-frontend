import xss from "xss"
import { z } from "zod"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const STRAPI_API_URL = config.strapiApiUrl;
  const STRAPI_TOKEN_MUSIC = config.strapiTokenMusic;

  // Validate input against schema
  const schema = z.object({
    search: z.string().max(100),
    filter: z.string().max(100),
    page: z.string().regex(/[0-9]*/),
    pageSize: z.string().regex(/[0-9]*/)
  }).strict()

  const validation = await getValidatedQuery(event, query => schema.safeParse(query))

  if (!validation.success) {
    throw createError({
      statusCode: 400,
      statusMessage: validation.error?.errors.map(el => el.message).join(' + ')
    })
  }

  const incomingQuery = validation.data;

  // Validate that the query input is safe
  if (Object.values(incomingQuery).some(el => xss(el) !== el)) {
    throw createError({
      statusCode: 400
    })
  }

  const page = incomingQuery.page || 1;
  const pageSize = incomingQuery.pageSize || 50;
  const search = incomingQuery.search.trim() || "";
  const filter = incomingQuery.filter ? incomingQuery.filter.split(",") : [];

  const query: any = {
    [`pagination[page]`]: page,
    [`pagination[pageSize]`]: pageSize,
  }

  if (search) {
    query[`filters[title][$containsi]`] = search
  }

  const response: any = await $fetch(`${STRAPI_API_URL}/musics`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_TOKEN_MUSIC}`,
    },
    query
  });

  response.data = response.data.map((song: any) => ({
    id: song.id,
    title: song.attributes.title || "Untitled",
    length: song.attributes.length,
    instrumental: song.attributes.lyric === "[Instrumental]",
    tags: song.attributes?.tags ? song.attributes.tags.replaceAll(",", "").replace("hip hop", "hip-hop") : null,
    image_url: song.attributes.image_url,
    lyric: song.attributes.lyric,
  }))

  if (filter.length > 0) {
    response.data = response.data.filter((el: any) =>
      filter.some((element) => {
        let tags = el?.tags?.split(" ");
        if (el?.instrumental) tags.push("Instrumental");
        return tags?.includes(element);
      })
    );
  }

  return response;
});
