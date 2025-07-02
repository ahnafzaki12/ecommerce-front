// CartContext.tsx
import { createContext, useState, ReactNode, useEffect } from "react";

// 1. Buat tipe untuk context
interface CartContextType {
  cartProducts: string[];
  setCartProducts: React.Dispatch<React.SetStateAction<string[]>>;
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearCart: () => void; // ✅ Tambahkan ini
}
// 2. Buat context dengan tipe yang benar
export const CartContext = createContext<CartContextType>({
  cartProducts: [],
  setCartProducts: () => { }, // default dummy function
  addProduct: () => { },
  removeProduct: () => { },
  clearCart: () => { }
});

// 3. Provider dengan tipe anak (children)
interface CartProviderProps {
  children: ReactNode;
}

export function CartContextProvider({ children }: CartProviderProps) {
  const [cartProducts, setCartProducts] = useState<string[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartProducts(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (cartProducts.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cartProducts));
    }
  }, [cartProducts]);

  function addProduct(productId: string) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId: string) {
    setCartProducts(prev => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos)
      }
      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
  }

  return (
    <CartContext.Provider value={{ cartProducts, setCartProducts, addProduct, removeProduct, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

