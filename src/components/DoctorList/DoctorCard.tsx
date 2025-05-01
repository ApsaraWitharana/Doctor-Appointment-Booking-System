import React from 'react';
import { Star, Clock, MapPin } from 'lucide-react';
import Card, { CardBody, CardFooter } from '../UI/Card';

import { Link } from '../UI/Link';
import { Doctor } from '../../types';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  return (
    <Card className="h-full flex flex-col transition-transform duration-200 hover:scale-[1.02]">
      <div className="relative">
        <img 
          src={doctor.imageUrl} 
          alt={`Dr. ${doctor.name}`} 
          className="w-full h-48 object-cover" 
        />
        {doctor.isAvailable && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Available Today
          </div>
        )}
      </div>
      
      <CardBody className="flex-grow">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{doctor.name}</h3>
            <p className="text-sm text-gray-600">{doctor.specialty}</p>
          </div>
          <div className="flex items-center bg-amber-50 px-2 py-1 rounded">
            <Star className="h-4 w-4 text-amber-500 mr-1" />
            <span className="text-sm font-medium text-gray-900">{doctor.rating}</span>
          </div>
        </div>
        
        <div className="mt-3 space-y-2">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{doctor.location}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 text-gray-400 mr-2" />
            <span>{doctor.availability}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-900 mb-1">Specializes in:</h4>
          <div className="flex flex-wrap gap-1.5">
            {doctor.specialties.map((specialty, index) => (
              <span 
                key={index} 
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </CardBody>
      
      <CardFooter className="pt-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <Link 
            href={`/doctors/${doctor.id}`} 
            className="text-center flex-grow sm:flex-grow-0 px-4 py-2 text-sm font-medium rounded-md text-cyan-700 bg-white border border-cyan-700 hover:bg-cyan-50 transition-colors"
          >
            View Profile
          </Link>
          <Link
              href={`/booking/${doctor.id}`}
              className="flex-grow inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800 transition-colors"
          >
            Book Appointment
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default DoctorCard;