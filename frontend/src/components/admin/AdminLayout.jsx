import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: "📊" },
  { id: "banners", label: "Hero Banners", icon: "🖼️" },
  { id: "categories", label: "Categories", icon: "📁" },
  { id: "products", label: "Products", icon: "📦" },
  { id: "users", label: "Users", icon: "👥" },
];

function AdminLayout({ activeSection, onSectionChange, children }) {
  return (
    <div className="min-h-screen bg-mobile-surface text-text-primary">
      <header className="sticky top-0 z-40 border-b border-border-light bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div>
            <h1 className="text-lg font-bold sm:text-xl">BulkMobileMart Admin</h1>
            <p className="text-xs text-text-secondary sm:text-sm">
              Manage all website sections
            </p>
          </div>
          <Link
            to="/"
            className="rounded-lg border border-border-light px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:flex-row lg:items-start">
        <aside className="shrink-0 lg:w-56">
          <nav className="flex gap-2 overflow-x-auto hide-scrollbar rounded-xl border border-border-light bg-white p-2 lg:flex-col lg:overflow-visible">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onSectionChange(item.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition lg:w-full ${
                  activeSection === item.id
                    ? "bg-primary text-white"
                    : "text-text-secondary hover:bg-mobile-surface hover:text-text-primary"
                }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;
