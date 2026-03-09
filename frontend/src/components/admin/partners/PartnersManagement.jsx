import { useState } from 'react';
import { SectionHeader, ErrorAlert, SectionCard } from '../common';
import { usePartners } from '../hooks';
import PartnerCreateForm from './PartnerCreateForm';
import PartnersTable from './PartnersTable';
import { uploadImage } from '../../../services/uploadService';

const INITIAL_FORM = {
  name: '',
  website_url: '',
  logo_url: '',
  description: '',
};

export default function PartnersManagement() {
  const { partners, loading, error, setPartners, refetch } = usePartners();
  const [creating, setCreating] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [logoUploading, setLogoUploading] = useState(false);
  const [logoUploadError, setLogoUploadError] = useState(null);

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
        await admin.updatePartner(editingId, form);
      } else {
        await admin.createPartner(form);
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

  const handleLogoFileChange = async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setLogoUploadError(null);
    setLogoUploading(true);
    try {
      const res = await uploadImage(file);
      setForm((prev) => ({ ...prev, logo_url: res.url || res.Location || '' }));
    } catch (err) {
      setLogoUploadError(err.message || 'Erreur upload logo');
    } finally {
      setLogoUploading(false);
    }
  };

  const handleEdit = (partner) => {
    setCreateError(null);
    setEditingId(partner.id);
    setForm({
      name: partner.name || '',
      website_url: partner.website_url || '',
      logo_url: partner.logo_url || '',
      description: partner.description || '',
    });
    setCreating(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Supprimer ce partenaire ?')) return;
    setDeletingId(id);
    try {
      const admin = require('../../../services/admin').default;
      await admin.deletePartner(id);
      setPartners((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setCreateError(err.message);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Gestion des partenaires"
        subtitle="Suivez les partenaires confirmés, en discussion et leurs niveaux d'engagement."
      />
      <SectionCard
        title="Partenaires"
        action={
          <button
            type="button"
            onClick={() => setCreating((v) => !v)}
            className="inline-flex items-center rounded-full bg-brand-primary px-3 py-1.5 text-xs font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent"
          >
            {creating ? 'Annuler' : '+ Nouveau partenaire'}
          </button>
        }
      >
        <ErrorAlert message={error} className="mb-3" />
        <PartnerCreateForm
          form={form}
          onChange={handleChange}
          onSubmit={handleCreate}
          loading={createLoading}
          error={createError}
          onCancel={() => setCreating(false)}
          isOpen={creating}
          onLogoFileChange={handleLogoFileChange}
          logoUploading={logoUploading}
          logoUploadError={logoUploadError}
        />
        <PartnersTable
          partners={partners}
          loading={loading}
          deletingId={deletingId}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </SectionCard>
    </div>
  );
}
