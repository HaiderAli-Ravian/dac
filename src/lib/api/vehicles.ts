import { axiosInstance } from '@/lib/axios';
import { SortOption, VehiclesResponse } from '@/types/vehicle';

export interface FetchVehiclesParams {
  search?: string;
  sort?: SortOption;
  type?: string;
  page: number;
  limit: number;
}

export const fetchVehicles = async ({
  search,
  sort,
  type,
  page,
  limit,
}: FetchVehiclesParams): Promise<VehiclesResponse> => {
  // Only send non-empty filter params to keep the request clean
  const params: Record<string, string | number> = { page, limit };
  if (search) params.search = search;
  if (sort) params.sort = sort;
  if (type) params.type = type;

  const { data } = await axiosInstance.get<VehiclesResponse>('/api/vehicles', { params });
  return data;
};
