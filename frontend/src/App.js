import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHealth = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/health');
        if (!response.ok) {
          throw new Error('Erreur lors de l’appel à l’API');
        }
        const data = await response.json();
        setApiStatus(data);
      } catch (err) {
        setError(err.message || 'Impossible de joindre le backend');
      } finally {
        setLoading(false);
      }
    };

    fetchHealth();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>MarsAI</h1>
        <p>Stack initialisée : backend Express + frontend React (sans TypeScript).</p>

        {loading && <p>Vérification du backend...</p>}

        {!loading && error && (
          <p style={{ color: '#ff6b6b' }}>
            Backend inaccessible : {error}
          </p>
        )}

        {!loading && apiStatus && (
          <div>
            <p>Backend status : {apiStatus.status}</p>
            <p>Service : {apiStatus.service}</p>
            <p>Dernière vérification : {new Date(apiStatus.timestamp).toLocaleString()}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
