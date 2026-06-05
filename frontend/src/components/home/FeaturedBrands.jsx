const SAMSUNG_IMAGE =
  "https://res.cloudinary.com/dsafvwkrf/image/upload/v1780661219/61Zdd-f4tCL-removebg-preview_2_u9owxh.png";

const categories = [
  {
    name: "Smartphones",
    image: SAMSUNG_IMAGE,
  },
  {
    name: "Tablets",
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Accessories",
    image:
      "https://images.unsplash.com/photo-1598331668826-9330c8a2c393?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Smart Watches",
    image:
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Feature Phones",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80&auto=format&fit=crop",
  },
  {
    name: "Other Gadgets",
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&q=80&auto=format&fit=crop",
  },
];

function ArrowButton() {
  return (
    <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full bg-accent text-white">
      <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </span>
  );
}

function FeaturedBrands() {
  return (
    <section className="bg-black px-5 sm:px-6 md:px-8 lg:px-12 pt-2 md:pt-4 pb-10 md:pb-12">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-accent mb-4 md:mb-6">
          Top Brands We Sell
        </h2>

        <div className="overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory scroll-px-5 lg:overflow-visible lg:snap-none">
          <div className="flex gap-3 pb-2 w-max lg:w-full">
            {categories.map((item) => (
              <div
                key={item.name}
                className="group flex flex-col shrink-0 w-[130px] sm:w-[150px] snap-start rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition min-h-[110px] sm:min-h-[130px] lg:flex-1 lg:w-auto lg:min-h-[150px]"
              >
                <div className="flex flex-1 items-center justify-center px-2 pt-3 pb-1 md:px-3 md:pt-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-14 sm:max-h-16 md:max-h-20 w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                <div className="flex items-center justify-between gap-1 px-2 pb-2 sm:px-2.5 sm:pb-2.5 md:px-3 md:pb-3">
                  <span className="text-[11px] sm:text-sm font-semibold text-white leading-tight truncate">
                    {item.name}
                  </span>
                  <ArrowButton />
                </div>
              </div>
            ))}
            <div className="shrink-0 w-2 lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedBrands;
