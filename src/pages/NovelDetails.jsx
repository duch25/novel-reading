/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNovel } from '../services/apiNovels';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import Chapters from '../ui/Chapters';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

function NovelDetails() {
  const { id } = useParams();
  const [novelObj, setNovelObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getNovelData(id) {
        setIsLoading(true);

        const novelData = await getNovel(id);
        setNovelObj(novelData);

        setIsLoading(false);
      }

      if (!id) return;

      getNovelData(id);
    },
    [id],
  );

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="m-auto my-10 max-w-5xl">
      <NovelDescription novel={novelObj?.novel} />
      <Chapters
        chapters={novelObj.novel?.Chapters}
        novelId={id}
        type="maximum"
      />
      {/* <Pagination totalPages={totalPages} /> */}
      {/* <PaginatedItems pageCount={chapters.length} /> */}
    </div>
  );
}

function NovelDescription({ novel }) {
  const {
    Id: id,
    Title: title,
    Rate: rate,
    Author: authors,
    Genre: genres,
    CoverImage: coverImage,
    Description: description,
    Status: status,
    Chapters: chapters,
    LatestChapter: latestChapter,
  } = novel || {};

  const navigate = useNavigate();
  const [readingHistory, setReadingHistory] = useLocalStorageState(
    [],
    'history',
  );

  let nextChapter = novel?.Chapters.at(0).Id;

  for (let i = 0; i < readingHistory.length; ++i) {
    if (readingHistory[i].novel.Id === id)
      nextChapter = readingHistory[i].latestChapterId;
  }

  return (
    <>
      <h2 className="mb-4 text-xl font-semibold">{title}</h2>
      <div className="mb-10 flex rounded-lg bg-sky-100 px-8 py-6 shadow-md">
        <img className="h-48" src={coverImage} alt="novel cover" />
        <div className="flex grow flex-col justify-between">
          <div className="flex justify-around">
            <div className="flex flex-col gap-3">
              <p>
                <span className="font-medium">Tác giả: </span>
                {authors?.map(author => author.Name).join(', ')}
              </p>
              <p>
                <span className="font-medium">Trạng thái: </span>{' '}
                <span
                  className={`${status === 'Đang ra' ? 'text-blue-700' : 'text-green-500'} font-semibold`}
                >
                  {status}
                </span>
              </p>
              <p>
                <span className="font-medium">Tóm tắt: </span> {description}
              </p>
            </div>

            <div className="flex flex-col items-center text-lg font-semibold">
              <p>Đánh giá</p>
              <span className="text-xl font-medium text-yellow-500">
                {rate?.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="flex justify-around text-sm">
            <Button
              onClick={() => navigate(`/reading/${id}/${novel.Chapters[0].Id}`)}
            >
              Đọc từ đầu
            </Button>
            <Button onClick={() => navigate(`/reading/${id}/${nextChapter}`)}>
              Đọc tiếp &rarr;
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

function Pagination({ totalPages }) {
  const paginEl = Array.from({ length: totalPages }, (_, i) => i + 1);
  console.log(paginEl);
  return (
    <ul>
      {paginEl.map(el => (
        <li key={el}>{el}</li>
      ))}
    </ul>
  );
}
export default NovelDetails;
