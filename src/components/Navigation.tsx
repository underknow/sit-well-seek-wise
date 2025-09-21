import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  BookOpen, 
  BarChart3, 
  Settings, 
  ChevronDown,
  Menu,
  X 
} from "lucide-react";
import { useState } from "react";
import { useCategories } from "@/hooks/useCategories";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: categories = [] } = useCategories();

  return (
    <nav className="bg-background/95 backdrop-blur border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">SW</span>
            </div>
            <span className="font-bold text-lg">Sit Well Seek Wise</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                Catégories
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-colors"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link to="/blog" className="text-foreground hover:text-primary transition-colors">
              Blog
            </Link>
            
            <div className="relative group">
              <button className="flex items-center gap-1 text-foreground hover:text-primary transition-colors">
                Comparatifs
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <Link to="/admin" className="text-foreground hover:text-primary transition-colors">
              <Settings className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <div className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="w-4 h-4 inline mr-2" />
                Accueil
              </Link>
              
              <div className="px-4 py-2">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Catégories</p>
                <div className="space-y-1 ml-4">
                  {categories.slice(0, 5).map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.slug}`}
                      className="block px-2 py-1 text-sm text-foreground hover:bg-muted rounded transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/blog"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <BookOpen className="w-4 h-4 inline mr-2" />
                Blog
              </Link>

              <Link
                to="/admin"
                className="block px-4 py-2 text-foreground hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};