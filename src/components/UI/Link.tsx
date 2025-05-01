import React from 'react';

interface LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Link: React.FC<LinkProps> = ({ href, children, className, onClick }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick();
    }

    // Dispatch custom navigation event
    window.dispatchEvent(new CustomEvent('navigate', { detail: { path: href } }));

    // Optional: fallback if navigation doesn't update automatically
    window.history.pushState(null, '', href);
  };

  return (
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>
  );
};
