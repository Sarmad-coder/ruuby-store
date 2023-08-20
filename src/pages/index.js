import { Text, Button, Flex, Image } from "@theme-ui/components"
import Head from "next/head"
import React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { client } from "../utils/client"
import { } from "@theme-ui/components"
import axios from "axios"

const ANGULAR_URL = process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL;
const NODE_URL = process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL;

const CompletedPage = ({ products }) => {
  const router = useRouter();
  const [token, setToken] = useState('');
  const [user, setUser] = useState({});
  const [loading,setLoading]=useState(null)


  useEffect(() => {
    if (typeof window !== "undefined") {
      let userInfo=JSON.parse(localStorage.getItem("userInfo"))
    if (userInfo) {
      window.location.href = (process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL + "/order/"+userInfo.page)
      // console.log(userInfo.page)
    }
      token = localStorage.getItem("token")
      setToken(token);
      if (token) {
        
      
      axios.get(NODE_URL + "/users/get-user-by-token?token=" + token).then((resp) => {
        user = resp.data
        if (resp.data) {
          window.location.href = (process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL + "/setting")
        }
        // axios.get(`${process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL}/get-order-by-email?email=` + resp.data.email).then((resp) => {
        //   console.log(resp)
        //   if (resp.data) {
        //     window.location.href = (process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL + "/setting")
        //   }
        // }).catch((resp) => {
        //   console.log(resp)
        // })
        setUser(user)
      }).catch((error) => {
        console.log(error)
      })
    }
    }
    // console.log(user)
  }, [])

  return (
    <>
      <Head>
        <title>Home!</title>
        <meta name="description" content="One-page checkout" />
      </Head>

      <div className="flex justify-between px-6 pt-8 lg:px-24 lg:pt-12">
        <div className="text-[28px]">Ruuby</div>

        {token ? <Flex
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Text sx={{ color: "#787878", fontWeight: 500 }}>{user?.first_name}</Text>
          <Image
            src="order/images/user-placeholder.png"
            width="44px"
            height="44px"
            sx={{
              borderRadius: "999px",
            }}
          />
        </Flex> :
          <div className="flex items-center gap-[30px] whitespace-nowrap">
            <a className="cursor-pointer font-semibold" href={ANGULAR_URL + '/login'}>Log in</a>
            <Button
              sx={{ color: "white", fontWeight: "600", borderRadius: "14px" }}
              variant="cta"
            >
              Try for free
              <svg
                style={{ marginLeft: "12px" }}
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.5 9L6.45 7.9125L9.1125 5.25H0V3.75H9.1125L6.45 1.0875L7.5 0L12 4.5L7.5 9Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          </div>
        }
      </div>

      <div className="mt-20 flex flex-col gap-5 px-6 lg:mt-[124px] lg:px-24">
        <div
          className="text-[34px] font-semibold lg:text-[48px]"
          style={{ color: "#282828" }}
        >
          Say Goodbye to your old business cards
        </div>
        <div className="text-[48px] font-semibold lg:text-[68px]">
          <span className="text-[#282828]">Hello</span>{" "}
          <span className="text-[#EF6C00]">Ruuby Cards</span>
        </div>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-y-20 gap-x-40 px-6 pt-16 lg:justify-start lg:px-24">
        {products.map((product, i) => (
          <div
            key={i}
            style={{ flexDirection: "column", whiteSpace: "nowrap" }}
          >
            <img
              src={product.images[0].url}
              style={{ width: "268px", borderRadius: "8px" }}
            />
            <div
              style={{ marginTop: "12px", fontWeight: 600, fontSize: "32px" }}
            >
              {product.title}
            </div>
            <div
              style={{
                marginTop: "6px",
                fontWeight: 600,
                fontSize: "14px",
                color: "#717171",
              }}
            >
              {product.variants.map(variant => variant.title).join(" - ")}
            </div>
            <div
              style={{ marginTop: "6px", fontWeight: 300, fontSize: "12px" }}
            >
              Starting from{" "}
              <span style={{ fontWeight: 700 }}>
                {product.variants[0].prices.find(x => x.currency_code === "bhd")
                  .amount / 1000}{" "}
                BD
              </span>
            </div>
            <Button
              variant="cta"
              sx={{
                mt: "48px",
                background: "black",
                fontWeight: "600",
                fontSize: "16px",
                height: "auto",
                p: "16px 32px",
              }}
              onClick={(i) => {
                setLoading(i)
                router.push(`/${product.handle}`)
              }}
            >


             {loading===i?<div role="status">
                <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor" />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill" />
                </svg>
              </div>:null}
              <p className="ml-4"> Start customising my card</p>
            </Button>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-wrap justify-between gap-5 px-9 pt-40 pb-24 lg:pl-24 lg:pr-[246px]">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "380px",
          }}
        >
          <span style={{ fontWeight: 700, fontSize: "16px" }}>
            Ruuby Business News
          </span>

          <span style={{ color: "#949494", marginTop: "10px" }}>
            Would you like to get the most out of Ruuby? Subscribe for the
            latest news, updates and offers.
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 700, fontSize: "16px" }}>About</span>
          <a style={{ color: "#A1A1A1", marginTop: "10px" }}>Compatibility</a>
          <a style={{ color: "#A1A1A1", marginTop: "10px" }}>Our story</a>
          <a style={{ color: "#A1A1A1", marginTop: "10px" }}>Store</a>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontWeight: 700, fontSize: "16px" }}>Social</span>
          <a style={{ color: "#A1A1A1", marginTop: "10px" }}>Twitter</a>
          <a style={{ color: "#A1A1A1", marginTop: "10px" }}>LinkedIn</a>
          <a style={{ color: "#A1A1A1", marginTop: "10px" }}>Instagram</a>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps({ params }) {
  const response = await client.products.list({ limit: 3 })

  const products = response.products

  return { props: { products } }
}

export default CompletedPage
