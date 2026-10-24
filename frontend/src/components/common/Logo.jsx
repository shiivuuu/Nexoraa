import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ 
  className = "", 
  variant = "full", // "full", "icon", "text"
  size = "md", // "sm", "md", "lg", "hero"
  link = true,
  inverted = false
}) => {
  const sizeClasses = {
    sm: "h-8 w-8 sm:h-9 sm:w-9",
    md: "h-9 w-9 sm:h-10 sm:w-10",
    lg: "h-11 w-11 sm:h-12 sm:w-12",
    hero: "h-14 w-14 sm:h-16 sm:w-16"
  };

  const imageSrc = variant === "icon" 
    ? "/assets/nexoraa_icon.png" 
    : "/assets/nexoraa_logo.png";

  const content = (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      <img
        src={imageSrc}
        alt="NEXORAA"
        className={`object-cover rounded-lg shadow-sm border border-[#244638]/15 ${sizeClasses[size] || sizeClasses.md} transition-transform duration-200 group-hover:scale-102`}
        loading="eager"
      />
      {variant !== "icon" && (
        <span className={`font-serif text-2xl sm:text-[1.65rem] tracking-tight font-normal leading-none ${
          inverted ? 'text-[#FFFCF7]' : 'text-[#244638]'
        }`}>
          NEXORA
        </span>
      )}
    </div>
  );

  if (link) {
    return (
      <Link to="/" aria-label="Nexora Home" className="focus:outline-none inline-flex items-center group">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
