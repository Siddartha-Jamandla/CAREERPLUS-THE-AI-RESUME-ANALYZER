import React from 'react';
import logoImage from '../assets/images/career_plus_logo_1785238231985.jpg';

interface CareerPlusLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  lightText?: boolean;
}

export const CareerPlusLogo: React.FC<CareerPlusLogoProps> = ({
  className = '',
  size = 'md',
  showText = true,
  lightText = false,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const imageSizeClass = sizeClasses[size] || 'w-10 h-10';

  return (
    <div className={`flex items-center space-x-2.5 ${className}`}>
      {/* Official CAREER PLUS+ Metallic Emblem Image */}
      <div className={`relative ${imageSizeClass} rounded-xl overflow-hidden shadow-md border border-amber-500/30 shrink-0 bg-slate-950 flex items-center justify-center`}>
        <img
          src={logoImage}
          alt="CAREER PLUS+ Logo"
          className="w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />
      </div>

      {showText && (
        <div className="flex flex-col justify-center">
          <div className="flex items-center space-x-1 leading-none">
            <span className={`font-black tracking-tight text-base sm:text-lg ${lightText ? 'text-white' : 'text-slate-900 dark:text-white'}`}>
              CAREER
            </span>
            <span className="font-black tracking-tight text-base sm:text-lg text-amber-500">
              PLUS+
            </span>
          </div>
          <span className={`text-[9px] font-extrabold uppercase tracking-widest ${lightText ? 'text-slate-400' : 'text-slate-500 dark:text-slate-400'}`}>
            AI Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
