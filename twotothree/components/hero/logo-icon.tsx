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
      {/* Top-Left Snake */}
      <path d="M 12 11.5 L 12 6 A 2 2 0 0 1 14 4 L 18 4 A 2 2 0 0 1 20 6 L 20 11.5 L 16.5 11.5 L 16.5 15.5 L 14.5 15.5 L 14.5 19.5 L 12 19.5 L 6 19.5 A 2 2 0 0 1 4 17.5 L 4 13.5 A 2 2 0 0 1 6 11.5 Z" />
      <circle cx="16" cy="7.5" r="1" fill="currentColor" stroke="none" />
      
      {/* Bottom-Right Snake */}
      <path d="M 20 20.5 L 20 26 A 2 2 0 0 1 18 28 L 14 28 A 2 2 0 0 1 12 26 L 12 20.5 L 15.5 20.5 L 15.5 16.5 L 17.5 16.5 L 17.5 12.5 L 20 12.5 L 26 12.5 A 2 2 0 0 1 28 14.5 L 28 18.5 A 2 2 0 0 1 26 20.5 Z" />
      <circle cx="16" cy="24.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
