// src/app/catalogo/page.tsx

import { Suspense } from "react";
import Template from "@/components/ui/Template";
import Main_page from "../page_components/Main_page";

export default function CatalogoPage() {
  return (
    <Template>
      <Suspense fallback={
        <div className="w-full mt-[20dvh] md:mt-0 p-4 text-center text-gray-400 tracking-widest uppercase text-sm">
          Cargando catálogo...
        </div>
      }>
        <Main_page />
      </Suspense>
    </Template>
  );
}
