import { useState } from "react";
import { ChevronDown, Star, TrendingUp, Zap, Shield, Award, Armchair, Monitor, Headphones, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCardNew } from "@/components/ProductCardNew";
import { SearchBar } from "@/components/SearchBar";
import { CategoryGrid } from "@/components/CategoryGrid";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ProductRadarChart } from "@/components/RadarChart";
import { SEOHead } from "@/components/SEOHead";
import { createWebsiteStructuredData, createOrganizationStructuredData } from "@/components/StructuredData";
import { useProducts } from "@/hooks/useProducts";
import { useCategories } from "@/hooks/useCategories";
import { Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import heroChair from "@/assets/hero-chair.jpg";
import standingDesk from "@/assets/standing-desk.jpg";
import accessories from "@/assets/accessories.jpg";

const Index = () => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { data: featuredProducts = [], isLoading: isLoadingProducts } = useProducts(undefined, true);
  const { data: categories = [], isLoading: isLoadingCategories } = useCategories();

  const chartData = [
    { category: 'Confort', score: 9, fullMark: 10 },
    { category: 'Durabilité', score: 8, fullMark: 10 },
    { category: 'Design', score: 8.5, fullMark: 10 },
    { category: 'Prix', score: 7, fullMark: 10 },
    { category: 'Ergonomie', score: 9.5, fullMark: 10 },
    { category: 'Montage', score: 6, fullMark: 10 },
  ];

  const structuredData = [
    createWebsiteStructuredData(),
    createOrganizationStructuredData()
  ];

  return (
    <>
      <SEOHead
        title="Sit Well Seek Wise - Reviews Mobilier Ergonomique & Bureau | Comparatifs Experts 2024"
        description="✅ Reviews détaillées et comparatifs d'experts pour chaises ergonomiques, bureaux debout et accessoires de bureau. Plus de 500 produits testés. Trouvez votre mobilier ergonomique idéal."
        keywords="chaise ergonomique, bureau debout, mobilier ergonomique, reviews, comparatifs, bureau, santé posturale, productivité, ergonomie"
        canonicalUrl="/"
        structuredData={structuredData}
      />
      <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/30">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
          
          <div className="container mx-auto px-4 sm:px-6 py-20 relative">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="space-y-8 animate-fade-in">
                <div className="space-y-4">
                  <Badge className="bg-primary/10 text-primary border-primary/20">
                    <Zap className="w-3 h-3 mr-1" />
                    #1 Site de Reviews Mobilier Ergonomique
                  </Badge>
                  
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                    Trouvez le{" "}
                    <span className="gradient-text block">
                      mobilier parfait
                    </span>
                    {" "}pour votre santé
                  </h1>
                  
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    Reviews détaillées, comparatifs experts et recommandations personnalisées 
                    pour transformer votre espace de travail en environnement ergonomique optimal.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                  <Button className="btn-gradient text-base sm:text-lg px-6 sm:px-8 py-3">
                    Découvrir les reviews
                  </Button>
                  <Button variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 border-primary text-primary hover:bg-primary/10">
                    Quiz personnalisé
                  </Button>
                </div>

                {/* Stats */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-4">
                  <div className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground">Produits testés</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-secondary">50k+</div>
                    <div className="text-sm text-muted-foreground">Lecteurs mensuels</div>
                  </div>
                  <div className="text-center sm:text-left">
                    <div className="text-xl sm:text-2xl font-bold text-accent">4.9</div>
                    <div className="text-sm text-muted-foreground">Note moyenne</div>
                  </div>
                </div>
              </div>

              {/* Right Content - Hero Image */}
              <div className="relative animate-float">
                <div className="glass-card p-8 relative">
                  <img
                    src={heroChair}
                    alt="Chaise ergonomique AeroMax Pro - Support lombaire ajustable et accoudoirs 4D pour un confort optimal au bureau"
                    className="w-full h-auto rounded-2xl"
                    loading="eager"
                  />
                  
                  {/* Floating Rating Card */}
                  <div className="absolute -top-4 -right-4 glass-card p-4 animate-pulse-glow">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-warning fill-warning" />
                      <span className="font-bold text-lg">4.8</span>
                    </div>
                    <p className="text-xs text-muted-foreground">234 reviews</p>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </header>

        {/* Categories Section */}
        <section className="py-20 bg-gradient-to-b from-transparent to-muted/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Explorez par{" "}
                <span className="gradient-text">catégorie</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Découvrez notre sélection de mobilier ergonomique organisée par catégories
              </p>
            </div>
            
            {isLoadingCategories ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-4">Chargement des catégories...</p>
              </div>
            ) : (
              <CategoryGrid categories={categories.map(cat => ({
                id: cat.slug,
                name: cat.name,
                description: cat.description || "",
                image: cat.image_url || heroChair,
                productCount: 0, // TODO: Add product count
                icon: <Armchair className="w-6 h-6" />
              }))} />
            )}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8 lg:mb-12 gap-4 lg:gap-0">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  Produits{" "}
                  <span className="gradient-text">recommandés</span>
                </h2>
                <p className="text-lg sm:text-xl text-muted-foreground">
                  Nos picks d'experts pour votre confort au bureau
                </p>
              </div>
              
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10 w-full sm:w-auto">
                Voir tous les produits
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {isLoadingProducts ? (
                <div className="col-span-full text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                  <p className="text-muted-foreground mt-4">Chargement des produits...</p>
                </div>
              ) : (
                featuredProducts.map((product) => (
                  <ProductCardNew key={product.id} product={product} showBuyButton />
                ))
              )}
            </div>
          </div>
        </section>

        {/* Review Example Section */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-transparent">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Analyses{" "}
                <span className="gradient-text">détaillées</span>
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Chaque produit est testé selon 6 critères essentiels
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-primary" />
                    ErgoTech AeroMax Pro
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-warning fill-warning" />
                        ))}
                      </div>
                      <span className="text-2xl font-bold">4.8/5</span>
                      <Badge className="bg-success/10 text-success">
                        Recommandé Expert
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      Une chaise ergonomique exceptionnelle qui combine confort premium, 
                      durabilité industrielle et design moderne. Parfaite pour les longues 
                      sessions de travail grâce à son support lombaire ajustable et ses matériaux respirants.
                    </p>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-success">
                        <Shield className="w-4 h-4" />
                        <span className="text-sm">Garantie 10 ans</span>
                      </div>
                      <div className="flex items-center gap-2 text-success">
                        <Users className="w-4 h-4" />
                        <span className="text-sm">234 reviews</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <ProductRadarChart 
                data={chartData} 
                title="Évaluation Multi-Critères"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold">
                Prêt à transformer votre{" "}
                <span className="gradient-text">espace de travail</span> ?
              </h2>
              
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                Rejoignez des milliers de professionnels qui ont amélioré leur confort 
                et leur productivité grâce à nos recommandations expertes.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
                <Button className="btn-gradient text-base sm:text-lg px-6 sm:px-8 py-4">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Voir le TOP 10 2024
                </Button>
                <Button className="btn-gradient-secondary text-base sm:text-lg px-6 sm:px-8 py-4">
                  <Star className="w-5 h-5 mr-2" />
                  Quiz personnalisé
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;