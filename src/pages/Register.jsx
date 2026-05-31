import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", email: "", password: "", phoneNumber: "",
  });
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", formData);
      setSuccess("Account created successfully 🎉");
      setError("");
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      console.log(err);
      setError("Registration failed. Try again ❌");
      setSuccess("");
    }
  };

  const inputClass = `w-full px-6 py-3 border-2 rounded-xl text-lg font-medium 
    text-gray-800 bg-white border-gray-200 transition-all duration-300
    focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 
    hover:border-blue-400`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">CityFix</h1>
        <p className="text-center text-gray-500 mb-6">Join the Community</p>

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-50 border border-green-400 text-green-600 text-center font-semibold">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-400 text-red-600 text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="name" placeholder="Full Name"
            value={formData.name} onChange={handleChange}
            className={inputClass} required />

          <input type="email" name="email" placeholder="Email"
            value={formData.email} onChange={handleChange}
            className={inputClass} required />

          <input type="password" name="password" placeholder="Password"
            value={formData.password} onChange={handleChange}
            className={inputClass} required />

          <input type="text" name="phoneNumber" placeholder="Phone Number"
            value={formData.phoneNumber} onChange={handleChange}
            className={inputClass} required />

          <button type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition">
            Create Account
          </button>
        </form>

        <p className="text-center mt-5 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">Sign In</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;