import { useTranslation } from "react-i18next";

export default function CGV() {
  const { t } = useTranslation();

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 text-sm text-brand-muted">
      <h1 className="mb-4 text-2xl font-semibold text-slate-50">
        {t("cgv.title")}
      </h1>
      <p className="mb-2">
        {t("cgv.p1")}
      </p>
      <p>{t("cgv.p2")}</p>
    </div>
  );
}

