import { useState } from "react";
import { X, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface FilterDrawerProps {
  isOpen?: boolean;
  onClose?: () => void;
  trigger?: React.ReactNode;
}

export const FilterDrawer = ({ isOpen, onClose, trigger }: FilterDrawerProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  const brands = ["ErgoTech", "ComfortCorp", "FlexiWork", "ComfortZone", "PremiumSeating"];
  const features = [
    "Support lombaire",
    "Accoudoirs réglables", 
    "Mesh respirant",
    "Garantie étendue",
    "Réglage électrique",
    "Mémoire de position"
  ];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handleFeatureToggle = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSelectedFeatures([]);
    setMinRating(0);
  };

  const activeFiltersCount = selectedBrands.length + selectedFeatures.length + (minRating > 0 ? 1 : 0) + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  const FilterContent = () => (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          <h2 className="text-xl font-bold">Filtres</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearAllFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          Tout effacer
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Budget</h3>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={1000}
            min={0}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <Badge variant="outline">{priceRange[0]}€</Badge>
            <Badge variant="outline">{priceRange[1]}€</Badge>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Note minimum</h3>
        <div className="space-y-3">
          {[4, 3, 2, 1].map(rating => (
            <div key={rating} className="flex items-center space-x-3">
              <Checkbox 
                id={`rating-${rating}`}
                checked={minRating === rating}
                onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
              />
              <label 
                htmlFor={`rating-${rating}`} 
                className="flex items-center gap-2 text-sm cursor-pointer flex-1"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${
                        i < rating ? 'text-warning fill-warning' : 'text-muted-foreground'
                      }`} 
                    />
                  ))}
                </div>
                <span>et plus</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Brands */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Marques</h3>
        <div className="space-y-3">
          {brands.map(brand => (
            <div key={brand} className="flex items-center space-x-3">
              <Checkbox 
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => handleBrandToggle(brand)}
              />
              <label 
                htmlFor={`brand-${brand}`} 
                className="text-sm cursor-pointer flex-1 font-medium"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Fonctionnalités</h3>
        <div className="space-y-3">
          {features.map(feature => (
            <div key={feature} className="flex items-center space-x-3">
              <Checkbox 
                id={`feature-${feature}`}
                checked={selectedFeatures.includes(feature)}
                onCheckedChange={() => handleFeatureToggle(feature)}
              />
              <label 
                htmlFor={`feature-${feature}`} 
                className="text-sm cursor-pointer flex-1"
              >
                {feature}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Apply Button */}
      <div className="pt-4 border-t border-border space-y-3">
        <Button className="w-full btn-gradient">
          Appliquer les filtres ({activeFiltersCount})
        </Button>
        {activeFiltersCount > 0 && (
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={clearAllFilters}
          >
            Effacer tous les filtres
          </Button>
        )}
      </div>
    </div>
  );

  if (trigger) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          {trigger}
        </SheetTrigger>
        <SheetContent side="left" className="w-full sm:max-w-md p-0">
          <FilterContent />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="glass-card">
      <FilterContent />
    </div>
  );
};