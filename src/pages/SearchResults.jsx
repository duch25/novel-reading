/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllNovels } from '../services/apiNovels';
import Spinner from '../ui/Spinner';
import NovelsGrid from '../ui/NovelsGrid';
import Pagination from '../ui/Pagination';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const [searchedNovelsData, setSearchedNovelsData] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const genre = searchParams.get('genre');
  const name = searchParams.get('name');
  const source = searchParams.get('source');
  let search = searchParams.get('q');

  if (search) search = search.replace(/%20/g, '+');

  const totalPages = searchedNovelsData?.numPage;

  useEffect(
    function () {
      async function getNovels() {
        setIsLoading(true);

        const novelsData = await getAllNovels({
          genre: genre,
          search: search,
          page: currentPage,
        });
        setSearchedNovelsData(novelsData);

        setIsLoading(false);
      }

      if (!genre && !search && !source) return;

      getNovels();
    },
    [genre, search, source, currentPage],
  );

  if (isLoading) return <Spinner />;

  return (
    <div className="mt-5">
      {genre && (
        <NovelsGrid
          title={`Thể loại ${name}`}
          novels={searchedNovelsData?.novels}
        >
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
          />
        </NovelsGrid>
      )}
      {search && (
        <NovelsGrid
          title={`Kết quả tìm kiếm cho "${search}"`}
          iconTitle="search-outline"
          novels={searchedNovelsData?.novels}
        >
          {' '}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={page => setCurrentPage(page)}
          />
        </NovelsGrid>
      )}
    </div>
  );
}

export default SearchResults;
