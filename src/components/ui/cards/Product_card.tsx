"use client";
import { ProductCardProps } from "@/types/Product.mjs";
import Image from "next/image";
import { Lobster_Two } from "next/font/google";
import { cn } from "@/lib/utils";
const lobster_two = Lobster_Two({ weight: "400" });

export default function ProductCard({ image, title, onClick }: ProductCardProps) {
  return (
    <button
      className="product_card py-2 bg-[#faf0d7] px-4 shrink-0 w-full h-75 hover:cursor-pointer"
      onClick={onClick}
    >
      <div className="relative w-full h-full rounded-xs overflow-hidden">
        <Image src={image} alt="" fill quality={75} />
        <h1 className={cn("text-center text-lg bg-[#faf0d7] w-full absolute bottom-0", lobster_two.className)}>{title}</h1>
      </div>
    </button>
  );
}
