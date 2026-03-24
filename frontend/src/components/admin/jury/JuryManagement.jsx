import { useState } from 'react';
import { SectionHeader, ErrorAlert, SectionCard } from '../common';
import { useJury } from '../hooks';
import JuryCreateForm from './JuryCreateForm';
import JuryTable from './JuryTable';
import { uploadImage } from '../../../services/uploadService';

const INITIAL_FORM = {
  first_name: '',
  last_name: '',
  role: '',
  bio: '',
  photo_url: '',
};

export default function JuryManagement() {
  const { members, loading, error, setMembers, refetch } = useJury();
  const [creating, setCreating] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [photoUploading, setPhotoUploading] = useState(false);
  const [photoUploadError, setPhotoUploadError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setCreateError(null);
    setCreateLoading(true);
    try {
      const admin = require('../../../services/admin').default;
      if (editingId) {
        await admin.updateJuryMember(editingId, form);
      } else {
        await admin.createJuryMember(form);
      }
      setForm(INITIAL_FORM);
      setCreating(false);
      setEditingId(null);
      refetch();
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setCreateLoading(false);
    }
  };

  const handlePhotoFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setPhotoUploadError(null);
    setPhotoUploading(true);
    try {
      const res = await uploadImage(file);
      setForm((prev) => ({
        ...prev,
        photo_url: res.url || res.Location || '',
      }));
    } catch (err) {
      setPhotoUploadError(err.message || 'Erreur upload image');
    } finally {
      setPhotoUploading(false);
    }
  };

  const handleEdit = (member) => {
    setCreateError(null);
    setEditingId(member.id);
    setForm({
      first_name: member.first_name || '',
      last_name: member.last_name || '',
      role: member.role || '',
      bio: member.bio || '',
      photo_url: member.photo_url || '',
    });
    setCreating(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce membre du jury ?')) return;
    setDeletingId(id);
    try {
      const admin = require('../../../services/admin').default;
      await admin.deleteJuryMember(id);
      setMembers((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Gestion du jury"
        subtitle="Ajoutez les membres du jury, leurs bios et leurs spécialités."
      />
      <SectionCard
        title="Membres du jury"
        action={
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            {creating ? 'Annuler' : '+ Ajouter un juré'}
          </button>
        }
      >
        <ErrorAlert message={error} className="mb-3" />
        <JuryCreateForm
          form={form}
          onChange={handleChange}
          onSubmit={handleCreate}
          loading={createLoading}
          error={createError}
          onCancel={() => setCreating(false)}
          isOpen={creating}
          onPhotoFileChange={handlePhotoFileChange}
          photoUploading={photoUploading}
          photoUploadError={photoUploadError}
        />
        <JuryTable
          members={members}
          loading={loading}
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </SectionCard>
    </div>
  );
}
