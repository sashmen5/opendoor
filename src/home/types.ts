export interface Location {
  coordinates: number[];
}

export interface AddressObject {
  location: Location;
  streetNumber: string;
  route: string;
  locality: string;
  county: string;
  stateCode: string;
  formattedAddress: string;
  sublocality: string;
}

export interface Address {
  location: number[];
  googlePlaceId: string;
  kind: string;
  streetNumber: string;
  route: string;
  zipcode: string;
  locality: string;
  county: string;
  state: string;
  stateCode: string;
  formattedAddress: string;
  neighborhood: string;
  sublocality: string;
}

export interface Unit {
  _id: string;
  bedroom: number;
  bathroom: number;
  squareFootage: number;
}

export interface Home {
  addressObject: AddressObject;
  address: Address;
  purchasePrice: number;
  rehabPrice: number;
  images: string[];
  dealType: string;
  squareFootage: number;
  expectedRent: number;
  yearBuilt?: number;
  lotSize: number;
  pageviews: number;
  impressions: number;
  status: 'pending' | 'active' | 'sold';
  skipVerification: boolean;
  interiorFeatures: string[];
  exteriorFeatures: string[];
  _id: string;
  user: string;
  name: string;
  units: Unit[];
  comps: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  friendlyUrl: string;
  slackThreadId: string;
  acAge: string;
  description: string;
  emd?: any;
  hoa: string;
  hubspotDealId: string;
  hubspotDealOwnerId: string;
  lastPublishedAt: Date;
  lastPublishedBy: string;
  plumbing: string;
  pricingStrategy: string;
  propertyType: string;
  roofAge: string;
  dealAlertCreatedAt: Date;
  priceDropCampaignCreatedAt?: Date;
}
