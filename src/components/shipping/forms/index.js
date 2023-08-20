import { Box, Button, Divider, Text, Input, Flex } from "@theme-ui/components"
import { useFormik } from "formik"
import { useCart } from "medusa-react"
import React, { useEffect, useState } from "react"
import * as Yup from "yup"
import Contact from "./contact"
import Delivery from "./delivery"
import SelectShipping from "./select-shipping"
import Field from "./field"
import IntlTelInput from "react-intl-tel-input"
import "react-intl-tel-input/dist/main.css"
import Payment from "../../payment/payment"
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forms = ({ country, regions, region, nextStep, setLoading }) => {
  const { updateCart, addShippingMethod, cart } = useCart()

  const [isValid, setIsValid] = useState({
    contact: false,
    delivery: false,
  })


  const [fullCountry, setFullCountry] = useState("")
  const [passwordType,setPasswordType]=useState("password")


  // useEffect(() => {
  //   let token = localStorage.getItem("token")
  //   axios.get(process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL + "/users/get-user-by-token?token=" + token).then((resp) => {
  //     formik.setFieldValue("contact.email", resp.data.email)
  //   })
  // })

  useEffect(() => {
    formik.setFieldValue("delivery.country_code", country)
  }, [country])

  useEffect(() => {
    setFullCountry(region.countries.find(c => c.iso_2 === country).display_name)
  }, [country, region])

  const handleSubmit = e => {
    e.preventDefault()
    formik.submitForm()
  }

  const formik = useFormik({
    initialValues: {
      contact: {
        first_name: cart?.shipping_address?.first_name || "",
        last_name: cart?.shipping_address?.last_name || "",
        email: cart?.email || "",
        password: cart?.password || "",
        phone: cart?.shipping_address?.phone || "",
      },
      delivery: {
        address_1: cart?.shipping_address?.address_1 || "",
        postal_code: cart?.shipping_address?.postal_code || "",
        city: cart?.shipping_address?.city || "",
        country_code: cart?.shipping_address?.country_code || "",
        shipping_option: cart?.shipping_methods?.[0]?.shipping_option_id || "",
      },
    },
    validationSchema: Yup.object({
      contact: Yup.object({
        first_name: Yup.string().required("Required"),
        last_name: Yup.string().required("Required"),
        email: Yup.string()
          .email("Please provide a valid email address")
          .required("Required"),
        password: Yup.string()
          .required("Required"),
        phone: Yup.string().optional(),
      }),
      delivery: Yup.object({
        address_1: Yup.string().required("Required"),
        postal_code: Yup.string().required("Required"),
        city: Yup.string().required("Required"),
        country_code: Yup.string().required("Required"),
        shipping_option: Yup.string().required("Required"),
      }),
    }),
    onSubmit: async values => {
      setLoading(true)
      setIsValid({ delivery: true, contact: true })

      const { delivery, contact } = values

      axios.get(process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL + "/users/get-user-by-email?email=" + formik.values.contact.email).then((resp) => {

        if (resp.data) {
          toast.error("Email Already Exsist")
          setLoading(false)
          return
        } else {
          return updateCart
            .mutateAsync({
              email: contact.email,
              shipping_address: {
                first_name: contact.first_name,
                last_name: contact.last_name,
                address_1: delivery.address_1,
                country_code: delivery.country_code,
                postal_code: delivery.postal_code,
                province: delivery.province,
                city: delivery.city,
                phone: contact.phone,
              },
            })
            .then(() => {
              return addShippingMethod.mutateAsync({
                option_id: delivery.shipping_option,
              })
            })
            .finally(() => {
              let data = formik.values.contact
              delete data.phone
              localStorage.setItem("accountData",JSON.stringify(data))
              setLoading(false)
              nextStep()
            })
        }
      }).catch((resp) => {
        console.log(resp)
      })
    },
  })

  return (
    <Flex sx={{ flexDirection: "column" }}>
      <Text sx={{ fontWeight: 700, my: "26px" }}>
        1. &nbsp;Contact Information
      </Text>

      {/* first name */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          First Name*
        </Text>
        <Field
          formik={formik}
          placeholder={"Enter your first name"}
          value={formik.values.contact.first_name}
          name={"first_name"}
          set={"contact"}
        />
      </Flex>

      {/* last name */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          Last Name*
        </Text>
        <Field
          formik={formik}
          placeholder={"Enter your last name"}
          value={formik.values.contact.last_name}
          name={"last_name"}
          set={"contact"}
        />
      </Flex>

      {/* phone */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          Phone*
        </Text>
        {/* <IntlTelInput
          containerClassName="intl-tel-input"
          inputClassName="forms.field"
          value={formik.values.contact.phone}
          fieldName={`contact.phone`}
          handleOnBlur={formik.handleBlur}
          handleInputChange={formik.handleChange}
          placeholder={"Enter your phone"}
        /> */}
        <Field
          formik={formik}
          placeholder={"Enter your phone"}
          value={formik.values.contact.phone}
          name={"phone"}
          set={"contact"}
        />
      </Flex>

      {/* email */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          Email*
        </Text>
        <Field
          formik={formik}
          placeholder={"Enter your email"}
          value={formik.values.contact.email}
          name={"email"}
          set={"contact"}
        />
      </Flex>

      {/* passsword */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          PASSWORD*
        </Text>
        <div className="relative">
          <Field
            formik={formik}
            placeholder={"Enter your password"}
            value={formik.values.contact.password}
            name={"password"}
            set={"contact"}
            type={passwordType}
          />
          <div onClick={()=>{
            if (passwordType=="text") {
              setPasswordType("password")
            }else{
              setPasswordType("text")
            }
          }} className="absolute right-3 bottom-6 cursor-pointer">
          <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 0C4.90909 0 1.41545 2.488 0 6C1.41545 9.512 4.90909 12 9 12C13.0909 12 16.5845 9.512 18 6C16.5845 2.488 13.0909 0 9 0ZM9 10C6.74182 10 4.90909 8.208 4.90909 6C4.90909 3.792 6.74182 2 9 2C11.2582 2 13.0909 3.792 13.0909 6C13.0909 8.208 11.2582 10 9 10ZM9 3.6C7.64182 3.6 6.54545 4.672 6.54545 6C6.54545 7.328 7.64182 8.4 9 8.4C10.3582 8.4 11.4545 7.328 11.4545 6C11.4545 4.672 10.3582 3.6 9 3.6Z" fill="#ADAFCD" />
          </svg>
          </div>
        </div>

      </Flex>

      <Divider sx={{ color: "#E5E7EB", my: "24px" }} />
      <Text sx={{ fontWeight: 700, mb: "26px" }}>2. &nbsp;Delivery method</Text>

      {/* address */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          Address*
        </Text>
        <Field
          formik={formik}
          placeholder={"Address"}
          value={formik.values.delivery.address_1}
          name={"address_1"}
          set={"delivery"}
        />
      </Flex>

      {/* postal code */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          Postal Code
        </Text>
        <Field
          formik={formik}
          placeholder={"Postal code"}
          value={formik.values.delivery.postal_code}
          name={"postal_code"}
          set={"delivery"}
        />
      </Flex>

      {/* city */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          City
        </Text>
        <Field
          formik={formik}
          placeholder={"City"}
          value={formik.values.delivery.city}
          name={"city"}
          set={"delivery"}
        />
      </Flex>

      {/* country */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "14px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          Country
        </Text>
        <Field formik={formik} value={fullCountry} disabled={true} />
      </Flex>

      {/* shipping method */}
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "24px" }}>
        <Text mt={4} as="h3" sx={{}} variant="subheading">
          Shipping method
        </Text>
        <SelectShipping
          formik={formik}
          placeholder={"Select shipping method"}
          value={formik.values.delivery.shipping_option}
          name={"shipping_option"}
          set={"delivery"}
          region={region}
          setLoading={setLoading}
        />
      </Flex>

      <Button onClick={handleSubmit} variant="cta">
        Go to payment
      </Button>
      {/* <Payment/> */}
      <ToastContainer />
    </Flex>
  )
}

export default Forms
