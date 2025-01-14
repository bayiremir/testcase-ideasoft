export type Products = Products2[];

export interface Products2 {
  details: any;
  id: number;
  name: string;
  fullName: string;
  slug?: string;
  sku: string;
  barcode?: string;
  stockAmount: number;
  price1: number;
  currency: Currency;
  discount: number;
  discountType: number;
  moneyOrderDiscount: number;
  buyingPrice: number;
  marketPriceDetail?: string;
  taxIncluded: number;
  tax: number;
  warranty: number;
  volumetricWeight: number;
  stockTypeLabel: string;
  customShippingDisabled: number;
  customShippingCost: number;
  distributor?: string;
  hasGift: number;
  gift?: string;
  status: number;
  hasOption: number;
  installmentThreshold: string;
  homeSortOrder?: number;
  popularSortOrder?: number;
  brandSortOrder: any;
  featuredSortOrder?: number;
  campaignedSortOrder?: number;
  newSortOrder?: number;
  discountedSortOrder?: number;
  categoryShowcaseStatus: number;
  midblockSortOrder: any;
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
  canonicalUrl: any;
  parent: any;
  brand: any;
  detail?: Detail;
  categories: Category[];
  prices: any[];
  images: any[];
  optionGroups: any[];
  updatedAt: string;
  createdAt: string;
}

export interface Currency {
  id: number;
  label: string;
  abbr: string;
}

export interface Detail {
  id: number;
  details: string;
  extraDetails: any;
}

export interface Category {
  id: number;
  name: string;
  sortOrder: number;
  showcaseSortOrder: any;
  pageTitle: any;
  metaDescription: any;
  metaKeywords: string;
  canonicalUrl: any;
  tree: string;
  imageUrl: any;
}
