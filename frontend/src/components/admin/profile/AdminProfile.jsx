import { useState, useEffect } from 'react';
import { SectionHeader, SectionCard, ErrorAlert } from '../common';
import { useAdmin } from '../../../contexts';
import adminService from '../../../services/admin';

export default function AdminProfile() {
  const { admin, reload } = useAdmin();
  const [profile, setProfile] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);
  const [profileSuccess, setProfileSuccess] = useState(null);

  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [passwordSuccess, setPasswordSuccess] = useState(null);

  useEffect(() => {
    if (!admin) return;
    setProfile({
      first_name: admin.first_name || '',
      last_name: admin.last_name || '',
      email: admin.email || '',
    });
  }, [admin]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordsChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError(null);
    setProfileSuccess(null);
    setProfileLoading(true);
    try {
      await adminService.updateCurrentAdminProfile(profile);
      setProfileSuccess('Profil mis à jour.');
      await reload();
    } catch (err) {
      setProfileError(err.message || 'Impossible de mettre à jour le profil.');
    } finally {
      setProfileLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!passwords.current_password || !passwords.new_password) {
      setPasswordError('Veuillez remplir tous les champs requis.');
      return;
    }
    if (passwords.new_password.length < 8) {
      setPasswordError('Le nouveau mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    if (passwords.new_password !== passwords.confirm_password) {
      setPasswordError('La confirmation ne correspond pas au nouveau mot de passe.');
      return;
    }

    setPasswordLoading(true);
    try {
      await adminService.changeCurrentAdminPassword({
        current_password: passwords.current_password,
        new_password: passwords.new_password,
      });
      setPasswordSuccess('Mot de passe mis à jour.');
      setPasswords({
        current_password: '',
        new_password: '',
        confirm_password: '',
      });
    } catch (err) {
      setPasswordError(err.message || 'Impossible de mettre à jour le mot de passe.');
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <SectionHeader
        title="Profil"
        subtitle="Gérez vos informations de compte et votre mot de passe."
      />

      <SectionCard title="Informations de profil">
        <form
          onSubmit={handleProfileSubmit}
          className="space-y-3 text-xs text-slate-100"
        >
          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-brand-muted">
                Prénom
              </label>
              <input
                type="text"
                name="first_name"
                value={profile.first_name}
                onChange={handleProfileChange}
                className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-brand-muted">
                Nom
              </label>
              <input
                type="text"
                name="last_name"
                value={profile.last_name}
                onChange={handleProfileChange}
                className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1 md:col-span-2">
              <label className="text-[11px] font-medium text-brand-muted">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-brand-muted">
                Rôle
              </label>
              <input
                type="text"
                value={admin?.role || ''}
                disabled
                className="rounded-md border border-slate-800 bg-slate-900/60 px-3 py-2 text-xs text-slate-400"
              />
            </div>
          </div>

          <ErrorAlert message={profileError} className="mt-1" />
          {profileSuccess && (
            <p className="text-[11px] text-emerald-300">{profileSuccess}</p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={profileLoading}
              className="inline-flex items-center rounded-full bg-brand-primary px-4 py-1.5 text-[11px] font-semibold text-slate-900 shadow-soft-sm hover:bg-brand-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {profileLoading ? 'Enregistrement...' : 'Mettre à jour le profil'}
            </button>
          </div>
        </form>
      </SectionCard>

      <SectionCard title="Mot de passe">
        <form
          onSubmit={handlePasswordSubmit}
          className="space-y-3 text-xs text-slate-100"
        >
          <div className="grid gap-3 md:grid-cols-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-brand-muted">
                Mot de passe actuel
              </label>
              <input
                type="password"
                name="current_password"
                value={passwords.current_password}
                onChange={handlePasswordsChange}
                className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-brand-muted">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="new_password"
                value={passwords.new_password}
                onChange={handlePasswordsChange}
                className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-medium text-brand-muted">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                name="confirm_password"
                value={passwords.confirm_password}
                onChange={handlePasswordsChange}
                className="rounded-md border border-slate-800 bg-slate-950/70 px-3 py-2 text-xs text-slate-100 outline-none"
              />
            </div>
          </div>

          <ErrorAlert message={passwordError} className="mt-1" />
          {passwordSuccess && (
            <p className="text-[11px] text-emerald-300">{passwordSuccess}</p>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={passwordLoading}
              className="inline-flex items-center rounded-full bg-slate-800 px-4 py-1.5 text-[11px] font-semibold text-slate-100 shadow-soft-sm hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {passwordLoading ? 'Mise à jour...' : 'Changer le mot de passe'}
            </button>
          </div>
        </form>
      </SectionCard>
    </div>
  );
}

