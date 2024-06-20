/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext, useEffect } from 'react';

import { getAllGenres } from '../services/apiGenres';
import { getAllSources, reorderSources } from '../services/apiNovels';

const NavigateItemsContext = createContext();

const initialState = {
  hoveredItem: '',
  curSources: [],
  genres: [],
  isLoading: false,
  isSourceChanged: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, loading: true };
    case 'hover':
      return { ...state, hoveredItem: action.payload };
    case 'leave':
      return { ...state, hoveredItem: '' };
    case 'genres/loaded':
      return { ...state, isLoading: false, genres: action.payload };
    case 'sources/loaded':
      return {
        ...state,
        isLoading: false,
        curSources: action.payload,
        isSourceChanged: false,
      };
    case 'sources/reorder':
      return { ...state, curSources: action.payload, isSourceChanged: true };
    default:
      throw new Error('Unknown action type');
  }
}

function NavigateItemsProvider({ children }) {
  const [
    { hoveredItem, curSources, genres, isLoading, isSourceChanged },
    dispatch,
  ] = useReducer(reducer, initialState);

  const handleHoveringNavItem = itemName => {
    dispatch({ type: 'hover', payload: itemName });
  };

  const handleLeaveNavItem = () => {
    dispatch({ type: 'leave' });
  };

  const handleReorderSources = newOrderSources => {
    dispatch({ type: 'sources/reorder', payload: newOrderSources });
  };

  useEffect(
    function () {
      async function fetchReorderSources() {
        let requestBody = [...curSources]?.map(source => source?.Id);
        requestBody = { sources: requestBody };

        const sources = await reorderSources(requestBody);
      }

      if (curSources.length === 0) return;

      fetchReorderSources();
    },
    [curSources],
  );

  useEffect(
    function () {
      async function fetchGenres() {
        dispatch({ type: 'loading' });

        const genres = await getAllGenres();

        dispatch({ type: 'genres/loaded', payload: genres });
      }

      if (isSourceChanged === false && genres.length > 0) return;

      fetchGenres();
    },
    [isSourceChanged],
  );

  useEffect(function () {
    async function fetchSources() {
      dispatch({ type: 'loading' });

      const sources = await getAllSources();

      dispatch({ type: 'sources/loaded', payload: sources });
    }

    fetchSources();
  }, []);

  return (
    <NavigateItemsContext.Provider
      value={{
        hoveredItem,
        curSources,
        handleHoveringNavItem,
        handleLeaveNavItem,
        handleReorderSources,
        genres,
        isLoading,
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
