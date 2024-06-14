import { API_URL } from '../utils/constants';

export async function getAllNovels({ category }) {
  const res = await fetch(`${API_URL}/novels?category=${category}`);

  if (!res.ok) throw Error('Failed getting novels');

  const { data: { novels } } = await res.json();

  return novels;
}
