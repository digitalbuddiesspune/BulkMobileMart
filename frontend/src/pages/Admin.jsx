import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import OverviewSection from "../components/admin/sections/OverviewSection";
import BannerSection from "../components/admin/sections/BannerSection";
import CategorySection from "../components/admin/sections/CategorySection";
import ProductSection from "../components/admin/sections/ProductSection";
import UserSection from "../components/admin/sections/UserSection";

const SECTIONS = {
  overview: OverviewSection,
  banners: BannerSection,
  categories: CategorySection,
  products: ProductSection,
  users: UserSection,
};

function Admin() {
  const [activeSection, setActiveSection] = useState("overview");
  const ActiveComponent = SECTIONS[activeSection] || OverviewSection;

  return (
    <AdminLayout activeSection={activeSection} onSectionChange={setActiveSection}>
      <ActiveComponent />
    </AdminLayout>
  );
}

export default Admin;
