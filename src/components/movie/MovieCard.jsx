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
                className="w-full object-cover rounded-lg mb-5 object-right-top "
                src={tmdbAPI.image500(poster_path)} alt={title} />

            <div className="flex flex-col flex-1">
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <div className="flex items-center justify-between text-sm mb-5 opacity-80  text-lg flex-1">
                    <span>{new Date(release_date).getFullYear()}</span>
                    <span className='flex items-center gap-2'>
                        <span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="yellow" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-yellow-300">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                            </svg>
                        </span>
                        {vote_average}
                    </span>
                </div>
                <Button onClick={() => navigate(`/movies/movie-detail?id=${id}`)} bgColor='secondary'>Watch now</Button>
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