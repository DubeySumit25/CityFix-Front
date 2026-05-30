import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);

      setSuccess("Login successful 🎉");
      setError("");

      setTimeout(() => {
        if (response.data.role === "ADMIN") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 800);

    } catch (error) {
      setError("Invalid credentials ❌");
      setSuccess("");
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">

      <div className="w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">

        <div className="text-center mb-6">
          <div className="text-4xl mb-3">🏛️</div>
          <h1 className="text-3xl font-bold text-white">CityFix</h1>
          <p className="text-slate-400 text-sm mt-1">Welcome back</p>
        </div>

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500 text-green-400 text-center">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500 text-red-400 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-semibold bg-indigo-500 hover:bg-indigo-600 transition text-white"
          >
            Sign In
          </button>

        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          New user?{" "}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;