import { FormField, ErrorAlert } from '../common';

export default function JuryCreateForm({
  form,
  onChange,
  onSubmit,
  loading,
  error,
  onCancel,
  isOpen,
  onPhotoFileChange,
  photoUploading,
  photoUploadError,
}) {
  if (!isOpen) return null;
  return (
    <form
      onSubmit={onSubmit}
      className="mb-4 grid gap-3 rounded-md border border-slate-800/80 bg-slate-950/40 px-3 py-3 text-xs md:grid-cols-2"
    >
      <FormField
        label="Prénom"
        name="first_name"
        value={form.first_name}
        onChange={onChange}
        required
      />
      <FormField
        label="Nom"
        name="last_name"
        value={form.last_name}
        onChange={onChange}
        required
      />
      <FormField
        label="Rôle / spécialité"
        name="role"
        value={form.role}
        onChange={onChange}
      />
      <div className="flex flex-col gap-1">
        <label className="text-[11px] font-medium text-brand-muted">
          Photo (upload)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={onPhotoFileChange}
          className="text-[11px] text-slate-200"
        />
        {photoUploading && (
          <p className="text-[11px] text-brand-muted">
            Upload de la photo en cours...
          </p>
        )}
        {photoUploadError && (
          <p className="text-[11px] text-red-300">{photoUploadError}</p>
        )}
        {form.photo_url && !photoUploading && (
          <p className="text-[11px] text-emerald-300 truncate">
            Photo enregistrée : {form.photo_url}
          </p>
        )}
      </div>
      <FormField
        label="URL de la photo (optionnel)"
        type="url"
        name="photo_url"
        value={form.photo_url}
        onChange={onChange}
      />
      <FormField
        label="Bio (courte)"
        name="bio"
        value={form.bio}
        onChange={onChange}
        rows={3}
        className="md:col-span-2"
      />
      <div className="md:col-span-2">
        <ErrorAlert message={error} />
      </div>
      <div className="md:col-span-2 flex justify-end gap-2 pt-1">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-full border border-slate-700 px-4 py-1.5 text-xs font-medium text-slate-300 hover:bg-slate-800"
        >
          Annuler
        </button>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center rounded-full bg-brand-primary px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? 'Création...' : 'Ajouter au jury'}
        </button>
      </div>
    </form>
  );
}
