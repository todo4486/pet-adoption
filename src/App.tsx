/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { PetProvider, usePets } from './context/PetContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PetsPage } from './pages/PetsPage';
import { PetDetailPage } from './pages/PetDetailPage';
import { AdoptionFormPage } from './pages/AdoptionFormPage';
import { ApplicationsPage } from './pages/ApplicationsPage';

const AppContent: React.FC = () => {
  const { currentPage } = usePets();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'pets':
        return <PetsPage />;
      case 'detail':
        return <PetDetailPage />;
      case 'apply':
        return <AdoptionFormPage />;
      case 'applications':
        return <ApplicationsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F0] text-[#5A4A42] selection:bg-[#FFCBA4] selection:text-[#5A4A42]">
      {/* Navigation Header */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {renderCurrentPage()}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <PetProvider>
      <AppContent />
    </PetProvider>
  );
}
