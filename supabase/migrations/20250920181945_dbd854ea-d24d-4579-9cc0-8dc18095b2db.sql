-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  short_description TEXT,
  image_url TEXT,
  price DECIMAL(10,2),
  original_price DECIMAL(10,2),
  affiliate_url TEXT NOT NULL,
  affiliate_commission DECIMAL(5,2),
  category_id UUID REFERENCES public.categories(id),
  brand TEXT,
  rating DECIMAL(2,1) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]'::jsonb,
  pros JSONB DEFAULT '[]'::jsonb,
  cons JSONB DEFAULT '[]'::jsonb,
  specifications JSONB DEFAULT '{}'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE public.blog_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image_url TEXT,
  author_name TEXT DEFAULT 'Admin',
  category_id UUID REFERENCES public.categories(id),
  tags TEXT[] DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product_comparisons table
CREATE TABLE public.product_comparisons (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  category_id UUID REFERENCES public.categories(id),
  product_ids UUID[] NOT NULL,
  comparison_criteria JSONB DEFAULT '[]'::jsonb,
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_comparisons ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (since this is a public affiliate site)
CREATE POLICY "Categories are publicly readable" ON public.categories FOR SELECT USING (is_active = true);
CREATE POLICY "Products are publicly readable" ON public.products FOR SELECT USING (is_active = true);
CREATE POLICY "Published blog posts are publicly readable" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Active comparisons are publicly readable" ON public.product_comparisons FOR SELECT USING (is_active = true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_product_comparisons_updated_at BEFORE UPDATE ON public.product_comparisons FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON public.products(category_id);
CREATE INDEX idx_products_slug ON public.products(slug);
CREATE INDEX idx_products_is_featured ON public.products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_blog_posts_category_id ON public.blog_posts(category_id);
CREATE INDEX idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON public.blog_posts(is_published, published_at) WHERE is_published = true;
CREATE INDEX idx_categories_slug ON public.categories(slug);
CREATE INDEX idx_product_comparisons_slug ON public.product_comparisons(slug);

-- Insert some sample data
INSERT INTO public.categories (name, slug, description, meta_title, meta_description) VALUES
('Bureaux Ergonomiques', 'bureaux-ergonomiques', 'Découvrez les meilleurs bureaux ergonomiques pour votre confort au travail', 'Meilleurs Bureaux Ergonomiques 2024 - Guide Complet', 'Comparatif des bureaux ergonomiques les plus confortables. Tests, avis et recommandations pour choisir le bureau parfait.'),
('Chaises de Bureau', 'chaises-bureau', 'Sélection des meilleures chaises de bureau ergonomiques', 'Top Chaises de Bureau Ergonomiques - Comparatif 2024', 'Guide complet des meilleures chaises de bureau. Comparaisons, tests et avis pour un confort optimal au travail.'),
('Accessoires', 'accessoires', 'Accessoires indispensables pour votre espace de travail', 'Accessoires Bureau Ergonomiques - Les Indispensables', 'Découvrez les accessoires essentiels pour optimiser votre espace de travail et améliorer votre productivité.');

INSERT INTO public.products (name, slug, description, short_description, price, original_price, affiliate_url, category_id, brand, rating, review_count, features, pros, cons) VALUES
('Bureau Debout Électrique Premium', 'bureau-debout-electrique-premium', 'Bureau assis-debout électrique avec réglage en hauteur automatique pour un confort optimal', 'Bureau électrique réglable en hauteur', 599.99, 799.99, 'https://example.com/affiliate/bureau-premium', (SELECT id FROM categories WHERE slug = 'bureaux-ergonomiques'), 'ErgoDesk', 4.8, 124, 
'["Réglage électrique", "Mémoire de positions", "Surface anti-rayures", "Charge max 100kg"]'::jsonb,
'["Très stable", "Réglage silencieux", "Excellent rapport qualité-prix"]'::jsonb,
'["Prix élevé", "Installation complexe"]'::jsonb),

('Chaise Gaming Ergonomique', 'chaise-gaming-ergonomique', 'Chaise gaming avec support lombaire et accoudoirs réglables', 'Chaise gaming confortable', 299.99, 399.99, 'https://example.com/affiliate/chaise-gaming', (SELECT id FROM categories WHERE slug = 'chaises-bureau'), 'GamerPro', 4.6, 89,
'["Support lombaire", "Accoudoirs 4D", "Inclinaison 180°", "Roulettes silencieuses"]'::jsonb,
'["Très confortable", "Design attrayant", "Matériaux de qualité"]'::jsonb,
'["Montage difficile", "Prend de la place"]'::jsonb);

INSERT INTO public.blog_posts (title, slug, excerpt, content, category_id, tags, meta_title, meta_description, is_published, published_at) VALUES
('Comment Choisir le Bureau Parfait en 2024', 'comment-choisir-bureau-parfait-2024', 'Guide complet pour bien choisir son bureau de travail selon ses besoins et son budget.', 
'# Comment Choisir le Bureau Parfait en 2024

Le choix d''un bureau de travail est crucial pour votre productivité et votre santé. Dans ce guide complet, nous vous expliquons tout ce que vous devez savoir.

## Les Critères Essentiels

### 1. La Hauteur
La hauteur idéale dépend de votre taille...

### 2. La Surface de Travail
Une surface suffisante est indispensable...

## Nos Recommandations

Après avoir testé de nombreux modèles, voici nos coups de cœur...', 
(SELECT id FROM categories WHERE slug = 'bureaux-ergonomiques'), 
'{"guide", "bureau", "ergonomie", "travail"}', 
'Comment Choisir le Bureau Parfait - Guide 2024', 
'Guide complet pour choisir le bureau idéal. Critères, conseils d''experts et recommandations pour faire le bon choix.', 
true, now());

INSERT INTO public.product_comparisons (title, slug, description, category_id, product_ids, comparison_criteria) VALUES
('Comparatif Bureaux Debout 2024', 'comparatif-bureaux-debout-2024', 'Comparaison détaillée des meilleurs bureaux debout du marché', 
(SELECT id FROM categories WHERE slug = 'bureaux-ergonomiques'),
ARRAY[(SELECT id FROM products WHERE slug = 'bureau-debout-electrique-premium')],
'[{"name": "Prix", "type": "price"}, {"name": "Hauteur min/max", "type": "text"}, {"name": "Capacité de charge", "type": "text"}, {"name": "Garantie", "type": "text"}, {"name": "Note globale", "type": "rating"}]'::jsonb);