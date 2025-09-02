
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../base/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'שירותים', href: '#services' },
    { name: 'מי אני', href: '#about' },
    { name: 'המלצות', href: '#testimonials' },
    { name: 'איך זה עובד', href: '#how-it-works' },
    { name: 'צור קשר', href: '/contact' }
  ];

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-900" style={{ fontFamily: '"Pacifico", serif' }}>
              logo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-blue-900 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button size="md" onClick={() => window.location.href = '#cta'}>
              הירשם עכשיו
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2"
          >
            <i className={`ri-${isMenuOpen ? 'close' : 'menu'}-line text-2xl text-blue-900`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-blue-900 hover:text-blue-700 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-4">
                <Button size="md" className="w-full">
                  הירשם עכשיו
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
