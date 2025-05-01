export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  location: string;
  availability: string;
  isAvailable: boolean;
  specialties: string[];
}

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorImageUrl: string;
  specialty: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'today' | 'completed' | 'cancelled';
  notes: string;
}