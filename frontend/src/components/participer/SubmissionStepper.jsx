const steps = [
  { id: 1, label: "Réalisateur" },
  { id: 2, label: "Film" },
  { id: 3, label: "Déclaration IA" },
  { id: 4, label: "Collaborateurs" },
];

export default function SubmissionStepper({
  currentStep,
  filmmakerId,
  movieId,
  aiSaved,
  collaboratorsSaved,
}) {
  const statusFor = (step) => {
    if (step === 1) return filmmakerId ? "done" : "current";
    if (step === 2) return movieId ? "done" : currentStep === 2 ? "current" : "todo";
    if (step === 3) return aiSaved ? "done" : currentStep === 3 ? "current" : "todo";
    if (step === 4) return collaboratorsSaved ? "done" : currentStep === 4 ? "current" : "todo";
    return "todo";
  };

  return (
    <ol className="mb-6 flex flex-wrap items-center gap-3 text-xs">
      {steps.map((step) => {
        const status = statusFor(step.id);
        const isDone = status === "done";
        const isCurrent = status === "current";

        return (
          <li
            key={step.id}
            className="flex items-center gap-2 rounded-full bg-slate-950/40 px-3 py-1"
          >
            <span
              className={[
                "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold",
                isDone
                  ? "bg-brand-primary text-slate-900"
                  : isCurrent
                  ? "bg-slate-100 text-slate-900"
                  : "bg-slate-800 text-slate-300",
              ].join(" ")}
            >
              {isDone ? "✓" : step.id}
            </span>
            <span
              className={
                isDone
                  ? "text-brand-primary-soft"
                  : isCurrent
                  ? "text-slate-100"
                  : "text-slate-400"
              }
            >
              Étape {step.id} · {step.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

