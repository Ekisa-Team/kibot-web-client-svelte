import type { ResponseWrapper } from '$lib/models/response-wrapper';

const handleResponse = async <T>(response: Response): Promise<ResponseWrapper<T>> => {
  const serviceResponse = (await response.json()) as ResponseWrapper<T>;

  console.log(serviceResponse);

  if (!response.ok) {
    const { exceptionMessage } = serviceResponse.exception || {};

    let message = 'Some error ocurred.';

    if (typeof exceptionMessage === 'object') {
      if (Object.prototype.hasOwnProperty.call(exceptionMessage, 'message')) {
        message = `${exceptionMessage.type}: ${exceptionMessage.message || ''}`;
      } else {
        const listOfErrors: string[] = [];
        Object.keys(exceptionMessage.errors).forEach((key) =>
          listOfErrors.push(`${key} => ${exceptionMessage.errors[key].join(' - ')}`)
        );

        message = `${exceptionMessage.title}: ${listOfErrors.join(',')}`;
      }
    } else {
      message = exceptionMessage || response.statusText;
    }

    throw new Error(message);
  }

  return serviceResponse;
};

async function get<T>(url: string, httpHeaders?: HeadersInit | undefined): Promise<ResponseWrapper<T>> {
  const response = await fetch(url, { headers: { ...httpHeaders } });
  return handleResponse(response);
}

async function post<T>(
  url: string,
  body: T,
  httpHeaders?: HeadersInit | undefined
): Promise<ResponseWrapper<T>> {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    method: 'POST',
    headers: {
      ...httpHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
}

async function put<T>(
  url: string,
  body: T,
  httpHeaders?: HeadersInit | undefined
): Promise<ResponseWrapper<T>> {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    method: 'PUT',
    headers: {
      ...httpHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
}

async function patch<T>(
  url: string,
  body: T,
  httpHeaders?: HeadersInit | undefined
): Promise<ResponseWrapper<T>> {
  const response = await fetch(url, {
    body: JSON.stringify(body),
    method: 'PATCH',
    headers: {
      ...httpHeaders,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  });
  return handleResponse(response);
}

async function del<T>(url: string, httpHeaders?: HeadersInit | undefined): Promise<ResponseWrapper<T>> {
  const response = await fetch(url, { method: 'DELETE', headers: { ...httpHeaders } });
  return handleResponse(response);
}

export const http = { get, post, put, patch, del };
