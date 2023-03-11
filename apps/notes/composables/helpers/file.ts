import { nanoid } from "nanoid"

export const fileKey = ({ wk_id, depth, id, parent_id }: { wk_id: string, depth: number | string, id: string, parent_id?: string }) => {
  return `wk:${wk_id}:${depth}:file:${id}:${(depth !== 0 && depth !== "0") && `${parent_id}`}`
}

const getKey = fileKey

type Data = string

export async function getFiles(storage: any, { wk_id, depth }: { wk_id: string, depth: number | string }): Promise<string[]> {
  return await storage.getKeys(`wk:${wk_id}:${depth}:file:`)
}

export async function addFile(storage: any, {
  wk_id,
  depth,
  parent_id,
  data
}: {
  wk_id: string,
  depth: number | string,
  data: Data,
  parent_id?: string
}): Promise<[string, string]> {
  $fetch(`/api/pages/:slug`, {
    method: 'POST',
  })
}

export async function getFile(storage: any, {
  wk_id,
  id,
  depth,
  parent_id
}: {
  wk_id: string;
  id: string;
  depth: number | string;
  parent_id?: string;
}): Promise<[Data, string]> {
  const key = getKey({ wk_id, depth, id, parent_id })
  if (!(await storage.hasItem(`${key}`))) ["", "File with same id doesn't exists"]
  const res = await storage.getItem(`${key}`) as Data;
  return [res, ""];
}

export async function delFile(storage: any, {
  wk_id,
  id,
  depth,
  parent_id
}: {
  wk_id: string;
  id: string;
  depth: number | string;
  parent_id?: string;
}
): Promise<[string, string]> {
  const key = getKey({ wk_id, depth, id, parent_id })
  if (!(await storage.hasItem(`${key}`))) ["", "File with same id doesn't exists"]
  await storage.removeItem(`${key}`)
  return ['Workspace Deleted Successfully!!!', ""]
}

export async function updateFile(storage: any, {
  id,
  wk_id,
  depth,
  new_data,
  parent_id,
}: {
  id: string,
  wk_id: string,
  depth: number | string,
  new_data: Data,
  parent_id?: string
}): Promise<[string, string]> {
  const key = getKey({ wk_id, depth, id, parent_id })
  if (await storage.hasItem(`${key}`)) ["", 'File with same id already exists']
  await storage.removeItem(`${key}`);
  await storage.setItem(`${key}`, new_data);
  return ['File Created Successfully!!!', ''];
}

