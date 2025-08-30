export default function Courses() {
  const enrolledCourses = [
    { id: 1, title: "AI for Beginners", description: "Learn the basics of AI and Machine Learning.", progress: 10 },
    { id: 2, title: "Advanced React", description: "Master React with advanced concepts and hooks.", progress: 2 },
  ];

  const availableCourses = [
    { id: 4, title: "JavaScript", description: "Explore Microsoft Azure cloud services.", progress: 0 },
    { id: 5, title: "CSS ", description: "Explore Css.", progress: 0 },
    { id: 6, title: "Java", description: "Learn Java effectively...", progress: 0 },
    { id: 7, title: "Python", description: "Learn Python effectively...", progress: 0 },

    { id: 7, title: "Machine Learning Basics", description: "Understand the core concepts of ML.", progress: 0 },
    { id: 8, title: "Cloud Computing with Azure", description: "Explore Microsoft Azure cloud services.", progress: 0 },
  ];

  return (
    <div className=" min-h-screen p-6">
      {/* Page Header */}
      <div className=" p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold">Courses</h1>
        <p className="text-lg mt-2">Explore and continue your learning journey.</p>
      </div>

      {/* Enrolled Courses */}
      <div className="max-w-4xl mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Enrolled Courses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <div key={course.id} className=" p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className=" mt-2">{course.description}</p>
              <div className="mt-4">
                <p className="text-sm font-semibold">Progress: {course.progress}%</p>
                <div className="w-full  rounded-full h-2.5 mt-2">
                  <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <button className="mt-4 bg-blue-500  px-4 py-2 rounded-lg font-semibold hover:bg-blue-600">
                Continue Learning
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Available Courses */}
      <div className="max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Available Courses</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {availableCourses.map((course) => (
            <div key={course.id} className=" p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className=" mt-2">{course.description}</p>
              <button className="mt-4 bg-green-700 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

  