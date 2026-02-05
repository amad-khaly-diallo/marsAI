import { Link } from "react-router-dom";
import { Camera, Award, Globe  } from 'lucide-react'

export default function Home() {
  // Variables pour le Hero
  const hero = {
    title: "Bienvenue sur le Festival",
    gradientText: "marsAI",
    description:
      "Découvrez le premier festival mondial de courts-métrages générés par intelligence artificielle. Une célébration de la créativité augmentée et de l'innovation cinématographique.",
    primaryBtn: { text: "Soumettre un film", link: "/participer" },
    secondaryBtn: { text: "Découvrir nos partenaires", link: "/partenaires" },
  };

  // Variables pour Features
  const features = [
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Innovation créative",
      description:
        "Explorez les frontières de la création cinématographique avec l'intelligence artificielle.",
      bg: "bg-brand-accent/10",
      border: "border-brand-accent/50",
      shadow: "hover:shadow-brand-accent/10",
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Prix prestigieux",
      description:
        "Remportez des prix et faites reconnaître votre talent à l'échelle mondiale.",
      bg: "bg-brand-primary/10",
      border: "border-brand-border/50",
      shadow: "hover:shadow-brand-primary/10",
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "Communauté mondiale",
      description:
        "Rejoignez une communauté passionnée de créateurs et d'innovateurs du monde entier.",
      bg: "bg-brand-accent/10",
      border: "border-brand-accent/50",
      shadow: "hover:shadow-brand-accent/10",
    },
  ];

  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Section */}
      <section className="relative px-6 py-32 text-center">
        <div className="mx-auto max-w-5xl space-y-8">
          <h1 className="text-5xl font-bold tracking-tight text-brand-white md:text-7xl">
            {hero.title}
            <span className="block bg-gradient-to-r from-brand-primary to-brand-accent bg-clip-text text-transparent">
              {hero.gradientText}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-brand-muted md:text-xl">
            {hero.description}
          </p>

          <div className="flex flex-col items-center gap-4 pt-8 sm:flex-row sm:justify-center">
            <Link
              to={hero.primaryBtn.link}
              className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-8 py-4 text-base font-semibold text-brand-white shadow-lg shadow-brand-primary/30 transition-all duration-300 hover:text-brand-white hover:scale-105"
            >
              {hero.primaryBtn.text}
            </Link>
            <Link
              to={hero.secondaryBtn.link}
              className="inline-flex items-center justify-center rounded-lg border border-brand-primary bg-brand-primary/10 px-8 py-4 text-base font-semibold text-brand-primary-soft backdrop-blur-sm transition-all duration-300 hover:bg-brand-primary hover:text-brand-white hover:shadow-lg hover:shadow-brand-primary/50 hover:scale-105"
            >
              {hero.secondaryBtn.text}
            </Link>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-brand-primary/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-20 h-96 w-96 rounded-full bg-brand-accent/10 blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold tracking-wide text-brand-white md:text-4xl">
            Pourquoi participer ?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`group rounded-2xl border ${feature.border} bg-brand-surface/50 p-8 backdrop-blur-md transition-all duration-300 ${feature.shadow} hover:border-opacity-50`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${feature.bg}`}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="mb-3 text-xl font-semibold text-brand-white">
                  {feature.title}
                </h3>
                <p className="text-brand-muted leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
