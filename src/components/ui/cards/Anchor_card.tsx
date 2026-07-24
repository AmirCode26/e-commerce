import { Page_anchor } from "@/types/Page_anchor.mjs";

function Anchor_card({ item, onClick }: { item: Page_anchor; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <button
      className="w-full min-h-[96px] h-auto md:min-h-[120px] md:max-h-40 bg-white border border-stone-200 hover:bg-amber-50 hover:border-amber-300 hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-2 md:gap-3 shadow-sm p-3 md:p-6"
      onClick={onClick}
    >
      <Icon className="w-7 h-7 md:w-10 md:h-10 text-gray-600 shrink-0" strokeWidth={1.2} />
      <span className="text-xs md:text-sm tracking-widest uppercase font-medium text-gray-700 text-center leading-tight">
        {item.label}
      </span>
      <span className="hidden md:block text-xs text-gray-400 text-center">{item.desc}</span>
    </button>
  );
}
export default Anchor_card;
