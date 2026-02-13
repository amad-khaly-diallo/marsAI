import { useTranslation } from "react-i18next";

export default function useParticiperValidation() {
  const { t } = useTranslation();

  const validateFilmmaker = (f) => {
    if (
      !f.first_name ||
      !f.first_name.trim() ||
      !f.last_name ||
      !f.last_name.trim()
    ) {
      return t("error.filmmaker.namePair.required");
    }
    if (!f.birth_date) return t("error.filmmaker.birthDate.required");
    if (!f.email) return t("error.filmmaker.email.invalid");
    if (
      f.mobile &&
      f.mobile.trim().length > 0 &&
      !/^[0-9+().\s-]{6,20}$/.test(f.mobile)
    ) {
      return t("error.filmmaker.mobile.invalid");
    }
    if (f.city && f.city.length > 80) return t("error.filmmaker.city.tooLong");
    if (f.country && f.country.length > 80)
      return t("error.filmmaker.country.tooLong");
    return null;
  };

  const validateMovie = (m) => {
    if (!m.original_title || !m.original_title.trim())
      return t("error.movie.originalTitle.required");
    if (!m.english_title || !m.english_title.trim())
      return t("error.movie.englishTitle.required");
    const durationNumber = Number(m.duration);
    // duration is expressed in minutes (0 < duration <= 1)
    if (
      !Number.isFinite(durationNumber) ||
      durationNumber <= 0 ||
      durationNumber > 1
    )
      return t("error.movie.duration.range");
    if (m.youtube_url && m.youtube_url.length > 0) {
      try {
        // basic URL check
        // eslint-disable-next-line no-new
        new URL(m.youtube_url);
      } catch {
        return t("error.movie.youtube.invalid");
      }
    }
    return null;
  };

  const validateAiDeclaration = (d) => {
    if (!d.artwork_type) return t("error.ai.artworkType.required");
    if (!d.methodology || d.methodology.trim().length < 30)
      return t("error.ai.methodology.min");
    return null;
  };

  const validateCollaborators = (list) => {
    if (!Array.isArray(list)) return null;
    for (const collab of list) {
      const hasAnyField =
        (collab.first_name && collab.first_name.trim()) ||
        (collab.last_name && collab.last_name.trim()) ||
        (collab.role && collab.role.trim()) ||
        (collab.email && collab.email.trim());
      if (!hasAnyField) continue;
      if (
        !collab.first_name ||
        !collab.first_name.trim() ||
        !collab.last_name ||
        !collab.last_name.trim()
      ) {
        return t("error.collaborators.name.required");
      }
      if (!collab.role || !collab.role.trim())
        return t("error.collaborators.role.required");
      if (
        collab.email &&
        collab.email.trim().length > 0 &&
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(collab.email)
      ) {
        return t("error.collaborators.email.invalid");
      }
    }
    return null;
  };

  return {
    validateFilmmaker,
    validateMovie,
    validateAiDeclaration,
    validateCollaborators,
  };
}
