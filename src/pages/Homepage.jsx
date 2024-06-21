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

function Homepage() {
  const [hotNovels, setHotNovels] = useState([]);
  const [completedNovels, setCompletedNovels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [readingHistory, setReadingHistory] = useLocalStorageState(
    [],
    'history',
  );

  useEffect(function () {
    async function fetchHomePageData() {
      setIsLoading(true);

      const hotNovels = await getAllNovels({ category: 'truyen-hot' });
      const completedNovels = await getAllNovels({
        category: 'truyen-hoan-thanh',
      });

      setHotNovels(hotNovels);
      setCompletedNovels(completedNovels);

      setIsLoading(false);
    }

    fetchHomePageData();
  }, []);

  if (isLoading) return <Spinner />;

  return (
    <>
      <div className="mt-5">
        <div className="grid grid-cols-[1fr_200px] items-start gap-x-8">
          <div>
            <NovelsGrid
              novels={hotNovels}
              title="Truyện hot"
              iconTitle="trending-up-outline"
            />

            <NovelsGrid
              novels={completedNovels}
              title="Truyện đã hoàn thành"
              iconTitle="checkmark-done-outline"
            />
          </div>

          <NovelsHistory novels={readingHistory} group="history" />
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
