import NovelGroup from './NovelGroup';
import Section from './Section';
import Title from './Title';

/* eslint-disable react/prop-types */
function NovelsGrid({ novels, title, iconTitle }) {
  return (
    <Section>
      <Title>
        {iconTitle && (
          <ion-icon class="title-icon" name={`${iconTitle}`}></ion-icon>
        )}
        {title}
      </Title>
      <NovelGroup novels={novels} type="grid" />
    </Section>
  );
}

export default NovelsGrid;
