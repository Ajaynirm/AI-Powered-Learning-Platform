export default function Profile() {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Profile Header */}
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto text-center">
          <img
            src="/profile-pic.png"
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto"
          />
          <h1 className="text-2xl font-bold mt-4">developing </h1>
          <p className="text-gray-600">aj@example.com</p>
        </div>
  
        {/* User Details Section */}
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Profile Information</h2>
          <div className="text-gray-700">
            <p><strong>Full Name:</strong> Ajay Pratik</p>
            <p><strong>Email:</strong> aj@example.com</p>
            <p><strong>Enrolled Courses:</strong> AI for Beginners, Advanced React</p>
            <p><strong>Quiz Progress:</strong> 10% Completed</p>
          </div>
        </div>
  
        {/* Settings & Logout */}
        <div className="max-w-3xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg text-center">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
            Edit Profile
          </button>
          <button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600">
            Logout
          </button>
        </div>
      </div>
    );
  }
  