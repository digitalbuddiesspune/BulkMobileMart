import { Link, NavLink } from "react-router-dom";

const LOGO_URL =
  "https://res.cloudinary.com/dsafvwkrf/image/upload/v1780561447/Bulkmobilemart_logo_2-removebg-preview_wcso0k.png";

const navLinkClass = ({ isActive }) =>
  `font-medium transition ${
    isActive ? "text-accent" : "text-gray-700 hover:text-accent"
  }`;

function Navbar() {
  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-wrap items-center justify-between gap-3">
        <Link to="/" className="flex items-center group">
          <img
            src={LOGO_URL}
            alt="BulkMobileMart.in - Smart Choice, Best Price"
            className="h-9 md:h-10 w-auto object-contain group-hover:opacity-90 transition"
          />
        </Link>

        <ul className="flex flex-wrap items-center gap-6">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={navLinkClass}>
              Contact
            </NavLink>
          </li>
        </ul>

        <Link
          to="/contact"
          className="rounded-lg bg-accent text-white px-5 py-2.5 text-sm font-semibold hover:brightness-110 transition"
        >
          Get Bulk Quote
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
