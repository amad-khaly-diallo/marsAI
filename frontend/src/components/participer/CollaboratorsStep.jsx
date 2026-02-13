import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import CollaboratorsForm from "../../components/forms/CollaboratorsForm";
import SubmitButton from "../../components/ui/SubmitButton";

export default function CollaboratorsStep({
  value,
  onChange,
  onBack,
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
      className="mt-4 space-y-4"
    >
      <CollaboratorsForm value={value} onChange={onChange} hasError={!!error} />
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-brand-muted hover:text-brand-primary-soft"
        >
          {t("participate.backStep", { step: 4 })}
        </button>
        <SubmitButton loading={submitting}>
          {t("participate.finalize")}
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
