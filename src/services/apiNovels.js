import { API_URL } from '../utils/constants';

export async function getAllNovels({ category, genre, page, search }) {
  let URL = `${API_URL}/novels?`
  if (category) URL += `category=${category}&`
  if (genre) URL += `genre=${genre}&`
  if (page) URL += `page=${page}&`
  if (search) URL += `search=${search}&`

  URL = URL.slice(0, URL.length - 1);

  const res = await fetch(URL);

  if (!res.ok) throw Error('Failed getting novels');

  const { data: { novels } } = await res.json();

  return novels;
}

export async function getNovel(id) {
  const res = await fetch(`${API_URL}/novels/${id}`);

  if (!res.ok) throw Error('Failed getting novel');

  const { data: { novel, numPage } } = await res.json();
  return { novel, numPage };
}

export async function getChapter(novelId, chapterId) {
  const res = await fetch(`${API_URL}/novels/${novelId}/${chapterId}`);

  if (!res.ok) throw Error('Failed getting chapter');

  const { data: { current_chapter: currentChapter, previous_chapter: { Id: nextChapter }, next_chapter: { Id: previousChapter }, novels: novel
  } } = await res.json();

  return { novel, currentChapter, previousChapter, nextChapter };
}

export async function getAllSources() {
  const res = await fetch(`${API_URL}/sources`);

  if (!res.ok) throw Error('Failed getting sources');

  const { data: { sources } } = await res.json();

  return sources;
}

export async function reorderSources(requestBody) {
  let content = JSON.stringify(requestBody);
  content = content.replace(/''/g, "");

  const res = await fetch(`${API_URL}/sources`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: content
  }
  )

  if (!res.ok) throw Error('Failed setting sources');

  const { data: { body: { sources } } } = await res.json();

  // console.log(sources);
  return sources;
}