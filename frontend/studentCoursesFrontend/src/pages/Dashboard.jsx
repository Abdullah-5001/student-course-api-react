// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    // Fetch courses when the component mounts
    const fetchCourses = async () => {
      try {
        const response = await API.get("/courses");
        // Handle both array and object with data property
        const courseData = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];
        setCourses(courseData);
      } catch (error) {
        console.error("Failed to fetch courses", error);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      // Trigger the many-to-many enrollment logic on the backend
      await API.post(`/courses/${courseId}/enroll`, { studentId });
      alert("Successfully enrolled!");
    } catch (error) {
      alert(error.response?.data?.message || "Enrollment failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 flex justify-between items-center">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Course Catalog
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-all"
          >
            Log Out
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course._id}
                className="rounded-2xl border border-gray-200 bg-white shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm">
                    {course.description}
                  </p>
                  <div className="mb-4 py-3 border-t border-b border-gray-200">
                    <p className="text-sm text-gray-700">
                      <strong>Instructor:</strong> {course.instructor}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEnroll(course._id)}
                    className="w-full py-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold rounded-lg hover:shadow-lg hover:scale-105 transition-all"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No courses available at the moment.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
