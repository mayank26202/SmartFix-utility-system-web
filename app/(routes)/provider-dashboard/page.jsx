'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalApi from '@/app/_services/GlobalApi';
import Image from 'next/image';

export default function ProviderDashboard() {
  const [isProvider, setIsProvider] = useState(false);
  const [providerDetails, setProviderDetails] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [showMapPreview, setShowMapPreview] = useState(false);
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
    const upcoming = providerDetails.bookings.filter(b => new Date(b.date) > currentDate);
    const completed = providerDetails.bookings.filter(b => new Date(b.date) <= currentDate);
    setUpcomingBookings(upcoming);
    setCompletedBookings(completed);
  };

  useEffect(() => {
    if (providerDetails) {
      categorizeBookings();
    }
  }, [providerDetails]);

  const handleLogout = () => {
    localStorage.removeItem('providerSession');
    router.push('/');
  };

  const imageArray = providerDetails?.images
    ? Object.values(providerDetails.images)
    : [];

  if (!isProvider || !providerDetails) {
    return <div className="flex justify-center items-center h-screen text-xl text-[#087cfb]">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5 md:px-20 relative">
      <header className="flex justify-between bg-[#087cfb] p-6 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold">Welcome, {providerDetails.contactPerson}!</h1>
        <button
          onClick={handleLogout}
          className="top-6 right-6 bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#0462c9] transition duration-200"
        >
          Logout
        </button>
      </header>

      <section className="mt-10 space-y-6 flex flex-col md:flex-row gap-6">
        {/* Provider Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
          {imageArray.length > 0 && (
            <div className="flex justify-center mb-6">
              <img
                src={imageArray[0].url}
                alt="Provider"
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

          {/* Gallery Section */}
          {imageArray.length > 0 && (
            <div className="mt-8">
              <h2 className="font-bold text-[22px] text-gray-800">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {imageArray.map((item, index) => (
                  <Image
                    key={index}
                    src={item.url}
                    alt={`image-${index}`}
                    width={700}
                    height={100}
                    className="rounded-lg h-[150px] object-cover w-full"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Map */}
          <div className="mt-6">
            <p className="text-lg font-semibold text-gray-700 mb-2">Society's Map:</p>
            <div
              onClick={() => setShowMapPreview(true)}
              className="cursor-pointer hover:opacity-90 transition"
            >
              <img
                src="/map.png"
                alt="Society Map"
                className="w-full h-40 object-cover rounded-md shadow-md"
              />
              <p className="text-center text-sm text-gray-500 mt-1">Click to view larger map</p>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-2/3">
          <h3 className="text-2xl font-semibold text-[#087cfb]">Upcoming Bookings</h3>
          {upcomingBookings.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {upcomingBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No upcoming bookings.</p>
          )}

          <h3 className="text-2xl font-semibold text-[#087cfb] mt-8">Completed Bookings</h3>
          {completedBookings.length > 0 ? (
            <ul className="mt-4 space-y-4">
              {completedBookings.map(booking => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </ul>
          ) : (
            <p className="mt-4 text-gray-600">No completed bookings.</p>
          )}
        </div>
      </section>

      {/* Map Preview Modal */}
      {showMapPreview && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex justify-center items-center overflow-auto">
          <button
            onClick={() => setShowMapPreview(false)}
            className="absolute top-4 right-6 text-black bg-white text-5xl font-bold rounded-full px-4 py-2 hover:bg-gray-200 transition z-50"
          >
            &times;
          </button>
          <div className="p-4 max-w-5xl w-full">
            <img
              src="/map.png"
              alt="Full Map"
              className="w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border-4 border-white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const BookingCard = ({ booking }) => {
  const [customerProfile, setCustomerProfile] = useState(null);

  useEffect(() => {
    const fetchCustomerProfile = async () => {
      try {
        const res = await GlobalApi.getProfile(booking.userEmail);
        if (res?.profile) {
          setCustomerProfile(res.profile);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchCustomerProfile();
  }, [booking.userEmail]);

  return (
    <li className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <div className="space-y-1">
        <p><strong>Customer's Name:</strong> {booking.userName}</p>
        <p><strong>Customer's Email:</strong> {booking.userEmail}</p>
        <p><strong>Time:</strong> {booking.time}</p>
        <p><strong>Date:</strong> {booking.date}</p>
      </div>
      {customerProfile && (
        <div className="mt-2 space-y-1">
          <p><strong>Phone No.:</strong> {customerProfile.phoneNumber}</p>
          <p><strong>Address:</strong> {customerProfile.address}</p>
        </div>
      )}
    </li>
  );
};
