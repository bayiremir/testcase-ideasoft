export type CategoriesList = Categories[];

export interface Categories {
  id: number;
  name: string;
  slug: string;
  sortOrder: number;
  status: number;
  distributor: any;
  distributorCode: string;
  percent: number;
  imageFile: any;
  displayShowcaseContent: number;
  showcaseContent?: string;
  showcaseContentDisplayType: number;
  displayShowcaseFooterContent: number;
  showcaseFooterContent?: string;
  showcaseFooterContentDisplayType: number;
  hasChildren: number;
  pageTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  canonicalUrl?: string;
  parent: any;
  children: any[];
  imageUrl: any;
  isCombine: number;
  isSearchable: number;
  seoSetting: any;
  createdAt: string;
}
