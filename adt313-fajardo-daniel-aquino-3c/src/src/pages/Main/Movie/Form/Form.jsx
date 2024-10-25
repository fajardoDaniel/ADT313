// import axios from 'axios';
// import { useCallback, useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import './Form.css';
// const Form = () => {
//   const [query, setQuery] = useState('');
//   const [searchedMovieList, setSearchedMovieList] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(undefined);
//   const [movie, setMovie] = useState(undefined);
//   let { movieId } = useParams();

//   const handleSearch = useCallback(() => {
//     axios({
//       method: 'get',
//       url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
//       headers: {
//         Accept: 'application/json',
//         Authorization:
//           'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
//       },
//     }).then((response) => {
//       setSearchedMovieList(response.data.results);
//       console.log(response.data.results);
//     });
//   }, [query]);

//   const handleSelectMovie = (movie) => {
//     setSelectedMovie(movie);
//   };

//   const handleSave = () => {
//     const accessToken = localStorage.getItem('accessToken');
//     console.log(accessToken);
//     if (selectedMovie === undefined) {
//       //add validation
//       alert('Please search and select a movie.');
//     } else {
//       const data = {
//         tmdbId: selectedMovie.id,
//         title: selectedMovie.title,
//         overview: selectedMovie.overview,
//         popularity: selectedMovie.popularity,
//         releaseDate: selectedMovie.release_date,
//         voteAverage: selectedMovie.vote_average,
//         backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
//         posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
//         isFeatured: 0,
//       };

//       const request = axios({
//         method: 'post',
//         url: '/movies',
//         data: data,
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       })
//         .then((saveResponse) => {
//           console.log(saveResponse);
//           alert('Success');
//         })
//         .catch((error) => console.log(error));
//     }
//   };

//   //create a form change/validation
//   //create a new handler for update
//   useEffect(() => {
//     if (movieId) {
//       axios.get(`/movies/${movieId}`).then((response) => {
//         setMovie(response.data);
//         const tempData = {
//           id: response.data.tmdbId,
//           original_title: response.data.title,
//           overview: response.data.overview,
//           popularity: response.data.popularity,
//           poster_path: response.data.posterPath,
//           release_date: response.data.releaseDate,
//           vote_average: response.data.voteAverage,
//         };
//         setSelectedMovie(tempData);
//         console.log(response.data);
//       });
//     }
//   }, []);

//   return (
//     <>
//       <h1>{movieId !== undefined ? 'Edit ' : 'Create '} Movie</h1>

//       {movieId === undefined && (
//         <>
//           <div className='search-container'>
//             Search Movie:{' '}
//             <input
//               type='text'
//               onChange={(event) => setQuery(event.target.value)}
//             />
//             <button type='button' onClick={handleSearch}>
//               Search
//             </button>
//             <div className='searched-movie'>
//               {searchedMovieList.map((movie) => (
//                 <p onClick={() => handleSelectMovie(movie)}>
//                   {movie.original_title}
//                 </p>
//               ))}
//             </div>
//           </div>
//           <hr />
//         </>
//       )}

//       <div className='container'>
//         <form>
//           {selectedMovie ? (
//             <img
//               className='poster-image'
//               src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
//             />
//           ) : (
//             ''
//           )}
//           <div className='field'>
//             Title:
//             <input
//               type='text'
//               value={selectedMovie ? selectedMovie.original_title : ''}
//             />
//           </div>
//           <div className='field'>
//             Overview:
//             <textarea
//               rows={10}
//               value={selectedMovie ? selectedMovie.overview : ''}
//             />
//           </div>

//           <div className='field'>
//             Popularity:
//             <input
//               type='text'
//               value={selectedMovie ? selectedMovie.popularity : ''}
//             />
//           </div>

//           <div className='field'>
//             Release Date:
//             <input
//               type='text'
//               value={selectedMovie ? selectedMovie.release_date : ''}
//             />
//           </div>

//           <div className='field'>
//             Vote Average:
//             <input
//               type='text'
//               value={selectedMovie ? selectedMovie.vote_average : ''}
//             />
//           </div>

//           <button type='button' onClick={handleSave}>
//             Save
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Form;








// import axios from 'axios';
// import { useCallback, useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './Form.css';

// const Form = () => {
//   const [query, setQuery] = useState('');
//   const [searchedMovieList, setSearchedMovieList] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(undefined);
//   const [movie, setMovie] = useState(undefined);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [formData, setFormData] = useState({
//     title: '',
//     overview: '',
//     popularity: '',
//     releaseDate: '',
//     voteAverage: '',
//   });
//   const [error, setError] = useState('');
  
//   let { movieId } = useParams();
//   const navigate = useNavigate();

