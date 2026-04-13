'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  ExpandableScreen,
  ExpandableScreenTrigger,
  ExpandableScreenContent,
} from '@/components/ui/expandable-screen';
import { VehicleDetailScreen } from '@/components/listing/VehicleDetailScreen';
import { Vehicle } from '@/types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <ExpandableScreen layoutId={`vehicle-${vehicle.id}`}>
      <Card className="overflow-hidden hover:shadow-md transition-shadow bg-white border border-slate-200 pt-0">
        <div className="relative aspect-video w-full bg-slate-200">
          {imgError ? (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400 text-sm">No image</span>
            </div>
          ) : (
            <Image
              src={vehicle.imageUrl}
              alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
              fill
              className="object-contain"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          )}
        </div>

        <CardContent className="p-4 space-y-2">
          <div className="flex items-center justify-between gap-2">
            <span className="font-semibold text-slate-900 truncate">
              {vehicle.make} {vehicle.model}
            </span>
            <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 shrink-0 text-xs">
              {vehicle.type}
            </Badge>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <span className="text-slate-500">{vehicle.year}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-600 truncate">{vehicle.trim}</span>
          </div>

          <p className="text-sm text-slate-500 truncate">{vehicle.description}</p>

          <div className="flex items-center justify-between pt-1">
            <span className="font-bold text-blue-600">
              ${vehicle.msrp.toLocaleString()}
            </span>
            <ExpandableScreenTrigger>
              <Button className='cursor-pointer' variant="outline" size="sm">
                View Details
              </Button>
            </ExpandableScreenTrigger>
          </div>
        </CardContent>
      </Card>

      <ExpandableScreenContent
        className="bg-white"
        closeButtonClassName="text-slate-800 bg-transparent hover:bg-slate-100"
      >
        <VehicleDetailScreen vehicle={vehicle} />
      </ExpandableScreenContent>
    </ExpandableScreen>
  );
}
