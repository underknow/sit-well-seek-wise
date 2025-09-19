import { useState } from "react";
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Award, Shield, Zap, Users, CheckCircle, XCircle, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductRadarChart } from "@/components/RadarChart";
import { SEOHead } from "@/components/SEOHead";
import { createProductStructuredData, createBreadcrumbStructuredData, createArticleStructuredData } from "@/components/StructuredData";
import heroChair from "@/assets/hero-chair.jpg";

const ProductDetail = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = {
    id: "1",
    name: "AeroMax Pro",
    brand: "ErgoTech",
    images: [heroChair, heroChair, heroChair],
    rating: 4.8,
    reviewCount: 234,
    price: "599€",
    originalPrice: "799€",
    discount: "-25%",
    category: "Chaise Ergonomique",
    inStock: true,
    freeShipping: true,
    warranty: "10 ans",
    tested: "90 jours"
  };

  const chartData = [
    { category: 'Confort', score: 9, fullMark: 10 },
    { category: 'Durabilité', score: 8, fullMark: 10 },
    { category: 'Design', score: 8.5, fullMark: 10 },
    { category: 'Prix', score: 7, fullMark: 10 },
    { category: 'Ergonomie', score: 9.5, fullMark: 10 },
    { category: 'Montage', score: 6, fullMark: 10 },
  ];

  const pros = [
    "Support lombaire ajustable en hauteur et profondeur",
    "Accoudoirs 4D (hauteur, largeur, avant/arrière, rotation)",
    "Matériaux premium avec mesh respirant",
    "Mécanisme d'inclinaison avec tension ajustable",
    "Base aluminium très stable",
    "Garantie constructeur de 10 ans"
  ];

  const cons = [
    "Prix élevé comparé à la concurrence",
    "Montage complexe (2-3h nécessaires)",
    "Taille imposante (pas adaptée aux petits espaces)"
  ];

  const specifications = {
    "Dimensions": "68 x 68 x 119-129 cm",
    "Poids": "28 kg",
    "Charge max": "150 kg",
    "Matériaux": "Mesh, aluminium, plastique ABS",
    "Couleurs": "Noir, gris, blanc",
    "Montage": "2-3 heures",
    "Certification": "GREENGUARD Gold, BIFMA"
  };

  const breadcrumbs = [
    { name: "Accueil", url: "/" },
    { name: "Chaises Ergonomiques", url: "/category/chaises-ergonomiques" },
    { name: "AeroMax Pro", url: "/product/aeromax-pro" }
  ];

  const structuredData = [
    createProductStructuredData(product),
    createBreadcrumbStructuredData(breadcrumbs),
    createArticleStructuredData({
      title: `Review ${product.name} par ${product.brand} - Test Complet 2024`,
      description: `Test détaillé de la ${product.name} : confort, ergonomie, durabilité. Notre verdict après 90 jours d'utilisation.`,
      image: heroChair,
      url: `/product/${product.id}`,
      datePublished: "2024-01-15",
      dateModified: new Date().toISOString()
    })
  ];

  return (
    <>
      <SEOHead
        title={`${product.name} par ${product.brand} - Review Complète & Test 2024 | Sit Well Seek Wise`}
        description={`✅ Review détaillée ${product.name} ${product.brand} : Note ${product.rating}/5 sur ${product.reviewCount} avis. Prix ${product.price}. Test complet ergonomie, confort, durabilité. Garantie ${product.warranty}.`}
        keywords={`${product.name}, ${product.brand}, chaise ergonomique, review, test, ${product.category.toLowerCase()}`}
        canonicalUrl={`/product/${product.id}`}
        type="article"
        image={heroChair}
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour aux résultats
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="glass-card p-4 aspect-square rounded-2xl overflow-hidden group">
                  <img
                    src={product.images[currentImageIndex]}
                    alt={`${product.name} par ${product.brand} - Vue ${currentImageIndex + 1} - Chaise ergonomique premium avec support lombaire ajustable`}
                    className="w-full h-full object-cover rounded-xl group-hover:scale-105 smooth-transition"
                    loading="eager"
                  />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`glass-card p-2 w-20 h-20 rounded-xl overflow-hidden smooth-transition ${
                    currentImageIndex === index ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-border'
                  }`}
                >
                    <img
                      src={image}
                      alt={`${product.name} ${product.brand} - Image ${index + 1} - Détail chaise ergonomique`}
                      className="w-full h-full object-cover rounded-lg"
                      loading="lazy"
                    />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="outline" className="mb-2">
                    {product.category}
                  </Badge>
                  <p className="text-muted-foreground font-medium">{product.brand}</p>
                  <h1 className="text-4xl font-bold text-foreground">{product.name}</h1>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`${isWishlisted ? 'text-destructive' : 'text-muted-foreground'} hover:text-destructive`}
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-warning fill-warning' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-semibold">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviewCount} avis)</span>
                <Button variant="ghost" className="text-primary text-sm p-0 h-auto">
                  Voir les avis
                </Button>
              </div>
            </div>

            {/* Price */}
            <div className="glass-card p-6">
              <div className="flex items-baseline gap-4 mb-4">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">{product.originalPrice}</span>
                    <Badge className="bg-destructive text-destructive-foreground">{product.discount}</Badge>
                  </>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-success">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">En stock - Expédition gratuite</span>
                </div>
                <div className="flex items-center gap-2 text-secondary">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Garantie {product.warranty}</span>
                </div>
                <div className="flex items-center gap-2 text-accent">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Testé pendant {product.tested}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="btn-gradient flex-1 text-lg py-3">
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Voir l'offre
                </Button>
                <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                  Comparer
                </Button>
              </div>
            </div>

            {/* Quick Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card p-4 text-center">
                <Users className="w-6 h-6 text-primary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Recommandé par</div>
                <div className="font-semibold">98% d'experts</div>
              </div>
              <div className="glass-card p-4 text-center">
                <TrendingUp className="w-6 h-6 text-secondary mx-auto mb-2" />
                <div className="text-sm text-muted-foreground">Amélioration</div>
                <div className="font-semibold">Posture +85%</div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Review Section */}
        <div className="mt-16">
          <Tabs defaultValue="review" className="w-full">
            <TabsList className="grid w-full grid-cols-4 glass-card mb-8">
              <TabsTrigger value="review" className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Review Détaillée
              </TabsTrigger>
              <TabsTrigger value="specs">Caractéristiques</TabsTrigger>
              <TabsTrigger value="comparison">Comparaison</TabsTrigger>
              <TabsTrigger value="reviews">Avis Clients</TabsTrigger>
            </TabsList>

            <TabsContent value="review" className="space-y-8">
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Scoring */}
                <ProductRadarChart 
                  data={chartData} 
                  title="Évaluation Experte Multi-Critères"
                />

                {/* Pros & Cons */}
                <div className="space-y-6">
                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-4 text-success flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Points Forts
                    </h3>
                    <ul className="space-y-3">
                      {pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-success rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="glass-card p-6">
                    <h3 className="text-xl font-bold mb-4 text-warning flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Points d'Amélioration
                    </h3>
                    <ul className="space-y-3">
                      {cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-warning rounded-full mt-2 flex-shrink-0" />
                          <span className="text-muted-foreground">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed Review Text */}
              <div className="glass-card p-8">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <Award className="w-8 h-8 text-primary" />
                  Notre Verdict Expert
                </h2>
                
                <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
                  <p className="text-xl leading-relaxed">
                    L'<strong className="text-foreground">ErgoTech AeroMax Pro</strong> représente l'excellence 
                    en matière de siège ergonomique. Après 90 jours de tests intensifs dans différents 
                    environnements de travail, cette chaise s'impose comme une référence absolue.
                  </p>
                  
                  <h3 className="text-2xl font-bold text-foreground">Confort & Ergonomie (9/10)</h3>
                  <p>
                    Le support lombaire ajustable est un véritable game-changer. Contrairement aux modèles 
                    standards, il s'adapte parfaitement à la courbure naturelle de votre colonne vertébrale. 
                    Les accoudoirs 4D permettent un ajustement millimétrique pour chaque morphologie.
                  </p>

                  <h3 className="text-2xl font-bold text-foreground">Qualité de Construction (8/10)</h3>
                  <p>
                    Les matériaux utilisés respirent la qualité. Le mesh haute densité assure une ventilation 
                    optimale même lors de longues sessions. La base en aluminium inspire confiance et 
                    stabilité, même pour les utilisateurs les plus dynamiques.
                  </p>

                  <div className="glass-card p-6 bg-primary/5 border-primary/20 my-8">
                    <div className="flex items-start gap-4">
                      <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-bold text-foreground mb-2">Recommandation Expert</h4>
                        <p className="text-foreground">
                          Idéale pour les professionnels passant 6h+ par jour assis. 
                          Investissement rentabilisé en moins de 6 mois grâce à l'amélioration 
                          de la productivité et la réduction des douleurs dorsales.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specs">
              <div className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Caractéristiques Techniques</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-border">
                      <span className="font-medium text-foreground">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="comparison">
              <div className="glass-card p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Comparaison avec la Concurrence</h2>
                <p className="text-muted-foreground mb-6">
                  Comparez l'AeroMax Pro avec d'autres chaises ergonomiques premium
                </p>
                <Button className="btn-gradient">
                  Voir la comparaison complète
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="glass-card p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Avis Clients Vérifiés</h2>
                <p className="text-muted-foreground mb-6">
                  234 avis clients avec note moyenne de 4.8/5
                </p>
                <Button className="btn-gradient">
                  Lire tous les avis
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
    </>
  );
};

export default ProductDetail;