import React, { useState } from 'react';
import { Download, Share2 } from 'lucide-react';
import {
  buildSocialShareLinks,
  safeFilename,
  tryNativeShare,
  tryNativeShareFile,
} from '../../utils/socialShare';

export default function ShareBar({ movie, displayTitle, fileSrc, shareUrl }) {
  const [sharing, setSharing] = useState(false);

  const shareText = displayTitle
    ? `Regarder : ${displayTitle}`
    : 'Regarder cette vidéo';
  const shareLinks = shareUrl
    ? buildSocialShareLinks({ url: shareUrl, text: shareText })
    : null;

  const handleShare = async () => {
    if (!shareUrl || sharing) return;
    setSharing(true);
    try {
      if (fileSrc) {
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

  return (
    <div className="mt-3 flex flex-col gap-2">
      <div className="flex flex-wrap items-center gap-2">
        {fileSrc && (
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
          {[
            { key: 'facebook', label: 'Facebook' },
            { key: 'x', label: 'X' },
            { key: 'whatsapp', label: 'WhatsApp' },
            { key: 'linkedin', label: 'LinkedIn' },
          ].map(({ key, label }) => (
            <a
              key={key}
              href={shareLinks[key]}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 hover:bg-white/10"
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
