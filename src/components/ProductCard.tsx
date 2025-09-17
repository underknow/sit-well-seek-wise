import { Star, TrendingUp, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  id: string;
  name: string;
  brand: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: string;
  originalPrice?: string;
  category: string;
  isRecommended?: boolean;
  isBestSeller?: boolean;
  pros: string[];
  onClick?: () => void;
}

export const ProductCard = ({
  name,
  brand,
  image,
  rating,
  reviewCount,
  price,
  originalPrice,
  category,
  isRecommended,
  isBestSeller,
  pros,
  onClick,
}: ProductCardProps) => {
  return (
    <div 
      className="glass-card p-6 card-hover cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      {/* Badges */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        {isRecommended && (
          <Badge className="bg-secondary text-secondary-foreground">
            <Award className="w-3 h-3 mr-1" />
            Recommandé
          </Badge>
        )}
        {isBestSeller && (
          <Badge className="bg-primary text-primary-foreground">
            <TrendingUp className="w-3 h-3 mr-1" />
            Best Seller
          </Badge>
        )}
      </div>

      {/* Image */}
      <div className="relative mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover group-hover:scale-110 smooth-transition"
        />
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Category */}
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>

        {/* Brand & Name */}
        <div>
          <p className="text-sm text-muted-foreground font-medium">{brand}</p>
          <h3 className="font-bold text-lg text-foreground group-hover:text-primary smooth-transition">
            {name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-warning fill-warning"
                    : i < rating
                    ? "text-warning fill-warning/50"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-sm font-semibold">{rating}</span>
          <span className="text-sm text-muted-foreground">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-primary">{price}</span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Pros Preview */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-secondary">Points forts :</p>
          <ul className="text-xs text-muted-foreground space-y-0.5">
            {pros.slice(0, 3).map((pro, index) => (
              <li key={index} className="flex items-center gap-1">
                <div className="w-1 h-1 bg-secondary rounded-full flex-shrink-0" />
                {pro}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none" />
    </div>
  );
};