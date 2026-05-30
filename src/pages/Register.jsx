import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/signup", formData);
      alert("Registration successful");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Registration failed");
    }
  };

  const inputClass = (value) =>
  `w-full px-6 py-3 border-2 rounded-xl text-lg font-medium transition-all duration-300
  ${
    value
      ? "border-blue-500 bg-blue-50/30 text-blue-700"
      : "border-gray-200 bg-white text-gray-700"
  }
  focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 hover:border-blue-400
  focus:text-blue-700`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-purple-50 flex items-center justify-center py-12 px-4">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-10">

        <h1 className="text-3xl font-bold text-center mb-2">CityFix</h1>
        <p className="text-center text-gray-500 mb-6">Join the Community</p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className={inputClass(formData.name)}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={inputClass(formData.email)}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass(formData.password)}
            required
          />

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={inputClass(formData.phoneNumber)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-105 transition"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-5 text-sm">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 font-semibold">
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;