/* eslint-disable react/prop-types */
import NovelCard from './NoverCard';

function NovelGroup({ novels, type, group, category }) {
  const base = 'py-3 ';

  const styles = {
    grid: base + 'grid grid-cols-4 gap-5',
    list: base + 'divide-y divide-stone-200 border-b',
  };

  return (
    <ul className={styles[type]}>
      {novels?.map(novel => (
        <NovelCard
          novel={novel}
          key={novel.Id || novel?.novel?.Id}
          type={type}
          group={group}
          category={category}
        />
      ))}
    </ul>
  );
}

export default NovelGroup;
