// /src/components/nav/Cart_view.tsx

"use client";
import Image from "next/image";
import { X, ShoppingCart, Minus, Plus, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useHomeContext } from "@/context/HomeContext";

interface CartViewProps {
  onClose: () => void;
}

function Cart_view({ onClose }: CartViewProps) {
  const [visible, setVisible] = useState(false);
  const { cart, removeFromCart, updateQuantity, clearCart } = useHomeContext().cartContext;

  const total = cart.reduce((acc, p) => acc + p.price * p.quantity, 0);
  const cantidad = cart.reduce((acc, p) => acc + p.quantity, 0);

  const mensajeWhatsApp = () => {
    const lineas = cart.map(
      (p) => `• ${p.title} x${p.quantity} — RD$${p.price * p.quantity}`
    );
    const mensaje = `Hola! Quiero hacer este pedido:\n\n${lineas.join("\n")}\n\nTotal: RD$${total}`;
    window.open(
      `https://wa.me/18294973428?text=${encodeURIComponent(mensaje)}`,
      "_blank"
    );
  };

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
        className={`fixed inset-0 z-40 transition-opacity duration-200 ${
          visible ? "bg-black/50" : "bg-black/0"
        }`}
        onClick={handleClose}
      />

      {/* Panel */}
      <div
        className={`fixed left-0 w-full h-[70dvh] z-50 bg-[#faf0d7] flex flex-col transition-all duration-300 ${
          visible ? "top-[16vh] opacity-100" : "bottom-0 opacity-0"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4 border-b border-stone-200 shrink-0">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-lg font-medium tracking-widest uppercase text-gray-900">
              Tu carrito
            </h2>
            <span className="text-xs text-gray-500">
              {cantidad} {cantidad === 1 ? "producto" : "productos"} • Total: RD${total}
            </span>
          </div>
          <div className="flex items-center gap-3">
            {cart.length > 0 && (
              <>
                <button
                  onClick={clearCart}
                  className="px-4 py-2.5 border border-gray-300 text-gray-600 uppercase tracking-widest text-xs hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-colors"
                >
                  Vaciar
                </button>
                <button
                  onClick={mensajeWhatsApp}
                  className="px-6 py-2.5 bg-gray-900 text-amber-100 uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors"
                >
                  Pedir por WhatsApp
                </button>
              </>
            )}
            <button
              onClick={handleClose}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Lista scrolleable */}
        <div className="flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-gray-400">
              <ShoppingCart size={48} strokeWidth={1} />
              <p className="text-sm tracking-widest uppercase">
                Tu carrito está vacío
              </p>
            </div>
          ) : (
            cart.map((product) => (
              <div
                key={product.id}
                className="w-full grid grid-cols-[80px_1fr_auto] items-center gap-4 px-8 py-4 border-b border-stone-100"
              >
                {/* Imagen */}
                <div className="relative w-[80px] h-[80px] shrink-0 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    quality={75}
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-1">
                  <h3 className="text-sm font-medium text-gray-900">{product.title}</h3>
                  <p className="text-xs text-gray-500">{product.desc}</p>
                  <span className="text-sm text-gray-900">
                    RD${product.price} × {product.quantity} = RD${product.price * product.quantity}
                  </span>
                </div>

                {/* Controles */}
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="text-sm font-medium text-gray-900">
                    RD${product.price * product.quantity}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity - 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm w-5 text-center">{product.quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, product.quantity + 1)}
                      className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-1 hover:bg-red-100 text-red-500 rounded-full transition-colors ml-1"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer con total */}
        {cart.length > 0 && (
          <div className="shrink-0 px-8 py-4 border-t border-stone-200 flex items-center justify-between">
            <span className="text-xs tracking-widest uppercase text-gray-500">Total</span>
            <span className="text-xl font-medium text-gray-900">RD${total}</span>
          </div>
        )}
      </div>
    </>
  );
}

export default Cart_view;
