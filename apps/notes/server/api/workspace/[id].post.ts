import API from "~~/server/helpers"

export default defineEventHandler(async (event) => {
  // Force being a string (CF workers always returns a Buffer)
  const body = (await readRawBody(event, 'utf8'))?.toString() || ''
  const res = await API.add.workspace({ data: body })
  return { id: res[0], msg: res[1] }
})
