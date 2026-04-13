import { useQuery } from '@tanstack/react-query';
import { fetchVehicles, FetchVehiclesParams } from '@/lib/api/vehicles';
import { VehiclesResponse } from '@/types/vehicle';

export const useVehicles = (params: FetchVehiclesParams) => {
  return useQuery<VehiclesResponse>({
    queryKey: ['vehicles', params],
    queryFn: () => fetchVehicles(params),
    staleTime: 0,           // always fetch fresh data when params change
    placeholderData: undefined, // no stale data between pages
  });
};
