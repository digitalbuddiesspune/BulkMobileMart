const brands = [
  "Samsung",
  "Apple",
  "Xiaomi",
  "OnePlus",
  "Vivo",
  "Oppo",
  "Realme",
  "Motorola",
];

function FeaturedBrands() {
  return (
    <section className="py-16 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-3">
          Top Brands We Supply
        </h2>
        <p className="text-neutral-400 mb-10 max-w-2xl mx-auto">
          Authorized wholesale channels for leading smartphone brands. Fresh
          stock, sealed boxes, and competitive bulk rates.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {brands.map((brand) => (
            <span
              key={brand}
              className="rounded-full bg-neutral-900 border border-neutral-700 px-6 py-2 text-neutral-300 font-medium hover:border-accent hover:text-accent transition"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedBrands;
