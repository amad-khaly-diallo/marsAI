import Phase3Winners from '../components/home/Phase3/Phase3Winners';
import SEOHead from '../components/seo/SEOHead';
import { winnersPageSchema } from '../components/seo/schemas';

/**
 * Page dédiée Grand Prix (également intégrée en Phase 3 sur la page d'accueil).
 */
export default function Winners() {
  return (
    <>
      <SEOHead
        title="Palmarès — Grand Prix"
        description="Découvrez les lauréats et films primés de l'édition 2026 du festival marsAI. Grand Prix, sélections officielles et distinctions du jury."
        canonical="/winners"
        schema={winnersPageSchema()}
      />
      <Phase3Winners />
    </>
  );
}
