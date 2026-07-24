"use client";
import { X, Home, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useHomeContext } from "@/context/HomeContext";

interface SideProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

function Side({ open, setOpen }: SideProps) {
  const { pages_anchors } = useHomeContext().navigateContext;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => setVisible(true), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 200);
  };

  if (!open) return null;

  return (
    <div className="md:hidden">
      <div
        className={cn(
          "fixed inset-0 z-[101] bg-black/50 transition-opacity duration-200",
          visible ? "opacity-100" : "opacity-0",
        )}
        onClick={handleClose}
      />
      <aside
        className={cn(
          "fixed top-0 left-0 h-dvh w-[78vw] max-w-[300px] z-[102] bg-[#faf0e7] shadow-lg flex flex-col transition-transform duration-300",
          visible ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-200">
          <span className="text-sm tracking-widest uppercase font-medium text-gray-700">Menú</span>
          <button onClick={handleClose} className="p-1.5 hover:bg-gray-200 rounded-full transition-colors">
            <X size={22} />
          </button>
        </div>

        <nav className="flex flex-col p-3 gap-1 overflow-y-auto">
          <Link href="/" onClick={handleClose} className="flex items-center gap-3 px-3 py-3 text-sm tracking-widest uppercase text-gray-700 hover:bg-amber-50 transition-colors">
            <Home size={20} className="text-gray-600 shrink-0" />
            Inicio
          </Link>
          <Link href="/catalogo" onClick={handleClose} className="flex items-center gap-3 px-3 py-3 text-sm tracking-widest uppercase text-gray-700 hover:bg-amber-50 transition-colors">
            <LayoutGrid size={20} className="text-gray-600 shrink-0" />
            Catálogo completo
          </Link>

          <div className="h-px bg-stone-200 my-2" />

          {pages_anchors.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.param}
                href={`/catalogo?c=${item.param}`}
                onClick={handleClose}
                className="flex items-center gap-3 px-3 py-3 text-sm tracking-widest uppercase text-gray-700 hover:bg-amber-50 transition-colors"
              >
                <Icon size={20} className="text-gray-600 shrink-0" strokeWidth={1.2} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
export default Side;
