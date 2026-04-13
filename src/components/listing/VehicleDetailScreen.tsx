'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Vehicle } from '@/types/vehicle';
import {
  Gauge,
  Zap,
  Car,
  Settings2,
  Fuel,
  Users,
  CheckCircle2,
  CalendarCheck,
} from 'lucide-react';

interface SpecItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

function SpecItem({ icon, label, value }: SpecItemProps) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
      <div className="text-blue-600 mt-0.5 shrink-0">{icon}</div>
      <div className="min-w-0">
        <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold text-slate-900 truncate">{value}</p>
      </div>
    </div>
  );
}

function DetailsSkeleton() {
  return (
    <div className="flex-1 p-6 lg:p-8 space-y-6">
      {/* Header skeleton */}
      <div className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-2">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-7 w-16 rounded-full" />
        </div>
        <Skeleton className="h-9 w-28 mt-4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <Separator />

      {/* Specs skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <div className="grid grid-cols-2 gap-2.5">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-16 rounded-lg" />
          ))}
        </div>
      </div>

      <Separator />

      {/* Features skeleton */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-5 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}

interface VehicleDetailScreenProps {
  vehicle: Vehicle;
}

export function VehicleDetailScreen({ vehicle }: VehicleDetailScreenProps) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [detailsReady, setDetailsReady] = useState(false);
  const isElectric = vehicle.specs.engine.toLowerCase().includes('electric');

  // Simulate a brief details-render delay so skeleton is visible
  if (!detailsReady) {
    setTimeout(() => setDetailsReady(true), 400);
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-full bg-white">
      {/* Left — Image panel */}
      <div className="lg:w-[52%] bg-slate-100 relative flex items-center justify-center min-h-[260px] lg:min-h-full">
        {/* Image skeleton shown while loading */}
        {!imgLoaded && !imgError && (
          <Skeleton className="absolute inset-0 rounded-none" />
        )}

        {imgError ? (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Car className="w-16 h-16" />
            <span className="text-sm">No image available</span>
          </div>
        ) : (
          <Image
            src={vehicle.imageUrl}
            alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
            fill
            className={`object-contain p-6 lg:p-10 transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            sizes="(max-width: 1024px) 100vw, 52vw"
            priority
          />
        )}

        {/* Year badge overlay */}
        {imgLoaded && (
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
              {vehicle.year}
            </span>
          </div>
        )}
      </div>

      {/* Right — Details panel */}
      <div className="lg:w-[48%] flex flex-col overflow-y-auto">
        {!detailsReady ? (
          <DetailsSkeleton />
        ) : (
          <div className="flex-1 p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-slate-900">
                {vehicle.make} {vehicle.model}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-slate-500 text-sm">{vehicle.trim}</p>
                <span className="text-slate-300">•</span>
                <Badge className="bg-blue-50 text-blue-700 hover:bg-blue-50 border border-blue-100 text-xs px-2 py-0.5">
                  {vehicle.type}
                </Badge>
              </div>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-600">
                  ${vehicle.msrp.toLocaleString()}
                </span>
                <span className="text-slate-400 text-sm">MSRP</span>
              </div>

              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                {vehicle.description}
              </p>
            </div>

            <Separator />

            {/* Specs */}
            <div>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                Specifications
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                <SpecItem icon={<Settings2 className="w-4 h-4" />} label="Engine" value={vehicle.specs.engine} />
                <SpecItem icon={<Zap className="w-4 h-4" />} label="Horsepower" value={`${vehicle.specs.horsepower} hp`} />
                <SpecItem icon={<Car className="w-4 h-4" />} label="Drivetrain" value={vehicle.specs.drivetrain} />
                <SpecItem icon={<Gauge className="w-4 h-4" />} label="Transmission" value={vehicle.specs.transmission} />
                <SpecItem
                  icon={<Fuel className="w-4 h-4" />}
                  label={isElectric ? 'City MPGe' : 'City MPG'}
                  value={`${vehicle.specs.mpgCity} ${isElectric ? 'MPGe' : 'mpg'}`}
                />
                <SpecItem
                  icon={<Fuel className="w-4 h-4" />}
                  label={isElectric ? 'Hwy MPGe' : 'Highway MPG'}
                  value={`${vehicle.specs.mpgHighway} ${isElectric ? 'MPGe' : 'mpg'}`}
                />
                <SpecItem icon={<Users className="w-4 h-4" />} label="Seating" value={`${vehicle.specs.seating} passengers`} />
              </div>
            </div>

            <Separator />

            {/* Features */}
            <div>
              <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">
                Key Features
              </h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {vehicle.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* CTA footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-100 px-6 lg:px-8 py-4">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 text-sm font-semibold gap-2">
            <CalendarCheck className="w-4 h-4" />
            Schedule a Test Drive
          </Button>
        </div>
      </div>
    </div>
  );
}
