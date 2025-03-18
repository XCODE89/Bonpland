
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Search, Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Link } from "react-router-dom";
import logo from "@/assets/images/logo.jfif"

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3 bg-white/60 backdrop-blur-md shadow-xl"
          : "py-6 bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/">
            <img src={logo} alt="logo_bonpland" width="100px" />
          </Link>
        </div>

        {isMobile ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="relative z-50"
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>

            {menuOpen && (
              <div className="fixed inset-0 bg-white z-40 animate-fade-in-fast">
                <div className="h-full flex flex-col items-center justify-center space-y-8">
                  <a href="#properties" className="text-xl font-medium" onClick={toggleMenu}>Propiedades</a>
                  <a href="#about" className="text-xl font-medium" onClick={toggleMenu}>Nosotros</a>
                  <Link to="/contact" className="text-xl font-medium" onClick={toggleMenu}>Contacto</Link>
                  <Link to="/dashboard" className="text-xl font-medium">Admin</Link>
                  <Button className="mt-8 bg-estate-primary hover:bg-estate-primary/90" onClick={toggleMenu}>
                    <Search className="mr-2 h-4 w-4" /> Buscar Propiedades
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/properties"
                className="text-lg font-medium text-estate-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-estate-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Propiedades
              </Link>
              <Link
                to="/about"
                className="text-lg font-medium text-estate-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-estate-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Nosotros
              </Link>
              <a
                href="/contact"
                className="text-lg font-medium text-estate-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-estate-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left"
              >
                Contacto
              </a>
              <Link to="/dashboard" className="text-lg font-medium text-estate-primary relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-estate-accent after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left">
                Admin
              </Link>
            </nav>

            <div className="hidden md:flex items-center space-x-4">
              {/* <Button variant="outline">
                <Phone className="mr-2 h-4 w-4" /> Llamar
              </Button> */}
              <Button className="bg-estate-primary hover:bg-estate-primary/90">
                <Search className="mr-2 h-4 w-4" /> Buscar
              </Button>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default NavBar;
