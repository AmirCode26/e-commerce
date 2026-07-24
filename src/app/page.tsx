"use client";
import { Astroid } from "lucide-react";
import Image from "next/image";
import { Lobster_Two } from "next/font/google";
import { cn } from "@/lib/utils";
import Anchor_card from "@/components/ui/cards/Anchor_card";
import { useHomeContext } from "@/context/HomeContext";
const lobster_two = Lobster_Two({ weight: "400" });

export default function Home() {
  const { pages_anchors } = useHomeContext().navigateContext;
  return (
    <div className="w-screen min-h-dvh bg-[#faf0e7] flex flex-col md:grid md:grid-cols-2 md:h-dvh gap-6 md:gap-8 px-4 py-6 md:p-8 overflow-x-hidden">
      <div className={cn("w-full flex items-center justify-center gap-3 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-700 select-none text-center md:col-span-2", lobster_two.className)}>
        <Astroid className="shrink-0 w-5 h-5 md:w-7 md:h-7" color="var(--color-gray-900)" />
        <p>Aquí encontrarás todos nuestros productos en un solo lugar</p>
        <Astroid className="shrink-0 w-5 h-5 md:w-7 md:h-7" color="var(--color-gray-900)" />
      </div>

      <div className="flex items-center justify-center w-full md:row-span-3">
        <Image
          width={300} height={300}
          src="/assets/doritashop_logo.png" alt="Dorita Shop"
          className="w-40 h-40 md:w-full md:h-full max-w-[280px] object-contain rounded-xl md:border-4 md:border-stone-200 select-none"
        />
      </div>

      <div className="grid grid-cols-2 md:flex md:flex-col gap-3 md:gap-4 w-full md:row-span-3">
        {pages_anchors.map((item) => (
          <Anchor_card key={item.param} item={item} onClick={() => { window.location.href = `/catalogo?c=${item.param}`; }} />
        ))}
      </div>
    </div>
  );
}
