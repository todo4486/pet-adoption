import React, { useState, useMemo } from 'react';
import { Search, PawPrint, Sparkles, Filter, X } from 'lucide-react';
import { usePets } from '../context/PetContext';
import { PetCard } from '../components/PetCard';
import { Species } from '../types';

export const PetsPage: React.FC = () => {
  const { pets } = usePets();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState<'All' | Species>('All');
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const filterChips: { id: 'All' | Species; label: string }[] = [
    { id: 'All', label: 'All Pets' },
    { id: 'Dog', label: 'Dogs 🐶' },
    { id: 'Cat', label: 'Cats 🐱' },
    { id: 'Other', label: 'Others 🐰' },
  ];

  const filteredPets = useMemo(() => {
    return pets.filter((pet) => {
      // Species filter
      if (selectedSpecies !== 'All' && pet.species !== selectedSpecies) {
        return false;
      }

      // Availability filter
      if (onlyAvailable && pet.adoption_status !== 'Available') {
        return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = pet.pet_name.toLowerCase().includes(query);
        const matchesBreed = pet.breed.toLowerCase().includes(query);
        const matchesShelter = pet.origin_shelter.toLowerCase().includes(query);
        return matchesName || matchesBreed || matchesShelter;
      }

      return true;
    });
  }, [pets, selectedSpecies, onlyAvailable, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Page Title & Intro */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#E3F0E0] text-[#2F542A] border border-[#B7D3B0]">
          <PawPrint className="w-3.5 h-3.5" />
          <span>Available Companions</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#5A4A42]">
          Browse Our Lovable Pets
        </h1>
        <p className="text-sm sm:text-base text-[#7D6B62]">
          Filter by species or search by name & breed to discover your future family member.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EFE5D8] shadow-sm space-y-4">
        {/* Search bar */}
        <div className="relative">
          <Search className="w-5 h-5 text-[#9E8E84] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, breed, or shelter location..."
            className="w-full pl-12 pr-10 py-3.5 rounded-2xl bg-[#FFF8F0] border border-[#EEDFCE] text-[#5A4A42] placeholder-[#A4948A] focus:outline-none focus:ring-2 focus:ring-[#FFCBA4] focus:border-transparent text-sm font-semibold transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#9E8E84] hover:text-[#5A4A42] rounded-full hover:bg-[#F3E6D7]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter chips & Available toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
          {/* Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {filterChips.map((chip) => {
              const isSelected = selectedSpecies === chip.id;
              return (
                <button
                  key={chip.id}
                  onClick={() => setSelectedSpecies(chip.id)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-black transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#FFCBA4] text-[#5A4A42] shadow-xs scale-102'
                      : 'bg-[#FFF8F0] text-[#7D6B62] hover:bg-[#F6E9DC] border border-[#EEDFCE]'
                  }`}
                >
                  {chip.label}
                </button>
              );
            })}
          </div>

          {/* Toggle for Available Only */}
          <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm font-bold text-[#6E5D53] select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 rounded text-[#B7D3B0] focus:ring-[#B7D3B0] accent-[#8EB886] cursor-pointer"
            />
            <span>Show available only</span>
          </label>
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm font-bold text-[#8C7A70]">
          Showing <span className="text-[#5A4A42] font-black">{filteredPets.length}</span> {filteredPets.length === 1 ? 'pet' : 'pets'}
        </p>

        {(selectedSpecies !== 'All' || onlyAvailable || searchQuery) && (
          <button
            onClick={() => {
              setSelectedSpecies('All');
              setOnlyAvailable(false);
              setSearchQuery('');
            }}
            className="text-xs font-bold text-[#E07A5F] hover:underline cursor-pointer"
          >
            Reset all filters
          </button>
        )}
      </div>

      {/* Pets Grid */}
      {filteredPets.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredPets.map((pet) => (
            <PetCard key={pet.pet_id} pet={pet} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EFE5D8] space-y-4 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-[#FFF8F0] flex items-center justify-center mx-auto text-[#B5A599]">
            <PawPrint className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-xl font-black text-[#5A4A42]">No pets match your search</h3>
          <p className="text-xs sm:text-sm text-[#8C7A70]">
            Try adjusting your search terms or clearing the selected filters to see all furry companions.
          </p>
          <button
            onClick={() => {
              setSelectedSpecies('All');
              setOnlyAvailable(false);
              setSearchQuery('');
            }}
            className="px-6 py-2.5 rounded-2xl bg-[#B7D3B0] text-[#2F542A] text-xs font-black hover:bg-[#a6c99e] transition cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
};
