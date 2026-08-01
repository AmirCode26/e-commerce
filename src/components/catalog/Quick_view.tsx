// /src/components/catalog/Quick_view.tsx

"use client";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { ProductCardProps } from "@/types/Product.mjs";
import { useState, useEffect } from "react";
import { useHomeContext } from "@/context/HomeContext";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface QuickViewProps {
  product: ProductCardProps;
  onClose: () => void;
}

function Quick_view({ product, onClose }: QuickViewProps) {
  const [visible, setVisible] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(1);
  const { cart, addToCart, removeFromCart, updateQuantity } =
    useHomeContext().cartContext;

  const itemEnCarrito = cart.find((item) => item.id === product.id);
  const enCarrito = !!itemEnCarrito;
  const stockDisponible = product.needStock ? product.stock : Infinity;
  const cantidadEnCarrito = itemEnCarrito?.quantity ?? 0;
  const puedeAgregarMas = cantidadEnCarrito < stockDisponible;
  const mensajeWhatsAppDirecto = `¡Hola buenas! Quisiera saber la cotización para "${product.title}" x${localQuantity} en Dorita Shop.\nPrecio referencia: RD$${product.price * localQuantity}`;

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") handleClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 z-120 transition-opacity duration-200 ${
          visible ? "bg-black/50" : "bg-black/0"
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`fixed left-0 w-full h-[75dvh] md:h-[50dvh] z-150 bg-[#faf0d7] grid grid-cols-1 grid-rows-7 md:grid-cols-2 md:grid-rows-1 transition-all duration-300 ${
          visible ? "top-[25dvh] opacity-100" : "bottom-0 opacity-0"
        }`}
      >
        <button
          onClick={handleClose}
          className="z-50 absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition-colors"
        >
          <X size={20} />
        </button>
        {/* Imagen con blur */}
        <div className="relative w-full  h-[21dvh] md:h-full overflow-hidden row-span-2">
          <Image
            src={product.image}
            alt={product.title}
            fill
            quality={50}
            className="object-cover blur-2xl scale-110"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute h-full inset-0 flex items-center justify-center p-6">
            <Image
              src={product.image}
              alt={product.title}
              fill
              quality={90}
              className="object-contain h-full"
            />
          </div>
        </div>

        {/* Info */}
        <div className="grid justify-center items-end text-right gap-3 p-8 overflow-y-auto row-span-5">
          <h2 className="text-3xl font-medium text-gray-900">
            {product.title}
          </h2>
          <p className="text-gray-600 text-sm">{product.desc}</p>
          <span className="text-2xl text-gray-900">RD${product.price}</span>

          {/* Control de cantidad — solo local hasta que se agregue al carrito */}
          <div className="flex items-center gap-3 mt-1">
            {enCarrito && (
              <button
                onClick={() => removeFromCart(product.id)}
                className="p-1.5 hover:bg-red-100 text-red-500 rounded-full transition-colors"
              >
                <Trash2 size={16} />
              </button>
            )}
            <button
              onClick={() => {
                if (enCarrito) {
                  updateQuantity(product.id, itemEnCarrito.quantity - 1);
                } else {
                  setLocalQuantity((q) => Math.max(1, q - 1));
                }
              }}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
            >
              <Minus size={16} />
            </button>

            <span className="text-lg font-medium w-6 text-center">
              {enCarrito ? itemEnCarrito.quantity : localQuantity}
            </span>

            <button
              onClick={() => {
                if (enCarrito) {
                  if (puedeAgregarMas) updateQuantity(product.id, itemEnCarrito.quantity + 1);
                } else {
                  if (localQuantity < stockDisponible) setLocalQuantity((q) => q + 1);
                }
              }}
              disabled={enCarrito ? !puedeAgregarMas : localQuantity >= stockDisponible}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors disabled:opacity-30"
            >
              <Plus size={16} />
            </button>
          </div>

          <span className="text-xs text-gray-400">
            Subtotal: RD${product.price * (enCarrito ? itemEnCarrito.quantity : localQuantity)}
          </span>
          {stockDisponible > 0 ? (
            <span className="text-xs text-green-600">
              {stockDisponible !== Infinity ? stockDisponible : ""} Disponibles
            </span>
          ) : (
            <span className="text-xs text-red-400">
              Sin stock — puedes consultar por WhatsApp
            </span>
          )}

          {/* Botón agregar al carrito */}
          <button
            onClick={() => {
              if (!enCarrito && stockDisponible > 0) {
                const cantidad = Math.min(localQuantity, stockDisponible);
                for (let i = 0; i < cantidad; i++) addToCart(product);
              }
            }}
            disabled={enCarrito || stockDisponible === 0}
            className="mt-2 px-8 py-3 bg-gray-900 text-amber-100 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {enCarrito ? "En el carrito ✓" : stockDisponible === 0 ? "Sin stock" : "Añadir al carrito"}
          </button>

          {/* Botón WhatsApp directo — independiente del carrito */}
          <Link
            className={cn(
              "mt-1 px-8 py-3 uppercase tracking-widest text-sm transition-colors text-gray-900",
              stockDisponible > 0
                ? "bg-green-400 hover:bg-green-600"
                : "bg-stone-300 hover:bg-stone-400"
            )}
            target="_blank"
            rel="noopener noreferrer"
            href={`https://wa.me/18294973428?text=${encodeURIComponent(
              stockDisponible > 0
                ? `¡Hola buenas! Quisiera saber la cotización para "${product.title}" x${localQuantity} en Dorita Shop.\nPrecio referencia: RD$${product.price * localQuantity}`
                : `¡Hola buenas! Quisiera consultar sobre la disponibilidad de "${product.title}" en Dorita Shop. ¿Cuándo habrá stock?`
            )}`}
          >
            {stockDisponible > 0 ? "Pedir por WhatsApp" : "Consultar disponibilidad"}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Quick_view;
