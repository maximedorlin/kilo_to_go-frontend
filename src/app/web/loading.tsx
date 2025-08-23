// app/loading.tsx
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="p-10 space-y-20 animate-pulse">
      {/* Section 1: Header */}
      <section className="space-y-6">
        <Skeleton className="h-12 w-3/4 rounded-md" />
        <Skeleton className="h-6 w-1/2 rounded-md" />
      </section>

      {/* Section 2: Call to Action (CTA) */}
      <section className="flex flex-col items-center space-y-4">
        <Skeleton className="h-64 w-full rounded-lg bg-gray-300" />
        <Skeleton className="h-12 w-1/4 rounded-lg" />
      </section>

      {/* Section 3: Features Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="h-48 w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
          </div>
        ))}
      </section>

      {/* Section 4: Testimonials */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center space-y-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-6 w-2/3 rounded-md" />
            <Skeleton className="h-4 w-1/2 rounded-md" />
          </div>
        ))}
      </section>

      {/* Section 5: Informative Text */}
      <section className="space-y-4">
        <Skeleton className="h-10 w-1/2 rounded-md" />
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-6 w-full rounded-md" />
      </section>

      {/* Section 6: Footer */}
      <section className="flex flex-col items-center space-y-4">
        <Skeleton className="h-6 w-1/4 rounded-md" />
        <Skeleton className="h-6 w-1/2 rounded-md" />
      </section>
    </div>
  );
};

export default Loading;
