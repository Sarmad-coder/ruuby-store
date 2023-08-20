import { Box, Text, Input, Select, Flex } from "@theme-ui/components"
import React from "react"
import Field from "./field"
import FieldSplitter from "./field-splitter"

const Contact = ({ formik, summarize = false }) => {
  return (
    <Box as="form">
      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "20px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          Country*
        </Text>
        <Select
          value={formik.values.contact.first_name}
          onChange={e => handleChange(e)}
          sx={{
            // mt: "10px",
            // mb: "20px",
            minWidth: "170px",
            height: "40px",
            border: "1px solid #E5E7EB",
            borderRadius: "8px",
            backgroundColor: "inherit",
            color: "#6B7280",
            outline: "none",
          }}
          arrow={
            <Box
              as="svg"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#6B7280"
              sx={{
                ml: -34,
                alignSelf: "center",
                pointerEvents: "none",
              }}
            >
              <path d="M7.41 7.84l4.59 4.58 4.59-4.58 1.41 1.41-6 6-6-6z" />
            </Box>
          }
        ></Select>
      </Flex>

      <Flex sx={{ flexDirection: "column", gap: "10px", mb: "20px" }}>
        <Text
          sx={{
            fontWeight: 500,
            fontSize: "10px",
            color: "#9D9D9D",
            textTransform: "uppercase",
          }}
        >
          City*
        </Text>
        <Field
          formik={formik}
          placeholder={"City"}
          value={formik.values.delivery.city}
          name={"city"}
          set={"delivery"}
        />
      </Flex>

      <Flex sx={{ flexDirection: "column", gap: "10px" }}>
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
          placeholder={"Enter your Address"}
          value={formik.values.delivery.address_1}
          name={"address_1"}
          set={"delivery"}
        />
      </Flex>
    </Box>
  )
}

export default Contact
