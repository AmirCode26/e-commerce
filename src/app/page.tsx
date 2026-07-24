"use client";
import { Astroid, Baby, Globe, Shirt } from "lucide-react";
import Image from "next/image";
import { Lobster_Two } from "next/font/google";
import { cn } from "@/lib/utils";
import Anchor_card from "@/components/ui/cards/Anchor_card";
import { useHomeContext } from "@/context/HomeContext";
const lobster_two = Lobster_Two({ weight: "400" });
export default function Home() {
  const { pages_anchors } = useHomeContext().navigateContext;

  return (
    <div className="z-100 fixed left-0 w-screen bg-[#faf0e7dd] border-b overflow-hidden transition-all duration-300 h-dvh pointer-events-auto grid grid-rows-3 grid-cols-1 sm:grid-rows-4 sm:grid-cols-2 gap-8">
        <div
          className={cn(
            "w-full px-2 gap-2 text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-700 select-none flex justify-center items-center text-center sm:col-span-2",
            lobster_two.className,
          )}
        >
          <div className="flex justify-end">
            <Astroid color="var(--color-gray-900)" />
          </div>
          <div className="flex justify-center">
            <p className="text-center">
              Aquí encontraras todos nuestros productos en un solo lugar
            </p>
          </div>
          <div className="flex justify-start">
            <Astroid color="var(--color-gray-900)" />
          </div>
        </div>
        {/* Logo grande izquierda */}
        <div className="flex items-center justify-center h-full sm:row-span-3">
          <Image
            width={300}
            height={300}
            src="/assets/doritashop_logo.png"
            alt="Dorita Shop"
            className="w-full h-auto max-w-md object-contain rounded-xl border-5 border-stone-200  select-none"
          />
        </div>

        {/* Cajitas verticales derecha */}
        <div className="p-4 w-full grid grid-cols-2 sm:flex sm:flex-col sm:px-[10v] gap-4 items-center justify-center h-full sm:row-span-3">
          {pages_anchors.map((item) => {
            return (
              <Anchor_card
                key={item.param}
                item={item}
                onClick={() => {
                  window.location.href = `/catalogo?c=${item.param}`;
                }}
              />
            );
          })}
        </div>
      </div>
  );
}
