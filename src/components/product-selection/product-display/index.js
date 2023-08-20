import { Flex, Image, Text, Button, Input } from "@theme-ui/components"
import React, { useContext, useEffect, useMemo, useState } from "react"
import ProductContext from "../../../context/product-context"

const ProductDisplay = ({ region, product }) => {
  const { quantity, variant, updateQuantity, selectVariant } =
    useContext(ProductContext)

  useEffect(() => {
    selectVariant(product.variants[0].id)
  }, [])

  return product ? (
    <Flex sx={{ flexDirection: "column" }}>
      <Flex
        sx={{
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Image
          sx={{
            width: "180px",
            borderRadius: "8px",
            objectFit: "contain",
            objectPosition: "center center",
          }}
          src={product.images[0].url}
          alt={product.title}
        />
        {/* <Info product={product} region={region} /> */}
      </Flex>

      <Text
        sx={{
          mt: "40px",
          fontSize: "14px",
          fontWeight: 500,
          color: "#727272",
        }}
      >
        Colors
      </Text>

      <Flex
        sx={{
          flexDirection: "row",
          width: "100%",
          mt: "8px",
          gap: "12px",
        }}
      >
        {product.variants.map((x, i) => (
          <div
            key={i}
            style={{
              background: x.title.toLowerCase(),
              borderRadius: "4px",
              border:
                x.id === variant ? `3px solid #adadad` : `1px solid #bdbdbd`,
              filter:
                x.id === variant
                  ? "drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))"
                  : "none",
              width: "28px",
              height: "28px",
              cursor: "pointer",
            }}
            onClick={() => selectVariant(x.id)}
          ></div>
        ))}
      </Flex>

      <Flex
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          gap: "20px",
          width: "100%",
          mt: "24px",
        }}
      >
        <Flex sx={{ flexDirection: "column" }}>
          <Text
            sx={{
              fontSize: "14px",
              fontWeight: 500,
              color: "#727272",
            }}
          >
            Price
          </Text>
          <Text
            sx={{
              mt: "6px",
              fontSize: "32px",
              fontFamily: "Times New Roman",
              fontWeight: 700,
            }}
          >
            {(product.variants[0].prices.find(x => x.currency_code === "bhd")
              .amount *
              quantity) /
              1000}{" "}
            BD

            <span className="mx-1 text-base">{"("} {(product.variants[0].prices.find(x => x.currency_code === "bhd")
              .amount *
              quantity * 2.65) /
              1000}{" "}
              ${")"}</span>
          </Text>
        </Flex>
        <Flex sx={{ flexDirection: "column" }}>
          <Text
            sx={{
              mr: "8px",
              fontSize: "14px",
              fontWeight: 500,
              color: "#727272",
              textAlign: "end",
            }}
          >
            Quantity
          </Text>
          <Flex
            sx={{
              mt: "8px",
              mr: "-10px",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <Button
              sx={{ background: "transparent", padding: "0" }}
              variant="cta"
              disabled={quantity === 1}
              onClick={() => updateQuantity(quantity - 1)}
            >
              <Image src={"icons/minus.svg"} />
            </Button>
            <Input
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                fontFamily: "Inter",
                width: "85px",
                height: "30px",
                padding: 0,
                borderColor: "#636363",
                textAlign: "center",
              }}
              variant="field"
              value={quantity || 1}
              onInput={() => updateQuantity(quantity)}
            />
            <Button
              sx={{ background: "transparent", padding: "0" }}
              variant="cta"
              onClick={() => updateQuantity(quantity + 1)}
            >
              <Image src={"icons/plus.svg"} />
            </Button>
          </Flex>
        </Flex>
      </Flex>

      <Text
        sx={{
          mt: "16px",
          lineHeight: "24px",
          fontSize: "14px",
          fontWeight: 300,
          color: "#6B7280",
        }}
        variant="fz_s"
      >
        {product.description}
      </Text>

      {/* <OptionSelector product={product} /> */}
    </Flex>
  ) : null
}

export default ProductDisplay
