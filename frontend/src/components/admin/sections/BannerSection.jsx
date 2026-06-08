import { useEffect, useState } from "react";
import {
  addHeroBanner,
  deleteHeroBanner,
  getAllHeroBanners,
} from "../../../api/api";
import AdminAlert from "../AdminAlert";
import { btnDanger, btnPrimary, cardClass, inputClass, labelClass } from "../adminStyles";

function BannerSection() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [form, setForm] = useState({ imageUrl: "", alt: "", order: 0 });

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await getAllHeroBanners();
      setBanners(data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setSuccess("");
      await addHeroBanner(form);
      setForm({ imageUrl: "", alt: "", order: 0 });
      setSuccess("Banner added successfully");
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add banner");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hero banner?")) return;
    try {
      setError("");
      setSuccess("");
      await deleteHeroBanner(id);
      setSuccess("Banner deleted");
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete banner");
    }
  };

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold">Hero Banners</h2>
      <p className="mb-5 text-sm text-text-secondary">
        Manage carousel banners on the home page.
      </p>

      <AdminAlert error={error} success={success} onClear={() => setError("")} />

      <form onSubmit={handleSubmit} className={`${cardClass} mb-6 space-y-4`}>
        <h3 className="font-semibold">Add Hero Banner</h3>
        <div>
          <label className={labelClass}>Image URL *</label>
          <input
            type="url"
            required
            placeholder="https://res.cloudinary.com/..."
            value={form.imageUrl}
            onChange={(e) => setForm((p) => ({ ...p, imageUrl: e.target.value }))}
            className={inputClass}
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Alt text</label>
            <input
              type="text"
              placeholder="Banner description"
              value={form.alt}
              onChange={(e) => setForm((p) => ({ ...p, alt: e.target.value }))}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Display order</label>
            <input
              type="number"
              value={form.order}
              onChange={(e) =>
                setForm((p) => ({ ...p, order: Number(e.target.value) }))
              }
              className={inputClass}
            />
          </div>
        </div>
        <button type="submit" className={btnPrimary}>
          Add Banner
        </button>
      </form>

      <h3 className="mb-3 font-semibold">All Banners ({banners.length})</h3>
      {loading ? (
        <p className="text-text-secondary">Loading...</p>
      ) : banners.length === 0 ? (
        <p className="text-text-secondary">No banners yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {banners.map((banner) => (
            <div
              key={banner._id}
              className={`${cardClass} overflow-hidden p-0`}
            >
              <img
                src={banner.imageUrl}
                alt={banner.alt}
                className="h-36 w-full object-cover"
              />
              <div className="flex items-start justify-between gap-3 p-4">
                <div className="min-w-0 text-sm">
                  <p className="font-medium truncate">{banner.alt || "Banner"}</p>
                  <p className="mt-1 text-xs text-text-secondary">
                    Order: {banner.order}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(banner._id)}
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

export default BannerSection;
