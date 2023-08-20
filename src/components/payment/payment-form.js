import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { Box, Button, Flex, Text } from "@theme-ui/components"
import { useCart } from "medusa-react"
import React, { useState } from "react"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

const PaymentForm = ({ session, handleSubmit, setLoading }) => {
  const [errorMessage, setErrorMessage] = useState()

  const { cart } = useCart()
  const stripe = useStripe()
  const elements = useElements()


  const handlePayment = async e => {
    e.preventDefault()

    setLoading(true)

    if (!stripe || !elements) {
      return
    }

    const { client_secret } = session.data
    const email = cart.email
    const address = cart.shipping_address

    return stripe
      .confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: address.fullName,
            email: email,
            phone: address.phone,
            address: {
              city: address.city,
              country: address.country,
              line1: address.line1,
              line2: address.line2,
              postal_code: address.postal,
            },
          },
        },
      })
      .then(async ({ error, paymentIntent }) => {
        console.log(paymentIntent)

        let config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api.stripe.com/v1/payment_intents/' + paymentIntent.id + '/capture',
          headers: {
            'Authorization': 'Bearer sk_test_51MKfXjJRymQrzkHiPZIZcqvmTwKug5ekz7r8NH5m3Wdok6A66WFaWKTDiUh68euQcra7cxpOPwEO6VzRhnYSjVrW00gVDpOlhE',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        };

        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });

        if (error) {
          setLoading(false)
          const pi = error.payment_intent

          if (
            (pi && pi.status === "requires_capture") ||
            (pi && pi.status === "succeeded")
          ) {
            return handleSubmit()
          }

          setErrorMessage(error.message)
          return
        }

        if (
          (paymentIntent && paymentIntent.status === "requires_capture") ||
          paymentIntent.status === "succeeded"
        ) {
          let account = JSON.parse(localStorage.getItem("accountData"))
          axios.post(process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL + "/users/create-user", account).then((resp) => {
            toast.success("Account is Created Successfully")
            localStorage.removeItem("accountData")
            localStorage.setItem("token", resp.data.token)
          })

          return handleSubmit()
        }

        return
      })
  }

  return (
    <form onSubmit={handlePayment}>
      {errorMessage && <Text sx={{ fontSize: "10px" }}>{errorMessage}</Text>}
      <Box variant="box.paymentField">
        <CardElement
          options={{ hidePostalCode: true }}
        />
      </Box>
      <Flex>
        <Button variant="cta">Complete order</Button>
      </Flex>
      <ToastContainer />
    </form>
  )
}
export default PaymentForm
