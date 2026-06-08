import { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
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
  categoryName: "",
  categoryImage: "",
  subcategories: "",
  isActive: true,
};

function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState(EMPTY_FORM);
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await getAllCategories();
      setCategories(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      const payload = {
        categoryName: form.categoryName,
        categoryImage: form.categoryImage,
        subcategories: parseList(form.subcategories),
        isActive: form.isActive,
      };

      if (editingId) {
        await updateCategory(editingId, payload);
        setSuccess("Category updated");
      } else {
        await addCategory(payload);
        setSuccess("Category added");
      }

      setForm(EMPTY_FORM);
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to save category");
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setForm({
      categoryName: cat.categoryName,
      categoryImage: cat.categoryImage,
      subcategories: (cat.subcategories || []).join(", "),
      isActive: cat.isActive,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      setError("");
      setSuccess("");
      await deleteCategory(id);
      setSuccess("Category deleted");
      if (editingId === id) {
        setEditingId(null);
        setForm(EMPTY_FORM);
      }
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete category");
    }
  };

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold">Categories</h2>
      <p className="mb-5 text-sm text-text-secondary">
        Manage shop-by-category section on home page.
      </p>

      <AdminAlert error={error} success={success} onClear={() => setError("")} />

      <form onSubmit={handleSubmit} className={`${cardClass} mb-6 space-y-4`}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">
            {editingId ? "Edit Category" : "Add Category"}
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
            <label className={labelClass}>Category name *</label>
            <input
              type="text"
              required
              placeholder="Chargers"
              value={form.categoryName}
              onChange={(e) =>
                setForm((p) => ({ ...p, categoryName: e.target.value }))
              }
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Image URL *</label>
            <input
              type="url"
              required
              placeholder="https://..."
              value={form.categoryImage}
              onChange={(e) =>
                setForm((p) => ({ ...p, categoryImage: e.target.value }))
              }
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Subcategories (comma separated)</label>
          <input
            type="text"
            placeholder="Fast Charger, Type-C Cable, Adapter"
            value={form.subcategories}
            onChange={(e) =>
              setForm((p) => ({ ...p, subcategories: e.target.value }))
            }
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(e) =>
              setForm((p) => ({ ...p, isActive: e.target.checked }))
            }
            className="h-4 w-4 accent-primary"
          />
          Active (visible on website)
        </label>

        <button type="submit" className={btnPrimary}>
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      <h3 className="mb-3 font-semibold">All Categories ({categories.length})</h3>
      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : categories.length === 0 ? (
        <p className="text-text-secondary">No categories yet.</p>
      ) : (
        <div className="space-y-3">
          {categories.map((cat) => (
            <div
              key={cat._id}
              className={`${cardClass} flex flex-wrap items-center gap-4`}
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-light bg-white">
                <img
                  src={cat.categoryImage}
                  alt={cat.categoryName}
                  className="h-10 w-10 object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-semibold">{cat.categoryName}</p>
                <p className="text-xs text-text-secondary">
                  {(cat.subcategories || []).join(", ") || "No subcategories"}
                </p>
                <p className="mt-1 text-xs">
                  Status:{" "}
                  <span
                    className={
                      cat.isActive ? "text-green-600" : "text-red-500"
                    }
                  >
                    {cat.isActive ? "Active" : "Inactive"}
                  </span>
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleEdit(cat)}
                  className={btnSecondary}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(cat._id)}
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

export default CategorySection;
