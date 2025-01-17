export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          icon: string
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          icon: string
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          icon?: string
          created_at?: string
        }
      }
      product_details: {
        Row: {
          id: string
          product_id: string
          technical_specs: Json
          available_sizes: string[]
          certifications: string[]
          delivery_info: Json
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          technical_specs?: Json
          available_sizes?: string[]
          certifications?: string[]
          delivery_info?: Json
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          technical_specs?: Json
          available_sizes?: string[]
          certifications?: string[]
          delivery_info?: Json
          created_at?: string
        }
      }
      product_images: {
        Row: {
          id: string
          product_id: string
          image_url: string
          alt_text: string
          display_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          image_url: string
          alt_text: string
          display_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          image_url?: string
          alt_text?: string
          display_order?: number
          created_at?: string
        }
      }
      sub_products: {
        Row: {
          id: string
          product_id: string
          name: string
          brand: string
          description: string
          image_url: string
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          name: string
          brand: string
          description: string
          image_url: string
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          name?: string
          brand?: string
          description?: string
          image_url?: string
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          role: string
          company: string
          image_url: string
          quote: string
          rating: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          company: string
          image_url: string
          quote: string
          rating: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          company?: string
          image_url?: string
          quote?: string
          rating?: number
          created_at?: string
        }
      }
      whatsapp_clicks: {
        Row: {
          id: string
          device_type: string
          location: { latitude: number; longitude: number } | null
          user_agent: string | null
          created_at: string
        }
        Insert: {
          id?: string
          device_type: string
          location?: { latitude: number; longitude: number } | null
          user_agent?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          device_type?: string
          location?: { latitude: number; longitude: number } | null
          user_agent?: string | null
          created_at?: string
        }
      }
    }
  }
}