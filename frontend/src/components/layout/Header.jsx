function Header() {
  return (
    <div className="bg-black text-neutral-400 text-xs py-1 px-4 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-1">
        <p className="text-neutral-300">
          Wholesale smartphones · Minimum order 10 units
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="tel:+919876543210" className="hover:text-accent transition">
            +91 98765 43210
          </a>
          <a
            href="mailto:sales@bulkmobilemart.com"
            className="hover:text-accent transition"
          >
            sales@bulkmobilemart.com
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
