import React from 'react';
import { PawPrint, Heart, RotateCcw } from 'lucide-react';
import { usePets } from '../context/PetContext';

export const Footer: React.FC = () => {
  const { navigateTo, resetDemoData } = usePets();

  return (
    <footer className="bg-[#FAF0E6] border-t border-[#EEDFCE] mt-24 py-12 text-[#5A4A42]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-[#E8D9C8]">
          {/* Brand info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#FFCBA4] flex items-center justify-center text-[#5A4A42] shadow-sm">
                <PawPrint className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="text-xl font-extrabold text-[#5A4A42]">
                Haven<span className="text-[#E07A5F]">Paws</span>
              </span>
            </div>
            <p className="text-sm text-[#7D6B62] leading-relaxed max-w-sm">
              Creating joyful beginnings for rescue dogs and cats. Every pet deserves a warm home, gentle hands, and unconditional love.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-col sm:flex-row md:justify-center gap-4 sm:gap-8 text-sm font-bold text-[#6E5D53]">
            <button
              onClick={() => navigateTo('home')}
              className="text-left hover:text-[#E07A5F] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('pets')}
              className="text-left hover:text-[#E07A5F] transition-colors cursor-pointer"
            >
              Browse Pets
            </button>
            <button
              onClick={() => navigateTo('applications')}
              className="text-left hover:text-[#E07A5F] transition-colors cursor-pointer"
            >
              My Applications
            </button>
          </div>

          {/* Reset button & demo info */}
          <div className="flex flex-col md:items-end gap-3 text-xs text-[#8C7A70]">
            <span className="inline-flex items-center gap-1.5 bg-[#FFF8F0] px-3 py-1.5 rounded-full border border-[#EEDFCE]">
              <Heart className="w-3.5 h-3.5 text-[#E07A5F] fill-[#E07A5F]" />
              Non-profit demo application
            </span>
            <button
              onClick={() => {
                if (window.confirm('Reset sample pets and applications to default demo data?')) {
                  resetDemoData();
                }
              }}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C7A70] hover:text-[#5A4A42] hover:underline cursor-pointer transition-colors"
              title="Reset localStorage data to sample pets and applications"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E8E84] gap-3">
          <p>© 2026 HavenPaws Adoption Network. Gentle, loving pet rescue.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-[#E07A5F] fill-[#E07A5F]" /> for animal welfare lovers
          </p>
        </div>
      </div>
    </footer>
  );
};
