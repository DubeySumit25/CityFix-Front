import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const response = await api.get("/complaints/my");
      setComplaints(response.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load complaints");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'RESOLVED':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50 py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-12 animate-fade-in-down">
            <h1 className="text-6xl font-black text-gray-900 mb-3 animate-bounce-in">📋 My Complaints</h1>
            <p className="text-xl text-gray-600 font-semibold">Track and monitor all your submitted complaints</p>
          </div>

          {complaints.length === 0 ? (
            <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-gray-100 animate-fade-in-up hover:shadow-2xl transition-all duration-300">
              <div className="inline-block bg-gradient-to-br from-blue-100 to-purple-100 p-6 rounded-3xl mb-6 transform hover:scale-110 transition-transform duration-300">
                <div className="text-8xl animate-float">📭</div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">No Complaints Yet</h2>
              <p className="text-gray-600 text-lg font-semibold mb-2">You haven't submitted any complaints</p>
              <p className="text-gray-500 mb-8">Start by creating your first complaint to help improve your city</p>
              <a href="/create-complaint" className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-8 rounded-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 uppercase tracking-wide transform active:scale-95">
                Create First Complaint →
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {complaints.map((complaint, index) => (
                <div key={complaint.id} className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 group hover:-translate-y-1 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="flex flex-col md:flex-row md:items-stretch">
                    <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-8 text-white w-full md:w-40 flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                      <div className="text-center">
                        <div className="text-5xl font-black mb-2">{String(index + 1).padStart(2, '0')}</div>
                        <p className="text-blue-200 font-bold text-sm uppercase tracking-wider">Issue</p>
                      </div>
                    </div>

                    <div className="p-8 md:p-10 flex-1">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-3xl font-black text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">{complaint.title}</h3>
                          <p className="text-gray-600 text-lg font-medium line-clamp-2">{complaint.description}</p>
                        </div>
                        <span className={`ml-4 px-6 py-2 rounded-xl font-bold text-lg border-2 whitespace-nowrap transform group-hover:scale-110 transition-all duration-300 ${getStatusColor(complaint.status)}`}>
                          {complaint.status === 'RESOLVED' && '✓ Resolved'}
                          {complaint.status === 'IN_PROGRESS' && '⧳ In Progress'}
                          {complaint.status === 'PENDING' && '⏳ Pending'}
                          {complaint.status !== 'RESOLVED' && complaint.status !== 'IN_PROGRESS' && complaint.status !== 'PENDING' && complaint.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-6 pt-6 border-t border-gray-200">
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Category</p>
                          <p className="font-bold text-gray-900 text-lg">{complaint.category}</p>
                        </div>
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Location</p>
                          <p className="font-bold text-gray-900 text-lg">{complaint.location}</p>
                        </div>
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Case ID</p>
                          <p className="font-mono font-bold text-gray-900 text-lg">#{complaint.id}</p>
                        </div>
                        <div className="transform group-hover:scale-110 transition-transform duration-300">
                          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest mb-2">Status</p>
                          <p className="font-bold text-gray-900 text-lg capitalize">{complaint.status.toLowerCase()}</p>
                        </div>
                      </div>

                      {complaint.imageUrl && (
                        <div className="mt-6 pt-6 border-t border-gray-200">
                          <p className="text-gray-700 font-bold mb-3 text-sm uppercase tracking-widest">📷 Evidence Photo</p>
                          <img
                            src={complaint.imageUrl}
                            alt="complaint evidence"
                            className="max-w-xs rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 cursor-pointer"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyComplaints;
