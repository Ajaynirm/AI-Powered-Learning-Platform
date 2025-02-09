export default function Home() {
    return (
      <div className="bg-gray-100 min-h-screen">
        {/* Hero Section */}
        <header className="bg-blue-500 text-white py-20 text-center">
          <h1 className="text-4xl font-bold">AI-Powered Personalized Learning</h1>
          <p className="mt-4 text-lg">Enhance your learning experience with AI-driven recommendations.</p>
          <button className="mt-6 bg-white text-blue-500 px-6 py-2 rounded-lg font-semibold hover:bg-gray-200">
            Get Started
          </button>
        </header>
  
        {/* Features Section */}
        <section className="container mx-auto py-16 px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">AI-Based Recommendations</h3>
              <p className="mt-2 text-gray-600">Personalized course suggestions based on your learning behavior.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">Adaptive Quizzes</h3>
              <p className="mt-2 text-gray-600">AI dynamically adjusts quiz difficulty to match your skill level.</p>
            </div>
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <h3 className="text-xl font-bold">AI Chatbot Support</h3>
              <p className="mt-2 text-gray-600">Instant learning assistance from an AI-powered chatbot.</p>
            </div>
          </div>
        </section>
  
        {/* Testimonials Section */}
        <section className="bg-gray-200 py-16 text-center">
          <h2 className="text-3xl font-bold mb-8">What Our Learners Say</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 shadow-lg rounded-lg">
              <p className="text-gray-700">"This platform transformed my learning journey! AI-powered quizzes helped me improve significantly."</p>
              <span className="block mt-4 font-semibold">- Alex, Student</span>
            </div>
          </div>
        </section>
  
        {/* Call to Action */}
        <footer className="text-center py-12">
          <h2 className="text-2xl font-bold">Start Learning Today!</h2>
          <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600">
            Join Now
          </button>
        </footer>
      </div>
    );
  }
  