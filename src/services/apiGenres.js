import { API_URL } from '../utils/constants';

export async function getAllGenres() {
    const res = await fetch(`${API_URL}/genres`);

    if (!res.ok) throw Error('Failed getting genres');

    const { data: { genres } } = await res.json();

    return genres;
}

