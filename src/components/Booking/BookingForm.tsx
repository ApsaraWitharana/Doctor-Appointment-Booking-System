import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Button from '../UI/Button';
import { Doctor } from '../../types';

interface BookingFormProps {
  doctor: Doctor;
  selectedDate: Date | null;
  selectedSlot: string | null;
  onConfirm: (patientInfo: PatientInfo) => void;
}

interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reasonForVisit: string;
  isNewPatient: boolean;
  insuranceProvider?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({
  doctor,
  selectedDate,
  selectedSlot,
  onConfirm,
}) => {
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reasonForVisit: '',
    isNewPatient: false,
    insuranceProvider: '',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setPatientInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(patientInfo);
  };
  
  // Helper to format the date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };
  
  // Helper to get time from slot ID
  const getTimeFromSlotId = (slotId: string) => {
    // This is a simple example - in a real app, you'd look up the actual time
    return slotId.replace('slot-', '').replace('-', ':');
  };

  const isFormValid = patientInfo.firstName && 
                     patientInfo.lastName && 
                     patientInfo.email && 
                     patientInfo.phone && 
                     patientInfo.reasonForVisit;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Appointment summary */}
      <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4">
        <h3 className="text-md font-medium text-cyan-900 mb-2">Appointment Summary</h3>
        <div className="text-sm text-cyan-800">
          <p><span className="font-medium">Doctor:</span> {doctor.name}</p>
          {selectedDate && (
            <p><span className="font-medium">Date:</span> {formatDate(selectedDate)}</p>
          )}
          {selectedSlot && (
            <p><span className="font-medium">Time:</span> {getTimeFromSlotId(selectedSlot)}</p>
          )}
          <p><span className="font-medium">Location:</span> {doctor.location}</p>
        </div>
      </div>
      
      {/* Personal Information */}
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-3">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={patientInfo.firstName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
              Last Name *
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={patientInfo.lastName}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={patientInfo.email}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={patientInfo.phone}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
              required
            />
          </div>
        </div>
      </div>
      
      {/* Visit Information */}
      <div>
        <h3 className="text-md font-medium text-gray-900 mb-3">Visit Information</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="reasonForVisit" className="block text-sm font-medium text-gray-700 mb-1">
              Reason for Visit *
            </label>
            <textarea
              id="reasonForVisit"
              name="reasonForVisit"
              value={patientInfo.reasonForVisit}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
              required
            />
          </div>
          
          <div className="flex items-center">
            <input
              id="isNewPatient"
              name="isNewPatient"
              type="checkbox"
              checked={patientInfo.isNewPatient}
              onChange={handleChange}
              className="h-4 w-4 text-cyan-700 focus:ring-cyan-700 border-gray-300 rounded"
            />
            <label htmlFor="isNewPatient" className="ml-2 block text-sm text-gray-700">
              I am a new patient
            </label>
          </div>
          
          <div>
            <label htmlFor="insuranceProvider" className="block text-sm font-medium text-gray-700 mb-1">
              Insurance Provider (optional)
            </label>
            <select
              id="insuranceProvider"
              name="insuranceProvider"
              value={patientInfo.insuranceProvider}
              onChange={handleChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700"
            >
              <option value="">Select a provider</option>
              <option value="aetna">Aetna</option>
              <option value="bluecross">Blue Cross Blue Shield</option>
              <option value="cigna">Cigna</option>
              <option value="united">United Healthcare</option>
              <option value="medicare">Medicare</option>
              <option value="medicaid">Medicaid</option>
              <option value="other">Other</option>
              <option value="none">No Insurance</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Note */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-yellow-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              A $25 cancellation fee may apply if you cancel less than 24 hours before your appointment.
            </p>
          </div>
        </div>
      </div>
      
      {/* Submit Button */}
      <div className="flex justify-end">
        <Button 
          type="submit" 
          size="lg" 
          disabled={!selectedDate || !selectedSlot || !isFormValid}
        >
          Confirm Appointment
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;