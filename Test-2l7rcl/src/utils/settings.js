const fsProvider = require('uxp').storage.localFileSystem;

const TOKEN_KEY = 'defaultOutputFolderToken';
let cachedFolderEntry = null; // session-scoped cache

export function getDefaultOutputFolderToken() {
  try {
    return localStorage.getItem(TOKEN_KEY) || '';
  } catch (e) {
    return '';
  }
}

export function setDefaultOutputFolderToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token || '');
  } catch (e) {}
}

export function clearDefaultOutputFolderToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (e) {}
  cachedFolderEntry = null;
}

export async function resolveDefaultOutputFolder() {
  // Prefer in-memory cached entry for reliability inside UXP panel
  if (cachedFolderEntry && typeof cachedFolderEntry.createFile === 'function') {
    return cachedFolderEntry;
  }
  // Attempt to resolve a previously stored persistent token
  const token = getDefaultOutputFolderToken();
  if (!token) return null;
  try {
    const entry = await fsProvider.getEntryForPersistentToken(token);
    if (entry && typeof entry.createFile === 'function') {
      cachedFolderEntry = entry;
      return entry; // folder
    }
  } catch (e) {
    // token invalid or revoked; ignore
  }
  return null;
}

export async function chooseAndStoreDefaultOutputFolder() {
  const folder = await fsProvider.getFolder();
  if (!folder) return null;
  cachedFolderEntry = folder;
  try {
    const token = await fsProvider.createPersistentToken(folder);
    setDefaultOutputFolderToken(token);
  } catch (e) {
    // Some hosts may not support persistence; still proceed with cached entry
  }
  return folder;
}
