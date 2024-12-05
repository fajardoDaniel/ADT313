import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cast.css';

function Cast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const TMDB_ACCESS_TOKEN = process.env.REACT_APP_TMDB_ACCESS_TOKEN;
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

  useEffect(() => {
    const fetchCast = async () => {
      if (!movieId) return;

      try {
        setLoading(true);
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${movieId}/credits`, 
          {
            headers: {
              'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Process and limit cast to top 10 actors
        const processedCast = response.data.cast
          .slice(0, 10)
          .map(actor => ({
            id: actor.id,
            name: actor.name,
            character: actor.character,
            profilePath: actor.profile_path 
              ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
              : 'https://via.placeholder.com/200x300.png?text=No+Image'
          }));

        setCast(processedCast);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch cast information');
        setLoading(false);
        console.error('Cast fetch error:', err);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <div>Loading cast...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="cast-container">
      <h2>Cast</h2>
      <div className="cast-grid">
        {cast.map(actor => (
          <div key={actor.id} className="cast-member">
            <img 
              src={actor.profilePath} 
              alt={actor.name} 
              className="cast-image"
            />
            <div className="cast-info">
              <p className="actor-name">{actor.name}</p>
              <p className="character-name">{actor.character}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cast;