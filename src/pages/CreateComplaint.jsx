import { useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

function CreateComplaint() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const complaintData = {
        title,
        description,
        category,
        location,
      };

      const formData = new FormData();

      formData.append(
        "data",
        new Blob(
          [JSON.stringify(complaintData)],
          { type: "application/json" }
        )
      );

      formData.append("image", image);

      await api.post("/complaints", formData);

      alert("Complaint submitted successfully");

      setTitle("");
      setDescription("");
      setCategory("");
      setLocation("");
      setImage(null);

    } catch (error) {
      console.log(error);
      alert("Failed to submit complaint");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl shadow-xl p-10 text-white mb-10 animate-fade-in-down hover:shadow-2xl transition-all duration-300">
            <h1 className="text-5xl font-black mb-3 animate-bounce-in">📝 Report an Issue</h1>
            <p className="text-orange-100 text-lg font-semibold">Help us fix your city - every report matters!</p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-10 border-2 border-orange-100 animate-fade-in-up hover:shadow-3xl transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <label className="block text-gray-800 font-bold mb-3 text-lg">📌 Issue Title</label>
                <input
                  type="text"
                  placeholder="e.g., Broken streetlight on Main St"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 font-medium text-lg group-hover:border-orange-400"
                  required
                />
              </div>

              <div className="group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <label className="block text-gray-800 font-bold mb-3 text-lg">💬 Detailed Description</label>
                <textarea
                  placeholder="Describe the problem in detail. What exactly is wrong? When did you notice it?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 font-medium text-lg h-32 resize-none group-hover:border-orange-400"
                  required
                />
              </div>

              <div className="group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                <label className="block text-gray-800 font-bold mb-3 text-lg">📂 Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 font-medium text-lg bg-white group-hover:border-orange-400"
                  required
                >
                  <option value="">-- Select a category --</option>
                  <option value="ROAD_DAMAGE">🛣️ Road Damage</option>
                  <option value="GARBAGE">🗑️ Garbage</option>
                  <option value="WATER_LEAKAGE">💧 Water Leakage</option>
                  <option value="STREETLIGHT">💡 Streetlight</option>
                  <option value="DRAINAGE">🚰 Drainage</option>
                  <option value="TRAFFIC">🚗 Traffic</option>
                  <option value="ILLEGAL_PARKING">🅿️ Illegal Parking</option>
                  <option value="OTHER">📌 Other</option>
                </select>
              </div>

              <div className="group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <label className="block text-gray-800 font-bold mb-3 text-lg">📍 Location</label>
                <input
                  type="text"
                  placeholder="Enter the exact location or address"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 transition-all duration-200 font-medium text-lg group-hover:border-orange-400"
                  required
                />
              </div>

              <div className="border-2 border-dashed border-orange-300 rounded-xl p-8 text-center hover:border-orange-500 transition-colors animate-fade-in-up group" style={{ animationDelay: '0.5s' }}>
                <label className="block text-gray-800 font-bold mb-3 text-lg">📸 Attach Photo (Optional)</label>
                <input
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer block group-hover:text-orange-600 transition-colors">
                  <div className="text-5xl mb-3 transform group-hover:scale-110 transition-transform duration-300">📷</div>
                  <p className="text-gray-700 font-semibold mb-2">Click to upload or drag & drop</p>
                  <p className="text-gray-500 text-sm">Photos help authorities understand the issue better</p>
                </label>
              </div>

              <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-xl hover:shadow-2xl hover:scale-105 transition-all duration-200 uppercase tracking-wide mt-4 relative overflow-hidden group animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <span className="relative z-10">🚀 Submit Report</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateComplaint;