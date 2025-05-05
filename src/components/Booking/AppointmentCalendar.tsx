import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface AppointmentCalendarProps {
  doctorId: string;
  onSelectSlot: (date: Date, slotId: string) => void;
}

const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ 
  doctorId, 
  onSelectSlot 
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Generate dates for the current month view
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  
  // Mock time slots - in a real app, these would come from an API based on doctor availability
  const generateTimeSlots = (): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    // Generate time slots from 9 AM to 5 PM with 30-minute intervals
    for (let hour = 9; hour < 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeString = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        slots.push({
          id: `slot-${timeString}`,
          time: `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`,
          isAvailable: Math.random() > 0.3, // Randomly mark some slots as unavailable
        });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDate(null);
    setSelectedSlot(null);
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(year, month, day);
    setSelectedDate(newDate);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slotId: string) => {
    setSelectedSlot(slotId);
    if (selectedDate) {
      onSelectSlot(selectedDate, slotId);
    }
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isPastDay = (day: number) => {
    const today = new Date();
    const checkDate = new Date(year, month, day);
    
    // Set both dates to start of day for accurate comparison
    today.setHours(0, 0, 0, 0);
    checkDate.setHours(0, 0, 0, 0);
    
    return checkDate < today;
  };

  const isSelectedDate = (day: number) => {
    return (
      selectedDate &&
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  // Create calendar days array with empty cells for preceding days
  const calendarDays = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    calendarDays.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  // Format month name
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {monthNames[month]} {year}
          </h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevMonth}
              className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1.5 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white p-3">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-1">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => (
            <div key={i}>
              {day !== null ? (
                <button
                  onClick={() => handleDateClick(day)}
                  disabled={isPastDay(day)}
                  className={`
                    w-full aspect-square flex items-center justify-center text-sm rounded-full
                    ${isToday(day) ? 'bg-cyan-100 text-cyan-800 font-semibold' : ''}
                    ${isSelectedDate(day) ? 'bg-cyan-700 text-white' : ''}
                    ${isPastDay(day) ? 'text-gray-300 cursor-not-allowed' : 'hover:bg-gray-100'}
                    ${!isSelectedDate(day) && !isToday(day) && !isPastDay(day) ? 'text-gray-700' : ''}
                    transition-colors duration-200
                  `}
                >
                  {day}
                </button>
              ) : (
                <div className="w-full aspect-square"></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {selectedDate && (
        <div className="border-t p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Available Times for {monthNames[selectedDate.getMonth()]} {selectedDate.getDate()}, {selectedDate.getFullYear()}
          </h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((slot) => (
              <button
                key={slot.id}
                disabled={!slot.isAvailable}
                onClick={() => handleSlotClick(slot.id)}
                className={`
                  py-2 px-1 text-xs sm:text-sm rounded-md border text-center
                  ${slot.isAvailable 
                    ? (selectedSlot === slot.id 
                      ? 'bg-cyan-700 text-white border-cyan-700' 
                      : 'border-gray-300 hover:border-cyan-500 text-gray-700')
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'}
                  transition-colors duration-200
                `}
              >
                {slot.time}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendar;