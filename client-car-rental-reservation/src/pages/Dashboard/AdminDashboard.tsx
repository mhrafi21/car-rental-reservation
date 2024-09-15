import React from 'react';
import { useGetAllBookingsQuery, useGetAllCarsQuery, useGetAllUsersQuery } from '../../redux/baseApi';
import { TBooking, TCar } from '../../interfaces';
import { FaCalendarCheck, FaCar, FaDollarSign, FaUsers } from 'react-icons/fa';
import DefaultContainer from '../../components/DefaultContainer';

interface OverviewStat {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  bgColor: string;
}

const AdminDashboard: React.FC = () => {

  const {data} = useGetAllBookingsQuery(undefined);
  const {data: Cars} = useGetAllCarsQuery(undefined); 
  const {data: Users} = useGetAllUsersQuery(undefined);

  const availableCarFilter = Cars?.data?.filter((car : TCar) => car?.status === "available");

  const total = data?.data?.reduce((total: number, booking: TBooking) => total + booking?.totalCost , 0)

  const overviewStats: OverviewStat[] = [
    {
      title: 'Total Bookings',
      value: data?.data?.length || 0,
      icon: <FaCalendarCheck />,
      bgColor: 'bg-blue-500',
    },
    {
      title: 'Available Cars',
      value: availableCarFilter?.length || 0,
      icon: <FaCar />,
      bgColor: 'bg-green-500',
    },
    {
      title: 'Revenue',
      value: total || 0,
      icon: <FaDollarSign />,
      bgColor: 'bg-yellow-500',
    },
    {
      title: 'New Customers',
      value: Users?.data?.length || 0,
      icon: <FaUsers />,
      bgColor: 'bg-purple-500',
    },
  ];

  return (
   <DefaultContainer>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6">
        {overviewStats?.map((stat, index) => (
          <div
            key={index}
            className={`flex items-center p-4 rounded-lg shadow-lg ${stat.bgColor} text-white`}
          >
            <div className="text-3xl mr-4">{stat.icon}</div>
            <div>
              <p className="text-lg font-medium">{stat.title}</p>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

   </DefaultContainer>
  );
};

export default AdminDashboard;
