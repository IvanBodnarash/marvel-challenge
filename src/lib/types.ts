export interface CharImages {
  xs: string;
  sm: string;
  md: string;
  lg: string;
}

export interface CharBiography {
  fullName: string;
  alterEgos: string;
  aliases: string[];
  placeOfBirth: string;
  firstAppearance: string;
  publisher: string;
  alignment: string;
}

export interface Char {
  id: number;
  name: string;
  slug: string;
  powerstats: Record<string, number>;
  appearance: Record<string, any>;
  biography: CharBiography;
  work: Record<string, string>;
  connections: Record<string, string>;
  images: CharImages;
}
