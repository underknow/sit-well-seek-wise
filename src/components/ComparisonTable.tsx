import { Check, X, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Product {
  id: string;
  name: string;
  brand: string;
  image: string;
  price: string;
  rating: number;
  features: {
    [key: string]: boolean | string | number;
  };
}

interface ComparisonTableProps {
  products: Product[];
  onRemoveProduct?: (productId: string) => void;
  className?: string;
}

const featureLabels = {
  adjustableHeight: "Hauteur réglable",
  lumbarSupport: "Support lombaire",
  armrests: "Accoudoirs",
  warranty: "Garantie (années)",
  maxWeight: "Poids max (kg)",
  material: "Matériau",
  assembly: "Montage requis",
};

export const ComparisonTable = ({ products, onRemoveProduct, className = "" }: ComparisonTableProps) => {
  const renderFeatureValue = (value: boolean | string | number) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="w-5 h-5 text-success mx-auto" />
      ) : (
        <X className="w-5 h-5 text-destructive mx-auto" />
      );
    }
    return <span className="text-sm font-medium">{value}</span>;
  };

  return (
    <div className={`glass-card overflow-hidden ${className}`}>
      <div className="p-6 border-b border-border">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Comparaison Produits
        </h2>
        <p className="text-muted-foreground">
          Comparez les caractéristiques de vos produits sélectionnés
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Product Headers */}
          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 font-semibold text-foreground min-w-48">
                Caractéristiques
              </th>
              {products.map((product) => (
                <th key={product.id} className="p-4 min-w-64">
                  <div className="text-center space-y-3">
                    {/* Product Image */}
                    <div className="w-20 h-20 mx-auto rounded-xl overflow-hidden bg-muted">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Product Info */}
                    <div>
                      <p className="text-xs text-muted-foreground">{product.brand}</p>
                      <h3 className="font-semibold text-sm text-foreground">
                        {product.name}
                      </h3>
                    </div>

                    {/* Rating & Price */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-warning fill-warning" />
                        <span className="text-sm font-semibold">{product.rating}</span>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {product.price}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onRemoveProduct?.(product.id)}
                      className="text-xs text-muted-foreground hover:text-destructive"
                    >
                      Retirer
                    </Button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Feature Comparison */}
          <tbody>
            {Object.entries(featureLabels).map(([key, label]) => (
              <tr key={key} className="border-b border-border hover:bg-muted/30 smooth-transition">
                <td className="p-4 font-medium text-foreground">
                  {label}
                </td>
                {products.map((product) => (
                  <td key={product.id} className="p-4 text-center">
                    {renderFeatureValue(product.features[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Action Buttons */}
      <div className="p-6 border-t border-border bg-muted/20">
        <div className="flex flex-wrap gap-4 justify-center">
          <Button className="btn-gradient">
            Voir les détails complets
          </Button>
          <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
            Exporter la comparaison
          </Button>
        </div>
      </div>
    </div>
  );
};