
import { addFile, delFile, getFile, updateFile, fileKey } from "~~/server/helpers/file";
import { addFolder, delFolder, getFolder, updateFolder, folderKey } from "~~/server/helpers/folder";
import { addWorkspace, delWorkspace, getWorkspace, updateWorkspace, getWorkspaceTree, workspaceKey } from "~~/server/helpers/workspace";

const storage = useStorage()

export const API = {
  get: {
    folder: (param1: Parameters<typeof getFolder>[1]) => getFolder(storage, param1),
    file: (param1: Parameters<typeof getFile>[1]) => getFile(storage, param1),
    workspace: (param1: Parameters<typeof getWorkspace>[1]) => getWorkspace(storage, param1),
    workspaces: {
      tree: (param1: Parameters<typeof getWorkspaceTree>[1]) => getWorkspaceTree(storage, param1)
    }
  },
  add: {
    folder: (param1: Parameters<typeof addFolder>[1]) => addFolder(storage, param1),
    file: (param1: Parameters<typeof addFile>[1]) => addFile(storage, param1),
    workspace: (param1: Parameters<typeof addWorkspace>[1]) => addWorkspace(storage, param1),
  },
  del: {
    folder: (param1: Parameters<typeof delFolder>[1]) => delFolder(storage, param1),
    file: (param1: Parameters<typeof delFile>[1]) => delFile(storage, param1),
    workspace: (param1: Parameters<typeof delWorkspace>[1]) => delWorkspace(storage, param1),
  },
  put: {
    folder: (param1: Parameters<typeof updateFolder>[1]) => updateFolder(storage, param1),
    file: (param1: Parameters<typeof updateFile>[1]) => updateFile(storage, param1),
    workspace: (param1: Parameters<typeof updateWorkspace>[1]) => updateWorkspace(storage, param1),
  },
  gen: {
    fileKey,
    folderKey,
    workspaceKey
  }
}

export default API;
