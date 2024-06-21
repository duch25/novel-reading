/* eslint-disable react/prop-types */
import NovelsGrid from '../ui/NovelsGrid';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

function ReadingHistory() {
  const [readingHistory, setReadingHistory] = useLocalStorageState(
    [],
    'history',
  );

  let dataHistory = Object.assign([], readingHistory);
  for (let i = 0; i < dataHistory.length; ++i) {
    dataHistory[i] = {
      Id: dataHistory[i].novel.Id,
      Title: dataHistory[i].novel.Title,
      CoverImage: dataHistory[i].novel.CoverImage,
      latestChapterTitle: dataHistory[i].latestChapterTitle,
      latestChapterId: dataHistory[i].latestChapterId,
    };
  }

  return (
    <div className="relative mt-5">
      <NovelsGrid
        title={'Lịch sử đọc truyện'}
        iconTitle="book-outline"
        novels={dataHistory}
        category="history"
      />
    </div>
  );
}

export default ReadingHistory;
