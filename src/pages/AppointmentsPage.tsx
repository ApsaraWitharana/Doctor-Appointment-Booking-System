import React from 'react';
import AppointmentList from '../components/Appointments/AppointmentList';
import { appointments } from '../data/appointments';

const AppointmentsPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
        <p className="mt-2 text-lg text-gray-600">
          Manage your upcoming and past appointments
        </p>
      </div>
      
      <AppointmentList appointments={appointments} />
    </div>
  );
};

export default AppointmentsPage;