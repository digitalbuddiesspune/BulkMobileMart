import BottomNav from "../components/mobile/BottomNav";
import TopNav from "../components/mobile/TopNav";

function MobileLayout({ children }) {
  return (
    <div className="min-h-screen bg-mobile-bg text-text-primary">
      <TopNav />
      <main className="mx-auto w-full max-w-7xl bg-mobile-bg pb-20 lg:pb-8 min-h-screen">
        {children}
      </main>
      <BottomNav />
    </div>
  );
}

export default MobileLayout;
