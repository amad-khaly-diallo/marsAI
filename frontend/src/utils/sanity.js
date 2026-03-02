export const getLocalized = (field, i18n) => {
    if (!field) return null;
    const lang = (i18n.language || 'fr').startsWith('en') ? 'en' : 'fr';
    return field[lang] || field.fr || field.en || null;
  };