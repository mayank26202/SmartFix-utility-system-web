'use client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import GlobalApi from '@/app/_services/GlobalApi';

export default function ProviderDashboard() {
  const [isProvider, setIsProvider] = useState(false);
  const [providerDetails, setProviderDetails] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const session = localStorage.getItem('providerSession');

    if (!session) {
      router.push('/');
    } else {
      const parsedSession = JSON.parse(session);
      if (parsedSession.role === 'provider') {
        setIsProvider(true);

        const fetchProviderDetails = async () => {
          const details = await GlobalApi.getBussinesByEmail(parsedSession.email);
          if (details && details.businessList) {
            setProviderDetails(details.businessList);
          }
        };

        fetchProviderDetails();
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const categorizeBookings = () => {
    const currentDate = new Date();

    const upcoming = providerDetails.bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return bookingDate > currentDate;
    });

    const completed = providerDetails.bookings.filter((booking) => {
      const bookingDate = new Date(booking.date);
      return bookingDate <= currentDate;
    });

    setUpcomingBookings(upcoming);
    setCompletedBookings(completed);
  }

  useEffect(() => {
    if (providerDetails) {
      categorizeBookings();
    }
  }, [providerDetails]);

  const handleLogout = () => {
    localStorage.removeItem('providerSession');
    router.push('/');
  }

  if (!isProvider || !providerDetails) {
    return <div className="flex justify-center items-center h-screen text-xl text-[#087cfb]">Loading...</div>
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5 md:px-20 relative">
      <header className="flex justify-between bg-[#087cfb] p-6 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold">Welcome, {providerDetails.contactPerson}!</h1>
        <button
          onClick={handleLogout}
          className="top-6 right-6 bg-[red] text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#0462c9] transition duration-200"
        >
          Logout
        </button>
      </header>

      <section className="mt-10 space-y-6 flex flex-col md:flex-row gap-6">
        {/* Provider Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          {providerDetails.images && providerDetails.images.length > 0 && (
            <div className="flex justify-center mb-6">
              <img
                src={providerDetails.images[0].url}
                alt="Provider Image"
                className="w-40 h-40 object-cover rounded-full shadow-lg border-2 border-white"
              />
            </div>
          )}
          <div className="flex justify-center flex-col items-center">
            <p className="text-xl font-extrabold">{providerDetails.name}</p>
            <h2 className="p-1 bg-[#e2eefc] text-[#087cfb] rounded-full text-[15px] mt-2">
              {providerDetails.category.name}
            </h2>
          </div>
          <div className="space-y-4 text-left mt-4 text-gray-700">
            <p><strong>Your Description:</strong> {providerDetails.about}</p>
            <p><strong>Address:</strong> {providerDetails.address}</p>
            <p><strong>Name:</strong> {providerDetails.contactPerson}</p>
            <p><strong>Email:</strong> {providerDetails.email}</p>
          </div>
        </div>

        {/* Bookings Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
          <h3 className="text-2xl font-semibold text-[#087cfb]">Upcoming Bookings</h3>
          {upcomingBookings.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No upcoming bookings.</p>
          )}

          <h3 className="text-2xl font-semibold text-[#087cfb] mt-8">Completed Bookings</h3>
          {completedBookings.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {completedBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No completed bookings.</p>
          )}
        </div>
      </section>
    </div>
  );
}

// Component to show booking and customer profile
const BookingCard = ({ booking }) => {
  const [customerProfile, setCustomerProfile] = useState(null);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const res = await GlobalApi.getProfile(booking.userEmail);
        if (res && res.profile) {
          setCustomerProfile(res.profile);
        }
      } catch (error) {
        console.error('Error fetching profile for', booking.userEmail, error);
      }
    };

    fetchCustomerProfile();
  }, [booking.userEmail]);

  return (
    <li className="bg-gray-50 p-6 rounded-lg shadow-sm">
  {/* Customer details */}
  <div className="space-y-1">
    <div className="flex flex-col">
      <p><strong>Customer's Name:</strong> {booking.userName}</p>
    </div>
    <div className="flex flex-col">
      <p><strong>Customer's Email:</strong> {booking.userEmail}</p>
    </div>
    <div className="flex flex-col">
      <p><strong>Time:</strong> {booking.time}</p>
    </div>
    <div className="flex flex-col">
      <p><strong>Date:</strong> {booking.date}</p>
    </div>
  </div>

  {/* Customer Profile Information */}
  {customerProfile && (
    <div className="mt-1 space-y-1">
      <div className="flex flex-col">
        <p><strong>Phone No.:</strong> {customerProfile.phoneNumber}</p>
      </div>
      <div className="flex flex-col">
        <p><strong>Address:</strong> {customerProfile.address}</p>
      </div>
    </div>
  )}
</li>


  );
};
