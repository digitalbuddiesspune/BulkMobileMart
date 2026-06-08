import { useEffect, useState } from "react";
import {
  addProduct,
  deleteProduct,
  getAllCategories,
  getAllProducts,
  updateProduct,
} from "../../../api/api";
import AdminAlert from "../AdminAlert";
import {
  btnDanger,
  btnPrimary,
  btnSecondary,
  cardClass,
  inputClass,
  labelClass,
  parseList,
} from "../adminStyles";

const EMPTY_FORM = {
  name: "",
  categories: "",
  subcategory: "",
  brandName: "",
  price: "",
  discountedPrice: "",
  discountedPercent: "",
  stock: "",
  ratings: "0",
  productImages: "",
  description: "",
  features: "",
  warranty: "",
  isActive: true,
};

function ProductSection() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");
      const [productsRes, categoriesRes] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ]);
      setProducts(productsRes.data.data || []);
      setCategories(categoriesRes.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      const payload = {
        name: form.name,
        categories: parseList(form.categories),
        subcategory: form.subcategory,
        brandName: form.brandName,
        price: Number(form.price),
        discountedPrice: Number(form.discountedPrice),
        discountedPercent: Number(form.discountedPercent),
        stock: Number(form.stock),
        ratings: Number(form.ratings) || 0,
        productImages: parseList(form.productImages),
        description: form.description,
        features: parseList(form.features),
        warranty: form.warranty,
        isActive: form.isActive,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        setSuccess("Product updated");
      } else {
        await addProduct(payload);
        setSuccess("Product added");
      }

      setForm(EMPTY_FORM);
      setEditingId(null);
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save product");
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      categories: (product.categories || []).join(", "),
      subcategory: product.subcategory || "",
      brandName: product.brandName || "",
      price: String(product.price ?? ""),
      discountedPrice: String(product.discountedPrice ?? ""),
      discountedPercent: String(product.discountedPercent ?? ""),
      stock: String(product.stock ?? ""),
      ratings: String(product.ratings ?? 0),
      productImages: (product.productImages || []).join(", "),
      description: product.description || "",
      features: (product.features || []).join(", "),
      warranty: product.warranty || "",
      isActive: product.isActive,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      setError("");
      setSuccess("");
      await deleteProduct(id);
      setSuccess("Product deleted");
      if (editingId === id) {
        setEditingId(null);
        setForm(EMPTY_FORM);
      }
      fetchData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete product");
    }
  };

  const setField = (name, value) => setForm((p) => ({ ...p, [name]: value }));

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold">Products</h2>
      <p className="mb-5 text-sm text-text-secondary">
        Manage product catalog, pricing and stock.
      </p>

      <AdminAlert error={error} success={success} onClear={() => setError("")} />

      <form onSubmit={handleSubmit} className={`${cardClass} mb-6 space-y-4`}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">
            {editingId ? "Edit Product" : "Add Product"}
          </h3>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(EMPTY_FORM);
              }}
              className={btnSecondary}
            >
              Cancel
            </button>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Product name *</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Brand name *</label>
            <input
              type="text"
              required
              value={form.brandName}
              onChange={(e) => setField("brandName", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Categories * (comma separated, max 4)</label>
            <input
              type="text"
              required
              list="category-suggestions"
              placeholder="Chargers, Most Purchase"
              value={form.categories}
              onChange={(e) => setField("categories", e.target.value)}
              className={inputClass}
            />
            <datalist id="category-suggestions">
              {categories.map((cat) => (
                <option key={cat._id} value={cat.categoryName} />
              ))}
            </datalist>
          </div>
          <div>
            <label className={labelClass}>Subcategory *</label>
            <input
              type="text"
              required
              value={form.subcategory}
              onChange={(e) => setField("subcategory", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Price (₹) *</label>
            <input
              type="number"
              required
              min="0"
              value={form.price}
              onChange={(e) => setField("price", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Discounted price (₹) *</label>
            <input
              type="number"
              required
              min="0"
              value={form.discountedPrice}
              onChange={(e) => setField("discountedPrice", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Discount % *</label>
            <input
              type="number"
              required
              min="0"
              max="100"
              value={form.discountedPercent}
              onChange={(e) => setField("discountedPercent", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Stock *</label>
            <input
              type="number"
              required
              min="0"
              value={form.stock}
              onChange={(e) => setField("stock", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Rating (0-5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.ratings}
              onChange={(e) => setField("ratings", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Image URLs * (comma separated)</label>
          <input
            type="text"
            required
            placeholder="https://..., https://..."
            value={form.productImages}
            onChange={(e) => setField("productImages", e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Description</label>
          <textarea
            rows={3}
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Features (comma separated)</label>
            <input
              type="text"
              value={form.features}
              onChange={(e) => setField("features", e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Warranty</label>
            <input
              type="text"
              value={form.warranty}
              onChange={(e) => setField("warranty", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setField("isActive", e.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          Active (visible on website)
        </label>

        <button type="submit" className={btnPrimary}>
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <h3 className="mb-3 font-semibold">All Products ({products.length})</h3>
      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-text-secondary">No products yet.</p>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product._id}
              className={`${cardClass} flex flex-wrap items-start gap-4`}
            >
              <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border-light bg-mobile-surface">
                {product.productImages?.[0] ? (
                  <img
                    src={product.productImages[0]}
                    alt={product.name}
                    className="h-full w-full object-contain p-1"
                  />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-text-secondary">
                  {product.brandName} · {product.categories?.join(", ")}
                </p>
                <p className="mt-1 text-sm font-bold text-primary">
                  ₹{product.discountedPrice}{" "}
                  <span className="text-xs font-normal text-text-muted line-through">
                    ₹{product.price}
                  </span>
                </p>
                <p className="text-xs text-text-secondary">
                  Stock: {product.stock} · Rating: {product.ratings}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(product)}
                  className={btnSecondary}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(product._id)}
                  className={btnDanger}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductSection;
