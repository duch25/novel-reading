import { useNavigateItems } from '../context/NavigateItemContext';
import DropdownGenres from './DropdownGenres';
import DropdownSources from './DropdownSources';

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
          {hoveredItem === 'genre' && <DropdownGenres />}
        </li>
        <li
          onMouseOver={() => handleHoveringNavItem('source')}
          onMouseLeave={handleLeaveNavItem}
          className="cursor-pointer text-lg font-medium hover:text-gray-400"
        >
          Nguồn truyện
          {hoveredItem === 'source' && <DropdownSources />}
        </li>
      </ul>
    </nav>
  );
}

export default MainNav;
