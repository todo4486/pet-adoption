import React, { useState } from 'react';
import { PawPrint, Heart, FileText, Menu, X, Sparkles } from 'lucide-react';
import { usePets } from '../context/PetContext';

export const Navbar: React.FC = () => {
  const { currentPage, navigateTo, applications } = usePets();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'pets', label: 'Find a Pet' },
    {
      id: 'applications',
      label: 'My Applications',
      badge: applications.length > 0 ? applications.length : undefined,
    },
  ];

  const handleNav = (page: 'home' | 'pets' | 'applications') => {
    navigateTo(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FFF8F0]/95 backdrop-blur-md border-b border-[#EEDFCE] transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#FFCBA4] to-[#F7A382] flex items-center justify-center text-[#5A4A42] shadow-sm transition-transform duration-300 group-hover:scale-105 group-hover:rotate-6">
              <PawPrint className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <span className="text-2xl font-extrabold tracking-tight text-[#5A4A42] block leading-tight">
                Haven<span className="text-[#E07A5F]">Paws</span>
              </span>
              <span className="text-xs font-semibold text-[#8C7A70] tracking-wide block">
                Adopt, Cherish & Love
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.id ||
                (item.id === 'pets' && (currentPage === 'detail' || currentPage === 'apply'));

              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id as 'home' | 'pets' | 'applications')}
                  className={`px-4 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 relative flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-[#FFCBA4]/40 text-[#5A4A42] shadow-sm'
                      : 'text-[#6E5D53] hover:text-[#5A4A42] hover:bg-[#F3E6D7]/60'
                  }`}
                >
                  {item.id === 'home' && <PawPrint className="w-4 h-4 opacity-70" />}
                  {item.id === 'pets' && <Heart className="w-4 h-4 opacity-70" />}
                  {item.id === 'applications' && <FileText className="w-4 h-4 opacity-70" />}
                  <span>{item.label}</span>

                  {item.badge !== undefined && (
                    <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-black rounded-full bg-[#B7D3B0] text-[#2F542A]">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <button
              onClick={() => handleNav('pets')}
              className="ml-4 px-5 py-2.5 rounded-2xl font-bold text-sm bg-[#B7D3B0] text-[#2F542A] hover:bg-[#a5c79e] transition-all shadow-sm hover:shadow hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Browse Pets</span>
            </button>
          </nav>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-2xl text-[#5A4A42] bg-[#F7EFE6] hover:bg-[#EEDFCE] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFF8F0] border-b border-[#EEDFCE] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navItems.map((item) => {
            const isActive =
              currentPage === item.id ||
              (item.id === 'pets' && (currentPage === 'detail' || currentPage === 'apply'));

            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id as 'home' | 'pets' | 'applications')}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-base font-bold transition-colors ${
                  isActive
                    ? 'bg-[#FFCBA4]/40 text-[#5A4A42]'
                    : 'text-[#6E5D53] hover:bg-[#F3E6D7]/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.id === 'home' && <PawPrint className="w-5 h-5 text-[#E07A5F]" />}
                  {item.id === 'pets' && <Heart className="w-5 h-5 text-[#E07A5F]" />}
                  {item.id === 'applications' && <FileText className="w-5 h-5 text-[#E07A5F]" />}
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="px-2.5 py-0.5 text-xs font-bold rounded-full bg-[#B7D3B0] text-[#2F542A]">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2">
            <button
              onClick={() => handleNav('pets')}
              className="w-full py-3 rounded-2xl font-bold text-center bg-[#B7D3B0] text-[#2F542A] hover:bg-[#a5c79e] transition shadow-sm"
            >
              Start Adoption Journey
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
