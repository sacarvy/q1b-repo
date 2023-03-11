import API from "~~/server/helpers"

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  const { wk_id, parent_id, depth } = getQuery(event) as {
    wk_id: string
    parent_id: string
    depth: string
  }
  // Force being a string (CF workers always returns a Buffer)
  const body = (await readRawBody(event, 'utf8'))?.toString() || ''

  if (!(wk_id && parent_id && depth)) return { data: null, msg: 'Missing required query params' }
  const res = await API.put.folder({ id, depth, wk_id, parent_id, new_data: body })

  return { data: res[0], msg: res[1] }
})
