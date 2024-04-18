"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { QueryProvider } from "./query-client"
import { CartProvider } from "@/app/context/cart-context"
import { Slide, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function ReactQueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={QueryProvider}>
      <CartProvider>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Slide}
          style={{ paddingTop: 50 }}
        />
      </CartProvider>
    </QueryClientProvider>
  )
}