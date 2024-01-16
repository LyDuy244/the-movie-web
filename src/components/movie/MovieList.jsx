import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './MovieCard';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../../config';
import PropTypes from 'prop-types';
import MovieCardSkeleton from '../Loading/MovieCardSkeleton';

const MovieList = ({ type = 'now_playing' }) => {
    const { data, isLoading } = useSWR(tmdbAPI.getMovieList(type), fetcher)

    const movies = data?.results || []

    return (
        <div className="movie-list">
            {isLoading &&
                <Swiper grabCursor={true} spaceBetween={25} slidesPerView={'auto'}>
                    <SwiperSlide >
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide >
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide >
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                    <SwiperSlide >
                        <MovieCardSkeleton></MovieCardSkeleton>
                    </SwiperSlide>
                </Swiper>
            }

            {!isLoading &&
                <Swiper grabCursor={true} spaceBetween={25} slidesPerView={'auto'}>

                    {movies.length > 0 && movies.map(item => (
                        <SwiperSlide key={item.id}>
                            <MovieCard item={item}></MovieCard>
                        </SwiperSlide>
                    ))}

                </Swiper>
            }
        </div>
    );
};

MovieList.propTypes = {
    type: PropTypes.string.isRequired,
};


export default MovieList;