//   const handleSearch = useCallback(async (page = 1) => {
//     try {
//       const response = await axios({
//         method: 'get',
//         url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
//         headers: {
//           Accept: 'application/json',
//           Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
//         },
//       });
//       setSearchedMovieList(response.data.results);
//       setTotalPages(response.data.total_pages);
//       setCurrentPage(page);
//       setError('');
//     } catch (error) {
//       console.error('Error searching movies:', error);
//       setError('Failed to search movies. Please try again.');
//     }
//   }, [query]);

//   const handleSelectMovie = (movie) => {
//     setSelectedMovie(movie);
//     setFormData({
//       title: movie.original_title,
//       overview: movie.overview,
//       popularity: movie.popularity,
//       releaseDate: movie.release_date,
//       voteAverage: movie.vote_average,
//     });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       const accessToken = localStorage.getItem('accessToken');
//       if (!selectedMovie) {
//         setError('Please search and select a movie.');
//         return;
//       }

//       const data = {
//         tmdbId: selectedMovie.id,
//         title: formData.title,
//         overview: formData.overview,
//         popularity: parseFloat(formData.popularity),
//         releaseDate: formData.releaseDate,
//         voteAverage: parseFloat(formData.voteAverage),
//         backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
//         posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
//         isFeatured: 0,
//       };

//       const url = movieId ? `/movies/${movieId}` : '/movies';
//       const method = movieId ? 'put' : 'post';

//       await axios({
//         method,
//         url,
//         data,
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       });

//       alert('Movie saved successfully');
//       navigate('/main/movies');
//     } catch (error) {
//       console.error('Error saving movie:', error);
//       setError('Failed to save movie. Please try again.');
//     }
//   };

//   useEffect(() => {
//     if (movieId) {
//       const fetchMovie = async () => {
//         try {
//           const response = await axios.get(`/movies/${movieId}`);
//           setMovie(response.data);
//           const tempData = {
//             id: response.data.tmdbId,
//             original_title: response.data.title,
//             overview: response.data.overview,
//             popularity: response.data.popularity,
//             poster_path: response.data.posterPath,
//             release_date: response.data.releaseDate,
//             vote_average: response.data.voteAverage,
//           };
//           setSelectedMovie(tempData);
//           setFormData({
//             title: response.data.title,
//             overview: response.data.overview,
//             popularity: response.data.popularity,
//             releaseDate: response.data.releaseDate,
//             voteAverage: response.data.voteAverage,
//           });
//         } catch (error) {
//           console.error('Error fetching movie:', error);
//           setError('Failed to fetch movie details. Please try again.');
//         }
//       };
//       fetchMovie();
//     }
//   }, [movieId]);

//   return (
//     <>
//       <h1>{movieId !== undefined ? 'Edit' : 'Create'} Movie</h1>
//       {error && <div className="error">{error}</div>}

//       {movieId === undefined && (
//         <>
//           <div className='search-container'>
//             Search Movie:{' '}
//             <input
//               type='text'
//               onChange={(event) => setQuery(event.target.value)}
//             />
//             <button type='button' onClick={() => handleSearch(1)}>
//               Search
//             </button>
//             <div className='searched-movie'>
//               {searchedMovieList.map((movie) => (
//                 <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
//                   {movie.original_title}
//                 </p>
//               ))}
//             </div>
//             {totalPages > 1 && (
//               <div className='pagination'>
//                 {currentPage > 1 && (
//                   <button onClick={() => handleSearch(currentPage - 1)}>Previous</button>
//                 )}
//                 <span>Page {currentPage} of {totalPages}</span>
//                 {currentPage < totalPages && (
//                   <button onClick={() => handleSearch(currentPage + 1)}>Next</button>
//                 )}
//               </div>
//             )}
//           </div>
//           <hr />
//         </>
//       )}

//       <div className='container'>
//         <form onSubmit={(e) => e.preventDefault()}>
//           {selectedMovie && (
//             <img
//               className='poster-image'
//               src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
//               alt={formData.title}
//             />
//           )}
//           <div className='field'>
//             Title:
//             <input
//               type='text'
//               name="title"
//               value={formData.title}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className='field'>
//             Overview:
//             <textarea
//               rows={10}
//               name="overview"
//               value={formData.overview}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className='field'>
//             Popularity:
//             <input
//               type='number'
//               name="popularity"
//               value={formData.popularity}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className='field'>
//             Release Date:
//             <input
//               type='date'
//               name="releaseDate"
//               value={formData.releaseDate}
//               onChange={handleInputChange}
//             />
//           </div>
//           <div className='field'>
//             Vote Average:
//             <input
//               type='number'
//               name="voteAverage"
//               value={formData.voteAverage}
//               onChange={handleInputChange}
//             />
//           </div>
//           <button type='button' onClick={handleSave}>
//             Save
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Form;














import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Form.css';

