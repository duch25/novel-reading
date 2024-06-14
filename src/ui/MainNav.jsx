import Dropdown from './Dropdown';
import { useNavigateItems } from '../context/NavigateItemContext';

function MainNav() {
  const { hoveredItem, handleHoveringNavItem, handleLeaveNavItem } =
    useNavigateItems();

  return (
    <nav className="flex items-center justify-between">
      <ul className="flex items-center gap-16">
        <li
          onMouseOver={() => handleHoveringNavItem('genre')}
          onMouseLeave={handleLeaveNavItem}
          className="cursor-pointer text-lg font-medium hover:text-gray-400"
        >
          Thể loại
          {hoveredItem === 'genre' && <Dropdown />}
        </li>
        <li
          onMouseOver={() => handleHoveringNavItem('source')}
          onMouseLeave={handleLeaveNavItem}
          className="cursor-pointer text-lg font-medium hover:text-gray-400"
        >
          Nguồn truyện
          {hoveredItem === 'source' && <Dropdown />}
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
