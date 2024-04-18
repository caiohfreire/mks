import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CloseSVG } from "../svg/close"
import { CardCart } from "./card-cart";
import { useCartContext } from "../context/cart-context";
import { toast } from "react-toastify";

type Props = {
  open: boolean
  onClose: () => void;
}

export const Cart = ({ open, onClose }: Props) => {
  const { cart, checkout } = useCartContext();
  const [isOpen, setIsOpen] = useState(open);
  const [total, setTotal] = useState(0);

  function calculationTotal() {
    const total = cart.reduce((accumulator, current) => accumulator + (parseInt(current.price) * current.quantity!), 0);
    setTotal(total);
  }

  useEffect(() => {
    setIsOpen(true);

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [cart]);

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(() => {
      onClose()
    }, 500);
  };

  const completePurshace = () => {
    if (cart.length === 0) {
      return toast.error('Seu carrinho está vazio');
    };

    checkout(cart);
    handleClose()
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex justify-end bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: "0%" }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.6 }}
            className="flex w-full justify-end"
          >
            <div className="relative z-50 flex flex-col gap-6 w-full max-w-md bg-blue sm:max-w-[80%] md:max-w-[60%] lg:max-w-[40%]">

              <div className="flex items-center justify-between p-8">
                <h3 className="text-3xl font-bold text-white">Carrinho de compras</h3>
                <button data-testid="close-cart" onClick={handleClose}>
                  <CloseSVG />
                </button>
              </div>

              <div className="overflow-y-auto h-[calc(100vh-250px)] scrollbar">
                <div className="flex flex-col gap-4 items-center justify-center">
                  {cart.length === 0 && (
                    <div className="flex items-center justify-center h-[50vh]">
                      <span className="text-white font-bold">Seu carrinho está vazio!</span>
                    </div>
                  )}

                  {cart.map((data => (
                    <CardCart
                      key={data.id}
                      id={data.id}
                      name={data.name}
                      description={data.description}
                      photo={data.photo}
                      price={data.price}
                      quantity={data.quantity}
                    />
                  )))}

                </div>
              </div>

              <div className="flex items-center justify-between px-8 text-2xl font-bold text-white">
                <span>Total:</span>
                <span>R$ {total}</span>
              </div>

              <button
                onClick={completePurshace}
                className="flex items-center justify-center w-full p-6 text-white font-bold bg-black transition-all hover:bg-opacity-90">
                Finalizar Compra
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
