import React, { useState } from 'react';
import {
  Heart,
  User,
  Mail,
  Phone,
  Home,
  Users,
  Plus,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  AlertCircle,
  FileText,
  Calendar,
} from 'lucide-react';
import { usePets } from '../context/PetContext';
import { HouseholdMember, AdoptionApplication } from '../types';

export const AdoptionFormPage: React.FC = () => {
  const { selectedPetId, getPetById, pets, navigateTo, submitApplication } = usePets();

  // If no pet preselected, pick the first available pet or fallback
  const activePetId = selectedPetId || pets.find((p) => p.adoption_status === 'Available')?.pet_id || pets[0]?.pet_id;
  const pet = getPetById(activePetId);

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>([]);

  // Errors state
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Submission success state
  const [submittedApp, setSubmittedApp] = useState<AdoptionApplication | null>(null);

  // Add Household Member
  const handleAddMember = () => {
    const newMember: HouseholdMember = {
      id: `member-${Date.now()}`,
      name: '',
      age: '',
      relationship: '',
    };
    setHouseholdMembers([...householdMembers, newMember]);
  };

  const handleUpdateMember = (id: string, field: keyof HouseholdMember, value: string) => {
    setHouseholdMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleRemoveMember = (id: string) => {
    setHouseholdMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please provide a valid email address';
    }

    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (phone.trim().length < 7) {
      newErrors.phone = 'Please enter a valid telephone number';
    }

    if (!address.trim()) {
      newErrors.address = 'Street address is required';
    }

    // Validate any filled member fields
    householdMembers.forEach((m, idx) => {
      if (m.name.trim() && (!m.age.trim() || !m.relationship.trim())) {
        newErrors[`member_${idx}`] = `Please fill out both age and relationship for member #${idx + 1}`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pet) return;

    if (pet.adoption_status === 'Adopted') {
      alert('This pet has already been adopted and cannot receive new applications.');
      return;
    }

    if (!validateForm()) {
      // scroll to top of form
      window.scrollTo({ top: 100, behavior: 'smooth' });
      return;
    }

    // Filter out completely empty member entries
    const validMembers = householdMembers.filter((m) => m.name.trim().length > 0);

    const createdApp = submitApplication({
      pet_id: pet.pet_id,
      pet_name: pet.pet_name,
      pet_breed: pet.breed,
      pet_image: pet.image_url,
      applicant_name: name.trim(),
      applicant_email: email.trim(),
      applicant_phone: phone.trim(),
      applicant_address: address.trim(),
      household_members: validMembers,
      adoption_fee: pet.adoption_fee,
    });

    setSubmittedApp(createdApp);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If already submitted, display the pretty confirmation screen
  if (submittedApp && pet) {
    return (
      <div className="max-w-2xl mx-auto py-8 space-y-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE5D8] shadow-md text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#E3F0E0] text-[#2F542A] border-4 border-[#B7D3B0] flex items-center justify-center mx-auto shadow-inner animate-bounce-short">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="inline-block px-3.5 py-1 rounded-full text-xs font-black bg-[#FFF0E2] text-[#A6542A] border border-[#FFD8BF]">
              Application Submitted Successfully
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-[#5A4A42]">
              You're one step closer to {pet.pet_name}!
            </h1>
            <p className="text-sm text-[#7D6B62] max-w-md mx-auto leading-relaxed">
              Thank you for opening your home. Our shelter team will review your application and reach out within 24 to 48 hours.
            </p>
          </div>

          {/* Application Receipt Summary Card */}
          <div className="bg-[#FFF8F0] rounded-2xl p-6 border border-[#F3E8DB] text-left space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-[#EEDFCE]">
              <img
                src={pet.image_url}
                alt={pet.pet_name}
                className="w-16 h-16 rounded-2xl object-cover border border-[#EFE5D8]"
              />
              <div>
                <h4 className="text-base font-extrabold text-[#5A4A42]">{pet.pet_name}</h4>
                <p className="text-xs text-[#8C7A70]">{pet.breed}</p>
                <span className="inline-block mt-1 text-[11px] font-black text-[#9A4C24] bg-[#FFE7D6] px-2 py-0.5 rounded-md">
                  Status: Pending Review
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#8C7A70] font-semibold block">Application ID:</span>
                <span className="text-[#5A4A42] font-black">{submittedApp.adoption_id}</span>
              </div>
              <div>
                <span className="text-[#8C7A70] font-semibold block">Primary Applicant:</span>
                <span className="text-[#5A4A42] font-black">{submittedApp.applicant_name}</span>
              </div>
              <div>
                <span className="text-[#8C7A70] font-semibold block">Contact Email:</span>
                <span className="text-[#5A4A42] font-black truncate block">{submittedApp.applicant_email}</span>
              </div>
              <div>
                <span className="text-[#8C7A70] font-semibold block">Adoption Fee:</span>
                <span className="text-[#5A4A42] font-black">${submittedApp.adoption_fee}</span>
              </div>
            </div>

            {submittedApp.household_members.length > 0 && (
              <div className="pt-2 border-t border-[#EEDFCE] text-xs">
                <span className="text-[#8C7A70] font-semibold block mb-1">
                  Household Members ({submittedApp.household_members.length}):
                </span>
                <p className="text-[#5A4A42] font-medium">
                  {submittedApp.household_members.map((m) => `${m.name} (${m.relationship}, age ${m.age})`).join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('applications')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#B7D3B0] text-[#2F542A] font-extrabold text-sm hover:bg-[#a6c99e] shadow-sm hover:shadow transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Track in My Applications</span>
            </button>
            <button
              onClick={() => navigateTo('pets')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white text-[#5A4A42] font-extrabold text-sm border border-[#EEDFCE] hover:bg-[#FDF9F5] transition cursor-pointer"
            >
              Back to Browse Pets
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-[#EFE5D8] max-w-lg mx-auto space-y-4">
        <h2 className="text-2xl font-black text-[#5A4A42]">No Pet Selected</h2>
        <p className="text-sm text-[#8C7A70]">Please choose a pet first to start the adoption application.</p>
        <button
          onClick={() => navigateTo('pets')}
          className="px-6 py-3 rounded-2xl bg-[#B7D3B0] text-[#2F542A] font-bold text-sm cursor-pointer"
        >
          Browse Pets
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigateTo('detail', pet.pet_id)}
        className="inline-flex items-center gap-2 text-sm font-extrabold text-[#7D6B62] hover:text-[#5A4A42] bg-white px-4 py-2.5 rounded-2xl border border-[#EEDFCE] shadow-2xs hover:shadow-xs transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {pet.pet_name}'s Profile</span>
      </button>

      {/* Form Header */}
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-[#FFF0E2] text-[#A6542A] border border-[#FFD8BF]">
          <Heart className="w-3.5 h-3.5 fill-[#E07A5F]" />
          <span>Simple Adoption Application</span>
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-[#5A4A42]">
          Adoption Application for {pet.pet_name}
        </h1>
        <p className="text-sm text-[#7D6B62]">
          Fill in your details below so our shelter team can prepare your match.
        </p>
      </div>

      {/* Pet Summary Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EFE5D8] shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={pet.image_url}
            alt={pet.pet_name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#F3E8DB]"
          />
          <div>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#5A4A42]">{pet.pet_name}</h3>
            <p className="text-xs sm:text-sm font-semibold text-[#8C7A70]">{pet.breed} • {pet.age}</p>
            <p className="text-xs text-[#9E8E84] mt-0.5">Shelter: {pet.origin_shelter}</p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-[11px] font-bold text-[#8C7A70] block">Adoption Fee</span>
          <span className="text-xl font-black text-[#5A4A42]">${pet.adoption_fee}</span>
        </div>
      </div>

      {/* Adoption Form Card */}
      <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE5D8] shadow-sm space-y-8">
        {/* Section 1: Applicant Details */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#F5EDE2]">
            <User className="w-4 h-4 text-[#E07A5F]" />
            <h3 className="text-base font-extrabold text-[#5A4A42]">
              1. Your Contact Information
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-black text-[#6E5D53]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className={`w-full px-4 py-3 rounded-2xl bg-[#FFF8F0] border text-sm font-semibold text-[#5A4A42] focus:outline-none focus:ring-2 focus:ring-[#FFCBA4] transition ${
                    errors.name ? 'border-red-400 bg-red-50/30' : 'border-[#EEDFCE]'
                  }`}
                />
              </div>
              {errors.name && <p className="text-xs text-red-500 font-bold">{errors.name}</p>}
            </div>

            {/* Email Address */}
            <div className="space-y-1">
              <label className="text-xs font-black text-[#6E5D53]">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane@example.com"
                  className={`w-full px-4 py-3 rounded-2xl bg-[#FFF8F0] border text-sm font-semibold text-[#5A4A42] focus:outline-none focus:ring-2 focus:ring-[#FFCBA4] transition ${
                    errors.email ? 'border-red-400 bg-red-50/30' : 'border-[#EEDFCE]'
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 font-bold">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="text-xs font-black text-[#6E5D53]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. (555) 019-2834"
                  className={`w-full px-4 py-3 rounded-2xl bg-[#FFF8F0] border text-sm font-semibold text-[#5A4A42] focus:outline-none focus:ring-2 focus:ring-[#FFCBA4] transition ${
                    errors.phone ? 'border-red-400 bg-red-50/30' : 'border-[#EEDFCE]'
                  }`}
                />
              </div>
              {errors.phone && <p className="text-xs text-red-500 font-bold">{errors.phone}</p>}
            </div>

            {/* Street Address */}
            <div className="space-y-1">
              <label className="text-xs font-black text-[#6E5D53]">
                Residential Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 124 Blossom Lane, Apt 3B"
                  className={`w-full px-4 py-3 rounded-2xl bg-[#FFF8F0] border text-sm font-semibold text-[#5A4A42] focus:outline-none focus:ring-2 focus:ring-[#FFCBA4] transition ${
                    errors.address ? 'border-red-400 bg-red-50/30' : 'border-[#EEDFCE]'
                  }`}
                />
              </div>
              {errors.address && <p className="text-xs text-red-500 font-bold">{errors.address}</p>}
            </div>
          </div>
        </div>

        {/* Section 2: Household Members */}
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#F5EDE2]">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#E07A5F]" />
              <h3 className="text-base font-extrabold text-[#5A4A42]">
                2. Household Members
              </h3>
            </div>
            <button
              type="button"
              onClick={handleAddMember}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFF0E2] text-[#A6542A] hover:bg-[#FFE7D6] text-xs font-black transition cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Member</span>
            </button>
          </div>

          <p className="text-xs text-[#8C7A70]">
            Please list everyone residing in your household (family, partner, children, or roommates) to help us ensure pet compatibility.
          </p>

          {householdMembers.length === 0 ? (
            <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-dashed border-[#EEDFCE] text-center">
              <p className="text-xs text-[#8C7A70]">
                Living alone? No problem! Or click{' '}
                <button
                  type="button"
                  onClick={handleAddMember}
                  className="text-[#E07A5F] font-bold underline cursor-pointer"
                >
                  "Add Member"
                </button>{' '}
                to list other family members.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {householdMembers.map((member, index) => (
                <div
                  key={member.id}
                  className="p-4 rounded-2xl bg-[#FFF8F0] border border-[#F3E8DB] space-y-3 relative group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#5A4A42]">
                      Member #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id)}
                      className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50 transition cursor-pointer"
                      title="Remove member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) => handleUpdateMember(member.id, 'name', e.target.value)}
                        placeholder="Member Name"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDFCE] text-xs font-semibold text-[#5A4A42] focus:outline-none focus:ring-1 focus:ring-[#FFCBA4]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={member.age}
                        onChange={(e) => handleUpdateMember(member.id, 'age', e.target.value)}
                        placeholder="Age (e.g. 28, 7)"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDFCE] text-xs font-semibold text-[#5A4A42] focus:outline-none focus:ring-1 focus:ring-[#FFCBA4]"
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        value={member.relationship}
                        onChange={(e) => handleUpdateMember(member.id, 'relationship', e.target.value)}
                        placeholder="Relationship (Spouse, Child...)"
                        className="w-full px-3 py-2 rounded-xl bg-white border border-[#EEDFCE] text-xs font-semibold text-[#5A4A42] focus:outline-none focus:ring-1 focus:ring-[#FFCBA4]"
                      />
                    </div>
                  </div>

                  {errors[`member_${index}`] && (
                    <p className="text-xs text-red-500 font-bold">{errors[`member_${index}`]}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Section 3: Shelter Policy Acknowledgement */}
        <div className="p-4 rounded-2xl bg-[#EAF3E8] border border-[#CDE3C9] flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-[#2F542A] shrink-0 mt-0.5" />
          <div className="text-xs text-[#2F542A] leading-relaxed space-y-1">
            <p className="font-extrabold">Next Steps After Submitting:</p>
            <p>
              Once submitted, {pet.pet_name}'s status will update to <span className="font-bold underline">Pending</span> to allow review of your home compatibility. You can monitor your application status anytime under "My Applications".
            </p>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 rounded-2xl font-black text-base bg-[#B7D3B0] text-[#244720] hover:bg-[#a6c99e] shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-[#244720]" />
            <span>Submit Adoption Application</span>
          </button>
        </div>
      </form>
    </div>
  );
};
