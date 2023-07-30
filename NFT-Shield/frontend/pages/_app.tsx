import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CartProvider } from 'react-use-cart'
import { Provider } from 'react-redux'
import store from "../redux/store"
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'

export default function App({ Component, pageProps }: AppProps) {
  return  (

  <Component {...pageProps} />


)
}
