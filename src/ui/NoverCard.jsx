import { Link } from 'react-router-dom';

/* eslint-disable react/prop-types */
function NovelCard({ novel, type, group }) {
  let novelData = novel;
  if (group === 'history') novelData = novel.novel;

  const {
    Id: id,
    Title: title,
    CoverImage: coverImage,
    Author: authors,
  } = novelData;

  const base = 'flex cursor-pointer justify-between bg-white p-4';

  const styles = {
    grid: base + ' h-96 flex-col rounded-md shadow-lg hover:shadow-xl',
    list: base + ' h-36 gap-4',
  };

  return (
    <Link to={`/novels/${id}`}>
      <li className={styles[type]}>
        {type === 'grid' && (
          <>
            <img src={coverImage} className="h-64 w-full" alt="novel cover" />
            <h3 className="text-sm font-semibold">
              {title?.length > 68 ? title?.slice(0, 67) + '...' : title}
            </h3>
            <p className="text-xs font-medium">
              {authors?.map(author => author.Name).join(', ')}
            </p>
          </>
        )}
        {type === 'list' && (
          <>
            <img src={coverImage} className="h-full w-1/2" alt="novel cover" />
            <div className="flex flex-col justify-between">
              <h3 className="text-sm font-semibold">
                {title?.length > 30 ? title.slice(0, 30) + '...' : title}
              </h3>
              <p className="text-xs font-medium">
                Đọc tiếp
                <span className="font-semibold">
                  {' '}
                  {novel.latestChapterTitle.split(':')[0]}
                </span>
              </p>
            </div>
          </>
        )}
      </li>
    </Link>
  );
}

export default NovelCard;
