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
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          company: string
          image_url: string
          quote: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          company?: string
          image_url?: string
          quote?: string
          created_at?: string
        }
      }
    }
  }
}