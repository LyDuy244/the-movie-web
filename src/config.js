export const fetcher = (...args) => fetch(...args).then(res => res.json())
const tmdpEndpoint = `https://api.themoviedb.org/3/movie`
const tmdpGenreEndpoint = `https://api.themoviedb.org/3/genre/movie/list`
const tmdpEndpointSearch = `https://api.themoviedb.org/3/search/movie`
export const API_KEY = '5b57c96d155886c38c67a9b5bff3e0f6'
export const tmdbAPI = {
    
    getMovieList(type, page=1){
        return `${tmdpEndpoint}/${type}?api_key=${API_KEY}&page=${page}`
    },

    getGenresList(){
        return `${tmdpGenreEndpoint}?api_key=${API_KEY}`
    },

    getMovieSearch(query, page){
        return `${tmdpEndpointSearch}?api_key=${API_KEY}&query=${query}&page=${page}`
    },

    getMovieDetails(movieId){
        return `${tmdpEndpoint}/${movieId}?api_key=${API_KEY}`
    },
    
    getMovieMeta(movieId, type){
        return `${tmdpEndpoint}/${movieId}/${type}?api_key=${API_KEY}`
    },

    imageOriginal(url){
        return `https://image.tmdb.org/t/p/original/${url}`
    },

    image500(url){
        return `https://image.tmdb.org/t/p/w500/${url}`
    }
}