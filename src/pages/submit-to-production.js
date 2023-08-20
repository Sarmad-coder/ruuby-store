import Head from "next/head"
import React from "react"
import { Switch } from "theme-ui"
import ArrowNarrowRight from "../../public/icons/arrow-narrow-right.svg"
import ArrowNarrowLeft from "../../public/icons/arrow-narrow-left.svg"
import Ryfinery from "../../public/icons/ryfinery.svg"
import Signal from "../../public/icons/signal.svg"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import axios from "axios"
var _ = require('lodash');

const CompletedPage = () => {

  const router = useRouter()

  let [onlineSave, setOnlineSave] = useState(null)
  let [loading,setLoading]=useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      setOnlineSave(JSON.parse(localStorage.getItem("userInfo")))
    }
  }, [typeof window])

  let [acknowledge, setAcknowledge] = useState("No")

  const nextPage = async () => {
    setLoading(true)
    onlineSave.acknowledgement = acknowledge
    let id = localStorage.getItem("orderID")
    onlineSave.id = id

    // localStorage.setItem("userInfo", JSON.stringify(onlineSave))
    await axios.put(`${process.env.NEXT_PUBLIC_RUUBY_NODE_API_URL}/update-order-by-id`, onlineSave)
    localStorage.removeItem("userInfo")
    window.location.href = (`${process.env.NEXT_PUBLIC_RUUBY_ANGULAR_URL}/setting`)
    setLoading(false)
  }

  return (
    <>
      <Head>
        <title>Submit to Production</title>
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

        <div className="mt-10 lg:mt-44 flex grow justify-center gap-11 px-8">
          <div className="flex flex-col items-end">
            <div
              className="h-fit w-fit rounded-2xl border border-gray-200 bg-white py-6 px-8"
              style={{ boxShadow: "0px 6px 8px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="text-[22px] font-bold text-neutral-900">
                Great work! 🎉
              </div>
              <div className="mt-1 text-[10px] text-sm text-neutral-400">
                Your Card is Ready for production
              </div>

              <img className="mt-4 w-[362px]" src="images/card-done.png" />

              {/* <div className="font-sm mt-5 font-light text-neutral-400">
                Card color: <span className="ml-2 text-black">Black</span>
              </div> */}
              <div className="font-sm mt-5 font-light text-neutral-400">
                Card orientation:
                <span className="ml-2 text-black">{_.capitalize(onlineSave?.orientation)}</span>
              </div>
              <div className="font-sm mt-1 font-light text-neutral-400">
                Logo size: <span className="ml-2 text-black">{onlineSave?.size}</span>
              </div>
              <div className="font-sm mt-1 font-light text-neutral-400">
                Name on card:{" "}
                <span className="ml-2 text-black">{onlineSave?.name}</span>
              </div>
              <div className="font-sm mt-1 font-light text-neutral-400">
                QR Code on the back:{" "}
                <span className="ml-2 text-black">{onlineSave?.qrCode}</span>
              </div>

              <div className="mt-5 flex gap-3">
                <div>
                  <div className=" text-[#676767] underline">
                    I acknowledge that my design is Finished
                  </div>
                  <div className="w-[230px] text-[11px] text-[#676767]">
                    QR code is great for older phones and phones that does not
                    support NFC Cards.
                  </div>
                </div>
                <div>
                  <Switch
                    onChange={() => {
                      if (acknowledge == "No") {
                        setAcknowledge("Yes")
                      } else {
                        setAcknowledge("No")
                      }
                    }}
                    sx={{
                      "input:checked ~ &": { backgroundColor: "#46B81E" },
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-6">
              <button className="mt-8 flex h-12 w-[120px] items-center justify-between rounded-md border border-zinc-400 py-3 px-4 text-xs  font-semibold text-black"
                onClick={() => {
                  router.push(`/customize-card`)
                }}
              >
                <ArrowNarrowLeft className="h-5 w-5" />
                <span>Go Back</span>
              </button>
             {acknowledge=="Yes"? <button disabled={loading} className="mt-8 flex h-12 w-[215px] items-center justify-between rounded-md bg-[#3562FF] py-3 px-4 text-xs  font-semibold text-white"
                onClick={nextPage}
              >
                <div class="flex justify-center gap-4">
                 {loading&& <div role="status">
                    <svg aria-hidden="true" class="w-4 h-4 text-white animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor" />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill" />
                    </svg>
                    <span class="sr-only">Loading...</span>
                  </div>}
                </div>
                <span>My design is Finished</span>
                <ArrowNarrowRight className="h-5 w-5" />
              </button>:
               <button disabled="true" className="mt-8 flex h-12 w-[215px] items-center justify-between rounded-md bg-[#7794fa] py-3 px-4 text-xs  font-semibold text-white"
               onClick={nextPage}
             >
               <div class="flex justify-center gap-4">
                {loading&& <div role="status">
                   <svg aria-hidden="true" class="w-4 h-4 text-white animate-spin dark:text-gray-600 fill-blue-600"
                     viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                       d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                       fill="currentColor" />
                     <path
                       d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                       fill="currentFill" />
                   </svg>
                   <span class="sr-only">Loading...</span>
                 </div>}
               </div>
               <span>My design is Finished</span>
               <ArrowNarrowRight className="h-5 w-5" />
             </button>
              }
            </div>
          </div>
        </div >
      </div >
    </>
  )
}

export default CompletedPage
