'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import GlobalApi from '@/app/_services/GlobalApi';
import Image from 'next/image';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Star } from 'lucide-react';
import EarningsTab from './_components/EarningsTab';



export default function ProviderDashboard() {
  const [isProvider, setIsProvider] = useState(false);
  const [providerDetails, setProviderDetails] = useState(null);
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [showMapPreview, setShowMapPreview] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
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
            const business = details.businessList;
            setProviderDetails(business);
            categorizeBookings(business.bookings);
            const reviewRes = await GlobalApi.getReviews(business.id);
            if (reviewRes && reviewRes.reviews) {
              setReviews(reviewRes.reviews);
              calculateAverageRating(reviewRes.reviews);
            }
          }
        };
        fetchProviderDetails();
      } else {
        router.push('/');
      }
    }
  }, [router]);

  const categorizeBookings = (bookings) => {
    const currentDate = new Date();
    const upcoming = bookings.filter(b => new Date(b.date) > currentDate);
    const completed = bookings.filter(b => new Date(b.date) <= currentDate);
    setUpcomingBookings(upcoming);
    setCompletedBookings(completed);
  };

  const calculateAverageRating = (reviews) => {
    const totalRatings = reviews.reduce((acc, review) => acc + review.rating, 0);
    const avg = totalRatings / reviews.length;
    setAvgRating(avg);
  };

  const handleLogout = () => {
    localStorage.removeItem('providerSession');
    router.push('/');
  };

  const imageArray = providerDetails?.images ? Object.values(providerDetails.images) : [];

  const toggleMapPreview = () => {
    setShowMapPreview(prev => !prev);
  };

  if (!isProvider || !providerDetails) {
    return <div className="flex justify-center items-center h-screen text-xl text-[#087cfb]">Loading...</div>;
  }

  return (
    <div className="bg-gray-100 py-10 px-5 md:px-20 relative">

      <header className="flex justify-between bg-white shadow-xl rounded-2xl p-4 border border-gray-100 w-full text-[#087cfb]">
        <div className='flex items-center gap-2'>
          <Image src='/logo.svg' alt='logo' width={40} height={200} ></Image>
          <h2 className="text-[#087cfb] font-bold text-4xl tracking-wide font-sans">
            SmartFix <span className="ml-80 text-black font-bold text-xl tracking-wide font-sans">Provider's Dashboard</span>
          </h2>
        </div>

        <button
          onClick={handleLogout}
          className="top-6 right-6 bg-red-600 text-white py-2 px-6 rounded-lg shadow-md hover:bg-[#0462c9] transition duration-200"
        >
          Logout
        </button>
      </header>

      <div className="flex space-x-6 mt-4">
  {/* Left side (Provider Details) */}
  <div className="w-full md:w-2/3 bg-white shadow-xl rounded-2xl p-6 border border-gray-100 space-y-4 flex flex-col">
    <h1 className="text-xl font-bold mb-2">Welcome, {providerDetails.contactPerson}!</h1>
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
      <p className="text-l font-extrabold">{providerDetails.name}</p>
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
  </div>

  {/* Right side (Tabs) */}
  <div className="w-full mt-2 flex-grow">
  <Tabs defaultValue="bookings" className="flex flex-col h-full">
  <TabsList className="flex gap-2 flex-wrap w-full">
    <TabsTrigger 
      value="bookings" 
      className="text-gray-800 bg-white data-[state=active]:bg-[#e2eefc] data-[state=active]:text-white rounded-md text-lg py-3 px-6"
    >
      Bookings
    </TabsTrigger>
    <TabsTrigger 
      value="map" 
      className="text-gray-800 bg-white data-[state=active]:bg-[#e2eefc] data-[state=active]:text-white rounded-md text-lg py-3 px-6"
    >
      Society Map
    </TabsTrigger>
    <TabsTrigger 
      value="reviews" 
      className="text-gray-800 bg-white data-[state=active]:bg-[#e2eefc] data-[state=active]:text-white rounded-md text-lg py-3 px-6"
    >
      Reviews
    </TabsTrigger>
    <TabsTrigger 
      value="earnings" 
      className="text-gray-800 bg-white data-[state=active]:bg-[#e2eefc] data-[state=active]:text-white rounded-md text-lg py-3 px-6"
    >
      Earnings
    </TabsTrigger>
  </TabsList>


      {/* Bookings Tab */}
      <TabsContent value="bookings" className="flex-grow">
        <section className="space-y-6">
          <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 space-y-4 w-full">
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
      </TabsContent>

      {/* Map Tab */}
      <TabsContent value="map" className="flex-grow">
        <div className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100 space-y-4 w-full">
          <p className="text-2xl font-semibold text-[#087cfb] mt-3 mb-4">Society's Map:</p>
          <div onClick={() => setShowMapPreview(true)} className="cursor-pointer hover:opacity-90 transition">
            <img
              src="/map.png"
              alt="Society Map"
              className="w-full h-full object-cover rounded-md shadow-md"
            />
            <p className="text-center text-sm text-gray-500 mt-1">Click to view larger map</p>
          </div>
        </div>
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
      </TabsContent>

      {/* Reviews Tab */}
      <TabsContent value="reviews" className="flex-grow">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="bg-white">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Customer Reviews</h2>
            <h3 className="text-md font-semibold text-gray-500">Your Average rating</h3>
          </div>

          <div className="flex items-center mb-6 bg-white">
            <p className="text-xl font-bold text-yellow-400">{avgRating.toFixed(1)}</p>
            <div className="ml-2 flex">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={`w-5 h-5 ${index < Math.round(avgRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                />
              ))}
            </div>
          </div>
          {reviews.length > 0 ? (
            <ul className="space-y-10">
              {reviews.map((review) => (
                <li key={review.id} className="border bg-white p-6 rounded-lg shadow-sm">
                  <p className="font-semibold">{review.userName} ({review.userEmail})</p>
                  <p className="text-gray-900">Rating: <span className="text-yellow-600">{review.rating}</span>/5</p>
                  <p className="text-gray-900">{review.reviewText}</p>
                  <p className="text-sm text-gray-900">Date: {review.date}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No reviews yet.</p>
          )}
        </div>
      </TabsContent>

      {/* Earnings Tab */}
      <TabsContent value="earnings" className="flex-grow">
        <EarningsTab allBookings={completedBookings} />
      </TabsContent>
    </Tabs>
  </div>
</div>

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
    <li className="bg-gray-100 p-6 rounded-lg shadow-sm">
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
