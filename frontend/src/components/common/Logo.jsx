import React from 'react';
import { Link } from 'react-router-dom';

const Logo = ({ 
  className = "", 
  variant = "full", // "full", "icon", "text"
  size = "md", // "sm", "md", "lg", "hero"
  link = true,
  inverted = false // true when placed on forest green background
}) => {
  const heightClasses = {
    sm: "h-7 sm:h-8",
    md: "h-8 sm:h-9 md:h-10",
    lg: "h-10 sm:h-12",
    hero: "h-12 sm:h-16"
  };

  const imageSrc = variant === "icon" 
    ? "/assets/nexoraa_icon.png" 
    : "/assets/nexoraa_logo.png";

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <img
        src={imageSrc}
        alt="NEXORA"
        className={`object-contain w-auto ${heightClasses[size] || heightClasses.md} transition-opacity duration-200 ${inverted ? 'brightness-125' : ''}`}
        loading="eager"
      />
    </div>
  );

  if (link) {
    return (
      <Link to="/" aria-label="Nexora Home" className="focus:outline-none inline-flex items-center">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
