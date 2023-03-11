import { nanoid } from "nanoid"

export const folderKey = ({ wk_id, depth, id, parent_id }: { wk_id: string, depth: number | string, id: string, parent_id?: string }) => {
  return `wk:${wk_id}:${depth}:folder:${id}:${(depth !== 0 && depth !== "0") && `${parent_id}`}`
}

const getKey = folderKey

type Data = string

export async function getFolders(storage: any, { wk_id, depth }: { wk_id: string, depth: number | string }): Promise<string[]> {
  return await storage.getKeys(`wk:${wk_id}:${depth}:folder:`)
}

export async function addFolder(storage: any, {
  wk_id,
  depth,
  data,
  parent_id,
}: {
  wk_id: string,
  depth: number | string,
  data: Data,
  parent_id?: string
}): Promise<[string, string]> {
  const id = nanoid(4)
  const key = getKey({ wk_id, depth, id, parent_id })
  if (await storage.hasItem(`${key}`)) ["", 'Folder with same id already exists']
  const res = await storage.getItem(`${key}`) as Data;
  if (data === res) return ['', 'Folder with same name already exists']
  await storage.setItem(`${key}`, data);
  return ['Folder Created Successfully!!!', ''];
}

export async function getFolder(storage: any, {
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
  if (!(await storage.hasItem(`${key}`))) ["", "Folder with same id doesn't exists"]
  const res = await storage.getItem(`${key}`) as Data;
  return [res, ""];
}

export async function delFolder(storage: any, {
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
  if (!(await storage.hasItem(`${key}`))) ["", "Folder with same id doesn't exists"]
  await storage.removeItem(`${key}`)
  return ['Workspace Deleted Successfully!!!', ""]
}

export async function updateFolder(storage: any, {
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
  if (await storage.hasItem(`${key}`)) ["", 'Folder with same id already exists']
  await storage.removeItem(`${key}`);
  await storage.setItem(`${key}`, new_data);
  return [id, ''];
}

