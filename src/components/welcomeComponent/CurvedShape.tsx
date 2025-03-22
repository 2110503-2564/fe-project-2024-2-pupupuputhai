import React from 'react';

export default function CurvedShape(){
    return (
      <svg viewBox="0 0 400 200" className="h-full opacity-90 absolute z-10 ">
      <defs>
        <linearGradient id="grayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#000000" />      {/* Dark gray */}
          <stop offset="100%" stopColor="#d4d4d4" />    {/* Light gray */}
        </linearGradient>
    
        <clipPath id="circularCutout">
          <path d="M0,0 H300 A100,100 0 0,0 300,200 H0 Z" />
        </clipPath>
      </defs>
    
      <rect
        width="400"
        height="200"
        fill="url(#grayGradient)"
        clipPath="url(#circularCutout)"
      />
    </svg>
    )
}