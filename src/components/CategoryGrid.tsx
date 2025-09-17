import { ChevronRight } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  icon: React.ReactNode;
}

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick?: (categoryId: string) => void;
  className?: string;
}

export const CategoryGrid = ({ categories, onCategoryClick, className = "" }: CategoryGridProps) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {categories.map((category) => (
        <div
          key={category.id}
          className="glass-card p-6 card-hover cursor-pointer group relative overflow-hidden"
          onClick={() => onCategoryClick?.(category.id)}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 opacity-10 group-hover:opacity-20 smooth-transition">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="relative z-10">
            {/* Icon */}
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/20 smooth-transition">
              <div className="text-primary">
                {category.icon}
              </div>
            </div>

            {/* Title & Description */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary smooth-transition">
                {category.name}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {category.description}
              </p>
            </div>

            {/* Product Count */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-secondary font-semibold">
                {category.productCount} produits
              </span>
              <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 smooth-transition" />
            </div>
          </div>

          {/* Hover Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 smooth-transition pointer-events-none" />
        </div>
      ))}
    </div>
  );
};