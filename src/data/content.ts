export type SiteImageKey =
  | "homeHero"
  | "brandStoryMuse"
  | "brandStoryNoir"
  | "shopHero"
  | "worldsHero"
  | "clubHero"
  | "conciergeHero"
  | "afterDarkHero"
  | "afterDarkTeaserOne"
  | "afterDarkTeaserTwo"
  | "afterDarkTeaserThree"
  | "packaging"
  | "productDetailSecond";

export type SiteContent = {
  brandLogo: {
    text: string;
    imageUrl: string;
    useImageLogo: boolean;
  };
  siteImages: Record<SiteImageKey, string>;
  worldCovers: Record<string, string>;
  productImages: Record<string, string>;
  storeSettings: {
    whatsappNumber: string;
    conciergeMessage: string;
    checkoutMessage: string;
  };
};

export const SITE_CONTENT_DEFAULTS: SiteContent = {
  brandLogo: {
    text: "TOPSIX",
    imageUrl: "",
    useImageLogo: false,
  },
  siteImages: {
    homeHero: "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=2000&auto=format&fit=crop",
    brandStoryMuse: "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1200&auto=format&fit=crop",
    brandStoryNoir: "https://images.unsplash.com/photo-1605022600390-071c6f969d32?q=80&w=1200&auto=format&fit=crop",
    shopHero: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2200&auto=format&fit=crop",
    worldsHero: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2200&auto=format&fit=crop",
    clubHero: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2200&auto=format&fit=crop",
    conciergeHero: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=2000&auto=format&fit=crop",
    afterDarkHero: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=2400&auto=format&fit=crop",
    afterDarkTeaserOne: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1600&auto=format&fit=crop",
    afterDarkTeaserTwo: "https://images.unsplash.com/photo-1496440737103-cd596325d314?q=80&w=1200&auto=format&fit=crop",
    afterDarkTeaserThree: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1500&auto=format&fit=crop",
    packaging: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=1400&auto=format&fit=crop",
    productDetailSecond: "https://images.unsplash.com/photo-1590736969955-71cc94901144?q=80&w=1400&auto=format&fit=crop",
  },
  worldCovers: {
    "01": "https://images.unsplash.com/photo-1618331835717-801e976710b2?q=80&w=1000&auto=format&fit=crop",
    "02": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop",
    "03": "https://images.unsplash.com/photo-1521577352947-9bb58764b69a?q=80&w=1000&auto=format&fit=crop",
    "04": "https://images.unsplash.com/photo-1605022600390-071c6f969d32?q=80&w=1000&auto=format&fit=crop",
    "05": "https://images.unsplash.com/photo-1518621736915-f3b8c41bfd00?q=80&w=1000&auto=format&fit=crop",
    "06": "https://images.unsplash.com/photo-1508606572321-901ea443707f?q=80&w=1000&auto=format&fit=crop",
  },
  productImages: {
    "noir-lace-bodysuit": "https://images.unsplash.com/photo-1616091216791-a5360b5fc78a?q=80&w=1200&auto=format&fit=crop",
    "siren-satin-balconette": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
    "muse-soft-cup-set": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1200&auto=format&fit=crop",
    "muse-morning-slip": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
    "tease-cutout-body": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?q=80&w=1200&auto=format&fit=crop",
    "romance-wrap-robe": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
    "siren-lace-corset-set": "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?q=80&w=1200&auto=format&fit=crop",
    "romance-pearl-bralette": "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1200&auto=format&fit=crop",
    "the-x-sculpted-garter": "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop",
    "noir-longline-robe": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    "the-x-after-hours-pyjama": "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop",
    "romance-bias-cut-body": "https://images.unsplash.com/photo-1506629905607-d9b1e2c5d57c?q=80&w=1200&auto=format&fit=crop",
    "muse-silk-eye-mask": "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop",
    "tease-ribbon-brief": "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?q=80&w=1200&auto=format&fit=crop",
    "noir-bridal-set": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1200&auto=format&fit=crop",
    "siren-satin-cami": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop",
  },
  storeSettings: {
    whatsappNumber: "201000000000",
    conciergeMessage: "Hello TOPSIX Concierge, I need assistance finding my mood.",
    checkoutMessage: "Hello TOPSIX, I would like to secure these private pieces:",
  },
};