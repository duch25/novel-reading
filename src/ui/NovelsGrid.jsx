import { useEffect, useRef } from 'react';
import NovelGroup from './NovelGroup';
import Section from './Section';
import Spinner from './Spinner';
import Title from './Title';

/* eslint-disable react/prop-types */
function NovelsGrid({
  novels,
  title,
  iconTitle,
  category,
  isLoading,
  children,
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!isLoading) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading]);

  return (
    <Section isLoading={isLoading} sectionRef={sectionRef}>
      <Title>
        {iconTitle && (
          <ion-icon class="title-icon" name={`${iconTitle}`}></ion-icon>
        )}
        {title}
      </Title>

      {isLoading ? (
        <Spinner />
      ) : novels?.length ? (
        <NovelGroup novels={novels} type="grid" category={category} />
      ) : (
        <div className="mt-48 text-center italic text-gray-500">
          Dữ liệu trống
        </div>
      )}

      {novels?.length && children}
    </Section>
  );
}

export default NovelsGrid;
