import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/seo/SEOHead';
import { videoObjectSchema } from '../components/seo/schemas';
import { Download, Share2 } from 'lucide-react';
import { getMovieFullById } from '../services/api';
import { resolveMediaUrl } from '../utils/media';
import { useAdmin } from '../contexts';
import {
  buildSocialShareLinks,
  safeFilename,
  tryNativeShare,
  tryNativeShareFile,
} from '../utils/socialShare';

export default function VideoDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { role } = useAdmin();
  const [movie, setMovie] = useState(null);
  const [assets, setAssets] = useState([]);
  const [collaborators, setCollaborators] = useState([]);
  const [tags, setTags] = useState([]);
  const [aiDeclaration, setAiDeclaration] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sharing, setSharing] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        // Simulation d'un délai réseau pour l'effet (optionnel)
        // await new Promise(r => setTimeout(r, 800));
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
    fetchMovie();
  }, [id]);

  const isEnglish = useMemo(
    () => (i18n.language || 'fr').toLowerCase().startsWith('en'),
    [i18n.language],
  );

  const displayTitle = useMemo(() => {
    if (!movie) return '';
    if (isEnglish && movie.english_title) return movie.english_title;
    return movie.original_title;
  }, [movie, isEnglish]);

  const displaySynopsis = useMemo(() => {
    if (!movie) return '';
    if (isEnglish && movie.synopsis_english) return movie.synopsis_english;
    return (
      movie.synopsis_original ||
      (isEnglish
        ? t('videoDetail.noSynopsis_en')
        : t('videoDetail.noSynopsis_fr'))
    );
  }, [movie, isEnglish, t]);

  // --- RENDERERS ---

  const renderVideo = () => {
    if (!movie) return null;

    // Sous-titres SRT éventuels parmi les assets
    const subtitleAsset = assets.find((a) => a.asset_type === 'subtitle');
    const subtitleSrc = subtitleAsset
      ? resolveMediaUrl(subtitleAsset.file_path)
      : null;

    // Cas 1 : lien YouTube
    const isYoutube =
      movie.youtube_url &&
      (movie.youtube_url.includes('youtube') ||
        movie.youtube_url.includes('youtu.be'));

    // Cas 2 : fichier vidéo hébergé (backend historique ou S3)
    const hasFileOnDisk = !!movie.video_url;
    const fileSrc = hasFileOnDisk ? resolveMediaUrl(movie.video_url) : null;

    // Wrapper avec effet de lueur (Glow)
    return (
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/5 group">
        {/* Glow Effect arrière-plan (Reste bleu/violet pour la vidéo car ça contraste bien, ou tu peux le changer aussi) */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 opacity-20 blur-2xl transition duration-1000 group-hover:opacity-30"></div>

        <div className="relative w-full h-full bg-black z-10">
          {hasFileOnDisk && fileSrc ? (
            <video
              controls
              className="w-full h-full object-cover"
              src={fileSrc}
            >
              {subtitleSrc && (
                <track
                  kind="subtitles"
                  src={subtitleSrc}
                  srcLang={isEnglish ? 'en' : 'fr'}
                  label={isEnglish ? 'Subtitles' : 'Sous-titres'}
                  default
                />
              )}
            </video>
          ) : isYoutube ? (
            <iframe
              className="w-full h-full object-cover"
              src={movie.youtube_url.replace('watch?v=', 'embed/')}
              title={movie.original_title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-300">
              {t('videoDetail.videoUnavailable')}
            </div>
          )}
        </div>
      </div>
    );
  };

  // --- LOADER SQUELETTE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-10">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 animate-pulse">
          <div className="lg:col-span-5 space-y-6 mt-10">
            <div className="h-2 w-16 bg-blue-900/30 rounded"></div>
            <div className="h-16 w-3/4 bg-white/5 rounded"></div>
            <div className="h-6 w-1/2 bg-white/5 rounded"></div>
            <div className="space-y-3 pt-4">
              <div className="h-4 w-full bg-white/5 rounded"></div>
              <div className="h-4 w-5/6 bg-white/5 rounded"></div>
            </div>
            <div className="h-12 w-40 bg-white/5 rounded-full mt-8"></div>
          </div>
          <div className="lg:col-span-7">
            <div className="w-full aspect-video bg-white/5 rounded-lg border border-white/5"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-400">{t('videoDetail.notFound')}</p>
      </div>
    );
  }

  const canShareOrDownload = role === 'admin' || role === 'super_admin';
  const hasFileOnDisk = !!movie.video_url;
  const fileSrc = hasFileOnDisk ? resolveMediaUrl(movie.video_url) : null;
  const shareUrl =
    hasFileOnDisk && fileSrc ? fileSrc : movie.youtube_url || null;
  const shareText = displayTitle
    ? `Regarder : ${displayTitle}`
    : 'Regarder cette vidéo';
  const shareLinks = shareUrl
    ? buildSocialShareLinks({ url: shareUrl, text: shareText })
    : null;

  const handleShare = async () => {
    if (!shareUrl) return;
    if (sharing) return;
    setSharing(true);
    try {
      if (hasFileOnDisk && fileSrc) {
        const didFileShare = await tryNativeShareFile({
          fileUrl: fileSrc,
          filename: `${safeFilename(displayTitle)}-${movie.id}.mp4`,
          title: displayTitle || 'Vidéo',
          text: shareText,
        });
        if (didFileShare) return;
      }

      const didNative = await tryNativeShare({
        title: displayTitle || 'Vidéo',
        text: shareText,
        url: shareUrl,
      });
      if (didNative) return;
      if (shareLinks?.whatsapp)
        window.open(shareLinks.whatsapp, '_blank', 'noopener,noreferrer');
    } finally {
      setSharing(false);
    }
  };

  // --- PAGE CONTENU ---
  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <SEOHead
        title={displayTitle || 'Court-métrage'}
        description={
          displaySynopsis ||
          `Regardez "${displayTitle}" — court-métrage IA sélectionné au festival marsAI.`
        }
        canonical={`/watch/${id}`}
        image={movie?.thumbnail_url}
        lang={isEnglish ? 'en' : 'fr'}
        schema={videoObjectSchema(movie)}
      />
      <div className="max-w-[1600px] mx-auto px-6 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* COLONNE GAUCHE : infos film + relations */}
          <div className="lg:col-span-5 flex flex-col order-2 lg:order-1 relative z-10">
            <div
              className="w-12 h-[2px] bg-blue-500 mb-8 opacity-0 animate-fadeInLeft"
              style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
            ></div>

            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.9] mb-4 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
            >
              {displayTitle}
            </h1>

            <div
              className="flex items-center gap-3 text-lg font-medium text-gray-400 mb-8 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
            >
              <span className="text-blue-500">{t('videoDetail.dirLabel')}</span>
              <span className="text-white tracking-widest uppercase">
                {movie.filmmaker
                  ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
                  : t('videoDetail.unknownArtist')}
              </span>
            </div>

            <p
              className="text-lg leading-relaxed text-gray-300 max-w-lg mb-6 opacity-0 animate-fadeInUp"
              style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
            >
              {displaySynopsis}
            </p>

            {/* Tags */}
            {tags.length > 0 && (
              <div
                className="mb-6 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: '0.45s',
                  animationFillMode: 'forwards',
                }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  {t('videoDetail.tags')}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag.id}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-gray-100 border border-white/10"
                    >
                      {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Collaborateurs */}
            {collaborators.length > 0 && (
              <div
                className="mb-6 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: '0.5s',
                  animationFillMode: 'forwards',
                }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  {t('videoDetail.collaborators')}
                </h2>
                <ul className="space-y-1 text-sm text-gray-200">
                  {collaborators.map((c) => (
                    <li key={c.id}>
                      <span className="font-semibold">
                        {c.first_name} {c.last_name}
                      </span>
                      {c.role ? ` — ${c.role}` : ''}
                      {c.email ? (
                        <span className="text-gray-400"> ({c.email})</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Déclaration IA */}
            {aiDeclaration && (
              <div
                className="mb-6 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: '0.55s',
                  animationFillMode: 'forwards',
                }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  {t('videoDetail.aiDeclaration')}
                </h2>
                <dl className="space-y-1 text-sm text-gray-200">
                  <div>
                    <dt className="text-gray-400 text-xs uppercase">
                      {t('videoDetail.ai.artworkType')}
                    </dt>
                    <dd>{aiDeclaration.artwork_type}</dd>
                  </div>
                  {aiDeclaration.tech_stack && (
                    <div>
                      <dt className="text-gray-400 text-xs uppercase">
                        {t('videoDetail.ai.techStack')}
                      </dt>
                      <dd>{aiDeclaration.tech_stack}</dd>
                    </div>
                  )}
                  {aiDeclaration.methodology && (
                    <div>
                      <dt className="text-gray-400 text-xs uppercase">
                        {t('videoDetail.ai.methodology')}
                      </dt>
                      <dd>{aiDeclaration.methodology}</dd>
                    </div>
                  )}
                </dl>
              </div>
            )}

            {/* Assets */}
            {assets.length > 0 && (
              <div
                className="mb-6 opacity-0 animate-fadeInUp"
                style={{
                  animationDelay: '0.6s',
                  animationFillMode: 'forwards',
                }}
              >
                <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
                  {t('videoDetail.assets')}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {assets.map((asset) => {
                    const isImage = asset.asset_type === 'still';
                    const isSubtitle = asset.asset_type === 'subtitle';
                    return (
                      <div
                        key={asset.id}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-xs text-gray-100 max-w-[180px]"
                      >
                        <div className="font-semibold mb-1 capitalize">
                          {asset.asset_type}
                        </div>
                        {isImage && (
                          <img
                            src={asset.file_path}
                            alt={`${movie.original_title} still`}
                            className="w-full h-auto rounded mb-1"
                          />
                        )}
                        {isSubtitle && (
                          <a
                            href={asset.file_path}
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-blue-300"
                          >
                            {t('videoDetail.assets.downloadSubtitles')}
                          </a>
                        )}
                        {!isImage && !isSubtitle && (
                          <a
                            href={asset.file_path}
                            target="_blank"
                            rel="noreferrer"
                            className="underline text-blue-300"
                          >
                            {t('videoDetail.assets.openAsset')}
                          </a>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* COLONNE DROITE */}
          <div
            className="lg:col-span-7 order-1 lg:order-2 opacity-0 animate-fadeIn"
            style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
          >
            {renderVideo()}

            {canShareOrDownload && shareUrl && (
              <div className="mt-3 flex flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  {hasFileOnDisk && fileSrc && (
                    <a
                      href={fileSrc}
                      download={`${safeFilename(displayTitle)}-${movie.id}.mp4`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                      title="Télécharger la vidéo"
                    >
                      <Download className="h-4 w-4" />
                      Télécharger
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleShare}
                    disabled={sharing}
                    className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white hover:bg-white/10"
                    title="Partager la vidéo"
                  >
                    <Share2 className="h-4 w-4" />
                    {sharing ? 'Préparation...' : 'Partager'}
                  </button>
                </div>

                {shareLinks && (
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-200">
                    <a
                      href={shareLinks.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                    >
                      Facebook
                    </a>
                    <a
                      href={shareLinks.x}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                    >
                      X
                    </a>
                    <a
                      href={shareLinks.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={shareLinks.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
                    >
                      LinkedIn
                    </a>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-between items-center mt-6 text-xs font-mono text-gray-600 uppercase tracking-widest border-t border-gray-900 pt-4">
              <div>MARSAI FESTIVAL • 2026</div>
              <div>ID: #{String(id).padStart(3, '0')}</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInLeft {
          from { opacity: 0; transform: translateX(-20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fadeInLeft { animation: fadeInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fadeIn { animation: fadeIn 1.2s ease-out; }
      `}</style>
    </div>
  );
}
