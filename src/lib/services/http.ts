import type { ResponseWrapper } from '$lib/models/response-wrapper';

async function get<T>(
  url: string,
  httpHeaders?: HeadersInit | undefined
): Promise<ResponseWrapper<T>> {
  const result = await fetch(url, { headers: { ...httpHeaders } });
  return result.json();
}

async function post<T>(
  url: string,
  body: T,
  httpHeaders?: HeadersInit | undefined
): Promise<ResponseWrapper<T>> {
  const result = await fetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      ...httpHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return result.json();
}

async function put<T>(
  url: string,
  body: T,
  httpHeaders?: HeadersInit | undefined
): Promise<ResponseWrapper<T>> {
  const result = await fetch(url, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      ...httpHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return result.json();
}

async function patch<T>(
  url: string,
  body: T,
  httpHeaders?: HeadersInit | undefined
): Promise<ResponseWrapper<T>> {
  const result = await fetch(url, {
    body: JSON.stringify(body),
    method: 'PATCH',
    headers: {
      ...httpHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return result.json();
}

async function del<T>(
  url: string,
  httpHeaders?: HeadersInit | undefined
): Promise<ResponseWrapper<T>> {
  const result = await fetch(url, { method: 'DELETE', headers: { ...httpHeaders } });
  return result.json();
}

export const http = { get, post, put, patch, del };
