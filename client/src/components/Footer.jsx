// import { Link } from "react-router-dom";

// import {
//   FaFacebookF,
//   FaInstagram,
//   FaLinkedinIn,
//   FaYoutube,
//   FaTelegramPlane,
// } from "react-icons/fa";

// function Footer() {
//   return (
//     <footer className="bg-black text-white mt-20">

//       <div className="w-full px-12 py-20">

//         {/* BRAND SECTION */}

//         <div className="mb-16">

//           <div className="flex items-center gap-4 mb-6">

//             <img
//               src="/logo.png.png"
//               alt="EV Times"
//               className="w-20 h-20 object-contain"
//             />

//             <div>

//               <h2 className="text-5xl font-extrabold">

//                 EV TIMES

//               </h2>

//               <p className="text-gray-500 mt-1">

//                 Electric Vehicle & AI News

//               </p>

//             </div>

//           </div>

//           <p
//             className="
//               text-gray-300
//               text-lg
//               leading-9
//               w-full
//             "
//           >

//             EV TIMES is a modern digital news platform covering Electric Vehicles, 
//             Battery Technology, Artificial Intelligence, Clean Energy, Business, and Global
//              Technology trends. Our mission is to deliver accurate, timely, and insightful news that helps 
//              readers stay informed about the future of mobility, innovation, and sustainable technology.
// <br/>
// <br/>
//             EV TIMES delivers the latest coverage on
//             Electric Vehicles, Battery Technology,
//             Artificial Intelligence, Charging
//             Infrastructure, Business Trends and
//             International developments.

//             <br />
//             <br />

//             Our mission is to provide fast,
//             accurate and insightful reporting
//             for the future of mobility,
//             technology and clean energy.

//           </p>

//           <div
//             className="
//               mt-8
//               grid
//               grid-cols-2
//               md:grid-cols-4
//               gap-4
//               text-gray-300
//             "
//           >

//             <p>⚡ EV Updates</p>

//             <p>🔋 Battery Insights</p>

//             <p>🤖 AI News</p>

//             <p>📰 Breaking Stories</p>

//           </div>

//         </div>

//         {/* FOOTER GRID */}

//         <div
//           className="
//             grid
//             grid-cols-2
//             md:grid-cols-3
//             lg:grid-cols-5
//             gap-10
//           "
//         >

//           {/* QUICK LINKS */}

//           <div>

//             <h3 className="font-bold text-xl mb-5">

//               Quick Links

//             </h3>

//             <ul className="space-y-3">

//               <li>
//                 <Link to="/" className="hover:text-gray-300">
//                   Home
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/featured-news"
//                   className="hover:text-gray-300"
//                 >
//                   Featured News
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/editors-pick"
//                   className="hover:text-gray-300"
//                 >
//                   Editor's Pick
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/about"
//                   className="hover:text-gray-300"
//                 >
//                   About Us
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/contact"
//                   className="hover:text-gray-300"
//                 >
//                   Contact
//                 </Link>
//               </li>

//             </ul>

//           </div>

//           {/* CATEGORIES */}

//           <div>

//             <h3 className="font-bold text-xl mb-5">

//               Categories

//             </h3>

//             <ul className="space-y-3">

//               <li>
//                 <Link
//                   to="/ev-news"
//                   className="hover:text-gray-300"
//                 >
//                   EV News
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/bms"
//                   className="hover:text-gray-300"
//                 >
//                   BMS News
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/international"
//                   className="hover:text-gray-300"
//                 >
//                   International
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/technology"
//                   className="hover:text-gray-300"
//                 >
//                   Technology
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/business"
//                   className="hover:text-gray-300"
//                 >
//                   Business
//                 </Link>
//               </li>

//             </ul>

//           </div>

//           {/* STATES */}

//           <div>

//             <h3 className="font-bold text-xl mb-5">

//               States

//             </h3>

//             <ul className="space-y-3">

//               <li><Link to="/state/delhi">Delhi</Link></li>

//               <li><Link to="/state/maharashtra">Maharashtra</Link></li>

//               <li><Link to="/state/karnataka">Karnataka</Link></li>

//               <li><Link to="/state/gujarat">Gujarat</Link></li>

//               <li><Link to="/state/punjab">Punjab</Link></li>

//               <li><Link to="/state/rajasthan">Rajasthan</Link></li>

//             </ul>

//           </div>

//           {/* TRENDING */}

//           <div>

//             <h3 className="font-bold text-xl mb-5">

//               Trending

//             </h3>

//             <ul className="space-y-3 text-gray-300">

//               <li>Tesla launches new EV platform</li>

//               <li>BYD battery breakthrough</li>

//               <li>India EV sales surge</li>

//               <li>AI startup raises funding</li>

//               <li>New charging corridor announced</li>

//             </ul>

//           </div>

//           {/* SOCIAL */}

//           <div>

