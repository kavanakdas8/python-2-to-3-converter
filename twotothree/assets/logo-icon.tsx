import React from 'react';

export function LogoIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Top Snake (Python 3 - Blue/Emerald) */}
      <path d="M15.5 3c-4.5 0-4.5 2-4.5 2V8h5v1H7C4 9 4 12 4 12s0 3 3 3h1.5v-3.5C8.5 10 10 8.5 11.5 8.5h6.5c1.5 0 2 1.5 2 3v4c0 1.5-1.5 2-3 2h-1v-2H11v4s0 3 4.5 3 4.5-2 4.5-2V19h-5v-1h9c3 0 3-3 3-3s0-3-3-3h-1.5v3.5c0 1.5-1.5 3-3 3h-6.5c-1.5 0-2-1.5-2-3v-4c0-1.5 1.5-2 3-2h1v2h5v-4s0-3-4.5-3z" />
      
      {/* Eyes */}
      <circle cx="11.5" cy="5.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="19.5" cy="24.5" r="1" fill="currentColor" stroke="none" />
      
      {/* Morph / Fast Forward Icon in Center */}
      <path d="M12 11l4 4-4 4" strokeWidth="2.5" className="text-emerald-400" />
      <path d="M16 11l4 4-4 4" strokeWidth="2.5" className="text-emerald-400" />
    </svg>
  );
}

export default LogoIcon;
