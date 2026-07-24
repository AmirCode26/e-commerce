// /src/app/page_components/Catalog.tsx
"use client";
import { useState } from "react";
import ProductCard from "@/components/ui/cards/Product_card";
import { ProductCardProps } from "@/types/Product.mjs";
import Quick_view from "@/components/catalog/Quick_view";
import { useHomeContext } from "@/context/HomeContext";
import { Lobster_Two } from "next/font/google";
import { cn } from "@/lib/utils";
const lobster_two = Lobster_Two({ weight: "400" });

const categorias = ["Todos", "Camisetas", "Tazas", "Termos"];



function Catalog() {
  const {catalogContext} = useHomeContext();
  const {productos, query} = catalogContext;
  const [categoriaActiva, setCategoriaActiva] = useState("Todos");
  const [selectedProduct, setSelectedProduct] = useState<ProductCardProps | null>(null);

   const normalizar = (texto: string) =>
     texto
       .toLowerCase()
       .normalize("NFD")
       .replace(/[\u0300-\u036f]/g, "") // quita acentos
       .replace(/ñ/g, "n");             // ñ → n

   const filtrados = productos?.filter((p) => {
     const coincideCategoria =
       categoriaActiva === "Todos" || p.category === categoriaActiva;
     const coincideBusqueda =
       normalizar(p.title).includes(normalizar(query)) ||
       normalizar(p.category).includes(normalizar(query)) ||
       normalizar(p.desc).includes(normalizar(query)) ||
       (p.keys?.some((k) => normalizar(k).includes(normalizar(query))) ?? false);
     return coincideCategoria && coincideBusqueda;
   });
  return (
    <section id="catalog" className="w-screen mt-[20dvh] md:mt-0 p-2 md:p-4 flex flex-col gap-4 md:gap-6">
      {/* Barra superior: búsqueda + filtros */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className={cn("text-2xl",lobster_two.className)}>
          Nuestro Catálogo
        </div>
        <ul className="flex gap-2 flex-wrap">

          {categorias.map((cat) => (
            <li
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`px-4 py-1.5 text-lg tracking-widest uppercase cursor-pointer border transition-colors ${
                categoriaActiva === cat
                  ? "bg-gray-900 text-amber-100 border-gray-900"
                  : "bg-white text-gray-600 border-gray-300 hover:border-gray-900"
              }`}
            >
              {cat}
            </li>
          ))}
        </ul>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4 p-2">
        {(filtrados?.length) > 0 ? (
          filtrados?.map((p, i) => <ProductCard key={i} {...p} onClick={() => setSelectedProduct(p)}/>)
        ) : (
          <p className="col-span-full text-center text-gray-400 py-20 tracking-widest uppercase text-sm">
            No se encontraron productos
          </p>
        )}
      </div>
      {/* Quick View popup */}
            {selectedProduct && (
              <Quick_view
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
              />
            )}
    </section>
  );
};

export default Catalog;
