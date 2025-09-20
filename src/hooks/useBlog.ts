import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  featured_image_url: string | null;
  author_name: string | null;
  category_id: string | null;
  tags: string[] | null;
  meta_title: string | null;
  meta_description: string | null;
  is_published: boolean | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  category?: {
    name: string;
    slug: string;
  };
};

export const useBlogPosts = (categorySlug?: string) => {
  return useQuery({
    queryKey: ["blog-posts", categorySlug],
    queryFn: async () => {
      let query = supabase
        .from("blog_posts")
        .select(`
          *,
          category:categories(name, slug)
        `)
        .eq("is_published", true);

      if (categorySlug) {
        query = query.eq("category.slug", categorySlug);
      }

      const { data, error } = await query.order("published_at", { ascending: false });
      
      if (error) throw error;
      return data as BlogPost[];
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog-post", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select(`
          *,
          category:categories(name, slug)
        `)
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      
      if (error) throw error;
      return data as BlogPost | null;
    },
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (post: Omit<BlogPost, 'id' | 'created_at' | 'updated_at' | 'category'>) => {
      const { data, error } = await supabase
        .from("blog_posts")
        .insert(post)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog-posts"] });
    },
  });
};