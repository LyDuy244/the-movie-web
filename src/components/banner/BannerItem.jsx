import React, { useEffect, useState } from 'react';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';
import { tmdbAPI } from '../../config';
import axios from 'axios';

const BannerItem = ({ item }) => {
    const {
        backdrop_path,
        title,
        genre_ids,
        id,
    } = item

    const [genreList, setGenreList] = useState([]);
    const [genreResult, setGenreResult] = useState([]);

    useEffect(() => {
        (async () => {
            const response = await axios.get(tmdbAPI.getGenresList())
            const data = response.data
            const { genres } = data
            setGenreList(genres)
        })()
    }, [])
    useEffect(() => {
        if (!!genreList && !!genre_ids) {
            const result = []
            genreList.forEach(element => {
                if (genre_ids.includes(element.id)) {
                    result.push({
                        id: element.id,
                        name: element.name
                    })
                }
            });
            setGenreResult(result)
        }
    }, [genreList, genre_ids])

  

    const navigate = useNavigate();

    return (
        <div className="w-full h-full relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,.5)] to-[rgba(0,0,0,.5)] rounded-lg"></div>
            
            <div className='bg-cover bg-top bg-no-repeat' style={{backgroundImage: `url(${tmdbAPI.image500(backdrop_path)})`, paddingTop: "40%"}}></div>
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">{title}</h2>

                <div className="flex items-center gap-x-3 mb-8">
                    {
                        genreResult.length > 0 &&
                        genreResult.map((item) => (
                            <span key={item.id} className="px-4 py-2 border border-white rounded-md ">{item.name}</span>

                        ))
                    }
                </div>
                <Button onClick={() => navigate(`/movies/${id}`)} bgColor='primary' >Watch now</Button>
            </div>
        </div>
    );
};

export default BannerItem;