import { Box, Button, Flex, Text } from "@theme-ui/components"
import { useCart } from "medusa-react"
import React, { useContext } from "react"
import ProductContext from "../../context/product-context"
import ProductDisplay from "./product-display"

const ProductSelection = ({
  product,
  region,
  country,
  nextStep,
  setLoading,
}) => {
  const { variant, quantity } = useContext(ProductContext)
  const { createCart, startCheckout } = useCart()

  const handleSubmit = async () => {
    setLoading(true)
    
    await createCart.mutateAsync({
      region_id: region.id,
      country_code: country,
      items: [
        {
          variant_id: variant,
          quantity,
        },
      ],
    })

    await startCheckout.mutateAsync()
    
    setLoading(false)

    nextStep()
  }

  const heading = {
    fontSize: "14px",
    fontWeight: "500",
    color: "#727272",
  }

  return (
    <Box>
      <Text variant="header3" style={heading}>
        {product.title}
      </Text>
      <Flex sx={{ mt: "30px", justifyContent: "center" }}>
        <ProductDisplay region={region} product={product} />
      </Flex>
      <Flex sx={{ justifyContent: "center" }}>
        <Button
          sx={{
            background: "transparent",
            border: "1px solid black",
            color: "black",
            mt: "28px",
            py: "14px",
            fontWeight: "600",
            width: "198px",
            height: "auto",
          }}
          onClick={() => handleSubmit()}
          variant="cta"
        >
          BUY NOW
        </Button>
      </Flex>
    </Box>
  )
}

export default ProductSelection
