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
    <div className="min-h-screen bg-[#e2eefc] p-4 sm:p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-8 mb-8">
          <div className="w-24 h-24 sm:w-32 sm:h-32">
            <img
              src={session?.user?.image || "/default_profile.jpg"}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border-4 border-[#087cfb] shadow-md"
            />
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { label: "Name", key: "name", placeholder: "Enter your name" },
              { label: "Phone Number", key: "phone", placeholder: "+91 1234567890" },
              { label: "Address", key: "address", placeholder: "Enter your address" },
              { label: "Pincode", key: "pincode", placeholder: "Pincode" },
            ].map(({ label, key, placeholder }) => (
              <div key={key}>
                <label className="block mb-1 text-sm font-semibold text-gray-700">{label}</label>
                {editing ? (
                  <input
                    type="text"
                    name={key}
                    value={profile[key]}
                    onChange={handleInputChange}
                    className="w-full border border-[#087cfb] rounded-lg p-2 bg-[#e2eefc] hover:bg-white focus:bg-white transition"
                    placeholder={placeholder}
                  />
                ) : (
                  <p className="p-2 bg-[#e2eefc] rounded">{profile[key] || placeholder}</p>
                )}
              </div>
            ))}

            {/* Email (readonly) */}
            <div className="sm:col-span-2">
              <label className="block mb-1 text-sm font-semibold text-gray-700">Email</label>
              <p className="p-2 bg-[#e2eefc] rounded cursor-not-allowed">{profile.email}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center sm:justify-end mt-4 sm:mt-6">
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
