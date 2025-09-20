import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  Eye, 
  Package, 
  FileText, 
  FolderOpen,
  BarChart
} from "lucide-react";
import { useProducts, useCreateProduct, useUpdateProduct, useDeleteProduct } from "@/hooks/useProducts";
import { useCategories, useCreateCategory } from "@/hooks/useCategories";
import { useBlogPosts, useCreateBlogPost } from "@/hooks/useBlog";
import { useToast } from "@/hooks/use-toast";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const { toast } = useToast();

  const { data: products } = useProducts();
  const { data: categories } = useCategories();
  const { data: blogPosts } = useBlogPosts();
  
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const createCategory = useCreateCategory();
  const createBlogPost = useCreateBlogPost();

  const [productForm, setProductForm] = useState({
    name: "",
    slug: "",
    description: "",
    short_description: "",
    image_url: "",
    price: "",
    original_price: "",
    affiliate_url: "",
    category_id: "",
    brand: "",
    rating: "",
    is_featured: false,
    is_active: true,
    features: [] as string[],
    pros: [] as string[],
    cons: [] as string[],
  });

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    meta_title: "",
    meta_description: "",
  });

  const [blogForm, setBlogForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category_id: "",
    meta_title: "",
    meta_description: "",
    is_published: false,
  });

  const handleSaveProduct = async () => {
    try {
      const productData = {
        ...productForm,
        price: productForm.price ? parseFloat(productForm.price) : null,
        original_price: productForm.original_price ? parseFloat(productForm.original_price) : null,
        rating: productForm.rating ? parseFloat(productForm.rating) : null,
        features: productForm.features,
        pros: productForm.pros,
        cons: productForm.cons,
        meta_title: productForm.name, // Default meta_title
        meta_description: productForm.short_description || productForm.name, // Default meta_description
        affiliate_commission: null,
        review_count: 0,
        specifications: {},
      };

      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct.id, ...productData });
        toast({ title: "Produit modifié avec succès" });
      } else {
        await createProduct.mutateAsync(productData);
        toast({ title: "Produit créé avec succès" });
      }

      setShowProductForm(false);
      setEditingProduct(null);
      setProductForm({
        name: "",
        slug: "",
        description: "",
        short_description: "",
        image_url: "",
        price: "",
        original_price: "",
        affiliate_url: "",
        category_id: "",
        brand: "",
        rating: "",
        is_featured: false,
        is_active: true,
        features: [],
        pros: [],
        cons: [],
      });
    } catch (error) {
      toast({ title: "Erreur lors de la sauvegarde", variant: "destructive" });
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name || "",
      slug: product.slug || "",
      description: product.description || "",
      short_description: product.short_description || "",
      image_url: product.image_url || "",
      price: product.price?.toString() || "",
      original_price: product.original_price?.toString() || "",
      affiliate_url: product.affiliate_url || "",
      category_id: product.category_id || "",
      brand: product.brand || "",
      rating: product.rating?.toString() || "",
      is_featured: product.is_featured || false,
      is_active: product.is_active !== false,
      features: product.features || [],
      pros: product.pros || [],
      cons: product.cons || [],
    });
    setShowProductForm(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      try {
        await deleteProduct.mutateAsync(id);
        toast({ title: "Produit supprimé avec succès" });
      } catch (error) {
        toast({ title: "Erreur lors de la suppression", variant: "destructive" });
      }
    }
  };

  const handleSaveCategory = async () => {
    try {
      await createCategory.mutateAsync({
        ...categoryForm,
        image_url: null,
        is_active: true,
      });
      toast({ title: "Catégorie créée avec succès" });
      setCategoryForm({
        name: "",
        slug: "",
        description: "",
        meta_title: "",
        meta_description: "",
      });
    } catch (error) {
      toast({ title: "Erreur lors de la création", variant: "destructive" });
    }
  };

  const handleSaveBlogPost = async () => {
    try {
      await createBlogPost.mutateAsync({
        ...blogForm,
        published_at: blogForm.is_published ? new Date().toISOString() : null,
        author_name: "Admin",
        featured_image_url: null,
        tags: [],
      });
      toast({ title: "Article créé avec succès" });
      setBlogForm({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category_id: "",
        meta_title: "",
        meta_description: "",
        is_published: false,
      });
    } catch (error) {
      toast({ title: "Erreur lors de la création", variant: "destructive" });
    }
  };

  return (
    <>
      <SEOHead
        title="Administration - Gestion des Produits et Contenu"
        description="Interface d'administration pour gérer les produits, articles de blog et catégories."
      />
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Administration</h1>
            <p className="text-muted-foreground">Gérez vos produits, articles et catégories</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Produits
              </TabsTrigger>
              <TabsTrigger value="blog" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Blog
              </TabsTrigger>
              <TabsTrigger value="categories" className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4" />
                Catégories
              </TabsTrigger>
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart className="w-4 h-4" />
                Statistiques
              </TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Gestion des Produits</h2>
                <Button onClick={() => setShowProductForm(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Produit
                </Button>
              </div>

              {showProductForm && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {editingProduct ? "Modifier le produit" : "Nouveau produit"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nom du produit</Label>
                        <Input
                          id="name"
                          value={productForm.name}
                          onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          value={productForm.slug}
                          onChange={(e) => setProductForm({...productForm, slug: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="brand">Marque</Label>
                        <Input
                          id="brand"
                          value={productForm.brand}
                          onChange={(e) => setProductForm({...productForm, brand: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">Catégorie</Label>
                        <Select
                          value={productForm.category_id}
                          onValueChange={(value) => setProductForm({...productForm, category_id: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une catégorie" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories?.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="price">Prix</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={productForm.price}
                          onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="original_price">Prix original</Label>
                        <Input
                          id="original_price"
                          type="number"
                          step="0.01"
                          value={productForm.original_price}
                          onChange={(e) => setProductForm({...productForm, original_price: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="short_description">Description courte</Label>
                      <Input
                        id="short_description"
                        value={productForm.short_description}
                        onChange={(e) => setProductForm({...productForm, short_description: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={productForm.description}
                        onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label htmlFor="affiliate_url">Lien d'affiliation</Label>
                      <Input
                        id="affiliate_url"
                        value={productForm.affiliate_url}
                        onChange={(e) => setProductForm({...productForm, affiliate_url: e.target.value})}
                      />
                    </div>

                    <div>
                      <Label htmlFor="image_url">URL de l'image</Label>
                      <Input
                        id="image_url"
                        value={productForm.image_url}
                        onChange={(e) => setProductForm({...productForm, image_url: e.target.value})}
                      />
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_featured"
                          checked={productForm.is_featured}
                          onCheckedChange={(checked) => setProductForm({...productForm, is_featured: checked})}
                        />
                        <Label htmlFor="is_featured">Produit mis en avant</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="is_active"
                          checked={productForm.is_active}
                          onCheckedChange={(checked) => setProductForm({...productForm, is_active: checked})}
                        />
                        <Label htmlFor="is_active">Actif</Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button variant="outline" onClick={() => setShowProductForm(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleSaveProduct}>
                        <Save className="w-4 h-4 mr-2" />
                        Sauvegarder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid gap-4">
                {products?.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            {product.is_featured && <Badge variant="secondary">Mis en avant</Badge>}
                            {!product.is_active && <Badge variant="destructive">Inactif</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {product.brand} • {product.category?.name}
                          </p>
                          <p className="text-sm">{product.short_description}</p>
                          {product.price && (
                            <p className="text-lg font-bold text-primary mt-2">
                              {product.price}€
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Blog Tab */}
            <TabsContent value="blog" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Gestion du Blog</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Nouvel Article</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="blog-title">Titre</Label>
                      <Input
                        id="blog-title"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="blog-slug">Slug</Label>
                      <Input
                        id="blog-slug"
                        value={blogForm.slug}
                        onChange={(e) => setBlogForm({...blogForm, slug: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="blog-excerpt">Extrait</Label>
                    <Textarea
                      id="blog-excerpt"
                      value={blogForm.excerpt}
                      onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor="blog-content">Contenu</Label>
                    <Textarea
                      id="blog-content"
                      value={blogForm.content}
                      onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
                      rows={8}
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="blog-published"
                      checked={blogForm.is_published}
                      onCheckedChange={(checked) => setBlogForm({...blogForm, is_published: checked})}
                    />
                    <Label htmlFor="blog-published">Publier l'article</Label>
                  </div>

                  <Button onClick={handleSaveBlogPost}>
                    <Save className="w-4 h-4 mr-2" />
                    Créer l'article
                  </Button>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {blogPosts?.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {post.is_published ? (
                              <Badge variant="default">Publié</Badge>
                            ) : (
                              <Badge variant="secondary">Brouillon</Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Categories Tab */}
            <TabsContent value="categories" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Gestion des Catégories</h2>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Nouvelle Catégorie</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="cat-name">Nom</Label>
                      <Input
                        id="cat-name"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cat-slug">Slug</Label>
                      <Input
                        id="cat-slug"
                        value={categoryForm.slug}
                        onChange={(e) => setCategoryForm({...categoryForm, slug: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cat-description">Description</Label>
                    <Textarea
                      id="cat-description"
                      value={categoryForm.description}
                      onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <Button onClick={handleSaveCategory}>
                    <Save className="w-4 h-4 mr-2" />
                    Créer la catégorie
                  </Button>
                </CardContent>
              </Card>

              <div className="grid gap-4">
                {categories?.map((category) => (
                  <Card key={category.id}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Stats Tab */}
            <TabsContent value="stats" className="space-y-6">
              <h2 className="text-2xl font-semibold">Statistiques</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Produits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{products?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Total des produits</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="w-5 h-5" />
                      Articles
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{blogPosts?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Articles de blog</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FolderOpen className="w-5 h-5" />
                      Catégories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">{categories?.length || 0}</div>
                    <p className="text-sm text-muted-foreground">Catégories actives</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Admin;