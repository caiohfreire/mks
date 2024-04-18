import Image from "next/image"
import { BagSVG } from "../svg/bag"
import { ProductsProps } from "../types/products.type"

export type CardProps = {
  id?: number;
  name: string;
  description: string;
  price: string;
  photo: string;
  handleBuy: (product: ProductsProps) => void;
};

export const Card = (product: CardProps) => {

  return (
    <div key={product.id} className="w-[250px] rounded-lg shadow-card">
      <div className="flex flex-col items-center justify-center gap-4 px-4 h-full">
        <Image
          src={product.photo}
          alt={product.name}
          width={130}
          height={160}
        />

        <div className="flex items-center justify-around gap-4 w-full">
          <h3 className="w-full">{product.name}</h3>
          <div className="bg-[#373737] py-2 px-3 text-sm text-white font-bold rounded-lg w-full">
            <span className="w-full">R$ {product.price}</span>
          </div>
        </div>

        <span className="text-xs">{product.description}</span>
      </div>

      <button
        onClick={() => product.handleBuy(product)}
        className="flex items-center justify-center gap-3 p-3 rounded-b-lg font-medium w-full bg-blue text-white transition-all hover:bg-opacity-95">
        <BagSVG />
        Comprar
      </button>
    </div>
  )
}