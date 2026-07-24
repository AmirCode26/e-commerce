"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, ShoppingCart } from "lucide-react";
import Search_bar from "../ui/Search_bar";
import { useHomeContext } from "@/context/HomeContext";
import Link from "next/link";
import { Mega_menu } from "./Mega_menu";
import Cart_view from "./Cart_view";
import Side from "../side/Side";

function Nav() {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [viewCart, setViewCart] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const { catalogContext } = useHomeContext();
  const { cart } = useHomeContext().cartContext;
  const { setQuery } = catalogContext;
  const exitFromMenu = () => setShopOpen(false);

  return (
    <>
      <header className="absolute top-0 left-0 w-full z-50 h-[20dvh] md:h-[16dvh] overflow-hidden">
        <div className="h-[6dvh] md:h-[3dvh] w-full bg-amber-100 text-gray-900 text-xs md:text-sm text-center tracking-widest uppercase overflow-hidden flex items-center justify-center px-2">
          <span>
            <span className="hidden md:inline">&nbsp;•&nbsp;Envío disponible en Toda República Dominicana&nbsp;•&nbsp;</span>
            <span className="inline md:hidden">&nbsp;•&nbsp;Envío disponible en Todo RD&nbsp;•&nbsp;</span>
          </span>
        </div>

        <nav className="w-full bg-[#faf0e7] border-b border-stone-200 flex md:grid md:grid-cols-3 items-center gap-2 px-3 md:px-10 h-[14dvh] md:h-[13dvh]">
          <button
            className="md:hidden shrink-0 p-2 rounded-full hover:bg-amber-100 transition-colors"
            onClick={() => setSideOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu size={24} className="text-gray-700" />
          </button>

          <ul className="hidden md:grid md:grid-rows-2 gap-8 tracking-widest uppercase text-lg h-full w-full">
            <button
              className="relative cursor-pointer hover:underline underline-offset-4"
              onClick={() => {
                clearTimeout(timeoutRef.current);
                setShopOpen(true);
              }}
            >
              <span className={cn(shopOpen && "underline underline-offset-4")}>INICIO</span>
            </button>
            <li className="h-full w-full flex justify-center items-center">
              <Search_bar onSearch={setQuery} />
            </li>
          </ul>

          <div className="flex md:hidden flex-1 min-w-0 items-center">
            <Search_bar onSearch={setQuery} />
          </div>

          <Link className="flex justify-center items-center select-none shrink-0" href="/">
            <Image src="/assets/doritashop_logo.png" alt="dorita-shop-logo" width={100} height={100} className="hidden md:block" />
            <Image src="/assets/dorita_shop_D.svg" alt="dorita-shop-logo" width={40} height={40} className="block md:hidden" />
          </Link>

          <div className="flex items-center justify-center shrink-0 select-none">
            <button
              className="w-11 h-11 md:w-16 md:h-16 flex items-center justify-center rounded-full hover:bg-[#faf0a0] hover:text-gray-900 transition-colors relative"
              onClick={() => setViewCart(true)}
              aria-label="Ver carrito"
            >
              <ShoppingCart className="w-6 h-6 md:w-9 md:h-9" />
              <span className="absolute top-0 right-0 bg-gray-900 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center">
                {cart.reduce((acc, p) => acc + p.quantity, 0)}
              </span>
            </button>
          </div>
        </nav>
      </header>

      <Mega_menu setShopOpen={setShopOpen} shopOpen={shopOpen} exitFn={exitFromMenu} />
      <Side open={sideOpen} setOpen={setSideOpen} />
      {viewCart && <Cart_view onClose={() => setViewCart(false)} />}
    </>
  );
}
export default Nav;
