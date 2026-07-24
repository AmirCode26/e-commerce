"use client";

// Hero_sect.tsx
import Image from "next/image";
import { Molle } from "next/font/google";
import { cn } from "@/lib/utils";

const molle = Molle({ weight: "400", style: "italic" });

function Hero_sect() {
  return (
    <article className="relative w-full h-screen select-none">
      <Image
        fill
        quality={75} // 75 es suficiente, evita el warning
        priority
        alt="heroImg"
        src="/assets/heroImage.jpg"
        className="object-cover object-center"
      />
      {/* Overlay oscuro para que el texto respire */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4">
        <h1
          className={cn(
            "text-6xl md:text-7xl text-amber-100 text-center leading-tight drop-shadow-lg",
            molle.className,
          )}
        >
          Creando emociones,
          <br />
          Sublimando sueños
        </h1>
        {/* CTA */}
        <button
          className="mt-4 px-8 py-3 bg-amber-100 text-gray-900 font-medium tracking-widest uppercase text-sm hover:bg-amber-200 transition-all duration-200 hover:-translate-y-0.5"
          onClick={() => {
            document
              .getElementById("catalog")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          Ver catálogo
        </button>
      </div>
    </article>
  );
}

export default Hero_sect;