const Form = () => {
  const [query, setQuery] = useState('');
  const [searchedMovieList, setSearchedMovieList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(undefined);
  const [movie, setMovie] = useState(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    overview: '',
    popularity: '',
    releaseDate: '',
    voteAverage: '',
  });
  const [error, setError] = useState('');
  
  let { movieId } = useParams();
  const navigate = useNavigate();

  const handleSearch = useCallback(async (page = 1) => {
    try {
      const response = await axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YTdiNmUyNGJkNWRkNjhiNmE1ZWFjZjgyNWY3NGY5ZCIsIm5iZiI6MTcyOTI5NzI5Ny4wNzMzNTEsInN1YiI6IjY2MzhlZGM0MmZhZjRkMDEzMGM2NzM3NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZIX4EF2yAKl6NwhcmhZucxSQi1rJDZiGG80tDd6_9XI',
        },
      });
      setSearchedMovieList(response.data.results);
      setTotalPages(response.data.total_pages);
      setCurrentPage(page);
      setError('');
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Failed to search movies. Please try again.');
    }
  }, [query]);

  const handleSelectMovie = (movie) => {
    setSelectedMovie(movie);
    setFormData({
      title: movie.original_title,
      overview: movie.overview,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
      voteAverage: movie.vote_average,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!selectedMovie) {
        setError('Please search and select a movie.');
        return;
      }

      const data = {
        tmdbId: selectedMovie.id,
        title: formData.title,
        overview: formData.overview,
        popularity: parseFloat(formData.popularity),
        releaseDate: formData.releaseDate,
        voteAverage: parseFloat(formData.voteAverage),
        backdropPath: `https://image.tmdb.org/t/p/original/${selectedMovie.backdrop_path}`,
        posterPath: `https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`,
        isFeatured: 0,
      };

      const url = movieId ? `/movies/${movieId}` : '/movies';
      const method = movieId ? 'put' : 'post';

      await axios({
        method,
        url,
        data,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      alert('Movie saved successfully');
      navigate('/main/movies');
    } catch (error) {
      console.error('Error saving movie:', error);
      setError('Failed to save movie. Please try again.');
    }
  };

  useEffect(() => {
    if (movieId) {
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`/movies/${movieId}`);
          setMovie(response.data);
          const tempData = {
            id: response.data.tmdbId,
            original_title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            poster_path: response.data.posterPath,
            release_date: response.data.releaseDate,
            vote_average: response.data.voteAverage,
          };
          setSelectedMovie(tempData);
          setFormData({
            title: response.data.title,
            overview: response.data.overview,
            popularity: response.data.popularity,
            releaseDate: response.data.releaseDate,
            voteAverage: response.data.voteAverage,
          });
        } catch (error) {
          console.error('Error fetching movie:', error);
          setError('Failed to fetch movie details. Please try again.');
        }
      };
      fetchMovie();
    }
  }, [movieId]);

  return (
    <>
      <h1>{movieId !== undefined ? 'Edit' : 'Create'} Movie</h1>
      {error && <div className="error">{error}</div>}

      {movieId === undefined && (
        <>
          <div className='search-container'>
            Search Movie:{' '}
            <input
              type='text'
              onChange={(event) => setQuery(event.target.value)}
            />
            <button type='button' onClick={() => handleSearch(1)}>
              Search
            </button>
            <div className='searched-movie-list'>
              {searchedMovieList.map((movie) => (
                <p key={movie.id} onClick={() => handleSelectMovie(movie)}>
                  {movie.original_title}
                </p>
              ))}
            </div>
            {totalPages > 1 && (
              <div className='pagination'>
                {currentPage > 1 && (
                  <button onClick={() => handleSearch(currentPage - 1)}>Previous</button>
                )}
                <span>Page {currentPage} of {totalPages}</span>
                {currentPage < totalPages && (
                  <button onClick={() => handleSearch(currentPage + 1)}>Next</button>
                )}
              </div>
            )}
          </div>
          <hr />
        </>
      )}

      <div className='container'>
        <form onSubmit={(e) => e.preventDefault()}>
          {selectedMovie && (
            <img
              className='poster-image'
              src={`https://image.tmdb.org/t/p/original/${selectedMovie.poster_path}`}
              alt={formData.title}
            />
          )}
          <div className='field'>
            Title:
            <input
              type='text'
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </div>
          <div className='field'>
            Overview:
            <textarea
              rows={10}
              name="overview"
              value={formData.overview}
              onChange={handleInputChange}
            />
          </div>
          <div className='field'>
            Popularity:
            <input
              type='number'
              name="popularity"
              value={formData.popularity}
              onChange={handleInputChange}
            />
          </div>
          <div className='field'>
            Release Date:
            <input
              type='date'
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleInputChange}
            />
          </div>
          <div className='field'>
            Vote Average:
            <input
              type='number'
              name="voteAverage"
              value={formData.voteAverage}
              onChange={handleInputChange}
            />
          </div>
          <button type='button' onClick={handleSave}>
            Save
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;