import { useState } from "react";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  onFilterToggle?: () => void;
  placeholder?: string;
  className?: string;
}

export const SearchBar = ({ 
  onSearch, 
  onFilterToggle, 
  placeholder = "Rechercher chaises, bureaux, accessoires...",
  className = ""
}: SearchBarProps) => {
  const [query, setQuery] = useState("");
  const [activeFilters] = useState(["Chaises ergonomiques", "< 500€"]);

  const handleSearch = (value: string) => {
    setQuery(value);
    onSearch?.(value);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Search Input */}
      <div className="relative">
        <div className="glass-card flex items-center p-3 gap-3">
          <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          <Input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            className="border-0 bg-transparent text-base placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            variant="ghost"
            size="sm"
            onClick={onFilterToggle}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filtres
          </Button>
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Filtres actifs:</span>
          {activeFilters.map((filter, index) => (
            <Badge 
              key={index} 
              variant="secondary" 
              className="bg-primary/10 text-primary hover:bg-primary/20 cursor-pointer"
            >
              {filter}
              <button className="ml-1 hover:text-primary-foreground">×</button>
            </Badge>
          ))}
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            Effacer tout
          </Button>
        </div>
      )}
    </div>
  );
};