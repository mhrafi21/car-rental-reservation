import React, { useState } from 'react';
import { useGetBookingQuery } from '../../../redux/baseApi';
import { TBooking } from '../../../interfaces';

interface Booking {
  id: number;
  carName: string;
  bookingDate: string;
  status: 'Approved' | 'Pending' | 'Cancelled';
}

const upcomingBookings: Booking[] = [
  { id: 1, carName: 'Tesla Model 3', bookingDate: '2024-09-20', status: 'Pending' },
  { id: 2, carName: 'BMW X5', bookingDate: '2024-09-15', status: 'Approved' },
];

const pastBookings: Booking[] = [
  { id: 3, carName: 'Audi A6', bookingDate: '2024-08-10', status: 'Cancelled' },
  { id: 4, carName: 'Toyota Corolla', bookingDate: '2024-08-01', status: 'Approved' },
];

const ManageUserBooking: React.FC = () => {
    const { data, isLoading } = useGetBookingQuery(undefined);
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    if(isLoading) return <div>Loading...</div>
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Booking Management</h1>

      <div className="tabs">
        <button
          className={`px-4 py-2 mr-2 rounded ${activeTab === 'upcoming' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('upcoming')}
        >
          Upcoming Bookings
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'past' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('past')}
        >
          Past Bookings
        </button>
      </div>


      <div className="mt-6">
        {activeTab === 'upcoming' ? (
            data?.data.map((bookings : TBooking )=> <BookingList bookings={bookings} showActions />)
        ) : (
          <BookingList bookings={pastBookings} />
        )}
      </div>
    </div>
  );
};

interface BookingListProps {
  bookings: Booking[];
  showActions?: boolean;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, showActions = false }) => {
  return (
    <div>
      { data?.data.map((booking: TBooking) => (
        <div key={booking._id} className="p-4 mb-4 bg-white shadow rounded-md">
          <h2 className="text-xl font-semibold">{booking.car.name}</h2>
          <p className="text-gray-600">Booking Date: {booking.startTime}</p>
          <p className={`status ${getStatusClass(booking.status)} mt-2`}>{booking.status}</p>

          {showActions && booking?.status === 'Pending' && (
            <div className="mt-4 flex space-x-4">
              <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                Modify
              </button>
              <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                Cancel
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

const getStatusClass = (status: 'Approved' | 'Pending' | 'Cancelled') => {
  switch (status) {
    case 'Approved':
      return 'text-green-500';
    case 'Pending':
      return 'text-yellow-500';
    case 'Cancelled':
      return 'text-red-500';
  }
};

export default ManageUserBooking;
