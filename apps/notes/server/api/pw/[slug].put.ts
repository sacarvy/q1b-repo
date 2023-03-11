const storage = useStorage()
// const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    const { slug } = event.context.params || {}

    // Force being a string (CF workers always returns a Buffer)
    const password = (await readRawBody(event, 'utf8'))?.toString()
    const spw_res = await storage.getItem(`notes:${slug}-secret-password`)

    if (getHeader(event, 'password') !== spw_res) {
        throw createError({
            statusCode: 401,
            message: 'Wrong password'
        })
    }

    const pw_res = await storage.setItem(`notes:${slug}-password`, password)

    return { slug, password: pw_res }
})
