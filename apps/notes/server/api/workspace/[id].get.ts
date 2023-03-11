import API from "~~/server/helpers";

export default defineEventHandler(async (event) => {
  const { id } = event.context.params || {};
  const res = await API.get.workspace({ id })
  return { data: res[0], msg: res[1] }
})
