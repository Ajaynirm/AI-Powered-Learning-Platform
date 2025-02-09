export default function Dashboard() {
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Dashboard Header */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
          <p className="text-lg mt-2">Track your progress and manage your learning journey.</p>
        </div>
  
        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mt-6 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Courses Enrolled</h2>
            <p className="text-2xl font-semibold text-blue-500">5</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Quizzes Completed</h2>
            <p className="text-2xl font-semibold text-green-500">12</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold">Overall Progress</h2>
            <p className="text-2xl font-semibold text-purple-500">80%</p>
          </div>
        </div>
  
        {/* Recent Activity */}
        <div className="max-w-4xl mx-auto mt-6 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <ul className="text-gray-700">
            <li className="p-2 border-b">Completed "AI for Beginners" quiz - 90%</li>
            <li className="p-2 border-b">Enrolled in "Advanced React"</li>
            <li className="p-2">Watched "Machine Learning Basics" tutorial</li>
          </ul>
        </div>
  
        {/* Call to Action */}
        <div className="text-center mt-6">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
            Explore Courses
          </button>
        </div>
      </div>
    );
  }
  