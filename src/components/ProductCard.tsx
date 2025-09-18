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
      className="glass-card p-4 sm:p-6 card-hover cursor-pointer group relative overflow-hidden"
      onClick={onClick}
    >
      {/* Badges */}
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex flex-col gap-1 sm:gap-2">
        {isRecommended && (
          <Badge className="bg-secondary text-secondary-foreground text-xs px-2 py-1">
            <Award className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Recommandé</span>
            <span className="sm:hidden">★</span>
          </Badge>
        )}
        {isBestSeller && (
          <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
            <TrendingUp className="w-3 h-3 mr-1" />
            <span className="hidden sm:inline">Best Seller</span>
            <span className="sm:hidden">#1</span>
          </Badge>
        )}
      </div>

      {/* Image */}
      <div className="relative mb-3 sm:mb-4 rounded-xl overflow-hidden bg-gradient-to-br from-muted to-muted/50">
        <img
          src={image}
          alt={name}
          className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 smooth-transition"
        />
      </div>

      {/* Content */}
      <div className="space-y-2 sm:space-y-3">
        {/* Category */}
        <Badge variant="outline" className="text-xs">
          {category}
        </Badge>

        {/* Brand & Name */}
        <div>
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">{brand}</p>
          <h3 className="font-bold text-base sm:text-lg text-foreground group-hover:text-primary smooth-transition leading-tight">
            {name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 sm:w-4 sm:h-4 ${
                  i < Math.floor(rating)
                    ? "text-warning fill-warning"
                    : i < rating
                    ? "text-warning fill-warning/50"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm font-semibold">{rating}</span>
          <span className="text-xs sm:text-sm text-muted-foreground">({reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-bold text-primary">{price}</span>
          {originalPrice && (
            <span className="text-xs sm:text-sm text-muted-foreground line-through">
              {originalPrice}
            </span>
          )}
        </div>

        {/* Pros Preview */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-secondary">Points forts :</p>
          <ul className="text-xs text-muted-foreground space-y-0.5">
            {pros.slice(0, 2).map((pro, index) => (
              <li key={index} className="flex items-start gap-1 leading-tight">
                <div className="w-1 h-1 bg-secondary rounded-full flex-shrink-0 mt-1.5" />
                <span className="break-words">{pro}</span>
              </li>
            ))}
            {pros.length > 2 && (
              <li className="text-xs text-muted-foreground/70 pl-2">
                +{pros.length - 2} autres avantages
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none" />
    </div>
  );
};