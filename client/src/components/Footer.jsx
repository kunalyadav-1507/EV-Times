import { Link } from "react-router-dom";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaTelegramPlane,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-black text-white mt-20">

      <div className="w-full px-12 py-20">

        {/* BRAND SECTION */}

        <div className="mb-16">

          <div className="flex items-center gap-4 mb-6">

            <img
              src="/logo.png.png"
              alt="EV Times"
              className="w-20 h-20 object-contain"
            />

            <div>

              <h2 className="text-5xl font-extrabold">

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
              text-lg
              leading-9
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
              grid-cols-2
              md:grid-cols-4
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
            grid-cols-2
            md:grid-cols-3
            lg:grid-cols-5
            gap-10
          "
        >

          {/* QUICK LINKS */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Quick Links

            </h3>

            <ul className="space-y-3">

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

          <div>

            <h3 className="font-bold text-xl mb-5">

              Categories

            </h3>

            <ul className="space-y-3">

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

              <li>
                <Link
                  to="/technology"
                  className="hover:text-gray-300"
                >
                  Technology
                </Link>
              </li>

              <li>
                <Link
                  to="/business"
                  className="hover:text-gray-300"
                >
                  Business
                </Link>
              </li>

            </ul>

          </div>

          {/* STATES */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              States

            </h3>

            <ul className="space-y-3">

              <li><Link to="/state/delhi">Delhi</Link></li>

              <li><Link to="/state/maharashtra">Maharashtra</Link></li>

              <li><Link to="/state/karnataka">Karnataka</Link></li>

              <li><Link to="/state/gujarat">Gujarat</Link></li>

              <li><Link to="/state/punjab">Punjab</Link></li>

              <li><Link to="/state/rajasthan">Rajasthan</Link></li>

            </ul>

          </div>

          {/* TRENDING */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Trending

            </h3>

            <ul className="space-y-3 text-gray-300">

              <li>Tesla launches new EV platform</li>

              <li>BYD battery breakthrough</li>

              <li>India EV sales surge</li>

              <li>AI startup raises funding</li>

              <li>New charging corridor announced</li>

            </ul>

          </div>

          {/* SOCIAL */}

          <div>

            <h3 className="font-bold text-xl mb-5">

              Follow Us

            </h3>

            <div className="flex gap-4 text-2xl">

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

          <h3 className="text-3xl font-bold mb-3">

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
                sm:w-96
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
            md:flex-row
            justify-between
            items-center
            gap-4
            text-gray-400
          "
        >

          <div>

            © 2026 EV TIMES. All Rights Reserved.

          </div>

          <div className="flex gap-6 text-sm">

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
