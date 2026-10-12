import React from 'react';
import {
  ArrowLeft,
  Heart,
  Calendar,
  MapPin,
  ShieldCheck,
  Sparkles,
  Info,
  Clock,
  CheckCircle2,
  DollarSign,
  PawPrint,
} from 'lucide-react';
import { usePets } from '../context/PetContext';

export const PetDetailPage: React.FC = () => {
  const { selectedPetId, getPetById, navigateTo } = usePets();

  const pet = selectedPetId ? getPetById(selectedPetId) : undefined;

  if (!pet) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-[#EFE5D8] max-w-lg mx-auto space-y-4 my-12">
        <PawPrint className="w-12 h-12 text-[#B5A599] mx-auto opacity-60" />
        <h2 className="text-2xl font-black text-[#5A4A42]">Pet Not Found</h2>
        <p className="text-sm text-[#8C7A70]">
          We couldn't locate this pet profile. They might have already found their forever home.
        </p>
        <button
          onClick={() => navigateTo('pets')}
          className="px-6 py-3 rounded-2xl bg-[#B7D3B0] text-[#2F542A] font-bold text-sm hover:bg-[#a6c99e] transition cursor-pointer"
        >
          Return to Pets
        </button>
      </div>
    );
  }

  const isAdopted = pet.adoption_status === 'Adopted';
  const isPending = pet.adoption_status === 'Pending';
  const isAvailable = pet.adoption_status === 'Available';

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={() => navigateTo('pets')}
        className="inline-flex items-center gap-2 text-sm font-extrabold text-[#7D6B62] hover:text-[#5A4A42] bg-white px-4 py-2.5 rounded-2xl border border-[#EEDFCE] shadow-2xs hover:shadow-xs transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all pets</span>
      </button>

      {/* Main Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Big Photo & Quick Highlights */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative rounded-3xl overflow-hidden border border-[#EFE5D8] shadow-md bg-white aspect-4/3 sm:aspect-16/11">
            <img
              src={pet.image_url}
              alt={pet.pet_name}
              className="w-full h-full object-cover"
            />

            {/* Status floating badge */}
            <div className="absolute top-4 left-4 z-10">
              {isAdopted && (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#E6E1DC] text-[#6B635B] border border-[#D5CEC7] shadow-sm">
                  Adopted Forever 💖
                </span>
              )}
              {isPending && (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#FFE7D6] text-[#9A4C24] border border-[#FFCBA4] shadow-sm">
                  Application Under Review ⏳
                </span>
              )}
              {isAvailable && (
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black bg-[#E3F0E0] text-[#2F542A] border border-[#B7D3B0] shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  Ready for Adoption
                </span>
              )}
            </div>
          </div>

          {/* Personality Traits Pills */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE5D8] shadow-2xs space-y-3">
            <h4 className="text-xs font-extrabold text-[#8C7A70] uppercase tracking-wider">
              Personality & Traits
            </h4>
            <div className="flex flex-wrap gap-2">
              {pet.personality_traits.map((trait, index) => (
                <span
                  key={index}
                  className="px-3.5 py-1.5 rounded-2xl bg-[#FFF8F0] border border-[#EEDFCE] text-xs font-black text-[#5A4A42] flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-[#E07A5F]" />
                  {trait}
                </span>
              ))}
            </div>
          </div>

          {/* Shelter Journey - Vertical Timeline */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE5D8] shadow-2xs space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-black text-[#E07A5F] uppercase tracking-wider">
                Shelter Journey
              </span>
              <h3 className="text-xl font-extrabold text-[#5A4A42]">
                Rescue & Care Timeline
              </h3>
              <p className="text-xs text-[#8C7A70]">
                Every milestone in {pet.pet_name}'s journey to finding a loving family.
              </p>
            </div>

            <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#EEDFCE]">
              {pet.shelter_history.map((item, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 sm:-left-8 top-1 w-6 h-6 rounded-full bg-[#FFF8F0] border-2 border-[#B7D3B0] flex items-center justify-center text-[#2F542A]">
                    <div className="w-2 h-2 rounded-full bg-[#B7D3B0]" />
                  </div>

                  <div className="bg-[#FFF8F0] rounded-2xl p-4 border border-[#F3E8DB] space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="text-sm font-extrabold text-[#5A4A42]">
                        {item.shelter_name}
                      </h4>
                      <span className="text-[11px] font-bold text-[#8C7A70] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#E07A5F]" />
                        Intake: {item.intake_date}
                      </span>
                    </div>

                    {item.transfer_date && (
                      <p className="text-xs text-[#7A6B63] font-semibold">
                        Transferred: {item.transfer_date}
                      </p>
                    )}

                    {item.notes && (
                      <p className="text-xs text-[#7D6B62] leading-relaxed">
                        {item.notes}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Pet Details, Stats, & "Adopt Me" Action */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE5D8] shadow-sm space-y-6 sticky top-28">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#8C7A70] tracking-wide">
                  ID: #{pet.pet_id.toUpperCase()}
                </span>
                <span className="text-xs font-black px-3 py-1 rounded-full bg-[#FFF4EB] text-[#A6542A] border border-[#FFD8BF]">
                  Fee: ${pet.adoption_fee}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-[#5A4A42] mt-2">
                {pet.pet_name}
              </h1>
              <p className="text-base font-bold text-[#8C7A70]">{pet.breed}</p>
            </div>

            {/* Quick 4 Stats Grid */}
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-[#F4E9DD]">
                <span className="text-[11px] font-bold text-[#8C7A70] block">Species</span>
                <span className="text-sm font-black text-[#5A4A42]">{pet.species}</span>
              </div>
              <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-[#F4E9DD]">
                <span className="text-[11px] font-bold text-[#8C7A70] block">Age</span>
                <span className="text-sm font-black text-[#5A4A42]">{pet.age}</span>
              </div>
              <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-[#F4E9DD]">
                <span className="text-[11px] font-bold text-[#8C7A70] block">Gender</span>
                <span className="text-sm font-black text-[#5A4A42]">{pet.gender}</span>
              </div>
              <div className="bg-[#FFF8F0] p-3 rounded-2xl border border-[#F4E9DD]">
                <span className="text-[11px] font-bold text-[#8C7A70] block">Status</span>
                <span className="text-sm font-black text-[#5A4A42]">{pet.adoption_status}</span>
              </div>
            </div>

            {/* Origin Shelter info */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#F7F2EC] border border-[#EADFD2]">
              <MapPin className="w-5 h-5 text-[#E07A5F] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-black text-[#5A4A42]">Current Residence</p>
                <p className="text-xs text-[#7D6B62] font-semibold">{pet.origin_shelter}</p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-sm font-extrabold text-[#5A4A42]">About {pet.pet_name}</h3>
              <p className="text-sm text-[#7D6B62] leading-relaxed">
                {pet.description}
              </p>
            </div>

            {/* Action Section */}
            <div className="pt-4 border-t border-[#F5EDE2] space-y-3">
              {isAdopted ? (
                <div className="p-4 rounded-2xl bg-[#F2EFE9] border border-[#DFDACF] text-center space-y-1">
                  <p className="text-sm font-black text-[#6B635B]">
                    {pet.pet_name} has already been adopted! 🎉
                  </p>
                  <p className="text-xs text-[#8C7A70]">
                    This sweet companion has found their permanent home. Check out other available friends!
                  </p>
                  <button
                    onClick={() => navigateTo('pets')}
                    className="mt-3 px-5 py-2.5 rounded-2xl bg-white text-[#5A4A42] font-bold text-xs border border-[#D5CEC7] hover:bg-[#FBF8F5] transition cursor-pointer"
                  >
                    Find Other Available Pets
                  </button>
                </div>
              ) : isPending ? (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-[#FFF5EC] border border-[#FFE0CC] text-center space-y-1">
                    <p className="text-sm font-black text-[#A6542A]">
                      Application Under Review ⏳
                    </p>
                    <p className="text-xs text-[#8C7A70]">
                      An applicant has submitted for {pet.pet_name}. You can still submit a secondary application in case the match does not finalize.
                    </p>
                  </div>
                  <button
                    onClick={() => navigateTo('apply', pet.pet_id)}
                    className="w-full py-4 rounded-2xl font-black text-sm bg-[#FFCBA4] text-[#5A4A42] hover:bg-[#ffbe90] transition shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-current" />
                    <span>Apply for Waitlist</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => navigateTo('apply', pet.pet_id)}
                  className="w-full py-4 rounded-2xl font-black text-base bg-[#B7D3B0] text-[#244720] hover:bg-[#a6c99e] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-[#244720]" />
                  <span>Adopt {pet.pet_name}</span>
                </button>
              )}

              <p className="text-[11px] text-center text-[#9E8E84]">
                Adoption fee covers spay/neuter, initial vaccines, microchip, and initial wellness kit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
