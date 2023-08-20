import Head from "next/head"
import React, { useEffect, useState } from "react"
import ArrowNarrowRight from "../../public/icons/arrow-narrow-right.svg"
import Ryfinery from "../../public/icons/ryfinery.svg"
import Signal from "../../public/icons/signal.svg"
import Reply from "../../public/icons/reply.svg"
import Pencil from "../../public/icons/pencil.svg"
import Trash from "../../public/icons/trash.svg"
import UploadCloud2 from "../../public/icons/upload-cloud-02.svg"
import Logo from "../../public/logo.svg"

const CompletedPage = () => {

  let [onlineSave, setOnlineSave] = useState(null)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action
      setOnlineSave(JSON.parse(localStorage.getItem("userInfo")))
    }
  }, [typeof window])
  return (
    <>
      <Head>
        <title>Onboarding issues with the artwork</title>
        <meta name="description" content="One-page checkout" />
      </Head>

      <div className="flex h-fit flex-col items-center bg-[#FAFAFC] px-6 py-12">
        {/* alert */}
        <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-[#FEF3F2] px-4 py-4 text-[#B42318] lg:py-1">
          <div className="max-w-2xl text-sm font-medium">
            There was a problem with your Brand logo when we tested it and it
            looks like it is a low resolution Click below to upload a new 300dpi
            logo
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap rounded-2xl bg-[#D92D20] px-[10px] py-[2px] text-sm font-medium text-white">
            Fix now
            <ArrowNarrowRight className="w-4" />
          </div>
        </div>

        <div className="mt-32 flex flex-wrap gap-7">
          <div>
            <div className="mb-4 text-center text-[20px] text-neutral-800">
              FRONT
            </div>
           
              <div className="flex h-[217px] w-[343px] items-center justify-center rounded-xl border border-zinc-300 bg-white p-5 relative">
                <img src={onlineSave?.logo} alt="" className="w-2/5" />
                <div className="absolute right-4">
                  <Signal className="w-5" />
                </div>

              </div>
           
          </div>
          <div>
            <div className="mb-4 text-center text-[20px] text-neutral-800">
              Back
            </div>
            <div className="grid h-[217px] w-[343px] grid-cols-3 grid-rows-3 items-center justify-center rounded-xl border border-zinc-300 bg-white p-5">
              <div className="col-start-2 row-start-2 self-center justify-self-center">
                <img
                  className="w-20 rounded-lg border border-gray-200 p-1"
                  src="order/images/qr-code.png"
                />
              </div>
              <div className="col-start-3 row-start-2 self-center justify-self-end">
                <Signal className="w-5" />
              </div>
              <div className="col-start-2 row-start-3 flex gap-1 self-end justify-self-center">
                <Logo className="w-4 text-black [&_path]:stroke-[0.5]" />
                <span className="text-[10px]">ruuby.co</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div className="mt-32 flex w-full max-w-2xl flex-col gap-4 rounded-lg bg-white p-6">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-4">
                <img className="h-8 w-8 rounded-full" src="order/images/men.png" />
                <span className="text-base font-semibold text-slate-700">
                  maxblagun
                </span>
                <span className="text-base text-gray-500">2 weeks ago</span>
              </div>
              <div className="medium flex items-center gap-2 text-base font-semibold text-zinc-800">
                <Reply className="w-4" />
                Reply
              </div>
            </div>
            <span className="text-base text-gray-500">
              Hey, twhile testing your design on a print we have face the
              following issue: We are having a problem with your logo quality.
              Can you please resubmit another logo with a 300 dpi resolution ?
              Many thanks.
            </span>
          </div>

          <div className="mt-5 flex w-full max-w-xl flex-col gap-4 rounded-lg bg-white p-6">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-4">
                <img className="h-8 w-8 rounded-full" src="order/images/men.png" />
                <span className="text-base font-semibold text-slate-700">
                  maxblagun
                </span>
                <span className="text-base text-gray-500">2 weeks ago</span>
              </div>
              <div className="medium flex items-center gap-2 text-base font-semibold text-zinc-800">
                <Reply className="w-4" />
                Reply
              </div>
            </div>
            <span className="text-base text-gray-500">
              Hey, twhile testing your design on a print we have face the
              following issue: We are having a problem with your logo quality.
              Can you please resubmit another logo with a 300 dpi resolution ?
              Many thanks.
            </span>
          </div>

          <div className="mt-2 flex w-full max-w-xl gap-4 rounded-lg bg-white p-6">
            <textarea
              className="w-full rounded-lg border border-zinc-800"
              rows={4}
            ></textarea>
            <button className="h-fit w-fit rounded-lg bg-zinc-800 py-3 px-7 text-base font-semibold text-white">
              REPLY
            </button>
          </div>

          <div className="mt-5 flex w-full max-w-xl flex-col gap-4 rounded-lg bg-white p-6">
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-4">
                <img className="h-8 w-8 rounded-full" src="order/images/men.png" />
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-slate-700">
                    juliusomo
                  </span>
                  <span className="rounded-sm bg-zinc-800 px-[6px] pb-[2px] text-xs text-white">
                    you
                  </span>
                </div>
                <span className="text-base text-gray-500">2 weeks ago</span>
              </div>
              <div className="flex gap-6">
                <div className="medium flex items-center gap-2 text-base font-semibold text-[#EB3740]  ">
                  <Trash className="w-4 " />
                  Delete
                </div>
                <div className="medium flex items-center gap-2 text-base font-semibold text-[#288EFD]  ">
                  <Pencil className="w-4" />
                  Edit
                </div>
              </div>
            </div>
            <textarea
              className="w-full rounded-lg border border-zinc-800"
              rows={4}
            ></textarea>
            <div className="flex w-full justify-between gap-16">
              <div className="w-full">
                <div className="flex w-full items-center gap-3 whitespace-nowrap">
                  <div>Attach a File</div>
                  <UploadCloud2 className="w-5 text-zinc-800" />
                </div>

                <div className="mt-[10px] flex h-9 w-full items-center justify-between rounded border border-neutral-200 py-2 px-3">
                  <div className="text-xs text-neutral-900">My-logo-Design.PDF</div>
                  <img className="w-4" src="order/images/close.png" />
                </div>
                <div className="-mt-[3px] h-1 w-[75%] rounded-xl bg-[#483EA8]"></div>
              </div>

              <button className="h-fit w-fit self-end rounded-lg bg-zinc-800 py-3 px-7 text-base font-semibold text-white">
                UPDATE
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompletedPage
