import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { fetcher, tmdbAPI } from '../config';
import { SwiperSlide, Swiper } from 'swiper/react';
import MovieCard from '../components/movie/MovieCard';
//https://api.themoviedb.org/3/movie/{movie_id}
const MovieDetailPage = () => {
    const [param] = useSearchParams()
    const movieId = param.get('id')
    const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher)
    if (!data) return null
    const { backdrop_path, poster_path, title, genres, overview, original_title, release_date, spoken_languages, vote_average, runtime } = data
    console.log("🚀 ~ file: MovieDetailPage.jsx:13 ~ MovieDetailPage ~ runtime:", runtime)
    console.log("🚀 ~ file: MovieDetailPage.jsx:13 ~ MovieDetailPage ~ data:", data)

    const convertTime = (time) => {
        const hours = Math.floor(time / 60);
        const minute = time % 60;
        return `${hours}h ${minute}m`
    }

    return (
        <div className='py-10'>
            <div className="w-full relative mb-10">
                <div className='absolute inset-0 bg-black bg-opacity-75'></div>
                <div
                    className="w-full  bg-cover bg-no-repeat bg-top"
                    style={{ backgroundImage: ` url(${tmdbAPI.imageOriginal(backdrop_path)})`, paddingTop: '40%' }}>
                </div>
            </div>

            <div className="w-full max-w-[800px] bg-white bg-opacity-70 flex rounded-lg mx-auto overflow-hidden -mt-[300px] relative z-10">
                <div className='w-[250px]'>
                    <img src={tmdbAPI.image500(poster_path)} className='w-full h-full object-cover object-top' alt="" />
                </div>
                <div className='flex-1 p-5 text-black text-xl'>
                    <h1 className='text-center text-2xl font-bold mb-10'>{original_title}</h1>
                    <div className='mt-4'>
                        <span className='font-semibold'>Release date: </span>
                        <span className='text-gray-600'>{release_date}</span>
                    </div>
                    <div className='mt-4'>
                        <span className='font-semibold'>Genre: </span>
                        <span  className='text-gray-600'>{genres.map(item => item.name).join(", ")}</span>
                    </div>
                    <div className='mt-4'>
                        <span className='font-semibold'>Language: </span>
                        <span className='text-gray-600'>{spoken_languages[0].name}</span>
                    </div>
                    <div className='mt-4'>
                        <span className='font-semibold'>Running time: </span>
                        <span className='text-gray-600'>{convertTime(runtime)}</span>
                    </div>
                    <div className='mt-4'>
                        <span className='font-semibold'>Vote average: </span>
                        <span className='text-gray-600'>{vote_average}</span>
                    </div>
                </div>
            </div>

            <h1 className='text-center text-4xl  font-bold mb-10 mt-10'>{title}</h1>
            {genres.length > 0 && <div className="flex items-center justify-center gap-x-5 mb-10 ">
                {genres.map(item => (
                    <span className='py-2 px-4 border-primary text-primary border rounded-lg' key={item.id}>{item.name}</span>
                ))}
            </div>}

            <p className="text-sm leading-relaxed max-w-[600px] mx-auto text-justify mb-10">{overview}</p>

            <MovieMeta type='credits' />
            <MovieMeta type='videos' />
            <MovieMeta type='similar' />
        </div>
    );
};


function MovieMeta({ type = 'videos' }) {
    const [param] = useSearchParams()
    const movieId = param.get('id')
    const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher)
    if (!data) return null

    if (type === 'credits') {
        const { cast } = data
        if (!cast || cast.length <= 0) return null;
        return (
            <div className='py-10'>
                <h2 className='text-center text-3xl mb-10'>Casts</h2>
                <div className="grid grid-cols-4 gap-5">
                    {cast.slice(0, 4).map(item => (
                        <div className="cast-item" key={item.id}>
                            <img src={tmdbAPI.imageOriginal(item.profile_path)} className='w-full h-[350px] object-cover rounded-lg mb-3' alt="" />
                            <h3 className='text-xl font-medium text-center'>{item.name}</h3>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    else {
        const { results } = data
        if (!results && results.length <= 0) return null;
        if (type === 'videos') {
            return (
                <div className='py-10 '>
                    <div className="flex flex-col gap-10">
                        {results.slice(0, 3).map(item => (
                            <div key={item.id}>
                                <h3 className='mb-5 text-xl font-medium p-3 bg-secondary inline-block'>{item.name}</h3>
                                <div key={item.id} className='w-full aspect-video'>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${item.key}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        className="w-full h-full object-fill"
                                        allowFullScreen>
                                    </iframe>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        }
        if (type === 'similar') {
            return (
                <div className='py-10'>
                    <h2 className='text-3xl font-medium mb-10'>Similar movie</h2>

                    <div className="movie-list">
                        <Swiper grabCursor={true} spaceBetween={25} slidesPerView={'auto'}>
                            {results.map(item => (
                                <SwiperSlide key={item.id}>
                                    <MovieCard item={item}></MovieCard>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            )
        }
    }

};


export default MovieDetailPage;