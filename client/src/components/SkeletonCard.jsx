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