/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getNovel } from '../services/apiNovels';
import Spinner from '../ui/Spinner';
import Button from '../ui/Button';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import Chapters from '../ui/Chapters';

function NovelDetails() {
  const { id } = useParams();

  const [novelObj, setNovelObj] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [readingHistory, setReadingHistory] = useLocalStorageState(
    [],
    'history',
  );

  const navigate = useNavigate();

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

  const handleSavingReadingState = (chapterTitle, chapterId) => {
    const newReading = {
      latestChapterTitle: chapterTitle,
      latestChapterId: chapterId,
      novel: novelObj.novel,
    };

    let newHistory = [];
    let isExist = false;
    for (let i = 0; i < readingHistory.length; ++i) {
      if (readingHistory[i].novel.Id === id) {
        newHistory.push(newReading);
        isExist = true;
      } else newHistory.push(readingHistory[i]);
    }

    if (isExist === false) {
      newHistory.push(newReading);
    }

    console.log(newHistory);
    setReadingHistory(newHistory);
  };

  const handleReadingNovel = (type, chapterTitle = '', chapterId = '') => {
    let curChapter = null;
    let readingChapter = null;

    if (type === 'start') {
      readingChapter = novelObj.novel.Chapters[0].Id;
      curChapter = novelObj.novel.Chapters[0].Title;
    } else if (type === 'random') {
      curChapter = chapterTitle;
    } else if (type === 'continue') {
      readingChapter = novelObj.novel.Chapters[0].Id;

      for (let i = 0; i < readingHistory.length; ++i) {
        if (readingHistory[i].novel.Id === id)
          readingChapter = readingHistory[i].latestChapterId;
      }
    }

    if (!chapterId) chapterId = readingChapter;
    handleSavingReadingState(curChapter, chapterId);
    navigate(`/reading/${id}/${readingChapter}`);
  };

  return isLoading ? (
    <Spinner />
  ) : (
    <div className="m-auto my-10 max-w-5xl">
      <NovelDescription
        novel={novelObj?.novel}
        onReadingNovel={handleReadingNovel}
      />
      <Chapters
        chapters={novelObj.novel?.Chapters}
        id={id}
        onReadingBook={handleReadingNovel}
        type="maximum"
      />
      {/* <Pagination totalPages={totalPages} /> */}
      {/* <PaginatedItems pageCount={chapters.length} /> */}
    </div>
  );
}

function NovelDescription({ novel, onReadingNovel }) {
  const {
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
            <Button onClick={() => onReadingNovel('start')}>Đọc từ đầu</Button>
            <Button onClick={() => onReadingNovel('continue')}>
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
