/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';

import Title from '../ui/Title';
import NovelGroup from '../ui/NovelGroup';
import Section from '../ui/Section';
import LinkButton from '../ui/LinkButton';
import { getAllNovels } from '../services/apiNovels';
import Spinner from '../ui/Spinner';
import { useLocalStorageState } from '../hooks/useLocalStorageState';
import NovelsGrid from '../ui/NovelsGrid';
import Pagination from '../ui/Pagination';

function Homepage() {
  const [hotNovelsData, setHotNovelsData] = useState({});
  const [completedNovelsData, setCompletedNovelsData] = useState({});
  const [hotLoading, setHotLoading] = useState(true);
  const [completedLoading, setCompletedLoading] = useState(true);
  const [currentHotNovelsPage, setCurrentHotNovelsPage] = useState(1);
  const [currentCompletedNovelsPage, setCurrentCompletedNovelsPage] =
    useState(1);
  const [readingHistory, setReadingHistory] = useLocalStorageState(
    [],
    'history',
  );

  const hotNovelsTotalPages = hotNovelsData?.numPage || 1;
  const completedNovelsTotalPages = completedNovelsData?.numPage || 1;

  const dataHistory = readingHistory.slice(
    0,
    readingHistory.length >= 5 ? 5 : readingHistory.length,
  );

  useEffect(
    function () {
      async function fetchHotNovelsData() {
        setHotLoading(true);

        const hotNovelsData = await getAllNovels({
          category: 'truyen-hot',
          page: currentHotNovelsPage,
        });

        setHotNovelsData(hotNovelsData);

        setHotLoading(false);
      }

      fetchHotNovelsData();
    },
    [currentHotNovelsPage],
  );

  useEffect(
    function () {
      async function fetchCompletedNovelsData() {
        setCompletedLoading(true);

        const completedNovelsData = await getAllNovels({
          category: 'truyen-hoan-thanh',
          page: currentCompletedNovelsPage,
        });

        setCompletedNovelsData(completedNovelsData);

        setCompletedLoading(false);
      }

      fetchCompletedNovelsData();
    },
    [currentCompletedNovelsPage],
  );

  return (
    <>
      <div className="mt-5">
        <div className="grid grid-cols-[1fr_200px] items-start gap-x-8">
          <div>
            <NovelsGrid
              isLoading={hotLoading}
              novels={hotNovelsData?.novels}
              title="Truyện hot"
              iconTitle="trending-up-outline"
            >
              {' '}
              <Pagination
                totalPages={hotNovelsTotalPages}
                currentPage={currentHotNovelsPage}
                onPageChange={page => setCurrentHotNovelsPage(page)}
              />
            </NovelsGrid>

            <NovelsGrid
              isLoading={completedLoading}
              novels={completedNovelsData?.novels}
              title="Truyện đã hoàn thành"
              iconTitle="checkmark-done-outline"
            >
              {' '}
              <Pagination
                totalPages={completedNovelsTotalPages}
                currentPage={currentCompletedNovelsPage}
                onPageChange={page => setCurrentCompletedNovelsPage(page)}
              />
            </NovelsGrid>
          </div>

          <NovelsHistory novels={dataHistory} group="history" />
        </div>
      </div>
    </>
  );
}

function NovelsHistory({ novels, group }) {
  return (
    <Section>
      <Title>
        <ion-icon class="title-icon" name="book-outline"></ion-icon>
        Lịch sử
      </Title>
      <NovelGroup novels={novels} type="list" group={group} />

      <div className="self-end">
        <LinkButton to="reading-history" type="text">
          Xem thêm &rarr;
        </LinkButton>
      </div>
    </Section>
  );
}
export default Homepage;
