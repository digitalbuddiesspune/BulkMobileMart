import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getCategories, getProducts } from "../api/api";

const formatPrice = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Product() {
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("categoryName")?.trim() || "";
  const subcategory = searchParams.get("subcategory")?.trim() || "";

  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const params = {};
        if (categoryName) params.categoryName = categoryName;
        if (subcategory) params.subcategory = subcategory;

        const requests = [getCategories()];
        if (categoryName) {
          requests.push(getProducts(params));
        }

        const [categoriesRes, productsRes] = await Promise.all(requests);

        setCategories(categoriesRes.data.data || []);
        setProducts(productsRes?.data?.data || []);
      } catch {
        setCategories([]);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryName, subcategory]);

  const pageTitle = subcategory
    ? subcategory
    : categoryName || "Our Products";

  const pageDesc = categoryName
    ? subcategory
      ? `Browse ${subcategory} in ${categoryName}. GST invoices and pan-India delivery.`
      : `Browse all products in ${categoryName}. GST invoices and pan-India delivery.`
    : "Browse wholesale smartphones, tablets, and mobile accessories. GST invoices and pan-India delivery available.";

  return (
    <div className="min-h-screen bg-mobile-bg text-text-primary pb-6">
      <section className="border-b border-border-light px-4 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
        <div className="mx-auto max-w-7xl">
          {categoryName && (
            <Link
              to="/product"
              className="mb-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              ← All products
            </Link>
          )}
          <h1 className="text-xl font-bold text-text-primary sm:text-2xl md:text-3xl">
            {pageTitle}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
            {pageDesc}
          </p>
        </div>
      </section>

      {categoryName ? (
        <section className="px-4 py-6 sm:px-6 sm:py-8 md:px-8">
          <div className="mx-auto max-w-7xl">
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-2xl border border-border-light bg-mobile-surface sm:h-72"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <p className="py-12 text-center text-text-secondary">
                No products found in this category yet.
              </p>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="block overflow-hidden rounded-2xl border border-border-light bg-white shadow-sm transition hover:border-primary/40 hover:shadow-md"
                  >
                    <div className="h-36 bg-mobile-surface sm:h-44 md:h-48">
                      {product.productImages?.[0] && (
                        <img
                          src={product.productImages[0]}
                          alt={product.name}
                          className="h-full w-full object-contain p-2"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-3 sm:p-4 md:p-5">
                      <p className="mb-1 text-[10px] uppercase tracking-wide text-primary sm:text-xs">
                        {product.brandName}
                      </p>
                      <h2 className="mb-2 line-clamp-2 text-sm font-bold sm:text-base md:text-lg">
                        {product.name}
                      </h2>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-base font-bold text-primary sm:text-lg md:text-xl">
                          {formatPrice(product.discountedPrice)}
                        </span>
                        <span className="text-xs text-text-muted line-through sm:text-sm">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-[10px] font-semibold text-green-600 sm:text-xs">
                          {product.discountedPercent}% off
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="px-4 py-6 sm:px-6 sm:py-8 md:px-8">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="h-36 animate-pulse rounded-2xl border border-border-light bg-mobile-surface sm:h-40"
                  />
                ))
              : categories.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product?categoryName=${encodeURIComponent(item.categoryName)}`}
                    className="block rounded-2xl border border-border-light bg-white p-5 shadow-sm transition hover:border-primary/40 hover:shadow-md sm:p-6"
                  >
                    <h2 className="mb-2 text-lg font-bold text-primary sm:text-xl">
                      {item.categoryName}
                    </h2>
                    {item.subcategories?.length > 0 ? (
                      <p className="text-sm leading-relaxed text-text-secondary">
                        {item.subcategories.slice(0, 4).join(" · ")}
                        {item.subcategories.length > 4 ? " · more" : ""}
                      </p>
                    ) : (
                      <p className="text-sm text-text-secondary">View products</p>
                    )}
                  </Link>
                ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default Product;
