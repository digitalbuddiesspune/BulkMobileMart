import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import AuthModal from "./components/auth/AuthModal";
import Layout from "./components/layout/Layout";
import ScrollToTop from "./components/layout/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Blog from "./pages/Blog";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import Admin from "./pages/Admin";

function AuthModalHost() {
  const { authModal, closeAuthModal, setAuthModal } = useAuth();

  if (!authModal) return null;

  return (
    <AuthModal
      mode={authModal}
      onClose={closeAuthModal}
      onSwitchMode={setAuthModal}
    />
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <CartProvider>
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route
            path="/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/product" element={<Product />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
                </Routes>
              </Layout>
            }
          />
        </Routes>
        <AuthModalHost />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