//             <h3 className="font-bold text-xl mb-5">

//               Follow Us

//             </h3>

//             <div className="flex gap-4 text-2xl">

//               <a href="#">
//                 <FaFacebookF />
//               </a>

//               <a href="#">
//                 <FaInstagram />
//               </a>

//               <a href="#">
//                 <FaLinkedinIn />
//               </a>

//               <a href="#">
//                 <FaYoutube />
//               </a>

//               <a href="#">
//                 <FaTelegramPlane />
//               </a>

//             </div>

//           </div>

//         </div>

//         {/* NEWSLETTER */}

//         <div
//           className="
//             border-t
//             border-gray-800
//             mt-16
//             pt-12
//             text-center
//           "
//         >

//           <h3 className="text-3xl font-bold mb-3">

//             Stay Updated

//           </h3>

//           <p className="text-gray-400 mb-6">

//             Get the latest EV and AI news delivered to your inbox.

//           </p>

//           <div
//             className="
//               flex
//               flex-col
//               sm:flex-row
//               justify-center
//               gap-4
//             "
//           >

//             <input
//               type="email"
//               placeholder="Enter your email"
//               className="
//                 px-4
//                 py-3
//                 rounded-lg
//                 text-black
//                 w-full
//                 sm:w-96
//               "
//             />


//           </div>

//         </div>

//         {/* BOTTOM */}

//         <div
//           className="
//             border-t
//             border-gray-800
//             mt-12
//             pt-6
//             flex
//             flex-col
//             md:flex-row
//             justify-between
//             items-center
//             gap-4
//             text-gray-400
//           "
//         >

//           <div>

//             © 2026 EV TIMES. All Rights Reserved.

//           </div>

//           <div className="flex gap-6 text-sm">

//             <span>Privacy Policy</span>

//             <span>Terms & Conditions</span>

//             <span>Disclaimer</span>

//             <span>Sitemap</span>

//           </div>

//         </div>

//       </div>

//     </footer>
//   );
// }

// export default Footer;























import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";

import { useEffect, useState } from "react";

import { fetchTrendingNews }
from "../services/newsService";

