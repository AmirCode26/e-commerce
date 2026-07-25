"use client";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Dispatch, SetStateAction } from "react";
import Anchor_card from "../ui/cards/Anchor_card";
import { useHomeContext } from "@/context/HomeContext";

export function Mega_menu({
  shopOpen,
  setShopOpen,
  exitFn,
}: {
  shopOpen: boolean;
  setShopOpen: Dispatch<SetStateAction<boolean>>;
  exitFn: () => void;
}) {
  const { pages_anchors } = useHomeContext().navigateContext;
  return (
    <div
      className={cn(
        "z-100 fixed top-[20dvh] md:top-[16dvh] left-0 w-full bg-[#faf0e7dd] border-b overflow-hidden transition-all duration-300",
        shopOpen ? "h-[80dvh] md:h-[84dvh] pointer-events-auto" : "h-0 opacity-0 pointer-events-none",
      )}
    >
      <h1 className="hidden md:block text-2xl lg:text-4xl font-bold text-gray-700 absolute top-[10%] left-1/2 -translate-x-1/2 text-center px-4 whitespace-nowrap">
        Visita todos nuestros productos disponibles
      </h1>
      <button className="rounded-full absolute top-4 left-4 hover:bg-amber-100 p-2 transition-colors" onClick={exitFn}>
        <X size={28} />
      </button>
      <div className="h-full flex items-center justify-center px-6 md:px-16">
        <div className="grid grid-cols-4 gap-4 md:gap-6 w-full max-w-4xl">
          {pages_anchors.map((item) => (
            <Anchor_card
              key={item.param}
              item={item}
              onClick={() => {
                setShopOpen(false);
                window.location.href = `/catalogo?c=${item.param}`;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
