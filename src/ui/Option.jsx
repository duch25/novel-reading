import { Link } from 'react-router-dom';
import { useNavigateItems } from '../context/NavigateItemContext';

/* eslint-disable react/prop-types */
function Option({ option }) {
  const { hoveredItem, curSources } = useNavigateItems();

  if (hoveredItem === 'genre')
    return (
      <Link
        to={`novels/search?genre=${option.Id}&name=${option?.Name ? option?.Name : option?.Id}&source=${curSources[0].Id}`}
      >
        <li className="hover:text-rose-600" key={option}>
          {option?.Name ? option?.Name : option?.Id}
        </li>
      </Link>
    );

  return (
    <li className="hover:text-rose-600" key={option}>
      {option?.Name ? option?.Name : option?.Id}
    </li>
  );
}

export default Option;
