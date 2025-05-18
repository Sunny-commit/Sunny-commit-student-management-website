import React from 'react';

const Profile = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Profile</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Personal Information</h2>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">Name: John Doe</p>
              <p className="text-gray-600">Email: john.doe@example.com</p>
              <p className="text-gray-600">Role: Teacher</p>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Contact Information</h2>
            <div className="mt-2 space-y-2">
              <p className="text-gray-600">Phone: (555) 123-4567</p>
              <p className="text-gray-600">Address: 123 Education St, Learning City</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;