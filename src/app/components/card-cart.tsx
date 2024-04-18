import Image from "next/image"
import { useCartContext } from "../context/cart-context";
import { ProductsProps } from "../types/products.type";

export const CardCart = (props: ProductsProps) => {
  const { handleRemoveProduct, updateProductQuantity } = useCartContext();

  return (
    <div className="relative w-[290px] bg-white rounded-lg shadow-card md:flex md:w-[90%] md:mt-2">
      <button
        onClick={() => handleRemoveProduct(props.id!)}
        className="absolute right-3 top-2 md:-right-1 md:-top-2">
        <span className="text-3xl font-bold md:bg-black md:text-white md:text-xs md:rounded-full md:py-1 md:px-2">X</span>
      </button>

      <div className="flex flex-col items-center justify-center gap-4 p-4 md:flex-row md:items-center md:justify-between md:w-full">
        <Image
          src={props.photo}
          alt={props.name}
          width={130}
          height={160}
          className="md:w-14"
        />

        <h3 className="md:text-xs md:w-full">{props.name}</h3>

        <div className="flex flex-col w-full">
          <span className="text-[10px] font-medium sm:hidden md:flex">Qtd:</span>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-center border border-[#BFBFBF] rounded-md md:py-0 xl:px-4">
              <button
                onClick={() => updateProductQuantity(props.id!, props.quantity! - 1)}
                className="px-3 py-1 font-bold text-xl border-r border-[#BFBFBF] md:px-1"
              >
                -
              </button>
              <span className="px-4 md:px-1 xl:px-4">
                {props.quantity}
              </span>
              <button
                onClick={() => updateProductQuantity(props.id!, props.quantity! + 1)}
                className="px-3 font-bold text-xl border-l border-[#BFBFBF] md:px-1"
              >
                +
              </button>
            </div>

            <div className="bg-[#373737] py-2 px-3 text-white text-sm font-bold rounded-lg md:px-2 md:bg-transparent md:text-black">
              R$ {props.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}