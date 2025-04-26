'use client';
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import GlobalApi from "@/app/_services/GlobalApi";

const MyProfilePage = () => {
  const { data: session } = useSession();

  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    address: '',
    pincode: '',
    email: '',
  });
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        if (session?.user?.email) {
          const fetchedProfile = await GlobalApi.getProfile(session.user.email);
          if (fetchedProfile?.profile) {
            setProfile({
              name: fetchedProfile.profile.name || '',
              phone: fetchedProfile.profile.phoneNumber?.toString() || '',
              address: fetchedProfile.profile.address || '',
              pincode: fetchedProfile.profile.pincode?.toString() || '',
              email: fetchedProfile.profile.email || session.user.email,
            });
          } else {
            setProfile((prev) => ({
              ...prev,
              email: session.user.email,
            }));
          }
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      }
    };

    if (session?.user?.email) {
      fetchProfileData();
    }
  }, [session]);

  const handleSave = async () => {
    try {
      await GlobalApi.createOrUpdateProfile(
        profile.email,
        profile.name,
        profile.phone,
        profile.address,
        profile.pincode
      );

      alert("Profile updated successfully!");
      setEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("Something went wrong!");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#e2eefc] p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row items-start space-x-0 md:space-x-6 mb-8">
          <div className="w-24 h-24 md:w-32 md:h-32 mb-4 md:mb-0">
            <img
              src={session?.user?.image || "/default_profile.jpg"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-[#087cfb] shadow-md"
            />
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Name</label>
              {editing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full border border-[#087cfb] rounded-lg p-2 bg-[#e2eefc] hover:bg-white focus:bg-white transition"
                  placeholder="Enter your name"
                />
              ) : (
                <p className="p-2 bg-[#e2eefc] rounded">{profile.name || "Your Name"}</p>
              )}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Phone Number</label>
              {editing ? (
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full border border-[#087cfb] rounded-lg p-2 bg-[#e2eefc] hover:bg-white focus:bg-white transition"
                  placeholder="+91 1234567890"
                />
              ) : (
                <p className="p-2 bg-[#e2eefc] rounded">{profile.phone || "Phone Number"}</p>
              )}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Address</label>
              {editing ? (
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className="w-full border border-[#087cfb] rounded-lg p-2 bg-[#e2eefc] hover:bg-white focus:bg-white transition"
                  placeholder="Enter your address"
                />
              ) : (
                <p className="p-2 bg-[#e2eefc] rounded">{profile.address || "Address"}</p>
              )}
            </div>
  
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">Pincode</label>
              {editing ? (
                <input
                  type="text"
                  name="pincode"
                  value={profile.pincode}
                  onChange={handleInputChange}
                  className="w-full border border-[#087cfb] rounded-lg p-2 bg-[#e2eefc] hover:bg-white focus:bg-white transition"
                  placeholder="Pincode"
                />
              ) : (
                <p className="p-2 bg-[#e2eefc] rounded">{profile.pincode || "Pincode"}</p>
              )}
            </div>
  
            <div className="md:col-span-1 cursor-not-allowed">
              <label className="block mb-2 text-sm font-semibold text-gray-700">Email</label>
              <p className="p-2 bg-[#e2eefc] rounded">{profile.email}</p>
            </div>
          </div>
        </div>
  
        <div className="flex justify-end mt-6">
          {editing ? (
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#087cfb] text-white rounded-full hover:bg-blue-600 transition"
            >
              Save Changes
            </button>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="px-6 py-2 bg-[#087cfb] text-white rounded-full hover:bg-blue-600 transition"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default MyProfilePage;
