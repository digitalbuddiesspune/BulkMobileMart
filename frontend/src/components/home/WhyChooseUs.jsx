const points = [
  {
    icon: "✓",
    title: "100% Genuine Stock",
    desc: "Sealed boxes with valid IMEI. No grey market or refurbished units sold as new.",
  },
  {
    icon: "₹",
    title: "GST Invoices",
    desc: "Proper billing for your business records and input tax credit where applicable.",
  },
  {
    icon: "🚚",
    title: "Pan-India Shipping",
    desc: "Secure bulk dispatch via trusted couriers. Mumbai, Delhi, Bangalore warehouses.",
  },
  {
    icon: "📞",
    title: "Dedicated B2B Support",
    desc: "WhatsApp & phone support for orders, tracking, and repeat bulk pricing.",
  },
];

function WhyChooseUs() {
  return (
    <section className="py-20 px-4 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Why Retailers Choose BulkMobileMart
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 text-center"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent text-xl font-bold mb-4">
                {item.icon}
              </span>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-neutral-400 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
