import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()
  const STRAPI_API_URL = config.strapiApiUrl
  const STRAPI_TOKEN_MUSIC = config.strapiTokenMusic

  const id = event.context.params?.id

  let response: any = await $fetch(
    `${STRAPI_API_URL}/musics/${id}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${STRAPI_TOKEN_MUSIC}`,
      }
    }
  )

  const s3_url = response.data.attributes.s3_url
  const s3Client = new S3Client({ region: config.awsRegion, 
    credentials: {
      accessKeyId: config.awsAccessKeyId,
      secretAccessKey: config.awsSecretAccesKey
    }
   });
  const command = new GetObjectCommand({
    Bucket: config.awsMusicBucket,
    // Exctract name of the file from url
    Key: s3_url.split('/')[s3_url.split('/').length - 1],
    ResponseContentType: 'application/octet-stream',
  });

  const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 300 });

  let music = await $fetch(signedURL)

  return music 

  // return {url: signedURL}
})
