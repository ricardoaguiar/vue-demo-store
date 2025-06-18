// Product-related interfaces
export interface Product {
  id: number
  img?: string
  name?: string
  title?: string
  price: number
  color?: string
  categoryName?: string
  description?: string
  sale?: boolean
  reviews?: number
  stars?: string
  dateAdded?: number
  quantity: number
}

export interface CartItems {
  img?: string
  quantity: number
  color?: string
  description?: string
  stars?: string
  title?: string
  categoryName?: string
  dateAdded?: number
  sale?: boolean
  reviews?: number
  price: number
  name?: string
  id: number
}

// Navigation-related interfaces
export interface NavLink {
  name?: string
  url: string
}

export interface NavIcons {
  search?: string
  account?: string
  cart?: string
}

export interface Nav {
  mobileBurgerMenu?: string
  links: NavLink[]
  icons: NavIcons
}

// Navigation API Response
export interface NavigationResponse {
  nav: {
    links: NavLink[]
  }
}

// FooterComponent-related interfaces
export interface Footer {
  sections: FooterSection[]
  contactInfo: ContactInfo
  social: SocialLink[]
  copyright?: string
}

export interface FooterSection {
  title?: string
  links: FooterLink[]
}

export interface FooterLink {
  text?: string
  url: string
}

export interface ContactInfo {
  address?: string
  email?: string
  phone?: string
}

export interface SocialLink {
  platform?: string
  icon?: string
  url?: string
}

// FooterComponent API Response
export interface FooterResponse {
  footer: FooterSection[]
  contactInfo: ContactInfo
  social: SocialLink[]
  copyright: string
}

// About Us-related interfaces
export interface AboutUsItem {
  title?: string
  text?: string
  image?: string
  reverse?: boolean
}

export interface AboutUs {
  aboutUsData: AboutUsItem[]
}

export interface FilterOption {
  name: string
  value: string
}

export interface Filters {
  filters: {
    categories: {
      types: FilterOption[]
      colors: FilterOption[]
    }
    sorting: {
      options: FilterOption[]
    }
  }
}

// State interface
export interface State {
  productInfo: Product | null
  cartItems: CartItems[]
  products: Product[]
  loading: boolean
  error: string | null
  purchasedItems: Product[]
  selectedCategory: string | null
  selectedColor: string | null
  selectedSorting: string | null
  categories: {
    types?: Array<{ name: string; value: string }>
    colors?: Array<{ name: string; value: string }>
  }
  sortingOptions: Array<{ name: string; value: string }>
  isFilterSet: boolean
  isCartOpen: boolean
  navLinks: NavLink[]
  isMobileMenuOpen: boolean
  footerData?: Footer | null
  aboutUs?: AboutUs | null
}
