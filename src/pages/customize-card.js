import Head from "next/head"
import React, { useEffect, useState } from "react"
import { Switch } from "theme-ui"
import ArrowNarrowRight from "../../public/icons/arrow-narrow-right.svg"
import ArrowNarrowLeft from "../../public/icons/arrow-narrow-left.svg"
import Ryfinery from "../../public/icons/ryfinery.svg"
import Signal from "../../public/icons/signal.svg"
import { useRouter } from "next/router"
const CompletedPage = () => {
  const router = useRouter()

  let [onlineSave, setOnlineSave] = useState(null)
  let card = React.useRef(null)
  let logo = React.useRef(null)
  let signal = React.useRef(null)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Perform localStorage action
      setOnlineSave(JSON.parse(localStorage.getItem("userInfo")))
    }
  }, [typeof window])

  let [horizontal, setHorizontal] = useState("border-stone-300")
  let [vertical, setVertical] = useState("border-stone-300")
  let [s, setS] = useState("border-stone-300")
  let [m, setM] = useState("border-stone-300")
  let [l, setL] = useState("border-stone-300")
  let [name, setName] = useState("No")
  let [cardName, setCardName] = useState("")
  let [qrCode, setQrCode] = useState("No")

  const nextPage = () => {
    if (horizontal == "border-[#46B81E]") {
      onlineSave.orientation = "horizontal"
    } else {
      onlineSave.orientation = "vertical"
    }

    if (s == "border-[#46B81E]") {
      onlineSave.size = "S"
    } else if (m == "border-[#46B81E]") {
      onlineSave.size = "M"
    } else {
      onlineSave.size = "L"
    }

    onlineSave.name = name
    onlineSave.cardName=cardName
    onlineSave.qrCode = qrCode
    onlineSave.page="submit-to-production"

    localStorage.setItem("userInfo", JSON.stringify(onlineSave))
    router.push(`/submit-to-production`)
  }
  return (
    <>
      <Head>
        <title>Upload Artwork!</title>
        <meta name="description" content="One-page checkout" />
      </Head>
      <div className="mt-7 ml-7 text-base font-semibold text-neutral-800">RUUBY</div>
      <div className="flex bg-[#FAFAFC] lg:h-screen">
        {/* <div className="hidden h-full w-28 flex-col items-center border-[3px] border-gray-200 py-7 lg:flex">
          <div className="text-base font-semibold text-neutral-800">RUUBY</div>
          <div className="mt-44 flex flex-col gap-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#63C076] font-semibold text-white">
              1
            </div>
            {[2, 3, 4, 5, 6].map((x, i) => (
              <div
                key={i}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 font-semibold text-neutral-800"
              >
                {x}
              </div>
            ))}
          </div>
          <div></div>
        </div> */}

        <div className="my-8 px-6 flex grow flex-col-reverse flex-wrap items-center justify-center gap-11 lg:mt-44 lg:flex-row lg:items-start">
          <div className="flex flex-col items-end">
            <div
              className="h-fit w-fit rounded-2xl border border-gray-200 bg-white py-6 px-8"
              style={{ boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="text-[22px] font-bold text-neutral-900">
                Customise my Card
              </div>
              <div className="mt-1 text-[10px] text-sm text-neutral-400">
                Make your card unique to match your brand.
              </div>

              <div className="mt-10 text-sm font-semibold text-stone-500">
                Card Orientation
              </div>
              <div className="mt-[10px] flex items-end gap-10">
                <div
                  className={
                    "flex h-[84px] w-14 items-center justify-center rounded-md border text-xs font-semibold text-neutral-400 " +
                    horizontal
                  }
                  onClick={() => {
                    setHorizontal("border-[#46B81E]")
                    setVertical("border-stone-300")
                    signal.current.style.right="unset"
                    signal.current.style.top="1rem"
                    signal.current.style.transform="rotateZ(270deg)"
                    card.current.style.width = '217px';
                    card.current.style.height = '343px';
                    logo.current.style.width = '69%';
                    setS("border-stone-300")
                    setM("border-stone-300")
                    setL("border-[#46B81E]")
                  }}
                >
                  Logo
                </div>
                <div
                  className={
                    "flex h-14 w-[84px] items-center justify-center rounded-md border text-xs font-semibold text-neutral-400 " +
                    vertical
                  }
                  onClick={() => {
                    setHorizontal("border-stone-300")
                    setVertical("border-[#46B81E]")
                    // card.current.classList.remove("h-[343px]", "w-[217px]")
                    // card.current.classList.add("h-[217px]", "w-[343px]")
                    signal.current.style.right="1rem"
                    signal.current.style.top="unset"
                    signal.current.style.transform="rotateZ(0deg)"
                    card.current.style.width = '343px';
                    card.current.style.height = '217px';
                    logo.current.style.width = '40%';
                    setS("border-stone-300")
                    setM("border-stone-300")
                    setL("border-[#46B81E]")
                  }}
                >
                  Logo
                </div>
              </div>

              <div className="mt-6 text-sm font-semibold text-stone-500">
                Logo Size
              </div>

              <div className="mt-[10px] flex items-end gap-6 text-center">
                <div>
                  <span className="text-xs text-neutral-600">S</span>
                  <div
                    className={
                      "flex h-14 w-[84px] items-center justify-center rounded-md border text-xs font-semibold text-neutral-400 " +
                      s
                    }
                    onClick={() => {
                      setS("border-[#46B81E]")
                      setM("border-stone-300")
                      setL("border-stone-300")
                      if (vertical=="border-[#46B81E]") {
                        logo.current.style.width = '25%';
                        
                      }else{
                        logo.current.style.width = '43%';
                      }
                        
                     
                    }}
                  >
                    Logo
                  </div>
                </div>
                <div>
                  <span className="text-xs text-neutral-600">M</span>
                  <div
                    className={
                      "flex h-14 w-[84px] items-center justify-center rounded-md border text-xs font-semibold text-neutral-400 " +
                      m
                    }
                    onClick={() => {
                      setS("border-stone-300")
                      setM("border-[#46B81E]")
                      setL("border-stone-300")
                      if (vertical=="border-[#46B81E]") {
                        logo.current.style.width = '32%';
                        
                      }else{
                        logo.current.style.width = '55%';
                      }
                     
                    }}
                  >
                    Logo
                  </div>
                  <div className="-mb-[17px] mt-[2px] text-[10px] text-neutral-600">
                    *Recommended
                  </div>
                </div>
                <div>
                  <span className="text-xs text-neutral-600">L</span>
                  <div
                    className={
                      "flex h-14 w-[84px] items-center justify-center rounded-md border text-xs font-semibold text-neutral-400 " +
                      l
                    }
                    onClick={() => {
                      setS("border-stone-300")
                      setM("border-stone-300")
                      setL("border-[#46B81E]")
                      if (vertical=="border-[#46B81E]") {
                        logo.current.style.width = '40%';
                        
                      }else{
                        logo.current.style.width = '69%';
                      }
                    }}
                  >
                    Logo
                  </div>
                </div>
              </div>

              <div className="mt-14">
                <div className="flex items-center justify-between">
                  <div className="text-base font-semibold text-stone-500">
                    Add a Name on card ?
                  </div>
                  <div>
                    <Switch
                      onChange={() => {
                        if (name == "No") {
                          setName("Yes")
                        } else {
                          setName("No")
                        }
                      }}
                      sx={{
                        "input:checked ~ &": { backgroundColor: "#46B81E" },
                      }}
                    />
                  </div>
                </div>
                {name=="Yes"?<input className="border-2 border-gray-500 rounded-md mt-6 w-full h-10 pl-4" type="text" placeholder="Name" 
                onChange={(e)=>{
                  cardName=e.target.value
                  setCardName(name)
                }}
                />:null}
                <div className="mt-6 flex items-center justify-between">
                  <div>
                    <div className="text-base font-semibold text-stone-500">
                      Add QRCode at the back ?
                    </div>
                    <div className="w-52 text-[10px] text-stone-400">
                      QR code is great for older phones and phones that does not
                      support NFC Cards.
                    </div>
                  </div>
                  <div>
                    <Switch
                      onChange={() => {
                        if (qrCode == "No") {
                          setQrCode("Yes")
                        } else {
                          setQrCode("No")
                        }
                      }}
                      sx={{
                        "input:checked ~ &": { backgroundColor: "#46B81E" },
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <button
                className="mt-8 flex h-12 w-[120px] items-center justify-between rounded-md border border-zinc-400 py-3 px-4 text-xs  font-semibold text-black"
                onClick={() => {
                  router.push(`/upload-artwork`)
                }}
              >
                <ArrowNarrowLeft className="h-5 w-5" />
                <span>Go Back</span>
              </button>
              <button
                className="mt-8 flex h-12 w-[215px] items-center justify-between rounded-md bg-[#3562FF] py-3 px-4 text-xs  font-semibold text-white"
                onClick={nextPage}
              >
                <span>It Looking great move on</span>
                <ArrowNarrowRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="lg:mt-32">
            <div className="mb-4 text-center text-[40px] text-zinc-300">
              FRONT
            </div>
            <div ref={card} className="relative flex h-[217px] w-[343px] items-center justify-center rounded-xl border border-zinc-300 bg-white p-5">
              <img ref={logo} src={onlineSave?.logo} alt="" className="w-2/5" />
              <div ref={signal} className="absolute" style={{right:"1rem"}}>
                <Signal className="w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompletedPage
