import React from 'react';
import { Calendar, Clock, MapPin, AlertCircle } from 'lucide-react';
import Button from '../UI/Button';
import Card, { CardBody, CardFooter } from '../UI/Card';
import { Appointment } from '../../types';

interface AppointmentItemProps {
  appointment: Appointment;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}

const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  onReschedule,
  onCancel,
}) => {
  const isPast = new Date(appointment.date) < new Date();
  const isToday = new Date(appointment.date).toDateString() === new Date().toDateString();

  const getStatusBadge = () => {
    if (isPast) {
      return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">Completed</span>;
    }
    
    if (isToday) {
      return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Today</span>;
    }
    
    return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800">Upcoming</span>;
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardBody>
        <div className="flex justify-between items-start">
          <div className="flex items-center">
            <img 
              src={appointment.doctorImageUrl} 
              alt={appointment.doctorName} 
              className="h-12 w-12 rounded-full object-cover mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Dr. {appointment.doctorName}</h3>
              <p className="text-sm text-gray-600">{appointment.specialty}</p>
            </div>
          </div>
          <div>{getStatusBadge()}</div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="h-4 w-4 text-gray-400 mr-2" />
            <span>{formatDate(appointment.date)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <span>{appointment.time}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 sm:col-span-2">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{appointment.location}</span>
          </div>
        </div>
        
        {appointment.notes && (
          <div className="mt-3 p-3 bg-gray-50 rounded-md">
            <h4 className="text-sm font-medium text-gray-900">Appointment Notes:</h4>
            <p className="mt-1 text-sm text-gray-600">{appointment.notes}</p>
          </div>
        )}
        
        {isToday && (
          <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-400 p-3">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  This appointment is scheduled for today. Please arrive 15 minutes early with your insurance card and ID.
                </p>
              </div>
            </div>
          </div>
        )}
      </CardBody>
      
      {!isPast && (
        <CardFooter>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => onReschedule(appointment.id)}
              className="sm:flex-1"
            >
              Reschedule
            </Button>
            <Button
              variant="danger"
              onClick={() => onCancel(appointment.id)}
              className="sm:flex-1"
            >
              Cancel
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
};

export default AppointmentItem;