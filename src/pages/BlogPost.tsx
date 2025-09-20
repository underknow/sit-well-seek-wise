import { useParams, Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";
import { LazyImage } from "@/components/LazyImage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react";
import { useBlogPost } from "@/hooks/useBlog";
import { useProducts } from "@/hooks/useProducts";
import { ProductCardNew } from "@/components/ProductCardNew";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading } = useBlogPost(slug!);
  const { data: relatedProducts } = useProducts(post?.category?.slug, true);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="h-4 bg-muted rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Article non trouvé</h1>
          <p className="text-muted-foreground mb-8">
            L'article que vous recherchez n'existe pas ou a été supprimé.
          </p>
          <Link to="/blog">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
        keywords={post.tags?.join(", ") || ""}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          author: {
            "@type": "Person",
            name: post.author_name,
          },
          datePublished: post.published_at,
          dateModified: post.updated_at,
          image: post.featured_image_url,
        }}
      />
      
      <div className="min-h-screen bg-background">
        {/* Article Header */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-8">
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>

              {post.category && (
                <Badge variant="secondary" className="mb-4">
                  {post.category.name}
                </Badge>
              )}

              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>

              <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {post.author_name}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {post.published_at && new Date(post.published_at).toLocaleDateString('fr-FR')}
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager
                </Button>
              </div>

              {post.featured_image_url && (
                <div className="relative overflow-hidden rounded-lg mb-8">
                  <LazyImage
                    src={post.featured_image_url}
                    alt={post.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-foreground leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br/>') }}
                />
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Tags :</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="py-16 bg-gradient-to-br from-secondary/5 to-background">
            <div className="container mx-auto px-4">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-foreground mb-12">
                  Produits Recommandés
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedProducts.slice(0, 3).map((product) => (
                    <ProductCardNew key={product.id} product={product} showBuyButton />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
};

export default BlogPost;