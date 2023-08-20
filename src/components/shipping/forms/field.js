import { Flex, Input } from "@theme-ui/components"
import React, { useEffect, useState } from "react"

const Field = ({ formik, value, name, set, placeholder, disabled, type }) => {
  const [error, setError] = useState(false)

  useEffect(() => {
    if (formik.errors[set]?.[name] && formik.touched[set]?.[name]) {
      setError(true)
    } else {
      setError(false)
    }
  }, [formik.errors, formik.touched, set, name])

  return (
    <Flex
      sx={{
        flexDirection: "column",
        mb: ".75em",
        width: "100%",
      }}
    >
      <Input
        defaultValue={value}
        disabled={disabled}
        name={`${set}.${name}`}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        placeholder={placeholder}
        type={type}
        sx={{
          height: "40px",
          fontSize: "12px",
          fontFamily: "Inter",
          borderColor: error ? "salmon" : "#E4E4E4",
          borderRadius: "8px",
        }}
        variant="field"
      />
    </Flex>
  )
}

export default Field
