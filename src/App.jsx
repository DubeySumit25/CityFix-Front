import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateComplaint from "./pages/CreateComplaint";
import MyComplaints from "./pages/MyComplaints";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-complaint" element={<CreateComplaint />} />
        <Route
  path="/my-complaints"
  element={<MyComplaints />}
/>
<Route
  path="/admin/users"
  element={<AdminUsers />}
/>
<Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;