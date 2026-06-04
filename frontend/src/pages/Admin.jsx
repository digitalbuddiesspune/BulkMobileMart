import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getAllHeroBanners,
  addHeroBanner,
  deleteHeroBanner,
} from "../api/api";

function Admin() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    imageUrl: "",
    alt: "",
    order: 0,
  });

  const fetchBanners = async () => {
    try {
      setLoading(true);
      setError("");
      const { data } = await getAllHeroBanners();
      setBanners(data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load banners");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await addHeroBanner(form);
      setForm({ imageUrl: "", alt: "", order: 0 });
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add banner");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this hero banner?")) return;
    try {
      setError("");
      await deleteHeroBanner(id);
      fetchBanners();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete banner");
    }
  };

  const inputClass =
    "w-full rounded-lg bg-neutral-900 border border-neutral-700 px-4 py-3 text-white placeholder-neutral-500 focus:border-accent focus:outline-none";

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-white text-gray-900 px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold">Hero Banner Admin</h1>
        <Link to="/" className="text-purple-600 font-medium hover:underline">
          ← Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {error && (
          <p className="mb-4 rounded-lg bg-red-900/40 border border-red-700 text-red-300 px-4 py-3 text-sm">
            {error}
          </p>
        )}

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 mb-10 space-y-4"
        >
          <h2 className="text-lg font-semibold">Add Hero Banner</h2>
          <input
            type="url"
            name="imageUrl"
            placeholder="Image URL (Cloudinary link) *"
            required
            value={form.imageUrl}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            type="text"
            name="alt"
            placeholder="Alt text (optional)"
            value={form.alt}
            onChange={handleChange}
            className={inputClass}
          />
          <input
            type="number"
            name="order"
            placeholder="Display order (0 = first)"
            value={form.order}
            onChange={handleChange}
            className={inputClass}
          />
          <button
            type="submit"
            className="rounded-lg bg-accent text-white px-6 py-2.5 font-semibold hover:brightness-110 transition"
          >
            Add Banner
          </button>
        </form>

        <h2 className="text-lg font-semibold mb-4">All Banners</h2>
        {loading ? (
          <p className="text-neutral-400">Loading...</p>
        ) : banners.length === 0 ? (
          <p className="text-neutral-400">No banners yet. Add one above.</p>
        ) : (
          <ul className="space-y-4">
            {banners.map((banner) => (
              <li
                key={banner._id}
                className="rounded-xl border border-neutral-800 bg-neutral-900 overflow-hidden"
              >
                <img
                  src={banner.imageUrl}
                  alt={banner.alt}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-sm text-neutral-400 min-w-0 flex-1">
                    <p className="text-white font-medium truncate">
                      {banner.alt}
                    </p>
                    <p className="truncate text-xs mt-1">{banner.imageUrl}</p>
                    <p className="mt-1">Order: {banner.order}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDelete(banner._id)}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium hover:bg-red-500 transition shrink-0"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Admin;
