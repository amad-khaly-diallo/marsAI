import React from "react";
import { useTranslation } from "react-i18next";

export default function CGU() {
  const { i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="relative min-h-screen text-white">
      <CinematicBackground />

      <section className="px-6 pt-32 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-[32px] border border-white/10 bg-white/[0.05] p-8 md:p-12 shadow-[0_25px_90px_rgba(0,0,0,.18)] backdrop-blur">
            {currentLang === "fr" ? <CGUFrench /> : <CGUEnglish />}
          </div>
        </div>
      </section>
    </div>
  );
}

/* --- TEXTE EN FRANÇAIS (CGU) --- */
const CGUFrench = () => (
  <>
    <div className="mb-10 border-b border-white/10 pb-6">
      <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-2 block text-blue-500">
        Légal
      </span>
      <h1 className="font-cy text-3xl md:text-5xl text-white font-black uppercase tracking-tight">
        Conditions Générales d'Utilisation
      </h1>
      <p className="mt-4 text-sm text-white/50 font-mono">
        Dernière mise à jour : Février 2026
      </p>
    </div>

    <div className="prose prose-invert max-w-none text-sm text-white/80 leading-relaxed space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          1. Éditeur du Site
        </h2>
        <p>
          Le site web MarsAI (ci-après "le Site") est édité par La Plateforme,
          association loi 1901, située au 8 Rue d'Hozier, 13002 Marseille.
          L'accès et l'utilisation du Site sont soumis aux présentes Conditions
          Générales d'Utilisation (CGU).
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          2. Accès et Compte Utilisateur
        </h2>
        <p>
          L'accès aux fonctionnalités de soumission de films nécessite la
          création d'un espace utilisateur ("Espace Réalisateur"). L'utilisateur
          s'engage à fournir des informations exactes et à conserver la
          confidentialité de ses identifiants. L'Éditeur se réserve le droit de
          suspendre tout compte en cas de non-respect des présentes CGU ou
          d'activité frauduleuse.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          3. Propriété Intellectuelle du Site
        </h2>
        <p>
          L'ensemble des éléments constituant le Site (textes, graphismes,
          logiciels, bases de données, code source) est la propriété exclusive
          de l'Éditeur ou de ses partenaires. Toute reproduction,
          représentation, modification ou adaptation totale ou partielle de ces
          éléments est strictement interdite sans autorisation préalable.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          4. Données Personnelles (RGPD)
        </h2>
        <p>
          Dans le cadre de l'utilisation du Site (inscription, soumission de
          films, newsletter), l'Éditeur est amené à collecter des données à
          caractère personnel (nom, email, date de naissance, téléphone).
          <br />
          <br />
          Ces données sont traitées dans le respect du Règlement Général sur la
          Protection des Données (RGPD). Elles sont conservées pour la durée
          nécessaire à la gestion du festival. L'utilisateur dispose d'un droit
          d'accès, de rectification, de portabilité et de suppression de ses
          données en contactant l'Éditeur via la page Contact.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">5. Responsabilité</h2>
        <p>
          L'Éditeur s'efforce de maintenir le Site accessible 24h/24 et 7j/7,
          mais décline toute responsabilité en cas de panne, d'interruption de
          service ou de perte de données lors du processus de soumission vidéo.
          Les utilisateurs soumettent leurs fichiers (liens YouTube, images)
          sous leur propre responsabilité.
        </p>
      </div>
    </div>
  </>
);

/* --- TEXTE EN ANGLAIS (CGU) --- */
const CGUEnglish = () => (
  <>
    <div className="mb-10 border-b border-white/10 pb-6">
      <span className="text-brand-primary font-bold tracking-widest text-xs uppercase mb-2 block text-blue-500">
        Legal
      </span>
      <h1 className="font-cy text-3xl md:text-5xl text-white font-black uppercase tracking-tight">
        Terms of Use
      </h1>
      <p className="mt-4 text-sm text-white/50 font-mono">
        Last updated: February 2026
      </p>
    </div>

    <div className="prose prose-invert max-w-none text-sm text-white/80 leading-relaxed space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-2">1. Site Publisher</h2>
        <p>
          The MarsAI website (hereinafter "the Site") is published by La
          Plateforme, located at 8 Rue d'Hozier, 13002 Marseille, France. Access
          to and use of the Site are subject to these Terms of Use (TOU).
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          2. Access and User Account
        </h2>
        <p>
          Accessing the film submission features requires the creation of a user
          account ("Filmmaker Space"). The user agrees to provide accurate
          information and to maintain the confidentiality of their login
          credentials. The Publisher reserves the right to suspend any account
          in the event of non-compliance with these TOU or fraudulent activity.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          3. Site Intellectual Property
        </h2>
        <p>
          All elements constituting the Site (texts, graphics, software,
          databases, source code) are the exclusive property of the Publisher or
          its partners. Any reproduction, representation, modification, or total
          or partial adaptation of these elements is strictly prohibited without
          prior authorization.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">
          4. Personal Data (GDPR)
        </h2>
        <p>
          As part of the use of the Site (registration, film submission,
          newsletter), the Publisher collects personal data (name, email, date
          of birth, phone number).
          <br />
          <br />
          This data is processed in compliance with the General Data Protection
          Regulation (GDPR). It is kept for the time necessary to manage the
          festival. The user has a right to access, rectify, port, and delete
          their data by contacting the Publisher via the Contact page.
        </p>
      </div>

      <div>
        <h2 className="text-xl font-bold text-white mb-2">5. Liability</h2>
        <p>
          The Publisher strives to keep the Site accessible 24/7 but declines
          all responsibility in the event of an outage, service interruption, or
          data loss during the video submission process. Users submit their
          files (YouTube links, images) at their own risk.
        </p>
      </div>
    </div>
  </>
);

const CinematicBackground = () => (
  <>
    <div className="pointer-events-none fixed inset-0 -z-10 bg-[#070819]" />
    <div className="pointer-events-none fixed inset-0 -z-10 bg-gradient-to-b from-[#0b0d28]/70 via-[#070819] to-[#05060f]" />
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-48 left-[-10%] h-[520px] w-[720px] rounded-full bg-violet-500/18 blur-3xl" />
      <div className="absolute -top-24 right-[-12%] h-[420px] w-[640px] rounded-full bg-fuchsia-500/12 blur-3xl" />
      <div className="absolute -bottom-60 left-[18%] h-[520px] w-[820px] rounded-full bg-sky-500/10 blur-3xl" />
    </div>
  </>
);
