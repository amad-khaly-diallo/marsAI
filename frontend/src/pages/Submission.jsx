import { useState } from "react";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:4000/api";

export default function Submission() {
  const [form, setForm] = useState({
    original_title: "",
    english_title: "",
    duration: "",
    language: "",
    synopsis_original: "",
    synopsis_english: "",
    youtube_url: "",
    filmmaker_id: "",
  });
  const [videoFile, setVideoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0] || null;
    setVideoFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const payload = {
        original_title: form.original_title,
        english_title: form.english_title,
        duration: Number(form.duration),
        language: form.language || null,
        synopsis_original: form.synopsis_original || null,
        synopsis_english: form.synopsis_english || null,
        youtube_url: form.youtube_url || undefined,
        filmmaker_id: Number(form.filmmaker_id),
      };

      let response;

      // Si un fichier est présent, on utilise multipart/form-data avec "payload" JSON
      if (videoFile) {
        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));
        formData.append("video", videoFile);

        response = await fetch(`${API_BASE_URL}/movies/submit`, {
          method: "POST",
          body: formData,
        });
      } else {
        // Sinon, simple JSON (nécessite au moins youtube_url côté backend)
        response = await fetch(`${API_BASE_URL}/movies/submit`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      }

      // Vérifier si la réponse est du JSON
      const contentType = response.headers.get("content-type");
      let data;
      
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        throw new Error(`Réponse non-JSON reçue: ${text.substring(0, 200)}`);
      }

      if (!response.ok) {
        throw new Error(data.message || data.error || "Erreur lors de la soumission");
      }

      setResult(data);
    } catch (err) {
      // Gérer les erreurs de réseau, proxy, etc.
      if (err.message.includes("Proxy error") || err.message.includes("Failed to fetch")) {
        setError(`Erreur de connexion: Le backend n'est probablement pas démarré sur http://localhost:4000. Détails: ${err.message}`);
      } else {
        setError(err.message || "Une erreur inconnue est survenue");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Formulaire de Soumission (test API)</h2>
      <p className="mb-4 text-sm text-gray-600">
        Ce formulaire envoie des requêtes vers <code>POST /api/movies/submit</code>.{" "}
        Remplis les champs requis (<code>original_title</code>, <code>english_title</code>,{" "}
        <code>duration</code>, <code>filmmaker_id</code>) et soit tu fournis une{" "}
        <code>youtube_url</code>, soit tu uploades un fichier vidéo.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Titre original *
            </label>
            <input
              type="text"
              name="original_title"
              value={form.original_title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Titre anglais *
            </label>
            <input
              type="text"
              name="english_title"
              value={form.english_title}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Durée (minutes) *
            </label>
            <input
              type="number"
              name="duration"
              min="1"
              value={form.duration}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Langue
            </label>
            <input
              type="text"
              name="language"
              value={form.language}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="Français, Anglais, ..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Synopsis (langue originale)
          </label>
          <textarea
            name="synopsis_original"
            value={form.synopsis_original}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Synopsis (anglais)
          </label>
          <textarea
            name="synopsis_english"
            value={form.synopsis_english}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              ID du réalisateur (filmmaker_id) *
            </label>
            <input
              type="number"
              name="filmmaker_id"
              value={form.filmmaker_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Doit correspondre à un <code>filmmaker.id</code> existant dans la base.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              URL YouTube (optionnel si fichier vidéo)
            </label>
            <input
              type="text"
              name="youtube_url"
              value={form.youtube_url}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              placeholder="https://www.youtube.com/..."
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Fichier vidéo (optionnel)
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="w-full"
          />
          <p className="text-xs text-gray-500 mt-1">
            Si un fichier est fourni, il sera uploadé vers YouTube via{" "}
            <code>uploadVideo</code>. Sinon, l’API utilisera directement{" "}
            <code>youtube_url</code>.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
        >
          {loading ? "Envoi en cours..." : "Tester POST /api/movies/submit"}
        </button>
      </form>

      <div className="mt-6 space-y-3">
        {error && (
          <div className="border border-red-300 bg-red-50 text-red-700 px-3 py-2 rounded text-sm">
            <strong>Erreur API :</strong> {error}
          </div>
        )}

        {result && (
          <div className="border border-green-300 bg-green-50 text-green-800 px-3 py-2 rounded text-sm">
            <strong>Réponse API :</strong>
            <pre className="mt-2 text-xs overflow-x-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
