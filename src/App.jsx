import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import NovelDetails from './pages/NovelDetails';
import NovelReading from './pages/NovelReading';
import PageNotFound from './pages/PageNotFound';
import ReadingHistory from './pages/ReadingHistory';
import AppLayout from './ui/AppLayout';
import { NavigateItemsProvider } from './context/NavigateItemContext';
import SearchResults from './pages/SearchResults';

function App() {
  return (
    <>
      <NavigateItemsProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<Homepage />} />
              <Route path="novels" element={<Homepage />} />
              <Route path="novels/:id" element={<NovelDetails />} />
              <Route path="novels/search" element={<SearchResults />} />
              <Route path="reading/:id/:chapter" element={<NovelReading />} />
              <Route path="reading-history" element={<ReadingHistory />} />
            </Route>

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </NavigateItemsProvider>
    </>
  );
}

export default App;
