'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function PreLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-background h-screen w-full flex items-center justify-center z-[9999]">
      <div className="animate-pulse">
        <Image src="/ethral.svg" alt="Logo" width={120} height={120} className="animate-fade" />
      </div>
    </div>
  );
}
