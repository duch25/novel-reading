/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react';

const genres = [
  {
    Id: 'tien-hiep',
    Name: 'Tiên Hiệp',
  },
  {
    Id: 'huyen-huyen',
    Name: 'Huyền Huyễn',
  },
  {
    Id: 'do-thi',
    Name: 'Đô Thị',
  },
  {
    Id: 'khoa-huyen',
    Name: 'Khoa Huyễn',
  },
  {
    Id: 'ky-huyen',
    Name: 'Kỳ Huyễn',
  },
  {
    Id: 'vo-hiep',
    Name: 'Võ Hiệp',
  },
  {
    Id: 'lich-su',
    Name: 'Lịch Sử',
  },
  {
    Id: 'dong-nhan',
    Name: 'Đồng Nhân',
  },
  {
    Id: 'quan-su',
    Name: 'Quân Sự',
  },
  {
    Id: 'du-hi',
    Name: 'Du Hí',
  },
  {
    Id: 'canh-ky',
    Name: 'Cạnh Kỹ',
  },
  {
    Id: 'linh-di',
    Name: 'Linh Dị',
  },
];

const sources = [
  {
    Id: 'truyen.tangthuvien.vn',
  },
  {
    Id: 'truyenfull.vn',
  },
  {
    Id: 'dtruyen.com',
  },
];

const NavigateItemsContext = createContext();

const initialState = {
  hoveredItem: '',
  selectedSource: 'truyenfull.vn',
};

function reducer(state, action) {
  switch (action.type) {
    case 'hover':
      return { ...state, hoveredItem: action.payload };
    case 'leave':
      return { ...state, hoveredItem: '' };
    default:
      throw new Error('Unknown action type');
  }
}

function NavigateItemsProvider({ children }) {
  const [{ hoveredItem, selectedSource }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  const handleHoveringNavItem = itemName => {
    dispatch({ type: 'hover', payload: itemName });
  };

  const handleLeaveNavItem = () => {
    dispatch({ type: 'leave' });
  };

  const handleSelectSource = source => {
    dispatch({ type: 'selectSource', payload: source });
  };

  // useEffect(function () {
  //   async function getGenres() {}
  // }, []);

  return (
    <NavigateItemsContext.Provider
      value={{
        hoveredItem,
        selectedSource,
        handleHoveringNavItem,
        handleLeaveNavItem,
        handleSelectSource,
        sources,
        genres,
      }}
    >
      {children}
    </NavigateItemsContext.Provider>
  );
}

function useNavigateItems() {
  const context = useContext(NavigateItemsContext);
  if (context === undefined)
    throw new Error(
      'NavigateItemsContext was used outside the NavigateItemsProvider',
    );
  return context;
}

export { NavigateItemsProvider, useNavigateItems };
