export interface RootObject {
  data: Datum[];
  links: Link[];
  metadata: Metadata;
}

export interface Datum {
  code: string;
  currencyCodes: string[];
  name: string;
  wikiDataId: string;
}

export interface Link {
  href: string;
  rel: string;
}

export interface Metadata {
  currentOffset: number;
  totalCount: number;
}
