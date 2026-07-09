import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
  FaCarSide,
  FaChargingStation,
  FaGlobeAsia,
  FaIndustry,
  FaCheckCircle,
} from "react-icons/fa";
import {
  MdBatteryChargingFull,
  MdPolicy,
} from "react-icons/md";
import {
  FaNewspaper,
  FaGlobe,
  FaBolt,
  FaLeaf,
} from "react-icons/fa";
import {
  FaBullseye,
  FaShieldAlt,
  FaLightbulb,
} from "react-icons/fa";
import {
  FaRobot,
  FaMobileAlt,
  FaBookmark,
  FaCode
} from "react-icons/fa";
const Feature = ({ icon, title }) => (
    <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-5 hover:bg-green-50 hover:shadow-lg transition-all duration-300">

        <div className="w-12 h-12 rounded-xl bg-green-500 text-white flex items-center justify-center text-xl">

            {icon}

        </div>

        <span className="font-semibold text-gray-800">

            {title}

        </span>

    </div>
);

const About = () => {
  return (
    <div className="bg-gray-50">

      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">

        {/* Background Image */}
        <img
          src="about.png"
          alt="About EV Times"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/65"></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30"></div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-center h-full">

          <div className="max-w-5xl mx-auto px-6 text-center text-white">

            {/* Small Heading */}
            <p className="uppercase tracking-[8px] text-green-400 font-semibold mb-5">
              About EV Times
            </p>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-8">
              Driving the Future of
              <br />
              <span className="text-green-400">
                Electric Mobility
              </span>
            </h1>

            {/* Description */}
            <p className="max-w-3xl mx-auto text-lg md:text-xl leading-9 text-gray-200 mb-10">
              EV Times is your trusted destination for the latest Electric
              Vehicle news, battery technology, charging infrastructure,
              government policies, sustainability, and innovations shaping
              the future of transportation.
            </p>

            {/* Button */}
            <Link
              to="/"
              className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 transition-all duration-300 px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-green-500/40"
            >
              Explore Latest News
              <FaArrowRight />
            </Link>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">

          <div className="w-7 h-12 border-2 border-white rounded-full flex justify-center">

            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>

          </div>

        </div>

      </section>
      {/* Mission Section */}
<section className="py-28 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* Left Image */}

      <div>

        <img
          src="mission.png"
          alt="Our Mission"
          className="w-full rounded-[32px] shadow-2xl transition-all duration-500 hover:scale-[1.02]"
        />

      </div>

      {/* Right Content */}

      <div>

        <p className="uppercase tracking-[6px] text-green-600 font-semibold mb-3">
          Our Mission
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          Empowering the World Through
          <span className="text-green-600">
            {" "}Electric Mobility
          </span>
        </h2>

        <p className="text-gray-600 leading-8 text-lg mb-8">
          EV Times is committed to delivering accurate,
          unbiased, and timely news about electric vehicles,
          battery technology, charging infrastructure,
          sustainability, and government policies.
          Our goal is to make the future of mobility easy
          to understand for everyone.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Trusted News</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Battery Innovation</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Global Coverage</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Sustainability</span>
          </div>

        </div>

      </div>

    </div>

  </div>

</section>
{/* ================= WHAT WE COVER ================= */}

<section className="py-28 bg-gray-50">

    <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">

            <p className="uppercase tracking-[6px] text-green-600 font-semibold">
                What We Cover
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
                Everything About Electric Mobility
            </h2>

            <p className="max-w-3xl mx-auto text-gray-600 text-lg">
                EV Times delivers comprehensive coverage of the electric vehicle
                ecosystem—from the latest EV launches and battery innovations to
                charging infrastructure, government policies, and global industry trends.
            </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {/* Card 1 */}
            <div className="
group
bg-white
rounded-3xl
p-8
border
border-gray-100
shadow-lg
transition-all
duration-500
hover:-translate-y-4
hover:shadow-[0_20px_60px_rgba(34,197,94,0.18)]
hover:border-green-300
">

                <FaCarSide className="
text-5xl
text-green-500
mb-5
transition-transform
duration-500
group-hover:scale-110
group-hover:rotate-6
" />

                <h3 className="text-2xl font-semibold mb-3">
                    EV News
                </h3>

                <p className="text-gray-600">
                    Latest launches, reviews, trends and developments from leading EV manufacturers.
                </p>

            </div>

            {/* Card 2 */}

            <div className="
group
bg-white
rounded-3xl
p-8
border
border-gray-100
shadow-lg
transition-all
duration-500
hover:-translate-y-4
hover:shadow-[0_20px_60px_rgba(34,197,94,0.18)]
hover:border-green-300
">

                <MdBatteryChargingFull className="
text-5xl
text-green-500
mb-5
transition-transform
duration-500
group-hover:scale-110
group-hover:rotate-6
"/>

                <h3 className="text-2xl font-semibold mb-3">
                    Battery Technology
                </h3>

                <p className="text-gray-600">
                    Discover innovations in battery chemistry, BMS, fast charging and solid-state batteries.
                </p>

            </div>

            {/* Card 3 */}

            <div className="
group
bg-white
rounded-3xl
p-8
border
border-gray-100
shadow-lg
transition-all
duration-500
hover:-translate-y-4
hover:shadow-[0_20px_60px_rgba(34,197,94,0.18)]
hover:border-green-300
">

                <FaChargingStation className="
text-5xl
text-green-500
mb-5
transition-transform
duration-500
group-hover:scale-110
group-hover:rotate-6
"/>

                <h3 className="text-2xl font-semibold mb-3">
                    Charging Infrastructure
                </h3>

                <p className="text-gray-600">
                    Stay informed about charging networks, technologies and infrastructure expansion.
                </p>

            </div>

            {/* Card 4 */}

            <div className="
group
bg-white
rounded-3xl
p-8
border
border-gray-100
shadow-lg
transition-all
duration-500
hover:-translate-y-4
hover:shadow-[0_20px_60px_rgba(34,197,94,0.18)]
hover:border-green-300
">

                <FaGlobeAsia className="
text-5xl
text-green-500
mb-5
transition-transform
duration-500
group-hover:scale-110
group-hover:rotate-6
"/>

                <h3 className="text-2xl font-semibold mb-3">
                    Global News
                </h3>

                <p className="text-gray-600">
                    International EV developments from Tesla, BYD, Hyundai, Rivian and many more.
                </p>

            </div>

            {/* Card 5 */}

            <div className="
group
bg-white
rounded-3xl
p-8
border
border-gray-100
shadow-lg
transition-all
duration-500
hover:-translate-y-4
hover:shadow-[0_20px_60px_rgba(34,197,94,0.18)]
hover:border-green-300
">

                <MdPolicy className="
text-5xl
text-green-500
mb-5
transition-transform
duration-500
group-hover:scale-110
group-hover:rotate-6
"/>

                <h3 className="text-2xl font-semibold mb-3">
                    Government Policies
                </h3>

                <p className="text-gray-600">
                    Understand subsidies, regulations, incentives and future EV policies.
                </p>

            </div>

            {/* Card 6 */}

            <div className="
group
bg-white
rounded-3xl
p-8
border
border-gray-100
shadow-lg
transition-all
duration-500
hover:-translate-y-4
hover:shadow-[0_20px_60px_rgba(34,197,94,0.18)]
hover:border-green-300
">

                <FaIndustry className="
text-5xl
text-green-500
mb-5
transition-transform
duration-500
group-hover:scale-110
group-hover:rotate-6
"/>

                <h3 className="text-2xl font-semibold mb-3">
                    Industry Insights
                </h3>

                <p className="text-gray-600">
                    Market trends, startup ecosystem, investments and sustainability initiatives.
                </p>

            </div>

        </div>

    </div>

</section>
{/* ================= WHY CHOOSE US ================= */}

<section className="py-28 bg-white">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-20 items-center">

      {/* Image */}

      <div>

        <img
          src="why-us.png"
          alt="Why Choose EV Times"
          className="w-full rounded-3xl shadow-2xl"
        />

      </div>

      {/* Content */}

      <div>

        <p className="uppercase tracking-[6px] text-green-600 font-semibold mb-3">
          Why Choose EV Times
        </p>

        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Trusted Information for the
          <span className="text-green-600"> EV Community</span>
        </h2>

        <p className="text-gray-600 text-lg leading-8 mb-10">
          We combine reliable journalism with modern technology to deliver
          fast, accurate, and insightful coverage of the rapidly evolving
          electric vehicle ecosystem. Whether you're an enthusiast,
          professional, investor, or everyday reader, EV Times keeps you
          informed with content you can trust.
        </p>

        <div className="grid sm:grid-cols-2 gap-5">

          {[
            "Accurate & Verified News",
            "Daily Industry Updates",
            "AI-Assisted Research",
            "Trusted Sources",
            "Clean Reading Experience",
            "Global EV Coverage",
          ].map((item) => (
            <div
              key={item}
              className="
flex
items-center
gap-3
bg-gray-50
rounded-xl
p-4
transition-all
duration-500
hover:bg-green-50
hover:-translate-y-2
hover:shadow-lg
"
            >
              <FaCheckCircle className="text-green-500 text-xl" />
              <span className="font-medium text-gray-700">{item}</span>
            </div>
          ))}

        </div>

      </div>

    </div>

  </div>

</section>
{/* ================= EV TIMES IN NUMBERS ================= */}

<section className="relative overflow-hidden py-28 bg-gradient-to-br from-green-700 via-green-600 to-emerald-700">

    {/* Decorative Blur Effects */}

    <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>

    <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-green-300/20 rounded-full blur-3xl"></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}

        <div className="text-center mb-20">

            <p className="uppercase tracking-[7px] text-green-100 font-semibold mb-4">

                EV Times At A Glance

            </p>

            <h2 className="text-5xl font-bold text-white mb-6">

                Powering the Future of
                <span className="block text-green-200">
                    Electric Mobility Journalism
                </span>

            </h2>

            <p className="max-w-3xl mx-auto text-lg text-green-100 leading-8">

                Delivering reliable insights, real-time updates, and comprehensive
                coverage of the rapidly evolving electric vehicle ecosystem.

            </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card */}

            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-4 hover:bg-white/20 hover:shadow-2xl">

                <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">

                    <FaNewspaper className="text-4xl text-white"/>

                </div>

                <h3 className="text-5xl font-extrabold text-white mb-3">

                    500+

                </h3>

                <p className="text-green-100 text-lg">

                    News Articles

                </p>

            </div>

            {/* Card */}

            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-4 hover:bg-white/20 hover:shadow-2xl">

                <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">

                    <FaGlobe className="text-4xl text-white"/>

                </div>

                <h3 className="text-5xl font-extrabold text-white mb-3">

                    15+

                </h3>

                <p className="text-green-100 text-lg">

                    News Categories

                </p>

            </div>

            {/* Card */}

            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-4 hover:bg-white/20 hover:shadow-2xl">

                <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">

                    <FaBolt className="text-4xl text-white"/>

                </div>

                <h3 className="text-5xl font-extrabold text-white mb-3">

                    24/7

                </h3>

                <p className="text-green-100 text-lg">

                    Latest Updates

                </p>

            </div>

            {/* Card */}

            <div className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 text-center transition-all duration-500 hover:-translate-y-4 hover:bg-white/20 hover:shadow-2xl">

                <div className="w-20 h-20 rounded-full bg-white/15 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition">

                    <FaLeaf className="text-4xl text-white"/>

                </div>

                <h3 className="text-5xl font-extrabold text-white mb-3">

                    100%

                </h3>

                <p className="text-green-100 text-lg">

                    EV Focused

                </p>

            </div>

        </div>

    </div>

</section>
{/* ================= OUR CORE VALUES ================= */}

<section className="relative py-28 bg-gray-50 overflow-hidden">

    {/* Background Decorations */}

    <div className="absolute -top-32 right-0 w-96 h-96 bg-green-200/20 rounded-full blur-3xl"></div>

    <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>

    <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Heading */}

        <div className="text-center mb-20">

            <p className="uppercase tracking-[7px] text-green-600 font-semibold mb-4">

                Our Core Values

            </p>

            <h2 className="text-5xl font-bold text-gray-900 mb-6">

                Principles That Drive
                <span className="block text-green-600">
                    EV Times Forward
                </span>

            </h2>

            <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-8">

                Every article we publish and every feature we build is guided by
                our commitment to quality, innovation, transparency, and a
                sustainable future.

            </p>

        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* Card 1 */}

            <div className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl p-8 transition-all duration-500 hover:-translate-y-4">

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition">

                    <FaBullseye />

                </div>

                <h3 className="text-2xl font-bold mb-4">

                    Accuracy

                </h3>

                <p className="text-gray-600 leading-7">

                    We publish reliable, fact-checked EV news backed by trusted
                    sources and industry insights.

                </p>

            </div>

            {/* Card 2 */}

            <div className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl p-8 transition-all duration-500 hover:-translate-y-4">

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition">

                    <FaShieldAlt />

                </div>

                <h3 className="text-2xl font-bold mb-4">

                    Transparency

                </h3>

                <p className="text-gray-600 leading-7">

                    Honest reporting, credible journalism, and clear information
                    without unnecessary bias.

                </p>

            </div>

            {/* Card 3 */}

            <div className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl p-8 transition-all duration-500 hover:-translate-y-4">

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition">

                    <FaLightbulb />

                </div>

                <h3 className="text-2xl font-bold mb-4">

                    Innovation

                </h3>

                <p className="text-gray-600 leading-7">

                    Leveraging modern technologies and AI to make EV information
                    smarter and easier to access.

                </p>

            </div>

            {/* Card 4 */}

            <div className="group bg-white rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl p-8 transition-all duration-500 hover:-translate-y-4">

                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-700 flex items-center justify-center text-white text-3xl mb-6 group-hover:scale-110 transition">

                    <FaLeaf />

                </div>

                <h3 className="text-2xl font-bold mb-4">

                    Sustainability

                </h3>

                <p className="text-gray-600 leading-7">

                    Promoting cleaner transportation and supporting the global
                    transition toward sustainable mobility.

                </p>

            </div>

        </div>

    </div>

