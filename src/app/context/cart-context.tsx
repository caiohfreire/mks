import { Dispatch, SetStateAction, createContext, useContext, useState } from "react";
import { ProductsProps } from "../types/products.type";
import { toast } from "react-toastify";

interface CartContextProps {
  cart: ProductsProps[];
  setCart: Dispatch<SetStateAction<ProductsProps[]>>;
  handleAddProduct: (product: ProductsProps) => void;
  handleRemoveProduct: (productId: number) => void;
  updateProductQuantity: (productId: number, quantity: number) => void;
  checkout: (products: ProductsProps[]) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<ProductsProps[]>([]);

  function handleAddProduct(product: ProductsProps) {
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      updateProductQuantity(product.id!, existingProduct.quantity! + 1);
    } else {
      setCart((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  };

  function handleRemoveProduct(productId: number) {
    setCart((prev) => {
      const updatedCart = prev.filter((item) => item.id !== productId);
      return updatedCart;
    });
  }

  function updateProductQuantity(productId: number, quantity: number) {
    if (productId && quantity === 0) {
      setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity !== undefined ? quantity : 1 } : item
      )
    );
  }

  function checkout(products: ProductsProps[]) {
    try {
      console.log(products);
      setCart([]);
      setTimeout(() => {
        toast.success('Sua compra foi finalizada!');
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CartContext.Provider value={{ cart, setCart, handleAddProduct, handleRemoveProduct, updateProductQuantity, checkout }}>
      {children}
    </CartContext.Provider>
  )
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCartContext deve ser usado dentro de um CartContextProvider');
  }
  return context;
};