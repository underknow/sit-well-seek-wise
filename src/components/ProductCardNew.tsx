import { Star, ExternalLink, Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LazyImage } from "@/components/LazyImage";
import { Link } from "react-router-dom";
import { Product } from "@/hooks/useProducts";

interface ProductCardNewProps {
  product: Product;
  showBuyButton?: boolean;
}

export const ProductCardNew = ({ product, showBuyButton = false }: ProductCardNewProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur overflow-hidden">
      <div className="relative">
        {/* Badges */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          {product.is_featured && (
            <Badge className="bg-primary text-primary-foreground">
              <Award className="w-3 h-3 mr-1" />
              Top Choix
            </Badge>
          )}
          {product.original_price && product.price && product.original_price > product.price && (
            <Badge variant="destructive">
              -{Math.round(((product.original_price - product.price) / product.original_price) * 100)}%
            </Badge>
          )}
        </div>

        {/* Image */}
        <div className="relative overflow-hidden">
          <LazyImage
            src={product.image_url || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      <CardContent className="p-6">
        {/* Category */}
        {product.category && (
          <Badge variant="outline" className="mb-3">
            {product.category.name}
          </Badge>
        )}

        {/* Brand & Name */}
        <div className="mb-4">
          {product.brand && (
            <p className="text-sm text-muted-foreground font-medium mb-1">{product.brand}</p>
          )}
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors leading-tight">
            <Link to={`/product/${product.slug}`}>
              {product.name}
            </Link>
          </h3>
          {product.short_description && (
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {product.short_description}
            </p>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating!)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold">{product.rating}</span>
            {product.review_count && (
              <span className="text-sm text-muted-foreground">({product.review_count} avis)</span>
            )}
          </div>
        )}

        {/* Features Preview */}
        {product.features && product.features.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-semibold text-foreground mb-2">Points forts :</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              {product.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2" />
                  <span>{feature}</span>
                </li>
              ))}
              {product.features.length > 3 && (
                <li className="text-sm text-muted-foreground/70 pl-4">
                  +{product.features.length - 3} autres caractéristiques
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          {product.price && (
            <span className="text-2xl font-bold text-primary">{product.price}€</span>
          )}
          {product.original_price && product.original_price > (product.price || 0) && (
            <span className="text-sm text-muted-foreground line-through">
              {product.original_price}€
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button asChild variant="outline" className="flex-1">
            <Link to={`/product/${product.slug}`}>
              Voir détails
            </Link>
          </Button>
          {showBuyButton && (
            <Button asChild className="flex-1">
              <a 
                href={product.affiliate_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                Acheter
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};