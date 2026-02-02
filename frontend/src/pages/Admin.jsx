import { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export default function Admin() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [authInfo, setAuthInfo] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  const [movies, setMovies] = useState([]);
  const [moviesLoading, setMoviesLoading] = useState(false);
  const [moviesError, setMoviesError] = useState(null);

  const [statusForm, setStatusForm] = useState({
    movieId: "",
    status: "selected",
    decision_reason: "",
  });
  const [statusResult, setStatusResult] = useState(null);
  const [statusError, setStatusError] = useState(null);
  const [statusLoading, setStatusLoading] = useState(false);

  const handleCredsChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);
    setAuthInfo(null);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // pour envoyer / recevoir le cookie token
        body: JSON.stringify(credentials),
      });

      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Réponse non-JSON reçue: ${text.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || "Erreur de login");
      }

      setAuthInfo(data);
    } catch (err) {
      if (err.message.includes("Proxy error") || err.message.includes("Failed to fetch")) {
        setAuthError(`Erreur de connexion: Le backend n'est probablement pas démarré sur http://localhost:4000. Détails: ${err.message}`);
      } else {
        setAuthError(err.message || "Erreur inconnue lors du login");
      }
    } finally {
      setAuthLoading(false);
    }
  };

  const loadMovies = async () => {
    setMoviesLoading(true);
    setMoviesError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: "GET",
        credentials: "include",
      });
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Réponse non-JSON reçue: ${text.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || "Erreur en chargeant les films");
      }
      setMovies(data);
    } catch (err) {
      if (err.message.includes("Proxy error") || err.message.includes("Failed to fetch")) {
        setMoviesError(`Erreur de connexion: Le backend n'est probablement pas démarré sur http://localhost:4000. Détails: ${err.message}`);
      } else {
        setMoviesError(err.message || "Erreur inconnue lors du chargement des films");
      }
    } finally {
      setMoviesLoading(false);
    }
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusForm((prev) => ({ ...prev, [name]: value }));
  };

  const updateStatus = async (e) => {
    e.preventDefault();
    setStatusLoading(true);
    setStatusError(null);
    setStatusResult(null);

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/films/${statusForm.movieId}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            status: statusForm.status,
            decision_reason: statusForm.decision_reason || undefined,
          }),
        }
      );

      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Réponse non-JSON reçue: ${text.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || "Erreur lors de la mise à jour du statut");
      }

      setStatusResult(data);
    } catch (err) {
      if (err.message.includes("Proxy error") || err.message.includes("Failed to fetch")) {
        setStatusError(`Erreur de connexion: Le backend n'est probablement pas démarré sur http://localhost:4000. Détails: ${err.message}`);
      } else {
        setStatusError(err.message || "Erreur inconnue lors de la mise à jour");
      }
    } finally {
      setStatusLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8">
      <h2 className="text-2xl font-bold mb-2">Dashboard Admin – tests API</h2>
      <p className="text-sm text-gray-600 mb-4">
        Cette page te permet de tester rapidement les endpoints admin :{" "}
        <code>POST /api/auth/login</code>, <code>GET /api/movies</code> et{" "}
        <code>PATCH /api/admin/films/:id/status</code>.
      </p>

      {/* Bloc Login */}
      <section className="bg-white shadow-md rounded-lg p-6 space-y-3">
        <h3 className="text-lg font-semibold mb-2">1. Login admin</h3>
        <form onSubmit={login} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleCredsChange}
                className="w-full border rounded px-3 py-2"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mot de passe</label>
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleCredsChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={authLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {authLoading ? "Connexion..." : "Tester POST /api/auth/login"}
          </button>
        </form>

        {authError && (
          <div className="border border-red-300 bg-red-50 text-red-700 px-3 py-2 rounded text-sm">
            <strong>Erreur login :</strong> {authError}
          </div>
        )}

        {authInfo && (
          <div className="border border-green-300 bg-green-50 text-green-800 px-3 py-2 rounded text-sm">
            <strong>Admin connecté (payload API) :</strong>
            <pre className="mt-2 text-xs overflow-x-auto">
              {JSON.stringify(authInfo, null, 2)}
            </pre>
            <p className="mt-1 text-xs text-gray-600">
              Le token JWT est stocké dans un cookie <code>token</code> (si CORS et proxy
              sont bien configurés).
            </p>
          </div>
        )}
      </section>

      {/* Bloc Liste des films */}
      <section className="bg-white shadow-md rounded-lg p-6 space-y-3">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-lg font-semibold">2. Liste des films</h3>
          <button
            type="button"
            onClick={loadMovies}
            disabled={moviesLoading}
            className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-60"
          >
            {moviesLoading ? "Chargement..." : "Tester GET /api/movies"}
          </button>
        </div>

        {moviesError && (
          <div className="border border-red-300 bg-red-50 text-red-700 px-3 py-2 rounded text-sm">
            <strong>Erreur :</strong> {moviesError}
          </div>
        )}

        {movies.length > 0 && (
          <div className="mt-3 border border-gray-200 rounded overflow-hidden text-sm">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {movies.map((m) => (
                  <tr key={m.id}>
                    <td className="px-3 py-2 text-xs">{m.id}</td>
                    <td className="px-3 py-2 text-xs">
                      {m.original_title || m.english_title}
                    </td>
                    <td className="px-3 py-2 text-xs">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100">
                        {m.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {movies.length === 0 && !moviesLoading && !moviesError && (
          <p className="text-xs text-gray-500">
            Aucun film chargé pour l’instant. Clique sur le bouton pour tester l’endpoint.
          </p>
        )}
      </section>

      {/* Bloc changement de statut */}
      <section className="bg-white shadow-md rounded-lg p-6 space-y-3">
        <h3 className="text-lg font-semibold mb-2">
          3. Changer le statut d’un film (protégé)
        </h3>
        <p className="text-xs text-gray-600 mb-2">
          Endpoint : <code>PATCH /api/admin/films/:id/status</code> (nécessite un admin
          connecté via cookie <code>token</code>).
        </p>

        <form onSubmit={updateStatus} className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ID du film</label>
              <input
                type="number"
                name="movieId"
                value={statusForm.movieId}
                onChange={handleStatusChange}
                className="w-full border rounded px-3 py-2"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Nouveau statut</label>
              <select
                name="status"
                value={statusForm.status}
                onChange={handleStatusChange}
                className="w-full border rounded px-3 py-2"
              >
                <option value="in_process">in_process</option>
                <option value="selected">selected</option>
                <option value="rejected">rejected</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Raison de la décision (optionnelle)
            </label>
            <textarea
              name="decision_reason"
              value={statusForm.decision_reason}
              onChange={handleStatusChange}
              className="w-full border rounded px-3 py-2"
              rows={3}
              placeholder="Motif de sélection ou de rejet..."
            />
          </div>

          <button
            type="submit"
            disabled={statusLoading}
            className="px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 disabled:opacity-60"
          >
            {statusLoading
              ? "Mise à jour..."
              : "Tester PATCH /api/admin/films/:id/status"}
          </button>
        </form>

        {statusError && (
          <div className="border border-red-300 bg-red-50 text-red-700 px-3 py-2 rounded text-sm">
            <strong>Erreur :</strong> {statusError}
          </div>
        )}

        {statusResult && (
          <div className="border border-green-300 bg-green-50 text-green-800 px-3 py-2 rounded text-sm">
            <strong>Réponse API :</strong>
            <pre className="mt-2 text-xs overflow-x-auto">
              {JSON.stringify(statusResult, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}
