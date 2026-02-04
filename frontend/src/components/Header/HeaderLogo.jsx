export default function HeaderLogo() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30">
        <span className="text-sm font-bold text-white">mAI</span>
      </div>
      <div className="flex flex-col leading-tight">
        <span className="font-display text-base font-semibold tracking-wide text-white">
          marsAI
        </span>
        <span className="text-[10px] tracking-wider uppercase text-gray-400">
          Festival AI Cinema
        </span>
      </div>
    </div>
  );
}
