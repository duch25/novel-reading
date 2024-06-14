import { useNavigateItems } from '../context/NavigateItemContext';
import Option from './Option';

/* eslint-disable react/prop-types */
function Dropdown() {
  const { hoveredItem, genres, sources } = useNavigateItems();
  let options = genres;
  if (hoveredItem === 'source') options = sources;

  let className = `absolute flex flex-col flex-wrap gap-4 rounded-md border-t border-white bg-white px-3 py-4 text-sm text-gray-950`;

  let height = options.length * 32 + 32 + 1;
  height = `[${height}px]`;

  if (options.length > 5) {
    height = '52';
    className += ' pr-11';
  }

  className += ` h-${height}`;

  return (
    <ul className={className}>
      {options.map(option => (
        <Option option={option} key={option.Id} />
      ))}
    </ul>
  );
}

export default Dropdown;
