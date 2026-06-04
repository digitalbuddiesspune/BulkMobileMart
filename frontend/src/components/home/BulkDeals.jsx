const deals = [
  {
    title: "Entry-Level Bulk",
    desc: "Redmi, Realme, Samsung A-series — ideal for retail shops & small sellers.",
    min: "Min. 20 units",
    highlight: "From ₹6,999/unit",
  },
  {
    title: "Mid-Range Packs",
    desc: "OnePlus Nord, Samsung M-series, Vivo — strong margins for resellers.",
    min: "Min. 15 units",
    highlight: "From ₹14,999/unit",
  },
  {
    title: "Premium Wholesale",
    desc: "iPhone, Samsung S/Ultra, flagship OnePlus — for premium outlets.",
    min: "Min. 10 units",
    highlight: "Custom quote",
  },
];

function BulkDeals() {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Popular Bulk Categories
        </h2>
        <p className="text-neutral-400 text-center mb-12 max-w-2xl mx-auto">
          Mix models and quantities to match your business. Prices update weekly
          — contact us for today&apos;s rate card.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {deals.map((deal) => (
            <article
              key={deal.title}
              className="rounded-2xl bg-neutral-900 border border-neutral-800 p-8 hover:border-accent transition"
            >
              <h3 className="text-xl font-bold mb-2">{deal.title}</h3>
              <p className="text-neutral-400 text-sm mb-4">{deal.desc}</p>
              <p className="text-accent font-semibold mb-1">{deal.highlight}</p>
              <p className="text-neutral-500 text-xs">{deal.min}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BulkDeals;
