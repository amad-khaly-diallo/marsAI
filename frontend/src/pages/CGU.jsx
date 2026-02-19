import React from 'react';
import { useTranslation } from "react-i18next";
import { ShieldCheck, UserPlus, Copyright, BrainCircuit, MessageCircle, FileText } from 'lucide-react';
import BannerBg from '../assets/images/bn03.png';

export default function CGU() {
  const { t } = useTranslation();

  const legalData = [
    {
      id: 1,
      side: "left",
      title: "01. OBJET DU SERVICE",
      desc: "Le Festival marsAI est un concours de courts-métrages de 60 secondes maximum, générés par Intelligence Artificielle. La plateforme permet la soumission et la diffusion de ces œuvres.",
      icon: <FileText className="text-pink-500" size={50} /> 
    },
    {
      id: 2,
      side: "right",
      title: "02. PROPRIÉTÉ INTELLECTUELLE",
      desc: "Les participants conservent leurs droits d'auteur mais concèdent au festival une licence d'exploitation non-exclusive pour la promotion et la diffusion lors de l'événement à Marseille.",
      icon: <Copyright className="text-blue-400" size={50} /> 
    },
    {
      id: 3,
      side: "left",
      title: "03. ACCÈS ET INSCRIPTION",
      desc: "L'inscription est gratuite et ouverte aux créateurs du monde entier (+120 pays). Un compte 'Réalisateur' est obligatoire pour soumettre un film et suivre son statut de validation.",
      icon: <UserPlus className="text-pink-500" size={50} /> 
    },
    {
      id: 4,
      side: "right",
      title: "04. ÉTHIQUE ET RESPONSABILITÉ",
      desc: "L'usage de l'IA doit être responsable. Tout contenu haineux, discriminatoire ou portant atteinte à la dignité humaine (deepfakes non consentis) est strictement interdit.",
      icon: <BrainCircuit className="text-blue-400" size={50} /> 
    },
    {
      id: 5,
      side: "left",
      title: "05. PROTECTION DES DONNÉES",
      desc: "Conformément au RGPD, vos données personnelles sont collectées uniquement pour la gestion du concours. Vous disposez d'un droit d'accès et de suppression via votre tableau de bord.",
      icon: <ShieldCheck className="text-pink-500" size={50} /> 
    },
    {
      id: 6,
      side: "right",
      title: "06. CONTACT ET SUPPORT",
      desc: "Pour toute question juridique ou technique, contactez notre équipe à support@mars-ai.com. Nous répondons sous 48h aux demandes des participants.",
      icon: <MessageCircle className="text-blue-400" size={50} /> 
    }
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-brand-muted">
      <h1 className="mb-4 text-2xl font-semibold text-slate-50">
        {t("cgu.title")}
      </h1>
      <p className="mb-2">{t("cgu.p1")}</p>
      <p>{t("cgu.p2")}</p>
    </div>
  );
}

