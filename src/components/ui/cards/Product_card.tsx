"use client";
import { ProductCardProps } from "@/types/Product.mjs";
import Image from "next/image";
import { Lobster_Two } from "next/font/google";
import { cn } from "@/lib/utils";
const lobster_two = Lobster_Two({ weight: "400" });

export default function ProductCard({ image, title, onClick, stock, needStock }: ProductCardProps) {
  const agotado = needStock ? stock === 0 : false;
  return (
    <button
      className={cn(
        "product_card py-2 px-3 md:px-4 shrink-0 w-full h-64 md:h-75 hover:cursor-pointer transition-all",
        agotado ? "bg-stone-200 opacity-60 grayscale" : "bg-[#faf0d7]"
      )}
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-xs overflow-hidden">
        <Image src={image} alt={title} fill quality={75} className="object-cover" />
        {agotado && (
          <div className="absolute top-2 left-2 bg-stone-700/80 text-white text-[10px] tracking-widest uppercase px-2 py-0.5">
            Agotado
          </div>
        )}
        <h1 className={cn("text-center text-sm md:text-lg bg-[#faf0d7] w-full absolute bottom-0 px-1 truncate", lobster_two.className)}>
          {title}
        </h1>
      </div>
    </button>
  );
}
