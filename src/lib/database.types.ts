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