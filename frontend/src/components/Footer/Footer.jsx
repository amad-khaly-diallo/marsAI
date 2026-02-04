export default function Footer() {
  return (
    <div className=" bg-blue-900 text-white">
      <div className="flex flex-wrap justify-center gap-6 mb-4 pt-4">
      <a href="/mentions-legales">Mentions légales</a>
      <a href="/contact">Contact</a>
    <a href="/privacy-policy">Politique de confidentialité</a>
    <a href="/terms-of-service">Conditions d'utilisation</a>
    </div>
    <div className=" p-4 text-white text-center">
      <p className="text-sm">© 2026 MarsAI. Tous droits réservés.</p> 
    </div>
    </div>
  );
}
