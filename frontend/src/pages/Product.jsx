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
    <div className="bg-black text-white">
      <section className="page-hero-section px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {categoryName && (
            <Link
              to="/product"
              className="inline-flex items-center gap-1 text-sm text-accent hover:underline mb-3"
            >
              ← All products
            </Link>
          )}
          <h1 className="page-title">{pageTitle}</h1>
          <p className="text-neutral-400 text-lg max-w-3xl leading-relaxed">
            {pageDesc}
          </p>
        </div>
      </section>

      {categoryName ? (
        <section className="py-10 sm:py-12 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900 h-72 animate-pulse"
                  />
                ))}
              </div>
            ) : products.length === 0 ? (
              <p className="text-center text-neutral-400 py-12">
                No products found in this category yet.
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900 overflow-hidden hover:border-accent/50 transition block"
                  >
                    <div className="h-48 bg-neutral-800">
                      {product.productImages?.[0] && (
                        <img
                          src={product.productImages[0]}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-5">
                      <p className="text-xs text-accent uppercase tracking-wide mb-1">
                        {product.brandName}
                      </p>
                      <h2 className="text-lg font-bold mb-2 line-clamp-2">
                        {product.name}
                      </h2>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-xl font-bold">
                          {formatPrice(product.discountedPrice)}
                        </span>
                        <span className="text-sm text-neutral-500 line-through">
                          {formatPrice(product.price)}
                        </span>
                        <span className="text-xs text-green-500 font-semibold">
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
        <section className="py-10 sm:py-12 px-3 sm:px-4">
          <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900 h-40 animate-pulse"
                  />
                ))
              : categories.map((item) => (
                  <Link
                    key={item._id}
                    to={`/product?categoryName=${encodeURIComponent(item.categoryName)}`}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 hover:border-accent/50 transition block"
                  >
                    <h2 className="text-xl font-bold mb-3 text-accent">
                      {item.categoryName}
                    </h2>
                    {item.subcategories?.length > 0 ? (
                      <p className="text-neutral-400 leading-relaxed text-sm">
                        {item.subcategories.slice(0, 4).join(" · ")}
                        {item.subcategories.length > 4 ? " · more" : ""}
                      </p>
                    ) : (
                      <p className="text-neutral-400 text-sm">View products</p>
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
