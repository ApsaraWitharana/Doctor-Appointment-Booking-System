import React from 'react';
import { Search, Calendar, FileText, Star } from 'lucide-react';
import Button from '../components/UI/Button';
import { Link } from '../components/UI/Link';
import { topDoctors } from '../data/doctors';
import DoctorCard from '../components/DoctorList/DoctorCard';

const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-cyan-700 to-cyan-600 rounded-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-pattern"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              Book Your Doctor Appointment with Ease
            </h1>
            <p className="mt-4 text-xl text-cyan-100">
              Find the right doctors, book appointments, and manage your health all in one place.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link 
                href="/doctors" 
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-cyan-700 bg-white hover:bg-cyan-50 transition-colors"
              >
                Find a Doctor
              </Link>
              <Link 
                href="/appointments" 
                className="inline-flex items-center justify-center px-6 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-cyan-600 transition-colors"
              >
                Manage Appointments
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Find a Doctor Near You</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700 sm:text-sm"
                placeholder="Search by specialty, doctor name, or condition"
              />
            </div>
            <div className="w-full md:w-1/3">
              <input
                type="text"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-700 focus:border-cyan-700 sm:text-sm"
                placeholder="Location: City, State, or ZIP"
              />
            </div>
            <div>
              <Button size="lg">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Book appointments with top doctors in just a few simple steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-cyan-100 rounded-full mb-4">
              <Search className="h-6 w-6 text-cyan-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Find a Doctor</h3>
            <p className="text-gray-600">
              Search for doctors by specialty, location, availability, or insurance coverage.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-cyan-100 rounded-full mb-4">
              <Calendar className="h-6 w-6 text-cyan-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Book Appointment</h3>
            <p className="text-gray-600">
              Select a convenient time slot from the doctor's availability calendar.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-cyan-100 rounded-full mb-4">
              <FileText className="h-6 w-6 text-cyan-700" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Receive Confirmation</h3>
            <p className="text-gray-600">
              Get instant confirmation and reminders for your upcoming appointments.
            </p>
          </div>
        </div>
      </section>
      
      {/* Popular Doctors Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Top-Rated Doctors</h2>
          <Link href="/doctors" className="text-cyan-700 hover:text-cyan-800 font-medium">
            View All
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-gray-50 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Patients Say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Thousands of patients trust us for their healthcare needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  "MediBook made finding a specialist so easy. I was able to book an appointment the same day and the doctor was excellent. The entire process was smooth and hassle-free."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-semibold">{['JD', 'SM', 'RK'][i-1]}</span>
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-semibold text-gray-900">{['John D.', 'Sarah M.', 'Robert K.'][i-1]}</h4>
                    <p className="text-xs text-gray-500">Verified Patient</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;