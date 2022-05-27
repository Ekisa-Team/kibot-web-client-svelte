async function get<T>(url: string): Promise<T> {
  const result = await fetch(url);
  return result.json();
}

async function post<T>(url: string, body: T): Promise<T> {
  const result = await fetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return result.json();
}

async function put<T>(url: string, body: T): Promise<T> {
  const result = await fetch(url, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return result.json();
}

async function patch<T>(url: string, body: T): Promise<T> {
  const result = await fetch(url, {
    body: JSON.stringify(body),
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return result.json();
}

async function del<T>(url: string): Promise<T> {
  const result = await fetch(url, { method: 'DELETE' });
  return result.json();
}

export const http = { get, post, put, patch, del };
