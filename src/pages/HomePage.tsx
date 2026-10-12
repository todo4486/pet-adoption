import React from 'react';
import { PawPrint, Heart, Sparkles, ShieldCheck, Home as HomeIcon, ArrowRight, Clock } from 'lucide-react';
import { usePets } from '../context/PetContext';
import { PetCard } from '../components/PetCard';

export const HomePage: React.FC = () => {
  const { pets, navigateTo } = usePets();

  // Pick 3 featured pets (or available ones)
  const featuredPets = pets.filter((p) => p.featured || p.adoption_status === 'Available').slice(0, 3);

  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-20">
        {/* Soft background pastel blobs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-[#FFCBA4]/30 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#B7D3B0]/30 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center px-4 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF0E2] border border-[#FFD8BF] text-[#A6542A] text-xs sm:text-sm font-extrabold shadow-2xs">
            <Sparkles className="w-4 h-4 text-[#E07A5F]" />
            <span>Over 250+ rescue pets found loving homes this year</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#5A4A42] tracking-tight leading-tight">
            Find your new <span className="text-[#E07A5F] underline decoration-[#FFCBA4] decoration-wavy decoration-2">best friend</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#7D6B62] max-w-2xl mx-auto leading-relaxed font-medium">
            Open your heart and home to a rescue pet. Every dog, cat, and furry friend here is waiting to share a lifetime of unconditional love with you.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigateTo('pets')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#B7D3B0] text-[#244720] font-extrabold text-base hover:bg-[#a6c99e] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-3 cursor-pointer"
            >
              <PawPrint className="w-5 h-5" />
              <span>Browse Pets</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigateTo('applications')}
              className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white text-[#5A4A42] font-extrabold text-base border border-[#EEDFCE] hover:bg-[#FFF4EC] shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>View My Applications</span>
            </button>
          </div>

          {/* Quick Trust Highlights */}
          <div className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#F3E8DB] shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3E8] text-[#2F542A] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-[#5A4A42]">Vet-Cleared</p>
                <p className="text-[11px] text-[#8C7A70]">Vaccinated & microchipped</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#F3E8DB] shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFF2E5] text-[#A6542A] flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-[#5A4A42]">Foster Raised</p>
                <p className="text-[11px] text-[#8C7A70]">Socialized in home settings</p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-[#F3E8DB] shadow-2xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#EBF0F7] text-[#3D5A80] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-black text-[#5A4A42]">Fast Review</p>
                <p className="text-[11px] text-[#8C7A70]">Hear back in 24-48 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Pets Section */}
      <section className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-black text-[#E07A5F] uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Meet Our Pals</span>
            </div>
            <h2 className="text-3xl font-extrabold text-[#5A4A42]">
              Featured Pets Waiting for You
            </h2>
          </div>

          <button
            onClick={() => navigateTo('pets')}
            className="text-sm font-extrabold text-[#5A4A42] hover:text-[#E07A5F] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>See all {pets.length} animals</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Featured Pet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredPets.map((pet) => (
            <PetCard key={pet.pet_id} pet={pet} />
          ))}
        </div>
      </section>

      {/* 3-Step Simple Adoption Process */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE5D8] shadow-sm space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-black text-[#A6542A] uppercase tracking-wider">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl font-black text-[#5A4A42]">
            How Adoption Works at HavenPaws
          </h2>
          <p className="text-sm text-[#7D6B62]">
            We designed a warm, straightforward process to make welcoming your new companion seamless.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3 bg-[#FFF8F0] p-6 rounded-2xl border border-[#F4E9DD]">
            <div className="w-12 h-12 rounded-2xl bg-[#FFCBA4] flex items-center justify-center text-lg font-black text-[#5A4A42]">
              1
            </div>
            <h3 className="text-lg font-black text-[#5A4A42]">Browse & Connect</h3>
            <p className="text-xs text-[#7D6B62] leading-relaxed">
              Explore rescue profiles, personalities, and shelter journey timelines to find the pet matching your lifestyle.
            </p>
          </div>

          <div className="space-y-3 bg-[#FFF8F0] p-6 rounded-2xl border border-[#F4E9DD]">
            <div className="w-12 h-12 rounded-2xl bg-[#B7D3B0] flex items-center justify-center text-lg font-black text-[#2F542A]">
              2
            </div>
            <h3 className="text-lg font-black text-[#5A4A42]">Submit Application</h3>
            <p className="text-xs text-[#7D6B62] leading-relaxed">
              Fill out a simple adoption form with household details. No complicated paperwork or upfront application charges.
            </p>
          </div>

          <div className="space-y-3 bg-[#FFF8F0] p-6 rounded-2xl border border-[#F4E9DD]">
            <div className="w-12 h-12 rounded-2xl bg-[#EAD5F0] flex items-center justify-center text-lg font-black text-[#562B66]">
              3
            </div>
            <h3 className="text-lg font-black text-[#5A4A42]">Meet & Take Home</h3>
            <p className="text-xs text-[#7D6B62] leading-relaxed">
              Our partner shelters arrange a meet-and-greet. Once approved, welcome your sweetest forever family member!
            </p>
          </div>
        </div>
      </section>

      {/* Warm Callout Banner */}
      <section className="bg-gradient-to-r from-[#FFCBA4]/60 via-[#FFF0E2] to-[#B7D3B0]/60 rounded-3xl p-8 sm:p-12 border border-[#EEDFCE] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-lg">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#5A4A42]">
            Ready to give a pet a second chance?
          </h3>
          <p className="text-sm text-[#7D6B62]">
            Check out all available rescue dogs, cats, and rabbits waiting for their forever homes today.
          </p>
        </div>
        <button
          onClick={() => navigateTo('pets')}
          className="px-8 py-4 rounded-2xl bg-[#5A4A42] text-white font-extrabold text-sm hover:bg-[#43352F] transition-all shadow-md hover:shadow-lg shrink-0 cursor-pointer"
        >
          View All Pets
        </button>
      </section>
    </div>
  );
};
