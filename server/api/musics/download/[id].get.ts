import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig()
    const STRAPI_API_URL = config.strapiApiUrl
    const STRAPI_URL = config.public.strapiUrl
    const STRAPI_TOKEN_MUSIC = config.strapiTokenMusic
    const STRAPI_ADMIN_API_TOKEN = config.strapiAdminApiToken

    const id = event.context.params?.id

    // First call to get the customerId of the user calling the API by validating the authorization token
    const authorization = event.node.req.headers.authorization!

    let response: any = await $fetch(
        `${STRAPI_API_URL}/users/me`,
        {
            method: 'GET',
            headers: {
                authorization,
            }
        }
    )
    const { email, customerId } = response

    // Throw error if the user doesn't have a customer id
    if (!customerId) {
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden: User has no customer Id',
        });
    }

    // Check if user is a currently paying customer
    response = await $fetch(`${STRAPI_URL}/strapi-stripe/getSubscriptionStatus/${email}`,
        {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${STRAPI_ADMIN_API_TOKEN}`
            },
        })

    const subscriptions = response.data

    if (!subscriptions.some((el: any) => el.status == 'active')){
        throw createError({
            statusCode: 403,
            statusMessage: 'Forbidden: User is not an active customer',
        });
    }
    response = await $fetch(
        `${STRAPI_API_URL}/musics/${id}`,
        {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${STRAPI_TOKEN_MUSIC}`,
            }
        }
    )

    const s3_url = response.data.attributes.s3_url
    const s3Client = new S3Client({
        region: config.awsRegion,
        credentials: {
            accessKeyId: config.awsAccessKeyId,
            secretAccessKey: config.awsSecretAccessKey
        }
    });
    const command = new GetObjectCommand({
        Bucket: config.awsMusicBucket,
        // Exctract name of the file from url
        Key: s3_url.split('/')[s3_url.split('/').length - 1]
    });

    const signedURL = await getSignedUrl(s3Client, command, { expiresIn: 300 });
    return { url: signedURL}
})
