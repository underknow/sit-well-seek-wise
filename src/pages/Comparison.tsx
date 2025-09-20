import { useParams } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { ComparisonTable } from "@/components/ComparisonTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Check, X, ExternalLink } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProducts } from "@/hooks/useProducts";

const Comparison = () => {
  const { slug } = useParams<{ slug: string }>();

  const { data: comparison, isLoading: comparisonLoading } = useQuery({
    queryKey: ["comparison", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_comparisons")
        .select(`
          *,
          category:categories(name, slug)
        `)
        .eq("slug", slug)
        .eq("is_active", true)
        .maybeSingle();
      
      if (error) throw error;
      return data;
    },
  });

  const { data: products, isLoading: productsLoading } = useQuery({
    queryKey: ["comparison-products", comparison?.product_ids],
    queryFn: async () => {
      if (!comparison?.product_ids?.length) return [];
      
      const { data, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(name, slug)
        `)
        .in("id", comparison.product_ids)
        .eq("is_active", true);
      
      if (error) throw error;
      return data;
    },
    enabled: !!comparison?.product_ids?.length,
  });

  if (comparisonLoading || productsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="animate-pulse max-w-6xl mx-auto">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded w-2/3 mb-8"></div>
            <div className="h-96 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!comparison) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Comparatif non trouvé</h1>
        </div>
      </div>
    );
  }

  const criteria = comparison.comparison_criteria as Array<{name: string, type: string}> || [];

  return (
    <>
      <SEOHead
        title={comparison.meta_title || comparison.title}
        description={comparison.meta_description || comparison.description || ""}
      />
      
      <div className="min-h-screen bg-background">
        {/* Header */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              {comparison.category && (
                <Badge variant="secondary" className="mb-4">
                  {comparison.category.name}
                </Badge>
              )}
              
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {comparison.title}
              </h1>
              
              {comparison.description && (
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {comparison.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {products && products.length > 0 ? (
                <div className="overflow-x-auto">
                  <div className="min-w-full">
                    {/* Product Headers */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                      {products.map((product) => (
                        <Card key={product.id} className="text-center">
                          <CardContent className="p-6">
                            <img
                              src={product.image_url || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            
                            <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                            <p className="text-sm text-muted-foreground mb-4">{product.brand}</p>
                            
                            <div className="flex items-center justify-center gap-2 mb-4">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < Math.floor(product.rating || 0)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm">({product.review_count} avis)</span>
                            </div>

                            <div className="text-center mb-4">
                              {product.original_price && product.original_price > (product.price || 0) && (
                                <span className="text-sm text-muted-foreground line-through mr-2">
                                  {product.original_price}€
                                </span>
                              )}
                              <span className="text-2xl font-bold text-primary">
                                {product.price}€
                              </span>
                            </div>

                            <Button asChild className="w-full">
                              <a 
                                href={product.affiliate_url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2"
                              >
                                Voir l'offre
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Comparison Criteria */}
                    <div className="space-y-6">
                      {criteria.map((criterion, index) => (
                        <Card key={index}>
                          <CardContent className="p-6">
                            <h3 className="text-lg font-semibold mb-4">{criterion.name}</h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {products.map((product) => {
                                let content = "";
                                
                                if (criterion.type === "price" && product.price) {
                                  content = `${product.price}€`;
                                } else if (criterion.type === "rating" && product.rating) {
                                  content = `${product.rating}/5`;
                                } else {
                                  // Default text content - you'd customize this based on your data
                                  content = "À définir";
                                }
                                
                                return (
                                  <div key={product.id} className="text-center p-4 bg-secondary/10 rounded-lg">
                                    <div className="font-medium">{content}</div>
                                  </div>
                                );
                              })}
                            </div>
                          </CardContent>
                        </Card>
                      ))}

                      {/* Features Comparison */}
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold mb-4">Caractéristiques</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {products.map((product) => (
                              <div key={product.id} className="space-y-2">
                                {(product.features as string[] || []).map((feature, idx) => (
                                  <div key={idx} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-green-500" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Pros and Cons */}
                      <Card>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold mb-4">Avantages & Inconvénients</h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.map((product) => (
                              <div key={product.id} className="space-y-4">
                                <div>
                                  <h4 className="font-medium text-green-600 mb-2">Avantages</h4>
                                  <div className="space-y-1">
                                    {(product.pros as string[] || []).map((pro, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-sm">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {pro}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                <div>
                                  <h4 className="font-medium text-red-600 mb-2">Inconvénients</h4>
                                  <div className="space-y-1">
                                    {(product.cons as string[] || []).map((con, idx) => (
                                      <div key={idx} className="flex items-center gap-2 text-sm">
                                        <X className="w-4 h-4 text-red-500" />
                                        {con}
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-16">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    Aucun produit à comparer
                  </h3>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Comparison;