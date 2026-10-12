import React, { useState } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Calendar,
  User,
  Users,
  MapPin,
  Heart,
  ArrowRight,
  Trash2,
  PawPrint,
  Info,
} from 'lucide-react';
import { usePets } from '../context/PetContext';

export const ApplicationsPage: React.FC = () => {
  const { applications, cancelApplication, navigateTo } = usePets();
  const [filter, setFilter] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');

  const filteredApps = applications.filter((app) => {
    if (filter === 'All') return true;
    return app.adoption_status === filter;
  });

  const getStatusBadge = (status: 'Pending' | 'Approved' | 'Rejected') => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#E3F0E0] text-[#2F542A] border border-[#B7D3B0] shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Approved 🎉
          </span>
        );
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FCE6E9] text-[#962A3C] border border-[#F6B6C1] shadow-2xs">
            <XCircle className="w-3.5 h-3.5" />
            Not Approved
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#FFE7D6] text-[#9A4C24] border border-[#FFCBA4] shadow-2xs">
            <Clock className="w-3.5 h-3.5" />
            Pending Review ⏳
          </span>
        );
    }
  };

  return (
    <div className="space-y-10 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black bg-[#FFF0E2] text-[#A6542A] border border-[#FFD8BF]">
          <FileText className="w-3.5 h-3.5" />
          <span>Application Tracker</span>
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-[#5A4A42]">
          My Adoption Applications
        </h1>
        <p className="text-sm sm:text-base text-[#7D6B62]">
          Track the status of your applications and manage your upcoming pet adoptions.
        </p>
      </div>

      {/* Filter Tabs if applications exist */}
      {applications.length > 0 && (
        <div className="flex items-center justify-between flex-wrap gap-4 bg-white p-3 rounded-2xl border border-[#EFE5D8]">
          <div className="flex items-center gap-2">
            {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((tab) => {
              const count =
                tab === 'All'
                  ? applications.length
                  : applications.filter((a) => a.adoption_status === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                    filter === tab
                      ? 'bg-[#FFCBA4] text-[#5A4A42] shadow-2xs'
                      : 'text-[#8C7A70] hover:bg-[#FFF8F0]'
                  }`}
                >
                  {tab} ({count})
                </button>
              );
            })}
          </div>

          <span className="text-xs text-[#8C7A70] font-semibold pr-2">
            Total Submitted: {applications.length}
          </span>
        </div>
      )}

      {/* Applications List */}
      {filteredApps.length > 0 ? (
        <div className="space-y-6">
          {filteredApps.map((app) => (
            <div
              key={app.adoption_id}
              className="bg-white rounded-3xl border border-[#EFE5D8] shadow-sm overflow-hidden transition hover:shadow-md"
            >
              {/* Top Banner with ID, Date, and Status */}
              <div className="p-5 sm:px-6 bg-[#FFF8F0] border-b border-[#F3E8DB] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-extrabold px-2.5 py-1 rounded-xl bg-white text-[#5A4A42] border border-[#EEDFCE]">
                    {app.adoption_id}
                  </span>
                  <span className="text-xs font-semibold text-[#8C7A70] flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#E07A5F]" />
                    Applied on {app.application_date}
                  </span>
                </div>

                <div>{getStatusBadge(app.adoption_status)}</div>
              </div>

              {/* Body */}
              <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Pet Image & Name */}
                <div className="md:col-span-5 flex items-center gap-4">
                  <img
                    src={app.pet_image}
                    alt={app.pet_name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-[#F3E8DB] shrink-0"
                  />
                  <div>
                    <h3 className="text-xl font-black text-[#5A4A42]">{app.pet_name}</h3>
                    <p className="text-xs font-bold text-[#8C7A70]">{app.pet_breed}</p>
                    <span className="inline-block mt-2 text-xs font-extrabold text-[#5A4A42]">
                      Fee: ${app.adoption_fee}
                    </span>
                  </div>
                </div>

                {/* Applicant Summary */}
                <div className="md:col-span-7 bg-[#FFFDFB] p-4 rounded-2xl border border-[#F5EDE2] text-xs space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="text-[#8C7A70] font-semibold block">Applicant:</span>
                      <span className="text-[#5A4A42] font-black">{app.applicant_name}</span>
                    </div>
                    <div>
                      <span className="text-[#8C7A70] font-semibold block">Contact:</span>
                      <span className="text-[#5A4A42] font-medium truncate block">{app.applicant_email}</span>
                      <span className="text-[#7D6B62] block">{app.applicant_phone}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#F5EDE2] flex items-center justify-between text-[11px] text-[#8C7A70]">
                    <span className="flex items-center gap-1 truncate max-w-[70%]">
                      <MapPin className="w-3 h-3 text-[#E07A5F] shrink-0" />
                      <span className="truncate">{app.applicant_address}</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold text-[#5A4A42]">
                      <Users className="w-3 h-3 text-[#B7D3B0]" />
                      {app.household_members.length} member{app.household_members.length === 1 ? '' : 's'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="px-6 py-4 bg-[#FAF5EE] border-t border-[#F1E7DA] flex flex-wrap items-center justify-between gap-3 text-xs">
                <button
                  onClick={() => navigateTo('detail', app.pet_id)}
                  className="font-extrabold text-[#5A4A42] hover:text-[#E07A5F] flex items-center gap-1 cursor-pointer"
                >
                  <PawPrint className="w-3.5 h-3.5" />
                  <span>View Pet Profile</span>
                  <ArrowRight className="w-3 h-3 ml-0.5" />
                </button>

                {app.adoption_status === 'Pending' && (
                  <button
                    onClick={() => {
                      if (window.confirm(`Are you sure you want to withdraw your application for ${app.pet_name}?`)) {
                        cancelApplication(app.adoption_id);
                      }
                    }}
                    className="font-bold text-red-500 hover:text-red-700 flex items-center gap-1 cursor-pointer transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Withdraw Application</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EFE5D8] space-y-5 max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-[#FFF8F0] flex items-center justify-center mx-auto text-[#B5A599]">
            <FileText className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="text-xl font-black text-[#5A4A42]">
            {filter === 'All' ? 'No applications yet' : `No ${filter.toLowerCase()} applications`}
          </h3>
          <p className="text-xs sm:text-sm text-[#8C7A70] leading-relaxed">
            {filter === 'All'
              ? 'Find a pet you adore, submit our quick adoption form, and track your adoption status right here.'
              : `You do not have any applications currently marked as ${filter}.`}
          </p>
          <button
            onClick={() => navigateTo('pets')}
            className="px-6 py-3 rounded-2xl bg-[#B7D3B0] text-[#2F542A] font-black text-sm hover:bg-[#a6c99e] transition shadow-xs cursor-pointer inline-flex items-center gap-2"
          >
            <PawPrint className="w-4 h-4" />
            <span>Browse Available Pets</span>
          </button>
        </div>
      )}
    </div>
  );
};
