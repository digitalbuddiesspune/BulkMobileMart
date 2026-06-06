import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function QuantityControl({ quantity, onDecrease, onIncrease, disabled }) {
  return (
    <div className="inline-flex items-center border border-neutral-700 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={onDecrease}
        disabled={disabled}
        aria-label="Decrease quantity"
        className="h-9 w-9 flex items-center justify-center text-neutral-300 hover:bg-neutral-800 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        −
      </button>
      <span className="h-9 min-w-[2.5rem] px-2 flex items-center justify-center text-sm font-semibold text-white border-x border-neutral-700">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={disabled}
        aria-label="Increase quantity"
        className="h-9 w-9 flex items-center justify-center text-neutral-300 hover:bg-neutral-800 hover:text-white transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}

function OrderSummary({ items, total, cartCount }) {
  return (
    <div className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-5 sm:p-6 lg:sticky lg:top-24">
      <h2 className="text-lg font-bold text-white mb-4 pb-3 border-b border-neutral-800">
        Order Summary
      </h2>

      <ul className="space-y-3 mb-4 max-h-[240px] overflow-y-auto hide-scrollbar">
        {items.map((item) => (
          <li
            key={item._id}
            className="flex items-start justify-between gap-3 text-sm"
          >
            <div className="min-w-0 flex-1">
              <p className="text-white line-clamp-2 leading-snug">{item.name}</p>
              <p className="text-neutral-500 text-xs mt-0.5">
                {formatPrice(item.discountedPrice)} × {item.quantity}
              </p>
            </div>
            <span className="shrink-0 font-medium text-neutral-300">
              {formatPrice(item.discountedPrice * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <div className="space-y-2 pt-4 border-t border-neutral-800 text-sm">
        <div className="flex items-center justify-between text-neutral-400">
          <span>Items ({cartCount})</span>
          <span>{items.length} products</span>
        </div>
        <div className="flex items-center justify-between text-neutral-400">
          <span>Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex items-center justify-between pt-2 text-base font-bold text-white">
          <span>Order Total</span>
          <span className="text-xl text-accent">{formatPrice(total)}</span>
        </div>
      </div>

      <p className="text-xs text-neutral-500 mt-3 mb-5">
        GST invoice available · Bulk orders welcome
      </p>

      <Link
        to="/contact"
        className="flex w-full items-center justify-center rounded-lg bg-accent text-white px-6 py-3 text-sm font-bold tracking-wide hover:brightness-110 transition"
      >
        Proceed to Enquiry
      </Link>

      <Link
        to="/product"
        className="mt-3 flex w-full items-center justify-center text-sm text-neutral-400 hover:text-accent transition"
      >
        Continue shopping
      </Link>
    </div>
  );
}

function Cart() {
  const { user, openAuthModal } = useAuth();
  const { items, cartCount, removeFromCart, updateQuantity, loading, loadCart } =
    useCart();

  useEffect(() => {
    if (user) loadCart();
  }, [user, loadCart]);

  const total = items.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  if (!user) {
    return (
      <div className="bg-black text-white min-h-[60vh] px-4 sm:px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-2xl font-bold mb-3">My Cart</h1>
          <p className="text-neutral-400 mb-6">
            Please login to view your cart and bulk orders.
          </p>
          <button
            type="button"
            onClick={() => openAuthModal("login")}
            className="rounded-lg bg-accent text-white px-8 py-3 text-sm font-bold tracking-wide hover:brightness-110 transition"
          >
            Login / Sign Up
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white">
      <section className="px-4 sm:px-6 lg:px-8 pt-6 pb-10 sm:pb-14">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold">My Cart</h1>
            <p className="text-sm text-neutral-400 mt-1">{user.email}</p>
          </div>

          {loading ? (
            <div className="grid lg:grid-cols-[1fr_340px] gap-8">
              <div className="space-y-4 animate-pulse">
                {[1, 2].map((i) => (
                  <div
                    key={i}
                    className="h-28 rounded-xl bg-neutral-900 border border-neutral-800"
                  />
                ))}
              </div>
              <div className="h-80 rounded-xl bg-neutral-900 border border-neutral-800 animate-pulse" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-16 border border-neutral-800 rounded-xl">
              <p className="text-neutral-400 mb-6">Your cart is empty.</p>
              <Link
                to="/product"
                className="inline-block rounded-lg bg-accent text-white px-8 py-3 text-sm font-bold tracking-wide hover:brightness-110 transition"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-[1fr_340px] gap-6 lg:gap-8 items-start">
              <ul className="divide-y divide-neutral-800 border border-neutral-800 rounded-xl overflow-hidden">
                {items.map((item) => (
                  <li
                    key={item._id}
                    className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 sm:p-5 bg-neutral-900/30"
                  >
                    <Link
                      to={`/product/${item._id}`}
                      className="shrink-0 h-20 w-20 sm:h-24 sm:w-24 rounded-lg border border-neutral-800 bg-neutral-900 overflow-hidden"
                    >
                      {item.productImages?.[0] ? (
                        <img
                          src={item.productImages[0]}
                          alt={item.name}
                          className="h-full w-full object-contain p-1"
                        />
                      ) : (
                        <div className="h-full w-full bg-neutral-800" />
                      )}
                    </Link>

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-accent uppercase tracking-wide mb-0.5">
                        {item.brandName}
                      </p>
                      <Link
                        to={`/product/${item._id}`}
                        className="font-semibold text-white hover:text-accent transition line-clamp-2"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-neutral-400 mt-1">
                        {formatPrice(item.discountedPrice)} each
                      </p>

                      <div className="mt-3 flex flex-wrap items-center gap-3">
                        <QuantityControl
                          quantity={item.quantity}
                          disabled={loading}
                          onDecrease={() => {
                            if (item.quantity <= 1) {
                              removeFromCart(item._id);
                            } else {
                              updateQuantity(item._id, item.quantity - 1);
                            }
                          }}
                          onIncrease={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                        />
                        <button
                          type="button"
                          onClick={() => removeFromCart(item._id)}
                          className="text-xs text-neutral-500 hover:text-red-400 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="shrink-0 sm:text-right lg:hidden">
                      <p className="text-lg font-bold text-white">
                        {formatPrice(item.discountedPrice * item.quantity)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <OrderSummary items={items} total={total} cartCount={cartCount} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Cart;
