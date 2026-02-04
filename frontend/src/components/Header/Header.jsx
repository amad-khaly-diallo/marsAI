export default function Header() {
  return (
    <div className="header bg-blue-900 p-4 text-white flex gap-4 items-center left-4">
      <a href="/" className="nav-link">Accueil</a>
      <a href="/submission" className="nav-link">Soumission</a>
      <a href="/admin" className="nav-link">Admin</a>
      <a href="/Jury" className="nav-link">Jury</a>
      <a href="/about" className="nav-link">À propos</a>

    </div>
  );
}
