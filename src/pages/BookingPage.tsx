import React, { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import Card, { CardBody } from '../components/UI/Card';
import AppointmentCalendar from '../components/Booking/AppointmentCalendar';
import BookingForm from '../components/Booking/BookingForm';
import { doctors } from '../data/doctors';
import { Link } from '../components/UI/Link';

interface PatientInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  reasonForVisit: string;
  isNewPatient: boolean;
  insuranceProvider?: string;
}

const BookingPage: React.FC = () => {
  // In a real app, we would get the doctor ID from the route params
  // For this demo, we'll just use the first doctor from our mock data
  const doctor = doctors[0];
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [bookingComplete, setBookingComplete] = useState(false);
  const [confirmationDetails, setConfirmationDetails] = useState<{
    appointmentId: string;
    patientInfo: PatientInfo;
  } | null>(null);
  
  const handleSelectSlot = (date: Date, slotId: string) => {
    setSelectedDate(date);
    setSelectedSlot(slotId);
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };
  
  const handleConfirmBooking = (patientInfo: PatientInfo) => {
    // In a real app, this would send data to the backend to create the appointment
    // For this demo, we'll just simulate a successful booking
    setConfirmationDetails({
      appointmentId: `APT-${Math.floor(Math.random() * 10000)}`,
      patientInfo,
    });
    setBookingComplete(true);
    setCurrentStep(3);
  };

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
  
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href={`/doctors/${doctor.id}`} className="inline-flex items-center text-cyan-700 hover:text-cyan-800">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to doctor profile
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-4">
          {currentStep === 3 ? 'Appointment Confirmed' : 'Book an Appointment'}
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          {currentStep === 3 
            ? 'Your appointment has been successfully scheduled' 
            : `with Dr. ${doctor.name}`}
        </p>
      </div>
      
      {currentStep < 3 && (
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
              currentStep >= 1 ? 'bg-cyan-700 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-2 ${
              currentStep >= 2 ? 'bg-cyan-700' : 'bg-gray-200'
            }`}></div>
            <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
              currentStep >= 2 ? 'bg-cyan-700 text-white' : 'bg-gray-200 text-gray-500'
            }`}>
              2
            </div>
            <div className="flex-1 h-1 mx-2 bg-gray-200"></div>
            <div className="flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-500">
              3
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <div className="text-sm font-medium text-gray-700">Select Date & Time</div>
            <div className="text-sm font-medium text-gray-700">Patient Information</div>
            <div className="text-sm font-medium text-gray-700">Confirmation</div>
          </div>
        </div>
      )}
      
      {!bookingComplete ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className={`md:col-span-${currentStep === 1 ? '3' : '1'}`}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Date & Time</h2>
            <AppointmentCalendar 
              doctorId={doctor.id} 
              onSelectSlot={handleSelectSlot} 
            />
          </div>
          
          {currentStep === 2 && (
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Patient Information</h2>
              <BookingForm 
                doctor={doctor}
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                onConfirm={handleConfirmBooking}
              />
            </div>
          )}
        </div>
      ) : (
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-green-500 py-6 px-6 text-center">
            <div className="bg-white rounded-full h-16 w-16 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">Appointment Confirmed!</h2>
          </div>
          
          <CardBody className="py-6">
            <div className="text-center mb-6">
              <p className="text-gray-600">
                Your appointment has been scheduled successfully. A confirmation has been sent to your email.
              </p>
            </div>
            
            <div className="border-t border-b border-gray-200 py-6 px-4 bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="text-sm font-medium text-gray-500 w-32">Doctor:</div>
                  <div className="text-sm text-gray-900 flex-1">{doctor.name}</div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-sm font-medium text-gray-500 w-32">Date:</div>
                  <div className="text-sm text-gray-900 flex-1">
                    {selectedDate && formatDate(selectedDate)}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-sm font-medium text-gray-500 w-32">Time:</div>
                  <div className="text-sm text-gray-900 flex-1">
                    {selectedSlot && getTimeFromSlotId(selectedSlot)}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-sm font-medium text-gray-500 w-32">Location:</div>
                  <div className="text-sm text-gray-900 flex-1">{doctor.location}</div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-sm font-medium text-gray-500 w-32">Booking ID:</div>
                  <div className="text-sm text-gray-900 flex-1">
                    {confirmationDetails?.appointmentId || 'APT-12345'}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center space-y-4">
              <p className="text-sm text-gray-600">
                Please arrive 15 minutes before your appointment time. 
                Don't forget to bring your insurance card and photo ID.
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/appointments" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-cyan-700 hover:bg-cyan-800"
                >
                  View My Appointments
                </Link>
                <Link 
                  href="/" 
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default BookingPage;