import { Page_anchor } from "@/types/Page_anchor.mjs";

function Anchor_card({ item, onClick }: { item: Page_anchor ; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <button
      className="w-full h-20 sm:min-h-30 sm:h-[17vh] sm:max-h-40 bg-white border border-stone-200 hover:bg-amber-50 hover:border-amber-300 hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center gap-3 shadow-sm p-6"
      onClick={onClick}
    >
      <Icon size={40} className="text-gray-600" strokeWidth={1.2} />
      <span className="text-xs sm:text-sm tracking-widest uppercase font-medium text-gray-700 text-center">
        {item.label}
      </span>
      <span className="text-[0.6rem] sm:text-xs text-gray-400 text-center">
        {item.desc}
      </span>
    </button>
  );
};

export default Anchor_card;
