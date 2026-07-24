"use client";
import ProductCard from "@/components/ui/cards/Product_card";
import { ProductCardProps } from "@/types/Product.mjs";
import { useState } from "react";
import Image from "next/image";
import { useHomeContext } from "@/context/HomeContext";



export default function Products() {
  const catalogContext = useHomeContext().catalogContext;
  const { productos } = catalogContext;
  const [currentProduct, setCurrentProduct] = useState<ProductCardProps>(
    productos[0],
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSelect = (p: ProductCardProps) => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentProduct(p);
      setIsAnimating(false);
    }, 150);
  };

  return (
    <section
      id="catalog"
      className="h-screen w-full mb-3 grid overflow-x-auto gap-2 bg-white py-2"
    >
      <div className="w-full bg-amber-100 text-gray-900 text-3xl italic flex justify-center items-center py-2 tracking-widest uppercase overflow-hidden">
        <span>Productos</span>
      </div>
      <article className="overflow-hidden">
        <div className="flex gap-3 animate-scroll">
          {[...productos, ...productos].map((p, i) => (
            <ProductCard key={i} {...p} onClick={() => handleSelect(p)} />
          ))}
        </div>
      </article>
      {/* Quick View */}
      <article className="h-[70vh] md:h-[50vh] bg-amber-100 grid grid-cols-1 grid-rows-3 md:grid-rows-1 md:grid-cols-2 gap-6 p-6">
        <div
          className={`relative w-full h-full overflow-hidden transition-all duration-150 row-span-2 md:row-span-1${
            isAnimating ? "opacity-0 scale-95" : "opacity-100 scale-100"
          }`}
        >
          <Image
            src={currentProduct.image}
            alt={currentProduct.title}
            fill
            quality={90}
            className="object-cover blur-xl absolute inset-0"
          />
          <Image
            src={currentProduct.image}
            alt={currentProduct.title}
            fill
            quality={90}
            className="object-contain"
          />
        </div>
        <div
          className={`flex flex-col justify-center gap-3 transition-all duration-150 ${
            isAnimating
              ? "opacity-0 translate-y-2"
              : "opacity-100 translate-y-0"
          }`}
        >
          <h2 className="text-3xl font-medium">{currentProduct.title}</h2>
          <p className="text-gray-700">{currentProduct.desc}</p>
          <span className="text-2xl text-gray-900">
            RD${currentProduct.price}
          </span>
          <button className="mt-4 w-fit px-8 py-3 bg-gray-900 text-amber-100 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors">
            Pedir por WhatsApp
          </button>
        </div>
      </article>
    </section>
  );
}
