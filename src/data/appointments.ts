import { Appointment } from '../types';
import { doctors } from './doctors';

// Get images from doctors data
const getImageUrl = (doctorId: string) => {
  const doctor = doctors.find(d => d.id === doctorId);
  return doctor ? doctor.imageUrl : '';
};

export const appointments: Appointment[] = [
  {
    id: 'apt-1',
    doctorId: '1',
    doctorName: 'Sarah Smith',
    doctorImageUrl: getImageUrl('1'),
    specialty: 'Cardiologist',
    date: '2025-06-15',
    time: '10:30 AM',
    location: 'San Francisco Medical Center, 123 Health Ave, San Francisco, CA 94103',
    status: 'upcoming',
    notes: 'Annual heart checkup. Please bring your list of current medications.',
  },
  {
    id: 'apt-2',
    doctorId: '3',
    doctorName: 'Emily Chen',
    doctorImageUrl: getImageUrl('3'),
    specialty: 'Pediatrician',
    date: new Date().toISOString().split('T')[0], // Today's date
    time: '3:00 PM',
    location: 'Children\'s Health Center, 456 Kid\'s Way, San Francisco, CA 94107',
    status: 'today',
    notes: 'Vaccination appointment. Bring vaccination record.',
  },
  {
    id: 'apt-3',
    doctorId: '6',
    doctorName: 'James Davis',
    doctorImageUrl: getImageUrl('6'),
    specialty: 'Family Medicine',
    date: '2025-05-20',
    time: '9:15 AM',
    location: 'Community Health Clinic, 789 Main St, San Francisco, CA 94110',
    status: 'completed',
    notes: '',
  },
  {
    id: 'apt-4',
    doctorId: '5',
    doctorName: 'Lisa Thompson',
    doctorImageUrl: getImageUrl('5'),
    specialty: 'Neurologist',
    date: '2024-05-10',
    time: '2:45 PM',
    location: 'Neuroscience Center, 555 Brain St, San Francisco, CA 94115',
    status: 'completed',
    notes: 'Follow-up appointment for headache treatment.',
  },
];