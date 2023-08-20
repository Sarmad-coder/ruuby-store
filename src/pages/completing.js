import { useCompleteCart } from "medusa-react"
import Head from "next/head"
import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { Card, Flex } from "theme-ui"
import Layout from "../components/layout/layout"
import Spinner from "../components/spinner/spinner"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Completing = () => {
  const router = useRouter()

  const completeCartMutation = useCompleteCart(router.query.cid)

  const completeCart = async () => {
    const { data, type } = await completeCartMutation.mutateAsync()
    console.log(data)
    if (type === "order") {
      let resp = await axios.get(`${process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL}/get-order-by-email?email=` + data.email)
      console.log({ "resp": resp })
      if (resp.data) {
        toast.error("Order is Already pending against this email")
        router.push(`/business-edition`)
        console.log("order is already pending")
        return
      } else {
        let backData = { orderData: data, userEmail: "hi" }
        let token = localStorage.getItem("token")

        if (token) {
          axios.get(`${process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL}/users/get-user-by-token?token=` + token).then((resp) => {
            backData.userID = resp._id
          })
        }
        axios.post(`${process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL}/create-order`, backData).then((resp) => {
          console.log(resp)
          localStorage.setItem("orderID", resp.data._id)
        })
        router.push(`/completed?oid=${data.id}`)
      }

    } else {
      router.push(`/`)
    }
  }

  useEffect(() => {
    completeCart()
  }, [])

  return (
    <Layout>
      <Head>
        <title>Submitting order...</title>
        <meta name="description" content="One-page checkout" />
      </Head>
      <Card variant="container" sx={{ backgroundColor: "#F3F4F6" }}>
        <Flex
          sx={{
            position: "relative",
            width: "100%",
            flexDirection: "column",
          }}
        >
          <Flex
            sx={{
              position: "absolute",
              bg: "#ffffff",
              opacity: 0.8,
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </Flex>
        </Flex>
      </Card>
      <ToastContainer/>
    </Layout>
  )
}

export default Completing
