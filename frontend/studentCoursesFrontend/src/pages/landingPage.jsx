import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <main className="w-full px-4 md:px-8 py-8 bg-gradient-to-br from-purple-50 via-white to-blue-50 flex-1">
      <div className="max-w-7xl mx-auto">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-fit">
          {/* Left Copy Section - spans 2 columns */}
          <div className="lg:col-span-2 rounded-2xl border border-gray-200 bg-white shadow-lg p-8 md:p-12">
            <span className="inline-flex w-fit px-3 py-1.5 rounded-full bg-purple-100 text-purple-600 text-xs font-bold tracking-widest uppercase">
              Student Course API
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4 mb-4">
              Manage students and courses from one clean dashboard.
            </h1>

            <p className="text-base md:text-lg leading-relaxed text-gray-600 mb-6">
              Register students, create courses, and enroll learners without the
              clutter. Built for fast classroom and course management workflows.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 mb-8">
              <Link
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-lg hover:shadow-xl hover:scale-105 transition-all"
                to="/register"
              >
                Get Started
              </Link>
              <Link
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-bold text-gray-900 bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-all"
                to="/login"
              >
                Login
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <strong className="block text-gray-900 font-semibold">
                  Students
                </strong>
                <span className="text-sm text-gray-600">
                  Register and authenticate users securely
                </span>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <strong className="block text-gray-900 font-semibold">
                  Courses
                </strong>
                <span className="text-sm text-gray-600">
                  Create and organize course listings
                </span>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                <strong className="block text-gray-900 font-semibold">
                  Enrollments
                </strong>
                <span className="text-sm text-gray-600">
                  Connect students to courses in one request
                </span>
              </div>
            </div>
          </div>

          {/* Right Panel Section */}
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg p-6 flex flex-col gap-4">
            {/* Quick Actions Card */}
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50">
              <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-2">
                Quick actions
              </p>
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Ready for API testing
              </h2>
              <ul className="space-y-1 text-sm text-gray-700">
                <li>• POST /auth/register</li>
                <li>• POST /auth/login</li>
                <li>• POST /courses/:id/enroll</li>
              </ul>
            </div>

            {/* Status Card */}
            <div className="p-5 rounded-xl border border-gray-200 bg-gray-50 flex-1">
              <p className="text-purple-600 text-xs font-bold uppercase tracking-wider mb-3">
                Status
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm text-gray-900">
                    Backend connected
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-blue-500" />
                  <span className="text-sm text-gray-900">Frontend ready</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span className="text-sm text-gray-900">
                    Enrollment flow active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
export default LandingPage;
