import { Flex, Link, Text, Image,Button } from "@theme-ui/components"
import React from "react"
import Logo from "../../../public/logo.svg"
import { useState, useEffect } from "react";
import axios from "axios";
const NODE_URL = process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL;

const ANGULAR_URL = process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL;
const Layout = ({ children, country, regions, handleRegionChange }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  useEffect(() => {
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token")
      setToken(token);
      // setToken(token);
      axios.get(NODE_URL + "/users/get-user-by-token?token=" + token).then((resp) => {
        user = resp.data
        setUser(user)
      }).catch((error) => {
        console.log(error)
      })
      // console.log(token)
    }
    // console.log(user)
  }, [])
  return (
    <Flex
      sx={{
        width: "100%",
        minHeight: "100vh",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#FAFAFC",
      }}
    >
      {/* header */}
      <Flex
        sx={{
          p: "26px 60px 0 40px",
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Flex
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
          }}
        >
          {/* <Image src="/logo.svg" width="30px" height="38px" /> */}
          <Logo className="text-[#090909]" />
          <Text sx={{ color: "#262626" }}>RUUBY</Text>
        </Flex>
        {token ? <Flex
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <Text sx={{ color: "#787878", fontWeight: 500 }}>{user?.first_name}</Text>
          <Image
            src="images/user-placeholder.png"
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
      </Flex>

      {/* content */}
      <Flex
        sx={{
          justifyContent: ["center", "space-between"],
          alignItems: "center",
          flexDirection: ["column", "row"],
          py: "2em",
        }}
      >
        <Flex
          sx={{
            justifyContent: ["center"],
            alignItems: "center",
            width: ["100%"],
          }}
        >
          {children}
        </Flex>
        {/* <Flex
          sx={{
            justifyContent: ["center", "flex-start"],
            paddingTop: "10px",
            paddingLeft: [0, "100px"],
            width: "50%",
            height: "100px",
            backgroundColor: "#F3F3F6",
          }}
        >
          <Flex
            sx={{
              paddingTop: "10px",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              sx={{
                fontWeight: "500",
                fontSize: "10px",
                color: "#A3A3A3",
                letterSpacing: "4px",
              }}
            >
              Powered by
            </Text>
            <Link
              sx={{
                textDecoration: "none",
                color: "medusa100",
                "& image": {
                  opacity: 0.5,
                },
              }}
              href="https://www.medusajs.com/"
            >
              <Flex sx={{ paddingTop: "10px", alignItems: "center" }}>
                <Image src="/mark-grey.png" height={"15px"} width={"15px"} />
                <Text
                  sx={{
                    ml: "5px",
                    color: "#A3A3A3",
                    fontWeight: 500,
                    fontSize: "14px",
                    lineHeight: "1",
                  }}
                >
                  medusa{" "}
                </Text>
              </Flex>
            </Link>
            {regions?.length && (
              <RegionSelector
                selected={country}
                regions={regions}
                handleRegionChange={handleRegionChange}
              />
            )}
          </Flex>
        </Flex> */}
      </Flex>

      {/* footer */}
      <Flex
        sx={{
          p: "40px 75px",
          width: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          gap: "32px",
        }}
      >
        {["Home", "About", "News", "Terms", "Privacy"].map((x, i) => (
          <Link
            key={i}
            sx={{
              textDecoration: "none",
              color: "#344054",
              fontSize: "12px",
            }}
            href=""
          >
            {x}
          </Link>
        ))}
      </Flex>
    </Flex>
  )
}

export default Layout
