export type Species = 'Dog' | 'Cat' | 'Other';
export type Gender = 'Male' | 'Female';
export type AdoptionStatus = 'Available' | 'Pending' | 'Adopted';

export interface ShelterHistoryItem {
  shelter_name: string;
  intake_date: string;
  transfer_date?: string;
  notes?: string;
}

export interface Pet {
  pet_id: string;
  pet_name: string;
  species: Species;
  breed: string;
  age: string;
  gender: Gender;
  origin_shelter: string;
  adoption_status: AdoptionStatus;
  image_url: string;
  description: string;
  adoption_fee: number;
  personality_traits: string[];
  shelter_history: ShelterHistoryItem[];
  featured?: boolean;
}

export interface HouseholdMember {
  id: string;
  name: string;
  age: string;
  relationship: string;
}

export interface AdoptionApplication {
  adoption_id: string;
  pet_id: string;
  pet_name: string;
  pet_breed: string;
  pet_image: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  applicant_address: string;
  household_members: HouseholdMember[];
  application_date: string;
  adoption_status: 'Pending' | 'Approved' | 'Rejected';
  adoption_fee: number;
  notes?: string;
}

export type PageView = 'home' | 'pets' | 'detail' | 'apply' | 'applications';
