import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-slate-900 text-white shadow-lg w-[60vw] mx-auto mt-2 rounded-xl">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">PCKR</div>
        <nav className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-blue-200">Home</a>
          <a href="#" className="hover:text-blue-200">About</a>
          <a href="#" className="hover:text-blue-200">Services</a>
          <a href="#" className="hover:text-blue-200">Contact</a>
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          {isOpen ? '✖️' : '☰'}
        </button>
      </div>
      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <a href="#" className="block py-2 hover:text-blue-200">Home</a>
          <a href="#" className="block py-2 hover:text-blue-200">About</a>
          <a href="#" className="block py-2 hover:text-blue-200">Services</a>
          <a href="#" className="block py-2 hover:text-blue-200">Contact</a>
        </div>
      )}
    </header>
  );
};

export default Header;
