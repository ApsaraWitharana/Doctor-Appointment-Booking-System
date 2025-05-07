import React, { useState } from 'react';
import AppointmentItem from './AppointmentItem';
import { CalendarDays, Clock } from 'lucide-react';
import { Appointment } from '../../types';

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments }) => {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  
  const filteredAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (filter === 'upcoming') {
      return appointmentDate >= today;
    } else if (filter === 'past') {
      return appointmentDate < today;
    }
    return true;
  });
  
  const handleReschedule = (id: string) => {
    // In a real app, this would open a reschedule modal or navigate to a reschedule page
    console.log(`Reschedule appointment ${id}`);
  };
  
  const handleCancel = (id: string) => {
    // In a real app, this would show a confirmation dialog and then cancel the appointment
    console.log(`Cancel appointment ${id}`);
  };
  
  const getUpcomingAppointment = () => {
    const now = new Date();
    const upcomingAppointments = appointments
      .filter(app => new Date(app.date) >= now)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    return upcomingAppointments[0];
  };
  
  const nextAppointment = getUpcomingAppointment();
  
  return (
    <div className="space-y-6">
      {nextAppointment && (
        <div className="bg-gradient-to-r from-cyan-700 to-cyan-600 rounded-lg shadow-md overflow-hidden">
          <div className="p-5 text-white">
            <h2 className="text-xl font-semibold mb-3">Your Next Appointment</h2>
            <div className="flex items-start space-x-4">
              <img 
                src={nextAppointment.doctorImageUrl} 
                alt={nextAppointment.doctorName} 
                className="h-16 w-16 rounded-full object-cover border-2 border-white"
              />
              <div>
                <h3 className="text-lg font-medium">Dr. {nextAppointment.doctorName}</h3>
                <p className="text-cyan-100">{nextAppointment.specialty}</p>
                <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:space-x-6">
                  <div className="flex items-center text-white mt-1 sm:mt-0">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(nextAppointment.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-white mt-1 sm:mt-0">
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{nextAppointment.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-cyan-800 px-5 py-3 flex justify-between items-center">
            <span className="text-sm text-cyan-100">Check in available 15 minutes before appointment</span>
            <button className="px-3 py-1 bg-white text-cyan-800 text-sm font-medium rounded hover:bg-cyan-50 transition-colors">
              Check In
            </button>
          </div>
        </div>
      )}
      
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setFilter('upcoming')}
            className={`pb-3 border-b-2 font-medium text-sm ${
              filter === 'upcoming'
                ? 'border-cyan-700 text-cyan-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`pb-3 border-b-2 font-medium text-sm ${
              filter === 'past'
                ? 'border-cyan-700 text-cyan-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Past
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`pb-3 border-b-2 font-medium text-sm ${
              filter === 'all'
                ? 'border-cyan-700 text-cyan-700'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            All
          </button>
        </nav>
      </div>
      
      {filteredAppointments.length > 0 ? (
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              appointment={appointment}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-900">No appointments found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {filter === 'upcoming'
              ? "You don't have any upcoming appointments scheduled."
              : filter === 'past'
              ? "You don't have any past appointments."
              : "You don't have any appointments."}
          </p>
        </div>
      )}
    </div>
  );
};

export default AppointmentList;