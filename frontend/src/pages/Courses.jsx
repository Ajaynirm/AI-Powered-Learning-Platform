export default function Courses() {
    const courses = [
      { id: 1, title: "AI for Beginners", description: "Learn the basics of AI and Machine Learning.", progress: 75 },
      { id: 2, title: "Advanced React", description: "Master React with advanced concepts and hooks.", progress: 50 },
      { id: 3, title: "Machine Learning Basics", description: "Understand the core concepts of ML.", progress: 90 },
      { id: 4, title: "Cloud Computing with Azure", description: "Explore Microsoft Azure cloud services.", progress: 30 },
    ];
  
    return (
      <div className="bg-gray-100 min-h-screen p-6">
        {/* Page Header */}
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl font-bold">Available Courses</h1>
          <p className="text-lg mt-2">Explore and continue your learning journey.</p>
        </div>
  
        {/* Courses List */}
        <div className="max-w-4xl mx-auto mt-6 grid md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <div key={course.id} className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-700 mt-2">{course.description}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold">Progress: {course.progress}%</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
  