</section>
{/* ================= OUR VISION ================= */}

<section className="relative min-h-[700px] py-28 overflow-hidden">

    {/* Background Image */}

    <img
        src="vision.png"
        alt="Our Vision"
        className="absolute inset-0 w-full h-full object-cover"
    />

    {/* Dark Overlay */}

    <div className="absolute inset-0 bg-black/65"></div>

    {/* Green Gradient */}

    <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 via-black/60 to-black/70"></div>

    {/* Content */}

    <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[700px] flex items-center">

        <div className="max-w-3xl">

            <p className="uppercase tracking-[8px] text-green-400 font-semibold mb-4">

                Our Vision

            </p>

            <h2 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-8">

                Building the Future of
                <span className="block text-green-400">
                    Electric Mobility Journalism
                </span>

            </h2>

            <p className="text-gray-200 text-xl leading-9 mb-10">

                We envision EV Times becoming one of the world's most trusted
                destinations for electric vehicle news, battery innovation,
                sustainable transportation, and emerging mobility technologies.
                Our mission is to empower readers with reliable information that
                inspires smarter decisions and accelerates the transition toward
                a cleaner future.

            </p>

            <div className="flex flex-wrap gap-5">

                <a
                    href="/"
                    className="inline-flex items-center gap-3 bg-green-500 hover:bg-green-600 px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300 hover:scale-105"
                >
                    Explore Latest News
                    <FaArrowRight />
                </a>

                <a
                    href="/contact"
                    className="inline-flex items-center gap-3 border border-white/30 backdrop-blur-md bg-white/10 hover:bg-white/20 px-8 py-4 rounded-full text-lg font-semibold text-white transition-all duration-300"
                >
                    Contact Us
                </a>

            </div>

        </div>

    </div>
    {/* Decorative Blur */}

