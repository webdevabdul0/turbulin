export interface InsightCard {
  id: string;
  category: 'NEWSROOM' | 'CASE STUDY' | 'BLOG' | 'EBOOK';
  title: string;
  imageBg: string;
  graphicType: 'inner-circle' | 'prism' | 'infinity' | 'lotus' | 'purple-grid' | 'network-nodes' | 'cyan-waves' | '3d-terrain';
  link: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  link: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface PartnerAlliance {
  name: string;
  logoText?: string;
  svgType: string;
}

export interface AwardItem {
  id: string;
  title: string;
  awarder: string;
  badgeText?: string;
  year?: string;
  logo: string;
}
