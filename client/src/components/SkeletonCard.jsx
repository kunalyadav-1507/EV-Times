import Navbar from "./Navbar";

function SkeletonCard({
  fullPage = false,
   type = "card"
}) {
  if (fullPage) {

  return (

    <>

      <Navbar />

      
      <div className="bg-gray-100 min-h-screen">

        <div className="max-w-9xl px-6 py-8">

          {/* Title */}

          <div className="h-12 w-80 bg-gray-300 rounded mb-4 animate-pulse" />

          <div className="h-5 w-96 bg-gray-300 rounded mb-8 animate-pulse" />

          {/* Top Layout */}

          <div className="grid grid-cols-12 gap-6">

            {/* Hero */}

            <div className="col-span-6">

              <div className="h-[450px] bg-gray-300 rounded-2xl animate-pulse" />

              <div className="h-10 bg-gray-300 rounded mt-4 animate-pulse" />

              <div className="h-5 bg-gray-300 rounded mt-3 animate-pulse" />

              <div className="h-5 w-4/5 bg-gray-300 rounded mt-2 animate-pulse" />

            </div>

            {/* Small Stories */}

            <div className="col-span-4">

              <div className="grid grid-cols-2 gap-4">

                {[...Array(4)].map((_, index) => (

                  <div key={index}>

                    <div className="h-40 bg-gray-300 rounded-xl animate-pulse" />

                    <div className="h-5 bg-gray-300 rounded mt-3 animate-pulse" />

                    <div className="h-5 w-3/4 bg-gray-300 rounded mt-2 animate-pulse" />

                  </div>

                ))}

              </div>

            </div>

            {/* Ad */}

            <div className="col-span-2">

              <div className="h-[650px] bg-gray-300 rounded-2xl animate-pulse" />

            </div>

          </div>

        </div>

      </div>

    </>

  );

}

if (type === "home") {

  return (

    <>

      <Navbar />

      <div className="bg-gray-100 min-h-screen">

        <div className="max-w-9xl  px-5 py-6">

          <div className="grid grid-cols-12 gap-5">

            {/* HERO */}

            <div className="col-span-7">

              <div className="
                h-[380px]
                bg-gray-300
                rounded-2xl
                animate-pulse
              " />

              <div className="
                h-10
                bg-gray-300
                rounded
                mt-5
                animate-pulse
              " />

              <div className="
                h-10
                bg-gray-300
                rounded
                mt-3
                w-4/5
                animate-pulse
              " />

              <div className="
                h-4
                bg-gray-300
                rounded
                mt-5
                animate-pulse
              " />

              <div className="
                h-4
                bg-gray-300
                rounded
                mt-2
                w-5/6
                animate-pulse
              " />

            </div>

            {/* MIDDLE STORIES */}

            <div className="col-span-3">

              {[...Array(5)].map((_, index) => (

                <div
                  key={index}
                  className="
                    flex
                    gap-3
                    mb-5
                  "
                >

                  <div className="
                    w-20
                    h-20
                    bg-gray-300
                    rounded-lg
                    animate-pulse
                  " />

                  <div className="flex-1">

                    <div className="
                      h-4
                      bg-gray-300
                      rounded
                      mb-2
                      animate-pulse
                    " />

                    <div className="
                      h-4
                      bg-gray-300
                      rounded
                      w-4/5
                      animate-pulse
                    " />

                  </div>

                </div>

              ))}

            </div>

            {/* AD */}

            <div className="col-span-2">

              <div className="
                h-[550px]
                bg-gray-300
                rounded-2xl
                animate-pulse
              " />

            </div>

          </div>

        </div>

      </div>

    </>

  );

}
if (type === "evnews") {

  return (
    <>

    <Navbar/>

    <div className="bg-gray-100 min-h-screen px-8 py-6">

      <div className="grid lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN */}

        <div className="lg:col-span-3">

          <div className="h-8 w-28 bg-gray-300 rounded animate-pulse mb-8" />

          {[...Array(4)].map((_, index) => (

            <div
              key={index}
              className="border-b border-gray-300 pb-6 mb-6"
            >

              <div className="
                h-6
                bg-gray-300
                rounded
                mb-3
                animate-pulse
              " />

              <div className="
                h-6
                bg-gray-300
                rounded
                w-5/6
                mb-4
                animate-pulse
              " />

              <div className="
                h-4
                bg-gray-300
                rounded
                w-20
                animate-pulse
              " />

            </div>

          ))}

        </div>

        {/* CENTER HERO */}

        <div className="lg:col-span-6">

          <div className="
            h-[420px]
            bg-gray-300
            rounded-2xl
            animate-pulse
          " />

          <div className="
            h-10
            bg-gray-300
            rounded
            mt-6
            animate-pulse
          " />

          <div className="
            h-10
            bg-gray-300
            rounded
            w-5/6
            mt-3
            animate-pulse
          " />

        </div>

        {/* RIGHT COLUMN */}

        <div className="lg:col-span-3">

          {[...Array(2)].map((_, index) => (

            <div
              key={index}
              className="mb-8"
            >

              <div className="
                h-44
                bg-gray-300
                rounded-2xl
                animate-pulse
              " />

              <div className="
                h-5
                bg-gray-300
                rounded
                mt-4
                animate-pulse
              " />

              <div className="
                h-5
                bg-gray-300
                rounded
                w-4/5
                mt-2
                animate-pulse
              " />

            </div>

          ))}

        </div>

      </div>

    </div>

    </>

  );

}

if (type === "bms") {

  return (
    <>
    <Navbar/>

    <div className="bg-gray-100 min-h-screen px-8 py-6">

      <div className="grid lg:grid-cols-12 gap-8">

        {/* LEFT HERO */}

        <div className="lg:col-span-8">

          <div className="
            h-[470px]
            bg-gray-300
            rounded-2xl
            animate-pulse
          " />

          <div className="
            h-10
            bg-gray-300
            rounded
            mt-6
            animate-pulse
          " />

          <div className="
            h-10
            bg-gray-300
            rounded
            w-5/6
            mt-3
            animate-pulse
          " />

          <div className="
            h-5
            bg-gray-300
            rounded
            mt-8
            animate-pulse
          " />

          <div className="
            h-5
            bg-gray-300
            rounded
            w-11/12
            mt-3
            animate-pulse
          " />

          <div className="
            h-5
            bg-gray-300
            rounded
            w-4/5
            mt-3
            animate-pulse
          " />

        </div>

        {/* RIGHT SIDEBAR */}

        <div className="lg:col-span-4">

          <div className="
            h-10
            bg-gray-300
            rounded
            w-56
            mb-8
            animate-pulse
          " />

          {[...Array(4)].map((_, index) => (

            <div
              key={index}
              className="
                flex
                gap-4
                border-b
                border-gray-300
                pb-5
                mb-5
              "
            >

              <div className="
                w-28
                h-24
                bg-gray-300
                rounded-lg
                animate-pulse
              " />

              <div className="flex-1">

                <div className="
                  h-5
                  bg-gray-300
                  rounded
                  mb-3
                  animate-pulse
                " />

                <div className="
                  h-5
                  bg-gray-300
                  rounded
                  w-5/6
                  animate-pulse
                " />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
    </>

  );

}


if (type === "state") {

  return (
    <>
    <Navbar/>

    <div className="bg-gray-100 min-h-screen px-8 py-8">

      <div className="grid lg:grid-cols-12 gap-8">

        {/* LEFT HERO */}

        <div className="lg:col-span-8">

          <div className="
            h-[500px]
            bg-gray-300
            rounded-xl
            animate-pulse
          " />

          <div className="
            h-6
            bg-gray-300
            rounded
            w-40
            mt-6
            animate-pulse
          " />

          <div className="
            h-10
            bg-gray-300
            rounded
            mt-5
            animate-pulse
          " />

          <div className="
            h-10
            bg-gray-300
            rounded
            w-5/6
            mt-3
            animate-pulse
          " />

        </div>

        {/* RIGHT SIDEBAR */}

        <div className="lg:col-span-4">

          <div className="
            h-10
            bg-gray-300
            rounded
            w-64
            mb-8
            animate-pulse
          " />

          {[...Array(5)].map((_, index) => (

            <div
              key={index}
              className="
                border-b
                border-gray-300
                pb-5
                mb-5
              "
            >

              <div className="
                h-5
                bg-gray-300
                rounded
                mb-3
                animate-pulse
              " />

              <div className="
                h-5
                bg-gray-300
                rounded
                w-5/6
                animate-pulse
              " />

            </div>

          ))}

          {/* AD SECTION */}

          <div className="
            mt-8
            bg-white
            rounded-xl
            overflow-hidden
            shadow
          ">

            <div className="
              h-8
              bg-gray-300
              animate-pulse
            " />

            <div className="
              h-[300px]
              bg-gray-300
              animate-pulse
            " />

          </div>

        </div>

      </div>

    </div>
    </>

  );

}


if (type === "international") {

  return (
    <>
    <Navbar/>

    <div className="bg-gray-100 min-h-screen px-8 py-6">

      <div className="grid lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN */}

        <div className="lg:col-span-3">

          {[...Array(3)].map((_, index) => (

            <div
              key={index}
              className="
                border-b
                border-gray-300
                pb-6
                mb-6
              "
            >

              <div className="
                h-4
                w-20
                bg-gray-300
                rounded
                mb-4
                animate-pulse
              " />

              <div className="
                h-6
                bg-gray-300
                rounded
                mb-3
                animate-pulse
              " />

              <div className="
                h-6
                bg-gray-300
                rounded
                w-5/6
                mb-4
                animate-pulse
              " />

              <div className="
                h-4
                w-24
                bg-gray-300
                rounded
                animate-pulse
              " />

            </div>

          ))}

          <div className="
            h-[180px]
            bg-gray-300
            rounded-xl
            animate-pulse
          " />

        </div>

        {/* CENTER CONTENT */}

        <div className="lg:col-span-6">

          <div className="
            h-14
            bg-gray-300
            rounded
            mb-6
            animate-pulse
          " />

          <div className="
            h-[320px]
            bg-gray-300
            rounded-2xl
            mb-6
            animate-pulse
          " />

          <div className="
            h-5
            bg-gray-300
            rounded
            mb-3
            animate-pulse
          " />

          <div className="
            h-5
            bg-gray-300
            rounded
            mb-3
            animate-pulse
          " />

          <div className="
            h-5
            bg-gray-300
            rounded
            w-5/6
            mb-8
            animate-pulse
          " />

          <div className="
            h-4
            w-32
            bg-gray-300
            rounded
            animate-pulse
          " />

          <div className="
            h-[220px]
            bg-gray-300
            rounded-xl
            mt-8
            animate-pulse
          " />

        </div>

        {/* RIGHT COLUMN */}

        <div className="lg:col-span-3">

          <div className="
            h-[260px]
            bg-gray-300
            rounded-2xl
            mb-8
            animate-pulse
          " />

          <div className="
            h-10
            w-56
            bg-gray-300
            rounded
            mb-8
            animate-pulse
          " />

          {[...Array(3)].map((_, index) => (

            <div
              key={index}
              className="
                flex
                gap-4
                border-b
                border-gray-300
                pb-4
                mb-4
              "
            >

              <div className="
                w-24
                h-20
                bg-gray-300
                rounded
                animate-pulse
              " />

              <div className="flex-1">

                <div className="
                  h-5
                  bg-gray-300
                  rounded
                  mb-2
                  animate-pulse
                " />

                <div className="
                  h-5
                  bg-gray-300
                  rounded
                  w-4/5
                  animate-pulse
                " />

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
    </>

  );

}


if (type === "featured") {

  return (
    <>
    <Navbar/>

    <div className="bg-gray-100 min-h-screen py-8">

      <div className="max-w-[1900px] mx-auto px-4">

        {/* HEADING */}

        <div className="text-center mb-12">

          <div className="
            h-4
            w-64
            bg-gray-300
            rounded
            mx-auto
            mb-6
            animate-pulse
          " />

          <div className="
            h-14
            w-96
            bg-gray-300
            rounded
            mx-auto
            mb-6
            animate-pulse
          " />

          <div className="
            h-5
            w-[600px]
            bg-gray-300
            rounded
            mx-auto
            mb-3
            animate-pulse
          " />

          <div className="
            h-5
            w-[500px]
            bg-gray-300
            rounded
            mx-auto
            animate-pulse
          " />

        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT AD */}

          <div className="lg:col-span-2">

            <div className="
              h-[650px]
              bg-gray-300
              rounded-2xl
              animate-pulse
            " />

          </div>

          {/* MAIN FEATURED */}

          <div className="lg:col-span-5">

            <div className="
              h-[520px]
              bg-gray-300
              rounded-2xl
              animate-pulse
            " />

          </div>

          {/* SIDE FEATURED */}

          <div className="lg:col-span-3">

            {[...Array(2)].map((_, index) => (

              <div
                key={index}
                className="mb-8"
              >

                <div className="
                  h-48
                  bg-gray-300
                  rounded-2xl
                  animate-pulse
                " />

                <div className="
                  h-7
                  bg-gray-300
                  rounded
                  mt-4
                  animate-pulse
                " />

                <div className="
                  h-7
                  bg-gray-300
                  rounded
                  w-5/6
                  mt-3
                  animate-pulse
                " />

                <div className="
                  h-7
                  bg-gray-300
                  rounded
                  w-4/5
                  mt-3
                  animate-pulse
                " />

              </div>

            ))}

          </div>

          {/* RIGHT AD */}

          <div className="lg:col-span-2">

            <div className="
              h-[650px]
              bg-gray-300
              rounded-2xl
              animate-pulse
            " />

          </div>

        </div>

      </div>

    </div>
    </>

  );

}


if (type === "editor") {

  return (
    <>
    <Navbar/>

    <div className="bg-gray-100 min-h-screen py-8">

      <div className="max-w-[1900px] mx-auto px-4">

        {/* PAGE HEADING */}

        <div className="text-center mb-10">

          <div className="
            h-4
            w-64
            bg-gray-300
            rounded
            mx-auto
            mb-6
            animate-pulse
          " />

          <div className="
            h-16
            w-96
            bg-gray-300
            rounded
            mx-auto
            animate-pulse
          " />

        </div>

        <div className="grid lg:grid-cols-12 gap-8">

          {/* LEFT AD */}

          <div className="lg:col-span-2">

            <div className="
              h-[650px]
              bg-gray-300
              rounded-2xl
              animate-pulse
            " />

          </div>

          {/* CENTER CONTENT */}

          <div className="lg:col-span-8">

            {/* EDITOR NOTE */}

            <div className="
              bg-white
              p-8
              rounded-xl
              mb-10
            ">

              <div className="
                h-4
                w-32
                bg-gray-300
                rounded
                mb-6
                animate-pulse
              " />

              <div className="
                h-5
                bg-gray-300
                rounded
                mb-3
                animate-pulse
              " />

              <div className="
                h-5
                bg-gray-300
                rounded
                w-5/6
                animate-pulse
              " />

            </div>

            {/* MAIN EDITOR PICK */}

            <div className="grid lg:grid-cols-12 gap-8">

              <div className="lg:col-span-6">

                <div className="
                  h-[420px]
                  bg-gray-300
                  rounded-2xl
                  animate-pulse
                " />

              </div>

              <div className="lg:col-span-6">

                <div className="
                  h-4
                  w-36
                  bg-gray-300
                  rounded
                  mb-6
                  animate-pulse
                " />

                <div className="
                  h-12
                  bg-gray-300
                  rounded
                  mb-4
                  animate-pulse
                " />

                <div className="
                  h-12
                  bg-gray-300
                  rounded
                  w-5/6
                  mb-4
                  animate-pulse
                " />

                <div className="
                  h-12
                  bg-gray-300
                  rounded
                  w-4/5
                  mb-8
                  animate-pulse
                " />

                <div className="
                  h-5
                  bg-gray-300
                  rounded
                  mb-3
                  animate-pulse
                " />

                <div className="
                  h-5
                  bg-gray-300
                  rounded
                  mb-3
                  animate-pulse
                " />

                <div className="
                  h-5
                  bg-gray-300
                  rounded
                  w-5/6
                  animate-pulse
                " />

              </div>

            </div>

          </div>

          {/* RIGHT AD */}

          <div className="lg:col-span-2">

            <div className="
              h-[650px]
              bg-gray-300
              rounded-2xl
              animate-pulse
            " />

          </div>

        </div>

      </div>

    </div>
    </>

  );

}


if (type === "search") {


  return (

      <>
  <Navbar/>

    <div className="bg-gray-100 min-h-screen py-8">

      <div className="max-w-[1900px] mx-auto">

        <div className="grid lg:grid-cols-12 gap-6">

          {/* LEFT AD */}

          <div className="lg:col-span-2">

            <div
              className="
                h-[600px]
                bg-gray-300
                rounded-2xl
                animate-pulse
              "
            />

          </div>

          {/* CENTER CONTENT */}

          <div className="lg:col-span-8">

            {/* HEADING */}

            <div
              className="
                h-14
                w-80
                bg-gray-300
                rounded
                mb-5
                animate-pulse
              "
            />

            <div
              className="
                h-6
                w-64
                bg-gray-300
                rounded
                mb-8
                animate-pulse
              "
            />

            {/* RESULT COUNT */}

            <div
              className="
                h-10
                w-40
                bg-gray-300
                rounded-full
                mb-6
                animate-pulse
              "
            />

            {/* MAIN RESULT IMAGE */}

            <div
              className="
                h-[420px]
                bg-gray-300
                rounded-2xl
                mb-6
                animate-pulse
              "
            />

            {/* TITLE */}

            <div
              className="
                h-10
                bg-gray-300
                rounded
                mb-4
                animate-pulse
              "
            />

            <div
              className="
                h-10
                bg-gray-300
                rounded
                w-5/6
                mb-6
                animate-pulse
              "
            />

            {/* DESCRIPTION */}

            <div
              className="
                h-5
                bg-gray-300
                rounded
                mb-3
                animate-pulse
              "
            />

            <div
              className="
                h-5
                bg-gray-300
                rounded
                mb-3
                animate-pulse
              "
            />

            <div
              className="
                h-5
                bg-gray-300
                rounded
                w-4/5
                animate-pulse
              "
            />

          </div>

          {/* RIGHT AD */}

          <div className="lg:col-span-2">

            <div
              className="
                h-[600px]
                bg-gray-300
                rounded-2xl
                animate-pulse
              "
            />

          </div>

        </div>

      </div>

    </div>
    </>

  );

}
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md animate-pulse">

      <div className="h-56 bg-gray-300"></div>

      <div className="p-5">

        <div className="h-4 bg-gray-300 rounded w-24 mb-4"></div>

        <div className="h-6 bg-gray-300 rounded mb-3"></div>

        <div className="h-6 bg-gray-300 rounded w-5/6 mb-4"></div>

        <div className="h-4 bg-gray-300 rounded mb-2"></div>

        <div className="h-4 bg-gray-300 rounded w-4/5"></div>

      </div>

    </div>
  );
}

export default SkeletonCard;