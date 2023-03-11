import { nanoid } from "nanoid"

export const workspaceKey = (id?: string) => id ? 'wk-id:' + id : 'wk-id';

const key = workspaceKey;

type Data = string

export async function getWorkspaces(storage: any): Promise<string[]> {
  return await storage.getKeys(`${key()}`)
}

export async function addWorkspace(storage: any, {
  data,
}: {
  data: Data;
}): Promise<[string, string]> {
  const id = nanoid(4)
  if (await storage.hasItem(`${key(id)}`)) ["", 'Workspace with same id already exists']
  const res = await storage.getItem(`${key(id)}`) as Data;
  if (data === res) return ['', 'Workspace with same name already exists']
  await storage.setItem(`${key(id)}`, data);
  return [id, ''];
}

export async function getWorkspace(storage: any, {
  id,
}: {
  id: string;
}): Promise<[Data, string]> {
  if (!(await storage.hasItem(`${key(id)}`))) return ["", "Workspace with provided name doesn't exists"]
  const res = await storage.getItem(`${key(id)}`) as Data;
  return [res, ""];
}

export async function delWorkspace(storage: any, {
  id,
}: {
  id: string;
}): Promise<[string, string]> {
  if (!(await storage.hasItem(`${key(id)}`))) ["", "Workspace with provided name doesn't exists"]
  await storage.removeItem(`${key(id)}`);
  return ['Workspace Deleted Successfully!!!', ""]
}

export async function updateWorkspace(storage: any, {
  id,
  data,
}: {
  id: string;
  data: Data;
}): Promise<[string, string]> {
  if (!(await storage.hasItem(`${key(id)}`))) ["", "Workspace with provided name doesn't exists",]
  await storage.setItem(`${key(id)}`, data);
  return [`Workspace Name Updated Successfully!!!`, ""];
}


export async function getIdentity(storage: any, {
  wk_id,
  depth,
}: {
  wk_id: string;
  depth: number | string;
}): Promise<string[]> {
  const key = `notes:wk:${wk_id}:${depth}`;
  return await storage.getKeys(key);
}

const id = (item: { depth: string; name: string; type: 'folder' | 'file' }) => `${item.depth}:${item.name}:${item.type}`;

function toTree(arr: Item[]) {
  let arrMap = new Map(arr.map((item) => [item.id, item]));
  let tree = [];
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item?.parent_id) {
      let parentItem = arrMap.get(item?.parent_id);
      if (!parentItem) continue;
      if (parentItem?.children) parentItem?.children.push(item);
      else parentItem.children = [item];
    } else tree.push(item);
  }
  return tree;
}

type Item = {
  id: string;
  name: string;
  type: 'file' | 'folder';
  parent_id?: string;
  children?: Item[];
};

export async function getWorkspaceTree(storage: any, {
  wk_id,
}: {
  wk_id: string;
}) {
  let depth: number | string = 0;
  let maxItr = 0;

  let result: Item[] = [];

  let len = 0;

  (await getIdentity(storage, { wk_id, depth })).forEach((key) => {
    len++;
    const [, , , , ...others] = key.split(':');
    const [type, name] = others as ['folder' | 'file', string];
    // depth is zero
    result.push({
      id: id({ name, depth: `${depth}`, type }),
      name,
      type,
    });
  });

  if (len === 0) {
    return [];
  } else {
    depth++;
    while (len != 0 && maxItr < 100) {
      len = 0;
      const values = await getIdentity(storage, { wk_id, depth });

      values.forEach((key) => {
        const [, , , , ...others] = key.split(':');
        const [type, name, parent_name] = others as [
          'folder' | 'file',
          string,
          string
        ];
        result.push({
          id: id({ name, depth: `${depth}`, type }),
          name,
          type,
          parent_id: id({
            name: parent_name,
            depth: `${depth - 1}`,
            type: 'folder',
          }),
        });
        len++;
      });
      maxItr++;
      depth++;
    }
  }
  return toTree(result)
}
