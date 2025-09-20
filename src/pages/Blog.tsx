import { SEOHead } from "@/components/SEOHead";
import { LazyImage } from "@/components/LazyImage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPosts } from "@/hooks/useBlog";
import { useCategories } from "@/hooks/useCategories";

const Blog = () => {
  const { data: posts, isLoading } = useBlogPosts();
  const { data: categories } = useCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-t-lg"></div>
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Blog - Guides et Conseils Ergonomie Bureau"
        description="Découvrez nos guides complets, conseils d'experts et dernières tendances pour optimiser votre espace de travail ergonomique."
        keywords="blog ergonomie, conseils bureau, guides mobilier, tendances workspace"
      />
      
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Blog Ergonomie & Bien-être
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Guides d'experts, conseils pratiques et dernières tendances pour créer l'espace de travail parfait
              </p>
              
              {/* Categories Filter */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
                <Badge variant="default" className="px-4 py-2">
                  Tous les articles
                </Badge>
                {categories?.map((category) => (
                  <Badge key={category.id} variant="outline" className="px-4 py-2 hover:bg-primary hover:text-primary-foreground cursor-pointer">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts?.map((post) => (
                <article key={post.id} className="group">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <LazyImage
                        src={post.featured_image_url || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {post.category && (
                        <Badge 
                          variant="secondary" 
                          className="absolute top-4 left-4 bg-background/90 text-foreground"
                        >
                          {post.category.name}
                        </Badge>
                      )}
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.published_at && new Date(post.published_at).toLocaleDateString('fr-FR')}
                        </div>
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author_name}
                        </div>
                      </div>

                      <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors">
                        <Link to={`/blog/${post.slug}`} className="block">
                          {post.title}
                        </Link>
                      </CardTitle>

                      <p className="text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <Link 
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium group-hover:gap-3 transition-all duration-200"
                      >
                        Lire l'article
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </CardContent>
                  </Card>
                </article>
              ))}
            </div>

            {posts && posts.length === 0 && (
              <div className="text-center py-16">
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Aucun article trouvé
                </h3>
                <p className="text-muted-foreground">
                  Revenez bientôt pour découvrir nos nouveaux guides et conseils !
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default Blog;