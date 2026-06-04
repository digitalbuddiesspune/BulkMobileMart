import Header from "./Header";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <header className="bg-white">
        <Header />
        <Navbar />
      </header>
      <main className="flex-1 bg-black">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
