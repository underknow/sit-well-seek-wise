import { useState } from "react";
import { Filter, Grid, List, SortDesc, ArrowUpDown, Star, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductCard } from "@/components/ProductCard";
import { SearchBar } from "@/components/SearchBar";
import { SEOHead } from "@/components/SEOHead";
import { createBreadcrumbStructuredData, createProductStructuredData } from "@/components/StructuredData";
import heroChair from "@/assets/hero-chair.jpg";
import standingDesk from "@/assets/standing-desk.jpg";
import accessories from "@/assets/accessories.jpg";

const Category = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");

  const products = [
    {
      id: "1",
      name: "AeroMax Pro",
      brand: "ErgoTech",
      image: heroChair,
      rating: 4.8,
      reviewCount: 234,
      price: "599€",
      originalPrice: "799€",
      category: "Chaise Ergonomique",
      isRecommended: true,
      isBestSeller: true,
      pros: ["Support lombaire ajustable", "Accoudoirs 4D", "Garantie 10 ans"]
    },
    {
      id: "2",
      name: "ComfortZone Elite",
      brand: "ErgoTech",
      image: heroChair,
      rating: 4.6,
      reviewCount: 189,
      price: "449€",
      category: "Chaise Ergonomique",
      isRecommended: false,
      isBestSeller: true,
      pros: ["Design moderne", "Mesh respirant", "Prix compétitif"]
    },
    {
      id: "3",
      name: "FlexiSit Advanced",
      brand: "ComfortCorp",
      image: heroChair,
      rating: 4.4,
      reviewCount: 156,
      price: "329€",
      originalPrice: "399€",
      category: "Chaise Ergonomique",
      isRecommended: true,
      isBestSeller: false,
      pros: ["Support cervical", "Rotation 360°", "Montage facile"]
    },
    {
      id: "4",
      name: "StandDesk Pro Max",
      brand: "FlexiWork",
      image: standingDesk,
      rating: 4.7,
      reviewCount: 203,
      price: "649€",
      category: "Bureau Debout",
      isRecommended: true,
      isBestSeller: true,
      pros: ["Réglage électrique", "Mémoire positions", "Surface anti-reflets"]
    },
    {
      id: "5",
      name: "ErgoKit Essential",
      brand: "ComfortZone",
      image: accessories,
      rating: 4.3,
      reviewCount: 98,
      price: "159€",
      category: "Accessoires",
      isRecommended: false,
      isBestSeller: false,
      pros: ["Kit complet", "Installation rapide", "Matériaux durables"]
    },
    {
      id: "6",
      name: "UltraComfort Deluxe",
      brand: "PremiumSeating",
      image: heroChair,
      rating: 4.9,
      reviewCount: 312,
      price: "899€",
      originalPrice: "1199€",
      category: "Chaise Ergonomique",
      isRecommended: true,
      isBestSeller: true,
      pros: ["Cuir premium", "Massage intégré", "Garantie à vie"]
    }
  ];

  const brands = ["ErgoTech", "ComfortCorp", "FlexiWork", "ComfortZone", "PremiumSeating"];
  const features = ["Support lombaire", "Accoudoirs réglables", "Mesh respirant", "Garantie étendue"];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const breadcrumbs = [
    { name: "Accueil", url: "/" },
    { name: "Chaises Ergonomiques", url: "/category/chaises-ergonomiques" }
  ];

  const structuredData = [
    createBreadcrumbStructuredData(breadcrumbs),
    ...products.slice(0, 3).map(createProductStructuredData) // Add structured data for top products
  ];

  return (
    <>
      <SEOHead
        title="Meilleures Chaises Ergonomiques 2024 - Reviews & Comparatifs Experts"
        description="✅ Découvrez notre sélection des 47 meilleures chaises ergonomiques 2024. Reviews détaillées, comparatifs prix et tests d'experts. Note moyenne: 4.6/5 sur 1,247 avis vérifiés."
        keywords="chaise ergonomique 2024, meilleure chaise de bureau, siège ergonomique, comparatif chaise bureau, reviews chaises ergonomiques"
        canonicalUrl="/category/chaises-ergonomiques"
        type="article"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary/10 via-transparent to-secondary/10 border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="max-w-3xl">
            <Badge className="bg-primary/10 text-primary mb-4">
              Chaises Ergonomiques
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Les meilleures 
              <span className="gradient-text block sm:inline"> chaises ergonomiques</span> 2024
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed">
              47 chaises testées et comparées par nos experts. Trouvez la chaise 
              parfaite pour votre confort et votre productivité au bureau.
            </p>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mt-6">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-warning fill-warning" />
                <span className="font-semibold text-sm sm:text-base">4.6/5</span>
                <span className="text-muted-foreground text-sm sm:text-base">Note moyenne</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
                <span className="font-semibold text-sm sm:text-base">1,247</span>
                <span className="text-muted-foreground text-sm sm:text-base">Avis vérifiés</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <SearchBar 
          placeholder="Rechercher dans les chaises ergonomiques..."
          onFilterToggle={() => setShowFilters(!showFilters)}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 pb-12">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          {/* Sidebar Filters */}
          {showFilters && (
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="glass-card p-4 lg:p-6 lg:sticky lg:top-6 space-y-6 lg:space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">Filtres</h2>
                  <Button variant="ghost" size="sm" className="text-muted-foreground">
                    Réinitialiser
                  </Button>
                </div>

                {/* Price Range */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Budget</h3>
                  <div className="space-y-3">
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={1000}
                      min={0}
                      step={50}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{priceRange[0]}€</span>
                      <span>{priceRange[1]}€</span>
                    </div>
                  </div>
                </div>

                {/* Brands */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Marques</h3>
                  <div className="space-y-3">
                    {brands.map(brand => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox 
                          id={brand}
                          checked={selectedBrands.includes(brand)}
                          onCheckedChange={() => handleBrandToggle(brand)}
                        />
                        <label 
                          htmlFor={brand} 
                          className="text-sm cursor-pointer flex-1"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Fonctionnalités</h3>
                  <div className="space-y-3">
                    {features.map(feature => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Checkbox id={feature} />
                        <label 
                          htmlFor={feature} 
                          className="text-sm cursor-pointer flex-1"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Note minimum</h3>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map(rating => (
                      <div key={rating} className="flex items-center space-x-2 cursor-pointer">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm cursor-pointer">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-3 h-3 ${i < rating ? 'text-warning fill-warning' : 'text-muted-foreground'}`} 
                            />
                          ))}
                          <span>et plus</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Main Content */}
          <main className="flex-1 space-y-4 lg:space-y-6">
            {/* Toolbar */}
            <div className="glass-card p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">
                  {products.length} produits trouvés
                </span>
                <div className="flex items-center gap-1">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="text-muted-foreground lg:hidden justify-center"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtres {showFilters ? '(masqués)' : ''}
                </Button>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Trier par" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Pertinence</SelectItem>
                    <SelectItem value="rating">Note la plus élevée</SelectItem>
                    <SelectItem value="price-low">Prix croissant</SelectItem>
                    <SelectItem value="price-high">Prix décroissant</SelectItem>
                    <SelectItem value="newest">Plus récent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {products.map((product) => (
                <ProductCard 
                  key={product.id} 
                  {...product}
                  onClick={() => console.log(`Navigate to product ${product.id}`)}
                />
              ))}
             </div>

             {/* Load More */}
             <div className="text-center py-8">
               <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                 Charger plus de produits
               </Button>
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;