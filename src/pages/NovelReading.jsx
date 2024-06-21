/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getChapter } from '../services/apiNovels';
import Spinner from '../ui/Spinner';
import LinkButton from '../ui/LinkButton';
import Button from '../ui/Button';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import DownloadBox from '../features/download/DownloadBox';
import Chapters from '../ui/Chapters';
import Settings from '../features/settings/Settings';
import { SettingProvider, useSetting } from '../context/SettingContext';

function NovelReading() {
  const { novelId, chapterId } = useParams();
  const [readingChapter, setReadingChapter] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function getChapterData() {
        setIsLoading(true);

        const dataChapter = await getChapter(novelId, chapterId);
        setReadingChapter(dataChapter);

        setIsLoading(false);
      }

      if (!novelId && !chapterId) return;

      getChapterData();
    },
    [novelId, chapterId, setIsLoading],
  );

  return (
    <div className="mb-12 mt-6 flex flex-col items-center gap-10">
      {Object.keys(readingChapter).length !== 0 && (
        <>
          <ReadingHeader readingChapter={readingChapter} />
          <NavigateChapter readingChapter={readingChapter} />
        </>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <SettingProvider>
          <Content readingChapter={readingChapter} />
        </SettingProvider>
      )}
    </div>
  );
}

function ReadingHeader({ readingChapter }) {
  const { novel, currentChapter } = readingChapter;

  return (
    <div className="text-center">
      <h2 className="mb-4 text-xl font-semibold uppercase">{novel?.Title}</h2>
      <h3 className="text-lg font-semibold">{currentChapter?.Title}</h3>
    </div>
  );
}

function NavigateChapter({ readingChapter }) {
  const [isOpen, setIsOpen] = useState(false);
  const { novelId, chapterId } = useParams();
  const popupRef = useRef(null);
  const [readingHistory, setReadingHistory] = useLocalStorageState(
    [],
    'history',
  );

  const { novel, currentChapter, nextChapter, previousChapter } =
    readingChapter;

  const { Chapters: chapters } = novel || {};

  const handleShowChapters = e => {
    if (e.target.tagName === 'SPAN') setIsOpen(isOpen => !isOpen);
  };

  const handleClickOutside = e => {
    if (!popupRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  // saving reading state to local storage
  useEffect(() => {
    const newReading = {
      latestChapterTitle: currentChapter.Title,
      latestChapterId: chapterId,
      novel: novel,
    };

    let newHistory = [];
    let isExist = false;
    for (let i = 0; i < readingHistory.length; ++i) {
      if (readingHistory[i].novel.Id === novel.Id) {
        newHistory.unshift(newReading);
        isExist = true;
      } else newHistory.push(readingHistory[i]);
    }

    if (isExist === false) {
      newHistory.unshift(newReading);
    }

    setReadingHistory(newHistory);
  }, [novelId, chapterId, currentChapter.Title]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div
      className="relative flex cursor-pointer items-center gap-2 rounded-md bg-sky-50 px-3 py-2"
      onClick={handleShowChapters}
    >
      <Button>
        <LinkButton to={`/reading/${novel?.Id}/${previousChapter}`}>
          &larr;
        </LinkButton>
      </Button>
      <span className="font-medium"> {currentChapter?.Title}</span>
      <Button>
        <LinkButton to={`/reading/${novel?.Id}/${nextChapter}`}>
          &rarr;
        </LinkButton>
      </Button>
      {isOpen && (
        <Chapters
          popupRef={popupRef}
          chapters={chapters}
          novelId={novel.Id}
          type="mini"
        />
      )}
    </div>
  );
}

function Content({ readingChapter }) {
  const [hoveredEl, setHoveredEl] = useState(false);

  const { currentChapter } = readingChapter;

  const { color, fontFamily, fontSize, lineHeight } = useSetting();

  const style = {
    backgroundColor: `${color}`,
    fontSize: fontSize + 'px',
    fontFamily: fontFamily,
    lineHeight: lineHeight + 'rem',
  };

  console.log(style);

  const handleHoverButton = async el => {
    setHoveredEl(el);
  };

  const handleLeaveButton = async () => {
    setHoveredEl('');
  };

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <Button
          onMouseEnter={() => handleHoverButton('setting')}
          onMouseLeave={handleLeaveButton}
        >
          <ion-icon class="icon" name="settings-outline"></ion-icon>
          {hoveredEl === 'setting' && <Settings />}
        </Button>
        <Button
          onMouseEnter={() => handleHoverButton('download')}
          onMouseLeave={handleLeaveButton}
        >
          <ion-icon class="icon" name="download-outline"></ion-icon>
          {hoveredEl === 'download' && <DownloadBox />}
        </Button>
      </div>
      <div
        style={style}
        className="mx-auto rounded-md bg-white px-12 py-8 shadow"
      >
        <div
          className="preformatted"
          dangerouslySetInnerHTML={{ __html: currentChapter?.Content }}
        ></div>
      </div>
    </div>
  );
}

export default NovelReading;
