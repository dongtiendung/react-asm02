import { useState, useEffect } from 'react';
import useHttp from '../../hooks/use-http';
import classes from './MovieDetail.module.css';

const MovieDetail = props => {
  const API_KEY = '0903b7f1a10ef955b51f967e6fd6c6cb';
  let image = (
    <img
      src={`${
        props.movie.backdrop_path
          ? `https://image.tmdb.org/t/p/original${props.movie.backdrop_path}`
          : props.movie.poster_path
          ? `https://image.tmdb.org/t/p/original${props.movie.poster_path}`
          : ''
      }`}
      alt=""
    ></img>
  );
  const [data, setData] = useState([]);
  const [trailer, setTrailer] = useState(image);
  const request = `/movie/${props.movie.id}/videos?api_key=${API_KEY}`;

  // Lấy dữ liệu
  const { error, sendRequest: fetchMovie } = useHttp();
  useEffect(() => {
    const getMovie = movie => {
      setData(movie.results);
    };
    fetchMovie({ url: request }, getMovie);
  }, [request]);

  // Kiểm tra có video trailer không
  // Nếu không có trailer thì hiển thị ảnh
  useEffect(() => {
    let temp;

    if (data.length !== 0) {
      for (const e of data) {
        if (
          e.site === 'YouTube' &&
          (e.type === 'Teaser' || e.type === 'Trailer')
        )
          temp = (
            <iframe
              title="Youtube"
              width="48%"
              height="400"
              src={`https://www.youtube.com/embed/${e.key}`}
            />
          );
      }
    }
    if (!error && temp) setTrailer(temp);
    else setTrailer(image);
  }, [error, data]);

  return (
    <div className={classes.moviedetail}>
      {' '}
      <div>
        <h1>{props.movie.name || props.movie.title}</h1>
        <div>
          <p>
            <strong>
              Release Date :
              {props.movie.release_date || props.movie.first_air_date}
            </strong>{' '}
            <svg
              className="svg-inline--fa fa-times fa-w-11"
              fill="#ccc"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="cancel"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 352 512"
              onClick={props.hidden}
            >
              <path d="M213.9 256l131.6-131.6c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L192 199.1 60.4 67.5c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9L138.1 256 6.3 387.6c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0L192 312.9l131.6 131.6c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L213.9 256z"></path>{' '}
            </svg>
          </p>
          <p>
            <strong>Vote: {props.movie.vote_average}/10</strong>
          </p>
        </div>
        <p>{props.movie.overview}</p>
      </div>
      {trailer}
    </div>
  );
};
export default MovieDetail;
