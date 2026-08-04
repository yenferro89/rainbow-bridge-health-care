import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Masthead from "./components/Masthead.jsx";
import Footer from "./components/Footer.jsx";
import StructuredData from "./components/StructuredData.jsx";
import Home from "./pages/Home.jsx";
import Contact from "./pages/Contact.jsx";
import Services from "./pages/Services.jsx";
import ServiceAreas from "./pages/ServiceAreas.jsx";
import ServiceArea from "./pages/ServiceArea.jsx";
import About from "./pages/About.jsx";
import Privacy from "./pages/Privacy.jsx";
import Terms from "./pages/Terms.jsx";
import NotFound from "./pages/NotFound.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <ScrollToTop />
      <StructuredData />
      <Masthead />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/service-areas/:slug" element={<ServiceArea />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
