export type SessionStorageItem = {
  SidebarStatus: 'app::sidebar::status';
};

function getItem<T>(item: SessionStorageItem, shouldParse = true): T | null {
  const data = sessionStorage.getItem(item.toString());
  return data && shouldParse ? JSON.parse(data || '{}') : data;
}

function setItem<T>(item: SessionStorageItem, data: T): void {
  if (data === null || data === undefined) return;
  sessionStorage.setItem(item.toString(), JSON.stringify(data));
}

function removeItem(item: SessionStorageItem): void {
  sessionStorage.removeItem(item.toString());
}

function clear(): void {
  localStorage.clear();
}

export { getItem, setItem, removeItem, clear };
