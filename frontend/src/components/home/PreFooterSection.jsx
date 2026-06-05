import { useState } from "react";
import { Link } from "react-router-dom";
import TestimonialsImpact from "./TestimonialsImpact";

const STEPS = [
  { num: 1, title: "Browse Products", desc: "Explore wide range of products." },
  { num: 2, title: "Request Bulk Quote", desc: "Get best price for your requirement." },
  { num: 3, title: "Confirm Order", desc: "Confirm and make payment." },
  { num: 4, title: "Get Delivered", desc: "We deliver safely to your doorstep." },
];

const FAQS = [
  {
    question: "Do you provide GST invoices?",
    answer: "Yes, we provide proper GST invoices for all bulk orders.",
  },
  {
    question: "What is the minimum order quantity?",
    answer: "Minimum order is 10 units for most smartphone models.",
  },
  {
    question: "Do you deliver across India?",
    answer: "Yes, we deliver pan-India via trusted courier partners.",
  },
  {
    question: "How can I place a bulk order?",
    answer: "Browse products, request a quote, or contact our sales team directly.",
  },
];

const PHONES_IMAGE =
  "https://res.cloudinary.com/dsafvwkrf/image/upload/v1780661219/61Zdd-f4tCL-removebg-preview_2_u9owxh.png";

function HowItWorksBulkQuote() {
  return (
    <section className="flex flex-col lg:flex-row w-full">
      <div className="flex-1 bg-[#F9F9F9]">
        <div className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-10">
          <h2 className="text-accent font-bold text-base md:text-lg tracking-wide mb-8">
            HOW IT WORKS
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-2 md:gap-3 max-w-4xl">
            {STEPS.map((step, index) => (
              <div key={step.num} className="flex flex-col items-center text-center">
                <span className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-accent text-white font-bold text-sm mb-2 sm:mb-3 shrink-0">
                  {step.num}
                </span>
                <h3 className="font-bold text-black text-xs sm:text-sm leading-tight mb-1">
                  {step.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-gray-500 leading-snug">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:w-[42%] xl:w-[38%] bg-accent relative overflow-hidden flex items-center min-h-[200px] sm:min-h-[240px] shrink-0">
        <div className="relative z-10 flex-1 px-4 sm:px-8 md:px-12 py-6 sm:py-8">
          <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-bold leading-tight mb-2">
            Need 50+ Smartphones?
          </h3>
          <p className="text-white/90 text-sm md:text-base mb-6">
            Get special wholesale pricing for your business.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-md bg-black text-white px-5 py-2.5 text-xs md:text-sm font-bold tracking-wide hover:bg-neutral-900 transition"
          >
            REQUEST BULK QUOTE
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
        <div className="hidden sm:block absolute right-0 bottom-0 top-0 w-[55%] pointer-events-none">
          <img
            src={PHONES_IMAGE}
            alt="Smartphones"
            className="h-full w-full object-contain object-right-bottom"
          />
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-white px-3 sm:px-6 md:px-8 lg:px-12 pb-10 md:pb-12">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="text-accent font-bold text-base md:text-lg tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <Link
            to="/contact"
            className="text-accent font-bold text-xs md:text-sm tracking-wide hover:underline inline-flex items-center gap-1"
          >
            VIEW ALL FAQS
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {FAQS.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-3 px-4 py-4 text-left hover:bg-gray-50 transition"
              >
                <span className="text-sm font-medium text-black leading-snug">
                  {faq.question}
                </span>
                <span className="text-gray-400 text-xl leading-none shrink-0">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <p className="px-4 pb-4 text-xs text-gray-500 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterBar() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <section className="bg-black px-3 sm:px-6 md:px-8 lg:px-12 py-8 md:py-10">
      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="shrink-0 text-accent">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75" />
            </svg>
          </div>
          <div>
            <h3 className="text-white font-bold text-lg md:text-xl mb-1">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 text-sm">
              Get the latest updates on bulk deals and new arrivals.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 w-full lg:max-w-md xl:max-w-lg shrink-0"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 rounded-md bg-neutral-900 border border-neutral-700 text-white text-sm px-4 py-3 placeholder:text-gray-500 focus:outline-none focus:border-accent"
            required
          />
          <button
            type="submit"
            className="rounded-md bg-accent text-white px-6 py-3 text-sm font-bold tracking-wide hover:brightness-110 transition whitespace-nowrap"
          >
            {submitted ? "SUBSCRIBED!" : "SUBSCRIBE"}
          </button>
        </form>
      </div>
    </section>
  );
}

function PreFooterSection() {
  return (
    <>
      <TestimonialsImpact />
      <HowItWorksBulkQuote />
      <FAQSection />
      <NewsletterBar />
    </>
  );
}

export default PreFooterSection;
