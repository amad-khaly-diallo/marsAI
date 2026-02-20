import { useTranslation } from "react-i18next";
import { ShieldCheck, UserPlus, Copyright, BrainCircuit, MessageCircle, FileText } from 'lucide-react';

import BannerBg from '../assets/images/bn03.png';

export default function CGU() {
  const { t } = useTranslation();

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

