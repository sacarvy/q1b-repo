import API from "~~/server/helpers"

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  const { wk_id, parent_id, depth } = getQuery(event) as {
    wk_id: string
    parent_id: string
    depth: string
  }

  if (!(wk_id && parent_id && depth)) return { data: null, msg: 'Missing required query params' }
  const res = await API.del.file({ id, depth, wk_id, parent_id })

  return { data: res[0], msg: res[1] }
})
