"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { CartItem, ProductCardProps } from "@/types/Product.mjs";
import axios from "axios";
import { Page_anchor } from "@/types/Page_anchor.mjs";
import { Baby, Globe, Shirt } from "lucide-react";

interface HomeContextType {
  catalogContext: {
    productos: ProductCardProps[];
    setProductos: Dispatch<SetStateAction<ProductCardProps[]>>;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
  };
  cartContext: {
      cart: CartItem[];
      addToCart: (product: ProductCardProps) => void;
      removeFromCart: (id: number) => void;
      updateQuantity: (id: number, quantity: number) => void;
      clearCart: () => void;
  };
  navigateContext: {
    pages_anchors: Page_anchor[];
  }
}

const HomeContext = createContext<HomeContextType | undefined>(undefined);

const HomeContextProvider = ({ children }: { children: ReactNode }) => {
  const [productos, setProductos] = useState<ProductCardProps[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios.get("/data/products.json").then((res) => {
      setProductos(res.data);
    });
  }, []);

  const addToCart = (product: ProductCardProps) => {
    setCart((prev) => {
      const existe = prev.find((item) => item.id === product.id);
      if (existe) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      const { onClick, ...rest } = product;
      return [...prev, { ...rest, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };
  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => setCart([]);
  const pages_anchors = [
    {
      icon: Shirt,
      label: "Sublimaciones",
      desc: "Ropa y accesorios personalizados",
      param: "sublimaciones",
    },
    {
      icon: Baby,
      label: "Bebes",
      desc: "Todo para los más pequeños",
      param: "bebes",
    },
    {
      icon: Globe,
      label: "Hogar",
      desc: "Productos para toda la familia",
      param: "imports",
    },
  ]
  return (
    <HomeContext.Provider
      value={{
        catalogContext: { productos, setProductos, query, setQuery },
        cartContext: { cart, addToCart, removeFromCart, updateQuantity, clearCart },
        navigateContext: { pages_anchors },
      }}
    >
      {children}
    </HomeContext.Provider>
  );
};

export function useHomeContext() {
  const context = useContext(HomeContext);
  if (context === undefined) {
    throw new Error("useHomeContext debe ser utilizado dentro de HomeContextProvider");
  }
  return context;
}

export default HomeContextProvider;
