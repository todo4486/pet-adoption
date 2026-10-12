import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pet, AdoptionApplication, PageView, HouseholdMember } from '../types';
import { INITIAL_PETS, INITIAL_APPLICATIONS } from '../data/mockData';

const STORAGE_PETS_KEY = 'havenpaws_pets_v1';
const STORAGE_APPS_KEY = 'havenpaws_adoptions_v1';

interface ApplicationInput {
  pet_id: string;
  pet_name: string;
  pet_breed: string;
  pet_image: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_address: string;
  household_members: HouseholdMember[];
  adoption_fee: number;
}

interface PetContextType {
  pets: Pet[];
  applications: AdoptionApplication[];
  currentPage: PageView;
  selectedPetId: string | null;
  navigateTo: (page: PageView, petId?: string) => void;
  getPetById: (id: string) => Pet | undefined;
  submitApplication: (data: ApplicationInput) => AdoptionApplication;
  cancelApplication: (adoptionId: string) => void;
  resetDemoData: () => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_PETS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_PETS;
  });

  const [applications, setApplications] = useState<AdoptionApplication[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_APPS_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return INITIAL_APPLICATIONS;
  });

  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);

  // Sync pets to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PETS_KEY, JSON.stringify(pets));
    } catch {
      // ignore
    }
  }, [pets]);

  // Sync applications to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_APPS_KEY, JSON.stringify(applications));
    } catch {
      // ignore
    }
  }, [applications]);

  const navigateTo = (page: PageView, petId?: string) => {
    if (petId) {
      setSelectedPetId(petId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPetById = (id: string) => {
    return pets.find((p) => p.pet_id === id);
  };

  const submitApplication = (data: ApplicationInput): AdoptionApplication => {
    const today = new Date().toISOString().split('T')[0];
    const newAppId = `APP-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newApp: AdoptionApplication = {
      adoption_id: newAppId,
      pet_id: data.pet_id,
      pet_name: data.pet_name,
      pet_breed: data.pet_breed,
      pet_image: data.pet_image,
      applicant_name: data.applicant_name,
      applicant_email: data.applicant_email,
      applicant_phone: data.applicant_phone,
      applicant_address: data.applicant_address,
      household_members: data.household_members,
      application_date: today,
      adoption_status: 'Pending',
      adoption_fee: data.adoption_fee,
    };

    // Update pet's adoption_status to 'Pending'
    setPets((prev) =>
      prev.map((pet) =>
        pet.pet_id === data.pet_id ? { ...pet, adoption_status: 'Pending' } : pet
      )
    );

    // Save application to state
    setApplications((prev) => [newApp, ...prev]);

    return newApp;
  };

  const cancelApplication = (adoptionId: string) => {
    const target = applications.find((a) => a.adoption_id === adoptionId);
    if (target) {
      // Revert pet to Available if it was Pending
      setPets((prev) =>
        prev.map((pet) =>
          pet.pet_id === target.pet_id && pet.adoption_status === 'Pending'
            ? { ...pet, adoption_status: 'Available' }
            : pet
        )
      );
      setApplications((prev) => prev.filter((a) => a.adoption_id !== adoptionId));
    }
  };

  const resetDemoData = () => {
    setPets(INITIAL_PETS);
    setApplications(INITIAL_APPLICATIONS);
    try {
      localStorage.setItem(STORAGE_PETS_KEY, JSON.stringify(INITIAL_PETS));
      localStorage.setItem(STORAGE_APPS_KEY, JSON.stringify(INITIAL_APPLICATIONS));
    } catch {
      // ignore
    }
  };

  return (
    <PetContext.Provider
      value={{
        pets,
        applications,
        currentPage,
        selectedPetId,
        navigateTo,
        getPetById,
        submitApplication,
        cancelApplication,
        resetDemoData,
      }}
    >
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetContext);
  if (!context) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};
