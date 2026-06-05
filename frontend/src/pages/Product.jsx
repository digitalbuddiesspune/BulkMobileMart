const categories = [
  {
    title: "Smartphones",
    desc: "Latest models from Samsung, Apple, Xiaomi, OnePlus, Vivo, Oppo, Realme & more.",
  },
  {
    title: "Tablets",
    desc: "iPads, Samsung Galaxy Tabs, and budget tablets for retail and enterprise.",
  },
  {
    title: "Accessories",
    desc: "Earbuds, chargers, cables, cases, and power banks in bulk quantities.",
  },
  {
    title: "Smart Watches",
    desc: "Wearables from leading brands for retail and corporate gifting.",
  },
  {
    title: "Feature Phones",
    desc: "Affordable keypad phones for mass-market and rural distribution.",
  },
  {
    title: "Other Gadgets",
    desc: "Power banks, action cameras, and trending mobile accessories.",
  },
];

function Product() {
  return (
    <div className="bg-black text-white">
      <section className="py-10 sm:py-16 md:py-20 px-3 sm:px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">Our Products</h1>
          <p className="text-neutral-400 text-lg max-w-3xl leading-relaxed">
            Browse wholesale smartphones, tablets, and mobile accessories. Minimum
            order 10 units. GST invoices and pan-India delivery available.
          </p>
        </div>
      </section>

      <section className="py-10 sm:py-12 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-accent/50 transition"
            >
              <h2 className="text-xl font-bold mb-3 text-accent">{item.title}</h2>
              <p className="text-neutral-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Product;
