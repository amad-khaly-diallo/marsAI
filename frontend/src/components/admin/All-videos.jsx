import React, { useState } from 'react';


const initialVideos = [
  { 
    id: 1, 
    title: "Festival MarsAI", 
    director: "Mehdi", 
    status: "Publié", 
    views: 1200,
    videoUrl: "/video/video.mp4" 
  },
  { 
    id: 2, 
    title: "Cyber Dreams", 
    director: "Mehdi", 
    status: "En attente", 
    views: 0,
    videoUrl: "/video/video1.mp4"
  },
  { 
    id: 3, 
    title: "Le Robot Perdu", 
    director: "Mehdi", 
    status: "Masqué", 
    views: 450,
    videoUrl: "/video/video3.mp4"
  },
  { 
    id: 4, 
    title: "Voyage Infini", 
    director: "Mehdi", 
    status: "Publié", 
    views: 3400,
    videoUrl: "/video/ytb.mp4"
  },
];

const AdminVideos = () => {
  const [videos, setVideos] = useState(initialVideos);

  // FONCTIONS
  const handleDelete = (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette vidéo ?")) {
      const updatedVideos = videos.filter((video) => video.id !== id);
      setVideos(updatedVideos);
    }
  };

  const handleToggleStatus = (id) => {
    const updatedVideos = videos.map((video) => {
      if (video.id === id) {
        return { 
          ...video, 
          status: video.status === "Publié" ? "Masqué" : "Publié" 
        };
      }
      return video;
    });
    setVideos(updatedVideos);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-4 md:p-8">
      
      {/* =======================
          EN-TÊTE RESPONSIVE
          ======================= */}
      <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Gestion des Vidéos</h1>
          <p className="text-sm md:text-base text-gray-400">Visionnez et validez les soumissions.</p>
        </div>
        
        <button className="w-full md:w-auto bg-primary hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-primary/50">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          Ajouter une vidéo
        </button>
      </div>

      <div className="max-w-7xl mx-auto">
        
        {/*VUE MOBILE (CARTES)*/}
        <div className="grid grid-cols-1 gap-6 md:hidden">
          {videos.map((video) => (
            <div key={video.id} className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden shadow-lg">
              {/* Vidéo Mobile */}
              <div className="relative w-full aspect-video bg-black">
                <video 
                  className="w-full h-full object-cover" 
                  controls 
                  src={video.videoUrl}
                >
                  Votre navigateur ne supporte pas la vidéo.
                </video>
              </div>

              {/* Contenu Mobile */}
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-white">{video.title}</h3>
                    <p className="text-sm text-blue-400 mt-1">Réalisateur: {video.director}</p>
                  </div>
                  <button 
                    onClick={() => handleToggleStatus(video.id)}
                    className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                      video.status === "Publié" 
                        ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30" 
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    }`}
                  >
                    {video.status}
                  </button>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-700/50">
                  <span className="text-xs text-gray-500 font-mono">{video.views} vues</span>
                  
                  <div className="flex gap-2">
                     {/* Boutons Actions Mobile */}
                    <button className="p-2 bg-slate-700/50 text-slate-300 rounded-lg hover:bg-slate-600">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                    <button 
                      onClick={() => handleDelete(video.id)}
                      className="p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


       
        <div className="hidden md:block bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700 overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-950/50 text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="p-6 w-48">Aperçu</th> 
                <th className="p-6">Infos Film</th>
                <th className="p-6 text-center">Statut</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {videos.map((video) => (
                <tr key={video.id} className="hover:bg-slate-700/30 transition-colors group">
                  <td className="p-4 align-middle">
                    <div className="relative w-40 h-24 rounded-lg overflow-hidden bg-black border border-slate-600 shadow-md group-hover:shadow-blue-500/20 transition-all">
                      <video className="w-full h-full object-cover" controls src={video.videoUrl}>
                        Votre navigateur ne supporte pas la vidéo.
                      </video>
                    </div>
                  </td>
                  <td className="p-6 align-middle">
                    <h3 className="text-lg font-bold text-white mb-1">{video.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span className="text-blue-400">Réalisateur:</span> {video.director}
                    </div>
                    <div className="mt-2 text-xs text-gray-500 font-mono">{video.views} vues</div>
                  </td>
                  <td className="p-6 text-center align-middle">
                    <button 
                      onClick={() => handleToggleStatus(video.id)}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all border ${
                        video.status === "Publié" 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20" 
                          : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                      }`}
                    >
                      {video.status}
                    </button>
                  </td>
                  <td className="p-6 text-right align-middle">
                    <div className="flex justify-end gap-3">
                      <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-600/50 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      </button>
                      <button 
                        onClick={() => handleDelete(video.id)}
                        className="p-2 text-red-400 hover:text-red-200 hover:bg-red-500/20 rounded-lg transition-colors" 
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {videos.length === 0 && (
          <div className="p-12 text-center text-gray-500 bg-slate-800/30 rounded-xl mt-4">
            Aucune vidéo trouvée.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVideos;