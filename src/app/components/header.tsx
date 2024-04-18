'use client'
import { useState } from "react"
import { CartSVG } from "../svg/cart"
import { Cart } from "./cart";
import { useCartContext } from "../context/cart-context";

export const Header = () => {
  const { cart } = useCartContext();
  const [openCart, setOpenCart] = useState(false);

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  return (
    <>
      <header className="fixed top-0 flex items-center justify-between w-full h-12 bg-blue text-white md:h-20 xl:p-8">
        <div className="flex w-full px-5">
          <div className="flex items-center w-full gap-2">
            <h2 className="font-[600] text-[32px]">MKS</h2>
            <span className="font-[300]">Sistemas</span>
          </div>

          <button data-testid="cart-button" onClick={handleOpenCart} className="flex items-center justify-center text-black">
            <div className="flex items-center font-bold gap-2 bg-white py-1 pl-2 pr-4 rounded-lg cursor-pointer">
              <span><CartSVG /></span>
              <span data-testid="cart-quantity">
                {cart.reduce((total, item) => total + item.quantity!, 0)}
              </span>
            </div>
          </button>
        </div>
      </header>
      {openCart && (
        <Cart
          open
          onClose={() => setOpenCart(false)}
        />
      )}
    </>
  )
}