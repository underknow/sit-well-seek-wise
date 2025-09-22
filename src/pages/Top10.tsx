import { useState } from "react";
import { Trophy, Star, Award, TrendingUp, Crown, Zap, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCardNew } from "@/components/ProductCardNew";
import { SEOHead } from "@/components/SEOHead";
import { Navigation } from "@/components/Navigation";
import { useProducts } from "@/hooks/useProducts";
import { createArticleStructuredData } from "@/components/StructuredData";
import { Link } from "react-router-dom";

const Top10 = () => {
  const { data: featuredProducts = [], isLoading } = useProducts(undefined, true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const structuredData = createArticleStructuredData({
    headline: "Top 10 Mobilier Ergonomique 2025 - Classement Expert",
    author: "Sit Well Seek Wise",
    datePublished: "2025-01-01",
    dateModified: new Date().toISOString(),
    description: "Découvrez notre sélection exclusive des 10 meilleurs produits de mobilier ergonomique pour 2025, testés et approuvés par nos experts.",
    image: "/og-image.jpg"
  });

  const categories = [
    { id: "all", name: "Tous", icon: <Trophy className="w-4 h-4" /> },
    { id: "chaises", name: "Chaises", icon: <Crown className="w-4 h-4" /> },
    { id: "bureaux", name: "Bureaux", icon: <Shield className="w-4 h-4" /> },
    { id: "accessoires", name: "Accessoires", icon: <Zap className="w-4 h-4" /> }
  ];

  const rankings = [
    { position: 1, badge: "🏆", color: "bg-gradient-to-r from-yellow-400 to-yellow-600", text: "Champion" },
    { position: 2, badge: "🥈", color: "bg-gradient-to-r from-gray-300 to-gray-500", text: "Vice-Champion" },
    { position: 3, badge: "🥉", color: "bg-gradient-to-r from-amber-600 to-amber-800", text: "Podium" },
    { position: 4, badge: "⭐", color: "bg-gradient-to-r from-blue-500 to-blue-700", text: "Excellence" },
    { position: 5, badge: "⭐", color: "bg-gradient-to-r from-blue-500 to-blue-700", text: "Excellence" }
  ];

  return (
    <>
      <SEOHead
        title="Top 10 Mobilier Ergonomique 2025 - Classement Expert | Sit Well Seek Wise"
        description="🏆 Découvrez notre sélection exclusive des 10 meilleurs produits de mobilier ergonomique pour 2025. Reviews approfondies, tests comparatifs et recommandations d'experts pour choisir le mobilier parfait."
        keywords="top 10 2025, meilleur mobilier ergonomique, classement chaise bureau, bureau debout 2025, mobilier bureau professionnel"
        canonicalUrl="/top-10-2025"
        structuredData={structuredData}
      />
      
      <div className="min-h-screen">
        <Navigation />
        
        {/* Hero Section */}
        <header className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-primary/10" />
          
          <div className="container mx-auto px-4 sm:px-6 py-20 relative">
            <div className="text-center space-y-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Trophy className="w-16 h-16 text-yellow-500 animate-pulse" />
                  <Crown className="w-8 h-8 text-yellow-400 absolute -top-2 -right-2 animate-bounce" />
                </div>
              </div>
              
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-yellow-900 px-4 py-2 text-lg font-semibold">
                <Award className="w-4 h-4 mr-2" />
                Édition 2025 - Nouveautés incluses
              </Badge>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">
                <span className="gradient-text">Top 10</span>{" "}
                Mobilier Ergonomique
                <span className="block text-3xl sm:text-4xl lg:text-5xl mt-2">
                  Édition 2025
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Notre sélection exclusive des meilleurs produits de mobilier ergonomique pour 2025. 
                Chaque produit a été rigoureusement testé et évalué par notre équipe d'experts.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Tests approfondis</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Nouveautés 2025</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>Coup de cœur experts</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Filters */}
        <section className="py-8 bg-muted/20">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Top 10 Products */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-4">Chargement du classement...</p>
              </div>
            ) : (
              <div className="space-y-8">
                {featuredProducts.slice(0, 10).map((product, index) => {
                  const ranking = rankings[index] || { 
                    position: index + 1, 
                    badge: "⭐", 
                    color: "bg-gradient-to-r from-primary/20 to-primary/40", 
                    text: "Top 10" 
                  };
                  
                  return (
                    <div key={product.id} className="relative">
                      <div className={`glass-card p-6 lg:p-8 ${index < 3 ? 'ring-2 ring-primary/20' : ''}`}>
                        <div className="grid lg:grid-cols-12 gap-6 items-center">
                          {/* Ranking */}
                          <div className="lg:col-span-2 text-center lg:text-left">
                            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${ranking.color} text-white font-bold text-2xl mb-2`}>
                              {ranking.badge}
                            </div>
                            <div className="text-3xl font-bold text-primary">#{index + 1}</div>
                            <Badge className="mt-1">{ranking.text}</Badge>
                          </div>
                          
                          {/* Product Info */}
                          <div className="lg:col-span-6">
                            <ProductCardNew 
                              product={product} 
                              showBuyButton={false}
                            />
                          </div>
                          
                          {/* Stats & Awards */}
                          <div className="lg:col-span-4 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="text-center p-3 bg-muted/50 rounded-lg">
                                <Star className="w-5 h-5 text-yellow-500 mx-auto mb-1" />
                                <div className="font-bold">{product.rating || "4.8"}/5</div>
                                <div className="text-xs text-muted-foreground">Note globale</div>
                              </div>
                              <div className="text-center p-3 bg-muted/50 rounded-lg">
                                <Trophy className="w-5 h-5 text-primary mx-auto mb-1" />
                                <div className="font-bold">{product.review_count || "0"}+</div>
                                <div className="text-xs text-muted-foreground">Reviews</div>
                              </div>
                            </div>
                            
                            <Button className="w-full btn-gradient" size="lg">
                              Voir la review complète
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Special badges for top 3 */}
                      {index < 3 && (
                        <div className="absolute -top-3 left-6">
                          <Badge className={`${ranking.color} text-white px-3 py-1 font-semibold`}>
                            {index === 0 ? "🏆 Meilleur choix 2025" : 
                             index === 1 ? "🥈 Excellence qualité" : 
                             "🥉 Rapport qualité-prix"}
                          </Badge>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Besoin d'aide pour choisir ?
              </h2>
              
              <p className="text-xl text-muted-foreground">
                Notre quiz personnalisé vous aide à trouver le mobilier parfait selon vos besoins spécifiques.
              </p>

              <Link to="/quiz">
                <Button className="btn-gradient text-lg px-8 py-4" size="lg">
                  <Zap className="w-5 h-5 mr-2" />
                  Faire le quiz personnalisé
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Top10;