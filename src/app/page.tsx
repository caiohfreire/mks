'use client'
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

import { ProductsProps } from "./types/products.type";

import { Card } from "./components/card";
import { Wrapper } from "./components/wrapper";
import { useCartContext } from "./context/cart-context";

export default function Home() {
  const { handleAddProduct } = useCartContext();

  const getProducts = async () => {
    const response = await api.get('products?page=1&rows=10&sortBy=id&orderBy=DESC');
    console.log(response.data)
    return response.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  })

  return (
    <Wrapper>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-[calc(100vh-200px)] md:h-[calc(100vh-232px)] xl:h-[calc(100vh-200px)]">
          <span className="font-bold text-lg">
            Carregando...
          </span>
        </div>
      ) : (
        <div className="flex justify-center items-center w-full xl:h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 gap-y-16">
            {data && data.products.map((item: ProductsProps) => (
              <Card
                key={item.id}
                name={item.name}
                description={item.description}
                photo={item.photo}
                price={item.price}
                handleBuy={() => handleAddProduct(item)}
              />
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
}
