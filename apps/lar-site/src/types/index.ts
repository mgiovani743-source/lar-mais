// ============================================================
// Types — Lar+ Design System
// ============================================================

export interface Property {
  id: string
  name: string
  neighborhood: string
  city: string
  price: number
  bedrooms: number
  area: number
  bathrooms: number
  parking: number
  imageUrl: string
  badge?: string
  badgeColor?: 'primary' | 'accent' | 'secondary'
  isNew?: boolean
}

export interface Testimonial {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatarUrl: string
  neighborhood: string
}

export interface FAQItem {
  id: string
  question: string
  answer: string
}

export interface Benefit {
  id: string
  icon: string
  title: string
  description: string
}

export interface Step {
  id: string
  number: number
  title: string
  description: string
  icon: string
}

export interface Stat {
  id: string
  value: string
  label: string
  suffix?: string
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl'
