import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SEOHead from '../components/seo/SEOHead';
import { videoObjectSchema } from '../components/seo/schemas';
import { useAdmin } from '../contexts';
import { resolveMediaUrl } from '../utils/media';
import { useMovieDetail } from '../hooks/useMovieDetail';
import VideoPlayer from '../components/watch/VideoPlayer';
import {
  MovieHeader,
  MovieInfo,
  StillsGallery,
} from '../components/watch/MovieMeta';
import ShareBar from '../components/watch/ShareBar';

export default function VideoDetail() {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const { role } = useAdmin();
  const { movie, assets, collaborators, tags, aiDeclaration, loading } =
    useMovieDetail(id);

  const isEnglish = useMemo(
    () => (i18n.language || 'fr').toLowerCase().startsWith('en'),
    [i18n.language],
  );

  const displayTitle = useMemo(() => {
    if (!movie) return '';
    return isEnglish && movie.english_title
      ? movie.english_title
      : movie.original_title;
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

  if (loading) return <VideoDetailSkeleton />;
  if (!movie) return <VideoDetailNotFound t={t} />;

  const thumbnailUrl = (() => {
    const a = assets.find((a) => a.asset_type === 'thumbnail');
    return a ? resolveMediaUrl(a.file_path) : null;
  })();

  const canShareOrDownload = role === 'admin' || role === 'super_admin';
  const fileSrc = movie.video_url ? resolveMediaUrl(movie.video_url) : null;
  const shareUrl = fileSrc || movie.youtube_url || null;

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <SEOHead
        title={displayTitle || 'Court-métrage'}
        description={
          displaySynopsis ||
          `Regardez "${displayTitle}" — court-métrage IA sélectionné au festival marsAI.`
        }
        canonical={`/watch/${id}`}
        image={thumbnailUrl}
        lang={isEnglish ? 'en' : 'fr'}
        schema={videoObjectSchema({ ...movie, thumbnail_url: thumbnailUrl })}
      />

      <div className="max-w-4xl mx-auto px-6 py-20 lg:py-28">
        {/* 1. Titre + réalisateur */}
        <MovieHeader movie={movie} displayTitle={displayTitle} />

        {/* 2. Vidéo */}
        <div
          className="opacity-0 animate-fadeIn"
          style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
        >
          <VideoPlayer movie={movie} assets={assets} isEnglish={isEnglish} />
          {canShareOrDownload && shareUrl && (
            <ShareBar
              movie={movie}
              displayTitle={displayTitle}
              fileSrc={fileSrc}
              shareUrl={shareUrl}
            />
          )}
        </div>

        {/* 3. Infos */}
        <MovieInfo
          displaySynopsis={displaySynopsis}
          tags={tags}
          collaborators={collaborators}
          aiDeclaration={aiDeclaration}
        />

        <div className="border-t border-white/5 mt-12 pt-6 flex justify-between items-center text-xs font-mono text-gray-700 uppercase tracking-widest">
          <div>MARSAI FESTIVAL • 2026</div>
          <div>ID: #{String(id).padStart(3, '0')}</div>
        </div>
      </div>

      {/* 4. Stills */}
      <div className="max-w-5xl mx-auto px-6 pb-24">
        <StillsGallery assets={assets} movieTitle={movie.original_title} />
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
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
        .animate-fadeInUp { animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fadeInLeft { animation: fadeInLeft 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
      `}</style>
    </div>
  );
}

function VideoDetailSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-10">
      <div className="w-full max-w-4xl space-y-8 animate-pulse">
        <div className="h-2 w-16 bg-blue-900/30 rounded" />
        <div className="h-14 w-2/3 bg-white/5 rounded" />
        <div className="h-5 w-1/3 bg-white/5 rounded" />
        <div className="w-full aspect-video bg-white/5 rounded-xl border border-white/5 mt-6" />
        <div className="space-y-3 pt-4">
          <div className="h-4 w-full bg-white/5 rounded" />
          <div className="h-4 w-5/6 bg-white/5 rounded" />
        </div>
      </div>
    </div>
  );
}

function VideoDetailNotFound({ t }) {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-gray-400">{t('videoDetail.notFound')}</p>
    </div>
  );
}
