import { Link } from 'react-router-dom';
import { useNavigateItems } from '../context/NavigateItemContext';

/* eslint-disable react/prop-types */
function Option({ option }) {
  const { hoveredItem } = useNavigateItems();

  if (hoveredItem === 'genre')
    return (
      <Link to={`novels?genre=${option.Id}`}>
        <li className="hover:text-rose-600" key={option}>
          {option.Name ? option.Name : option.Id}
        </li>
      </Link>
    );

  return (
    <li className="hover:text-rose-600" key={option}>
      {option.Name ? option.Name : option.Id}
    </li>
  );
}

export default Option;
