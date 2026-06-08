import { useCallback, useEffect, useState } from "react";
import { getHeroBanners } from "../../api/api";

const AUTO_PLAY_MS = 4000;

const FALLBACK_SLIDES = [
  {
    id: "fallback-1",
    src: "/hero-banner.webp",
    alt: "Mobile accessories wholesale deals - chargers, earphones, watches and more",
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
          alt: b.alt || "Promotional banner",
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
      <section className="bg-mobile-bg px-0 pt-2 pb-3">
        <div className="mx-auto aspect-[2.4/1] max-h-[220px] w-full animate-pulse rounded-2xl bg-mobile-surface sm:max-h-[280px] md:max-h-[320px]" />
      </section>
    );
  }

  return (
    <section className="bg-mobile-bg px-0 pt-2 pb-3" aria-label="Promotional banners">
      <div className="relative mx-auto w-full overflow-hidden rounded-none bg-mobile-surface shadow-sm sm:rounded-xl md:rounded-2xl">
        <div className="relative aspect-[2.4/1] max-h-[220px] w-full sm:max-h-[280px] md:max-h-[320px]">
          {slides.map((slide, index) => (
            <img
              key={slide.id}
              src={slide.src}
              alt={slide.alt}
              className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-in-out ${
                index === current ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
              loading={index === 0 ? "eager" : "lazy"}
              draggable={false}
            />
          ))}

          {slides.length > 1 && (
            <>
              <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    aria-label={`Go to slide ${index + 1}`}
                    aria-current={index === current ? "true" : undefined}
                    onClick={() => goTo(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === current
                        ? "w-6 bg-primary"
                        : "w-2 bg-white/70 hover:bg-white"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => goTo(current - 1)}
                aria-label="Previous slide"
                className="absolute left-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-lg text-white transition hover:bg-black/50 sm:flex"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={() => goTo(current + 1)}
                aria-label="Next slide"
                className="absolute right-2 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/30 text-lg text-white transition hover:bg-black/50 sm:flex"
              >
                ›
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
