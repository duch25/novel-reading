import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Homepage from './pages/Homepage';
import NovelDetails from './pages/NovelDetails';
import NovelReading from './pages/NovelReading';
import PageNotFound from './pages/PageNotFound';
import NovelsByGenre from './pages/NovelsByGenre';
import ReadingHistory from './pages/ReadingHistory';
import AppLayout from './ui/AppLayout';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Homepage />} />
            <Route path="genres/:id" element={<NovelsByGenre />} />
            <Route path="novels/:id" element={<NovelDetails />} />
            <Route path="reading/:id" element={<NovelReading />} />
            <Route path="reading-history" element={<ReadingHistory />} />
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
