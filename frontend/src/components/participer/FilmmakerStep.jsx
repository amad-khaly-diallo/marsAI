import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import FilmmakerForm from "../../components/forms/FilmmakerForm";
import SubmitButton from "../../components/ui/SubmitButton";

export default function FilmmakerStep({
  value,
  onChange,
  onSubmit,
  submitting,
  error,
}) {
  const { t } = useTranslation();
  const formRef = useRef(null);
  useEffect(() => {
    const el = formRef.current?.querySelector("input,select,textarea,button");
    if (el) el.focus();
  }, []);

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-4"
    >
      <FilmmakerForm value={value} onChange={onChange} hasError={!!error} />
      <div className="flex justify-end pt-2">
        <SubmitButton loading={submitting}>
          {t("participate.saveFilmmaker")}
        </SubmitButton>
      </div>
      {error && (
        <p
          role="status"
          aria-live="polite"
          className="mt-2 rounded-md border border-red-500/60 bg-red-950/40 px-3 py-2 text-xs text-red-200"
        >
          {error}
        </p>
      )}
    </form>
  );
}
