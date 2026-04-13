export interface VehicleSpecs {
  engine: string;
  horsepower: number;
  drivetrain: string;
  transmission: string;
  mpgCity: number;
  mpgHighway: number;
  seating: number;
}

export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  trim: string;
  description: string;
  msrp: number;
  imageUrl: string;
  type: string;
  specs: VehicleSpecs;
  features: string[];
}

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';

export interface VehiclesResponse {
  data: Vehicle[];
  total: number;
  pages: number;
  page: number;
}
