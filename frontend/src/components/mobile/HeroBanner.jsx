import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getHeroBanners } from "../../api/api";

const AUTO_PLAY_MS = 5000;

const DEFAULT_PRODUCT_IMAGE = "/hero-banner.webp";

const FALLBACK_SLIDES = [
  {
    id: "fallback-1",
    src: DEFAULT_PRODUCT_IMAGE,
    alt: "Mobile accessories wholesale - chargers, earphones, watches and more",
  },
];

function HeroBanner() {
  const [slides, setSlides] = useState([]);
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const { data } = await getHeroBanners();
        const banners = (data.data || []).map((b) => ({
          id: b._id,
          src: b.imageUrl,
          alt: b.alt || "Mobile accessories",
        }));
        setSlides(banners.length > 0 ? banners : FALLBACK_SLIDES);
        setCurrent(0);
      } catch {
        setSlides(FALLBACK_SLIDES);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const goTo = useCallback(
    (index) => {
      if (slides.length === 0) return;
      setCurrent((index + slides.length) % slides.length);
    },
    [slides.length]
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, AUTO_PLAY_MS);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (loading) {
    return (
      <section className="relative left-1/2 hidden w-screen max-w-[100vw] -translate-x-1/2 bg-mobile-bg md:block">
        <div className="min-h-[300px] w-full animate-pulse overflow-hidden bg-[#1a1a1a] md:min-h-[320px] lg:min-h-[340px]" />
      </section>
    );
  }

  return (
    <section
      className="relative left-1/2 hidden w-screen max-w-[100vw] -translate-x-1/2 bg-mobile-bg md:block"
      aria-label="Promotional banners"
    >
      <div className="relative w-full overflow-hidden bg-[#1a1a1a]">
        <div className="relative grid min-h-[300px] grid-cols-1 md:min-h-[320px] md:grid-cols-2 lg:min-h-[340px]">
          <div className="relative z-10 flex flex-col justify-center px-8 py-10 lg:px-12 lg:py-12">
            <p className="text-sm font-medium text-white/90">India&apos;s Trusted</p>

            <h2 className="mt-2 text-[1.75rem] font-bold leading-[1.2] tracking-tight lg:text-[2.125rem]">
              <span className="text-white">Mobile Accessories</span>
              <br />
              <span className="text-primary">Wholesale Platform</span>
            </h2>

            <p className="mt-4 text-base font-medium text-white lg:text-lg">
              Smart Choice, Best Price
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/product"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary/90"
              >
                Shop Now
              </Link>
              <Link
                to="/product"
                className="inline-flex items-center justify-center rounded-lg border border-white/80 px-6 py-2.5 text-sm font-bold text-white transition hover:bg-white/10"
              >
                Bulk Order
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[240px] items-center justify-end overflow-hidden pr-2 md:flex md:pr-4 lg:pr-6">
            {slides.map((slide, index) => (
              <img
                key={slide.id}
                src={slide.src}
                alt={slide.alt}
                className={`absolute right-0 top-1/2 max-h-[300px] w-auto max-w-[95%] -translate-y-1/2 object-contain object-right transition-opacity duration-700 ease-in-out lg:max-h-[320px] ${
                  index === current
                    ? "opacity-100"
                    : "pointer-events-none opacity-0"
                }`}
                loading={index === 0 ? "eager" : "lazy"}
                draggable={false}
              />
            ))}
          </div>
        </div>

        {slides.length > 1 && (
          <>
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === current ? "true" : undefined}
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === current
                      ? "w-7 bg-primary"
                      : "w-2.5 bg-white/50 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => goTo(current - 1)}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-xl text-white transition hover:bg-black/55 lg:left-4"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-xl text-white transition hover:bg-black/55 lg:right-4"
            >
              ›
            </button>
          </>
        )}

      </div>
    </section>
  );
}

export default HeroBanner;
