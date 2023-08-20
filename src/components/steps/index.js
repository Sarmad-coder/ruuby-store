import { Flex, Text, Image, Box, Divider, Button } from "@theme-ui/components"
import React, { useEffect, useContext, useState } from "react"
import { useRouter } from "next/router"
import Payment from "./payment"
import Product from "./product"
import Shipping from "./shipping"
import ProductContext from "../../context/product-context"

const Steps = ({ product, regions, country, region }) => {
  const router = useRouter()
  const [activeStep, setActiveStep] = useState("product")
  const { variant, quantity } = useContext(ProductContext)

  // When region change, we reset the checkout flow
  useEffect(() => {
    setActiveStep("product")
  }, [region])

  return (
    <div className="flex w-full flex-col px-8">
      <div className="my-[46px] flex flex-col lg:ml-[86px]">
        <Flex>
          <Image className="cursor-pointer" src="icons/arrow-left.svg" onClick={() => {
            router.push("/")
          }} />
          <Text sx={{ fontSize: "40px", fontWeight: "700", ml: "22px" }}>
            Checkout
          </Text>
        </Flex>
        <Flex sx={{ mt: "18px", mb: "22px", gap: "4px" }}>
          <Box
            sx={{
              borderRadius: "10px",
              width: "66px",
              height: "8px",
              background: "black",
            }}
          ></Box>
          <Box
            sx={{
              borderRadius: "10px",
              width: "66px",
              height: "8px",
              background: "#D9D9D9",
            }}
          ></Box>
          <Box
            sx={{
              borderRadius: "10px",
              width: "66px",
              height: "8px",
              background: "#D9D9D9",
            }}
          ></Box>
        </Flex>
      </div>

      <div className="grid w-full grid-cols-1 lg:grid-cols-2 justify-items-center">
        <div style={{ flexDirection: "column" }}>
          <Product
            region={region}
            regions={regions}
            product={product}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
          <Shipping
            setActiveStep={setActiveStep}
            country={country}
            activeStep={activeStep}
            regions={regions}
            region={region}
          />
          <Payment region={region} country={country} activeStep={activeStep} />
        </div>

        {activeStep !== "product" && (
          <div className="hidden lg:flex h-fit flex-col rounded-[20px] bg-white px-[36px] pt-[30px] pb-[54px] mr-[10vw]">
            <Text sx={{ fontWeight: 700, fontSize: "28px" }}>Order</Text>
            <Image
              sx={{
                mt: "24px",
                alignSelf: "center",
                width: "220px",
                borderRadius: "8px",
                objectFit: "contain",
                objectPosition: "center center",
              }}
              src={product.images[0].url}
              alt={product.title}
            />
            <Text sx={{ fontWeight: 600, fontSize: "26px", mt: "22px" }}>
              {product.title}
            </Text>

            <Flex
              sx={{
                mt: "22px",
                flexDirection: "row",
                alignItems: "center",
                color: "#727272",
                fontWeight: "500",
                fontSize: "16px",
              }}
            >
              {/* <Flex
              sx={{
                flexDirection: "row",
                gap: "10px",
                alignItems: "center",
                mr: "50px",
              }}
            >
              <span>Size:</span>
              <span style={{ color: "#3E3E3E" }}>S</span>
            </Flex> */}
              <Flex
                sx={{
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                  mr: "50px",
                }}
              >
                <span>Color:</span>
                <Box
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "999px",
                    background: product.variants
                      .find(x => x.id === variant)
                      .title?.toLowerCase(),
                  }}
                ></Box>
              </Flex>
              <Flex
                sx={{
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                  mr: "50px",
                }}
              >
                <span>Quantity:</span>
                <span style={{ color: "#3E3E3E" }}>{quantity}</span>
              </Flex>
            </Flex>
            <Divider sx={{ color: "#E5E7EB", mt: "22px" }} />

            <Flex
              sx={{
                flexDirection: "row",
                flexDirection: "column",
                gap: "18px",
                py: "32px",
              }}
            >
              <Flex
                sx={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  sx={{ fontWeight: "500", fontSize: "16px", color: "#808080" }}
                >
                  Sub Total
                </Text>
                <Text sx={{ fontWeight: "600", fontSize: "16px" }}>
                  {(product.variants
                    .find(x => x.id === variant)
                    .prices.find(x => x.currency_code === "bhd").amount *
                    quantity) /
                    1000}{" "}
                  BD
                </Text>
              </Flex>
              <Flex
                sx={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text
                  sx={{ fontWeight: "500", fontSize: "16px", color: "#808080" }}
                >
                  Discount&nbsp;
                  <span style={{ fontSize: "12px" }}>(if any)</span>
                </Text>
                <Text sx={{ fontWeight: "600", fontSize: "16px" }}>$0</Text>
              </Flex>
            </Flex>

            <Divider sx={{ color: "#E5E7EB" }} />
            <Flex
              sx={{
                my: "22px",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text sx={{ fontWeight: "600", fontSize: "24px" }}>Total</Text>
              <Text sx={{ fontWeight: "500", fontSize: "22px" }}>
                {(product.variants
                  .find(x => x.id === variant)
                  .prices.find(x => x.currency_code === "bhd").amount *
                  quantity) /
                  1000}{" "}
                BD
              </Text>
            </Flex>

            {/* <Button variant="cta">Continue</Button> */}
          </div>
        )}
      </div>
    </div>
  )
}

export default Steps
