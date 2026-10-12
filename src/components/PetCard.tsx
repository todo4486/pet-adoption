import React from 'react';
import { Pet } from '../types';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import { usePets } from '../context/PetContext';

interface PetCardProps {
  pet: Pet;
}

export const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  const { navigateTo } = usePets();

  const getStatusBadge = () => {
    switch (pet.adoption_status) {
      case 'Adopted':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-[#E6E1DC] text-[#6B635B] border border-[#D5CEC7] shadow-xs">
            Adopted 💖
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-[#FFE7D6] text-[#9A4C24] border border-[#FFCBA4] shadow-xs">
            Application Pending
          </span>
        );
      case 'Available':
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-[#E3F0E0] text-[#2F542A] border border-[#B7D3B0] shadow-xs">
            Available for Adoption
          </span>
        );
    }
  };

  return (
    <div
      onClick={() => navigateTo('detail', pet.pet_id)}
      className="group bg-white rounded-3xl border border-[#EFE5D8] shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col overflow-hidden cursor-pointer"
    >
      {/* Pet Image Container */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-[#FAF3EA]">
        <img
          src={pet.image_url}
          alt={pet.pet_name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Status Badge floating */}
        <div className="absolute top-3 left-3 z-10">{getStatusBadge()}</div>

        {/* Species & Gender tag floating */}
        <div className="absolute bottom-3 right-3 z-10 flex gap-1.5">
          <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-white/90 backdrop-blur-md text-[#5A4A42] shadow-xs">
            {pet.species}
          </span>
          <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-xs font-bold bg-white/90 backdrop-blur-md text-[#5A4A42] shadow-xs">
            {pet.gender}
          </span>
        </div>
      </div>

      {/* Pet Information */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-xl font-extrabold text-[#5A4A42] group-hover:text-[#E07A5F] transition-colors">
                {pet.pet_name}
              </h3>
              <p className="text-sm font-semibold text-[#8C7A70]">{pet.breed}</p>
            </div>
            <div className="text-right">
              <span className="inline-block text-xs font-black px-2.5 py-1 rounded-xl bg-[#FFF8F0] border border-[#F0E4D5] text-[#5A4A42]">
                {pet.age}
              </span>
            </div>
          </div>

          <p className="mt-3 text-xs text-[#7A6B63] line-clamp-2 leading-relaxed">
            {pet.description}
          </p>
        </div>

        <div className="pt-3 border-t border-[#F5EDE2] flex items-center justify-between text-xs font-medium text-[#8C7A70]">
          <div className="flex items-center gap-1.5 truncate max-w-[65%]">
            <MapPin className="w-3.5 h-3.5 text-[#E07A5F] shrink-0" />
            <span className="truncate">{pet.origin_shelter}</span>
          </div>
          <span className="font-extrabold text-[#5A4A42] text-sm">
            ${pet.adoption_fee}
          </span>
        </div>
      </div>
    </div>
  );
};
