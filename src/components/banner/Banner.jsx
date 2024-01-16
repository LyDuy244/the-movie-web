import React from 'react';
import useSWR from 'swr';
import { fetcher } from '../../config';
import { Swiper, SwiperSlide } from 'swiper/react';
import BannerItem from './BannerItem';

const Banner = () => {
    const { data } = useSWR(`https://api.themoviedb.org/3/movie/upcoming?api_key=5b57c96d155886c38c67a9b5bff3e0f6`, fetcher)

    const movies = data?.results || []

    return (
        <section className="banner mb-20 overflow-hidden rounded-lg">
            <Swiper grabCursor={true} slidesPerView={'auto'}>
                {movies.length > 0 && movies.slice(0,5).map(item => (
                    <SwiperSlide key={item.id}>
                        <BannerItem item={item}></BannerItem>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Banner;