import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../config';
import MovieCard from '../components/movie/MovieCard';
import useDebounce from '../hooks/useDebounce';
import ReactPaginate from 'react-paginate';
import MovieCardSkeleton from '../components/Loading/MovieCardSkeleton';
import { v4 } from 'uuid';


const itemsPerPage = 20
const MoviePage = () => {
    // https://api.themoviedb.org/3/search/movie
    const [nextPage, setNextPage] = useState(1);
    const [filter, setFilter] = useState('');
    const [url, setUrl] = useState(tmdbAPI.getMovieList('popular', nextPage));
    const filterDebounce = useDebounce(filter, 1000);

    const handleSearchFilterChange = (e) => {
        setFilter(e.target.value)
    }

    // const [movies, setMovies] = useState([]);
    // useEffect(() => {
    //     if (data && data.results)
    //         setMovies(data.results)
    // }, [data])
    const { data, isLoading } = useSWR(url, fetcher)
    useEffect(() => {
        if (filterDebounce)
            setUrl(tmdbAPI.getMovieSearch(filterDebounce, nextPage))
        else
            setUrl(tmdbAPI.getMovieList('popular', nextPage))
    }, [filterDebounce, nextPage])


    const movies = data?.results || []
 
    if (!data || !data.total_pages) return;
    const pageCount = Math.ceil(data.total_pages / itemsPerPage);

    const handlePageClick = (event) => {
        setNextPage(event.selected + 1)
    };



    return (
        <div className='py-10 page-containers'>
            <div className="flex  mb-10">
                <div className="flex-1">
                    <input type="text" placeholder='Type here to search...'
                        value={filter}
                        className="w-full p-4 bg-slate-800 outline-none text-white"
                        onChange={(e) => handleSearchFilterChange(e)}
                    />
                </div>
                <button className='p-4 bg-primary text-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </div>
           

            {
                isLoading && (
                    <div className="grid grid-cols-4 gap-10">
                        {
                            new Array(itemsPerPage).fill(0).map((item, index) => (
                                <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
                            ))
                        }                        
                    </div>
                )
            }

            <div className="grid grid-cols-4 gap-10">
                {!isLoading && movies.length > 0 && movies.map(item => (
                    <MovieCard item={item} key={item.id}></MovieCard>
                ))}
            </div>

            <div className="mt-10">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    className='pagination'
                    forcePage={nextPage - 1}
                />
            </div>

        </div>
    );
};

export default MoviePage;