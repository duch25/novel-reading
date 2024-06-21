import LinkButton from './LinkButton';

/* eslint-disable react/prop-types */
function Chapters({ chapters, novelId, type = '', popupRef }) {
  return (
    <div
      ref={popupRef}
      className={`chapters ${type === 'mini' && 'absolute inset-0 mt-16'}`}
    >
      {type === 'maximum' && (
        <h3 className="mb-3 text-lg font-semibold">Danh sách chương</h3>
      )}
      <ul
        className={`${type === 'mini' ? 'h-52 w-[32rem] text-xs' : 'h-[36rem]'} grid grid-cols-3 items-center gap-x-6 gap-y-4 overflow-y-scroll rounded-md bg-gray-100 p-6 font-medium shadow-md`}
      >
        {chapters?.map(chapter => (
          <li key={chapter.Id}>
            <LinkButton
              to={`/reading/${novelId}/${chapter.Id}`}
              type="text"
              cate={type}
            >
              {chapter.Title.length > 42
                ? chapter.Title.slice(0, 42) + '...'
                : chapter.Title}
            </LinkButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Chapters;
