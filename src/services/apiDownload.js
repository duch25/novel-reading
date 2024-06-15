import { API_URL } from '../utils/constants';

export async function download(requestBody) {

  const res = await fetch(`${API_URL}/downloads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });


  if (!res.ok) throw Error('Failed downloading file');

  const {
    data
  } = await res.json();

  return data;
}

export async function getAllFileFormats() {
  const res = await fetch(`${API_URL}/types`);

  if (!res.ok) throw Error('Failed getting file types format');

  const {
    data: { types },
  } = await res.json();

  return types;
}
