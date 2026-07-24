import { Molle } from "next/font/google";
import { cn } from "@/lib/utils";
import { Palette, MessageCircle, Truck } from "lucide-react";

const molle = Molle({ weight: "400", style: "italic" });

const pasos = [
  {
    icon: Palette,
    titulo: "1. Elige tu diseño",
    desc: "Explora el catálogo o envíanos tu propia idea para personalizar",
  },
  {
    icon: MessageCircle,
    titulo: "2. Ordena por WhatsApp",
    desc: "Confirma tu pedido y método de pago directamente con nosotros",
  },
  {
    icon: Truck,
    titulo: "3. Recibe en 48h",
    desc: "Entrega rápida y segura en Santo Domingo",
  },
];

function How_to() {
  return (
    <section className="how_to w-full h-[40vh] bg-violet-100 grid grid-rows-2 grid-cols-3 select-none">
      <h1
        className={cn(
          "text-6xl md:text-7xl text-violet-500 text-center leading-tight drop-shadow-lg col-span-3",
          molle.className,
        )}
      >
        ¿Cómo ordenar?
      </h1>

      {pasos.map((paso, i) => {
        const Icon = paso.icon;
        return (
          <div key={i} className="p-5">
            <div className="bg-amber-100 p-4 h-full shadow-lg rounded-lg flex flex-col">
              <h2 className="text-3xl text-gray-700 font-medium">
                {paso.titulo}
              </h2>
              <p className="text-gray-600 mt-2">{paso.desc}</p>
              <Icon
                className="text-gray-700 mt-auto self-center"
                size={80}
                strokeWidth={1.2}
              />
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default How_to;
