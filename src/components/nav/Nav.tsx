// components/Nav.tsx
"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { ShoppingCart, SquareDashed } from "lucide-react";
import Search_bar from "../ui/Search_bar";
import { useHomeContext } from "@/context/HomeContext";
import { Lobster_Two } from "next/font/google";
import Link from "next/link";
import { Mega_menu } from "./Mega_menu";
import Cart_view from "./Cart_view";

function Nav() {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [viewCart, setViewCart] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const { catalogContext } = useHomeContext();
  const { cart } = useHomeContext().cartContext;
  const { setQuery } = catalogContext;
  const exitFromMenu = () => setShopOpen(false);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 h-[20dvh] md:h-[16dvh] overflow-hidden">
        {/* Barra de anuncios */}
        <div className="h-[6dvh] md:h-[3dvh] w-full bg-amber-100 text-gray-900 text-xs md:text-sm text-center tracking-widest uppercase overflow-hidden">
          <span className="text-lg">
            <p className="hidden md:block">&nbsp;•&nbsp;Envío disponible en Toda República
              Dominicana&nbsp;•&nbsp;</p>
            <p className="blobk md:hidden">&nbsp;•&nbsp;Envío disponible en Todo RD&nbsp;•&nbsp;</p>
          </span>
        </div>

        {/* Nav principal */}
        <nav className="w-full bg-[#faf0e7] opacity-100 border-b border-stone-200 grid grid-cols-5 md:grid-cols-3 items-center px-10 h-[14dvh] md:h-[13dvh]">
          {/* Links izquierda */}
          <ul className="flex justify-center items-center md:grid md:grid-rows-2 gap-8 tracking-widest uppercase text-lg col-span-3 md:col-span-1 h-full w-full">
            <button
              className="relative cursor-pointer hover:underline underline-offset-4 h-0 hidden md:block md:h-auto "
              onClick={() => {
                clearTimeout(timeoutRef.current);
                setShopOpen(true);
              }}
            >
              <span className={cn(shopOpen && "underline underline-offset-4")}>
                INICIO
              </span>
            </button>

            <li className="h-full w-full row-span-2 md:row-span-1 flex justify-center items-center">
              <Search_bar onSearch={setQuery} />
            </li>
          </ul>

          {/* Logo centrado */}
            <Link
              className="flex justify-center items-center select-none"
              href="/"
            >
              <Image
                src="/assets/doritashop_logo.png"
                alt="dorita-shop-logo"
                width={100}
              height={100}
              className="hidden md:block"
              />
              <Image
                src="/assets/dorita_shop_D.svg"
                alt="dorita-shop-logo"
                width={60}
                height={60}
                className="block md:hidden"
              />
            </Link>

          {/* Carrito derecha */}
          <div className="flex items-center justify-center gap-5 h-30 py-2 select-none">
                <button
                  className="w-15 h-15 flex items-center justify-center rounded-full  hover:bg-[#faf0a0] hover:text-gray-900 transition-colors p-2 relative"
                  onClick={() => {
                    setViewCart(true);
                  }}
                >
                  <ShoppingCart size={100} />
                  <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] w-5.5 h-5.5 rounded-full flex items-center justify-center">
                    {cart.reduce((acc, p) => acc + p.quantity, 0)}
                  </span>
                </button>
              {/*
                //Antes estaba esto
                {cart.length <= 0? <div className={cn(lobster_two.className, "text-2xl flex justify-center items-center")}>
              <p className="m-2">Aun no hay nada aquí</p>
              <SquareDashed size={30} />
            </div> : <div className={cn(lobster_two.className, "text-2xl flex justify-center items-center")}>
              <p className="m-2">Tienes {cart.reduce((acc, p) => acc + p.quantity, 0)} productos aquí</p>
            </div>}*/}
          </div>
        </nav>
      </header>

      <Mega_menu
        setShopOpen={setShopOpen}
        shopOpen={shopOpen}
        exitFn={exitFromMenu}
      />
      {viewCart && <Cart_view onClose={() => setViewCart(false)} />}
    </>
  );
}

export default Nav;
