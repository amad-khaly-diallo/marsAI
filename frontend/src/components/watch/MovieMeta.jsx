import React from 'react';
import { useTranslation } from 'react-i18next';
import { resolveMediaUrl } from '../../utils/media';

export function MovieHeader({ movie, displayTitle }) {
  const { t } = useTranslation();
  return (
    <div className="mb-10">
      <div
        className="w-10 h-[2px] bg-blue-500 mb-6 opacity-0 animate-fadeInLeft"
        style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}
      />
      <h1
        className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[0.95] mb-4 opacity-0 animate-fadeInUp"
        style={{ animationDelay: '0.15s', animationFillMode: 'forwards' }}
      >
        {displayTitle}
      </h1>
      <div
        className="flex items-center gap-3 text-base font-medium text-gray-400 opacity-0 animate-fadeInUp"
        style={{ animationDelay: '0.25s', animationFillMode: 'forwards' }}
      >
        <span className="text-blue-500">{t('videoDetail.dirLabel')}</span>
        <span className="text-white tracking-widest uppercase">
          {movie.filmmaker
            ? `${movie.filmmaker.first_name} ${movie.filmmaker.last_name}`
            : t('videoDetail.unknownArtist')}
        </span>
      </div>
    </div>
  );
}

function Tags({ tags }) {
  const { t } = useTranslation();
  if (!tags.length) return null;
  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
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
  );
}

function Collaborators({ collaborators }) {
  const { t } = useTranslation();
  if (!collaborators.length) return null;
  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
        {t('videoDetail.collaborators')}
      </h2>
      <ul className="space-y-1 text-base text-gray-200">
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
  );
}

function AiDeclaration({ aiDeclaration }) {
  const { t } = useTranslation();
  if (!aiDeclaration) return null;
  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-3">
        {t('videoDetail.aiDeclaration')}
      </h2>
      <dl className="space-y-2 text-base text-gray-200">
        <div>
          <dt className="text-gray-500 text-xs uppercase">
            {t('videoDetail.ai.artworkType')}
          </dt>
          <dd>{aiDeclaration.artwork_type}</dd>
        </div>
        {aiDeclaration.tech_stack && (
          <div>
            <dt className="text-gray-500 text-xs uppercase">
              {t('videoDetail.ai.techStack')}
            </dt>
            <dd>{aiDeclaration.tech_stack}</dd>
          </div>
        )}
        {aiDeclaration.methodology && (
          <div>
            <dt className="text-gray-500 text-xs uppercase">
              {t('videoDetail.ai.methodology')}
            </dt>
            <dd>{aiDeclaration.methodology}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}

export function MovieInfo({
  displaySynopsis,
  tags,
  collaborators,
  aiDeclaration,
}) {
  return (
    <div
      className="mt-10 opacity-0 animate-fadeInUp"
      style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
    >
      <p className="text-lg leading-relaxed text-gray-300 mb-8 max-w-2xl">
        {displaySynopsis}
      </p>
      <Tags tags={tags} />
      <Collaborators collaborators={collaborators} />
      <AiDeclaration aiDeclaration={aiDeclaration} />
    </div>
  );
}

export function StillsGallery({ assets, movieTitle }) {
  const { t } = useTranslation();
  const stills = assets.filter((a) => a.asset_type === 'still');
  if (!stills.length) return null;

  return (
    <section className="mt-16 mb-12">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-8 text-center">
        {t('videoDetail.assets')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stills.map((asset) => {
          const src = resolveMediaUrl(asset.file_path);
          return (
            <a
              key={asset.id}
              href={src}
              target="_blank"
              rel="noreferrer"
              className="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:border-white/25 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.05)]"
            >
              <img
                src={src}
                alt={`${movieTitle} still`}
                className="w-full aspect-video object-cover group-hover:scale-[1.03] transition-transform duration-500"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.closest('a').style.display = 'none';
                }}
              />
            </a>
          );
        })}
      </div>
    </section>
  );
}
