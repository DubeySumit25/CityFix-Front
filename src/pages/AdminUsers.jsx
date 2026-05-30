import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../api/axios";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role !== "ADMIN") {
      navigate("/dashboard");
      return;
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.get("/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load users");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 animate-fade-in-down">
            <h1 className="text-6xl font-black text-gray-900 mb-3 animate-bounce-in">👥 User Management</h1>
            <p className="text-xl text-gray-600 font-semibold">View and manage all registered citizens</p>
          </div>

          {users.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100 animate-fade-in-up">
              <div className="inline-block bg-gradient-to-br from-cyan-100 to-blue-100 p-6 rounded-3xl mb-6 transform hover:scale-110 transition-transform duration-300">
                <div className="text-8xl animate-float">👤</div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">No Users Found</h2>
              <p className="text-gray-600 text-lg font-semibold">There are currently no registered users in the system</p>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 animate-fade-in-up hover:shadow-3xl transition-all duration-300">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-8 py-5 text-left font-black text-lg uppercase tracking-wider">🆔 ID</th>
                      <th className="px-8 py-5 text-left font-black text-lg uppercase tracking-wider">👤 Name</th>
                      <th className="px-8 py-5 text-left font-black text-lg uppercase tracking-wider">📧 Email</th>
                      <th className="px-8 py-5 text-left font-black text-lg uppercase tracking-wider">📱 Phone</th>
                      <th className="px-8 py-5 text-left font-black text-lg uppercase tracking-wider">🎭 Role</th>
                      <th className="px-8 py-5 text-left font-black text-lg uppercase tracking-wider">📅 Joined</th>
                    </tr>
                  </thead>

                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user.id}
                        className={`border-b transition-all duration-300 hover:bg-blue-50 hover:shadow-md group ${
                          index % 2 === 0 ? "bg-white" : "bg-gray-50"
                        }`}
                      >
                        <td className="px-8 py-5 font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300">#{user.id}</td>
                        <td className="px-8 py-5 font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors duration-300 transform group-hover:scale-105 duration-300">{user.name}</td>
                        <td className="px-8 py-5 text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">{user.email}</td>
                        <td className="px-8 py-5 text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">{user.phoneNumber || "—"}</td>
                        <td className="px-8 py-5">
                          <span className={`inline-flex items-center gap-2 font-bold py-2 px-4 rounded-xl whitespace-nowrap text-white transform group-hover:scale-110 transition-all duration-300 ${
                            user.role === 'ADMIN' 
                              ? 'bg-gradient-to-r from-red-500 to-red-600' 
                              : 'bg-gradient-to-r from-green-500 to-emerald-500'
                          }`}>
                            {user.role === 'ADMIN' ? '🛡️ Admin' : '👨 User'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-gray-700 font-medium group-hover:text-blue-600 transition-colors duration-300">
                          {new Date(user.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric"
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-8 py-6 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <span className="font-bold text-gray-900 text-lg transform hover:scale-110 transition-transform duration-300 cursor-default">Total Users: <span className="text-blue-600 font-black text-2xl">{ users.length}</span></span>
                <span className="font-bold text-gray-900 text-lg transform hover:scale-110 transition-transform duration-300 cursor-default">Admins: <span className="text-red-600 font-black text-2xl">{users.filter(u => u.role === 'ADMIN').length}</span></span>
                <span className="font-bold text-gray-900 text-lg transform hover:scale-110 transition-transform duration-300 cursor-default">Regular Users: <span className="text-green-600 font-black text-2xl">{users.filter(u => u.role !== 'ADMIN').length}</span></span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminUsers;
