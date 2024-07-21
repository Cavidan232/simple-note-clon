import React from 'react';

function Footer() {
  const links = [
    { id: 1, title: 'Contact Us', href: '#' },
    { id: 2, title: 'Help', href: '#' },
    { id: 3, title: 'Blog', href: '#' },
    { id: 4, title: 'Developers', href: '#' },
    { id: 5, title: 'Terms & Conditions', href: '#' },
    { id: 6, title: 'Privacy', href: '#' },
    { id: 7, title: 'Press', href: '#' },
    { id: 8, title: 'Privacy Notice for California Users', href: '#' },
  ];

  return (
    <footer className="bg-custom-light text-gray-950 py-4 md:py-6">
      <div className="container mx-auto px-4 flex flex-col items-center md:flex-row justify-between">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="t
              hover:text-white transition duration-300 ease-in-out"
            >
              {link.title}
            </a>
          ))}
        </div>
        <div className="text-light text-sm mt-4 md:mt-0">
          © 2024 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
