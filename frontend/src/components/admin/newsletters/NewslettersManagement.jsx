import { SectionHeader, ErrorAlert, SectionCard } from '../common';
import { useNewsletterSubscribers } from '../hooks';
import SubscribersList from './SubscribersList';

export default function NewslettersManagement() {
  const { subscribers, loading, error } = useNewsletterSubscribers();

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Gestion des newsletters"
        subtitle="Consultez les inscrits et gérez vos campagnes directement dans Brevo."
      />
      <div className="grid gap-4 md:grid-cols-[2fr,1.2fr]">
        <SectionCard title="Édition & envoi" action={null}>
          <p className="mt-1 text-[11px] text-brand-muted">
            Le contenu de la newsletter est rédigé et envoyé depuis Brevo.
          </p>
          <a
            href="https://app.brevo.com"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            Ouvrir Brevo
          </a>
          <p className="mt-3 text-[11px] text-brand-muted">
            Conseil : créez votre campagne dans Brevo puis ciblez la liste
            newsletter du projet.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
