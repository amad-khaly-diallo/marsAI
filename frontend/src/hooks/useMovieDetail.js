import { useState, useEffect } from 'react';
import { getMovieFullById } from '../services/api';

export function useMovieDetail(id) {
  const [movie, setMovie] = useState(null);
  const [assets, setAssets] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [tags, setTags] = useState([]);
  const [aiDeclaration, setAiDeclaration] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getMovieFullById(id);
        setMovie(data.movie);
        setAssets(Array.isArray(data.assets) ? data.assets : []);
        setCollaborators(
          Array.isArray(data.collaborators) ? data.collaborators : [],
        );
        setTags(Array.isArray(data.tags) ? data.tags : []);
        setAiDeclaration(data.ai_declaration || null);
      } catch (error) {
        console.error('Erreur chargement film:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return { movie, assets, collaborators, tags, aiDeclaration, loading };
}
