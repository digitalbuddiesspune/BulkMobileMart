import { useEffect, useState } from "react";
import {
  getAllHeroBanners,
  getAllCategories,
  getAllProducts,
  getUsers,
} from "../../../api/api";
import { cardClass } from "../adminStyles";

function StatCard({ label, value, loading }) {
  return (
    <div className={cardClass}>
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-1 text-2xl font-bold text-text-primary">
        {loading ? "—" : value}
      </p>
    </div>
  );
}

function OverviewSection() {
  const [stats, setStats] = useState({
    banners: 0,
    categories: 0,
    products: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [bannersRes, categoriesRes, productsRes, usersRes] =
          await Promise.allSettled([
            getAllHeroBanners(),
            getAllCategories(),
            getAllProducts(),
            getUsers(),
          ]);

        setStats({
          banners:
            bannersRes.status === "fulfilled"
              ? bannersRes.value.data.data?.length || 0
              : 0,
          categories:
            categoriesRes.status === "fulfilled"
              ? categoriesRes.value.data.data?.length || 0
              : 0,
          products:
            productsRes.status === "fulfilled"
              ? productsRes.value.data.data?.length || 0
              : 0,
          users:
            usersRes.status === "fulfilled"
              ? usersRes.value.data.data?.length || 0
              : 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h2 className="mb-1 text-xl font-bold">Overview</h2>
      <p className="mb-5 text-sm text-text-secondary">
        Quick summary of all sections on your store.
      </p>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Hero Banners" value={stats.banners} loading={loading} />
        <StatCard label="Categories" value={stats.categories} loading={loading} />
        <StatCard label="Products" value={stats.products} loading={loading} />
        <StatCard label="Registered Users" value={stats.users} loading={loading} />
      </div>

      <div className={`${cardClass} mt-6`}>
        <h3 className="font-semibold text-text-primary">Admin sections</h3>
        <ul className="mt-3 space-y-2 text-sm text-text-secondary">
          <li>• <strong>Hero Banners</strong> — home page carousel images</li>
          <li>• <strong>Categories</strong> — shop by category icons & names</li>
          <li>• <strong>Products</strong> — product catalog & pricing</li>
          <li>• <strong>Users</strong> — registered dealer accounts</li>
        </ul>
      </div>
    </div>
  );
}

export default OverviewSection;
