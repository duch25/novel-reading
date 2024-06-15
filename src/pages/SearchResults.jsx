/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllNovels } from '../services/apiNovels';
import Spinner from '../ui/Spinner';
import NovelsGrid from '../ui/NovelsGrid';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchedNovels, setSearchedNovels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const genre = searchParams.get('genre');
  const name = searchParams.get('name');
  let search = searchParams.get('q');

  if (search) search = search.replace(/%20/g, '+');

  useEffect(
    function () {
      async function getNovels() {
        setIsLoading(true);

        const novelsData = await getAllNovels({
          genre: genre,
          search: search,
        });
        setSearchedNovels(novelsData);

        setIsLoading(false);
      }

      if (!genre && !search) return;

      getNovels();
    },
    [genre, search],
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-5">
      {searchedNovels ? (
        <>
          {genre && (
            <NovelsGrid title={`Thể loại ${name}`} novels={searchedNovels} />
          )}
          ;
          {search && (
            <NovelsGrid
              title={`Kết quả tìm kiếm cho "${search}"`}
              iconTitle="search-outline"
              novels={searchedNovels}
            />
          )}
        </>
      ) : (
        <div className="text-center">Oops! No novel founded!</div>
      )}
    </div>
  );
}

export default SearchResults;
