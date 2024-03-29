export enum LocalStorageItem {
  Language = 'app::lang',
  Theme = 'app::theme',
  SidebarStatus = 'app::sidebar::status',
  SelectedClientApp = 'app::client_app::selected',
  SelectedChatbot = 'app::chatbot::selected'
}

function getItem<T>(item: LocalStorageItem, shouldParse = true): T | null {
  const data = localStorage.getItem(item?.toString());
  return data && shouldParse ? JSON.parse(data || '{}') : data;
}

function setItem<T>(item: LocalStorageItem, data: T): void {
  if (data === null || data === undefined) return;
  localStorage.setItem(item.toString(), JSON.stringify(data));
}

function removeItem(item: LocalStorageItem): void {
  localStorage.removeItem(item.toString());
}

function clear(): void {
  localStorage.clear();
}

export { getItem, setItem, removeItem, clear };
