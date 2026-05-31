import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
  });

  const [complaints, setComplaints] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  useEffect(() => {
    api
      .get("/complaints/my")
      .then((res) => {
        const data = res.data;

        setComplaints(data);

        setStats({
          total: data.length,
          pending: data.filter((c) => c.status === "PENDING").length,
          resolved: data.filter((c) => c.status === "RESOLVED").length,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <div className="w-64 bg-white/5 border-r border-white/10 p-6">
        <h1 className="text-2xl font-bold mb-8">🏛️ CityFix</h1>

        <nav className="space-y-3">
  <button
    onClick={() => navigate("/dashboard")}
    className="w-full text-left px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20"
  >
    🏠 Dashboard
  </button>

  <button
    onClick={() => navigate("/create-complaint")}
    className="w-full text-left px-4 py-2 rounded-xl hover:bg-white/10"
  >
    ➕ Report Complaint
  </button>

  <button
    onClick={() => navigate("/my-complaints")}
    className="w-full text-left px-4 py-2 rounded-xl hover:bg-white/10"
  >
    📋 My Complaints
  </button>

  {role === "ADMIN" && (
    <button
      onClick={() => navigate("/admin")}
      className="w-full text-left px-4 py-2 rounded-xl hover:bg-white/10"
    >
      🛠️ Admin Panel
    </button>
  )}
</nav>

        <button
          onClick={logout}
          className="mt-10 w-full py-2 rounded-xl bg-red-500 hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-8">

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>

          <div className="text-sm text-slate-400">
            Role: <span className="text-white font-semibold">{role}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-slate-400">Total Complaints</h3>
            <p className="text-3xl font-bold mt-2">{stats.total}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-slate-400">Pending</h3>
            <p className="text-3xl font-bold mt-2 text-yellow-400">
              {stats.pending}
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
            <h3 className="text-slate-400">Resolved</h3>
            <p className="text-3xl font-bold mt-2 text-green-400">
              {stats.resolved}
            </p>
          </div>

        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Recent Complaints</h3>

          <div className="space-y-3">
            {complaints.length > 0 ? (
              complaints.slice(0, 5).map((c) => (
                <div
                  key={c.id}
                  className="bg-white/5 p-4 rounded-xl border border-white/10 flex justify-between"
                >
                  <span>{c.title}</span>

                  <span
                    className={`font-semibold ${
                      c.status === "RESOLVED"
                        ? "text-green-400"
                        : c.status === "PENDING"
                        ? "text-yellow-400"
                        : "text-blue-400"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-slate-400">
                No complaints submitted yet.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;