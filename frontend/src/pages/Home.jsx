import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative px-6 py-32 text-center">
        <div className="mx-auto max-w-5xl space-y-8">
          <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl">
            Bienvenue sur le Festival
            <span className="block bg-gradient-to-r from-blue-500 to-blue-600 bg-clip-text text-transparent">
              marsAI
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-400 md:text-xl">
            Découvrez le premier festival mondial de courts-métrages générés par
            intelligence artificielle. Une célébration de la créativité
            augmentée et de l'innovation cinématographique.
          </p>

          <div className="flex flex-col items-center gap-4 pt-8 sm:flex-row sm:justify-center">
            <Link
              to="/participer"
              className="inline-flex items-center justify-center rounded-lg bg-blue-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:bg-blue-600 hover:shadow-blue-500/50 hover:scale-105"
            >
              Soumettre un film
            </Link>
            <Link
              to="/partenaires"
              className="inline-flex items-center justify-center rounded-lg border border-blue-500 bg-blue-500/10 px-8 py-4 text-base font-semibold text-blue-400 backdrop-blur-sm transition-all duration-300 hover:bg-blue-500 hover:text-white hover:shadow-lg hover:shadow-blue-500/50 hover:scale-105"
            >
              Découvrir nos partenaires
            </Link>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-wide text-white md:text-4xl">
            Pourquoi participer ?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-md transition-all duration-300 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                <span className="text-2xl">🎬</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Innovation créative
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Explorez les frontières de la création cinématographique avec
                l'intelligence artificielle.
              </p>
            </div>

            <div className="group rounded-2xl border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-md transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
                <span className="text-2xl">🏆</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Prix prestigieux
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Remportez des prix et faites reconnaître votre talent à
                l'échelle mondiale.
              </p>
            </div>

            <div className="group rounded-2xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-md transition-all duration-300 hover:border-blue-600/50 hover:shadow-lg hover:shadow-blue-600/10">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-600/10">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-white">
                Communauté mondiale
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Rejoignez une communauté passionnée de créateurs et
                d'innovateurs du monde entier.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
