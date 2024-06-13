/* eslint-disable react/prop-types */
function NovelCard({ novel, type }) {
  const { Title: title, CoverImage: coverImage, Genre: genre } = novel;

  const base = 'flex cursor-pointer justify-between bg-white p-4';

  const styles = {
    grid: base + ' h-96 flex-col rounded-md shadow hover:shadow-xl',
    list: base + ' h-36 gap-4',
  };

  return (
    <li className={styles[type]}>
      {type === 'grid' && (
        <>
          <img src={coverImage} className="h-64 w-full" alt="novel cover" />
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs font-medium">Unknown</p>
        </>
      )}
      {type === 'list' && (
        <>
          <img src={coverImage} className="h-full w-1/2" alt="novel cover" />
          <div className="flex flex-col justify-between">
            <h3 className="text-sm font-semibold">
              {title.length > 30 ? title.slice(0, 30) + '...' : title}
            </h3>
            <p className="text-xs font-medium">Đọc tiếp chương %X</p>
          </div>
        </>
      )}
    </li>
  );
}

export default NovelCard;
