import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const role = localStorage.getItem("role");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `px-4 py-2 rounded-lg font-semibold transition duration-200 ${
      isActive(path)
        ? "bg-blue-100 text-blue-600"
        : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex justify-between items-center h-20">

         
          <Link
            to={role === "ADMIN" ? "/admin" : "/dashboard"}
            className="flex items-center gap-3"
          >
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-3 rounded-xl">
              <span className="text-2xl">🏛️</span>
            </div>

            <div>
              <h1 className="text-2xl font-black text-blue-600">CityFix</h1>
              <p className="text-xs text-gray-500">Municipal Platform</p>
            </div>
          </Link>

          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            ☰
          </button>

          
          <div className={`${mobileMenuOpen ? "flex" : "hidden"} md:flex flex-col md:flex-row gap-2 absolute md:static top-20 left-0 right-0 bg-white md:bg-transparent p-4 md:p-0 shadow-lg md:shadow-none`}>

            {role === "ADMIN" ? (
              <>
                <Link to="/admin" className={linkClass("/admin")}>
                  📊 Complaints
                </Link>

                <Link to="/admin/users" className={linkClass("/admin/users")}>
                  👥 Users
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className={linkClass("/dashboard")}>
                  🏠 Home
                </Link>

                <Link to="/create-complaint" className={linkClass("/create-complaint")}>
                  📝 Report
                </Link>

                <Link to="/my-complaints" className={linkClass("/my-complaints")}>
                  📋 My Reports
                </Link>
              </>
            )}

            <button
              onClick={logout}
              className="px-4 py-2 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 md:hidden"
            >
              🚪 Logout
            </button>

          </div>

          
          <button
            onClick={logout}
            className="hidden md:block bg-red-500 text-white px-6 py-2 rounded-lg font-bold hover:bg-red-600 transition"
          >
            🚪 Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;