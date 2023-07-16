import { useState, useEffect } from 'react';

import useHttp from '../../hooks/use-http';
import { useHorizontalScroll } from '../../hooks/use-scroll';
import classes from './Movie.module.css';

const Movie = props => {
  // set trang thai data, clickedMovie, isClickMovie
  const [data, setData] = useState([]); //data ban dau la mot mang rong
  const [clickedMovie, setClickedMovie] = useState('');
  const [isClickMovie, setIsClickMovie] = useState(false);
  //Lay du lieu tu API dung custom Hook
  const { error, sendRequest: fetchMovie } = useHttp();
  useEffect(() => {
    const getMovie = data => {
      setData(data.results);
    };
    fetchMovie({ url: props.path }, getMovie);
  }, []);
  // Tao ham bat su kien click vao movie
  const onClickMovieHandler = event => {
    const index = data.findIndex(e => e.id === +event.target.id); //+ chuyen string thanh number
    if (+event.target.id === clickedMovie.id && isClickMovie) {
      props.onClicked('', false);
      setIsClickMovie(false);
    } else {
      window.scroll(0, event.pageY - 300);
      props.onClicked(data[index], true);
      setClickedMovie(data[index]);
      setIsClickMovie(true);
    }
  };
  //Cuon ngang khi lan chuot
  const scrollRef = useHorizontalScroll();
  return (
    <div className={classes.movie} ref={scrollRef}>
      {data.map(movie => (
        <img
          onClick={onClickMovieHandler}
          key={movie.id}
          id={movie.id}
          // Cac phim thuoc danh muc Original thi dc hien thi duoi dang Poster
          //anh doc poster_path, anh ngang backdrop_path
          src={`${
            props.showType === 'poster'
              ? movie.poster_path
                ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
                : movie.backdrop_path
                ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
                : ''
              : movie.backdrop_path
              ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
              : movie.poster_path
              ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
              : ''
          }`}
          alt=""
          className={
            props.showType === 'poster'
              ? classes.imgposter
              : classes.imgbackdrop
          }
        ></img>
      ))}
    </div>
  );
};

export default Movie;
