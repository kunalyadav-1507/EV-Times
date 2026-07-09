// import { FaArrowDown } from "react-icons/fa";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaClock,
} from "react-icons/fa";
import Footer from "../components/Footer";

const Contact = () => {
  return (
    <>
    <div className="bg-gray-50">

      {/* ================= HERO SECTION ================= */}

      <section className="relative min-h-[75vh] sm:min-h-[85vh] overflow-hidden">

        {/* Background Image */}

        <img
          src="hero.png"
          alt="Contact EV Times"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}

        <div className="absolute inset-0 bg-black/65"></div>

        {/* Gradient Overlay */}

        <div className="absolute inset-0 bg-gradient-to-r from-green-900/70 via-black/60 to-black/70"></div>

        {/* Decorative Blur */}

        <div className="absolute top-20 left-10 w-80 h-80 bg-green-500/20 rounded-full blur-[120px]"></div>

        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-emerald-400/20 rounded-full blur-[150px]"></div>

        {/* Content */}

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 min-h-[75vh] sm:min-h-[85vh] flex items-center justify-center">

          <div className="max-w-4xl text-center">

            <p className="uppercase tracking-[4px] sm:tracking-[8px] text-green-400 font-semibold mb-4 sm:mb-5 text-xs sm:text-base">

              Contact EV Times

            </p>

            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 sm:mb-8">

              We'd Love to
              <span className="block text-green-400">
                Hear From You
              </span>

            </h1>

            <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-8 sm:leading-9 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">

              Have a question, partnership idea, media inquiry,
              or feedback? We're always excited to connect with
              readers, innovators, and businesses shaping the
              future of electric mobility.

            </p>

            {/* <button
              onClick={() =>
                document
                  .getElementById("contact-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-green-500/40"
            >
              Send a Message
            </button> */}

          </div>

        </div>

        {/* Scroll Indicator */}

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">

          <div className="flex flex-col items-center gap-3 text-white">

            <span className="text-sm tracking-widest uppercase text-gray-300">
              Scroll
            </span>

            {/* <div className="w-10 h-10 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-md bg-white/10">

              <FaArrowDown />

            </div> */}

          </div>

        </div>

      </section>
      {/* ================= CONTACT INFO ================= */}

<section
  id="contact-info"
  className="relative -mt-12 sm:-mt-24 z-20 pb-16 sm:pb-24 px-4 sm:px-6"
>
  <div className="max-w-7xl mx-auto">

    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.8fr] gap-8 lg:gap-10">

      {/* LEFT */}

      <div className="bg-white rounded-[28px] sm:rounded-[32px] shadow-2xl p-6 sm:p-10">

        <p className="uppercase tracking-[6px] text-green-600 font-semibold mb-4">
          Contact Us
        </p>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-6 sm:mb-8">
          We'd Love to
          <span className="block text-green-600">
            Hear From You
          </span>
        </h2>

        <p className="text-gray-600 text-base sm:text-lg leading-8 sm:leading-9 max-w-2xl mb-8 sm:mb-10">
          Whether you're looking to discuss EV news,
          business partnerships, advertising opportunities,
          or simply have a question, our team is ready to
          assist you.
        </p>

        <div className="flex flex-wrap items-center gap-2 text-sm sm:text-lg">

          <a
            href="/"
            className="text-green-600 hover:text-green-700 font-semibold"
          >
            Home
          </a>

          <span className="text-gray-400">/</span>

          <span className="text-gray-500">
            Contact Us
          </span>

        </div>

      </div>

      {/* RIGHT */}

      <div className="space-y-5">

        {/* Phone */}

        <a
          href="tel:+919119115675"
          className="group bg-white rounded-3xl shadow-xl p-5 sm:p-6 flex gap-4 sm:gap-5 items-center transition-all duration-500 hover:-translate-y-2 hover:shadow-green-300/30"
        >

          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-100 flex items-center justify-center flex-shrink-0">

            <FaPhoneAlt className="text-green-600 text-xl sm:text-2xl"/>

          </div>

          <div>

            <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">

              Call Us

            </p>

            <h3 className="font-bold text-lg sm:text-xl text-gray-900 break-words">

              +91 9119115675

            </h3>

          </div>

        </a>

        {/* Email */}

        <a
          href="mailto:support@ecoplug.in"
          className="group bg-white rounded-3xl shadow-xl p-6 flex gap-5 items-center transition-all duration-500 hover:-translate-y-2 hover:shadow-green-300/30"
        >

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaEnvelope className="text-green-600 text-2xl"/>

          </div>

          <div>

            <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">

              Email Us

            </p>

            <h3 className="font-bold text-base sm:text-lg text-gray-900 break-all">

              support@ecoplug.in

            </h3>

          </div>

        </a>

        {/* Working Hours */}

        <div
          className="group bg-white rounded-3xl shadow-xl p-6 flex gap-5 items-center transition-all duration-500 hover:-translate-y-2 hover:shadow-green-300/30"
        >

          <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center">

            <FaClock className="text-green-600 text-2xl"/>

          </div>

          <div>

            <p className="uppercase tracking-[4px] text-xs text-gray-500 mb-2">

              Working Hours

            </p>

            <h3 className="font-bold text-xl text-gray-900">

              Mon–Sat : 10AM – 6PM

            </h3>

          </div>

        </div>

      </div>

    </div>

  </div>

</section>

    </div>
    <Footer/>
    </>
  );
};

export default Contact;