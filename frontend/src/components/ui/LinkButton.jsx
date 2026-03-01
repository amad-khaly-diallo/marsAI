import React from 'react';
import { Link } from 'react-router-dom';

export default function LinkButton({
  to,
  className = '',
  variant = 'primary',
  children,
}) {
  const baseClasses =
    'rounded-full px-4 text-xs font-semibold transition h-8 inline-flex items-center justify-center';
  const variants = {
    primary: 'bg-brand-primary text-white hover:bg-brand-accent',
    secondary:
      'border border-white/20 bg-white/10 hover:bg-white/20 text-white',
    tertiary: 'text-white/70 hover:text-white',
  };

  return (
    <Link
      to={to}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
