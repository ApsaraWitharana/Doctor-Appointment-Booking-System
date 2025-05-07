import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, Star, Award, FileText, ThumbsUp } from 'lucide-react';
import Button from '../components/UI/Button';
import Card, { CardBody, CardHeader } from '../components/UI/Card';
import { doctors } from '../data/doctors';
import AppointmentCalendar from '../components/Booking/AppointmentCalendar';
import { Link } from '../components/UI/Link';

const DoctorProfile: React.FC = () => {
  // In a real app, we would get the doctor ID from the route params
  // For this demo, we'll just use the first doctor from our mock data
  const doctor = doctors[0];
  
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'location'>('overview');
  const [showBooking, setShowBooking] = useState(false);
  
  const handleSelectSlot = (date: Date, slotId: string) => {
    // In a real app, this would move to the next step in the booking process
    console.log(`Selected date: ${date}, slot: ${slotId}`);
    // Navigate to booking page with the selected info
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-8">
        <div className="bg-gradient-to-r from-cyan-700 to-cyan-600 h-48 relative">
          {doctor.isAvailable && (
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              Available Today
            </div>
          )}
        </div>
        
        <div className="px-6 py-4 sm:px-8 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-24 mb-6">
            <img 
              src={doctor.imageUrl} 
              alt={doctor.name} 
              className="h-32 w-32 sm:h-40 sm:w-40 rounded-full border-4 border-white object-cover"
            />
            <div className="sm:ml-6 mt-4 sm:mt-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{doctor.name}</h1>
              <p className="text-lg text-gray-600">{doctor.specialty}</p>
              <div className="flex items-center mt-2">
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-500 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-900">{doctor.rating}</span>
                </div>
                <span className="mx-2 text-gray-300">•</span>
                <span className="text-sm text-gray-600">{doctor.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-y-2">
            <div className="w-full sm:w-auto sm:flex-1 flex items-center text-sm text-gray-600 mr-6">
              <MapPin className="h-5 w-5 text-gray-400 mr-2" />
              <span>{doctor.location}</span>
            </div>
            <div className="w-full sm:w-auto sm:flex-1 flex items-center text-sm text-gray-600 mr-6">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <span>{doctor.availability}</span>
            </div>
            <div className="w-full sm:w-auto flex">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => setShowBooking(!showBooking)}
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="mb-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-4 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-cyan-700 text-cyan-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-4 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-cyan-700 text-cyan-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reviews
              </button>
              <button
                onClick={() => setActiveTab('location')}
                className={`pb-4 border-b-2 font-medium text-sm ${
                  activeTab === 'location'
                    ? 'border-cyan-700 text-cyan-700'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Location & Hours
              </button>
            </nav>
          </div>
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">About Dr. {doctor.name.split(' ')[1]}</h2>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-700">
                    Dr. {doctor.name} is a board-certified {doctor.specialty.toLowerCase()} with over 10 years of experience. 
                    Specializing in {doctor.specialties.join(', ')}, Dr. {doctor.name.split(' ')[1]} is dedicated to providing 
                    compassionate and comprehensive care to patients of all ages.
                  </p>
                  <p className="mt-4 text-gray-700">
                    After completing medical school at Harvard Medical School, Dr. {doctor.name.split(' ')[1]} completed residency 
                    training at Massachusetts General Hospital and fellowship training at Johns Hopkins Hospital. 
                    {doctor.name.split(' ')[1]} is committed to staying current with the latest medical advances to ensure patients 
                    receive the best possible care.
                  </p>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Specialties</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex flex-wrap gap-2">
                    {doctor.specialties.map((specialty, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Education & Experience</h2>
                </CardHeader>
                <CardBody>
                  <ul className="space-y-4">
                    <li className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <Award className="h-5 w-5 text-cyan-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Board Certification</p>
                        <p className="text-sm text-gray-600">American Board of {doctor.specialty}</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <FileText className="h-5 w-5 text-cyan-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Medical School</p>
                        <p className="text-sm text-gray-600">Harvard Medical School</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <FileText className="h-5 w-5 text-cyan-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Residency</p>
                        <p className="text-sm text-gray-600">Massachusetts General Hospital</p>
                      </div>
                    </li>
                    <li className="flex">
                      <div className="flex-shrink-0 mt-1">
                        <FileText className="h-5 w-5 text-cyan-700" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">Fellowship</p>
                        <p className="text-sm text-gray-600">Johns Hopkins Hospital</p>
                      </div>
                    </li>
                  </ul>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Insurance Accepted</h2>
                </CardHeader>
                <CardBody>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                    {['Blue Cross Blue Shield', 'Aetna', 'Cigna', 'UnitedHealthcare', 'Medicare', 'Medicaid', 'Humana', 'Kaiser Permanente'].map((insurance, index) => (
                      <div key={index} className="flex items-center">
                        <ThumbsUp className="h-4 w-4 text-green-500 mr-2" />
                        <span className="text-sm text-gray-700">{insurance}</span>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Patient Reviews</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {doctor.reviewCount} reviews for Dr. {doctor.name}
                    </p>
                  </div>
                  <div className="flex items-center bg-amber-50 px-3 py-2 rounded-lg">
                    <Star className="h-5 w-5 text-amber-500 fill-current mr-1" />
                    <span className="text-lg font-semibold text-gray-900">{doctor.rating}</span>
                    <span className="text-sm text-gray-600 ml-1">/ 5</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-cyan-100 rounded-full flex items-center justify-center">
                            <span className="font-medium text-cyan-800">{['AB', 'CD', 'EF'][i-1]}</span>
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">{['Alex B.', 'Chris D.', 'Emma F.'][i-1]}</p>
                            <p className="text-xs text-gray-500">Visited for {['Annual Check-up', 'Consultation', 'Follow-up'][i-1]}</p>
                          </div>
                        </div>
                        <div className="flex">
                          {Array(5).fill(0).map((_, j) => (
                            <Star key={j} className={`h-4 w-4 ${j < 5 - (i-1) % 2 ? 'text-amber-500 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700">
                        {[
                          "Dr. Smith is extremely knowledgeable and takes the time to explain everything thoroughly. I never feel rushed during my appointments, and the office staff is very friendly and efficient.",
                          "I had a great experience with Dr. Smith. The wait time was minimal, and he addressed all my concerns. Highly recommended!",
                          "Very professional and caring doctor. Takes time to listen and provides clear explanations. The online booking system is also very convenient."
                        ][i-1]}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Posted on {['May 15, 2025', 'April 28, 2025', 'June 2, 2025'][i-1]}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline">Read More Reviews</Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'location' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Office Location</h2>
                </CardHeader>
                <CardBody>
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-2" />
                    <div>
                      <p className="text-gray-900 font-medium">San Francisco Medical Center</p>
                      <p className="text-gray-600">123 Health Avenue, San Francisco, CA 94103</p>
                    </div>
                  </div>
                  <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                    <p className="text-gray-500 text-sm">Map would be displayed here</p>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row gap-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>(415) 555-1234</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>contact@sfmedical.com</span>
                    </div>
                  </div>
                </CardBody>
              </Card>
              
              <Card>
                <CardHeader>
                  <h2 className="text-xl font-semibold text-gray-900">Office Hours</h2>
                </CardHeader>
                <CardBody>
                  <div className="space-y-2">
                    {[
                      { day: 'Monday', hours: '9:00 AM - 5:00 PM' },
                      { day: 'Tuesday', hours: '9:00 AM - 5:00 PM' },
                      { day: 'Wednesday', hours: '9:00 AM - 5:00 PM' },
                      { day: 'Thursday', hours: '9:00 AM - 5:00 PM' },
                      { day: 'Friday', hours: '9:00 AM - 5:00 PM' },
                      { day: 'Saturday', hours: 'Closed' },
                      { day: 'Sunday', hours: 'Closed' },
                    ].map((schedule, index) => (
                      <div key={index} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="text-sm font-medium text-gray-900">{schedule.day}</div>
                        <div className="text-sm text-gray-600">{schedule.hours}</div>
                      </div>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </div>
          )}
        </div>
        
        <div>
          {showBooking ? (
            <div className="sticky top-20">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Book an Appointment</h2>
              <AppointmentCalendar 
                doctorId={doctor.id} 
                onSelectSlot={handleSelectSlot} 
              />
              <div className="mt-4">
                <Link 
                  href={`/booking/${doctor.id}`} 
                  className="block w-full text-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-700 hover:bg-cyan-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                >
                  Continue Booking
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-cyan-700 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Phone</p>
                    <p className="text-sm text-gray-600">(415) 555-1234</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-cyan-700 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">doctor@example.com</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-cyan-700 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Office Address</p>
                    <p className="text-sm text-gray-600">123 Health Avenue, San Francisco, CA 94103</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-cyan-700 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Availability</p>
                    <p className="text-sm text-gray-600">
                      Mon-Fri, 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
              
              <Button
                className="w-full"
                onClick={() => setShowBooking(true)}
              >
                Book an Appointment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;