import { NextRequest, NextResponse } from 'next/server';
import { mockVehicles } from '@/lib/mockVehicles';
import { SortOption, Vehicle, VehiclesResponse } from '@/types/vehicle';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const search = (searchParams.get('search') ?? '').trim().toLowerCase();
  const sort = (searchParams.get('sort') ?? 'name-asc') as SortOption;
  const type = (searchParams.get('type') ?? '').trim().toLowerCase();
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10));
  const limit = Math.max(1, parseInt(searchParams.get('limit') ?? '8', 10));

  // Filter
  // eslint-disable-next-line prefer-const
  let vehicles: Vehicle[] = mockVehicles.filter((v) => {
    const matchesSearch =
      !search ||
      v.make.toLowerCase().includes(search) ||
      v.model.toLowerCase().includes(search) ||
      v.trim.toLowerCase().includes(search) ||
      v.type.toLowerCase().includes(search);
    const matchesType = !type || v.type.toLowerCase() === type;
    return matchesSearch && matchesType;
  });

  // Sort
  vehicles.sort((a, b) => {
    switch (sort) {
      case 'name-asc':
        return `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`);
      case 'name-desc':
        return `${b.make} ${b.model}`.localeCompare(`${a.make} ${a.model}`);
      case 'price-asc':
        return a.msrp - b.msrp;
      case 'price-desc':
        return b.msrp - a.msrp;
    }
  });

  // Paginate
  const total = vehicles.length;
  const pages = Math.ceil(total / limit);
  const data = vehicles.slice((page - 1) * limit, page * limit);

  const response: VehiclesResponse = { data, total, pages, page };
  return NextResponse.json(response);
}
