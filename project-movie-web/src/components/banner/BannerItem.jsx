import React from 'react';
import Button from '../button/Button';
import { useNavigate } from 'react-router-dom';

const BannerItem = ({ item }) => {
    const {
        poster_path,
        title,
        id,
    } = item

    const navigate = useNavigate();
    return (
        <div className="w-full h-full relative">
            <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,.5)] to-[rgba(0,0,0,.5)] rounded-lg"></div>
            <img
                className="w-full h-full object-cover rounded-lg object-top"
                src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt="" />
            <div className="absolute left-5 bottom-5 w-full text-white">
                <h2 className="font-bold text-3xl mb-5">{title}</h2>

                
                <div className="flex items-center gap-x-3 mb-8">
                    <span className="px-4 py-2 border border-white rounded-md ">Adventure</span>
                    <span className="px-4 py-2 border border-white rounded-md ">Adventure</span>
                    <span className="px-4 py-2 border border-white rounded-md ">Adventure</span>
                </div>
                <Button onClick={() => navigate(`/movies/${id}`)} bgColor='primary' >Watch now</Button>
            </div>
        </div>
    );
};

export default BannerItem;