import React from 'react';
import CategoryProps from '../Categories/CategoryProps';

function Navigation() {
  const links = [
    {
      name: 'Our Story',
      color: 'bg-fuchsia-600',
      url: 'https://kabooter1.netlify.app/',
    },
    {
      name: 'Namaz',
      color: 'bg-rose-500',
      url: 'https://tasklistmanagement.netlify.app/',
    },
  ];

  const handleNavigation = (url) => {
    window.open(url, "_self"); // Opens in the same tab
  };

  return (
    <div className='grid grid-cols-2 gap-8'>
      {links.map((link) => (
        <CategoryProps
          key={link.name}
          name={link.name}
          color={link.color}
          onClick={() => handleNavigation(link.url)}
        />
      ))}
    </div>
  );
}

export default Navigation;