<div className="absolute top-20 right-20 w-72 h-72 bg-green-400/20 blur-[120px] rounded-full"></div>

<div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/20 blur-[150px] rounded-full"></div>

</section>

{/* ================= PLATFORM SHOWCASE ================= */}

<section className="py-28 bg-white">

    <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Left */}

            <div className="relative">

                {/* Glow */}

                <div className="absolute -inset-5 bg-green-400/20 blur-3xl rounded-[40px]"></div>

                {/* Browser Frame */}

                <div className="relative bg-gray-900 rounded-[30px] shadow-2xl overflow-hidden">

                    {/* Browser Top */}

                    <div className="flex items-center gap-2 px-5 py-4 bg-gray-800">

                        <span className="w-3 h-3 rounded-full bg-red-500"></span>
                        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                        <span className="w-3 h-3 rounded-full bg-green-500"></span>

                    </div>

                    <img
                        src="platform.png"
                        alt="EV Times"
                        className="w-full"
                    />

                </div>

            </div>

            {/* Right */}

            <div>

                <p className="uppercase tracking-[7px] text-green-600 font-semibold mb-4">

                    Experience EV Times

                </p>

                <h2 className="text-5xl font-bold mb-8">

                    Built for the
                    <span className="block text-green-600">
                        Future of EV Journalism
                    </span>

                </h2>

                <p className="text-gray-600 text-lg leading-8 mb-10">

                    EV Times combines modern technology with reliable journalism
                    to create a fast, responsive, and intelligent platform
                    dedicated entirely to electric mobility.

                </p>

                <div className="grid sm:grid-cols-2 gap-5">

                    <Feature icon={<FaRobot />} title="AI Assisted News" />

                    <Feature icon={<FaBolt />} title="Fast Performance" />

                    <Feature icon={<FaBookmark />} title="Save Articles" />

                    <Feature icon={<FaMobileAlt />} title="Responsive UI" />

                    <Feature icon={<FaGlobe />} title="Global Coverage" />

                    <Feature icon={<FaCode />} title="MERN Powered" />

                </div>

            </div>

        </div>

    </div>

</section>
    </div>
  );
};

export default About;