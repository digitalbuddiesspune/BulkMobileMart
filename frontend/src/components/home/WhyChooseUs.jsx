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
    <section className="py-12 sm:py-16 md:py-20 px-5 sm:px-6 md:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-8 sm:mb-12">
          Why Retailers Choose BulkMobileMart
        </h2>

        <div className="overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory scroll-px-5 lg:overflow-visible lg:snap-none">
          <div className="flex gap-4 pb-2 w-max lg:w-full lg:grid lg:grid-cols-4 lg:gap-6">
            {points.map((item) => (
              <div
                key={item.title}
                className="shrink-0 w-[220px] sm:w-[240px] snap-start rounded-xl border border-neutral-800 bg-neutral-900 p-5 sm:p-6 text-center lg:w-auto"
              >
                <span className="inline-flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-accent/15 text-accent text-xl font-bold mb-3 sm:mb-4">
                  {item.icon}
                </span>
                <h3 className="font-semibold text-sm sm:text-base mb-2">{item.title}</h3>
                <p className="text-neutral-400 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
            <div className="shrink-0 w-2 lg:hidden" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUs;
