import { useEffect, useState } from "react";
import api from "../api/axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const fetchComplaints = async () => {
    try {
      const res = await api.get("/admin/complaints");
      setComplaints(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/admin/complaints/${id}/status?status=${status}`);
      setComplaints((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status } : c))
      );
    } catch (err) {
      console.log(err);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await api.delete(`/admin/complaints/${id}`);
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const filteredComplaints = complaints
    .filter((c) => c.title?.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => filter === "ALL" || c.status === filter);

  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING": return "text-yellow-400";
      case "IN_PROGRESS": return "text-blue-400";
      case "RESOLVED": return "text-green-400";
      default: return "text-slate-400";
    }
  };

  const chartData = [
    { name: "Pending", value: complaints.filter((c) => c.status === "PENDING").length },
    { name: "In Progress", value: complaints.filter((c) => c.status === "IN_PROGRESS").length },
    { name: "Resolved", value: complaints.filter((c) => c.status === "RESOLVED").length },
  ];

  const COLORS = ["#facc15", "#3b82f6", "#22c55e"];

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="flex flex-wrap gap-3 mb-4">
        {["ALL", "PENDING", "IN_PROGRESS", "RESOLVED"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl border border-white/10 ${filter === f ? "bg-indigo-500" : "bg-white/5"}`}>
            {f}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full md:w-1/3 px-4 py-2 mb-6 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-400"
      />

      <div className="bg-white/5 border border-white/10 p-6 rounded-2xl mb-8 h-72">
        <h2 className="text-lg font-semibold mb-4">Complaint Status Overview</h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={100} label>
              {chartData.map((_, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border border-white/10 rounded-xl overflow-hidden">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Location</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredComplaints.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-slate-400">
                  No complaints found
                </td>
              </tr>
            ) : (
              filteredComplaints.map((c) => (
                <tr key={c.id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.title}</td>
                  <td className="p-3 text-slate-300">{c.location}</td>
                  <td className="p-3 text-slate-300">{c.category}</td>
                  <td className={`p-3 font-semibold ${getStatusColor(c.status)}`}>{c.status}</td>
                  <td className="p-3">
                    {c.imageUrl ? (
                      <a href={c.imageUrl} target="_blank" rel="noreferrer">
                        <img src={c.imageUrl} alt="complaint" className="w-12 h-12 object-cover rounded-lg hover:scale-110 transition" />
                      </a>
                    ) : (
                      <span className="text-slate-500 text-sm">No image</span>
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-2">
                      <button onClick={() => updateStatus(c.id, "IN_PROGRESS")}
                        className="px-2 py-1 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm">
                        In Progress
                      </button>
                      <button onClick={() => updateStatus(c.id, "RESOLVED")}
                        className="px-2 py-1 bg-green-500 hover:bg-green-600 rounded-lg text-sm">
                        Resolve
                      </button>
                      <button onClick={() => deleteComplaint(c.id)}
                        className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded-lg text-sm">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;