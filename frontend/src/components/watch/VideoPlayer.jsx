import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { resolveMediaUrl } from '../../utils/media';
import { srtToVtt, detectSubtitleLang } from '../../utils/subtitle';

function useSubtitleBlobs(assets) {
  const [subtitleBlobUrls, setSubtitleBlobUrls] = useState({});
  const blobUrlsRef = useRef({});

  useEffect(() => {
    const subs = assets.filter((a) => a.asset_type === 'subtitle');
    if (!subs.length) return;

    const urls = {};
    let cancelled = false;
    const apiBase = (process.env.REACT_APP_API_URL || '').replace(/\/$/, '');

    (async () => {
      for (const asset of subs) {
        const originalSrc = resolveMediaUrl(asset.file_path);
        const proxySrc = `${apiBase}/api/proxy/subtitle?url=${encodeURIComponent(originalSrc)}`;
        try {
          const res = await fetch(proxySrc);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const text = await res.text();
          const blob = new Blob([srtToVtt(text)], { type: 'text/vtt' });
          urls[asset.id] = URL.createObjectURL(blob);
        } catch (e) {
          console.warn('Sous-titre non chargé:', asset.file_path, e);
        }
      }
      if (!cancelled) {
        blobUrlsRef.current = urls;
        setSubtitleBlobUrls({ ...urls });
      }
    })();

    return () => {
      cancelled = true;
      Object.values(blobUrlsRef.current).forEach(
        (u) => u.startsWith('blob:') && URL.revokeObjectURL(u),
      );
      blobUrlsRef.current = {};
    };
  }, [assets]);

  return subtitleBlobUrls;
}

export default function VideoPlayer({ movie, assets, isEnglish }) {
  const { t } = useTranslation();
  const videoRef = useRef(null);
  const subtitleBlobUrls = useSubtitleBlobs(assets);

  const thumbnailAsset = assets.find((a) => a.asset_type === 'thumbnail');
  const posterSrc = thumbnailAsset
    ? resolveMediaUrl(thumbnailAsset.file_path)
    : undefined;
  const videoUrl = movie.video_url || '';
  const isFileVideo =
    videoUrl.startsWith('https') ||
    videoUrl.startsWith('/uploads') ||
    videoUrl.startsWith('uploads');
  const fileSrc = isFileVideo ? resolveMediaUrl(videoUrl) : null;
  const isYoutube =
    movie.youtube_url &&
    (movie.youtube_url.includes('youtube') ||
      movie.youtube_url.includes('youtu.be'));

  // Si le fichier S3/local ne charge pas, on bascule sur YouTube
  const [videoError, setVideoError] = useState(false);

  // Injecte les tracks dans le DOM et active le premier
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !Object.keys(subtitleBlobUrls).length) return;

    video.querySelectorAll('track[data-mars]').forEach((el) => el.remove());

    const subtitleAssets = assets.filter((a) => a.asset_type === 'subtitle');
    let hasFirst = false;

    subtitleAssets.forEach((asset, idx) => {
      const blobSrc = subtitleBlobUrls[asset.id];
      if (!blobSrc) return;

      const lang =
        detectSubtitleLang(asset.file_path) || (isEnglish ? 'en' : 'fr');
      const label =
        lang === 'fr' ? 'Français' : lang === 'ar' ? 'عربي' : 'English';

      const trackEl = document.createElement('track');
      trackEl.kind = 'subtitles';
      trackEl.src = blobSrc;
      trackEl.srclang = lang;
      trackEl.label = label;
      trackEl.setAttribute('data-mars', '1');
      video.appendChild(trackEl);

      if (idx === 0) hasFirst = true;
    });

    if (!hasFirst) return;

    requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        const tracks = video.textTracks;
        for (let i = 0; i < tracks.length; i++) {
          tracks[i].mode = i === 0 ? 'showing' : 'hidden';
        }
      }),
    );
  }, [subtitleBlobUrls, assets, isEnglish]);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-white/5 group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-violet-600 opacity-20 blur-2xl transition duration-1000 group-hover:opacity-30" />
      <div className="relative w-full h-full bg-black z-10">
        {fileSrc && !videoError ? (
          <video
            ref={videoRef}
            controls
            className="w-full h-full object-cover"
            src={fileSrc}
            poster={posterSrc}
            onError={() => setVideoError(true)}
          />
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
}
