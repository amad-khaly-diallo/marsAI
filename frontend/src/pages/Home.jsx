export default function Home() {
  return (
    <div className="p-8 text-center">
      <h2 className="text-3xl font-bold mb-4">
        Bienvenue sur le Festival marsAI
      </h2>
      <p className="mb-6">
        Découvrez le premier festival mondial de courts-métrages générés par IA
        !
      </p>
      <a
        href="/submission"
        className="bg-yellow-400 px-6 py-3 rounded font-bold hover:bg-yellow-500"
      >
        Participer
      </a>
    </div>
  );
}
