import React from 'react';
import LoadingSkeleton from './LoadingSkeleton';

const MovieCardSkeleton = () => {
    return (
        <div className="movie-card flex flex-col rounded-lg bg-slate-800 p-3 text-white h-full select-none">
            <LoadingSkeleton width='100%' height='250px' radius='8px' className='mb-5'></LoadingSkeleton>

            <div className="flex flex-col flex-1">
                <LoadingSkeleton  width='100%' height='20px' className='mb-3'></LoadingSkeleton>
                <div className="flex items-center justify-between text-sm opacity-50 mb-10">
                    <span><LoadingSkeleton  width='50px' height='10px'></LoadingSkeleton></span>
                    <span><LoadingSkeleton  width='30px' height='10px'></LoadingSkeleton></span>
                </div>

                <LoadingSkeleton height='40px' radius='8px'></LoadingSkeleton>
            </div>
        </div>
    );
};

export default MovieCardSkeleton;