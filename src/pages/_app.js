import { CartProvider, MedusaProvider } from "medusa-react"
import Head from "next/head"
import React, { useEffect } from "react"
import { QueryClient } from "react-query"
import { ThemeProvider } from "theme-ui"
import { ProductProvider } from "../context/product-context"

import "../fonts/index.css"
import theme from "../theme"
import "../styles.scss"
import Router from "next/dist/server/router"
import { useRouter } from "next/router"
import axios from "axios"

const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;

// Your react-query's query client config
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 30000,
      retry: 1,
    },
  },
})

const App = ({ Component, pageProps }) => {

  // useEffect(() => {
    
  //   let token = localStorage.getItem("token")
  //   if (token) {
  //     axios.get(process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL + "/users/get-user-by-token?token=" + token).then((resp) => {
  //       // axios.get(`${process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL}/get-order-by-email?email=` + resp.data.email).then((resp) => {
  //       //   console.log(resp)
  //       //   if (resp.data) {
  //       //     window.location.href = (process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL + "/setting")
  //       //   }
  //       // }).catch((resp) => {
  //       //   console.log(resp)
  //       // })
  //     }).catch((error) => {
  //       localStorage.removeItem("token")
  //       console.log(error)
  //       window.location.href = (process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL + "/login")
  //     })
  //   } else {
  //     window.location.href = (process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL + "/login")
  //   }
  // })


  return (

    <ThemeProvider theme={theme}>
      <MedusaProvider
        baseUrl={BACKEND_URL}
        queryClientProviderProps={{ client: queryClient }}
      >
        <CartProvider>
          <Head>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <ProductProvider>

            <Component {...pageProps} />

          </ProductProvider>
        </CartProvider>
      </MedusaProvider>
    </ThemeProvider>

  )
}

export default App
