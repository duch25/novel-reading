import NovelGroup from './NovelGroup';
import Section from './Section';
import Title from './Title';

/* eslint-disable react/prop-types */
function NovelsGrid({ novels, title, iconTitle, category }) {
  return (
    <Section>
      <Title>
        {iconTitle && (
          <ion-icon class="title-icon" name={`${iconTitle}`}></ion-icon>
        )}
        {title}
      </Title>

      {novels?.length ? (
        <NovelGroup novels={novels} type="grid" category={category} />
      ) : (
        <div className="mt-48 text-center italic text-gray-500">
          Dữ liệu trống
        </div>
      )}
    </Section>
  );
}

export default NovelsGrid;
