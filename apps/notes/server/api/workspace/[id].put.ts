import API from "~~/server/helpers"

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {}
  // Force being a string (CF workers always returns a Buffer)
  const body = (await readRawBody(event, 'utf8'))?.toString() || ''
  const res = await API.put.workspace({ id, data: body })
  return { data: res[0], msg: res[1] }
})
