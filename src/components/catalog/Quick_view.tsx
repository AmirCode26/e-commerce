"use client";
import Image from "next/image";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { ProductCardProps } from "@/types/Product.mjs";
import { useState, useEffect } from "react";
import { useHomeContext } from "@/context/HomeContext";

interface QuickViewProps {
  product: ProductCardProps;
  onClose: () => void;
}

function Quick_view({ product, onClose }: QuickViewProps) {
  const [visible, setVisible] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(1);
  const { cart, addToCart, removeFromCart, updateQuantity } = useHomeContext().cartContext;

  const itemEnCarrito = cart.find((item) => item.id === product.id);
  const enCarrito = !!itemEnCarrito;

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
        className={`fixed left-0 w-full h-[50vh] z-150 bg-[#faf0d7] grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 transition-all duration-300 ${
          visible ? "bottom-[25vh] opacity-100" : "bottom-0 opacity-0"
        }`}
      >
        {/* Imagen con blur */}
        <div className="relative w-full h-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            fill
            quality={50}
            className="object-cover blur-2xl scale-110"
          />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <Image
              src={product.image}
              alt={product.title}
              fill
              quality={90}
              className="object-contain"
            />
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center items-end text-right gap-3 p-8">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X size={20} />
          </button>

          <h2 className="text-3xl font-medium text-gray-900">{product.title}</h2>
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
                  updateQuantity(product.id, itemEnCarrito.quantity + 1);
                } else {
                  setLocalQuantity((q) => q + 1);
                }
              }}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>

          <span className="text-xs text-gray-400">
            Subtotal: RD${product.price * (enCarrito ? itemEnCarrito.quantity : localQuantity)}
          </span>

          {/* Botón agregar al carrito */}
          <button
            onClick={() => {
              if (!enCarrito) {
                // Agrega con la cantidad local que eligió
                for (let i = 0; i < localQuantity; i++) {
                  addToCart(product);
                }
              }
            }}
            disabled={enCarrito}
            className="mt-2 px-8 py-3 bg-gray-900 text-amber-100 uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {enCarrito ? "En el carrito ✓" : "Añadir al carrito"}
          </button>

          {/* Botón WhatsApp directo — independiente del carrito */}
<a
            className="mt-1 px-8 py-3 bg-green-400 text-gray-900 uppercase tracking-widest text-sm hover:bg-green-600 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://wa.me/18294973428?text=${encodeURIComponent(mensajeWhatsAppDirecto)}`}
          >
            Pedir por WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

export default Quick_view;