function Footer() {

  const [trendingNews, setTrendingNews] =
  useState([]);

  useEffect(() => {

  const loadTrendingNews =
    async () => {

      try {

        const response =
  await fetchTrendingNews();

setTrendingNews(

  response.data.articles.slice(0, 5)

);

      }

      catch (error) {

        console.log(error);

      }

    };

  loadTrendingNews();

}, []);

  return (
    <footer className="bg-black text-white mt-20">

      <div className="w-full px-5 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-12 md:py-16 lg:py-20">

        {/* BRAND SECTION */}

        <div className="mb-16">

          <div className="flex flex-col md:flex-row items-center md:items-start gap-4 mb-6 text-center md:text-left">

            <img
              src="/logo.png.png"
              alt="EV Times"
              className="w-16 h-16 md:w-20 md:h-20 object-contain"
            />

            <div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">

                EV TIMES

              </h2>

              <p className="text-gray-500 mt-1">

                Electric Vehicle & AI News

              </p>

            </div>

          </div>

          <p
            className="
text-gray-300
text-base
md:text-lg
leading-7
md:leading-8
w-full
"
          >

            EV TIMES is a modern digital news platform covering Electric Vehicles, 
            Battery Technology, Artificial Intelligence, Clean Energy, Business, and Global
             Technology trends. Our mission is to deliver accurate, timely, and insightful news that helps 
             readers stay informed about the future of mobility, innovation, and sustainable technology.
<br/>
<br/>
            EV TIMES delivers the latest coverage on
            Electric Vehicles, Battery Technology,
            Artificial Intelligence, Charging
            Infrastructure, Business Trends and
            International developments.

            <br />
            <br />

            Our mission is to provide fast,
            accurate and insightful reporting
            for the future of mobility,
            technology and clean energy.

          </p>

          <div
            className="
              mt-8
              grid
              grid-cols-2 lg:grid-cols-4
              gap-4
              text-gray-300
            "
          >

            <p>⚡ EV Updates</p>

            <p>🔋 Battery Insights</p>

            <p>🤖 AI News</p>

            <p>📰 Breaking Stories</p>

          </div>

        </div>

        {/* FOOTER GRID */}

        <div
          className="
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-4
  xl:grid-cols-5
  gap-8
"
        >

          {/* QUICK LINKS */}

          <div
  className="
    border-b
    border-gray-800
    pb-6
    md:border-0
    md:pb-0
  "
>

            <h3 className="font-bold font-serif text-lg md:text-xl mb-5">

              Quick Links

            </h3>

            <ul
  className="
    grid
    grid-cols-2
    gap-y-3
    gap-x-6
    md:block
    md:space-y-3
  "
>

              <li>
                <Link to="/" className="hover:text-gray-300">
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/featured-news"
                  className="hover:text-gray-300"
                >
                  Featured News
                </Link>
              </li>

              <li>
                <Link
                  to="/editors-pick"
                  className="hover:text-gray-300"
                >
                  Editor's Pick
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-gray-300"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="hover:text-gray-300"
                >
                  Contact
                </Link>
              </li>

            </ul>

          </div>

          {/* CATEGORIES */}

          <div
  className="
    border-b
    border-gray-800
    pb-6
    md:border-0
    md:pb-0
  "
>

            <h3 className="font-bold font-serif text-xl mb-5">

              Categories

            </h3>

            <ul
  className="
    grid
    grid-cols-2
    gap-y-3
    gap-x-6
    md:block
    md:space-y-3
  "
>

              <li>
                <Link
                  to="/ev-news"
                  className="hover:text-gray-300"
                >
                  EV News
                </Link>
              </li>

              <li>
                <Link
                  to="/bms"
                  className="hover:text-gray-300"
                >
                  BMS News
                </Link>
              </li>

              <li>
                <Link
                  to="/international"
                  className="hover:text-gray-300"
                >
                  International
                </Link>
              </li>

              

              

            </ul>

          </div>

          {/* STATES */}

          <div
  className="
    border-b
    border-gray-800
    pb-6
    md:border-0
    md:pb-0
  "
>

            <h3 className="font-bold font-serif text-xl mb-5">

              States

            </h3>

            <ul
  className="
    grid
    grid-cols-2
    gap-y-3
    gap-x-6
    md:block
    md:space-y-3
  "
>

              <li><Link to="/state/delhi">Delhi</Link></li>

              <li><Link to="/state/maharashtra">Maharashtra</Link></li>

              <li><Link to="/state/karnataka">Karnataka</Link></li>

              <li><Link to="/state/gujarat">Gujarat</Link></li>

              <li><Link to="/state/punjab">Punjab</Link></li>

              <li><Link to="/state/rajasthan">Rajasthan</Link></li>

            </ul>

          </div>

          {/* TRENDING */}

          <div
  className="
    border-b
    border-gray-800
    pb-6
    md:border-0
    md:pb-0
  "
>

            <h3
  className="
    font-bold
    font-serif
    text-lg
    md:text-xl
    mb-6
    uppercase
    tracking-wider
    text-white
  "
>

  Trending News

</h3>

            <ul className="space-y-4">

  {

    trendingNews.map((news) => (

      <li
  key={news._id}
  className="
    border-b
    border-gray-800
    pb-3
    last:border-none
    last:pb-0
  "
>

  <Link

    to={`/news/${news._id}`}

    className="

      group

      flex

      items-start

      gap-3

    "

  >

    <div
      className="
        mt-1
        flex-shrink-0
      "
    >

      <FiArrowUpRight
        className="
          text-red-500
          text-lg
          transition-transform
          duration-300
          group-hover:translate-x-1
          group-hover:-translate-y-1
        "
      />

    </div>

    <span
      className="

        text-gray-300

        text-sm

        leading-6

        line-clamp-2

        transition-colors

        duration-300

        group-hover:text-cyan-400

      "
    >

      {news.title}

    </span>

  </Link>

</li>

    ))

  }

</ul>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="font-bold font-serif text-xl mb-5">

              Follow Us

            </h3>

            <div className="flex flex-wrap gap-4 text-xl md:text-2xl">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaLinkedinIn />
              </a>

              <a href="#">
                <FaYoutube />
              </a>

              <a href="#">
                <FaTelegramPlane />
              </a>

            </div>

          </div>

        </div>

        {/* NEWSLETTER */}

        <div
          className="
            border-t
            border-gray-800
            mt-16
            pt-12
            text-center
          "
        >

          <h3 className="text-2xl md:text-3xl font-bold mb-3">

            Stay Updated

          </h3>

          <p className="text-gray-400 mb-6">

            Get the latest EV and AI news delivered to your inbox.

          </p>

          <div
            className="
              flex
              flex-col
              sm:flex-row
              justify-center
              gap-4
            "
          >

            <input
              type="email"
              placeholder="Enter your email"
              className="
                px-4
                py-3
                rounded-lg
                text-black
                w-full
                w-full
sm:max-w-md
              "
            />


          </div>

        </div>

        {/* BOTTOM */}

        <div
          className="
            border-t
            border-gray-800
            mt-12
            pt-6
            flex
flex-col
lg:flex-row
justify-between
items-center
text-center
lg:text-left
            gap-4
            text-gray-400
          "
        >

          <div>

            © 2026 EV TIMES. All Rights Reserved.

          </div>

          <div className="flex flex-wrap justify-center lg:justify-end gap-4 text-sm">

            <span>Privacy Policy</span>

            <span>Terms & Conditions</span>

            <span>Disclaimer</span>

            <span>Sitemap</span>

          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;

