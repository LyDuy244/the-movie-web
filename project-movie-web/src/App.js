import { Fragment, Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import 'swiper/scss'
import Main from './components/layout/Main';

const Banner = lazy(() => import('./components/banner/Banner'))
const HomePage = lazy(() => import('./pages/HomePage'))
const MoviePage = lazy(() => import('./pages/MoviePage'))
const MovieDetailPage = lazy(() => import('./pages/MovieDetailPage'))

function App() {
  return (
    <Fragment>
      <Suspense fallback={<></>}>
        <Routes>
          <Route element={<Main></Main>}>
            <Route path='/' element={
              <>
                <Banner />
                <HomePage />
              </>
            }></Route>
            <Route path='/movies' element={<MoviePage></MoviePage>}></Route>
            <Route path='/movies/:movieId' element={<MovieDetailPage></MovieDetailPage>}></Route>
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
}

export default App;
