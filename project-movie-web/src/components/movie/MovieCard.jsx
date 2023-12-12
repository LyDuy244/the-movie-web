import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { tmdbAPI } from '../../config';
import PropTypes from 'prop-types';

function MovieCard({ item }) {
    const {
        title,
        poster_path,
        vote_average,
        release_date,
        id
    } = item

    const navigate = useNavigate()

    return (
        <div className="movie-card flex flex-col rounded-lg bg-slate-800 p-3 text-white h-full select-none">
            <img
                className="w-full h-[250px] object-cover rounded-lg mb-5 object-right-top "
                src={tmdbAPI.image500(poster_path)} alt="" />

            <div className="flex flex-col flex-1">

                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span>{vote_average}</span>
                </div>
                <Button onClick={() => navigate(`/movies/${id}`)} bgColor='secondary'>Watch now</Button>
            </div>
        </div>
    );
}

MovieCard.propTypes = {
    item: PropTypes.shape({
        title: PropTypes.string,
        poster_path: PropTypes.string,
        vote_average: PropTypes.number,
        release_date: PropTypes.string,
        id: PropTypes.number
    }),
};

export default MovieCard;