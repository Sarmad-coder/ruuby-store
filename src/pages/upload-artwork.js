import Head from "next/head"
import React, { useState } from "react"
import ArrowNarrowRight from "../../public/icons/arrow-narrow-right.svg"
import { useRouter } from "next/router"

const CompletedPage = () => {
  const router = useRouter()

  let [logo, setLogo] = useState("")
  // const localLogo=JSON.parse(localStorage.getItem("userInfo"))
  // if (localLogo.logo) {

  // }  

  // Create a reference to the hidden file input element
  let hiddenFileInput = React.useRef(null)



  const onDrop =async (e) => {
    e.preventDefault();
    const fileUploaded = e.dataTransfer.files[0];
    setLogo(fileUploaded.name)
    const base64 = await new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(fileUploaded)
      reader.onload = () => resolve(reader.result) // base64 Image src
    })

    let onlineSave = {
      logo: base64,
      page: "customize-card"
    }

    localStorage.setItem("userInfo", JSON.stringify(onlineSave))
  }

  const onDragOver = (e) => {
    e.preventDefault();
  }

  const onDragLeave = (e) => {
    e.preventDefault();
  }

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick = event => {
    hiddenFileInput.current.click()
  }
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange = async event => {
    const fileUploaded = event.target.files[0]
    setLogo(fileUploaded.name)

    const base64 = await new Promise(resolve => {
      const reader = new FileReader()
      reader.readAsDataURL(fileUploaded)
      reader.onload = () => resolve(reader.result) // base64 Image src
    })

    let onlineSave = {
      logo: base64,
      page: "customize-card"
    }

    localStorage.setItem("userInfo", JSON.stringify(onlineSave))
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

        <div className="my-8 flex grow flex-col-reverse items-center justify-center gap-11 lg:mt-44 lg:flex-row lg:items-start">
          <div className="flex flex-col items-center lg:items-end">
            <div className="h-fit w-fit rounded-2xl border-gray-200 p-11 lg:border lg:bg-white lg:shadow-md">
              <div className="text-[22px] font-bold text-neutral-900">
                Upload
              </div>
              <div className="text-[10px] text-[#46B81E]">
                File must be of high resolution 300DPI and at least 1000px in
                Width
              </div>

              <button
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onClick={handleClick}
                className="mt-[42px] flex flex-col items-center justify-center rounded border border-dashed border-[#384EB74D] bg-[#F8F8FF] px-12 text-center"
              >
                <img
                  className="mt-[30px] w-[60px]"
                  src="icons/upload-icon.svg"
                />
                <div className="mt-[25px] text-base font-bold text-neutral-900">
                  Drag & drop files or
                  <span className="ml-1 text-[#483EA8] underline">Browse</span>
                </div>
                <div className="mt-[10px] mb-11 text-sm text-stone-500">
                  Supported formates: JPEG, PNG, PDF, PSD, AI
                </div>

                {/* <input type="file" /> */}
              </button>

              <input
                type="file"
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: "none" }}
              />

              {/* <div className="mt-10 font-semibold text-stone-500">
                Uploading - 1/1 files
              </div>
              <div className="mt-[10px] flex h-9 w-full items-center justify-between rounded border border-neutral-200 py-2 px-3">
                <div className="text-xs text-neutral-900">
                  My-logo-Design.PDF
                </div>
                <img className="w-4" src="order/images/close.png" />
              </div>
              <div className="-mt-[3px] h-1 w-[75%] rounded-xl bg-[#483EA8]"></div> */}

              {logo ? <div>
                <div className="mt-[28px] font-semibold text-stone-500">
                  Uploaded
                </div>
                <div className="mt-[10px] flex h-9 w-full items-center justify-between rounded border border-[#11AF22] py-2 px-3">
                  <div className="text-xs text-neutral-900">{logo}</div>
                  <img className="w-5 cursor-pointer" src="images/delete.png" onClick={() => {
                    setLogo("")
                    hiddenFileInput.current.value = null
                    const localLogo = JSON.parse(localStorage.getItem("userInfo"))
                    if (localLogo.logo) {
                      localLogo.logo = null
                      localStorage.setItem("userInfo", JSON.stringify(localLogo))
                    }
                  }} />
                </div>
              </div> : null}
            </div>

            <button
              disabled={!Boolean(logo)}
              className="lg:mt-8 flex h-12 w-[215px] items-center justify-between rounded-md bg-[#3562FF] py-3 px-4 text-xs font-semibold text-white"
              onClick={() => router.push(`/customize-card`)}
            >
              <span>Next</span>
              <ArrowNarrowRight className="h-5 w-5" />
            </button>
          </div>
          <div className="h-fit w-80 rounded-lg bg-[#101828] p-3 text-xs font-medium text-white">
            <div className="mb-2 font-semibold">This is a tooltip</div>
            <div>
              Tooltips are used to describe or identify an element. In most
              scenarios, tooltips help the user understand meaning, function or
              alt-text.Tooltips are used to describe or identify an element.
              <br />
              <br /> In most scenarios, tooltips help the user understand
              meaning, function or alt-text.Tooltips are used to describe or
              identify an element. In most scenarios, tooltips help the user
              understand meaning, function or alt-text.Tooltips are used to
              describe or identify an element. In most scenarios, tooltips help
              the user understand meaning, function or alt-text. <br /> <br />
              <br /> Tooltips are used to describe or identify an element. In
              most scenarios, tooltips help the user understand meaning,
              function or alt-text.
              <br /> <br />
              <br /> Tooltips are used to describe or identify an element. In
              most scenarios.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CompletedPage
