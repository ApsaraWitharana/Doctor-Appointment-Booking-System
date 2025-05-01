import React, { useState } from 'react';
import DoctorCard from './DoctorCard';
import { Filter, Search } from 'lucide-react';
import Button from '../UI/Button';
import { Doctor } from '../../types';

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(null);
  const [availableOnly, setAvailableOnly] = useState(false);

  // Get unique specialties for filter
  const specialties = Array.from(new Set(doctors.flatMap(doctor => doctor.specialties)));

  // Filter doctors based on search and filters
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = 
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = selectedSpecialty 
      ? doctor.specialties.includes(selectedSpecialty)
      : true;
    
    const matchesAvailability = availableOnly 
      ? doctor.isAvailable 
      : true;
    
    return matchesSearch && matchesSpecialty && matchesAvailability;
  });

  const resetFilters = () => {
    setSelectedSpecialty(null);
    setAvailableOnly(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700 sm:text-sm"
            placeholder="Search by doctor name or specialty"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Button 
            variant="outline"
            icon={<Filter className="h-4 w-4" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>
        </div>
      </div>

      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="flex-grow">
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-1">
                Specialty
              </label>
              <select
                id="specialty"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-700 focus:border-cyan-700 sm:text-sm rounded-md"
                value={selectedSpecialty || ''}
                onChange={(e) => setSelectedSpecialty(e.target.value || null)}
              >
                <option value="">All Specialties</option>
                {specialties.map((specialty) => (
                  <option key={specialty} value={specialty}>
                    {specialty}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center">
              <input
                id="available-only"
                name="available-only"
                type="checkbox"
                className="h-4 w-4 text-cyan-700 focus:ring-cyan-700 border-gray-300 rounded"
                checked={availableOnly}
                onChange={(e) => setAvailableOnly(e.target.checked)}
              />
              <label htmlFor="available-only" className="ml-2 block text-sm text-gray-700">
                Available Today
              </label>
            </div>
            <div className="self-end">
              <Button variant="ghost" size="sm" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <DoctorCard key={doctor.id} doctor={doctor} />
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-900">No doctors found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorList;