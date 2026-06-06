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
    <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 p-8 text-neutral-500">
      <svg
        className="h-14 w-14 text-neutral-700"
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
        <p className="text-center text-sm text-neutral-600 line-clamp-2 max-w-[200px]">
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
      <div className="bg-black text-white px-4 sm:px-6 lg:px-8 pt-3 pb-6">
        <div className="max-w-6xl mx-auto animate-pulse lg:grid lg:grid-cols-2 lg:gap-12">
          <div className="aspect-square max-h-[420px] rounded-2xl border border-neutral-800 bg-neutral-900/50 mb-8 lg:mb-0" />
          <div className="space-y-4">
            <div className="h-4 bg-neutral-800 rounded w-24" />
            <div className="h-9 bg-neutral-800 rounded w-4/5" />
            <div className="h-6 bg-neutral-800 rounded w-1/3" />
            <div className="h-10 bg-neutral-800 rounded w-1/2 mt-4" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-black text-white px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-neutral-400 mb-6">{error || "Product not found."}</p>
          <Link
            to="/product"
            className="inline-flex items-center gap-2 text-accent hover:underline text-sm font-medium"
          >
            ← Back to products
          </Link>
        </div>
      </div>
    );
  }

  const images = product.productImages || [];

  return (
    <div className="bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-8 sm:pb-10">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-start lg:min-h-[calc(100vh-7rem)]">
          <div className="lg:sticky lg:top-24 lg:self-start mb-8 lg:mb-0 mt-6 sm:mt-8 lg:mt-10">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 overflow-hidden aspect-square max-h-[360px] sm:max-h-[420px] mx-auto lg:mx-0 w-full flex items-center justify-center p-4 sm:p-6">
              <ProductImage src={images[activeImage]} alt={product.name} />
            </div>

            {images.length > 1 && (
              <div className="flex gap-2 mt-4 justify-center lg:justify-start overflow-x-auto hide-scrollbar">
                {images.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setActiveImage(index)}
                    className={`shrink-0 h-12 w-12 sm:h-14 sm:w-14 rounded-md border overflow-hidden transition ${
                      activeImage === index
                        ? "border-accent ring-1 ring-accent/30"
                        : "border-neutral-700 opacity-70 hover:opacity-100"
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
            <p className="text-sm font-semibold text-accent uppercase tracking-wide mb-1">
              {product.brandName}
            </p>

            <h1 className="text-2xl sm:text-3xl font-bold leading-snug mb-3">
              {product.name}
            </h1>

            <p className="text-sm text-neutral-400 mb-1">
              <span className="text-yellow-400">★</span>{" "}
              {product.ratings?.toFixed(1) ?? "0.0"}
              <span className="mx-2 text-neutral-600">·</span>
              {product.subcategory}
              <span className="mx-2 text-neutral-600">·</span>
              {product.stock > 0 ? (
                <span className="text-green-400">
                  In stock ({product.stock} units)
                </span>
              ) : (
                <span className="text-red-400">Out of stock</span>
              )}
            </p>

            {product.categories?.length > 0 && (
              <p className="text-sm text-neutral-500 mb-5">
                {product.categories.map((cat, index) => (
                  <span key={cat}>
                    {index > 0 && ", "}
                    <Link
                      to={`/product?categoryName=${encodeURIComponent(cat)}`}
                      className="hover:text-accent transition"
                    >
                      {cat}
                    </Link>
                  </span>
                ))}
              </p>
            )}

            <div className="mb-6">
              <p className="text-3xl sm:text-4xl font-bold text-white">
                {formatPrice(product.discountedPrice)}
                <span className="ml-3 text-lg font-normal text-neutral-500 line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="ml-2 text-sm font-semibold text-green-400">
                  {product.discountedPercent}% off
                </span>
              </p>
              <p className="text-sm text-neutral-500 mt-1">
                Wholesale price · GST invoice available
              </p>
            </div>

            {product.description && (
              <div className="mb-6">
                <h2 className="text-base font-bold text-white mb-2">Description</h2>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {product.features?.length > 0 && (
              <div className="mb-6">
                <h2 className="text-base font-bold text-white mb-3">Key Features</h2>
                <ul className="space-y-2 text-sm text-neutral-300">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="text-accent shrink-0">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.warranty && (
              <p className="text-sm text-neutral-400 mb-8">
                <span className="font-semibold text-white">Warranty: </span>
                {product.warranty}
              </p>
            )}

            <div className="pt-2 border-t border-neutral-800">
              <p className="text-sm text-neutral-400 mb-3">Quantity</p>
              <div className="inline-flex items-center border border-neutral-700 rounded-lg overflow-hidden mb-5">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={product.stock <= 0}
                  className="h-10 w-10 flex items-center justify-center text-neutral-300 hover:bg-neutral-800 transition disabled:opacity-40"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="h-10 min-w-[3rem] px-3 flex items-center justify-center text-sm font-semibold border-x border-neutral-700">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setQuantity((q) => Math.min(product.stock || q + 1, q + 1))
                  }
                  disabled={product.stock <= 0 || quantity >= product.stock}
                  className="h-10 w-10 flex items-center justify-center text-neutral-300 hover:bg-neutral-800 transition disabled:opacity-40"
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
                className="flex-1 sm:flex-none min-w-[140px] rounded-lg border border-neutral-600 text-white px-6 py-3 text-sm font-bold tracking-wide hover:border-accent hover:text-accent transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {addedFeedback ? "Added!" : "Add to Cart"}
              </button>
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={product.stock <= 0}
                className="flex-1 sm:flex-none min-w-[140px] rounded-lg bg-accent text-white px-6 py-3 text-sm font-bold tracking-wide hover:brightness-110 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-block text-sm text-accent font-medium hover:underline mt-4"
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
