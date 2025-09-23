import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Star, Heart, Share2, ShoppingCart, Award, Shield, Zap, Users, CheckCircle, XCircle, TrendingUp, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductRadarChart } from "@/components/RadarChart";
import { SEOHead } from "@/components/SEOHead";
import { createProductStructuredData, createBreadcrumbStructuredData, createArticleStructuredData } from "@/components/StructuredData";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { ProductCardNew } from "@/components/ProductCardNew";
import { LazyImage } from "@/components/LazyImage";
import heroChair from "@/assets/hero-chair.jpg";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const { data: product, isLoading } = useProduct(id || '');
  const { data: relatedProducts } = useProducts(product?.category?.slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Chargement du produit...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
          <Link to="/">
            <Button>Retour à l'accueil</Button>
          </Link>
        </div>
      </div>
    );
  }

  const images = product.image_url ? [product.image_url, product.image_url, product.image_url] : [heroChair, heroChair, heroChair];
  const discount = product.original_price && product.price 
    ? `-${Math.round(((product.original_price - product.price) / product.original_price) * 100)}%`
    : null;

  const chartData = [
    { category: 'Confort', score: 9, fullMark: 10 },
    { category: 'Durabilité', score: 8, fullMark: 10 },
    { category: 'Design', score: 8.5, fullMark: 10 },
    { category: 'Prix', score: 7, fullMark: 10 },
    { category: 'Ergonomie', score: 9.5, fullMark: 10 },
    { category: 'Montage', score: 6, fullMark: 10 },
  ];

  const pros = product.pros && product.pros.length > 0 ? product.pros : [
    "Excellent rapport qualité-prix",
    "Design moderne et élégant", 
    "Matériaux de qualité",
    "Facilité d'utilisation",
    "Confort optimal"
  ];

  const cons = product.cons && product.cons.length > 0 ? product.cons : [
    "Prix élevé",
    "Montage parfois complexe"
  ];

  const specifications = product.specifications || {
    "Marque": product.brand || "Non spécifié",
    "Modèle": product.name,
    "Catégorie": product.category?.name || "Non spécifié"
  };

  const breadcrumbs = [
    { name: "Accueil", url: "/" },
    { name: product.category?.name || "Produits", url: `/category/${product.category?.slug || ''}` },
    { name: product.name, url: `/product/${product.slug}` }
  ];

  const relatedProductsFiltered = relatedProducts?.filter(p => p.id !== product.id).slice(0, 3) || [];

  const structuredData = [
    createProductStructuredData({
      id: product.id,
      name: product.name,
      brand: product.brand || "Marque inconnue",
      rating: product.rating || 0,
      reviewCount: product.review_count || 0,
      price: product.price ? `${product.price}€` : "Prix sur demande",
      originalPrice: product.original_price ? `${product.original_price}€` : undefined,
      category: product.category?.name || "Produit"
    }),
    createBreadcrumbStructuredData(breadcrumbs),
    createArticleStructuredData({
      title: `Review ${product.name}${product.brand ? ` par ${product.brand}` : ''} - Test Complet 2025`,
      description: product.meta_description || `Test détaillé du ${product.name} : confort, ergonomie, durabilité. Notre verdict d'expert.`,
      image: product.image_url || heroChair,
      url: `/product/${product.slug}`,
      datePublished: "2025-01-15",
      dateModified: product.updated_at
    })
  ];

  return (
    <>
      <SEOHead
        title={product.meta_title || `${product.name}${product.brand ? ` par ${product.brand}` : ''} - Review Complète & Test 2025 | Sit Well Seek Wise`}
        description={product.meta_description || `✅ Review détaillée ${product.name}${product.brand ? ` ${product.brand}` : ''} : Note ${product.rating || 0}/5 sur ${product.review_count || 0} avis. ${product.price ? `Prix ${product.price}€` : 'Prix sur demande'}. Test complet ergonomie, confort, durabilité.`}
        keywords={`${product.name}${product.brand ? `, ${product.brand}` : ''}, ${product.category?.name?.toLowerCase() || 'mobilier'}, review, test, ergonomique`}
        canonicalUrl={`/product/${product.slug}`}
        type="article"
        image={product.image_url || heroChair}
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
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`glass-card p-2 w-20 h-20 rounded-xl overflow-hidden smooth-transition ${
                    currentImageIndex === index ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-border'
                  }`}
                >
                    <LazyImage
                      src={image}
                      alt={`${product.name}${product.brand ? ` ${product.brand}` : ''} - Image ${index + 1} - Détail produit`}
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
                    {product.category?.name || "Produit"}
                  </Badge>
                  {product.brand && <p className="text-muted-foreground font-medium">{product.brand}</p>}
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
                         i < Math.floor(product.rating || 0) ? 'text-warning fill-warning' : 'text-muted-foreground'
                       }`}
                     />
                   ))}
                 </div>
                 <span className="text-xl font-semibold">{product.rating || 0}</span>
                 <span className="text-muted-foreground">({product.review_count || 0} avis)</span>
                <Button variant="ghost" className="text-primary text-sm p-0 h-auto">
                  Voir les avis
                </Button>
              </div>
            </div>

            {/* Price */}
             <div className="glass-card p-6">
               <div className="flex items-baseline gap-4 mb-4">
                 <span className="text-4xl font-bold text-primary">
                   {product.price ? `${product.price}€` : "Prix sur demande"}
                 </span>
                 {product.original_price && product.price && (
                   <>
                     <span className="text-xl text-muted-foreground line-through">{product.original_price}€</span>
                     <Badge className="bg-destructive text-destructive-foreground">{discount}</Badge>
                   </>
                 )}
               </div>

               <div className="space-y-3 mb-6">
                 <div className="flex items-center gap-2 text-success">
                   <CheckCircle className="w-4 h-4" />
                   <span className="text-sm">Produit certifié - Expédition gratuite</span>
                 </div>
                 <div className="flex items-center gap-2 text-secondary">
                   <Shield className="w-4 h-4" />
                   <span className="text-sm">Garantie constructeur</span>
                 </div>
                 <div className="flex items-center gap-2 text-accent">
                   <Award className="w-4 h-4" />
                   <span className="text-sm">Testé par nos experts</span>
                 </div>
               </div>

               <div className="flex gap-3">
                 <Button 
                   className="btn-gradient flex-1 text-lg py-3"
                   onClick={() => window.open(product.affiliate_url, '_blank')}
                 >
                   <ShoppingCart className="w-5 h-5 mr-2" />
                   Voir l'offre
                 </Button>
                 <Link to={`/category/${product.category?.slug || ''}`}>
                   <Button variant="outline" className="border-secondary text-secondary hover:bg-secondary/10">
                     Comparer
                   </Button>
                 </Link>
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
                     {product.description ? (
                       <span dangerouslySetInnerHTML={{ __html: product.description.replace(/\n/g, '<br />') }} />
                     ) : (
                       <>
                         Le <strong className="text-foreground">{product.name}</strong> {product.brand && `de ${product.brand} `}
                         représente un excellent choix dans sa catégorie. Après des tests approfondis, 
                         ce produit s'impose comme une solution de qualité.
                       </>
                     )}
                   </p>
                   
                   <h3 className="text-2xl font-bold text-foreground">Notre Évaluation Experte</h3>
                   <p>
                     Ce produit a été soigneusement testé et évalué selon nos critères stricts. 
                     {product.rating && product.rating >= 4.5 && " Il obtient une note exceptionnelle grâce à ses qualités remarquables."}
                     {product.rating && product.rating >= 4 && product.rating < 4.5 && " Il offre un excellent rapport qualité-prix."}
                     {product.rating && product.rating < 4 && " Il présente des caractéristiques intéressantes pour certains usages."}
                   </p>

                   <h3 className="text-2xl font-bold text-foreground">Points Clés</h3>
                   {product.features && product.features.length > 0 && (
                     <ul className="list-disc list-inside space-y-2">
                       {product.features.map((feature, index) => (
                         <li key={index}>{feature}</li>
                       ))}
                     </ul>
                   )}

                   <div className="glass-card p-6 bg-primary/5 border-primary/20 my-8">
                     <div className="flex items-start gap-4">
                       <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                       <div>
                         <h4 className="font-bold text-foreground mb-2">Verdict d'Expert</h4>
                         <p className="text-foreground">
                           {product.rating && product.rating >= 4.5 
                             ? "Produit exceptionnel recommandé sans réserve. Un investissement judicieux pour les plus exigeants."
                             : product.rating && product.rating >= 4
                             ? "Excellent produit offrant un très bon rapport qualité-prix. Recommandé pour la plupart des utilisateurs."
                             : "Produit correct répondant aux besoins de base. À considérer selon votre budget et vos exigences."
                           }
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
               <div className="space-y-8">
                 <div className="text-center mb-8">
                   <h2 className="text-2xl font-bold mb-4">Comparaison avec la Concurrence</h2>
                   <p className="text-muted-foreground">
                     Comparez {product.name} avec d'autres produits similaires de la même catégorie
                   </p>
                 </div>
                 
                 {relatedProductsFiltered.length > 0 ? (
                   <div className="grid md:grid-cols-3 gap-6">
                     {relatedProductsFiltered.map((relatedProduct) => (
                       <ProductCardNew key={relatedProduct.id} product={relatedProduct} />
                     ))}
                   </div>
                 ) : (
                   <div className="glass-card p-8 text-center">
                     <p className="text-muted-foreground mb-6">
                       Aucun produit similaire trouvé dans cette catégorie.
                     </p>
                     <Link to={`/category/${product.category?.slug || ''}`}>
                       <Button className="btn-gradient">
                         Voir tous les produits de cette catégorie
                       </Button>
                     </Link>
                   </div>
                 )}
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