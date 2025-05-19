// Models for Port, Country, and City

export interface Port {
  id?: number;
  name: string;
  address: string;
  countryId: number;
  countryName?: string;
  cityId: number;
  cityName?: string;
}

export interface Country {
  id: number;
  name: string;
  nameAr: string;
}

export interface City {
  id: number;
  name: string;
  nameAr: string;
  countryId: number;
}

export interface CreatePortRequest {
  name: string;
  address: string;
  countryId: number;
  cityId: number;
}

export interface UpdatePortRequest {
  id: number;
  name: string;
  address: string;
  countryId: number;
  cityId: number;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  pageSize: number;
  pageIndex: number;
  first: boolean;
  last: boolean;
}

export interface SearchParams {
  searchText?: string;
  columnName?: string;
}

export interface SortParams {
  active: string;
  direction: 'asc' | 'desc' | '';
}

export interface PageParams {
  pageIndex: number;
  pageSize: number;
}