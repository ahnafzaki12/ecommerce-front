import { CartContextProvider } from "@/components/CartContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <CartContextProvider>
    <Component {...pageProps} />
    </CartContextProvider>
  ) 
    
}
