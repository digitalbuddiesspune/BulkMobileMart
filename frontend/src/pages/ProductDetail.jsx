import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../api/api";
import { useCart } from "../context/CartContext";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function ImagePlaceholder({ name }) {
  return (
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 p-8 text-text-secondary">
      <svg
        className="h-14 w-14 text-text-muted"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={1}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
        />
      </svg>
      {name && (
        <p className="max-w-[200px] line-clamp-2 text-center text-sm text-text-secondary">
          {name}
        </p>
      )}
    </div>
  );
}

function ProductImage({ src, alt }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (!src || failed) {
    return <ImagePlaceholder name={alt} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setFailed(true)}
      className="h-full w-full object-contain"
    />
  );
}

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await getProductById(id);
        setProduct(data.data);
        setActiveImage(0);
        setQuantity(1);
      } catch {
        setProduct(null);
        setError("Product not found.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    const result = await addToCart(product, quantity);
    if (result?.success) {
      setAddedFeedback(true);
      setTimeout(() => setAddedFeedback(false), 2000);
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    const result = await addToCart(product, quantity);
    if (result?.requiresLogin) return;
    if (result?.success) navigate("/contact");
  };

  if (loading) {
    return (
      <div className="bg-mobile-bg px-4 pb-6 pt-3 text-text-primary sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl animate-pulse lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="mb-8 aspect-square max-h-[420px] rounded-2xl border border-border-light bg-mobile-surface lg:mb-0" />
          <div className="space-y-4">
            <div className="h-4 w-24 rounded bg-mobile-surface" />
            <div className="h-9 w-4/5 rounded bg-mobile-surface" />
            <div className="h-6 w-1/3 rounded bg-mobile-surface" />
            <div className="mt-4 h-10 w-1/2 rounded bg-mobile-surface" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-mobile-bg px-4 py-16 text-text-primary sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-6 text-text-secondary">{error || "Product not found."}</p>
          <Link
            to="/product"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.productImages || [];

  return (
    <div className="min-h-screen bg-mobile-bg text-text-primary">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-3 sm:px-6 sm:pb-10 lg:px-8 lg:pb-8">
        <div className="lg:grid lg:min-h-[calc(100vh-7rem)] lg:grid-cols-2 lg:items-start lg:gap-12">
          <div className="mb-8 mt-4 sm:mt-6 lg:sticky lg:top-24 lg:mb-0 lg:mt-8 lg:self-start">
            <div className="mx-auto flex aspect-square w-full max-h-[360px] items-center justify-center overflow-hidden rounded-2xl border border-border-light bg-white p-4 shadow-sm sm:max-h-[420px] sm:p-6 lg:mx-0">
              <ProductImage src={images[activeImage]} alt={product.name} />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center lg:justify-start overflow-x-auto hide-scrollbar">
                {images.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`h-12 w-12 shrink-0 overflow-hidden rounded-md border transition sm:h-14 sm:w-14 ${
                      activeImage === index
                        ? "border-primary ring-1 ring-primary/30"
                        : "border-border-light opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="min-w-0 lg:overflow-y-auto lg:max-h-[calc(100vh-7rem)] lg:pr-2 lg:pb-4 hide-scrollbar">
            <p className="mb-1 text-sm font-semibold uppercase tracking-wide text-primary">
              {product.brandName}
            </p>

            <h1 className="mb-3 text-2xl font-bold leading-snug sm:text-3xl">
              {product.name}
            </h1>

            <p className="mb-1 text-sm text-text-secondary">
              <span className="text-yellow-500">★</span>{" "}
              {product.ratings?.toFixed(1) ?? "0.0"}
              <span className="mx-2 text-text-muted">·</span>
              {product.subcategory}
              <span className="mx-2 text-text-muted">·</span>
              {product.stock > 0 ? (
                <span className="text-green-600">
                  In stock ({product.stock} units)
                </span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </p>

            {product.categories?.length > 0 && (
              <p className="mb-5 text-sm text-text-secondary">
                {product.categories.map((cat, index) => (
                  <span key={cat}>
                    {index > 0 && ", "}
                    <Link
                      to={`/product?categoryName=${encodeURIComponent(cat)}`}
                      className="transition hover:text-primary"
                    >
                      {cat}
                    </Link>
                  </span>
                ))}
              </p>
            )}

            <div className="mb-6">
              <p className="text-3xl font-bold text-primary sm:text-4xl">
                {formatPrice(product.discountedPrice)}
                <span className="ml-3 text-lg font-normal text-text-muted line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-2 text-sm font-semibold text-green-600">
                  {product.discountedPercent}% off
                </span>
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                Wholesale price · GST invoice available
              </p>
            </div>

            {product.description && (
              <div className="mb-6">
                <h2 className="mb-2 text-base font-bold">Description</h2>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {product.description}
                </p>
              </div>
            )}

            {product.features?.length > 0 && (
              <div className="mb-6">
                <h2 className="mb-3 text-base font-bold">Key Features</h2>
                <ul className="space-y-2 text-sm text-text-primary">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="shrink-0 text-primary">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.warranty && (
              <p className="mb-8 text-sm text-text-secondary">
                <span className="font-semibold text-text-primary">Warranty: </span>
                {product.warranty}
              </p>
            )}

            <div className="border-t border-border-light pt-2">
              <p className="mb-3 text-sm text-text-secondary">Quantity</p>
              <div className="mb-5 inline-flex items-center overflow-hidden rounded-lg border border-border-light">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={product.stock <= 0}
                  className="flex h-10 w-10 items-center justify-center text-text-secondary transition hover:bg-mobile-surface disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="flex h-10 min-w-[3rem] items-center justify-center border-x border-border-light px-3 text-sm font-semibold">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock || q + 1, q + 1))
                  }
                  disabled={product.stock <= 0 || quantity >= product.stock}
                  className="flex h-10 w-10 items-center justify-center text-text-secondary transition hover:bg-mobile-surface disabled:opacity-40"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
                className="min-w-[140px] flex-1 rounded-lg border border-border-light px-6 py-3 text-sm font-bold tracking-wide transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                {addedFeedback ? "Added!" : "Add to Cart"}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="min-w-[140px] flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-bold tracking-wide text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 sm:flex-none"
              >
                Buy Now
              </button>
              </div>
            </div>

            <Link
              to="/contact"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Request bulk quote →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
