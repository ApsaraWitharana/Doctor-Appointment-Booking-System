import React from 'react';
import DoctorList from '../components/DoctorList/DoctorList';
import { doctors } from '../data/doctors';

const DoctorsList: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find a Doctor</h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse through our network of trusted healthcare professionals
        </p>
      </div>
      
      <DoctorList doctors={doctors} />
    </div>
  );
};

export default DoctorsList;